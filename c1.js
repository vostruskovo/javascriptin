/* ======================================================
   Full single-file "C Standard Library" for Browser JS
   + struct/enum simulation
   + include-like header system
   ====================================================== */

/* =========================
   Basic Utilities & Memory
   ========================= */
function Ref(value) { return { value }; }

function typedef(name, value) {
  // Simple typedef registry (string name -> value)
  typedefs[name] = value;
  return value;
}
const typedefs = {};

/* =========================
   Virtual Header System
   - defineHeader(name, object)
   - include(name) -> returns object copy (to avoid accidental mutation)
   ========================= */
const __headerRegistry = {};
function defineHeader(name, obj) {
  __headerRegistry[name] = obj;
}
function include(name) {
  if (!__headerRegistry[name]) {
    console.warn(`Header "${name}" not found. Returning empty object.`);
    return {};
  }
  // shallow clone to simulate separate include copy
  return Object.assign({}, __headerRegistry[name]);
}

/* =========================
   stdio.h (browser)
   ========================= */
const stdio = (function(){
  function printf(format, ...args) {
    let i = 0;
    // support %s %d %f %c %j (json)
    const out = format.replace(/%[sdfcj]/g, token => {
      const a = args[i++];
      switch (token) {
        case '%s': return String(a);
        case '%d': return parseInt(a);
        case '%f': return parseFloat(a);
        case '%c': return String(a)[0] || '';
        case '%j': try { return JSON.stringify(a); } catch(e){ return String(a); }
        default: return token;
      }
    });
    console.log(out);
    return out;
  }

  async function scanf(format, varArray) {
    // Simple implementation using prompt(); supports whitespace-splitting
    const raw = prompt('Input:');
    const parts = raw ? raw.trim().split(/\s+/) : [];
    const tokens = (format.match(/%[sdf]/g) || []);
    for (let i = 0; i < varArray.length; i++) {
      const tok = tokens[i];
      const val = parts[i] === undefined ? null : parts[i];
      if (!tok) { varArray[i].value = val; continue; }
      switch (tok) {
        case '%d': varArray[i].value = parseInt(val); break;
        case '%f': varArray[i].value = parseFloat(val); break;
        case '%s': default: varArray[i].value = val; break;
      }
    }
    return varArray;
  }

  // File I/O simulation (localStorage)
  function fopen(name, mode = 'r') { return { name, mode }; }
  function fclose(file) { return 0; }
  function fprintf(file, text) {
    const prev = localStorage.getItem(file.name) || '';
    if (file.mode.includes('a')) localStorage.setItem(file.name, prev + text);
    else if (file.mode.includes('w')) localStorage.setItem(file.name, text);
    else console.error('File not open for writing');
  }
  function fread(name) { return localStorage.getItem(name) || ''; }
  function fwrite(name, text) { localStorage.setItem(name, text); }
  function remove(name) { localStorage.removeItem(name); }

  return { printf, scanf, fopen, fclose, fprintf, fread, fwrite, remove };
})();
defineHeader('stdio', stdio);

/* =========================
   stdlib.h, string.h, math.h, time.h (summarized)
   (kept minimal but useful)
   ========================= */
const stdlib = (function(){
  function atoi(s){ return parseInt(s); }
  function atof(s){ return parseFloat(s); }
  function itoa(n){ return String(n); }
  function malloc(n){ return new Array(n).fill(0); }
  function free(ptr){ /* no-op */ return null; }
  return { atoi, atof, itoa, malloc, free };
})();
defineHeader('stdlib', stdlib);

const stringh = (function(){
  function strlen(s){ return s.length; }
  function strcpy(destRef, src){ destRef.value = src; return destRef; }
  function strcat(destRef, src){ destRef.value += src; return destRef; }
  function strcmp(a, b){ return a === b ? 0 : (a > b ? 1 : -1); }
  function strstr(hay, needle){ return hay.indexOf(needle); }
  return { strlen, strcpy, strcat, strcmp, strstr };
})();
defineHeader('string', stringh);

const mathh = (function(){
  const randSeed = { v: Date.now() & 0xffffffff };
  function srand(s){ randSeed.v = s >>> 0; }
  function rand(){ randSeed.v = (randSeed.v * 1664525 + 1013904223) >>> 0; return randSeed.v & 0x7fffffff; }
  return {
    abs: Math.abs, sqrt: Math.sqrt, pow: Math.pow, sin: Math.sin, cos: Math.cos,
    tan: Math.tan, exp: Math.exp, log: Math.log, floor: Math.floor, ceil: Math.ceil,
    round: Math.round, max: Math.max, min: Math.min, srand, rand
  };
})();
defineHeader('math', mathh);

