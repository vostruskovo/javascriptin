/**
 * @file Enhanced Sidebar Navigation System
 * @description A responsive, feature-rich sidebar navigation component
 * @version 2.0.0
 */

class SidebarNavigation {
    constructor() {
        this.pages = {
            "index.php": { 
                name: "Home", 
                icon: "🏠", 
                badge: null 
            },
            "about.php": { 
                name: "About", 
                icon: "ℹ️", 
                badge: null 
            },
            "contact.php": { 
                name: "Contact", 
                icon: "📞", 
                badge: null 
            },
            "whoWeAre.php": { 
                name: "Who We Are", 
                icon: "👥", 
                badge: null 
            },
            "report.php": { 
                name: "Reports", 
                icon: "📊", 
                badge: "3" 
            },
            "donate.php": { 
                name: "Donate", 
                icon: "❤️", 
                badge: "New" 
            },
            "services.php": { 
                name: "Services", 
                icon: "⚙️", 
                badge: null 
            },
            "portfolio.php": { 
                name: "Portfolio", 
                icon: "📁", 
                badge: null 
            }
        };

        this.config = {
            sidebarWidth: "250px",
            collapsedWidth: "60px",
            animationDuration: "0.3s",
            theme: {
                primary: "#2c3e50",
                secondary: "#34495e",
                accent: "#3498db",
                text: "#ecf0f1",
                hover: "#1abc9c"
            },
            responsiveBreakpoint: 768
        };

        this.state = {
            isCollapsed: false,
            isMobile: false,
            currentPage: this.getCurrentPage()
        };

        this.init();
    }

    /**
     * Initialize the sidebar navigation
     */
    init() {
        this.injectStyles();
        this.renderSidebar();
        this.attachEventListeners();
        this.checkResponsive();
    }

