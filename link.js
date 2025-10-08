/**
 * @file Enhanced Social Sharing System
 * @description A comprehensive social media sharing component with analytics and customization
 * @version 2.0.0
 */

class SocialShareManager {
    constructor() {
        this.platforms = {
            facebook: {
                name: "Facebook",
                icon: "facebook-f",
                color: "#1877f2",
                baseUrl: "https://www.facebook.com/sharer/sharer.php?u=",
                enabled: true
            },
            twitter: {
                name: "Twitter",
                icon: "twitter",
                color: "#1da1f2",
                baseUrl: "https://twitter.com/intent/tweet?url=",
                enabled: true
            },
            linkedin: {
                name: "LinkedIn",
                icon: "linkedin-in",
                color: "#0a66c2",
                baseUrl: "https://www.linkedin.com/sharing/share-offsite/?url=",
                enabled: true
            },
            whatsapp: {
                name: "WhatsApp",
                icon: "whatsapp",
                color: "#25d366",
                baseUrl: "https://api.whatsapp.com/send?text=",
                enabled: true
            },
            telegram: {
                name: "Telegram",
                icon: "telegram-plane",
                color: "#0088cc",
                baseUrl: "https://t.me/share/url?url=",
                enabled: true
            },
            reddit: {
                name: "Reddit",
                icon: "reddit-alien",
                color: "#ff4500",
                baseUrl: "https://reddit.com/submit?url=",
                enabled: true
            },
            pinterest: {
                name: "Pinterest",
                icon: "pinterest-p",
                color: "#bd081c",
                baseUrl: "https://pinterest.com/pin/create/button/?url=",
                enabled: true
            },
            email: {
                name: "Email",
                icon: "envelope",
                color: "#ea4335",
                baseUrl: "mailto:?body=",
                enabled: true
            },
            copy: {
                name: "Copy Link",
                icon: "link",
                color: "#6c757d",
                baseUrl: "copy",
                enabled: true
            }
        };

        this.config = {
            defaultUrl: window.location.href,
            defaultTitle: document.title,
            defaultText: "Check this out!",
            autoDetectContent: true,
            showCounts: true,
            animation: true,
            analytics: true,
            responsive: true,
            theme: "default" // 'default', 'minimal', 'floating', 'pill'
        };

        this.analytics = {
            shares: {},
            totalShares: 0,
            mostShared: null
        };

        this.init();
    }

    /**
     * Initialize the social sharing manager
     */
    init() {
        this.injectStyles();
        this.loadAnalytics();
        this.autoDetectContent();
    }

