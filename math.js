/**
 * @file Enhanced Number Precision Utilities
 * @description Comprehensive number formatting, rounding, and precision control
 * @version 2.0.0
 */

class PrecisionUtils {
    constructor() {
        this.config = {
            defaultPrecision: 2,
            maxPrecision: 20,
            roundingMode: 'half-up', // 'half-up', 'half-down', 'floor', 'ceil', 'trunc'
            trailingZeros: false,
            locale: 'en-US'
        };

        this.supportedRoundingModes = [
            'half-up', 'half-down', 'half-even', 
            'floor', 'ceil', 'trunc', 'up', 'down'
        ];
    }

    /**
     * Enhanced precision control for numbers
     * @param {number|string} value - Number to format
     * @param {number} precision - Number of decimal places
     * @param {Object} options - Formatting options
     * @returns {string|number} Formatted number
     */
    static precision(value, precision = 2, options = {}) {
        const {
            roundingMode = 'half-up',
            trailingZeros = false,
            returnNumber = false,
            locale = 'en-US'
        } = options;

        // Input validation
        if (typeof value !== 'number' && typeof value !== 'string') {
            throw new Error('Value must be a number or numeric string');
        }

        const num = typeof value === 'string' ? parseFloat(value) : value;
        
        if (isNaN(num)) {
            throw new Error('Invalid number provided');
        }

        if (!Number.isInteger(precision) || precision < 0 || precision > 20) {
            throw new Error('Precision must be an integer between 0 and 20');
        }

        // Handle special cases
        if (!isFinite(num)) {
            return returnNumber ? num : num.toString();
        }

        // Apply rounding based on mode
        const rounded = this.#applyRounding(num, precision, roundingMode);
        
        // Format the number
        let result = this.#formatNumber(rounded, precision, trailingZeros, locale);
        
        return returnNumber ? parseFloat(result) : result;
    }

    /**
     * Apply rounding based on specified mode
     * @param {number} num - Number to round
     * @param {number} precision - Decimal precision
     * @param {string} mode - Rounding mode
     * @returns {number} Rounded number
     */
    static #applyRounding(num, precision, mode) {
        const factor = Math.pow(10, precision);
        
