/**
 * @file jTx - JavaScript Code Converter
 * @description A tool to convert JavaScript code to other programming languages
 * @version 2.0.0
 */

class jTxConverter {
    constructor() {
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
    }

    /**
     * Initialize the jTx converter interface
     * @param {string} defaultLang - Default language for conversion
     */
    init(defaultLang = "php") {
        this.currentLang = defaultLang;
        
        const appContainer = document.getElementById('jtx-app') || document.body;
        
        appContainer.innerHTML = `
            <div class="jtx-container">
                <header class="jtx-header">
                    <h1 class="jtx-title">🚀 jTx Code Converter</h1>
                    <p class="jtx-subtitle">Convert JavaScript code to multiple programming languages</p>
                </header>

                <div class="jtx-controls">
                    <div class="language-selector">
                        <label for="jtx-language-select">Convert to:</label>
                        <select id="jtx-language-select" class="jtx-select">
                            ${this.#generateLanguageOptions()}
                        </select>
                    </div>
                    
                    <button id="jtx-convert-btn" class="jtx-btn jtx-btn-primary">
                        Convert to ${this.currentLang}
                    </button>
                    
                    <button id="jtx-copy-btn" class="jtx-btn jtx-btn-secondary">
                        Copy Result
                    </button>
                    
                    <button id="jtx-clear-btn" class="jtx-btn jtx-btn-outline">
                        Clear All
                    </button>
                </div>

                <div class="jtx-editor-container">
                    <div class="editor-section">
                        <label class="editor-label">JavaScript Code Input:</label>
                        <textarea 
                            id="jtx-input" 
                            class="jtx-textarea jtx-input"
                            placeholder="Paste your JavaScript code here...\nExample:\nfunction greet(name) {\n  console.log('Hello, ' + name);\n}\n\ngreet('World');"
                            rows="15"
                            spellcheck="false"
                        ></textarea>
                        <div class="editor-info">
                            <span id="input-stats">Lines: 0 | Chars: 0</span>
                        </div>
                    </div>

                    <div class="editor-section">
                        <label class="editor-label">Converted ${this.currentLang.toUpperCase()} Code:</label>
                        <textarea 
                            id="jtx-output" 
                            class="jtx-textarea jtx-output"
                            placeholder="Converted code will appear here..."
                            rows="15"
                            readonly
                            spellcheck="false"
                        ></textarea>
                        <div class="editor-info">
                            <span id="output-stats">Lines: 0 | Chars: 0</span>
                        </div>
                    </div>
                </div>

                <div class="jtx-compilers">
                    <h3 id="jtx-compiler-title">Try ${this.currentLang} Online</h3>
                    <div id="jtx-compiler-links" class="compiler-links">
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
        this.#updateStats();
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
        const compilers = this.compilers[this.currentLang] || [];
        return compilers.map(compiler => `
            <a href="${compiler.url}" 
               class="compiler-link" 
               target="_blank" 
               rel="noopener noreferrer"
               title="${compiler.description}">
                <span class="compiler-name">${compiler.name}</span>
                <span class="compiler-desc">${compiler.description}</span>
            </a>
        `).join('');
    }

    /**
     * Attach event listeners to UI elements
     */
    #attachEventListeners() {
        const languageSelect = document.getElementById('jtx-language-select');
        const convertBtn = document.getElementById('jtx-convert-btn');
        const copyBtn = document.getElementById('jtx-copy-btn');
        const clearBtn = document.getElementById('jtx-clear-btn');
        const inputTextarea = document.getElementById('jtx-input');
        const outputTextarea = document.getElementById('jtx-output');

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
        });

        // Input textarea stats
        inputTextarea.addEventListener('input', (e) => {
            this.#updateTextareaStats('input', e.target.value);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.convert();
            }
            
            if (e.ctrlKey && e.key === 'c' && e.altKey) {
                e.preventDefault();
                this.#copyToClipboard();
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
        compilerTitle.textContent = `Try ${this.currentLang} Online`;
        compilerLinks.innerHTML = this.#generateCompilerLinks();
        outputLabel.textContent = `Converted ${this.currentLang.toUpperCase()} Code:`;

        // Re-convert if there's input
        const input = document.getElementById('jtx-input').value;
        if (input.trim()) {
            this.convert();
        }
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
            let convertedCode = input;
            const langConfig = this.tags[this.currentLang];

            if (langConfig) {
                for (let i = 0; i < langConfig.patterns.length; i++) {
                    convertedCode = convertedCode.replace(
                        langConfig.patterns[i], 
                        langConfig.replacements[i]
                    );
                }
            }

            // Apply language-specific formatting
            convertedCode = this.#formatCode(convertedCode);

            output.value = convertedCode;
            this.#updateTextareaStats('output', convertedCode);
            this.#updateConversionStats();
            
        } catch (error) {
            output.value = `Error during conversion: ${error.message}`;
        }
    }

    /**
     * Format code based on language conventions
     * @param {string} code - Code to format
     * @returns {string} Formatted code
     */
    #formatCode(code) {
        // Basic formatting - can be enhanced with Prettier or similar
        switch (this.currentLang) {
            case 'python':
                // Ensure proper indentation
                return code.replace(/\t/g, '    ');
            case 'java':
                // Add basic class structure if missing
                if (!code.includes('class') && !code.includes('public class')) {
                    return `public class Main {\n    public static void main(String[] args) {\n        ${code.split('\n').join('\n        ')}\n    }\n}`;
                }
                return code;
            default:
                return code;
        }
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
     * Copy output to clipboard
     */
    async #copyToClipboard() {
        const output = document.getElementById('jtx-output');
        
        try {
            await navigator.clipboard.writeText(output.value);
            
            // Visual feedback
            const copyBtn = document.getElementById('jtx-copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy to clipboard. Please copy manually.');
        }
    }

    /**
     * Clear all inputs and outputs
     */
    #clearAll() {
        document.getElementById('jtx-input').value = '';
        document.getElementById('jtx-output').value = '';
        this.#updateTextareaStats('input', '');
        this.#updateTextareaStats('output', '');
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
            statsContent.innerHTML = `
                <div>Total conversions: <strong>${this.stats.conversions}</strong></div>
                <div>Last conversion: <strong>${this.stats.lastConversion}</strong></div>
                <div>Current language: <strong>${this.currentLang}</strong></div>
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
    }

