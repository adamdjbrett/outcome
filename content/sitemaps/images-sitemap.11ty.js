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

class ImageSitemap {
	data() {
		return {
			permalink: "/sitemaps/images-sitemap.xml",
			layout: false,
			eleventyExcludeFromCollections: true
		};
	}

	async render(data) {
		const imageFiles = (await walkFiles("public"))
			.filter((file) => file.startsWith("public/img/"))
			.filter((file) => {
				const lower = file.toLowerCase();
				return [".webp", ".jpg", ".jpeg", ".gif", ".png", ".svg"].some((ext) => lower.endsWith(ext));
			});

		const baseUrl = data.metadata?.url || "https://outcome.doctrineofdiscovery.org";
		
		let xml = '<?xml version="1.0" encoding="utf-8"?>\n';
		xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

		for (const file of imageFiles.sort()) {
			const imagePath = "/" + file.replace("public/", "").replace(/\\/g, "/");
			const fullUrl = baseUrl + imagePath;
			xml += `\t<url>\n`;
			xml += `\t\t<loc>${fullUrl}</loc>\n`;
			xml += `\t\t<image:image>\n`;
			xml += `\t\t\t<image:loc>${fullUrl}</image:loc>\n`;
			xml += `\t\t</image:image>\n`;
			xml += `\t</url>\n`;
		}

		xml += '</urlset>';
		return xml;
	}
}

export default ImageSitemap;
