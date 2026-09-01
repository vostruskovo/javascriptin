/**
 * @file Dynamic JS/CSS file loader
 * @description Loads script/stylesheet files relative to a base path, without document.write
 *              (document.write breaks the page if called after load, so this uses
 *              createElement + appendChild instead — safe to call anytime).
 * @version 2.0.0 (revised)
 */

const fileLoaderConfig = {
	basePath: "./frontend/src/"
};

/**
 * Append a single <script> tag pointing to basePath + "js/" + file.
 * @param {string} file
 * @returns {HTMLScriptElement}
 */
function addJs(file) {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = fileLoaderConfig.basePath + "js/" + file;
	document.head.appendChild(script);
	return script;
}

/**
 * Append a single <link rel="stylesheet"> tag pointing to basePath + "css/" + file.
 * @param {string} file
 * @returns {HTMLLinkElement}
 */
function addCss(file) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = fileLoaderConfig.basePath + "css/" + file;
	document.head.appendChild(link);
	return link;
}

/**
 * Flatten arbitrary arguments (strings, arrays, or an object of strings) into
 * a single flat array of filenames — used by identifyJsParamType/identifyCssParamType.
 * @param {...*} args
 * @returns {string[]}
 */
function flattenFileArgs(args) {
	const files = [];

	args.forEach(arg => {
		if (Array.isArray(arg)) {
			files.push(...arg);
		} else if (arg && typeof arg === 'object') {
			files.push(...Object.values(arg));
		} else if (typeof arg === 'string') {
			files.push(arg);
		}
	});

	return files;
}

/**
 * Load one or more JS files, accepting a single filename, multiple filenames,
 * an array of filenames, or an object whose values are filenames.
 * @param {...*} args
 * @returns {HTMLScriptElement[]}
 */
function identifyJsParamType(...args) {
	return flattenFileArgs(args).map(addJs);
}

/**
 * Load one or more CSS files. Same accepted shapes as identifyJsParamType.
 * @param {...*} args
 * @returns {HTMLLinkElement[]}
 */
function identifyCssParamType(...args) {
	return flattenFileArgs(args).map(addCss);
}

/**
 * Check whether the given JS/CSS files are already present in the document,
 * and alert() a readable summary. Accepts strings and/or arrays of strings.
 * @param {...*} args
 */
function checkLoadedFiles(...args) {
	const results = { js: [], css: [], invalid: [], unknown: [] };
	let files = [];

	args.forEach(arg => {
		if (Array.isArray(arg)) {
			files.push(...arg);
		} else if (typeof arg === "string") {
			files.push(arg);
		} else {
			results.invalid.push(`Invalid input: ${arg}`);
		}
	});

	files = [...new Set(files)];

	files.forEach(file => {
		if (file.endsWith(".js")) {
			const scripts = document.querySelectorAll(`script[src*="${file}"]`);
			results.js.push(scripts.length > 0 ? `JS loaded: ${file}` : `JS NOT loaded: ${file}`);
		} else if (file.endsWith(".css")) {
			const links = document.querySelectorAll(`link[href*="${file}"]`);
			results.css.push(links.length > 0 ? `CSS loaded: ${file}` : `CSS NOT loaded: ${file}`);
		} else {
			results.unknown.push(`Unknown type: ${file}`);
		}
	});

	const output = [];
	if (results.js.length) output.push("JS Files:\n" + results.js.join("\n"));
	if (results.css.length) output.push("CSS Files:\n" + results.css.join("\n"));
	if (results.invalid.length) output.push("Invalid Inputs:\n" + results.invalid.join("\n"));
	if (results.unknown.length) output.push("Unknown Types:\n" + results.unknown.join("\n"));

	alert(output.join("\n\n"));
}
