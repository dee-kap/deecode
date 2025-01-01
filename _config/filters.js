import { DateTime } from "luxon";
import _ from 'lodash';

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
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
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	// Group books by year

	eleventyConfig.addFilter("groupBooksByYear", (books) => {
		const defaultYear = 1970;

		// Group books by year
		const groups = books.reduce((groups, book) => {
			const dateRead = book.date_read || "";
			const dateStart = book.date_start || "";
			const year = dateRead
				? new Date(dateRead).getFullYear()
				: dateStart
				? new Date(dateStart).getFullYear()
				: defaultYear;

			if (!groups[year]) {
				groups[year] = [];
			}
			groups[year].push(book);
			return groups;
		}, {});


		// Rename the key "1970" to "Long Time Ago"
		if (groups["1970"]) {
			groups["Long Time Ago"] = groups["1970"];
			delete groups["1970"];
		}

		// Convert groups into a sorted array of key-value pairs
		const sortedArray = Object.entries(groups)
			.sort(([yearA], [yearB]) => yearB - yearA); // Sort keys numerically in descending order

		return sortedArray;
	});

};