    /**
     * Inject CSS styles into the document
     */
    injectStyles() {
        const styles = `
            <style>
            .sidebar-container {
                position: fixed;
                left: 0;
                top: 0;
                height: 100vh;
                width: ${this.config.sidebarWidth};
                background: ${this.config.theme.primary};
                transition: all ${this.config.animationDuration} ease;
                z-index: 1000;
                box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                overflow-y: auto;
                overflow-x: hidden;
            }

            .sidebar-container.collapsed {
                width: ${this.config.collapsedWidth};
            }

            .sidebar-header {
                padding: 20px;
                background: ${this.config.theme.secondary};
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .sidebar-brand {
                color: ${this.config.theme.text};
                font-size: 1.5em;
                font-weight: bold;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .sidebar-nav {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .nav-item {
                position: relative;
            }

            .nav-link {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                color: ${this.config.theme.text};
                text-decoration: none;
                transition: all 0.2s ease;
                border-left: 3px solid transparent;
            }

            .nav-link:hover {
                background: ${this.config.theme.hover};
                border-left-color: ${this.config.theme.accent};
                padding-left: 25px;
            }

            .nav-link.active {
                background: ${this.config.theme.secondary};
                border-left-color: ${this.config.theme.accent};
                color: ${this.config.theme.accent};
            }

            .nav-icon {
                font-size: 1.2em;
                min-width: 30px;
                text-align: center;
                transition: transform ${this.config.animationDuration} ease;
            }

            .nav-text {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                transition: opacity ${this.config.animationDuration} ease;
            }

            .sidebar-container.collapsed .nav-text {
                opacity: 0;
                visibility: hidden;
            }

            .nav-badge {
                background: ${this.config.theme.accent};
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.8em;
                font-weight: bold;
            }

            .sidebar-toggle {
                position: absolute;
                top: 15px;
                right: -15px;
                background: ${this.config.theme.primary};
                border: 2px solid ${this.config.theme.secondary};
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: ${this.config.theme.text};
                transition: all 0.2s ease;
            }

            .sidebar-toggle:hover {
                background: ${this.config.theme.accent};
                transform: scale(1.1);
            }

            .main-content {
                margin-left: ${this.config.sidebarWidth};
                transition: margin-left ${this.config.animationDuration} ease;
                min-height: 100vh;
                padding: 20px;
            }

            .main-content.expanded {
                margin-left: ${this.config.collapsedWidth};
            }

            .mobile-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 999;
            }

            .mobile-overlay.active {
                display: block;
            }

            /* Responsive Design */
            @media (max-width: ${this.config.responsiveBreakpoint}px) {
                .sidebar-container {
                    transform: translateX(-100%);
                    width: 280px;
                }

                .sidebar-container.mobile-open {
                    transform: translateX(0);
                }

                .main-content {
                    margin-left: 0 !important;
                }

                .mobile-header {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    background: ${this.config.theme.secondary};
                    color: ${this.config.theme.text};
                }

                .mobile-menu-btn {
                    background: none;
                    border: none;
                    color: ${this.config.theme.text};
                    font-size: 1.5em;
                    cursor: pointer;
                    margin-right: 15px;
                }
            }

            /* Scrollbar Styling */
            .sidebar-container::-webkit-scrollbar {
                width: 4px;
            }

            .sidebar-container::-webkit-scrollbar-track {
                background: ${this.config.theme.secondary};
            }

            .sidebar-container::-webkit-scrollbar-thumb {
                background: ${this.config.theme.accent};
                border-radius: 2px;
            }

            /* Animation for sidebar items */
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .nav-item {
                animation: slideIn 0.3s ease forwards;
            }

            .nav-item:nth-child(1) { animation-delay: 0.1s; }
            .nav-item:nth-child(2) { animation-delay: 0.15s; }
            .nav-item:nth-child(3) { animation-delay: 0.2s; }
            .nav-item:nth-child(4) { animation-delay: 0.25s; }
            .nav-item:nth-child(5) { animation-delay: 0.3s; }
            .nav-item:nth-child(6) { animation-delay: 0.35s; }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    /**
     * Render the sidebar navigation
     */
    renderSidebar() {
        const sidebarHTML = `
            <div class="sidebar-container" id="sidebar">
                <div class="sidebar-header">
                    <a href="index.php" class="sidebar-brand">
                        <span class="nav-icon">🚀</span>
                        <span class="nav-text">MyApp</span>
                    </a>
                </div>

                <ul class="sidebar-nav">
                    ${Object.entries(this.pages).map(([url, page], index) => `
                        <li class="nav-item">
                            <a href="${url}" class="nav-link ${this.state.currentPage === url ? 'active' : ''}" 
                               data-page="${url}">
                                <span class="nav-icon">${page.icon}</span>
                                <span class="nav-text">${page.name}</span>
                                ${page.badge ? `<span class="nav-badge">${page.badge}</span>` : ''}
                            </a>
                        </li>
                    `).join('')}
                </ul>

                <div class="sidebar-toggle" id="sidebarToggle">
                    ${this.state.isCollapsed ? '→' : '←'}
                </div>
            </div>

            <div class="mobile-overlay" id="mobileOverlay"></div>

            ${this.state.isMobile ? `
                <div class="mobile-header">
                    <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
                    <span>MyApp</span>
                </div>
            ` : ''}

            <div class="main-content" id="mainContent">
                <!-- Main content will be here -->
            </div>
        `;

        // Create container if it doesn't exist
        let container = document.getElementById('sidebar-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'sidebar-container';
            document.body.insertBefore(container, document.body.firstChild);
        }

        container.innerHTML = sidebarHTML;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Sidebar toggle
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Mobile menu button
        document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Mobile overlay click
        document.getElementById('mobileOverlay')?.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigation(e);
            });
        });

        // Responsive handling
        window.addEventListener('resize', () => {
            this.checkResponsive();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                this.toggleSidebar();
            }
        });
    }

    /**
     * Toggle sidebar collapsed state
     */
    toggleSidebar() {
        this.state.isCollapsed = !this.state.isCollapsed;
        
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggleBtn = document.getElementById('sidebarToggle');

        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        toggleBtn.textContent = this.state.isCollapsed ? '→' : '←';

        // Save state to localStorage
        localStorage.setItem('sidebarCollapsed', this.state.isCollapsed);
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
    }

    /**
     * Handle navigation clicks
     * @param {Event} e - Click event
     */
    handleNavigation(e) {
        const link = e.currentTarget;
        const url = link.getAttribute('href');
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');

        // Close mobile menu on navigation
        if (this.state.isMobile) {
            this.closeMobileMenu();
        }

        // Add loading state
        link.classList.add('loading');
        setTimeout(() => {
            link.classList.remove('loading');
        }, 500);

        this.state.currentPage = url;
    }

    /**
     * Check and update responsive state
     */
    checkResponsive() {
        const wasMobile = this.state.isMobile;
        this.state.isMobile = window.innerWidth <= this.config.responsiveBreakpoint;

        if (wasMobile !== this.state.isMobile) {
            this.renderSidebar();
            this.attachEventListeners();
        }
    }

    /**
     * Get current page from URL
     * @returns {string} Current page URL
     */
    getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.php';
    }

    /**
     * Add a new page to navigation
     * @param {string} url - Page URL
     * @param {string} name - Page name
     * @param {string} icon - Page icon
     * @param {string} badge - Optional badge
     */
    addPage(url, name, icon = "📄", badge = null) {
        this.pages[url] = { name, icon, badge };
        this.renderSidebar();
        this.attachEventListeners();
    }

    /**
     * Remove a page from navigation
     * @param {string} url - Page URL to remove
     */
    removePage(url) {
        delete this.pages[url];
        this.renderSidebar();
        this.attachEventListeners();
    }

    /**
     * Update page badge
     * @param {string} url - Page URL
     * @param {string} badge - New badge value
     */
    updateBadge(url, badge) {
        if (this.pages[url]) {
            this.pages[url].badge = badge;
            this.renderSidebar();
            this.attachEventListeners();
        }
    }

    /**
     * Change sidebar theme
     * @param {Object} newTheme - New theme colors
     */
    setTheme(newTheme) {
        this.config.theme = { ...this.config.theme, ...newTheme };
        this.injectStyles();
    }

    /**
     * Get navigation statistics
     * @returns {Object} Navigation stats
     */
    getStats() {
        return {
            totalPages: Object.keys(this.pages).length,
            pagesWithBadges: Object.values(this.pages).filter(page => page.badge).length,
            currentPage: this.state.currentPage,
            isCollapsed: this.state.isCollapsed,
            isMobile: this.state.isMobile
        };
    }
}

// ==================== AUTO-INITIALIZATION ====================

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.sidebarNav = new SidebarNavigation();
});

// ==================== LEGACY FUNCTIONS (Backward Compatibility) ====================

/**
 * Legacy function to set CSS (deprecated)
 */
function setCss() {
    console.warn('setCss() is deprecated. Use the new SidebarNavigation class instead.');
}

/**
 * Legacy function to create menu (deprecated)
 */
function MenuLateralUser() {
    console.warn('MenuLateralUser() is deprecated. Use the new SidebarNavigation class instead.');
    
    // Fallback implementation
    const fallbackHTML = `
        <nav style="background: #2c3e50; color: white; padding: 10px;">
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${Object.entries({
                    "index.php": "Home",
                    "about.php": "About", 
                    "contact.php": "Contact",
                    "whoWeAre.php": "Who We Are",
                    "report.php": "Reports",
                    "donate.php": "Donate"
                }).map(([url, name]) => 
                    `<li style="padding: 5px 0;">
                        <a href="${url}" style="color: white; text-decoration: none;">${name}</a>
                    </li>`
                ).join('')}
            </ul>
        </nav>
    `;
    
    document.write(fallbackHTML);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SidebarNavigation;
}
