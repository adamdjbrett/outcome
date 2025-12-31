import { globby } from "globby";

class ImageSitemap {
	data() {
		return {
			permalink: "/sitemaps/images-sitemap.xml",
			layout: false,
			eleventyExcludeFromCollections: true
		};
	}

	async render(data) {
		const imageFiles = await globby([
			"public/img/**/*.jpg",
			"public/img/**/*.jpeg",
			"public/img/**/*.png",
			"public/img/**/*.gif",
			"public/img/**/*.webp",
			"public/img/**/*.svg"
		]);

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