        switch (mode) {
            case 'half-up':
                return Math.round(num * factor) / factor;
            
            case 'half-down':
                const rounded = Math.round(num * factor);
                return (rounded - 0.5) / factor;
            
            case 'half-even':
                // Banker's rounding
                const value = num * factor;
                const roundedValue = Math.round(value);
                // If exactly halfway, round to nearest even
                if (Math.abs(value - roundedValue) === 0.5) {
                    return (Math.round(value / 2) * 2) / factor;
                }
                return roundedValue / factor;
            
            case 'floor':
                return Math.floor(num * factor) / factor;
            
            case 'ceil':
                return Math.ceil(num * factor) / factor;
            
            case 'trunc':
                return Math.trunc(num * factor) / factor;
            
            case 'up':
                return (num >= 0 ? Math.ceil : Math.floor)(num * factor) / factor;
            
            case 'down':
                return (num >= 0 ? Math.floor : Math.ceil)(num * factor) / factor;
            
            default:
                return Math.round(num * factor) / factor;
        }
    }

    /**
     * Format number with specified precision and options
     * @param {number} num - Number to format
     * @param {number} precision - Decimal precision
     * @param {boolean} trailingZeros - Whether to keep trailing zeros
     * @param {string} locale - Locale for formatting
     * @returns {string} Formatted number string
     */
    static #formatNumber(num, precision, trailingZeros, locale) {
        if (precision === 0) {
            return Math.round(num).toString();
        }

        if (trailingZeros) {
            // Use toFixed for consistent trailing zeros
            return num.toFixed(precision);
        }

        // Remove trailing zeros while maintaining precision
        const parts = num.toString().split('.');
        if (parts.length === 1) {
            return trailingZeros ? `${num}.${'0'.repeat(precision)}` : num.toString();
        }

        let decimalPart = parts[1];
        if (decimalPart.length > precision) {
            decimalPart = decimalPart.substring(0, precision);
        }

        // Remove trailing zeros if not required
        if (!trailingZeros) {
            decimalPart = decimalPart.replace(/0+$/, '');
        }

        return decimalPart ? `${parts[0]}.${decimalPart}` : parts[0];
    }

    /**
     * Format number with significant figures
     * @param {number} value - Number to format
     * @param {number} significantFigures - Number of significant figures
     * @param {Object} options - Formatting options
     * @returns {string} Formatted number
     */
    static significantFigures(value, significantFigures = 3, options = {}) {
        const {
            trailingZeros = false,
            scientificNotation = false
        } = options;

        if (value === 0) return '0';
        
        const magnitude = Math.floor(Math.log10(Math.abs(value)));
        const scale = Math.pow(10, significantFigures - 1 - magnitude);
        
        let rounded = Math.round(value * scale) / scale;
        
        if (scientificNotation && (magnitude >= 3 || magnitude <= -3)) {
            return rounded.toExponential(significantFigures - 1);
        }
        
        return this.precision(rounded, Math.max(0, significantFigures - magnitude - 1), {
            trailingZeros,
            returnNumber: false
        });
    }

    /**
     * Format number as currency
     * @param {number} value - Number to format
     * @param {Object} options - Currency options
     * @returns {string} Formatted currency string
     */
    static currency(value, options = {}) {
        const {
            currency = 'USD',
            precision = 2,
            locale = 'en-US',
            display = 'symbol' // 'symbol', 'code', 'name'
        } = options;

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
        }).format(value);
    }

    /**
     * Format number as percentage
     * @param {number} value - Number to format (0.1 = 10%)
     * @param {Object} options - Percentage options
     * @returns {string} Formatted percentage string
     */
    static percentage(value, options = {}) {
        const {
            precision = 1,
            locale = 'en-US'
        } = options;

        const percentageValue = value * 100;
        
        return new Intl.NumberFormat(locale, {
            style: 'percent',
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
        }).format(value);
    }

    /**
     * Format large numbers with suffixes (K, M, B, T)
     * @param {number} value - Number to format
     * @param {Object} options - Formatting options
     * @returns {string} Formatted number with suffix
     */
    static compact(value, options = {}) {
        const {
            precision = 1,
            suffixes = ['', 'K', 'M', 'B', 'T'],
            threshold = 1000
        } = options;

        if (Math.abs(value) < threshold) {
            return this.precision(value, precision, options);
        }

        const magnitude = Math.floor(Math.log10(Math.abs(value)) / 3);
        const suffix = suffixes[Math.min(magnitude, suffixes.length - 1)];
        const scaled = value / Math.pow(1000, magnitude);

        return `${this.precision(scaled, precision, options)}${suffix}`;
    }

    /**
     * Compare numbers with tolerance for floating-point precision
     * @param {number} a - First number
     * @param {number} b - Second number
     * @param {number} tolerance - Tolerance for comparison
     * @returns {boolean} True if numbers are approximately equal
     */
    static approximatelyEqual(a, b, tolerance = 1e-10) {
        return Math.abs(a - b) < tolerance;
    }

    /**
     * Clamp number to specified range
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Generate number range with specified precision
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} step - Step size
     * @param {number} precision - Decimal precision
     * @returns {number[]} Array of numbers
     */
    static range(start, end, step = 1, precision = 2) {
        const result = [];
        let current = start;
        
        while (current <= end) {
            result.push(this.precision(current, precision, { returnNumber: true }));
            current += step;
        }
        
        return result;
    }

    /**
     * Calculate mean with precision
     * @param {number[]} numbers - Array of numbers
     * @param {number} precision - Decimal precision
     * @returns {number} Mean value
     */
    static mean(numbers, precision = 2) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            throw new Error('Input must be a non-empty array');
        }
        
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return this.precision(sum / numbers.length, precision, { returnNumber: true });
    }

    /**
     * Calculate standard deviation with precision
     * @param {number[]} numbers - Array of numbers
     * @param {number} precision - Decimal precision
     * @returns {number} Standard deviation
     */
    static standardDeviation(numbers, precision = 2) {
        if (!Array.isArray(numbers) || numbers.length < 2) {
            throw new Error('Input must be an array with at least 2 elements');
        }
        
        const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
        const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
        
        return this.precision(Math.sqrt(variance), precision, { returnNumber: true });
    }

    /**
     * Parse number with locale consideration
     * @param {string} str - String to parse
     * @param {string} locale - Locale to use for parsing
     * @returns {number} Parsed number
     */
    static parseNumber(str, locale = 'en-US') {
        // Remove thousands separators and normalize decimal separator
        const formatter = new Intl.NumberFormat(locale);
        const parts = formatter.formatToParts(1234.5);
        
        const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
        const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
        
        let normalized = str
            .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
            .replace(new RegExp(`\\${decimalSeparator}`), '.');
        
        return parseFloat(normalized);
    }

    /**
     * Get information about a number's precision
     * @param {number} value - Number to analyze
     * @returns {Object} Precision information
     */
    static getPrecisionInfo(value) {
        if (!isFinite(value)) {
            return {
                decimalPlaces: 0,
                significantFigures: 0,
                isInteger: false,
                scientificNotation: value.toString()
            };
        }

        const str = value.toString();
        const decimalIndex = str.indexOf('.');
        const decimalPlaces = decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
        
        // Calculate significant figures
        const cleanStr = value.toExponential().replace(/^(\d)\.?(\d*)e([+-]\d+)$/, '$1$2');
        const significantFigures = cleanStr.replace(/^0+/, '').length;
        
        return {
            decimalPlaces,
            significantFigures,
            isInteger: Number.isInteger(value),
            scientificNotation: value.toExponential(),
            magnitude: Math.floor(Math.log10(Math.abs(value)) || 0)
        };
    }
}

