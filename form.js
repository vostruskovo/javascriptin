/**
 * 🎯 Form Generator Utilities
 * Dynamic form creation for authentication and user registration
 */

class FormGenerator {
    constructor() {
        this.fieldConfig = {
            signin: [
                { name: "email", type: "email", placeholder: "Enter your email", required: true },
                { name: "password", type: "password", placeholder: "Enter your password", required: true }
            ],
            signup: [
                { name: "email", type: "email", placeholder: "Enter your email", required: true },
                { name: "password", type: "password", placeholder: "Create a password", required: true },
                { name: "confirmPassword", type: "password", placeholder: "Confirm your password", required: true },
                { name: "date", type: "date", placeholder: "Birth date", required: false },
                { name: "username", type: "text", placeholder: "Choose a username", required: false }
            ]
        };

        this.buttonConfig = {
            signin: { text: "Sign In", class: "btn-primary" },
            signup: { text: "Sign Up", class: "btn-success" }
        };

        this.formCount = 0;
    }

    /**
     * Generate a unique form ID
     * @returns {string} Unique form identifier
     */
    generateFormId() {
        return `form_${++this.formCount}_${Date.now()}`;
    }

    /**
     * Create a form with GET method
     * @param {string} phpFile - Path to PHP processing file
     * @param {string} formType - Type of form ('signin' or 'signup')
     * @param {Object} options - Additional form options
     * @returns {string} Form HTML
     */
    createGetForm(phpFile, formType = 'signin', options = {}) {
        return this._createForm(phpFile, 'GET', formType, options);
    }

    /**
     * Create a form with POST method
     * @param {string} phpFile - Path to PHP processing file
     * @param {string} formType - Type of form ('signin' or 'signup')
     * @param {Object} options - Additional form options
     * @returns {string} Form HTML
     */
    createPostForm(phpFile, formType = 'signin', options = {}) {
        return this._createForm(phpFile, 'POST', formType, options);
    }

    /**
     * Internal form creation method
     */
    _createForm(phpFile, method, formType, options) {
        const formId = this.generateFormId();
        const fields = this.fieldConfig[formType] || this.fieldConfig.signin;
        const button = this.buttonConfig[formType] || this.buttonConfig.signin;

        const formClasses = ['auth-form', `form-${formType}`];
        if (options.className) formClasses.push(options.className);

        let formHTML = `
            <form id="${formId}" 
                  action="${phpFile}" 
                  method="${method}" 
                  class="${formClasses.join(' ')}"
                  ${options.enctype ? `enctype="${options.enctype}"` : ''}>
                <div class="form-header">
                    <h3>${options.title || this._capitalizeFirst(formType)}</h3>
                    ${options.description ? `<p class="form-description">${options.description}</p>` : ''}
                </div>
                
                <div class="form-fields">
        `;

        // Generate form fields
        fields.forEach(field => {
            formHTML += this._createField(field, formId);
        });

        // Add additional custom fields
        if (options.additionalFields) {
            options.additionalFields.forEach(field => {
                formHTML += this._createField(field, formId);
            });
        }

        formHTML += `
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn ${button.class} ${options.buttonClass || ''}">
                        ${button.text}
                    </button>
                    
                    ${options.extraButtons || ''}
                </div>
                
                ${this._createFormValidationScript(formId, fields)}
            </form>
            
            ${this._injectFormStyles()}
        `;

        document.write(formHTML);
        return formId;
    }

    /**
     * Create a single form field
     */
    _createField(fieldConfig, formId) {
        const fieldId = `${fieldConfig.name}_${formId}`;
        
        return `
            <div class="form-group">
                <label for="${fieldId}" class="form-label">
                    ${fieldConfig.label || this._capitalizeFirst(fieldConfig.name)}
                    ${fieldConfig.required ? '<span class="required">*</span>' : ''}
                </label>
                <input type="${fieldConfig.type}" 
                       id="${fieldId}"
                       name="${fieldConfig.name}"
                       class="form-control ${fieldConfig.class || ''}"
                       placeholder="${fieldConfig.placeholder}"
                       ${fieldConfig.required ? 'required' : ''}
                       ${fieldConfig.pattern ? `pattern="${fieldConfig.pattern}"` : ''}
                       ${fieldConfig.min ? `min="${fieldConfig.min}"` : ''}
                       ${fieldConfig.max ? `max="${fieldConfig.max}"` : ''}
                       ${fieldConfig.value ? `value="${fieldConfig.value}"` : ''}>
                ${fieldConfig.helpText ? `<small class="form-help">${fieldConfig.helpText}</small>` : ''}
            </div>
        `;
    }

    /**
     * Create signup form with enhanced features
     */
    createSignupForm(phpFile = 'signup.php', options = {}) {
        const defaultOptions = {
            title: 'Create Your Account',
            description: 'Join our community today!',
            additionalFields: [
                {
                    name: 'fullname',
                    type: 'text',
                    placeholder: 'Enter your full name',
                    required: true,
                    label: 'Full Name'
                },
                {
                    name: 'phone',
                    type: 'tel',
                    placeholder: 'Enter your phone number',
                    required: false,
                    label: 'Phone Number'
                }
            ],
            extraButtons: `
                <button type="button" class="btn btn-link" onclick="formGenerator.clearForm('${this.generateFormId()}')">
                    Clear Form
                </button>
            `
        };

        return this.createPostForm(phpFile, 'signup', { ...defaultOptions, ...options });
    }

