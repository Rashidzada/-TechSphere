// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    loadHomeFeatures();
    loadTrendingTopics();
    initHomeAnimations();
});

function loadHomeFeatures() {
    const features = [
        { icon: 'fa-brain', title: 'AI & ML', text: 'Models, tooling, and practical guides for shipping AI.' },
        { icon: 'fa-code', title: 'Programming', text: 'Readable deep dives across languages and systems.' },
        { icon: 'fa-cloud', title: 'Cloud', text: 'Architectures, scaling patterns, and reliability tips.' },
        { icon: 'fa-shield-halved', title: 'Security', text: 'Threats, defenses, and best practices for teams.' },
        { icon: 'fa-microchip', title: 'Hardware', text: 'GPUs, chips, and the machines that power the future.' },
        { icon: 'fa-rocket', title: 'Startups', text: 'Product, engineering culture, and go-to-market lessons.' }
    ];

    const container = document.getElementById('home-features');
    if (!container) return;

    container.innerHTML = features
        .map(
            (f) => `
            <div class="card" data-animate="fade-up">
                <i class="fas ${f.icon}"></i>
                <h3>${f.title}</h3>
                <p>${f.text}</p>
            </div>
        `
        )
        .join('');
}

function loadTrendingTopics() {
    const topics = [
        { icon: 'fa-satellite', label: 'Satellite-to-phone' },
        { icon: 'fa-server', label: 'Postgres performance' },
        { icon: 'fa-terminal', label: 'Rust in production' },
        { icon: 'fa-vr-cardboard', label: 'Spatial computing' },
        { icon: 'fa-lock', label: 'Zero trust' }
    ];

    const container = document.getElementById('trending-topics');
    if (!container) return;

    container.innerHTML = topics
        .map(
            (t) => `
            <a class="topic-pill" href="blog.html" data-animate="fade-up">
                <i class="fas ${t.icon}" aria-hidden="true"></i>
                <span>${t.label}</span>
            </a>
        `
        )
        .join('');
}

function initHomeAnimations() {
    const items = document.querySelectorAll('[data-animate="fade-up"]');
    if (!items.length) return;

    items.forEach((el) => el.classList.add('animate-init'));

    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('animate-in'));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));
}