// ==================== CONVENIENCE FUNCTIONS ====================

/**
 * Main precision function (legacy compatibility)
 * @param {number} n - Number to format
 * @param {number} fixed - Decimal places
 * @param {Object} options - Formatting options
 * @returns {string|number} Formatted number
 */
function precision(n, fixed = 2, options = {}) {
    return PrecisionUtils.precision(n, fixed, options);
}

/**
 * Format number with significant figures
 * @param {number} value - Number to format
 * @param {number} significantFigures - Significant figures count
 * @param {Object} options - Formatting options
 * @returns {string} Formatted number
 */
function significantFigures(value, significantFigures = 3, options = {}) {
    return PrecisionUtils.significantFigures(value, significantFigures, options);
}

/**
 * Format number as currency
 * @param {number} value - Number to format
 * @param {Object} options - Currency options
 * @returns {string} Formatted currency
 */
function formatCurrency(value, options = {}) {
    return PrecisionUtils.currency(value, options);
}

/**
 * Format number as percentage
 * @param {number} value - Number to format
 * @param {Object} options - Percentage options
 * @returns {string} Formatted percentage
 */
function formatPercentage(value, options = {}) {
    return PrecisionUtils.percentage(value, options);
}

// ==================== USAGE EXAMPLES ====================

/*
// Basic precision
console.log(precision(3.14159, 2)); // "3.14"
console.log(precision(3.14159, 4)); // "3.1416"

// With options
console.log(precision(3.14159, 4, { 
    roundingMode: 'floor',
    trailingZeros: true 
})); // "3.1415"

// Significant figures
console.log(significantFigures(123.456, 4)); // "123.5"
console.log(significantFigures(0.00123456, 3)); // "0.00123"

// Currency formatting
console.log(formatCurrency(1234.567, { currency: 'USD' })); // "$1,234.57"
console.log(formatCurrency(1234.567, { currency: 'EUR', precision: 3 })); // "€1,234.567"

// Percentage formatting
console.log(formatPercentage(0.1234, { precision: 1 })); // "12.3%"

// Compact formatting
console.log(PrecisionUtils.compact(1234567)); // "1.2M"
console.log(PrecisionUtils.compact(1234)); // "1.2K"

// Number analysis
console.log(PrecisionUtils.getPrecisionInfo(123.456));
// {
//   decimalPlaces: 3,
//   significantFigures: 6,
//   isInteger: false,
//   scientificNotation: "1.23456e+2",
//   magnitude: 2
// }
*/

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PrecisionUtils,
        precision,
        significantFigures,
        formatCurrency,
        formatPercentage
    };
}

// Global availability
window.PrecisionUtils = PrecisionUtils;
window.precision = precision;
