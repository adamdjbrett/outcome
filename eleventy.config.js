import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
// import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { execSync } from 'child_process';
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
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// Creativitas Start Injection
	// Inject Purge CSS
	eleventyConfig.addTransform('purge-and-inline-css', async (content, outputPath) => {
		if (process.env.ELEVENTY_ENV !== 'production' || !outputPath.endsWith('.html')) {
		  return content;
		}
		

// 		eleventyConfig.addNunjucksFilter("limit", (arr, limit) => arr.slice(0, limit));
//		eleventyConfig.addFilter("head", (array, n) => {
//			if(!Array.isArray(array) || array.length === 0) {
//				return [];
//			}
//			if( n < 0 ) {
//				return array.slice(n);
//			}
//	
//			return array.slice(0, n);
//		});
		eleventyConfig.addFilter("min", (...numbers) => {
			return Math.min.apply(null, numbers);
		});
		
		const purgeCSSResults = await new PurgeCSS().purge({
		  content: [{ raw: content }],
		  css: ['dist/css/index.css', 'dist/css/outcome.css'],
		  keyframes: true,
		});
	  
		return content.replace('<!-- INLINE CSS-->', '<style>' + purgeCSSResults[0].css + '</style>');
	  });

	  eleventyConfig.on('eleventy.after', () => {
		execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
	  })


	  eleventyConfig.addPlugin(pluginPWA);

	  eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "",
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
			subtitle: "Outcome Project",
			base: "https://outcome.podcastdoctrineofdiscovery.com/",
			author: {
				name: "Adam Dj Brett"
			}
		}
	});


// image off
	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
//	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// File extensions to process in _site folder
//		extensions: "html",

		// Output formats for each image.
//		formats: ["avif", "webp", "auto"],

		// widths: ["auto"],

//		defaultAttributes: {
			// e.g. <img loading decoding> assigned on the HTML tag will override these values.
//			loading: "lazy",
//			decoding: "async",
//		}
//	});
// image off



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

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
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
