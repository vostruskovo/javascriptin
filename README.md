js libraries ...
put 'em in your web project then enjoy new functions





🚀 JavaScript Utilities Library
A collection of powerful, ready-to-use JavaScript functions to enhance your web projects with C-style printing, beautiful navigation menus, social sharing buttons, and more!

📦 Quick Start
Method 1: Direct Include
html
<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
    <!-- Include required dependencies -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
</head>
<body>
    <!-- Include the library -->
    <script src="path/to/your-js-libraries.js"></script>
    
    <script>
        // Start using the functions immediately!
        printf("Hello, World!\n");
        CreatingMenuBar();
        MenuLateralUser();
    </script>
</body>
</html>
Method 2: Modular Import
javascript
import { PrintUtils, NavigationManager, LateralMenu } from './your-js-libraries.js';
🎯 Features
1. 📝 C-Style Printing Functions
No more console.log()! Use familiar C-style functions:

javascript
printf("Hello, %s! You have %d new messages.", "John", 5);
// Output: Hello, John! You have 5 new messages.

println("This appears with a line break");
print_("This appears without line break");
echo("Multiple", "arguments", "supported");

// Format specifiers:
// %s - String
// %d, %i - Integer
// %f - Float (supports precision: %.2f, %.3f)
// %c - Character from ASCII code
2. 🧭 Navigation Menu System
Create beautiful navigation bars effortlessly:

javascript
// Configure your menu
const AppConfig = {
    webpage: "MyWebsite",
    person: {
        name: "Developer Name",
        email: "dev@example.com"
    },
    pageMenu: {
        "home.php": "Home",
        "about.php": "About",
        "contact.php": "Contact"
    }
};

// Create the menu
CreatingMenuBar("./");
// or use the class:
navManager.createMenuBar("./");
3. 📱 Social Sharing Buttons
Add stylish social media sharing buttons:

javascript
const socialUrls = [
    'https://facebook.com/share?u=your-site.com',
    'https://twitter.com/intent/tweet?url=your-site.com',
    'https://linkedin.com/shareArticle?url=your-site.com'
];

styledButtons.addUrls(socialUrls);
styledButtons.createButtons(true);
4. 🎪 Lateral/Sidebar Menu
Elegant sidebar navigation:

javascript
// Auto-creates with pre-configured items
MenuLateralUser();

// Or customize:
lateralMenu.addMenuItem("profile.php", "fa-user", "My Profile");
lateralMenu.createMenu();
🔧 API Reference
PrintUtils Class
javascript
PrintUtils.printf(format, ...args);
PrintUtils.println(string);
PrintUtils.print(string);
PrintUtils.echo(...strings);
PrintUtils.typeOf(value); // Distinguishes char vs string
NavigationManager Class
javascript
const navManager = new NavigationManager(config);
navManager.createMenuBar(basePath);
navManager.showDeveloperInfo();
navManager.addUrls(urls);
LateralMenu Class
javascript
const lateralMenu = new LateralMenu();
lateralMenu.createMenu();
lateralMenu.addMenuItem(page, icon, name);
lateralMenu.removeMenuItem(index);
StyledButtonCreator Class
javascript
const styledButtons = new StyledButtonCreator();
styledButtons.addUrls(urls);
styledButtons.createButtons(showText);
styledButtons.createButtonGrid();
🎨 Customization
Adding Custom Menu Items
javascript
// Navigation bar
navManager.updateConfig({
    pageMenu: {
        "custom.php": "Custom Page",
        "another.php": "Another Page"
    }
});

// Lateral menu
lateralMenu.addMenuItem("custom.php", "fa-star", "Custom");
Custom Styling
javascript
// Override CSS variables
:root {
    --primary-color: #3498db;
    --sidebar-width: 200px;
    --animation-speed: 0.3s;
}
🌟 Advanced Usage
Dynamic Content Loading
javascript
// Create menu only when needed
document.addEventListener('DOMContentLoaded', function() {
    if (userLoggedIn) {
        lateralMenu.createMenu();
    }
});
Conditional Formatting
javascript
// Smart printing based on data
printf("Welcome, %s! Account: %s", 
    userName, 
    accountStatus ? "Active" : "Inactive"
);
Social URLs with Dynamic Content
javascript
const shareUrls = [
    `https://facebook.com/sharer.php?u=${encodeURIComponent(currentPage)}`,
    `https://twitter.com/share?url=${encodeURIComponent(currentPage)}&text=${encodeURIComponent(pageTitle)}`
];
styledButtons.addUrls(shareUrls);
🔧 Configuration Examples
Complete Setup Example
javascript
// App configuration
const AppConfig = {
    webpage: "AwesomeApp",
    person: {
        name: "Alex Developer",
        email: "alex@awesomeapp.com"
    },
    pageMenu: {
        "index.php": "Home",
        "dashboard.php": "Dashboard",
        "settings.php": "Settings",
        "help.php": "Help"
    }
};

// Social media URLs
const socialUrls = [
    'https://facebook.com/AwesomeApp',
    'https://twitter.com/AwesomeApp',
    'https://instagram.com/AwesomeApp',
    'https://linkedin.com/company/AwesomeApp'
];

// Initialize everything
navManager.updateConfig(AppConfig);
styledButtons.addUrls(socialUrls);

// Create interfaces
navManager.createMenuBar("./");
styledButtons.createButtonGrid();
lateralMenu.createMenu();
🚨 Best Practices
Include Dependencies: Always include FontAwesome and Bootstrap CSS

Load Order: Load the library after HTML elements it will manipulate

Error Handling: Wrap in try-catch for production use

Mobile First: All components are responsive by default

🐛 Troubleshooting
Problem: Functions not found
Solution: Ensure the script is loaded before calling functions

Problem: Icons not displaying
Solution: Check FontAwesome CSS is included

Problem: Menu not responsive
Solution: Verify Bootstrap CSS is loaded

📝 License
Free to use in personal and commercial projects. Attribution appreciated!

🤝 Contributing
Feel free to extend these classes and add more utilities!

⭐ Pro Tip: Combine these libraries to create complete admin dashboards, social platforms, or business websites with minimal code!

javascript
// One-liner to setup complete admin interface
setupAdminInterface("MyAdmin", "admin@company.com", "./admin/");
Happy coding!
