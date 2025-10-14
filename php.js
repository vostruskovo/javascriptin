/* =====================================================
   PHP Standard Library Simulation in JavaScript (Browser)
   ===================================================== */

const php = {};

// ---------------- Basic PHP Functions ----------------
php.echo = (...args) => console.log(args.join(' '));
php.print = (msg) => console.log(msg);
php.printf = (format, ...args) => {
  let i = 0;
  console.log(format.replace(/%[sdf]/g, () => args[i++] || ''));
};

php.isset = (variable) => variable !== undefined && variable !== null;
php.empty = (value) => !value || value === 0 || value === '' || value === false;
php.is_null = (value) => value === null;
php.unset = (variable) => { variable = undefined; };

// ---------------- String Functions ----------------
php.strlen = (str) => String(str).length;
php.strpos = (haystack, needle, offset = 0) => String(haystack).indexOf(needle, offset);
php.substr = (str, start, length) => String(str).substr(start, length);
php.strtoupper = (str) => String(str).toUpperCase();
php.strtolower = (str) => String(str).toLowerCase();
php.trim = (str, charlist = " \\n\\r\\t\\v\\0") => String(str).trim();
php.explode = (separator, str, limit = Number.MAX_SAFE_INTEGER) => String(str).split(separator, limit);
php.implode = (separator, array) => array.join(separator);
php.str_replace = (search, replace, subject) => String(subject).split(search).join(replace);

// ---------------- Array Functions ----------------
php.array = (...elements) => [...elements];
php.count = (array) => array.length;
php.in_array = (needle, haystack) => haystack.includes(needle);
php.array_push = (array, ...elements) => array.push(...elements);
php.array_pop = (array) => array.pop();
php.array_shift = (array) => array.shift();
php.array_unshift = (array, ...elements) => array.unshift(...elements);
php.array_merge = (...arrays) => [].concat(...arrays);
php.array_slice = (array, offset, length = undefined) => array.slice(offset, length === undefined ? undefined : offset + length);
php.array_reverse = (array) => [...array].reverse();
php.sort = (array) => array.sort();
php.rsort = (array) => array.sort().reverse();

// ---------------- Math Functions ----------------
php.abs = Math.abs;
php.round = (value, precision = 0) => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};
php.floor = Math.floor;
php.ceil = Math.ceil;
php.rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
php.min = (...values) => Math.min(...values.flat());
php.max = (...values) => Math.max(...values.flat());
php.pi = () => Math.PI;

// ---------------- File System Functions ----------------
php.file_put_contents = (filename, data) => {
  localStorage.setItem(filename, data);
  return true;
};

php.file_get_contents = (filename) => {
  return localStorage.getItem(filename) || false;
};

php.file_exists = (filename) => {
  return localStorage.getItem(filename) !== null;
};

php.unlink = (filename) => {
  localStorage.removeItem(filename);
  return true;
};

// ---------------- Date/Time Functions ----------------
php.date = (format = 'Y-m-d H:i:s') => {
  const now = new Date();
  const replacements = {
    'Y': now.getFullYear(),
    'm': String(now.getMonth() + 1).padStart(2, '0'),
    'd': String(now.getDate()).padStart(2, '0'),
    'H': String(now.getHours()).padStart(2, '0'),
    'i': String(now.getMinutes()).padStart(2, '0'),
    's': String(now.getSeconds()).padStart(2, '0')
  };
  
  return format.replace(/[YmdHis]/g, match => replacements[match] || match);
};

php.time = () => Math.floor(Date.now() / 1000);

// ---------------- Example PHP Program ----------------
async function phpExample() {
  php.echo("=== PHP Standard Library Simulation ===");
  
  // String operations
  const str = "Hello, World!";
  php.echo("Original:", str);
  php.echo("Uppercase:", php.strtoupper(str));
  php.echo("Length:", php.strlen(str));
  
  // Array operations
  const fruits = php.array("apple", "banana", "orange");
  php.array_push(fruits, "grape");
  php.echo("Fruits:", php.implode(", ", fruits));
  php.echo("Fruit count:", php.count(fruits));
  
  // File operations
  php.file_put_contents("test.php.txt", "This is a PHP-style file content");
  const content = php.file_get_contents("test.php.txt");
  php.echo("File content:", content);
  
  // Math operations
  php.echo("Random number:", php.rand(1, 100));
  php.echo("Current date:", php.date());
}