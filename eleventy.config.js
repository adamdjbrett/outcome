import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { execSync } from 'child_process';
import path from 'path';
import pluginFilters from "./_config/filters.js";
import PurgeCSS from 'purgecss';
import markdownIt from 'markdown-it';
import markdownItAnchor from "markdown-it-anchor";
import pluginTOC from 'eleventy-plugin-toc';
import pluginPWA from "eleventy-plugin-pwa-v2";
/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});
	
	// Publishing control: published: false excludes pages from build and serve
	// Default to true if not specified
	eleventyConfig.addPreprocessor("published", "*", (data, content) => {
		// If published is explicitly set to false, exclude from build and serve
		if(data.published === false) {
			return false;
		}
	});
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// Creativitas Start Injection
	// Note: PurgeCSS is disabled for better build performance
	// CSS is already minimal and well-structured
	// Uncomment below if CSS file size becomes a concern

	// eleventyConfig.addTransform('purge-and-inline-css', async (content, outputPath) => {
	// 	if (process.env.ELEVENTY_ENV !== 'production' || !outputPath.endsWith('.html')) {
	// 	  return content;
	// 	}
	// 	const purgeCSSResults = await new PurgeCSS().purge({
	// 	  content: [{ raw: content }],
	// 	  css: ['_site/css/index.css', '_site/css/outcome.css'],
	// 	  keyframes: true,
	// 	});
	// 	return content.replace('<!-- INLINE CSS-->', '<style>' + purgeCSSResults[0].css + '</style>');
	// });

	// Utility filters
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// PWA service worker (skip for fast builds)
	if (process.env.SKIP_SERVICE_WORKER !== 'true') {
		eleventyConfig.addPlugin(pluginPWA);
	} else {
		console.log('🚀 Skipping PWA service worker for faster build');
	}

	  eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});
	  eleventyConfig.addPlugin(pluginTOC, {
		tags: ['h2', 'h3', 'h4', 'h5'],
		  id: 'toci', 
		  class: 'list-group',
		ul: true,
		flat: true,
		wrapper: 'div'
	  })

	  // End Ijnection by creativitas

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Adds the {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});
	// Adds the {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	// Generate Pagefind search index only on production build (skip dev/serve for speed)
	eleventyConfig.on('eleventy.after', () => {
		if (process.env.ELEVENTY_ENV !== 'production') {
			return;
		}
		try {
			console.log('[Pagefind] Building search index...');
			execSync(`npx pagefind --site _site --force-language unknown`, {
				encoding: 'utf-8',
				cwd: process.cwd(),
				stdio: 'inherit'
			});
			console.log('[Pagefind] Search index built successfully');
		} catch (error) {
			console.error('[Pagefind] Error building search index:', error.message);
		}
	});


	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			eleventyNavigation: {
				key: "Feed",
				order: 4
			}
		},
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Outcome",
			subtitle: "Outcome Documents for 200 Years of Johnson v. M’Intosh",
			base: "https://outcome.doctrineofdiscovery.org",
			author: {
				name: "Adam DJ Brett"
			}
		}
	});


	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	// Conditionally enable image transforms (skip in production if SKIP_IMAGE_TRANSFORM is set)
	if (process.env.SKIP_IMAGE_TRANSFORM !== 'true') {
		eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
			extensions: "html",
			formats: ["avif", "webp", "auto"],
			widths: [250, 400, 600, 900, 1200],
			defaultAttributes: {
				loading: "lazy",
				decoding: "async",
				sizes: "auto"
			},
			// Only process local images, exclude external URLs and remote images
			urlFilter: (src) => {
				// Skip data URIs
				if (src.startsWith('data:')) {
					return false;
				}
				// Skip external domains (but allow our own domain)
				if (src.includes('://') && !src.includes('outcome.doctrineofdiscovery.org')) {
					// Skip truly external domains
					if (src.includes('unsplash.com') || src.includes('wsrv.nl') || src.includes('googleapis.com') || src.includes('gravatar.com')) {
						return false;
					}
					// Skip any other external protocols
					return false;
				}
				// Process local relative paths and our own domain images
				return true;
			},
			filenameFormat: function (id, src, width, format, options) {
				// Keep original filename structure but add responsive suffixes
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				return `${name}-${width}w.${format}`;
			}
		});
	} else {
		console.log('🚀 Skipping image transform for faster build (using prebuilt images)');
	}



	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

	// Features to make your build faster (when you need them)

	// Emulate passthrough copy during dev server for faster reloads
	// See: https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve
	if (process.env.ELEVENTY_RUN_MODE === "serve") {
		eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	}
};


export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};
