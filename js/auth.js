// Authentication JavaScript (Login & Signup)

document.addEventListener('DOMContentLoaded', function() {
    setupPasswordToggle();
    setupAuthForms();
    
    // Check if we're on signup page for password matching
    if (window.location.pathname.includes('signup.html')) {
        setupPasswordMatchValidation();
    }
});

function setupPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
}

function setupAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Setup social login buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', handleSocialAuth);
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    
    // Show loading state
    const submitBtn = form.querySelector('.auth-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Login attempt:', { email, password });
        
        // Show success message
        showAuthMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to home page after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate passwords match
    if (data.password !== data['confirm-password']) {
        showAuthMessage('Passwords do not match!', 'error');
        return;
    }
    
    // Validate password strength
    if (!isPasswordStrong(data.password)) {
        showAuthMessage('Password must be at least 8 characters with numbers and special characters', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.auth-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Signup data:', data);
        
        // Show success message
        showAuthMessage('Account created successfully! Redirecting to login...', 'success');
        
        // Redirect to login after delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 1500);
}

function handleSocialAuth(e) {
    const provider = e.currentTarget.classList.contains('google') ? 'Google' : 'GitHub';
    e.preventDefault();
    
    console.log(`Social login with ${provider}`);
    showAuthMessage(`Connecting to ${provider}...`, 'info');
    
    // Simulate OAuth redirect
    setTimeout(() => {
        showAuthMessage(`${provider} authentication successful!`, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

function setupPasswordMatchValidation() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (password && confirmPassword) {
        [password, confirmPassword].forEach(field => {
            field.addEventListener('input', validatePasswordMatch);
        });
    }
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmField = document.getElementById('confirm-password');
    
    if (password && confirmPassword) {
        if (password !== confirmPassword) {
            confirmField.style.borderColor = '#dc2626';
            showPasswordMatchError('Passwords do not match');
        } else {
            confirmField.style.borderColor = '#10b981';
            removePasswordMatchError();
        }
    } else {
        confirmField.style.borderColor = '#cbd5e1';
        removePasswordMatchError();
    }
}

function showPasswordMatchError(message) {
    const errorId = 'password-match-error';
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.id = errorId;
        errorElement.style.color = '#dc2626';
        errorElement.style.display = 'block';
        errorElement.style.marginTop = '0.25rem';
        document.getElementById('confirm-password').parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function removePasswordMatchError() {
    const errorElement = document.getElementById('password-match-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function isPasswordStrong(password) {
    // At least 8 characters, at least one number, one special character
    const strongRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return strongRegex.test(password);
}

function showAuthMessage(message, type = 'info') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.padding = '1rem';
    messageDiv.style.margin = '1rem 0';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.backgroundColor = type === 'error' ? '#fee2e2' : type === 'success' ? '#d1fae5' : '#dbeafe';
    messageDiv.style.color = type === 'error' ? '#dc2626' : type === 'success' ? '#10b981' : '#3b82f6';
    messageDiv.style.textAlign = 'center';
    
    const authCard = document.querySelector('.auth-card');
    const authHeader = document.querySelector('.auth-header');
    
    if (authHeader) {
        authHeader.insertAdjacentElement('afterend', messageDiv);
    } else if (authCard) {
        authCard.insertBefore(messageDiv, authCard.firstChild);
    }
}