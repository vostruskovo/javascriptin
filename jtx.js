/**
 * @file jTx - JavaScript Code Converter
 * @description A tool to convert JavaScript code to other programming languages
 * @version 2.1.0
 */

class jTxConverter {
    constructor() {
        // Configuration cache for performance
        this._configCache = {};
        this._compilerCache = {};
        this._history = [];
        this._historyIndex = -1;
        this._debounceTimeout = null;

        this.tags = {
            "javascript": {
                patterns: [
                    /document\.write/gi,
                    /console\.log/gi,
                    /let\s+/gi,
                    /const\s+/gi,
                    /var\s+/gi,
                    /function\s+(\w+)/gi,
                    /=>/gi,
                    /`(?:\\.|[^`])*`/gi, // Template literals
                    /\.forEach/gi,
                    /\.map/gi
                ],
                replacements: [
                    "console.log",
                    "console.log",
                    "let ",
                    "const ",
                    "var ",
                    "function $1",
                    "=>",
                    "`$1`",
                    ".forEach",
                    ".map"
                ]
            },
            "php": {
                patterns: [
                    /document\.write/gi,
                    /console\.log/gi,
                    /let\s+/gi,
                    /const\s+/gi,
                    /var\s+/gi,
                    /function\s+(\w+)/gi,
                    /=>/gi,
                    /`(?:\\.|[^`])*`/gi,
                    /\.forEach/gi,
                    /\.map/gi
                ],
                replacements: [
                    "echo",
                    "echo",
                    "$",
                    "$",
                    "$",
                    "function $1",
                    "fn",
                    "'$1'",
                    ".each",
                    ".map"
                ]
            },
            "python": {
                patterns: [
                    /document\.write/gi,
                    /console\.log/gi,
                    /let\s+/gi,
                    /const\s+/gi,
                    /var\s+/gi,
                    /function\s+(\w+)/gi,
                    /=>/gi,
                    /`(?:\\.|[^`])*`/gi,
                    /\.forEach/gi,
                    /{/gi,
                    /}/gi,
                    /;/gi
                ],
                replacements: [
                    "print",
                    "print",
                    "",
                    "",
                    "",
                    "def $1",
                    "lambda",
                    "f\"$1\"",
                    "",
                    ":",
                    "",
                    ""
                ]
            },
            "java": {
                patterns: [
                    /document\.write/gi,
                    /console\.log/gi,
                    /let\s+/gi,
                    /const\s+/gi,
                    /var\s+/gi,
                    /function\s+(\w+)/gi,
                    /=>/gi,
                    /`(?:\\.|[^`])*`/gi
                ],
                replacements: [
                    "System.out.println",
                    "System.out.println",
                    "",
                    "final ",
                    "",
                    "public void $1",
                    "->",
                    "\"$1\""
                ]
            },
            "csharp": {
                patterns: [
                    /document\.write/gi,
                    /console\.log/gi,
                    /let\s+/gi,
                    /const\s+/gi,
                    /var\s+/gi,
                    /function\s+(\w+)/gi,
                    /=>/gi,
                    /`(?:\\.|[^`])*`/gi
                ],
                replacements: [
                    "Console.WriteLine",
                    "Console.WriteLine",
                    "var ",
                    "const ",
                    "var ",
                    "void $1",
                    "=>",
                    "$\"$1\""
                ]
            }
        };

        this.compilers = {
            "php": [
                {
                    name: "WritePHP Online",
                    url: "https://www.writephponline.com/",
                    description: "Quick PHP testing environment"
                },
                {
                    name: "OneCompiler PHP",
                    url: "https://onecompiler.com/php/42x5ab9pq",
                    description: "Full-featured PHP compiler"
                },
                {
                    name: "W3Schools PHP",
                    url: "https://www.w3schools.com/php/phptryit.asp?filename=tryphp_compiler",
                    description: "Educational PHP environment"
                }
            ],
            "java": [
                {
                    name: "Replit Java",
                    url: "https://replit.com/languages/java10",
                    description: "Online Java IDE"
                },
                {
                    name: "OneCompiler Java",
                    url: "https://onecompiler.com/java",
                    description: "Java compiler with multiple versions"
                },
                {
                    name: "OnlineGDB Java",
                    url: "https://www.onlinegdb.com/online_java_compiler",
                    description: "Debugger included"
                },
                {
                    name: "W3Schools Java",
                    url: "https://www.w3schools.com/java/tryjava.asp?filename=demo_compiler",
                    description: "Learn and test Java"
                }
            ],
            "python": [
                {
                    name: "Replit Python",
                    url: "https://replit.com/languages/python3",
                    description: "Full Python environment"
                },
                {
                    name: "OneCompiler Python",
                    url: "https://onecompiler.com/python",
                    description: "Python 3 compiler"
                },
                {
                    name: "Programiz Python",
                    url: "https://www.programiz.com/python-programming/online-compiler/",
                    description: "User-friendly Python compiler"
                }
            ],
            "javascript": [
                {
                    name: "JSFiddle",
                    url: "https://jsfiddle.net/",
                    description: "Advanced JavaScript testing"
                },
                {
                    name: "CodePen",
                    url: "https://codepen.io/pen/",
                    description: "Frontend development environment"
                },
                {
                    name: "OneCompiler JS",
                    url: "https://onecompiler.com/javascript",
                    description: "Node.js environment"
                }
            ]
        };

        this.currentLang = "php";
        this.stats = {
            conversions: 0,
            lastConversion: null,
            popularLanguages: {}
        };
        
        // Add live conversion toggle state
        this.liveConversion = false;
    }

    /**
     * Initialize the jTx converter interface
     * @param {string} defaultLang - Default language for conversion
     */
    init(defaultLang = "php") {
        this.currentLang = defaultLang;
        
        const appContainer = document.getElementById('jtx-app') || document.body;
        
        appContainer.innerHTML = `
            <div class="jtx-container" role="main" aria-label="JavaScript Code Converter">
                <header class="jtx-header">
                    <h1 class="jtx-title">🚀 jTx Code Converter</h1>
                    <p class="jtx-subtitle">Convert JavaScript code to multiple programming languages</p>
                    <span class="jtx-version">v2.1.0</span>
                </header>

                <div class="jtx-controls" role="toolbar" aria-label="Conversion controls">
                    <div class="language-selector">
                        <label for="jtx-language-select" class="visually-hidden">Convert to:</label>
                        <select id="jtx-language-select" class="jtx-select" aria-label="Select target language">
                            ${this.#generateLanguageOptions()}
                        </select>
                    </div>
                    
                    <button id="jtx-convert-btn" class="jtx-btn jtx-btn-primary" aria-label="Convert to ${this.currentLang}">
                        Convert to ${this.currentLang}
                    </button>
                    
                    <button id="jtx-copy-btn" class="jtx-btn jtx-btn-secondary" aria-label="Copy converted code">
                        Copy Result
                    </button>
                    
                    <button id="jtx-clear-btn" class="jtx-btn jtx-btn-outline" aria-label="Clear all code">
                        Clear All
                    </button>

                    <button id="jtx-undo-btn" class="jtx-btn jtx-btn-undo" aria-label="Undo last conversion" disabled>
                        ↺ Undo
                    </button>
                    
                    <div class="jtx-toggle-wrapper">
                        <label class="jtx-toggle-label">
                            <input type="checkbox" id="jtx-live-toggle" class="jtx-toggle">
                            <span class="jtx-toggle-slider"></span>
                            Live Preview
                        </label>
                    </div>
                </div>

                <div class="jtx-editor-container">
                    <div class="editor-section">
                        <label class="editor-label" for="jtx-input">JavaScript Code Input:</label>
                        <textarea 
                            id="jtx-input" 
                            class="jtx-textarea jtx-input"
                            placeholder="Paste your JavaScript code here...\nExample:\nfunction greet(name) {\n  console.log('Hello, ' + name);\n}\n\ngreet('World');"
                            rows="15"
                            spellcheck="false"
                            aria-label="JavaScript code input"
                        ></textarea>
                        <div class="editor-info">
                            <span id="input-stats">Lines: 0 | Chars: 0</span>
                            <span id="input-language" class="language-detected"></span>
                        </div>
                    </div>

                    <div class="editor-section">
                        <label class="editor-label" for="jtx-output">Converted ${this.currentLang.toUpperCase()} Code:</label>
                        <textarea 
                            id="jtx-output" 
                            class="jtx-textarea jtx-output"
                            placeholder="Converted code will appear here..."
                            rows="15"
                            readonly
                            spellcheck="false"
                            aria-label="Converted code output"
                        ></textarea>
                        <div class="editor-info">
                            <span id="output-stats">Lines: 0 | Chars: 0</span>
                            <button id="jtx-download-btn" class="jtx-download-btn" aria-label="Download converted code">📥 Download</button>
                        </div>
                    </div>
                </div>

                <div class="jtx-compilers">
                    <h3 id="jtx-compiler-title">Try ${this.currentLang} Online</h3>
                    <div id="jtx-compiler-links" class="compiler-links" role="list">
                        ${this.#generateCompilerLinks()}
                    </div>
                </div>

                <div class="jtx-stats">
                    <h4>Conversion Statistics</h4>
                    <div id="jtx-stats-content" class="stats-content">
                        Total conversions: ${this.stats.conversions}
                    </div>
                </div>
            </div>
        `;

        this.#attachEventListeners();
        this.#updateTextareaStats('input', '');
        this.#updateTextareaStats('output', '');
    }

    /**
     * Generate language options for select element
     * @returns {string} HTML options
     */
    #generateLanguageOptions() {
        return Object.keys(this.tags)
            .map(lang => `
                <option value="${lang}" ${lang === this.currentLang ? 'selected' : ''}>
                    ${lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
            `).join('');
    }

    /**
     * Generate compiler links for current language
     * @returns {string} HTML links
     */
    #generateCompilerLinks() {
        // Use cache for performance
        if (this._compilerCache[this.currentLang]) {
            return this._compilerCache[this.currentLang];
        }

        const compilers = this.compilers[this.currentLang] || [];
        if (!compilers.length) {
            this._compilerCache[this.currentLang] = `<p class="no-compilers">No compilers available for ${this.currentLang}</p>`;
            return this._compilerCache[this.currentLang];
        }

        const links = compilers.map(compiler => {
            // Validate URL
            if (!compiler.url || !compiler.url.startsWith('http')) {
                console.warn(`Invalid URL for ${compiler.name}`);
                return '';
            }
            return `
                <a href="${compiler.url}" 
                   class="compiler-link" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   title="${compiler.description}"
                   role="listitem">
                    <span class="compiler-name">${compiler.name}</span>
                    <span class="compiler-desc">${compiler.description}</span>
                </a>
            `;
        }).join('');

        this._compilerCache[this.currentLang] = links;
        return links;
    }

    /**
     * Get language configuration with caching
     * @param {string} lang - Language key
     * @returns {Object|null} Language configuration
     */
    #getLangConfig(lang) {
        if (this._configCache[lang]) {
            return this._configCache[lang];
        }

        const config = this.tags[lang];
        if (!config) return null;

        // Precompile regex patterns for performance
        this._configCache[lang] = {
            patterns: config.patterns.map(p => new RegExp(p.source, p.flags)),
            replacements: config.replacements
        };

        return this._configCache[lang];
    }

    /**
     * Attach event listeners to UI elements
     */
    #attachEventListeners() {
        const languageSelect = document.getElementById('jtx-language-select');
        const convertBtn = document.getElementById('jtx-convert-btn');
        const copyBtn = document.getElementById('jtx-copy-btn');
        const clearBtn = document.getElementById('jtx-clear-btn');
        const undoBtn = document.getElementById('jtx-undo-btn');
        const inputTextarea = document.getElementById('jtx-input');
        const outputTextarea = document.getElementById('jtx-output');
        const liveToggle = document.getElementById('jtx-live-toggle');
        const downloadBtn = document.getElementById('jtx-download-btn');

        // Language selection change
        languageSelect.addEventListener('change', (e) => {
            this.currentLang = e.target.value;
            this.#updateUI();
        });

        // Convert button click
        convertBtn.addEventListener('click', () => {
            this.convert();
        });

        // Copy button click
        copyBtn.addEventListener('click', () => {
            this.#copyToClipboard();
        });

        // Clear button click
        clearBtn.addEventListener('click', () => {
            this.#clearAll();
            undoBtn.disabled = true;
        });

        // Undo button click
        undoBtn.addEventListener('click', () => {
            this.#undo();
        });

        // Live conversion toggle
        liveToggle.addEventListener('change', (e) => {
            this.liveConversion = e.target.checked;
            if (this.liveConversion && inputTextarea.value.trim()) {
                this.convert();
            }
        });

        // Download button
        downloadBtn.addEventListener('click', () => {
            this.#downloadOutput();
        });

        // Input textarea stats with debounced conversion
        inputTextarea.addEventListener('input', (e) => {
            const value = e.target.value;
            this.#updateTextareaStats('input', value);
            this.#detectInputLanguage(value);
            
            // Save to history
            this.#saveToHistory(value, outputTextarea.value);

            if (this.liveConversion) {
                // Debounce live conversion
                clearTimeout(this._debounceTimeout);
                this._debounceTimeout = setTimeout(() => {
                    this.convert();
                }, 500);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+Enter to convert
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.convert();
            }
            
            // Ctrl+Alt+C to copy
            if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 'c') {
                e.preventDefault();
                this.#copyToClipboard();
            }

            // Ctrl+Z for undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                if (this._historyIndex > 0) {
                    e.preventDefault();
                    this.#undo();
                }
            }
        });
    }

    /**
     * Update UI elements when language changes
     */
    #updateUI() {
        const convertBtn = document.getElementById('jtx-convert-btn');
        const compilerTitle = document.getElementById('jtx-compiler-title');
        const compilerLinks = document.getElementById('jtx-compiler-links');
        const outputLabel = document.querySelector('.editor-section:nth-child(2) .editor-label');

        convertBtn.textContent = `Convert to ${this.currentLang}`;
        convertBtn.setAttribute('aria-label', `Convert to ${this.currentLang}`);
        compilerTitle.textContent = `Try ${this.currentLang} Online`;
        compilerLinks.innerHTML = this.#generateCompilerLinks();
        outputLabel.textContent = `Converted ${this.currentLang.toUpperCase()} Code:`;

        // Re-convert if there's input
        const input = document.getElementById('jtx-input').value;
        if (input.trim()) {
            this.convert();
        }

        // Clear compiler cache for language change
        this._compilerCache = {};
    }

    /**
     * Convert JavaScript code to target language
     */
    convert() {
        const input = document.getElementById('jtx-input').value.trim();
        const output = document.getElementById('jtx-output');

        if (!input) {
            output.value = "Please enter some JavaScript code to convert.";
            return;
        }

        try {
            const startTime = performance.now();
            let convertedCode = this.#applyConversions(input);
            convertedCode = this.#formatCode(convertedCode);
            
            // Sanitize output
            convertedCode = this.#sanitizeCode(convertedCode);

            output.value = convertedCode;
            this.#updateTextareaStats('output', convertedCode);
            this.#updateConversionStats();
            this.#saveToHistory(input, convertedCode);
            
            // Show conversion time
            const duration = performance.now() - startTime;
            if (duration > 100) {
                console.debug(`Conversion took ${duration.toFixed(1)}ms for ${this.currentLang}`);
            }

            // Update undo button
            document.getElementById('jtx-undo-btn').disabled = this._historyIndex <= 0;

            // Highlight output briefly
            output.classList.add('highlight');
            setTimeout(() => output.classList.remove('highlight'), 1000);
            
        } catch (error) {
            console.error('Conversion error:', error);
            output.value = `Error during conversion: ${error.message}`;
        }
    }

    /**
     * Apply conversions using cached configuration
     * @param {string} code - Input code
     * @returns {string} Converted code
     */
    #applyConversions(code) {
        const config = this.#getLangConfig(this.currentLang);
        if (!config) return code;

        // Use a single pass for better performance
        let result = code;
        for (let i = 0; i < config.patterns.length; i++) {
            result = result.replace(config.patterns[i], config.replacements[i]);
        }
        return result;
    }

    /**
     * Format code based on language conventions
     * @param {string} code - Code to format
     * @returns {string} Formatted code
     */
    #formatCode(code) {
        // Basic formatting
        switch (this.currentLang) {
            case 'python':
                // Ensure proper indentation
                return code.replace(/\t/g, '    ');
            case 'java':
                // Add basic class structure if missing
                if (!code.includes('class') && !code.includes('public class')) {
                    const lines = code.split('\n');
                    const indented = lines.map(line => line ? `        ${line}` : line).join('\n');
                    return `public class Main {\n    public static void main(String[] args) {\n${indented}\n    }\n}`;
                }
                return code;
            case 'csharp':
                if (!code.includes('class') && !code.includes('public class')) {
                    const lines = code.split('\n');
                    const indented = lines.map(line => line ? `            ${line}` : line).join('\n');
                    return `using System;\n\npublic class Program {\n    public static void Main() {\n${indented}\n    }\n}`;
                }
                return code;
            default:
                return code;
        }
    }

    /**
     * Sanitize user input to prevent XSS
     * @param {string} code - Code to sanitize
     * @returns {string} Sanitized code
     */
    #sanitizeCode(code) {
        // Remove potential XSS vectors
        return code.replace(/<script.*?>.*?<\/script>/gi, '');
    }

    /**
     * Update textarea statistics
     * @param {string} type - 'input' or 'output'
     * @param {string} value - Text content
     */
    #updateTextareaStats(type, value) {
        const lines = value.split('\n').length;
        const chars = value.length;
        const statsElement = document.getElementById(`${type}-stats`);
        
        if (statsElement) {
            statsElement.textContent = `Lines: ${lines} | Chars: ${chars}`;
        }
    }

    /**
     * Detect input language
     * @param {string} code - Code to analyze
     */
    #detectInputLanguage(code) {
        const languageElement = document.getElementById('input-language');
        if (!languageElement || !code.trim()) {
            if (languageElement) languageElement.textContent = '';
            return;
        }

        const patterns = {
            'JavaScript': /(console\.log|let\s+|const\s+|function\s*\()/i,
            'Python': /(def\s+\w+|print\(|if\s+__name__)/i,
            'PHP': /(\$[a-zA-Z_]|\?php|echo\s+)/i,
            'Java': /(public\s+class|System\.out|String\[\])/i,
            'C#': /(using\s+System|Console\.WriteLine|namespace\s+)/i
        };

        let bestMatch = 'JavaScript';
        let maxScore = 0;

        for (const [lang, pattern] of Object.entries(patterns)) {
            const matches = (code.match(pattern) || []).length;
            if (matches > maxScore) {
                maxScore = matches;
                bestMatch = lang;
            }
        }

        if (maxScore > 0) {
            languageElement.textContent = `Detected: ${bestMatch}`;
            languageElement.style.color = '#28a745';
        } else {
            languageElement.textContent = 'Unknown language';
            languageElement.style.color = '#dc3545';
        }
    }

    /**
     * Save to history for undo
     * @param {string} code - Input code
     * @param {string} converted - Converted code
     */
    #saveToHistory(code, converted) {
        // Trim history if we're not at the end
        this._history = this._history.slice(0, this._historyIndex + 1);
        this._history.push({ code, converted, timestamp: Date.now() });
        this._historyIndex = this._history.length - 1;
        
        // Limit history size
        if (this._history.length > 50) {
            this._history.shift();
            this._historyIndex--;
        }

        document.getElementById('jtx-undo-btn').disabled = false;
    }

    /**
     * Undo last conversion
     */
    #undo() {
        if (this._historyIndex > 0) {
            this._historyIndex--;
            const entry = this._history[this._historyIndex];
            document.getElementById('jtx-input').value = entry.code;
            document.getElementById('jtx-output').value = entry.converted;
            this.#updateTextareaStats('input', entry.code);
            this.#updateTextareaStats('output', entry.converted);
            
            if (this._historyIndex === 0) {
                document.getElementById('jtx-undo-btn').disabled = true;
            }
        }
    }

    /**
     * Copy output to clipboard
     */
    async #copyToClipboard() {
        const output = document.getElementById('jtx-output');
        
        if (!output.value.trim()) {
            alert('Nothing to copy. Please convert some code first.');
            return;
        }

        try {
            await navigator.clipboard.writeText(output.value);
            
            // Visual feedback
            const copyBtn = document.getElementById('jtx-copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            copyBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback
            output.select();
            document.execCommand('copy');
            alert('Copied to clipboard!');
        }
    }

    /**
     * Download output as file
     */
    #downloadOutput() {
        const output = document.getElementById('jtx-output');
        if (!output.value.trim()) {
            alert('Nothing to download. Please convert some code first.');
            return;
        }

        const extensions = {
            'javascript': 'js',
            'python': 'py',
            'php': 'php',
            'java': 'java',
            'csharp': 'cs'
        };

        const ext = extensions[this.currentLang] || 'txt';
        const blob = new Blob([output.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Clear all inputs and outputs
     */
    #clearAll() {
        document.getElementById('jtx-input').value = '';
        document.getElementById('jtx-output').value = '';
        this.#updateTextareaStats('input', '');
        this.#updateTextareaStats('output', '');
        document.getElementById('input-language').textContent = '';
        this._history = [];
        this._historyIndex = -1;
        document.getElementById('jtx-undo-btn').disabled = true;
    }

    /**
     * Update conversion statistics
     */
    #updateConversionStats() {
        this.stats.conversions++;
        this.stats.lastConversion = new Date().toLocaleString();
        this.stats.popularLanguages[this.currentLang] = 
            (this.stats.popularLanguages[this.currentLang] || 0) + 1;

        const statsContent = document.getElementById('jtx-stats-content');
        if (statsContent) {
            const popular = Object.entries(this.stats.popularLanguages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([lang, count]) => `${lang}: ${count}`)
                .join(' | ');

            statsContent.innerHTML = `
                <div>Total conversions: <strong>${this.stats.conversions}</strong></div>
                <div>Last conversion: <strong>${this.stats.lastConversion}</strong></div>
                <div>Current language: <strong>${this.currentLang}</strong></div>
                ${popular ? `<div>Popular languages: <strong>${popular}</strong></div>` : ''}
            `;
        }
    }

    /**
     * Add custom conversion rules
     * @param {string} language - Target language
     * @param {Array} patterns - Regex patterns
     * @param {Array} replacements - Replacement strings
     */
    addCustomRules(language, patterns, replacements) {
        if (!this.tags[language]) {
            this.tags[language] = { patterns: [], replacements: [] };
        }
        
        this.tags[language].patterns.push(...patterns);
        this.tags[language].replacements.push(...replacements);
        
        // Clear cache for this language
        delete this._configCache[language];
    }

    /**
     * Export configuration
     * @returns {Object} Configuration object
     */
    exportConfig() {
        return {
            version: '2.1.0',
            tags: this.tags,
            compilers: this.compilers,
            stats: this.stats,
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Import configuration from JSON
     * @param {Object} config - Configuration object
     */
    importConfig(config) {
        try {
            if (config.tags) this.tags = config.tags;
            if (config.compilers) this.compilers = config.compilers;
            if (config.stats) this.stats = config.stats;
            
            // Clear caches
            this._configCache = {};
            this._compilerCache = {};
            
            this.#updateUI();
            console.log('Configuration imported successfully');
        } catch (error) {
            console.error('Failed to import configuration:', error);
            throw new Error('Invalid configuration file');
        }
    }

    /**
     * Get conversion statistics
     * @returns {Object} Statistics object
     */
    getStats() {
        return { ...this.stats };
    }

    /**
     * Get version
     * @returns {string} Version number
     */
    getVersion() {
        return '2.1.0';
    }
}

// ==================== STYLES ====================

const jTxStyles = `
<style>
.jtx-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.jtx-header {
    text-align: center;
    margin-bottom: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 10px;
    position: relative;
}

.jtx-title {
    margin: 0;
    font-size: 2.5em;
    font-weight: 300;
}

.jtx-subtitle {
    margin: 10px 0 0 0;
    opacity: 0.9;
    font-size: 1.1em;
}

.jtx-version {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 12px;
    opacity: 0.6;
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.jtx-controls {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 25px;
    flex-wrap: wrap;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}

.language-selector {
    display: flex;
    align-items: center;
    gap: 10px;
}

.jtx-select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    font-size: 14px;
    min-width: 120px;
}

.jtx-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.jtx-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.jtx-btn-primary {
    background: #007bff;
    color: white;
}

.jtx-btn-primary:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-1px);
}

.jtx-btn-secondary {
    background: #6c757d;
    color: white;
}

.jtx-btn-secondary:hover:not(:disabled) {
    background: #545b62;
    transform: translateY(-1px);
}

.jtx-btn-outline {
    background: transparent;
    border: 1px solid #dc3545;
    color: #dc3545;
}

.jtx-btn-outline:hover:not(:disabled) {
    background: #dc3545;
    color: white;
    transform: translateY(-1px);
}

.jtx-btn-undo {
    background: #ffc107;
    color: #212529;
}

.jtx-btn-undo:hover:not(:disabled) {
    background: #e0a800;
    transform: translateY(-1px);
}

.jtx-toggle-wrapper {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.jtx-toggle-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #495057;
}

.jtx-toggle {
    position: relative;
    width: 40px;
    height: 22px;
    -webkit-appearance: none;
    appearance: none;
    background: #ccc;
    border-radius: 11px;
    transition: background 0.3s;
    cursor: pointer;
    flex-shrink: 0;
}

.jtx-toggle:checked {
    background: #007bff;
}

.jtx-toggle::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s;
}

.jtx-toggle:checked::before {
    transform: translateX(18px);
}

.jtx-editor-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-bottom: 30px;
}

.editor-section {
    display: flex;
    flex-direction: column;
}

.editor-label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
    font-size: 16px;
}

.jtx-textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    resize: vertical;
    transition: border-color 0.2s ease;
    min-height: 200px;
}

