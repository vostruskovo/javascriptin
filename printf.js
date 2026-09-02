/**
 * @file printf-style output helpers (writes to the page via document.write)
 * @version 1.1.0 (revised)
 *
 * Fixes in this revision:
 *  - toFixed()/precision()/precisionn(): the decimal-point in the regex was
 *    written as `\.` inside a template literal, which JS silently turns into
 *    a *plain* `.` (matches ANY character) instead of an escaped literal dot
 *    — e.g. the string "123x45" was wrongly accepted as a number. Now `\\.`.
 *  - precision()/precisionn() were bare assignments (no let/const), leaking
 *    as implicit globals that collide with math.js's own precision()
 *    function if both files are loaded on the same page. Renamed to
 *    cPrecision()/cPrecisionn() and properly declared (matches c.js).
 *  - printf()/printf_(): the old implementation looped over the *arguments*
 *    and, based on each arg's typeof, blindly tried every placeholder type
 *    (%s, %d, %i, %c, %f...) against the whole string. That meant a number
 *    argument could silently consume an unrelated "%s" meant for a later
 *    string argument (try printf("%d says %s", 1, "hi") in the old code).
 *    Rewritten as a single left-to-right pass over the *placeholders* in
 *    the format string, consuming args in the order they actually appear —
 *    which is how every real printf works.
 */

/**
 * Extract up to `fixed` decimal digits from the start of a numeric-looking
 * string (no rounding — just truncates, same as the original).
 * @param {number|string} n
 * @param {number} fixed
 * @returns {string}
 */
const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed}})?`))[0];

// NOTE: renamed from precision/precisionn (see file header) — kept as two
// functions since some callers may prefer the arrow-function form.
const cPrecision = function (n, fixed) {
	const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed}})?`);
	return `${n}`.match(re);
};

const cPrecisionn = (n, fixed) => {
	const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed}})?`);
	return `${n}`.match(re);
};

/**
 * Print a string to the page, appending <br> at the end.
 * @param {string} [string=""]
 */
function println(string = "") {
	document.write(string + "<br>");
}

/**
 * Print a string to the page as-is (no trailing <br>).
 * @param {string} [string=""]
 */
function print_(string = "") {
	document.write(string);
}

/**
 * Print one or more strings, converting "\n" to "<br>".
 * @param {...string} strings
 */
function echo(...strings) {
	const joined = strings.join("");
	document.write(joined.replace(/\n/g, "<br>"));
}

/**
 * Format `fmt` against `args`, consuming one placeholder per arg in the
 * order the placeholders appear (correct printf semantics). Supports
 * %s, %d, %i, %c, %f, %.Nf and %Nf (N = 1-9), and %% for a literal percent.
 * @param {string} fmt
 * @param {Array<string|number>} args
 * @returns {string}
 */
function formatPrintf(fmt, args) {
	let argIndex = 0;
	return String(fmt).replace(/%(?:(\.\d)|(\d))?([sdicf%])/g, (match, dotDigits, digit, spec) => {
		if (spec === '%') return '%';

		const arg = args[argIndex++];

		switch (spec) {
			case 's':
				return String(arg);
			case 'd':
			case 'i':
				return String(parseInt(arg, 10));
			case 'c':
				return String.fromCharCode(arg);
			case 'f': {
				const digits = dotDigits ? parseInt(dotDigits[1], 10) : (digit ? parseInt(digit, 10) : 2);
				return Number(arg).toFixed(digits);
			}
			default:
				return match;
		}
	});
}

/**
 * printf(format, ...args) — writes to the page via document.write.
 * "\n" in the format string becomes "<br>".
 * @param {...*} args - first element is the format string
 */
function printf(...args) {
	const [fmt, ...rest] = args;
	document.write(formatPrintf(fmt, rest).replace(/\n/g, "<br>"));
}

/**
 * printf_(format, ...args) — same as printf(), kept as a separate export
 * for backward compatibility with existing callers.
 * @param {...*} args - first element is the format string
 */
function printf_(...args) {
	printf(...args);
}

/**
 * Classify a JS value the way a C programmer might expect: single-char
 * strings are "char", everything else is "string" or "number".
 * @param {*} value
 * @returns {"char"|"string"|"number"|undefined}
 */
function TypeOfVar(value) {
	if (typeof value === "string" && value.length === 1) return "char";
	if (typeof value === "string") return "string";
	if (typeof value === "number") return "number";
	return undefined;
}
