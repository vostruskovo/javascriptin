class StyledButtonCreator {
    constructor() {
        this.stylesAdded = false;
        this.iconMap = new Map(); // Store icon mappings
        this.urlMap = new Map();  // Store URL mappings
    }

    // Initialize CSS styles
    setCss() {
        if (this.stylesAdded) return;
        
        const styles = `
            <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.4.1/css/all.css'>
            <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css'>
            <style>
                body { padding: 0; margin: 0; }
                .middle { 
                    position: absolute; 
                    top: 50%; 
                    transform: translateY(-50%); 
                    width: 100%; 
                    text-align: center; 
                }
                .btn-container { margin: 5px; }
                .styled-btn {
                    display: inline-block;
                    width: 90px;
                    height: 90px;
                    background: #f1f1f1;
                    margin: 10px;
                    border-radius: 30%;
                    box-shadow: 0 5px 15px -5px #00000070;
                    color: #3498db;
                    overflow: hidden;
                    position: relative;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .styled-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px -5px #00000090;
                }
                .styled-btn i {
                    line-height: 90px;
                    font-size: 26px;
                    transition: 0.2s linear;
                }
                .styled-btn:hover i {
                    transform: scale(1.3);
                    color: #f1f1f1;
                }
                .styled-btn::before {
                    content: '';
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    background: #3498db;
                    transform: rotate(45deg);
                    left: -110%;
                    top: 90%;
                }
                .styled-btn:hover::before {
                    animation: slideIn 0.7s 1;
                    top: -10%;
                    left: -10%;
                }
                @keyframes slideIn {
                    0% { left: -110%; top: 90%; }
                    50% { left: 10%; top: -30%; }
                    100% { top: -10%; left: -10%; }
                }
                .btn-text {
                    font-size: 12px;
                    margin-top: -10px;
                    display: block;
                    color: #333;
                    font-weight: bold;
                }
                .btn-with-text {
                    display: inline-block;
                    text-align: center;
                    margin: 15px;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
        this.stylesAdded = true;
    }

    // Extract domain name from URL
    extractDomain(url) {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            // Remove TLD and get main domain name
            const domainParts = domain.split('.');
            return domainParts.length > 1 ? domainParts[0] : domain;
        } catch (e) {
            console.error('Invalid URL:', url);
            return '';
        }
    }

    // Add URLs and map them to icons
    addUrls(urls) {
        urls.forEach(url => {
            const domain = this.extractDomain(url);
            if (domain) {
                this.urlMap.set(domain, url);
                // Map common domains to FontAwesome icons
                const iconMap = {
                    'facebook': 'facebook-f',
                    'twitter': 'twitter',
                    'instagram': 'instagram',
                    'linkedin': 'linkedin-in',
                    'youtube': 'youtube',
                    'github': 'github',
                    'google': 'google',
                    'pinterest': 'pinterest-p',
                    'reddit': 'reddit-alien',
                    'whatsapp': 'whatsapp',
                    'telegram': 'telegram-plane',
                    'discord': 'discord',
                    'slack': 'slack',
                    'tiktok': 'tiktok',
                    'snapchat': 'snapchat-ghost'
                };
                
                const icon = iconMap[domain] || 'share-alt';
                this.iconMap.set(domain, icon);
            }
        });
    }

    // Sort icons alphabetically
    sortIcons() {
        const sortedDomains = Array.from(this.iconMap.keys()).sort();
        const sortedData = sortedDomains.map(domain => ({
            domain,
            icon: this.iconMap.get(domain),
            url: this.urlMap.get(domain)
        }));
        return sortedData;
    }

    // Create a single button
    createButton(domain, icon, url, index, showText = true) {
        const buttonHtml = `
            <div class="btn-with-text">
                <button class="styled-btn" onclick="styledButtons.openShareWindow('${url}')" 
                        title="Share on ${domain}">
                    <i class="fab fa-${icon}"></i>
                </button>
                ${showText ? `<span class="btn-text">${domain}</span>` : ''}
            </div>
        `;
        return buttonHtml;
    }

    // Open share window
    openShareWindow(url) {
        window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
        return true;
    }

    // Create buttons container
    createButtons(showText = true) {
        this.setCss();
        const sortedData = this.sortIcons();
        
        const container = document.createElement('div');
        container.className = 'middle';
        
        sortedData.forEach((data, index) => {
            container.insertAdjacentHTML('beforeend', 
                this.createButton(data.domain, data.icon, data.url, index, showText)
            );
        });

        document.body.appendChild(container);
        return container;
    }

    // Create simple button grid (alternative style)
    createButtonGrid() {
        this.setCss();
        const sortedData = this.sortIcons();
        
        const gridContainer = document.createElement('div');
        gridContainer.className = 'middle';
        gridContainer.style.display = 'flex';
        gridContainer.style.flexWrap = 'wrap';
        gridContainer.style.justifyContent = 'center';
        gridContainer.style.maxWidth = '600px';
        gridContainer.style.margin = '0 auto';

        sortedData.forEach((data, index) => {
            gridContainer.insertAdjacentHTML('beforeend', 
                this.createButton(data.domain, data.icon, data.url, index, true)
            );
        });

        document.body.appendChild(gridContainer);
        return gridContainer;
    }
}

// Create global instance
const styledButtons = new StyledButtonCreator();

// Legacy functions for backward compatibility
function SetCss() {
    styledButtons.setCss();
}

function creatinIcons(...args) {
    // This function would need your URL array to work properly
    console.warn('creatinIcons is deprecated. Use styledButtons.addUrls() instead.');
}

function BoobleSort() {
    console.warn('BoobleSort is deprecated. Use styledButtons.sortIcons() instead.');
}

function genericSocialShare(i) {
    console.warn('genericSocialShare is deprecated. Use styledButtons.openShareWindow() instead.');
}

function reportButton() {
    styledButtons.createButtons(true);
}

function reportLink() {
    styledButtons.createButtons(false);
}

// Usage example:
/*
// Initialize with URLs
const socialUrls = [
    'https://facebook.com/share?u=example.com',
    'https://twitter.com/intent/tweet?url=example.com',
    'https://linkedin.com/shareArticle?url=example.com',
    'https://instagram.com',
    'https://github.com'
];

styledButtons.addUrls(socialUrls);

// Create buttons
styledButtons.createButtons(true);

// Or create grid layout
// styledButtons.createButtonGrid();
*/
