document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const emailHint = document.getElementById('emailHint');
    const passwordHint = document.getElementById('passwordHint');

    function validateEmail() {
        const isValidEmail = emailInput.checkValidity();
        emailHint.style.display = isValidEmail ? 'none' : 'block';
        return isValidEmail;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value;
        const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(passwordValue);
        passwordHint.style.display = isValidPassword ? 'none' : 'block';
        return isValidPassword;
    }

    function updateButtonState() {
        const isFormValid = validateEmail() && validatePassword();
        loginButton.disabled = !isFormValid;
        loginButton.style.opacity = isFormValid ? '1' : '0.37';
    }

    emailInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        if (validateEmail() && validatePassword()) {
            window.location.href = 'homepageindex.html'; // Redirect to home page if valid
        }
    });
});
