import {
	IdAttributePlugin,
	InputPathToUrlTransformPlugin,
	HtmlBasePlugin,
} from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import pluginFilters from "./_config/filters.js";
import { DateTime } from "luxon";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	eleventyConfig.addWatchTarget("./macros/");
	eleventyConfig.addPassthroughCopy("public");
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	eleventyConfig.addCollection("tagCloud", function (collectionApi) {
		const tagSet = new Map();
		collectionApi.getAll().forEach((item) => {
			if ("tags" in item.data) {
				let tags = item.data.tags;
				tags = tags.filter(
					(tag) => !["all", "nav", "post", "posts"].includes(tag),
				); // Exclude common tags if needed
				tags.forEach((tag) => {
					tagSet.set(tag, (tagSet.get(tag) || 0) + 1); // Count each tag occurrence
				});
			}
		});
		return Array.from(tagSet, ([tag, count]) => ({ tag, count }));
	});

	eleventyConfig.addCollection("blog", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob("content/blog/**/*.md")
			.map((post) => {
				const date = new Date(post.date);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1);
				const day = String(date.getDate());
				post.data.permalink = `/blog/${year}/${month}/${day}/${post.fileSlug}/`;
				post.url = post.data.permalink;
				console.log(post.data.permalink);
				return post;
			});
	});

	eleventyConfig.addCollection("relatedPosts", function (collectionApi) {
		console.log(collectionApi.page);
		return collectionApi.getFilteredByTags("GBWW");
	});

	eleventyConfig.addFilter("shuffle", (array) => {
		let shuffledArray = array.slice(); // Copy the array
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}
		return shuffledArray;
	});

	// eleventyConfig.addFilter("sortBooksByDateReadDesc", (books) => {
	// 	return books.sort((a, b) => {
	// 		const dateA = DateTime.fromISO(a.date_read || "1970-01-01");
	// 		const dateB = DateTime.fromISO(b.date_read || "1970-01-01");
	// 		return dateB - dateA; // Descending order
	// 	});
	// });

	eleventyConfig.addFilter("sortBooksByReadorStartDate", (books) => {
		return books.sort((a, b) => {
			const aDateField = a.date_read || a.date_start || "1970-01-01";
			const bDateField = b.date_read || b.date_start || "1970-01-01";

			const dateA = DateTime.fromISO(aDateField || "1970-01-01");
			const dateB = DateTime.fromISO(bDateField || "1970-01-01");
			return dateB - dateA; // Descending order
		});
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/",
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

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
		preAttributes: { tabindex: 0 },
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			// eleventyNavigation: {
			// 	key: "Feed",
			// 	order: 4
			// }
		},
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "DeeCode",
			subtitle: "Personal websie of Deepak.",
			base: "https://deecode.me/",
			author: {
				name: "Deepak",
			},
		},
	});

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// File extensions to process in _site folder
		extensions: "html",

		// Output formats for each image.
		formats: ["avif", "webp", "auto"],

		// widths: ["auto"],

		defaultAttributes: {
			// e.g. <img loading decoding> assigned on the HTML tag will override these values.
			loading: "lazy",
			decoding: "async",
		},
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return new Date().toISOString();
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	// filters
	eleventyConfig.addFilter("date", (dateObj, format = "yyyy/MM/dd") => {
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});
}

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content", // default: "."
		includes: "../_includes", // default: "_includes" (`input` relative)
		data: "../_data", // default: "_data" (`input` relative)
		output: "dist",
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
