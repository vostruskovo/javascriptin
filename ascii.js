/**
 * 🎯 ASCII Utilities Library
 * Comprehensive ASCII table generation and character conversion functions
 */

class AsciiUtils {
    constructor() {
        this.symbolsObj = {
            "65": "A", "66": "B", "67": "C", "68": "D", "69": "E", "70": "F",
            "71": "G", "72": "H", "73": "I", "74": "J", "75": "K",
            "76": "L", "77": "M", "78": "N", "79": "O", "80": "P",
            "81": "Q", "82": "R", "83": "S", "84": "T", "85": "U",
            "86": "V", "87": "W", "88": "X", "89": "Y", "90": "Z",
            "91": "[", "92": "\\", "93": "]", "94": "^", "95": "_",
            "96": "`", "97": "a", "98": "b", "99": "c", "100": "d",
            "101": "e", "102": "f", "103": "g", "104": "h", "105": "i",
            "106": "j", "107": "k", "108": "l", "109": "m", "110": "n",
            "111": "o", "112": "p", "113": "q", "114": "r", "115": "s",
            "116": "t", "117": "u", "118": "v", "119": "w", "120": "x",
            "121": "y", "122": "z"
        };

        this.symbolsArray = [
            ["65=A", "66=B", "67=C", "68=D", "69=E", "70=F"],
            ["71=G", "72=H", "73=I", "74=J", "75=K"],
            ["76=L", "77=M", "78=N", "79=O", "80=P"],
            ["81=Q", "82=R", "83=S", "84=T", "85=U"],
            ["86=V", "87=W", "88=X", "89=Y", "90=Z"],
            ["91=[", "92=\\", "93=]", "94=^", "95=_"],
            ["96=`", "97=a", "98=b", "99=c", "100=d"],
            ["101=e", "102=f", "103=g", "104=h", "105=i"],
            ["106=j", "107=k", "108=l", "109=m", "110=n"],
            ["111=o", "112=p", "113=q", "114=r", "115=s"],
            ["116=t", "117=u", "118=v", "119=w", "120=x"],
            ["121=y", "122=z"]
        ];

        this.fullAsciiTable = this.generateFullAsciiTable();
    }

    /**
     * Generate complete ASCII table (0-127)
     * @returns {Object} Complete ASCII mapping
     */
    generateFullAsciiTable() {
        const ascii = {};
        for (let i = 0; i <= 127; i++) {
            // Handle special characters
            if (i < 32 || i === 127) {
                ascii[i] = this.getControlCharacterName(i);
            } else {
                ascii[i] = String.fromCharCode(i);
            }
        }
        return ascii;
    }

    /**
     * Get descriptive names for control characters
     * @param {number} code - ASCII code
     * @returns {string} Character description
     */
    getControlCharacterName(code) {
        const controlChars = {
            0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK", 7: "BEL",
            8: "BS", 9: "TAB", 10: "LF", 11: "VT", 12: "FF", 13: "CR", 14: "SO", 15: "SI",
            16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4", 21: "NAK", 22: "SYN",
            23: "ETB", 24: "CAN", 25: "EM", 26: "SUB", 27: "ESC", 28: "FS", 29: "GS",
            30: "RS", 31: "US", 127: "DEL"
        };
        return controlChars[code] || `CTRL-${code}`;
    }

    /**
     * Convert character to ASCII code
     * @param {string} char - Character to convert
     * @returns {number} ASCII code
     */
    charToAscii(char) {
        if (!char || char.length === 0) return 0;
        return char.charCodeAt(0);
    }

    /**
     * Convert ASCII code to character
     * @param {number} code - ASCII code
     * @returns {string} Character
     */
    asciiToChar(code) {
        if (code < 0 || code > 127) return '�'; // Replacement character for invalid codes
        return String.fromCharCode(code);
    }