    /**
     * Inject CSS styles for social sharing buttons
     */
    injectStyles() {
        const styles = `
            <style>
            .social-share-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                align-items: center;
                padding: 20px;
                margin: 20px 0;
            }

            .social-share-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                color: white;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                position: relative;
                overflow: hidden;
            }

            .social-share-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }

            .social-share-btn:active {
                transform: translateY(0);
            }

            .social-share-btn i {
                margin-right: 8px;
                font-size: 16px;
            }

            .social-share-btn .share-count {
                margin-left: 8px;
                background: rgba(255,255,255,0.2);
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: normal;
            }

            .social-share-btn.loading {
                opacity: 0.7;
                cursor: not-allowed;
            }

            .social-share-btn.loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 16px;
                height: 16px;
                margin: -8px 0 0 -8px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Platform-specific colors */
            .share-facebook { background-color: #1877f2; }
            .share-twitter { background-color: #1da1f2; }
            .share-linkedin { background-color: #0a66c2; }
            .share-whatsapp { background-color: #25d366; }
            .share-telegram { background-color: #0088cc; }
            .share-reddit { background-color: #ff4500; }
            .share-pinterest { background-color: #bd081c; }
            .share-email { background-color: #ea4335; }
            .share-copy { background-color: #6c757d; }

            /* Theme variations */
            .social-share-minimal .social-share-btn {
                background: transparent;
                border: 2px solid currentColor;
                color: inherit;
            }

            .social-share-floating {
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                flex-direction: column;
                z-index: 1000;
            }

            .social-share-pill .social-share-btn {
                border-radius: 25px;
                padding: 10px 20px;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .social-share-container {
                    flex-direction: column;
                    align-items: stretch;
                }

                .social-share-btn {
                    justify-content: flex-start;
                }

                .social-share-floating {
                    position: static;
                    transform: none;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
            }

            /* Success animation */
            @keyframes successPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }

            .social-share-btn.success {
                animation: successPulse 0.5s ease;
                background-color: #28a745 !important;
            }

            /* Tooltip */
            .social-share-tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                margin-bottom: 5px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .social-share-btn:hover .social-share-tooltip {
                opacity: 1;
                visibility: visible;
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    /**
     * Generate social sharing buttons
     * @param {Object} options - Sharing options
     * @returns {string} HTML for sharing buttons
     */
    generateShareButtons(options = {}) {
        const {
            url = this.config.defaultUrl,
            title = this.config.defaultTitle,
            text = this.config.defaultText,
            platforms = Object.keys(this.platforms),
            theme = this.config.theme,
            showCounts = this.config.showCounts,
            containerClass = ""
        } = options;

        const enabledPlatforms = platforms.filter(platform => 
            this.platforms[platform]?.enabled
        );

        const buttonsHTML = enabledPlatforms.map(platform => {
            const platformData = this.platforms[platform];
            const shareCount = this.analytics.shares[platform] || 0;
            
            return `
                <button class="social-share-btn share-${platform}" 
                        onclick="socialShareManager.share('${platform}', ${JSON.stringify({url, title, text}).replace(/"/g, '&quot;')})"
                        data-platform="${platform}">
                    <i class="fab fa-${platformData.icon}"></i>
                    ${platformData.name}
                    ${showCounts && shareCount > 0 ? 
                        `<span class="share-count">${shareCount}</span>` : ''}
                    <span class="social-share-tooltip">Share on ${platformData.name}</span>
                </button>
            `;
        }).join('');

        return `
            <div class="social-share-container social-share-${theme} ${containerClass}">
                ${buttonsHTML}
            </div>
        `;
    }

    /**
     * Share content on specified platform
     * @param {string} platform - Social platform
     * @param {Object} content - Content to share
     */
    async share(platform, content = {}) {
        const {
            url = this.config.defaultUrl,
            title = this.config.defaultTitle,
            text = this.config.defaultText
        } = content;

        const platformData = this.platforms[platform];
        if (!platformData || !platformData.enabled) {
            console.warn(`Platform ${platform} is not enabled`);
            return;
        }

        // Add loading state
        this.setButtonState(platform, 'loading');

        try {
            if (platform === 'copy') {
                await this.copyToClipboard(url);
                this.showNotification('Link copied to clipboard!', 'success');
            } else {
                const shareUrl = this.buildShareUrl(platform, url, title, text);
                this.openShareWindow(shareUrl, platform);
            }

            // Track the share
            this.trackShare(platform);
            
            // Update button with success state
            this.setButtonState(platform, 'success');
            
            setTimeout(() => {
                this.setButtonState(platform, 'normal');
            }, 2000);

        } catch (error) {
            console.error('Share failed:', error);
            this.setButtonState(platform, 'error');
            this.showNotification('Failed to share. Please try again.', 'error');
        }
    }

    /**
     * Build share URL for platform
     * @param {string} platform - Social platform
     * @param {string} url - URL to share
     * @param {string} title - Share title
     * @param {string} text - Share text
     * @returns {string} Complete share URL
     */
    buildShareUrl(platform, url, title, text) {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        const encodedText = encodeURIComponent(text);

        switch (platform) {
            case 'facebook':
                return `${this.platforms.facebook.baseUrl}${encodedUrl}`;
            case 'twitter':
                return `${this.platforms.twitter.baseUrl}${encodedUrl}&text=${encodedText}`;
            case 'linkedin':
                return `${this.platforms.linkedin.baseUrl}${encodedUrl}`;
            case 'whatsapp':
                return `${this.platforms.whatsapp.baseUrl}${encodedText}%20${encodedUrl}`;
            case 'telegram':
                return `${this.platforms.telegram.baseUrl}${encodedUrl}&text=${encodedText}`;
            case 'reddit':
                return `${this.platforms.reddit.baseUrl}${encodedUrl}&title=${encodedTitle}`;
            case 'pinterest':
                return `${this.platforms.pinterest.baseUrl}${encodedUrl}&description=${encodedText}`;
            case 'email':
                return `${this.platforms.email.baseUrl}${encodedText}%0A%0A${encodedUrl}&subject=${encodedTitle}`;
            default:
                return url;
        }
    }

    /**
     * Open share window
     * @param {string} url - Share URL
     * @param {string} platform - Platform name
     */
    openShareWindow(url, platform) {
        const windowFeatures = 'width=600,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes';
        
        if (platform === 'email') {
            window.location.href = url;
        } else {
            window.open(url, `share-${platform}`, windowFeatures);
        }
    }

    /**
     * Copy URL to clipboard
     * @param {string} text - Text to copy
     */
    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            return true;
        } catch (error) {
            throw new Error('Clipboard access denied');
        }
    }

    /**
     * Set button state
     * @param {string} platform - Platform name
     * @param {string} state - Button state
     */
    setButtonState(platform, state) {
        const buttons = document.querySelectorAll(`[data-platform="${platform}"]`);
        buttons.forEach(button => {
            button.classList.remove('loading', 'success', 'error');
            if (state !== 'normal') {
                button.classList.add(state);
            }
        });
    }

    /**
     * Track share analytics
     * @param {string} platform - Platform name
     */
    trackShare(platform) {
        this.analytics.shares[platform] = (this.analytics.shares[platform] || 0) + 1;
        this.analytics.totalShares++;
        
        // Update most shared platform
        if (!this.analytics.mostShared || 
            this.analytics.shares[platform] > this.analytics.shares[this.analytics.mostShared]) {
            this.analytics.mostShared = platform;
        }

        this.saveAnalytics();
        
        // Update share counts in UI
        this.updateShareCounts();
    }

    /**
     * Update share counts in buttons
     */
    updateShareCounts() {
        Object.keys(this.platforms).forEach(platform => {
            const count = this.analytics.shares[platform] || 0;
            const countElements = document.querySelectorAll(`[data-platform="${platform}"] .share-count`);
            
            countElements.forEach(element => {
                element.textContent = count;
            });
        });
    }

    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `social-share-notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    /**
     * Auto-detect page content for sharing
     */
    autoDetectContent() {
        if (this.config.autoDetectContent) {
            // Try to find meta tags
            const metaTitle = document.querySelector('meta[property="og:title"]')?.content;
            const metaDescription = document.querySelector('meta[property="og:description"]')?.content;
            const metaImage = document.querySelector('meta[property="og:image"]')?.content;

            if (metaTitle) this.config.defaultTitle = metaTitle;
            if (metaDescription) this.config.defaultText = metaDescription;
        }
    }

    /**
     * Load analytics from storage
     */
    loadAnalytics() {
        if (this.config.analytics) {
            const stored = localStorage.getItem('socialShareAnalytics');
            if (stored) {
                this.analytics = { ...this.analytics, ...JSON.parse(stored) };
            }
        }
    }

    /**
     * Save analytics to storage
     */
    saveAnalytics() {
        if (this.config.analytics) {
            localStorage.setItem('socialShareAnalytics', JSON.stringify(this.analytics));
        }
    }

    /**
     * Enable/disable platform
     * @param {string} platform - Platform name
     * @param {boolean} enabled - Enabled state
     */
    setPlatformEnabled(platform, enabled) {
        if (this.platforms[platform]) {
            this.platforms[platform].enabled = enabled;
        }
    }

    /**
     * Get sharing statistics
     * @returns {Object} Sharing statistics
     */
    getStats() {
        return {
            totalShares: this.analytics.totalShares,
            platformShares: this.analytics.shares,
            mostSharedPlatform: this.analytics.mostShared,
            enabledPlatforms: Object.keys(this.platforms).filter(p => this.platforms[p].enabled)
        };
    }
}

