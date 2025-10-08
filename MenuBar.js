// Configuration object
const AppConfig = {
    webpage: "alx",
    person: {
        name: "alx",
        email: "alx@example.com"
    },
    pageMenu: {
        "home.php": "Home",
        "settings.php": "Settings",
        "about.php": "About",
        "contact.php": "Contact"
    },
    subject: "suggestion"
};

// Social media and payment URLs
const socialUrls = [
    `https://www.facebook.com/${AppConfig.webpage}`,
    `https://www.instagram.com/${AppConfig.webpage}`,
    "https://mail.yandex.com/?uid=869376094#compose",
    `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${AppConfig.person.email}&su=${AppConfig.subject}&body=my-text&ui=2&tf=1&pli=1`,
    "https://web.telegram.org",
    "https://www.skype.com",
    `https://chat.whatsapp.com/${AppConfig.webpage}`,
    `https://www.patreon.com/${AppConfig.webpage}`,
    "https://www.bitcoin.com/",
    `https://www.paypal.com/${AppConfig.webpage}`,
    `https://www.mercadopago.com.br/${AppConfig.webpage}`,
    `https://pagseguro.uol.com.br/${AppConfig.webpage}`,
    `https://www.visa.com/${AppConfig.webpage}`,
    `https://www.bradesco.com.br/${AppConfig.webpage}`,
    `https://www.itau.com.br/${AppConfig.webpage}`,
    `https://www.twitter.com/${AppConfig.webpage}`
];

class NavigationManager {
    constructor(config) {
        this.config = config;
        this.stylesAdded = false;
    }

    // Add CSS styles for navbar
    addNavbarStyles() {
        if (this.stylesAdded) return;
        
        const styles = `
            <style>
                .navbar-custom {
                    background: linear-gradient(135deg, #2c3e50, #34495e);
                    border: none;
                    border-radius: 0;
                    margin-bottom: 0;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                }
                .navbar-custom .navbar-brand {
                    color: #ecf0f1 !important;
                    font-weight: bold;
                    font-size: 20px;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                .navbar-custom .navbar-brand:hover {
                    color: #3498db !important;
                }
                .navbar-custom .nav li a {
                    color: #bdc3c7 !important;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }
                .navbar-custom .nav li a:hover {
                    color: #3498db !important;
                    background: transparent !important;
                    transform: translateY(-2px);
                }
                .navbar-custom .nav li.active a {
                    color: #3498db !important;
                    background: transparent !important;
                }
                @media (max-width: 768px) {
                    .navbar-custom .navbar-brand {
                        font-size: 18px;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
        this.stylesAdded = true;
    }

    // Create navigation menu
    createMenuBar(basePath = "./") {
        this.addNavbarStyles();
        
        let navbarHtml = `
            <nav class="navbar navbar-inverse navbar-custom">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" onclick="navManager.showDeveloperInfo()">
                            <i class="fas fa-code"></i> ${this.config.webpage}
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="navbar-collapse">
                        <ul class="nav navbar-nav">
        `;

        // Add menu items
        for (const [page, title] of Object.entries(this.config.pageMenu)) {
            const isActive = window.location.pathname.includes(page) ? 'class="active"' : '';
            navbarHtml += `
                <li ${isActive}>
                    <a href="${basePath}${page}" style="text-decoration: none;">
                        ${title}
                    </a>
                </li>
            `;
        }

        navbarHtml += `
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a href="#" onclick="navManager.showDeveloperInfo()">
                                    <i class="fas fa-info-circle"></i> About
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        document.write(navbarHtml);
    }

    // Show developer information
    showDeveloperInfo() {
        const message = `
Developed by: ${this.config.person.name}
Email: ${this.config.person.email}
Website: ${this.config.webpage}

Contact us for more information!
        `.trim();

        // SweetAlert2 for better looking alerts (optional)
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Developer Information',
                text: message,
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3498db'
            });
        } else {
            alert(message);
        }
    }

    // Get social URLs for sharing
    getSocialUrls() {
        return socialUrls;
    }

    // Get menu configuration
    getMenuConfig() {
        return this.config.pageMenu;
    }

    // Update configuration dynamically
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
    }
}

// Initialize navigation manager
const navManager = new NavigationManager(AppConfig);

// Legacy functions for backward compatibility
function CreatingMenuBar(path = "./") {
    navManager.createMenuBar(path);
}

function sms(path = "./") {
    navManager.showDeveloperInfo();
}

// Auto-initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // You can automatically create navbar by calling:
    // navManager.createMenuBar();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NavigationManager, AppConfig, socialUrls };
}