    /**
     * Convert character to float (ASCII code as float)
     * @param {string} char - Character to convert
     * @returns {number} ASCII code as float
     */
    charToFloat(char) {
        return parseFloat(this.charToAscii(char));
    }

    /**
     * Draw ASCII table from object (alphabetical section)
     */
    drawAsciiTableFromObject() {
        const styles = `
            <style>
                .ascii-table { 
                    border-collapse: collapse; 
                    margin: 10px 0;
                    font-family: monospace;
                }
                .ascii-table td, .ascii-table th { 
                    border: 1px solid #ddd; 
                    padding: 8px 12px;
                    text-align: center;
                }
                .ascii-table th { 
                    background-color: #f2f2f2; 
                    font-weight: bold;
                }
                .ascii-table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                .ascii-table tr:hover {
                    background-color: #e9e9e9;
                }
            </style>
        `;

        document.write(styles);
        document.write('<table class="ascii-table">');
        document.write('<tr><th>Code</th><th>Character</th><th>Code</th><th>Character</th><th>Code</th><th>Character</th></tr>');

        const codes = Object.keys(this.symbolsObj);
        const rows = Math.ceil(codes.length / 3);

        for (let i = 0; i < rows; i++) {
            document.write('<tr>');
            
            for (let j = 0; j < 3; j++) {
                const index = i + j * rows;
                if (index < codes.length) {
                    const code = codes[index];
                    const char = this.symbolsObj[code];
                    document.write(`<td>${code}</td><td>${this.escapeHtml(char)}</td>`);
                } else {
                    document.write('<td></td><td></td>');
                }
            }
            
            document.write('</tr>');
        }

        document.write('</table>');
    }

    /**
     * Draw ASCII table from array structure
     */
    drawAsciiTableFromArray() {
        const styles = `
            <style>
                .ascii-array-table { 
                    border-collapse: collapse; 
                    margin: 10px 0;
                    font-family: monospace;
                }
                .ascii-array-table td { 
                    border: 1px solid #ccc; 
                    padding: 6px 10px;
                    text-align: center;
                    background-color: #fff;
                }
                .ascii-array-table tr:hover td {
                    background-color: #e6f7ff;
                }
            </style>
        `;

        document.write(styles);
        document.write('<table class="ascii-array-table">');

        for (let i = 0; i < this.symbolsArray.length; i++) {
            document.write('<tr>');
            
            for (let j = 0; j < this.symbolsArray[i].length; j++) {
                document.write(`<td>${this.symbolsArray[i][j]}</td>`);
            }
            
            // Fill empty cells for consistent layout
            const remainingCells = 6 - this.symbolsArray[i].length;
            for (let k = 0; k < remainingCells; k++) {
                document.write('<td></td>');
            }
            
            document.write('</tr>');
        }

        document.write('</table>');
    }

    /**
     * Draw complete ASCII table (0-127)
     */
    drawCompleteAsciiTable() {
        const styles = `
            <style>
                .complete-ascii-table { 
                    border-collapse: collapse; 
                    margin: 15px 0;
                    font-family: monospace;
                    font-size: 14px;
                }
                .complete-ascii-table td, .complete-ascii-table th { 
                    border: 1px solid #bbb; 
                    padding: 6px 8px;
                    text-align: center;
                }
                .complete-ascii-table th { 
                    background-color: #4CAF50; 
                    color: white;
                    font-weight: bold;
                }
                .control-char {
                    background-color: #ffebee;
                    color: #c62828;
                    font-style: italic;
                }
                .printable-char {
                    background-color: #e8f5e8;
                }
            </style>
        `;

        document.write(styles);
        document.write('<table class="complete-ascii-table">');
        document.write('<tr><th>Dec</th><th>Hex</th><th>Char</th><th>Name</th><th>Dec</th><th>Hex</th><th>Char</th><th>Name</th></tr>');

        for (let i = 0; i <= 127; i += 2) {
            document.write('<tr>');
            
            // First column
            this.writeAsciiCell(i);
            
            // Second column (if exists)
            if (i + 1 <= 127) {
                this.writeAsciiCell(i + 1);
            } else {
                document.write('<td colspan="4"></td>');
            }
            
            document.write('</tr>');
        }

        document.write('</table>');
    }