// ==================== GLOBAL INSTANCE ====================

// Create global instance
window.socialShareManager = new SocialShareManager();

// ==================== LEGACY FUNCTIONS (Backward Compatibility) ====================

/**
 * Legacy report function
 * @deprecated Use socialShareManager.generateShareButtons() instead
 */
function report() {
    console.warn('report() is deprecated. Use socialShareManager.generateShareButtons() instead.');
    
    const buttonsHTML = window.socialShareManager.generateShareButtons();
    document.write(`<div class="middle">${buttonsHTML}</div>`);
}

/**
 * Legacy links function
 * @deprecated Use socialShareManager.generateShareButtons() instead
 */
function links() {
    console.warn('links() is deprecated. Use socialShareManager.generateShareButtons() instead.');
    
    const buttonsHTML = window.socialShareManager.generateShareButtons();
    document.write(`<div class="middle">${buttonsHTML}</div>`);
}

/**
 * Legacy generic social share function
 * @deprecated Use socialShareManager.share() instead
 */
function genericSocialShare(index) {
    console.warn('genericSocialShare() is deprecated. Use socialShareManager.share() instead.');
    
    const platforms = Object.keys(window.socialShareManager.platforms);
    if (platforms[index]) {
        window.socialShareManager.share(platforms[index]);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialShareManager;
}
