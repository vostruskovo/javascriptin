/* =====================================================
   PHP Standard Library for Browser JavaScript
   Single-file version (namespaced as "php")
   ===================================================== 


⚙️ What It Includes
Category  Examples
Output/Input  php.echo(), php.print(), php.readline()
Strings php.strlen(), php.strpos(), php.str_replace(), php.substr()
Arrays  php.array_push(), php.in_array(), php.array_sum(), php.array_merge()
Math  php.pow(), php.sqrt(), php.rand(), php.round()
Date/Time php.time(), php.date()
Type Checks php.is_string(), php.is_array(), php.empty()
JSON/URL  php.json_encode(), php.urlencode()
Files (simulated) php.file_put_contents(), php.file_get_contents() (via localStorage)
Misc  php.sleep(), php.print_r(), php.var_export()

   */

const php = (() => {
  const php = {};

  /* -----------------------------------------
     BASIC OUTPUT / INPUT
     ----------------------------------------- */
  php.echo = (...args) => console.log(args.join(""));
  php.print = php.echo;
  php.var_dump = (...args) => console.log(...args.map(a => JSON.stringify(a, null, 2)));
  php.die = (msg = "") => { throw new Error(msg || "Script terminated with die()"); };
  php.exit = php.die;
  php.readline = (msg = "") => prompt(msg);

  /* -----------------------------------------
     STRINGS
     ----------------------------------------- */
  php.strlen = s => String(s).length;
  php.strpos = (hay, needle, offset = 0) => String(hay).indexOf(needle, offset);
  php.strrpos = (hay, needle) => String(hay).lastIndexOf(needle);
  php.substr = (s, start, len) => String(s).substr(start, len);
  php.str_replace = (search, replace, subject) => String(subject).split(search).join(replace);
  php.strtolower = s => String(s).toLowerCase();
  php.strtoupper = s => String(s).toUpperCase();
  php.ucfirst = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  php.trim = s => String(s).trim();
  php.ltrim = s => String(s).replace(/^\s+/, "");
  php.rtrim = s => String(s).replace(/\s+$/, "");
  php.explode = (delim, s) => String(s).split(delim);
  php.implode = (glue, arr) => arr.join(glue);
  php.number_format = (n, d = 0) => Number(n).toFixed(d);

  /* -----------------------------------------
     ARRAYS
     ----------------------------------------- */
  php.count = arr => Array.isArray(arr) ? arr.length : Object.keys(arr || {}).length;
  php.array_push = (arr, ...items) => arr.push(...items);
  php.array_pop = arr => arr.pop();
  php.array_shift = arr => arr.shift();
  php.array_unshift = (arr, ...items) => arr.unshift(...items);
  php.array_merge = (...arrs) => arrs.flat();
  php.in_array = (val, arr) => arr.includes(val);
  php.array_keys = obj => Object.keys(obj);
  php.array_values = obj => Object.values(obj);
  php.array_reverse = arr => arr.slice().reverse();
  php.array_slice = (arr, start, end) => arr.slice(start, end);
  php.array_sum = arr => arr.reduce((a, b) => a + b, 0);
  php.array_map = (fn, arr) => arr.map(fn);
  php.array_filter = (arr, fn) => arr.filter(fn);
  php.array_reduce = (arr, fn, init) => arr.reduce(fn, init);

  /* -----------------------------------------
     MATH / RANDOM
     ----------------------------------------- */
  php.abs = Math.abs;
  php.round = Math.round;
  php.ceil = Math.ceil;
  php.floor = Math.floor;
  php.max = Math.max;
  php.min = Math.min;
  php.pow = Math.pow;
  php.sqrt = Math.sqrt;
  php.rand = (min = 0, max = 32767) => Math.floor(Math.random() * (max - min + 1)) + min;
  php.mt_rand = php.rand;
  php.mt_srand = seed => { console.warn("php.mt_srand: Not needed in JS (Math.random is seeded internally)."); };
  php.deg2rad = deg => deg * (Math.PI / 180);
  php.rad2deg = rad => rad * (180 / Math.PI);

  /* -----------------------------------------
     TIME / DATE
     ----------------------------------------- */
  php.time = () => Math.floor(Date.now() / 1000);
  php.microtime = () => Date.now() / 1000;
  php.date = (fmt = "Y-m-d H:i:s", ts = php.time()) => {
    const d = new Date(ts * 1000);
    const pad = n => n.toString().padStart(2, "0");
    return fmt
      .replace("Y", d.getFullYear())
      .replace("m", pad(d.getMonth() + 1))
      .replace("d", pad(d.getDate()))
      .replace("H", pad(d.getHours()))
      .replace("i", pad(d.getMinutes()))
      .replace("s", pad(d.getSeconds()));
  };

  /* -----------------------------------------
     TYPE CHECKS
     ----------------------------------------- */
  php.is_string = x => typeof x === "string";
  php.is_array = Array.isArray;
  php.is_object = x => x && typeof x === "object" && !Array.isArray(x);
  php.is_number = x => typeof x === "number" && !isNaN(x);
  php.is_bool = x => typeof x === "boolean";
  php.is_null = x => x === null;
  php.isset = x => x !== undefined && x !== null;
  php.empty = x => x === undefined || x === null || x === "" || (Array.isArray(x) && x.length === 0);

  /* -----------------------------------------
     JSON / URL
     ----------------------------------------- */
  php.json_encode = obj => JSON.stringify(obj);
  php.json_decode = (str, assoc = true) => {
    const val = JSON.parse(str);
    return assoc ? val : val;
  };
  php.urlencode = encodeURIComponent;
  php.urldecode = decodeURIComponent;

  /* -----------------------------------------
     FILES (localStorage simulation)
     ----------------------------------------- */
  php.file_put_contents = (filename, data) => {
    localStorage.setItem(filename, data);
    return php.strlen(data);
  };
  php.file_get_contents = filename => localStorage.getItem(filename) || null;
  php.unlink = filename => localStorage.removeItem(filename);
  php.file_exists = filename => localStorage.getItem(filename) !== null;

  /* -----------------------------------------
     MISC
     ----------------------------------------- */
  php.sleep = seconds => new Promise(res => setTimeout(res, seconds * 1000));
  php.print_r = obj => console.log(obj);
  php.var_export = obj => console.log(JSON.stringify(obj, null, 2));
  php.define = (name, val) => (php[name] = val);
  php.gettype = x => Array.isArray(x) ? "array" : typeof x;

  /* -----------------------------------------
     SIMULATED GLOBALS
     ----------------------------------------- */
  php.$_GET = {};
  php.$_POST = {};
  php.$_FILES = {};
  php.$_SERVER = {
    REQUEST_TIME: php.time(),
    USER_AGENT: navigator.userAgent
  };

  /* -----------------------------------------
     DEMO FUNCTION
     ----------------------------------------- */
  php.demo = async () => {
    php.echo("Hello from PHP-in-JS!\n");
    php.echo("Current date: ", php.date("Y-m-d H:i:s"), "\n");

    const name = php.readline("What is your name?");
    php.echo("Hi ", name, "!\n");

    const arr = [1, 2, 3, 4, 5];
    php.echo("Sum of array: ", php.array_sum(arr), "\n");

    php.file_put_contents("example.txt", "Hello " + name);
    php.echo("File saved. Contents: ", php.file_get_contents("example.txt"), "\n");

    php.echo("Random number: ", php.rand(1, 100), "\n");
  };

  return php;
})();

/* Attach globally */
window.php = php;