.jtx-textarea:focus {
    outline: none;
    border-color: #007bff;
}

.jtx-input {
    background: #f8f9fa;
}

.jtx-output {
    background: #fff3cd;
}

.editor-info {
    margin-top: 8px;
    font-size: 12px;
    color: #6c757d;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.language-detected {
    font-weight: 500;
}

.jtx-download-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 0 4px;
    transition: transform 0.2s;
    color: #007bff;
}

.jtx-download-btn:hover {
    transform: scale(1.1);
}

.jtx-compilers {
    margin-bottom: 25px;
    padding: 20px;
    background: #e7f3ff;
    border-radius: 8px;
}

.jtx-compilers h3 {
    margin: 0 0 15px 0;
    color: #0056b3;
}

.compiler-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 12px;
}

.compiler-link {
    display: block;
    padding: 12px 15px;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    text-decoration: none;
    color: #495057;
    transition: all 0.2s ease;
}

.compiler-link:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.1);
    text-decoration: none;
    color: #007bff;
}

.compiler-name {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
}

.compiler-desc {
    display: block;
    font-size: 12px;
    color: #6c757d;
}

.no-compilers {
    color: #6c757d;
    font-style: italic;
    padding: 10px 0;
}

.jtx-stats {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #007bff;
}

.jtx-stats h4 {
    margin: 0 0 10px 0;
    color: #495057;
}

