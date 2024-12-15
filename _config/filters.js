import { DateTime } from "luxon";

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

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "canopyt", "cocor" , "fifi", "jc" , 
			"canopys" ,"esaysones" , "esaystwos" , "jcreors" , "jcesaysones" , "jcesaystwos" , 
			"crosscurrentss" , "croesaysones" , "croesaystwos" ,"features" , "fesaysones" , 
			"fesaystwos" ,"podsones" , "podsstwos" , "pods"].indexOf(tag) === -1);
	});

};
