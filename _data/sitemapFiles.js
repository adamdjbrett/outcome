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
				files.push(fullPath);
			}
		}
	}

	await walk(rootDir);
	return files;
}

function normalizePath(filePath) {
	return filePath.split(path.sep).join("/");
}

function hasExt(filePath, extensions) {
	const lower = filePath.toLowerCase();
	return extensions.some((ext) => lower.endsWith(ext));
}

export default async function () {
	const publicFiles = await walkFiles("public");

	const citationFiles = publicFiles
		.map(normalizePath)
		.filter((file) => file.startsWith("public/bib/"))
		.filter((file) => hasExt(file, [".bib", ".ris", ".csl.json"]));

	const imageFiles = publicFiles
		.map(normalizePath)
		.filter((file) => file.startsWith("public/img/"))
		.filter((file) => hasExt(file, [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]));

	const documentFiles = publicFiles
		.map(normalizePath)
		.filter((file) => file.startsWith("public/pdf/") || file.startsWith("public/files/") || file.startsWith("public/downloads/"))
		.filter((file) => hasExt(file, [".pdf", ".doc", ".docx", ".xlsx", ".pptx"]));

	return {
		citationFiles,
		imageFiles,
		documentFiles
	};
}