    /**
     * Get conversion statistics
     * @returns {Object} Statistics object
     */
    getStats() {
        return { ...this.stats };
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

.jtx-btn-primary {
    background: #007bff;
    color: white;
}

.jtx-btn-primary:hover {
    background: #0056b3;
    transform: translateY(-1px);
}

.jtx-btn-secondary {
    background: #6c757d;
    color: white;
}

.jtx-btn-secondary:hover {
    background: #545b62;
    transform: translateY(-1px);
}

.jtx-btn-outline {
    background: transparent;
    border: 1px solid #dc3545;
    color: #dc3545;
}

.jtx-btn-outline:hover {
    background: #dc3545;
    color: white;
    transform: translateY(-1px);
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
    text-align: right;
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

/* Responsive Design */
@media (max-width: 768px) {
    .jtx-editor-container {
        grid-template-columns: 1fr;
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
}

/* Animation for conversion */
@keyframes highlight {
    0% { background-color: #fff3cd; }
    100% { background-color: #fff; }
}

.jtx-output.highlight {
    animation: highlight 1s ease;
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

// Legacy function for backward compatibility
function init(chosen = "php") {
    if (window.jtx) {
        window.jtx.init(chosen);
    }
}

// Legacy conversion function
function jtx(chosen = "php") {
    if (window.jtx) {
        window.jtx.currentLang = chosen;
        window.jtx.convert();
    }
}
