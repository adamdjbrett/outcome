import { DateTime } from "luxon";

const EXCLUDED_TAGS = new Set([
	"all", "posts", "posting", "canopyt", "cocor", "fifi", "jc",
	"canopys", "esaysones", "esaystwos", "jcreors", "jcesaysones",
	"jcesaystwos", "crosscurrentss", "croesaysones", "croesaystwos",
	"features", "fesaysones", "fesaystwos", "podsones", "podsstwos",
	"ijrs", "ijrall", "ijrones", "ijrtwos", "compassall", "compassone",
	"jcrt", "jcrt_issue1", "pods", "podcastss", "podthrees",
	"doctrine-of-discovery", "domination-translator", "indigenous-rights",
	"education", "law"
]);

const tagFilterCache = new Map();

function filterPublicTags(tags = []) {
	// Memoize by sorted key to avoid repeated filtering work during templating.
	const key = Array.isArray(tags) ? [...tags].sort().join("|") : "";
	if (tagFilterCache.has(key)) {
		return tagFilterCache.get(key);
	}
	const filtered = (tags || []).filter(tag => !EXCLUDED_TAGS.has(tag));
	tagFilterCache.set(key, filtered);
	return filtered;
}

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

// author inject here..

	eleventyConfig.addFilter("getAuthor", (authors,label) => {
		let author = authors.filter(a => a.key === label)[0];
		return author;
	});

	eleventyConfig.addFilter("getPostsByAuthor", (posts,author) => {
		return posts.filter(a => a.data.author === author);
	});

// author inject here..


	  
		eleventyConfig.addNunjucksFilter("limit", (arr, limit) => arr.slice(0, limit));
		
		eleventyConfig.addFilter("min", (...numbers) => {
			return Math.min.apply(null, numbers);
		});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

		eleventyConfig.addFilter("filterTagList", filterPublicTags);

};
