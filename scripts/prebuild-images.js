#!/usr/bin/env node

import Image from "@11ty/eleventy-img";
import path from "path";
import { globby } from "globby";
import fs from "fs";

// Configuration matching your current setup
const imageConfig = {
  formats: ["avif", "webp", "auto"],
  widths: [250, 400, 600, 900, 1200],
  outputDir: "./public/img/optimized/",
  urlPath: "/img/optimized/",
  filenameFormat: function (id, src, width, format, options) {
    const extension = path.extname(src);
    const name = path.basename(src, extension);
    return `${name}-${width}w.${format}`;
  }
};

async function prebuildImages() {
  console.log("🖼️  Starting image prebuild...");
  
  // Find all images in public/img and content/img
  const imagePatterns = [
    "./public/img/**/*.{jpg,jpeg,png,svg,webp}",
    "./content/img/**/*.{jpg,jpeg,png,svg,webp}"
  ];
  
  const imagePaths = await globby(imagePatterns, { 
    ignore: ["**/optimized/**", "**/node_modules/**", "**/_site/**"] 
  });
  
  console.log(`Found ${imagePaths.length} images to process...`);
  
  // Ensure output directory exists
  fs.mkdirSync(imageConfig.outputDir, { recursive: true });
  
  // Process images in batches to avoid overwhelming the system
  const batchSize = 3;
  for (let i = 0; i < imagePaths.length; i += batchSize) {
    const batch = imagePaths.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (imagePath) => {
        try {
          const stats = await Image(imagePath, imageConfig);
          console.log(`✅ Processed: ${path.basename(imagePath)}`);
          return stats;
        } catch (error) {
          console.log(`❌ Failed to process ${imagePath}: ${error.message}`);
        }
      })
    );
  }
  
  console.log("🎉 Image prebuild completed!");
  console.log(`📁 Optimized images saved to: ${imageConfig.outputDir}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  prebuildImages().catch(console.error);
}

export { prebuildImages };