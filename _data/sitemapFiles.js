import { globby } from "globby";

export default async function() {
	const citationFiles = await globby([
		"public/bib/**/*.bib",
		"public/bib/**/*.ris", 
		"public/bib/**/*.csl.json"
	]);
	
	const imageFiles = await globby([
		"public/img/**/*.jpg",
		"public/img/**/*.jpeg",
		"public/img/**/*.png",
		"public/img/**/*.gif",
		"public/img/**/*.webp",
		"public/img/**/*.svg"
	]);
	
	const documentFiles = await globby([
		"public/pdf/**/*.pdf",
		"public/files/**/*.pdf",
		"public/downloads/**/*.pdf",
		"public/pdf/**/*.doc",
		"public/pdf/**/*.docx",
		"public/files/**/*.xlsx",
		"public/downloads/**/*.pptx"
	]);
	
	return {
		citationFiles,
		imageFiles,
		documentFiles
	};
}
