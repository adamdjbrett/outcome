import { readdir } from "node:fs/promises";
import path from "node:path";

async function walkFiles(rootDir) {
	const files = [];

	async function walk(currentDir) {
		let entries = [];
		try {
			entries = await readdir(currentDir, { withFileTypes: true });
		} catch {
			return;
		}

		for (const entry of entries) {
			const fullPath = path.join(currentDir, entry.name);
			if (entry.isDirectory()) {
				await walk(fullPath);
				continue;
			}
			if (entry.isFile()) {
				files.push(fullPath.split(path.sep).join("/"));
			}
		}
	}

	await walk(rootDir);
	return files;
}

class CitationSitemap {
	data() {
		return {
			permalink: "/sitemaps/citation-sitemap.xml",
			layout: false,
			eleventyExcludeFromCollections: true
		};
	}

	async render(data) {
		const citationFiles = (await walkFiles("public"))
			.filter((file) => file.startsWith("public/bib/"))
			.filter((file) => {
				const lower = file.toLowerCase();
				return lower.endsWith(".bib") || lower.endsWith(".ris") || lower.endsWith(".csl.json");
			});

		const baseUrl = data.metadata?.url || "https://outcome.doctrineofdiscovery.org";
		
		let xml = '<?xml version="1.0" encoding="utf-8"?>\n';
		xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

		for (const file of citationFiles.sort()) {
			const citationPath = "/" + file.replace("public/", "").replace(/\\/g, "/");
			const fullUrl = baseUrl + citationPath;
			xml += `\t<url>\n`;
			xml += `\t\t<loc>${fullUrl}</loc>\n`;
			xml += `\t</url>\n`;
		}

		xml += '</urlset>';
		return xml;
	}
}

export default CitationSitemap;
