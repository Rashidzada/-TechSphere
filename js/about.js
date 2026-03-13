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
        const target = parseInt(stat.textContent);
        animateCounter(stat, target);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}