const timeh = (function(){
  const start = performance.now();
  function time(){ return Math.floor(Date.now()/1000); }
  function clock(){ return Math.floor(performance.now() - start); }
  return { time, clock };
})();
defineHeader('time', timeh);

/* =========================
   struct / enum simulation
   ========================= */

/*
  Struct:
    const Point = Struct({ x:0, y:0 }, { methods... });
    const p = Point(10,20); // or Point({x:10})
    p.x, p.y, p.move(dx,dy)
*/
function Struct(fields = {}, methods = {}) {
  // fields: {name: defaultValue, ...}
  // methods: {fnName: function(...) {...}}
  function Constructor(arg1) {
    const inst = {};
    // initialize fields from arg1 if object, else treat arguments as positional
    if (typeof arg1 === 'object' && !Array.isArray(arg1)) {
      for (const k of Object.keys(fields)) inst[k] = (arg1[k] !== undefined ? arg1[k] : cloneDefault(fields[k]));
    } else {
      // if called with positional args, read arguments object
      const args = arguments;
      const keys = Object.keys(fields);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        inst[k] = (args[i] !== undefined ? args[i] : cloneDefault(fields[k]));
      }
    }
    // attach methods (bound)
    for (const m of Object.keys(methods)) inst[m] = methods[m].bind(inst);
    // a simple toString
    inst.toString = function(){ return `{ ${Object.keys(fields).map(k => `${k}: ${JSON.stringify(inst[k])}`).join(', ')} }`; };
    return inst;
  }
  // allow defaults introspection
  Constructor._fields = Object.assign({}, fields);
  Constructor._methods = Object.assign({}, methods);
  return Constructor;
}
function cloneDefault(v){
  if (v === null || v === undefined) return v;
  if (Array.isArray(v)) return v.slice();
  if (typeof v === 'object') return Object.assign({}, v);
  return v;
}

/*
  Enum:
    const Color = Enum({ RED:0, GREEN:1, BLUE:2 });
    Color.RED -> 0
    Color[0] -> "RED"
*/
function Enum(obj) {
  const e = {};
  const reverse = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    e[k] = v;
    reverse[v] = k;
  }
  Object.defineProperty(e, 'nameOf', { value: val => reverse[val], writable: false, enumerable: false });
  return Object.freeze(e);
}

/* =========================
   Example typedefs, structs, enums and usage
   ========================= */

// typedefs
typedef('size_t', 'number'); // symbolic only

// Example struct: Point with a method
const Point = Struct({ x:0, y:0 }, {
  move: function(dx, dy){ this.x += dx; this.y += dy; return this; },
  distFromOrigin: function(){ return Math.sqrt(this.x*this.x + this.y*this.y); }
});
typedef('Point_t', Point);

// Example enum
const Color = Enum({ RED:0, GREEN:1, BLUE:2 });
typedef('Color', Color);

// Register these in a "header" if you want to include
defineHeader('types', { Point, Color });

/* =========================
   Example usage functions
   ========================= */
async function examples_struct_enum_include() {
  // include headers
  const stdio = include('stdio');
  const types = include('types');
  const math = include('math');

  // use struct
  const P1 = types.Point({ x: 3, y: 4 });
  stdio.printf("Point1: %j", P1);
  stdio.printf("Distance from origin: %d", P1.distFromOrigin());

  // use methods
  P1.move(1,2);
  stdio.printf("After move: %s", P1.toString());

  // use enum
  const Color = types.Color;
  stdio.printf("Color GREEN has value %d and name %s", Color.GREEN, Color.nameOf(Color.GREEN));

  // typedef example (symbolic)
  stdio.printf("size_t typedef is %s", typedefs['size_t']);

  // random from math header
  math.srand(12345);
  stdio.printf("Random example: %d", math.rand());
}

/* =========================
   Export main API (global)
   ========================= */
window.CPL = {
  Ref, typedef, include, defineHeader, Struct, Enum,
  // expose headers as convenience
  stdio: include('stdio'),
  stdlib: include('stdlib'),
  string: include('string'),
  math: include('math'),
  time: include('time'),
  // run examples
  examples_struct_enum_include
};

/* =========================
   Auto-run example if user wants:
   Uncomment to auto-run on page load:
   examples_struct_enum_include();
   ======