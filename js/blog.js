// Blog Page JavaScript

let currentPage = 1;
const postsPerPage = 6;
let currentCategory = 'all';
let searchTerm = '';

const blogPosts = [
    {
        id: 1,
        title: 'Rust in Linux Kernel: The Second Wave',
        excerpt: 'Exploring the new Rust abstractions landing in Linux 6.8 and what it means for system programming.',
        category: 'programming',
        date: '2026-03-12',
        readTime: 8,
        icon: 'fa-code',
        author: 'Marcus Chen'
    },
    {
        id: 2,
        title: 'PostgreSQL 17: Incremental Materialized Views',
        excerpt: 'Deep dive into the new performance features and how to optimize your database queries.',
        category: 'database',
        date: '2026-03-05',
        readTime: 6,
        icon: 'fa-database',
        author: 'Sarah Johnson'
    },
    {
        id: 3,
        title: 'Kotlin Multiplatform for Production',
        excerpt: 'Share UI logic across iOS and Android seamlessly with real-world examples.',
        category: 'programming',
        date: '2026-03-01',
        readTime: 5,
        icon: 'fa-mobile-alt',
        author: 'Alex Rivera'
    },
    {
        id: 4,
        title: 'Running Local LLMs on Consumer Hardware',
        excerpt: 'Guide to running Mixtral 8x7B and other models on a MacStudio for development.',
        category: 'ai',
        date: '2026-02-22',
        readTime: 10,
        icon: 'fa-brain',
        author: 'Priya Kapoor'
    },
    {
        id: 5,
        title: 'Edge Computing: The Next Frontier',
        excerpt: 'How edge computing is reducing latency and enabling new applications.',
        category: 'cloud',
        date: '2026-02-18',
        readTime: 7,
        icon: 'fa-cloud',
        author: 'Elena Voss'
    },
    {
        id: 6,
        title: 'Zero Trust Security Implementation',
        excerpt: 'Practical guide to implementing zero trust architecture in your organization.',
        category: 'security',
        date: '2026-02-15',
        readTime: 9,
        icon: 'fa-shield-alt',
        author: 'Alex Rivera'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    filterAndDisplayPosts();
});

function setupEventListeners() {
    // Category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            currentPage = 1;
            filterAndDisplayPosts();
        });
    });

    // Search input
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            searchTerm = e.target.value.toLowerCase();
            currentPage = 1;
            filterAndDisplayPosts();
        }, 300));
    }
}

function filterAndDisplayPosts() {
    let filtered = blogPosts;

    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(post => post.category === currentCategory);
    }

    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm)
        );
    }

    displayPosts(filtered);
    setupPagination(filtered.length);
}

function displayPosts(posts) {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = posts.slice(start, end);

    const container = document.getElementById('blog-posts');
    if (container) {
        container.innerHTML = postsToShow.map(post => `
            <div class="card blog-post" data-category="${post.category}">
                <div class="post-image">
                    <i class="fas ${post.icon}"></i>
                </div>
                <div class="post-content">
                    <span class="category-tag">${post.category}</span>
                    <h3 class="post-title">${post.title}</h3>
                    <div class="meta">
                        <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                        <span><i class="far fa-clock"></i> ${post.readTime} min</span>
                    </div>
                    <p class="post-excerpt">${truncateText(post.excerpt, 120)}</p>
                    <a href="#" class="read-more">Read more <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    }
}

function setupPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (paginationContainer && totalPages > 1) {
        let paginationHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }
        
        paginationContainer.innerHTML = paginationHTML;
        
        // Add event listeners to page buttons
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentPage = parseInt(this.dataset.page);
                filterAndDisplayPosts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    } else if (paginationContainer) {
        paginationContainer.innerHTML = '';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}