// Global JavaScript - Shared across all pages

// Set active navigation based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .auth-buttons a');
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const nextIsOpen = !document.body.classList.contains('mobile-menu-open');
            setMobileMenuOpen(nextIsOpen);
        });

        // Close menu after navigation
        document.querySelectorAll('.nav-links a, .auth-buttons a').forEach(link => {
            link.addEventListener('click', () => setMobileMenuOpen(false));
        });

        // Close menu when switching to desktop layout
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) setMobileMenuOpen(false);
        });
    }

    // Close mobile menu with Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
    });

    // Add smooth scrolling for anchor links (skip plain "#")
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initialize tooltips if needed
    initTooltips();

    // Apply initial compact state (e.g., when reloading mid-scroll)
    if (header && window.scrollY > 100) header.classList.add('header--compact');
});

// Tooltip initialization
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const targetEl = e.currentTarget || e.target;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = targetEl.dataset.tooltip;
    document.body.appendChild(tooltip);
    
    const rect = targetEl.getBoundingClientRect();
    const top = rect.top - tooltip.offsetHeight - 8;
    const left = rect.left + (rect.width - tooltip.offsetWidth) / 2;

    tooltip.style.top = Math.max(8, top) + 'px';
    tooltip.style.left = Math.max(8, Math.min(left, window.innerWidth - tooltip.offsetWidth - 8)) + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) tooltip.remove();
}

// Utility function for formatting dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Utility function for truncating text
function truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

function setMobileMenuOpen(isOpen) {
    document.body.classList.toggle('mobile-menu-open', isOpen);
    const btn = document.querySelector('.mobile-menu-btn');
    if (btn) {
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-xmark', isOpen);
        }
    }
}

// Add scroll event for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.toggle('header--compact', window.scrollY > 100);
});
