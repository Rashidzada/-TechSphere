// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadContactInfo();
    setupContactForm();
});

function loadContactInfo() {
    const contactInfo = [
        {
            icon: 'fa-map-pin',
            title: 'Visit Us',
            details: '404 Brain Avenue, Silicon Valley, CA 94025'
        },
        {
            icon: 'fa-phone-alt',
            title: 'Call Us',
            details: '+1 (800) 555-0199'
        },
        {
            icon: 'fa-envelope',
            title: 'Email Us',
            details: 'hello@techsphere.dev'
        },
        {
            icon: 'fa-globe',
            title: 'Social',
            details: '@techsphere on all platforms'
        }
    ];

    const container = document.getElementById('contactInfo');
    if (container) {
        container.innerHTML = contactInfo.map(info => `
            <div class="info-item">
                <i class="fas ${info.icon}"></i>
                <div>
                    <h4>${info.title}</h4>
                    <p>${info.details}</p>
                </div>
            </div>
        `).join('');
    }
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const isValid = field.checkValidity();
    
    if (!isValid) {
        field.style.borderColor = '#dc2626';
        showFieldError(field, getFieldErrorMessage(field));
    } else {
        field.style.borderColor = '#cbd5e1';
        removeFieldError(field);
    }
}

function getFieldErrorMessage(field) {
    if (field.validity.valueMissing) {
        return `${field.placeholder || 'This field'} is required`;
    }
    if (field.validity.typeMismatch) {
        return `Please enter a valid ${field.type}`;
    }
    return 'Invalid input';
}

function showFieldError(field, message) {
    const errorId = `error-${field.id}`;
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.id = errorId;
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc2626';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function removeFieldError(field) {
    const errorId = `error-${field.id}`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.remove();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    const isValid = form.checkValidity();
    
    if (!isValid) {
        // Trigger validation on all fields
        form.querySelectorAll('input, textarea').forEach(field => {
            validateField({ target: field });
        });
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Log for demo
        console.log('Form data:', data);
    }, 1500);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.background = type === 'success' ? '#10b981' : '#3b82f6';
    notification.style.color = 'white';
    notification.style.borderRadius = '12px';
    notification.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    notification.style.zIndex = '1000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '0.8rem';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}