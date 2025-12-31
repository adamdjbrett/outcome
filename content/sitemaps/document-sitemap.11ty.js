import { globby } from "globby";

class DocumentSitemap {
	data() {
		return {
			permalink: "/sitemaps/document-sitemap.xml",
			layout: false,
			eleventyExcludeFromCollections: true
		};
	}

	async render(data) {
		const documentFiles = await globby([
			"public/pdf/**/*.pdf",
			"public/files/**/*.pdf",
			"public/downloads/**/*.pdf",
			"public/pdf/**/*.doc",
			"public/pdf/**/*.docx",
			"public/files/**/*.xlsx",
			"public/downloads/**/*.pptx"
		]);

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
