// News Page JavaScript

const newsArticles = [
    {
        id: 1,
        title: 'SpaceX Achieves First Direct-to-Cell SMS via Starlink',
        summary: 'Historic achievement as standard smartphones receive satellite messages without hardware modifications.',
        category: 'space',
        source: 'TechCrunch',
        time: '2 hours ago',
        isBreaking: true,
        icon: 'fa-satellite'
    },
    {
        id: 2,
        title: 'NVIDIA Announces Blackwell B200 GPU',
        summary: 'New architecture delivers 20 petaflops of AI performance, 5x faster than previous generation.',
        category: 'hardware',
        source: 'Reuters',
        time: '1 day ago',
        isBreaking: false,
        icon: 'fa-microchip'
    },
    {
        id: 3,
        title: 'Apple Vision Pro 2 Rumors Surface',
        summary: 'Reports suggest lighter design, lower price point, and international launch by early 2027.',
        category: 'hardware',
        source: 'Bloomberg',
        time: '3 days ago',
        isBreaking: false,
        icon: 'fa-vr-cardboard'
    },
    {
        id: 4,
        title: 'Quantum Encryption Breakthrough',
        summary: 'Researchers achieve record 100km quantum key distribution, paving way for unhackable networks.',
        category: 'security',
        source: 'Nature',
        time: '6 days ago',
        isBreaking: false,
        icon: 'fa-shield-halved'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadBreakingNews();
    loadNewsArticles();
    setupNewsFilters();
});

function loadBreakingNews() {
    const breaking = newsArticles.find(article => article.isBreaking);
    const container = document.getElementById('breakingNews');
    
    if (container && breaking) {
        container.innerHTML = `
            <span class="breaking-tag">BREAKING</span>
            <span class="breaking-text">
                <i class="fas ${breaking.icon}"></i>
                ${breaking.title}
            </span>
            <span class="breaking-time">${breaking.time}</span>
        `;
    }
}

function loadNewsArticles() {
    const container = document.getElementById('news-articles');
    if (container) {
        container.innerHTML = newsArticles.map(article => `
            <div class="card news-card">
                ${article.isBreaking ? '<span class="news-badge">BREAKING</span>' : ''}
                <div class="news-image">
                    <i class="fas ${article.icon}"></i>
                </div>
                <div class="news-content">
                    <div class="news-source">
                        <span>${article.source}</span>
                        <span class="news-time">${article.time}</span>
                    </div>
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-summary">${article.summary}</p>
                    <a href="#" class="read-more">Read full story <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    }
}

function setupNewsFilters() {
    const categorySelect = document.getElementById('newsCategory');
    const timeframeSelect = document.getElementById('newsTimeframe');

    if (categorySelect) {
        categorySelect.addEventListener('change', filterNews);
    }
    if (timeframeSelect) {
        timeframeSelect.addEventListener('change', filterNews);
    }
}

function filterNews() {
    const category = document.getElementById('newsCategory').value;
    const timeframe = document.getElementById('newsTimeframe').value;
    
    // This would typically filter the news based on selected criteria
    console.log('Filtering news by:', { category, timeframe });
    
    // For demo purposes, just show all news
    loadNewsArticles();
}