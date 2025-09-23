#!/usr/bin/env node

/**
 * Usage: node verifyEnc.js filename
 */

const fs = require("fs");
const path = require("path");

const file = process.argv[2];

if (!file) {
  console.error("Usage: node verifyEnc.js filename");
  process.exit(1);
}

if (!fs.existsSync(file)) {
  console.error("File not found!");
  process.exit(1);
}

const buffer = fs.readFileSync(file);
const total = buffer.length;

if (total === 0) {
  console.log("Empty file");
  process.exit(0);
}

// Count printable ASCII (9=TAB, 10=LF, 13=CR, 32–126 printable chars)
let printable = 0;
for (let i = 0; i < total; i++) {
  const v = buffer[i];
  if (v === 9 || v === 10 || v === 13 || (v >= 32 && v <= 126)) {
    printable++;
  }
}
const ratio = ((printable / total) * 100).toFixed(2);

// Shannon entropy
let counts = new Array(256).fill(0);
for (let i = 0; i < total; i++) {
  counts[buffer[i]]++;
}

let entropy = 0;
for (let c of counts) {
  if (c > 0) {
    let p = c / total;
    entropy += -p * Math.log2(p);
  }
}
entropy = entropy.toFixed(4);

// Decision logic
if (ratio === "100.00") {
  console.log(`this file is encrypted #with ${ratio}% printable, entropy=${entropy}#`);
} else {
  const backup = file + ".bak";
  fs.copyFileSync(file, backup);
  console.log(`this file is not encrypted (printable=${ratio}%, entropy=${entropy})`);
  console.log(`Backup created: ${backup}`);
}
