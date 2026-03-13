// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadTeamMembers();
    initializeCounters();
});

function loadTeamMembers() {
    const team = [
        {
            icon: 'fas fa-user-tie',
            name: 'Elena Voss',
            role: 'Editor-in-Chief',
            bio: 'Former senior editor at Wired, covering tech for 15 years.'
        },
        {
            icon: 'fas fa-user-ninja',
            name: 'Marcus Chen',
            role: 'Senior Writer',
            bio: 'Software engineer turned writer, specializes in AI and backend systems.'
        },
        {
            icon: 'fas fa-user-astronaut',
            name: 'Priya Kapoor',
            role: 'AI Researcher',
            bio: 'PhD in Machine Learning, focuses on practical AI applications.'
        },
        {
            icon: 'fas fa-user-secret',
            name: 'Alex Rivera',
            role: 'Security Analyst',
            bio: 'Ethical hacker and cybersecurity expert with 10+ years experience.'
        }
    ];

    const container = document.getElementById('team-members');
    if (container) {
        container.innerHTML = team.map(member => `
            <div class="member">
                <i class="${member.icon}"></i>
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p class="member-bio">${member.bio}</p>
            </div>
        `).join('');
    }
}

function initializeCounters() {
    const stats = document.querySelectorAll('.stat-card h3');
    stats.forEach(stat => {
        const raw = (stat.textContent || '').trim();
        const parsed = parseCounter(raw);
        if (!parsed) return;
        animateCounter(stat, parsed.target, parsed.format);
    });
}

function parseCounter(raw) {
    if (!raw) return null;
    if (raw.includes('/')) return null; // e.g., "24/7" shouldn't animate

    const hasPlus = raw.includes('+');
    const hasK = /k/i.test(raw);
    const num = Number.parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(num)) return null;

    const target = hasK ? num * 1000 : num;
    const format = (value) => {
        if (hasK) return `${Math.round(value / 1000)}K${hasPlus ? '+' : ''}`;
        return `${Math.round(value)}${hasPlus ? '+' : ''}`;
    };

    return { target, format };
}

function animateCounter(element, target, format) {
    const durationMs = 900;
    const start = performance.now();

    function step(now) {
        const progress = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        element.textContent = format(current);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}
