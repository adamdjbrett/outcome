import { globby } from "globby";

class CitationSitemap {
	data() {
		return {
			permalink: "/sitemaps/citation-sitemap.xml",
			layout: false,
			eleventyExcludeFromCollections: true
		};
	}

	async render(data) {
		const citationFiles = await globby([
			"public/bib/**/*.bib",
			"public/bib/**/*.ris",
			"public/bib/**/*.csl.json"
		]);

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
