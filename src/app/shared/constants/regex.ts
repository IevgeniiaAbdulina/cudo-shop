// Allows latin alphabet and numbers.
// Requires at least one Uppercase letter, one Lowercase letter and one number  :
export const PASSWORD_REGEX =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w!?.\-=#$%\^&*@]{8,}$/;

// Email regex
export const EMAIL_REGEX =
	/^[a-z0-9!?_\-=$&]+(\.[a-z0-9!?_\-=$&]+)*@[a-z0-9]+([-a-z0-9]*)(\.[a-z]{2,})+$/i;
// name regex
export const NAME_REGEX =
	/^[A-Za-z]+[A-Z a-z]*$/;
