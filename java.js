/* =====================================================
   Java Standard Library Simulation in JavaScript (Browser)
   Packages: java.lang, java.io, java.util
   ===================================================== */

const java = {};

// ---------------- java.lang ----------------
java.lang = {};

// ----- System -----
java.lang.System = {
  out: {
    print: (msg) => console.log(msg ?? ""),
    println: (msg) => console.log((msg ?? "") + "\n")
  },
  currentTimeMillis: () => Date.now(),
  nanoTime: () => performance.now() * 1e6,
  exit: (code = 0) => {
    alert(`Program exited with code ${code}`);
    throw new Error(`Program exited (${code})`);
  }
};

// ----- Thread -----
java.lang.Thread = {
  sleep: async (ms) => new Promise(resolve => setTimeout(resolve, ms))
};

// ----- Math -----
java.lang.Math = {
  PI: Math.PI,
  E: Math.E,
  abs: Math.abs,
  sqrt: Math.sqrt,
  pow: Math.pow,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: Math.log,
  exp: Math.exp,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  max: Math.max,
  min: Math.min,
  random: () => Math.random(),
};

// ----- String -----
java.lang.String = {
  valueOf: (val) => String(val),
  equals: (a, b) => a === b,
  equalsIgnoreCase: (a, b) => a.toLowerCase() === b.toLowerCase(),
  length: (s) => s.length,
  charAt: (s, i) => s.charAt(i),
  substring: (s, start, end) => s.substring(start, end),
  toUpperCase: (s) => s.toUpperCase(),
  toLowerCase: (s) => s.toLowerCase(),
  indexOf: (s, sub) => s.indexOf(sub),
  trim: (s) => s.trim(),
  replace: (s, a, b) => s.replaceAll(a, b),
  contains: (s, sub) => s.includes(sub),
  split: (s, sep) => s.split(sep)
};

// ----- Exceptions -----
java.lang.Exception = class extends Error {
  constructor(message) {
    super(message);
    this.name = "Exception";
  }
};

java.lang.tryCatch = async (tryFn, catchFn) => {
  try { await tryFn(); }
  catch (err) { if (catchFn) catchFn(err); }
};

// ----- Wrapper classes -----
java.lang.Integer = {
  parseInt: (s) => parseInt(s),
  valueOf: (n) => Number(n),
  toString: (n) => String(n)
};

java.lang.Double = {
  parseDouble: (s) => parseFloat(s),
  valueOf: (n) => Number(n),
  toString: (n) => String(n)
};

java.lang.Boolean = {
  parseBoolean: (s) => String(s).toLowerCase() === "true",
  valueOf: (b) => Boolean(b),
  toString: (b) => String(b)
};

// ---------------- java.util ----------------
java.util = {};

java.util.Random = class {
  nextInt(max) { return Math.floor(Math.random() * max); }
  nextDouble() { return Math.random(); }
  nextBoolean() { return Math.random() < 0.5; }
};

java.util.ArrayList = class {
  constructor() { this.data = []; }
  add(item) { this.data.push(item); }
  get(i) { return this.data[i]; }
  set(i, val) { this.data[i] = val; }
  remove(i) { this.data.splice(i, 1); }
  size() { return this.data.length; }
  clear() { this.data = []; }
  contains(item) { return this.data.includes(item); }
  toString() { return "[" + this.data.join(", ") + "]"; }
};

java.util.HashMap = class {
  constructor() { this.map = new Map(); }
  put(key, value) { this.map.set(key, value); }
  get(key) { return this.map.get(key); }
  remove(key) { this.map.delete(key); }
  containsKey(key) { return this.map.has(key); }
  containsValue(value) { return Array.from(this.map.values()).includes(value); }
  size() { return this.map.size; }
  clear() { this.map.clear(); }
  keySet() { return Array.from(this.map.keys()); }
  values() { return Array.from(this.map.values()); }
  toString() {
    return "{" + Array.from(this.map.entries())
      .map(([k, v]) => `${k}=${v}`).join(", ") + "}";
  }
};

java.util.Collections = {
  sort: (arr) => arr.sort(),
  reverse: (arr) => arr.reverse(),
  shuffle: (arr) => arr.sort(() => Math.random() - 0.5),
};

java.util.Scanner = class {
  constructor(source = "") {
    this.tokens = source.trim().split(/\s+/);
    this.index = 0;
  }
  next() { return this.tokens[this.index++]; }
  nextInt() { return parseInt(this.next()); }
  nextDouble() { return parseFloat(this.next()); }
  hasNext() { return this.index < this.tokens.length; }
};

// ---------------- java.io ----------------
java.io = {};

java.io.File = class {
  constructor(name) { this.name = name; }
  exists() { return localStorage.getItem(this.name) !== null; }
  delete() { localStorage.removeItem(this.name); }
  getName() { return this.name; }
  length() {
    const data = localStorage.getItem(this.name);
    return data ? data.length : 0;
  }
};

java.io.FileWriter = class {
  constructor(file, append = false) {
    this.file = file;
    this.append = append;
  }
  write(content) {
    const prev = this.append ? (localStorage.getItem(this.file.name) || "") : "";
    localStorage.setItem(this.file.name, prev + content);
  }
  close() {}
};

java.io.FileReader = class {
  constructor(file) {
    this.file = file;
  }
  read() {
    return localStorage.getItem(this.file.name) || "";
  }
};

java.io.BufferedReader = class {
  constructor(reader) {
    this.lines = (reader.read() || "").split(/\n/);
    this.index = 0;
  }
  readLine() {
    return this.index < this.lines.length ? this.lines[this.index++] : null;
  }
};

java.io.PrintWriter = class {
  constructor(file) {
    this.writer = new java.io.FileWriter(file);
  }
  println(text) {
    this.writer.write(text + "\n");
  }
  close() { this.writer.close(); }
};

// ---------------- Example Program ----------------
async function main() {
  java.lang.System.out.println("=== Java.lang + Java.io + Java.util Simulation ===");

  const rand = new java.util.Random();
  java.lang.System.out.println("Random int(0–100): " + rand.nextInt(100));

  const list = new java.util.ArrayList();
  list.add("C");
  list.add("Java");
  list.add("Python");
  java.lang.System.out.println("List: " + list.toString());
  java.util.Collections.shuffle(list.data);
  java.lang.System.out.println("Shuffled: " + list.toString());

  // File example
  const file = new java.io.File("demo.txt");
  const writer = new java.io.FileWriter(file);
  writer.write("Hello from simulated Java I/O!\nLine 2\nLine 3");
  writer.close();

  const reader = new java.io.FileReader(file);
  const buf = new java.io.BufferedReader(reader);
  let line;
  java.lang.System.out.println("--- File Contents ---");
  while ((line = buf.readLine()) !== null) {
    java.lang.System.out.println(line);
  }

  // Scanner example
  const scanner = new java.util.Scanner("123 456 789");
  while (scanner.hasNext()) {
    java.lang.System.out.println("Next int: " + scanner.nextInt());
  }
}

// Uncomment to run automatically
// main();
