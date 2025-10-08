#!/usr/bin/env node

/**
 * Enhanced File Encryption Analyzer
 * Usage: node verifyEnc.js [options] <filename>
 * 
 * Options:
 *   -v, --verbose    Show detailed analysis
 *   -t, --threshold  Set custom entropy threshold (default: 7.5)
 *   --no-backup      Don't create backup for unencrypted files
 *   -h, --help       Show this help
 */

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

class EncryptionAnalyzer {
  constructor(options = {}) {
    this.verbose = options.verbose || false;
    this.entropyThreshold = options.entropyThreshold || 7.5;
    this.createBackup = options.createBackup !== false;
    this.filename = options.filename;
  }

  async analyze() {
    try {
      const fileStats = await stat(this.filename);
      if (fileStats.size === 0) {
        return this.formatResult("Empty file", { empty: true });
      }

      const buffer = await readFile(this.filename);
      const analysis = this.performAnalysis(buffer);
      
      return this.formatResult(analysis);
    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  performAnalysis(buffer) {
    const total = buffer.length;
    
    // Count printable ASCII characters
    const printableStats = this.countPrintableChars(buffer);
    
    // Calculate entropy
    const entropy = this.calculateEntropy(buffer);
    
    // Estimate compression ratio
    const compressionRatio = this.estimateCompression(buffer);
    
    // Check for common file signatures
    const fileSignature = this.checkFileSignature(buffer);
    
    // Determine if encrypted
    const isEncrypted = this.determineEncryption(
      entropy, 
      printableStats.ratio, 
      compressionRatio,
      fileSignature
    );

    return {
      isEncrypted,
      entropy,
      printableRatio: printableStats.ratio,
      printableCount: printableStats.count,
      totalBytes: total,
      compressionRatio,
      fileSignature,
      printableStats: this.getPrintableDistribution(buffer)
    };
  }

  countPrintableChars(buffer) {
    let printable = 0;
    let controlChars = 0;
    let extendedAscii = 0;

    for (let i = 0; i < buffer.length; i++) {
      const v = buffer[i];
      if (v === 9 || v === 10 || v === 13 || (v >= 32 && v <= 126)) {
        printable++;
      } else if (v < 32 || v === 127) {
        controlChars++;
      } else {
        extendedAscii++;
      }
    }

    return {
      count: printable,
      ratio: (printable / buffer.length) * 100,
      controlChars,
      extendedAscii
    };
  }

  calculateEntropy(buffer) {
    const counts = new Array(256).fill(0);
    const total = buffer.length;

    for (let i = 0; i < total; i++) {
      counts[buffer[i]]++;
    }

    let entropy = 0;
    for (let count of counts) {
      if (count > 0) {
        const p = count / total;
        entropy += -p * Math.log2(p);
      }
    }

    return entropy;
  }

  estimateCompression(buffer) {
    // Simple compression estimation by looking for repeated patterns
    if (buffer.length < 8) return 0;

    let repeatedBytes = 0;
    const byteCounts = new Array(256).fill(0);
    
    for (let byte of buffer) {
      byteCounts[byte]++;
    }

    // Calculate how many bytes appear multiple times
    for (let count of byteCounts) {
      if (count > 1) {
        repeatedBytes += count - 1;
      }
    }

    return (repeatedBytes / buffer.length) * 100;
  }

  checkFileSignature(buffer) {
    const signatures = {
      'pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
      'zip': [0x50, 0x4B, 0x03, 0x04], // PK..
      'png': [0x89, 0x50, 0x4E, 0x47], // .PNG
      'jpg': [0xFF, 0xD8, 0xFF, 0xE0], // JPEG
      'gzip': [0x1F, 0x8B], // GZIP
      'encrypted_zip': [0x50, 0x4B, 0x01, 0x02] // Encrypted ZIP
    };

    for (const [type, signature] of Object.entries(signatures)) {
      if (signature.every((byte, index) => buffer[index] === byte)) {
        return type;
      }
    }

    return 'unknown';
  }

  getPrintableDistribution(buffer) {
    const categories = {
      whitespace: 0,    // space, tab, newline
      alphanumeric: 0,  // a-z, A-Z, 0-9
      punctuation: 0,   // !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
      other: 0
    };

    for (let byte of buffer) {
      if (byte === 9 || byte === 10 || byte === 13 || byte === 32) {
        categories.whitespace++;
      } else if ((byte >= 48 && byte <= 57) || // 0-9
                 (byte >= 65 && byte <= 90) || // A-Z
                 (byte >= 97 && byte <= 122)) { // a-z
        categories.alphanumeric++;
      } else if ((byte >= 33 && byte <= 47) ||
                 (byte >= 58 && byte <= 64) ||
                 (byte >= 91 && byte <= 96) ||
                 (byte >= 123 && byte <= 126)) {
        categories.punctuation++;
      }
    }

    return categories;
  }

  determineEncryption(entropy, printableRatio, compressionRatio, fileSignature) {
    // High entropy, low printable characters suggest encryption
    const entropyHigh = entropy > this.entropyThreshold;
    const printableLow = printableRatio < 90;
    const compressionLow = compressionRatio < 30;
    
    // Some file types are typically compressed/encrypted
    const knownEncryptedTypes = ['encrypted_zip', 'gzip'];
    
    return (entropyHigh && printableLow && compressionLow) || 
           knownEncryptedTypes.includes(fileSignature);
  }

  formatResult(analysis) {
    if (typeof analysis === 'string') {
      return { message: analysis, shouldBackup: false };
    }

    const {
      isEncrypted,
      entropy,
      printableRatio,
      printableCount,
      totalBytes,
      compressionRatio,
      fileSignature
    } = analysis;

    let message = '';
    let shouldBackup = false;

    if (isEncrypted) {
      message = `🔒 File appears to be ENCRYPTED\n` +
                `   Entropy: ${entropy.toFixed(4)} (threshold: ${this.entropyThreshold})\n` +
                `   Printable characters: ${printableRatio.toFixed(2)}% (${printableCount}/${totalBytes})\n` +
                `   Compression estimate: ${compressionRatio.toFixed(2)}%\n` +
                `   File signature: ${fileSignature}`;
    } else {
      message = `📄 File appears to be UNENCRYPTED\n` +
                `   Entropy: ${entropy.toFixed(4)} (threshold: ${this.entropyThreshold})\n` +
                `   Printable characters: ${printableRatio.toFixed(2)}% (${printableCount}/${totalBytes})\n` +
                `   Compression estimate: ${compressionRatio.toFixed(2)}%\n` +
                `   File signature: ${fileSignature}`;
      shouldBackup = this.createBackup;
    }

    if (this.verbose) {
      message += `\n\n📊 Detailed Analysis:\n` +
                 `   Total bytes: ${totalBytes}\n` +
                 `   Control characters: ${analysis.printableStats.controlChars}\n` +
                 `   Extended ASCII: ${analysis.printableStats.extendedAscii}\n` +
                 `   Character distribution:\n` +
                 `     - Whitespace: ${analysis.printableStats.whitespace}\n` +
                 `     - Alphanumeric: ${analysis.printableStats.alphanumeric}\n` +
                 `     - Punctuation: ${analysis.printableStats.punctuation}\n` +
                 `     - Other: ${analysis.printableStats.other}`;
    }

    return { message, shouldBackup, analysis };
  }

  async createBackupFile() {
    const backupName = this.filename + '.bak';
    try {
      await promisify(fs.copyFile)(this.filename, backupName);
      return backupName;
    } catch (error) {
      throw new Error(`Failed to create backup: ${error.message}`);
    }
  }
}

// CLI interface
function showHelp() {
  console.log(`
Enhanced File Encryption Analyzer

Usage: node verifyEnc.js [options] <filename>

Options:
  -v, --verbose           Show detailed analysis
  -t, --threshold <num>   Set custom entropy threshold (default: 7.5)
  --no-backup            Don't create backup for unencrypted files
  -h, --help             Show this help message

Examples:
  node verifyEnc.js document.txt
  node verifyEnc.js -v encrypted_file.bin
  node verifyEnc.js --threshold 8.0 --no-backup large_file.dat
  `);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    showHelp();
    return;
  }

  // Parse command line options
  const options = {
    verbose: args.includes('-v') || args.includes('--verbose'),
    createBackup: !args.includes('--no-backup'),
    entropyThreshold: 7.5
  };

  // Extract threshold if provided
  const thresholdIndex = args.findIndex(arg => 
    arg === '-t' || arg === '--threshold'
  );
  if (thresholdIndex !== -1 && args[thresholdIndex + 1]) {
    options.entropyThreshold = parseFloat(args[thresholdIndex + 1]);
  }

  // Get filename (last argument that doesn't start with -)
  const filename = args.filter(arg => !arg.startsWith('-')).pop();
  
  if (!filename) {
    console.error("Error: No filename provided");
    showHelp();
    process.exit(1);
  }

  if (!fs.existsSync(filename)) {
    console.error(`Error: File '${filename}' not found`);
    process.exit(1);
  }

  options.filename = filename;

  try {
    const analyzer = new EncryptionAnalyzer(options);
    const result = await analyzer.analyze();

    console.log(result.message);

    if (result.shouldBackup) {
      const backupName = await analyzer.createBackupFile();
      console.log(`\n✅ Backup created: ${backupName}`);
    }

    // Exit with appropriate code
    process.exit(result.analysis && result.analysis.isEncrypted ? 0 : 1);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = EncryptionAnalyzer;
