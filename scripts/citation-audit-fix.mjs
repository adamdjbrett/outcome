#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const BIB_ROOT = path.join(ROOT, "public", "bib");
const REPORT_PATH = path.join(ROOT, "citation-audit-report.json");

const TARGET_SECTIONS = new Set([
  "canopy",
  "compass",
  "crosscurrents",
  "ecozoic",
  "featured",
  "ijr",
  "jcreor",
  "jcrt",
  "podcast"
]);

const EXCLUDED_BASENAMES = new Set(["index", "toc", "abstract"]);
const args = new Set(process.argv.slice(2));
const FIX = args.has("--fix");

function posixPath(input) {
  return input.split(path.sep).join("/");
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const out = [];
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function parseFrontMatter(text) {
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) {
    return { frontMatter: "", body: text };
  }

  const normalized = text.replace(/\r\n/g, "\n");
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return { frontMatter: "", body: text };
  }

  const frontMatter = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  return { frontMatter, body };
}

function readScalar(frontMatter, key) {
  const rx = new RegExp(`^${key}:\\s*(.+)$`, "m");
  const m = frontMatter.match(rx);
  if (!m) return "";
  return stripQuotes(m[1]);
}

function readAuthors(frontMatter) {
  const authors = [];
  const lines = frontMatter.split("\n");
  for (const line of lines) {
    const m = line.match(/^\s*-\s*name:\s*(.+)$/);
    if (!m) continue;
    const name = stripQuotes(m[1]).trim();
    if (name) authors.push(name);
  }
  return authors;
}

function readCitationDownloadLink(frontMatter) {
  const lines = frontMatter.split("\n");
  let inCitation = false;

  for (const line of lines) {
    if (/^citation_download\s*:/.test(line)) {
      inCitation = true;
      continue;
    }

    if (inCitation) {
      if (/^[A-Za-z0-9_]+\s*:/.test(line) && !/^\s+/.test(line)) {
        inCitation = false;
        continue;
      }
      const m = line.match(/^\s*link\s*:\s*(.+)$/);
      if (m) return stripQuotes(m[1]);
    }
  }

  return "";
}

function toPermalinkFromContentPath(contentFile, baseUrl) {
  const rel = posixPath(path.relative(CONTENT_ROOT, contentFile));
  const withoutExt = rel.replace(/\.md$/i, "");
  const parts = withoutExt.split("/");
  const isIndex = parts[parts.length - 1] === "index";
  const pathPart = isIndex ? `/${parts.slice(0, -1).join("/")}/` : `/${parts.join("/")}/`;
  return `${baseUrl.replace(/\/$/, "")}${pathPart.replace(/\/+/g, "/")}`;
}

function toTitleCaseFallback(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function bibtexEscape(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}");
}

