class LateralMenu {
    constructor() {
        this.menuItems = [
            { page: "LoginUser.php", icon: "fa-home", name: "Inicio" },
            { page: "#", icon: "fa-envelope", name: "Mensagem" },
            { page: "#", icon: "fa-power-off", name: "Perfil" },
            { page: "#", icon: "fa-home", name: "Denúncias" },
            { page: "#", icon: "fa-envelope", name: "Configuração" },
            { page: "#", icon: "fa-home", name: "Contato" },
            { page: "#", icon: "fa-envelope", name: "Networking" },
            { page: "#", icon: "fa-power-off", name: "Estatísticas" },
            { page: "../../index.php", icon: "fa-power-off", name: "Sair" }
        ];
        this.stylesAdded = false;
    }

    setCss() {
        if (this.stylesAdded) return;
        
        const styles = `
            <style>
                /* Sidebar Styles */
                nav.sidebar {
                    width: 150px;
                    height: 100vh;
                    margin-left: -160px;
                    float: left;
                    z-index: 8000;
                    margin-bottom: 0px;
                    position: fixed;
                    top: 0;
                    left: 0;
                    background: #2c3e50;
                    transition: all 0.3s ease;
                    overflow-y: auto;
                }
                
                nav.sidebar:hover {
                    margin-left: 0px;
                }
                
                nav.sidebar .navbar-collapse, 
                nav.sidebar .container-fluid {
                    padding: 0;
                }
                
                nav.sidebar li {
                    width: 100%;
                    border-bottom: 1px solid #34495e;
                }
                
                nav.sidebar .navbar-nav {
                    width: 100%;
                    margin: 0;
                }
                
                nav.sidebar .navbar-nav li a {
                    color: #ecf0f1;
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                
                nav.sidebar .navbar-nav li a:hover {
                    background: #34495e;
                    color: #3498db;
                    transform: translateX(5px);
                }
                
                nav.sidebar .navbar-nav li a .fa {
                    margin-right: 10px;
                    font-size: 16px;
                    width: 20px;
                    text-align: center;
                }
                
                /* Main content area */
                .main {
                    width: 100%;
                    margin-left: 0;
                    transition: all 0.3s ease;
                    padding: 20px;
                }
                
                /* Responsive design */
                @media (min-width: 768px) {
                    nav.sidebar {
                        margin-left: -160px;
                    }
                    
                    nav.sidebar:hover {
                        margin-left: 0px;
                    }
                    
                    .main {
                        width: calc(100% - 150px);
                        margin-left: 150px;
                    }
                }
                
                @media (min-width: 1330px) {
                    nav.sidebar {
                        margin-left: 0px;
                    }
                    
                    .main {
                        width: calc(100% - 150px);
                        margin-left: 150px;
                    }
                }
                
                /* Dropdown styles */
                nav.sidebar .navbar-nav .open .dropdown-menu > li > a:hover,
                nav.sidebar .navbar-nav .open .dropdown-menu > li > a:focus {
                    color: #3498db;
                    background-color: transparent;
                }
                
                section {
                    padding-left: 15px;
                }
                
                /* Animation classes */
                .forAnimate {
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                nav:hover .forAnimate {
                    opacity: 1;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
        this.stylesAdded = true;
    }

    createMenu() {
        this.setCss();
        
        let menuHtml = `
            <nav class="navbar navbar-inverse sidebar" role="navigation">
                <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                    <ul class="nav navbar-nav">
        `;
        
        // Generate menu items
        this.menuItems.forEach((item, index) => {
            const isActive = window.location.pathname.includes(item.page) ? 'active' : '';
            menuHtml += `
                <li class="${isActive}">
                    <a href="${item.page}">
                        <i class="fa ${item.icon}"></i>
                        <span style="font-size:14px;">${item.name}</span>
                    </a>
                </li>
            `;
        });
        
        menuHtml += `
                    </ul>
                </div>
            </nav>
            <div class="main">
                <!-- Your main content goes here -->
            </div>
        `;
        
        document.write(menuHtml);
    }

    // Method to add new menu items dynamically
    addMenuItem(page, icon, name) {
        this.menuItems.push({ page, icon, name });
    }

    // Method to remove menu item
    removeMenuItem(index) {
        if (index >= 0 && index < this.menuItems.length) {
            this.menuItems.splice(index, 1);
        }
    }

    // Method to get all menu items
    getMenuItems() {
        return this.menuItems;
    }

    // Method to update menu item
    updateMenuItem(index, newPage, newIcon, newName) {
        if (index >= 0 && index < this.menuItems.length) {
            this.menuItems[index] = {
                page: newPage || this.menuItems[index].page,
                icon: newIcon || this.menuItems[index].icon,
                name: newName || this.menuItems[index].name
            };
        }
    }
}

// Create global instance
const lateralMenu = new LateralMenu();

// Legacy functions for backward compatibility
function setCss() {
    lateralMenu.setCss();
}

function MenuLateralUser() {
    lateralMenu.createMenu();
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // You can automatically create the menu by calling:
    // lateralMenu.createMenu();
});

// Usage examples:
/*
// Add new menu item
lateralMenu.addMenuItem("profile.php", "fa-user", "Meu Perfil");

// Update existing item
lateralMenu.updateMenuItem(2, "profile.php", "fa-user", "Meu Perfil");

// Remove item
lateralMenu.removeMenuItem(1);
*/