    /**
     * Create signin form with enhanced features
     */
    createSigninForm(phpFile = 'login.php', options = {}) {
        const defaultOptions = {
            title: 'Welcome Back',
            description: 'Sign in to your account',
            extraButtons: `
                <div class="form-links">
                    <a href="forgot-password.php" class="forgot-password">Forgot Password?</a>
                    <a href="signup.php" class="signup-link">Don't have an account? Sign up</a>
                </div>
            `
        };

        return this.createPostForm(phpFile, 'signin', { ...defaultOptions, ...options });
    }

    /**
     * Create form validation script
     */
    _createFormValidationScript(formId, fields) {
        return `
            <script>
                document.getElementById('${formId}').addEventListener('submit', function(e) {
                    const form = this;
                    let isValid = true;
                    const errors = [];
                    
                    // Password confirmation validation
                    const passwordField = form.querySelector('input[name="password"]');
                    const confirmPasswordField = form.querySelector('input[name="confirmPassword"]');
                    
                    if (passwordField && confirmPasswordField) {
                        if (passwordField.value !== confirmPasswordField.value) {
                            isValid = false;
                            errors.push('Passwords do not match');
                            confirmPasswordField.classList.add('error');
                        } else {
                            confirmPasswordField.classList.remove('error');
                        }
                    }
                    
                    // Email validation
                    const emailField = form.querySelector('input[type="email"]');
                    if (emailField && !this._validateEmail(emailField.value)) {
                        isValid = false;
                        errors.push('Please enter a valid email address');
                        emailField.classList.add('error');
                    } else if (emailField) {
                        emailField.classList.remove('error');
                    }
                    
                    if (!isValid) {
                        e.preventDefault();
                        this._showFormErrors('${formId}', errors);
                    }
                });
                
                // Email validation helper
                function _validateEmail(email) {
                    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                    return re.test(email);
                }
                
                // Error display helper
                function _showFormErrors(formId, errors) {
                    let errorContainer = document.querySelector('#${formId} .form-errors');
                    if (!errorContainer) {
                        errorContainer = document.createElement('div');
                        errorContainer.className = 'form-errors';
                        document.querySelector('#${formId} .form-header').after(errorContainer);
                    }
                    
                    errorContainer.innerHTML = errors.map(error => 
                        '<div class="error-message">' + error + '</div>'
                    ).join('');
                }
            </script>
        `;
    }

    /**
     * Inject form styles
     */
    _injectFormStyles() {
        return `
            <style>
                .auth-form {
                    max-width: 400px;
                    margin: 20px auto;
                    padding: 30px;
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    font-family: Arial, sans-serif;
                }
                
                .form-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .form-header h3 {
                    color: #333;
                    margin-bottom: 10px;
                }
                
                .form-description {
                    color: #666;
                    font-size: 14px;
                }
                
                .form-group {
                    margin-bottom: 20px;
                }
                
                .form-label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #333;
                }
                
                .required {
                    color: #e74c3c;
                }
                
                .form-control {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    transition: border-color 0.3s;
                    box-sizing: border-box;
                }
                
                .form-control:focus {
                    outline: none;
                    border-color: #3498db;
                }
                
                .form-control.error {
                    border-color: #e74c3c;
                }
                
                .form-help {
                    display: block;
                    margin-top: 5px;
                    color: #666;
                    font-size: 12px;
                }
                
                .form-actions {
                    margin-top: 30px;
                }
                
                .btn {
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                
                .btn-primary {
                    background: #3498db;
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #2980b9;
                }
                
                .btn-success {
                    background: #27ae60;
                    color: white;
                }
                
                .btn-success:hover {
                    background: #219a52;
                }
                
                .btn-link {
                    background: none;
                    color: #3498db;
                    text-decoration: underline;
                    margin-top: 10px;
                }
                
                .form-links {
                    margin-top: 15px;
                    text-align: center;
                }
                
                .form-links a {
                    display: block;
                    margin: 5px 0;
                    color: #666;
                    text-decoration: none;
                }
                
                .form-links a:hover {
                    color: #3498db;
                }
                
                .form-errors {
                    margin: 15px 0;
                    padding: 10px;
                    background: #ffeaa7;
                    border-radius: 5px;
                }
                
                .error-message {
                    color: #e74c3c;
                    font-size: 14px;
                    margin: 5px 0;
                }
                
                @media (max-width: 480px) {
                    .auth-form {
                        margin: 10px;
                        padding: 20px;
                    }
                }
            </style>
        `;
    }

    /**
     * Clear form fields
     */
    clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            const errorContainer = form.querySelector('.form-errors');
            if (errorContainer) errorContainer.remove();
            
            const errorFields = form.querySelectorAll('.error');
            errorFields.forEach(field => field.classList.remove('error'));
        }
    }

    /**
     * Utility function to capitalize first letter
     */
    _capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Create global instance
const formGenerator = new FormGenerator();

// Legacy functions for backward compatibility
function FormToPHP_get(path_phpFile) {
    return formGenerator.createGetForm(path_phpFile, 'signin');
}

function FormToPHP_post(path_phpFile) {
    return formGenerator.createPostForm(path_phpFile, 'signin');
}

function signup() {
    return formGenerator.createSignupForm();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormGenerator, formGenerator };
}