.stats-content {
    font-size: 14px;
    color: #6c757d;
}

.stats-content div {
    margin: 4px 0;
}

/* Animation for conversion */
@keyframes highlight {
    0% { background-color: #fff3cd; }
    50% { background-color: #ffe69c; }
    100% { background-color: #fff3cd; }
}

.jtx-output.highlight {
    animation: highlight 0.8s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
    .jtx-editor-container {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .jtx-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .language-selector {
        justify-content: space-between;
    }
    
    .compiler-links {
        grid-template-columns: 1fr;
    }
    
    .jtx-title {
        font-size: 1.8em;
    }
    
    .jtx-version {
        position: static;
        display: block;
        margin-top: 5px;
    }
    
    .jtx-toggle-wrapper {
        margin-left: 0;
    }
}
</style>
`;

// ==================== INITIALIZATION ====================

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add styles to document
    document.head.insertAdjacentHTML('beforeend', jTxStyles);
    
    // Initialize jTx converter
    const jtx = new jTxConverter();
    window.jtx = jtx; // Make available globally
    
    // Create app container if it doesn't exist
    if (!document.getElementById('jtx-app')) {
        const appContainer = document.createElement('div');
        appContainer.id = 'jtx-app';
        document.body.insertBefore(appContainer, document.body.firstChild);
    }
    
    jtx.init('php');
});

// Legacy functions for backward compatibility
function init(chosen = "php") {
    if (window.jtx) {
        window.jtx.init(chosen);
    } else {
        console.warn('jTx not initialized. Please wait for DOM to load.');
    }
}

function jtx(chosen = "php") {
    if (window.jtx) {
        window.jtx.currentLang = chosen;
        window.jtx.convert();
    } else {
        console.warn('jTx not initialized. Please wait for DOM to load.');
    }
}