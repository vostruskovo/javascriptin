/*
⚙️ How It Works

printf: prints formatted text (supports %s, %d, %f)

scanf: reads from stdin (Node.js only), writes into Ref() objects

time / clock: mimic C time functions

rand, srand: simple pseudorandom generator

strlen, strcmp, strcpy, strcat: basic string operations

malloc / free: simulated memory management

Ref(): acts like a pointer or reference (Ref({value: ...}))
*/





// =============================
// C Standard Library in JavaScript
// =============================

// ---- Input & Output ----

// printf(format, ...args)
// Supports placeholders: %s, %d, %f
function printf(format, ...args) {
  let i = 0;
  const output = format.replace(/%[sdf]/g, match => {
    const arg = args[i++];
    switch (match) {
      case '%s': return String(arg);
      case '%d': return parseInt(arg);
      case '%f': return parseFloat(arg);
      default: return match;
    }
  });
  process.stdout.write(output);
}

// scanf(format, variableArray)
// NOTE: Works only in Node.js (requires stdin)
async function scanf(format, variableArray) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  let answer = await question('');
  rl.close();

  const parts = answer.trim().split(/\s+/);
  for (let i = 0; i < variableArray.length; i++) {
    const formatType = (format.match(/%[sdf]/g) || [])[i];
    switch (formatType) {
      case '%d':
        variableArray[i].value = parseInt(parts[i]);
        break;
      case '%f':
        variableArray[i].value = parseFloat(parts[i]);
        break;
      case '%s':
      default:
        variableArray[i].value = parts[i];
        break;
    }
  }
}

// ---- Time ----

// time() → seconds since UNIX epoch
function time() {
  return Math.floor(Date.now() / 1000);
}

// clock() → milliseconds since program start
const __startClock = Date.now();
function clock() {
  return Date.now() - __startClock;
}

// ---- Math ----

function abs(x) { return Math.abs(x); }
function pow(x, y) { return Math.pow(x, y); }
function sqrt(x) { return Math.sqrt(x); }
function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }

// ---- Random ----

function srand(seed) {
  __randomSeed = seed || Date.now();
}
let __randomSeed = Date.now();
function rand() {
  __randomSeed = (__randomSeed * 1103515245 + 12345) % 0x80000000;
  return __randomSeed & 0x7FFFFFFF;
}

// ---- String ----

function strlen(str) { return str.length; }
function strcmp(a, b) { return a === b ? 0 : a > b ? 1 : -1; }
function strcpy(dest, src) { dest.value = src; return dest; }
function strcat(dest, src) { dest.value += src; return dest; }

// ---- Memory (simulated) ----

function malloc(size) {
  return new Array(size).fill(0);
}
function free(ptr) {
  // JavaScript handles memory automatically
  return null;
}

// ---- Example Structure Simulation ----
// (To simulate C "pass by reference")
function Ref(value) {
  return { value };
}

// ---- Example main() ----
async function main() {
  printf("Hello %s! The time is %d\n", "world", time());

  const name = Ref("");
  printf("Enter your name: ");
  await scanf("%s", [name]);

  printf("Hi, %s!\n", name.value);
}

// Uncomment below to run as standalone
// main();


