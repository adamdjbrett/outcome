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

class DocumentSitemap {
	data() {
		return {
			permalink: "/sitemaps/document-sitemap.xml",
			layout: false,
			eleventyExcludeFromCollections: true
		};
	}

	async render(data) {
		const documentFiles = (await walkFiles("public"))
			.filter((file) => file.startsWith("public/pdf/") || file.startsWith("public/files/") || file.startsWith("public/downloads/"))
			.filter((file) => {
				const lower = file.toLowerCase();
				return [".pdf", ".doc", ".docx", ".xlsx", ".pptx"].some((ext) => lower.endsWith(ext));
			});

		const baseUrl = data.metadata?.url || "https://outcome.doctrineofdiscovery.org";
		
		let xml = '<?xml version="1.0" encoding="utf-8"?>\n';
		xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

		for (const file of documentFiles.sort()) {
			const documentPath = "/" + file.replace("public/", "").replace(/\\/g, "/");
			const fullUrl = baseUrl + documentPath;
			xml += `\t<url>\n`;
			xml += `\t\t<loc>${fullUrl}</loc>\n`;
			xml += `\t</url>\n`;
		}

		xml += '</urlset>';
		return xml;
	}
}

export default DocumentSitemap;