    /**
     * Write ASCII table cell
     * @param {number} code - ASCII code
     */
    writeAsciiCell(code) {
        const hex = code.toString(16).toUpperCase().padStart(2, '0');
        const char = this.fullAsciiTable[code];
        const isControl = code < 32 || code === 127;
        
        const charClass = isControl ? 'control-char' : 'printable-char';
        const displayChar = isControl ? '-' : this.escapeHtml(char);
        
        document.write(`
            <td>${code}</td>
            <td>0x${hex}</td>
            <td class="${charClass}">${displayChar}</td>
            <td class="${charClass}">${char}</td>
        `);
    }

    /**
     * Generate ASCII table in console
     */
    generateConsoleAsciiTable() {
        console.group('📋 ASCII Table (Printable Characters)');
        
        for (let i = 32; i <= 126; i++) {
            if ((i - 32) % 8 === 0) {
                console.log('\n' + '='.repeat(50));
            }
            console.log(` ${i.toString().padStart(3)}: '${String.fromCharCode(i)}' `);
        }
        
        console.groupEnd();
    }

    /**
     * Convert string to ASCII codes array
     * @param {string} text - Input text
     * @returns {number[]} Array of ASCII codes
     */
    stringToAsciiArray(text) {
        return text.split('').map(char => char.charCodeAt(0));
    }

    /**
     * Convert ASCII codes array to string
     * @param {number[]} codes - Array of ASCII codes
     * @returns {string} Reconstructed string
     */
    asciiArrayToString(codes) {
        return codes.map(code => String.fromCharCode(code)).join('');
    }

    /**
     * Check if character is printable
     * @param {string} char - Character to check
     * @returns {boolean} True if printable
     */
    isPrintable(char) {
        const code = char.charCodeAt(0);
        return code >= 32 && code <= 126;
    }

    /**
     * Escape HTML for safe display
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '\\': '&#092;'
        };
        return text.replace(/[&<>"'\\]/g, m => map[m]);
    }

    /**
     * Get ASCII information for a character
     * @param {string} char - Character to analyze
     * @returns {Object} ASCII information
     */
    getAsciiInfo(char) {
        const code = char.charCodeAt(0);
        return {
            character: char,
            decimal: code,
            hexadecimal: '0x' + code.toString(16).toUpperCase(),
            binary: code.toString(2).padStart(8, '0'),
            type: this.getCharType(code),
            printable: this.isPrintable(char)
        };
    }

    /**
     * Get character type
     * @param {number} code - ASCII code
     * @returns {string} Character type
     */
    getCharType(code) {
        if (code < 32) return 'Control Character';
        if (code === 127) return 'Delete Character';
        if (code >= 48 && code <= 57) return 'Digit';
        if (code >= 65 && code <= 90) return 'Uppercase Letter';
        if (code >= 97 && code <= 122) return 'Lowercase Letter';
        return 'Special Character';
    }
}

// Create global instance
const asciiUtils = new AsciiUtils();

// Legacy functions for backward compatibility
function AtoI(char) {
    return asciiUtils.charToAscii(char);
}

function ItoA(code) {
    return asciiUtils.asciiToChar(code);
}

function AtoF(char) {
    return asciiUtils.charToFloat(char);
}

function drawAscTableFromObj() {
    asciiUtils.drawAsciiTableFromObject();
}

function drawAscTableFromAR() {
    asciiUtils.drawAsciiTableFromArray();
}

function AsciiTable() {
    asciiUtils.generateConsoleAsciiTable();
}

function drawAscii() {
    return asciiUtils.generateFullAsciiTable();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AsciiUtils, asciiUtils };
}
