/**
 * @file Email/account helper utilities
 * @description Random test-account generation, email provider lookup and simple validation
 * @version 1.1.0 (revised)
 */

const email = {
	"email": ["gmail.com", "outlook.com", "yandex.ru", "tutanota.de", "protonmail.com", "yahoo.com"],
	"inbox": ["https://mail.yandex.com/?uid=869376094#compose"],
	// "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+person["email"]+"&su=DenunciaAnimale&body=my-text&ui=2&tf=1&pli=1"
};

// Standard RFC-5322-ish (simplified) email pattern: local@domain.tld
const emailPatterm = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const data = {
	"email": [],
	"password": [],
};

/**
 * Fill an email and password input pair with the most recently saved credentials.
 * @param {string} id_EMAIL - DOM id of the email input
 * @param {string} id_PASSWORD - DOM id of the password input
 */
function fillUOUT(id_EMAIL, id_PASSWORD) {
	const emailField = document.getElementById(id_EMAIL);
	const passwordField = document.getElementById(id_PASSWORD);

	if (!emailField || !passwordField) {
		console.warn('fillUOUT: campo de e-mail ou senha não encontrado no DOM.');
		return;
	}
	if (data.email.length === 0) {
		console.warn('fillUOUT: nenhuma credencial salva ainda — chame saveData() primeiro.');
		return;
	}

	const lastIndex = data.email.length - 1;
	emailField.value = data.email[lastIndex];
	passwordField.value = data.password[lastIndex];
}

/**
 * Save an email/password pair for later use.
 * @param {string} emailValue
 * @param {string} password
 */
function saveData(emailValue, password) {
	data.email.push(emailValue);
	data.password.push(password);
}

/**
 * Find the known provider domain that matches the given domain fragment.
 * @param {string} domain
 * @returns {string|undefined}
 */
function emailProviderIdentifier(domain) {
	return email.email.find(known => known.includes(domain) || domain.includes(known));
}

/**
 * Generate a random email address for the given domain.
 * @param {string} domain
 * @returns {string}
 */
function randomEmailAdressFrom(domain) {
	const randomString = Math.random().toString(36).substring(2);
	return `${randomString}@${domain}`;
}

/**
 * Generate a random password (roughly 40 chars, base36).
 * @returns {string}
 */
function randomPAssowrd() {
	let password = "";
	for (let i = 0; i <= 4; ++i) {
		password += Math.random().toString(36).slice(-8);
	}
	return password;
}

/**
 * Validate an email address format.
 * @param {string} emailValue
 * @returns {boolean}
 */
function isaValidEmail(emailValue) {
	return typeof emailValue === 'string' && emailPatterm.test(emailValue);
}

/**
 * Find the webmail inbox/compose URL matching the given domain fragment.
 * @param {string} domain
 * @returns {string|undefined}
 */
function openMailBox(domain) {
	return email.inbox.find(url => url.includes(domain) || domain.includes(url));
}