function risEscape(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

function isLikelyOrganization(name) {
  const orgHints = [
    "alliance",
    "initiative",
    "office",
    "project",
    "university",
    "nation",
    "council",
    "center",
    "centre",
    "press",
    "committee",
    "confederacy",
    "church",
    "foundation",
    "institute",
    "journal",
    "values",
    "podcast"
  ];
  const lower = name.toLowerCase();
  return orgHints.some((hint) => lower.includes(hint));
}

function parsePersonName(name) {
  const clean = name.trim().replace(/\s+/g, " ");
  if (!clean) return { literal: "Unknown" };
  if (isLikelyOrganization(clean)) return { literal: clean };

  const parts = clean.split(" ");
  if (parts.length === 1) return { literal: clean };

  const family = parts.pop();
  const given = parts.join(" ");
  if (!family || !given) return { literal: clean };
  return { family, given };
}

function makeBibtexAuthor(authorObj) {
  if (authorObj.literal) {
    return `{${authorObj.literal}}`;
  }
  return `${authorObj.family}, ${authorObj.given}`;
}

function toCitationBasePath(contentFile, section, frontMatter) {
  const link = readCitationDownloadLink(frontMatter);
  if (link && link.startsWith("/bib/")) {
    return link.replace(/^\/bib\//, "").replace(/\.(bib|ris|csl\.json)$/i, "");
  }

  const rel = posixPath(path.relative(path.join(CONTENT_ROOT, section), contentFile)).replace(/\.md$/i, "");
  return `${section}/${rel}`;
}

function buildCitations(item) {
  const slug = path.basename(item.contentFile, ".md");
  const keyStem = item.citationBasePath.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "").toLowerCase() || "entry";
  const year = item.year || "2026";

  const cslAuthor = item.authors.map((name) => parsePersonName(name));
  if (cslAuthor.length === 0) cslAuthor.push({ literal: "Unknown" });

  const bibAuthors = cslAuthor.map((a) => makeBibtexAuthor(a)).join(" and ");

  const cslObj = [
    {
      id: keyStem,
      type: "article-webpage",
      title: item.title,
      URL: item.url,
      author: cslAuthor,
      issued: {
        "date-parts": [[Number(year)]]
      },
      ...(item.doi ? { DOI: item.doi.replace(/^https?:\/\/doi\.org\//i, "") } : {})
    }
  ];

  const risLines = [
    "TY  - JOUR",
    `TI  - ${risEscape(item.title)}`,
    ...cslAuthor.map((a) => `AU  - ${risEscape(a.literal ? a.literal : `${a.given} ${a.family}`)}`),
    `PY  - ${year}`,
    `UR  - ${risEscape(item.url)}`,
    ...(item.doi ? [`DO  - ${risEscape(item.doi.replace(/^https?:\/\/doi\.org\//i, ""))}`] : []),
    "ER  - "
  ];

  const bib = [
    `@article{${keyStem},`,
    `  title = {${bibtexEscape(item.title)}},`,
    `  author = {${bibtexEscape(bibAuthors)}},`,
    `  year = {${year}},`,
    `  url = {${bibtexEscape(item.url)}},`,
    ...(item.doi ? [`  doi = {${bibtexEscape(item.doi.replace(/^https?:\/\/doi\.org\//i, ""))}},`] : []),
    "}"
  ].join("\n");

  return {
    bib,
    ris: risLines.join("\n") + "\n",
    csl: JSON.stringify(cslObj, null, 2) + "\n"
  };
}

function validateCitationContents(item, contentByExt) {
  const errors = [];

  const bib = contentByExt.bib || "";
  const ris = contentByExt.ris || "";
  const csl = contentByExt["csl.json"] || "";

  if (!/^\s*@\w+\{/.test(bib)) errors.push("bib: missing entry header");
  if (!/\btitle\s*=\s*\{.+\}/is.test(bib)) errors.push("bib: missing title");
  if (!/\bauthor\s*=\s*\{.+\}/is.test(bib)) errors.push("bib: missing author");
  if (!/\byear\s*=\s*\{\d{4}\}/is.test(bib)) errors.push("bib: missing year");
  if (!/\burl\s*=\s*\{.+\}/is.test(bib)) errors.push("bib: missing url");

  if (!/^TY  -\s+\w+/m.test(ris)) errors.push("ris: missing TY");
  if (!/^ER  -\s*$/m.test(ris)) errors.push("ris: missing ER");
  if (!/^TI  -\s+.+/m.test(ris)) errors.push("ris: missing TI");
  if (!/^PY  -\s+\d{4}/m.test(ris)) errors.push("ris: missing PY");
  if (!/^UR  -\s+.+/m.test(ris)) errors.push("ris: missing UR");

  let cslJson;
  try {
    cslJson = JSON.parse(csl);
  } catch {
    errors.push("csl.json: invalid json");
    cslJson = null;
  }

  if (Array.isArray(cslJson) && cslJson.length > 0) {
    const entry = cslJson[0];
    if (!entry.type) errors.push("csl.json: missing type");
    if (!entry.title) errors.push("csl.json: missing title");
    if (!entry.URL) errors.push("csl.json: missing URL");
    if (!entry.issued) errors.push("csl.json: missing issued");
    if (!Array.isArray(entry.author) || entry.author.length === 0) errors.push("csl.json: missing author");
  } else if (cslJson !== null) {
    errors.push("csl.json: must be non-empty array");
  }

  const expectedUrl = item.url;
  if (!bib.includes(expectedUrl)) errors.push("bib: permalink url mismatch");
  if (!ris.includes(`UR  - ${expectedUrl}`)) errors.push("ris: permalink url mismatch");
  if (Array.isArray(cslJson) && cslJson[0] && cslJson[0].URL !== expectedUrl) errors.push("csl.json: permalink url mismatch");

  if (item.authors.length > 1) {
    const auLines = (ris.match(/^AU  -/gm) || []).length;
    if (auLines !== item.authors.length) errors.push(`ris: expected ${item.authors.length} AU lines, found ${auLines}`);

    if (Array.isArray(cslJson) && cslJson[0] && Array.isArray(cslJson[0].author)) {
      if (cslJson[0].author.length !== item.authors.length) {
        errors.push(`csl.json: expected ${item.authors.length} author entries, found ${cslJson[0].author.length}`);
      }
    }

    if (!/\sand\s/.test(bib)) errors.push("bib: multi-author separator should use 'and'");
  }

  return errors;
}

async function main() {
  const metadataPath = path.join(ROOT, "_data", "metadata.json");
  const metadata = JSON.parse(await fs.readFile(metadataPath, "utf8"));
  const baseUrl = metadata.url || "https://outcome.doctrineofdiscovery.org";

  const allMarkdown = (await walk(CONTENT_ROOT)).filter((f) => f.endsWith(".md"));

  const inScope = allMarkdown.filter((file) => {
    const rel = posixPath(path.relative(CONTENT_ROOT, file));
    const [section] = rel.split("/");
    if (!TARGET_SECTIONS.has(section)) return false;

    const basename = path.basename(file, ".md").toLowerCase();
    if (EXCLUDED_BASENAMES.has(basename)) return false;
    return true;
  });

  const items = [];

  for (const file of inScope) {
    const text = await fs.readFile(file, "utf8");
    const { frontMatter } = parseFrontMatter(text);

    if (/^citation:\s*false\s*$/m.test(frontMatter)) continue;

    const rel = posixPath(path.relative(CONTENT_ROOT, file));
    const section = rel.split("/")[0];
    const slug = path.basename(file, ".md");

    const title = readScalar(frontMatter, "title") || toTitleCaseFallback(slug);
    const dateRaw = readScalar(frontMatter, "date");
    const yearMatch = dateRaw.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : "2026";

    const doiOrUrl = readScalar(frontMatter, "doi");
    const canonical = readScalar(frontMatter, "canonical") || readScalar(frontMatter, "canoncial");
    const authors = readAuthors(frontMatter);

    const fallbackPermalink = toPermalinkFromContentPath(file, baseUrl);
    const permalink = canonical && /^https?:\/\//i.test(canonical) ? canonical : fallbackPermalink;

    const citationBasePath = toCitationBasePath(file, section, frontMatter);

    items.push({
      contentFile: file,
      relContentFile: rel,
      section,
      slug,
      title,
      year,
      authors,
      doi: doiOrUrl,
      url: permalink,
      citationBasePath
    });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    fixMode: FIX,
    totals: {
      items: items.length,
      missingTriples: 0,
      invalidFiles: 0,
      fixedFiles: 0
    },
    items: []
  };

  for (const item of items) {
    const extMap = {
      bib: path.join(BIB_ROOT, `${item.citationBasePath}.bib`),
      ris: path.join(BIB_ROOT, `${item.citationBasePath}.ris`),
      "csl.json": path.join(BIB_ROOT, `${item.citationBasePath}.csl.json`)
    };

    const existing = {};
    for (const [ext, filePath] of Object.entries(extMap)) {
      existing[ext] = (await exists(filePath)) ? await fs.readFile(filePath, "utf8") : "";
    }

    const missing = Object.entries(existing)
      .filter(([, content]) => !content)
      .map(([ext]) => ext);

    if (missing.length > 0) report.totals.missingTriples += 1;

    const validateInput = {
      bib: existing.bib,
      ris: existing.ris,
      "csl.json": existing["csl.json"]
    };
    let errors = validateCitationContents(item, validateInput).filter((e) => {
      // Skip format checks for missing files; they will be generated in fix mode.
      if (missing.length > 0 && e.includes("missing")) return false;
      return true;
    });

    let fixed = false;
    if (FIX && (missing.length > 0 || errors.length > 0)) {
      const generated = buildCitations(item);

      for (const [ext, filePath] of Object.entries(extMap)) {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, generated[ext === "csl.json" ? "csl" : ext], "utf8");
        report.totals.fixedFiles += 1;
      }

      fixed = true;

      const postValidate = {
        bib: generated.bib,
        ris: generated.ris,
        "csl.json": generated.csl
      };
      errors = validateCitationContents(item, postValidate);
    }

    if (errors.length > 0) report.totals.invalidFiles += 1;

    report.items.push({
      file: item.relContentFile,
      section: item.section,
      citationBasePath: item.citationBasePath,
      expectedPermalink: item.url,
      authorCount: item.authors.length,
      missing,
      errors,
      fixed
    });
  }

  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2) + "\n", "utf8");

  const broken = report.items.filter((i) => i.missing.length > 0 || i.errors.length > 0).length;
  const fixedItems = report.items.filter((i) => i.fixed).length;

  console.log(`Items scanned: ${report.totals.items}`);
  console.log(`Items with missing citation files: ${report.totals.missingTriples}`);
  console.log(`Items still invalid: ${report.totals.invalidFiles}`);
  console.log(`Items fixed: ${fixedItems}`);
  console.log(`Citation files written: ${report.totals.fixedFiles}`);
  console.log(`Report: ${posixPath(path.relative(ROOT, REPORT_PATH))}`);

  if (broken > 0 && !FIX) {
    process.exitCode = 2;
  }
}

await main();
