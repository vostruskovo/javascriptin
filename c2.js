/* ===============================================
   C Standard Library for JavaScript (Browser)
   =============================================== */

// ----- Reference (Pointer Simulation) -----
function Ref(value) {
  return { value };
}

// ----- stdio.h -----
function printf(format, ...args) {
  let i = 0;
  const output = format.replace(/%[sdfc]/g, match => {
    const arg = args[i++];
    switch (match) {
      case '%s': return String(arg);
      case '%d': return parseInt(arg);
      case '%f': return parseFloat(arg);
      case '%c': return String(arg)[0];
      default: return match;
    }
  });
  console.log(output);
}

async function scanf(format, variableArray) {
  const input = prompt('Input:');
  const parts = input ? input.trim().split(/\s+/) : [];
  const tokens = format.match(/%[sdf]/g) || [];

  for (let i = 0; i < variableArray.length; i++) {
    const fmt = tokens[i];
    let val = parts[i];
    switch (fmt) {
      case '%d': variableArray[i].value = parseInt(val); break;
      case '%f': variableArray[i].value = parseFloat(val); break;
      case '%s': default: variableArray[i].value = val; break;
    }
  }
}

// ----- time.h -----
function time() {
  return Math.floor(Date.now() / 1000);
}

const __clockStart = performance.now();
function clock() {
  return Math.floor(performance.now() - __clockStart);
}

// ----- math.h -----
function abs(x) { return Math.abs(x); }
function sqrt(x) { return Math.sqrt(x); }
function pow(x, y) { return Math.pow(x, y); }
function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function exp(x) { return Math.exp(x); }
function log(x) { return Math.log(x); }
function floor(x) { return Math.floor(x); }
function ceil(x) { return Math.ceil(x); }
function round(x) { return Math.round(x); }
function max(a, b) { return Math.max(a, b); }
function min(a, b) { return Math.min(a, b); }
function rand() {
  __randSeed = (__randSeed * 1103515245 + 12345) % 0x80000000;
  return __randSeed & 0x7FFFFFFF;
}
function srand(seed) { __randSeed = seed || Date.now(); }
let __randSeed = Date.now();

// ----- stdlib.h -----
function atoi(str) { return parseInt(str); }
function atof(str) { return parseFloat(str); }
function itoa(num) { return String(num); }
function system(cmd) { console.warn("system() not supported in browser"); }
function malloc(size) { return new Array(size).fill(0); }
function free(ptr) { return null; }

// ----- string.h -----
function strlen(str) { return str.length; }
function strcpy(dest, src) { dest.value = src; return dest; }
function strcat(dest, src) { dest.value += src; return dest; }
function strcmp(a, b) { return a === b ? 0 : (a > b ? 1 : -1); }
function strncpy(dest, src, n) { dest.value = src.slice(0, n); return dest; }
function strstr(haystack, needle) { return haystack.indexOf(needle); }
function strchr(str, ch) { return str.indexOf(ch); }
function strtok(str, delim) { return str.split(delim); }

// ----- File I/O Simulation via localStorage -----
function fopen(filename, mode) {
  return { filename, mode };
}

function fclose(file) {
  // No action needed for simulated file
  return 0;
}

function fprintf(file, content) {
  if (file.mode.includes('w') || file.mode.includes('a')) {
    const prev = localStorage.getItem(file.filename) || '';
    const newContent = file.mode.includes('a') ? prev + content : content;
    localStorage.setItem(file.filename, newContent);
  } else {
    console.error("File not opened in write mode");
  }
}

function fscanf(file) {
  const data = localStorage.getItem(file.filename);
  if (!data) return null;
  return data.split(/\s+/);
}

function fread(filename) {
  return localStorage.getItem(filename) || '';
}

function fwrite(filename, content) {
  localStorage.setItem(filename, content);
}

function remove(filename) {
  localStorage.removeItem(filename);
}

// ----- Misc -----
function exit(code) {
  alert(`Program exited with code ${code}`);
  throw new Error(`Program exited (${code})`);
}

// ----- Example Program -----
async function main() {
  printf("C standard library simulation in JavaScript!\n");
  printf("Current time (seconds since epoch): %d\n", time());
  printf("Clock ticks since start: %d\n", clock());

  const name = Ref("");
  await scanf("%s", [name]);
  printf("Hello, %s!\n", name.value);

  // File simulation
  const file = fopen("hello.txt", "w");
  fprintf(file, "Hello " + name.value + "!\n");
  fclose(file);

  printf("File saved to localStorage as 'hello.txt'\n");
  printf("Read file contents:\n");
  printf("%s\n", fread("hello.txt"));
}

// Uncomment to auto-run on page load
// mai