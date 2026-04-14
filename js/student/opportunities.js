// js/student/opportunities.js

export function render(container, app) {
    let jobs = [
        { id: 1, company: "Meta", role: "Software Engineer", ctc: "45.0 LPA", deadline: "Oct 25, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 9.0, isApplied: false, isBookmarked: false },
        { id: 2, company: "J.P. Morgan", role: "Analyst (SDE)", ctc: "18.5 LPA", deadline: "Oct 22, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 8.0, isApplied: false, isBookmarked: true },
        { id: 3, company: "Amazon", role: "Cloud Associate", ctc: "22.0 LPA", deadline: "Oct 20, 2024", tier: "Tier 2", type: "Full-Time", cgpa: 8.5, isApplied: true, isBookmarked: false },
        { id: 4, company: "Razorpay", role: "SDE I", ctc: "32.0 LPA", deadline: "Oct 30, 2024", tier: "Startup", type: "Full-Time", cgpa: 7.5, isApplied: false, isBookmarked: false },
        { id: 5, company: "Zomato", role: "Frontend Dev", ctc: "28.0 LPA", deadline: "Oct 18, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 8.0, isApplied: false, isBookmarked: false },
        { id: 6, company: "Oracle", role: "Cloud Support", ctc: "12.0 LPA", deadline: "Oct 28, 2024", tier: "Tier 2", type: "Full-Time", cgpa: 7.5, isApplied: false, isBookmarked: false },
        { id: 7, company: "Google", role: "Graduate Engineer", ctc: "52.0 LPA", deadline: "Nov 05, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 9.5, isApplied: false, isBookmarked: false },
        { id: 8, company: "Microsoft", role: "Software Engineer I", ctc: "42.0 LPA", deadline: "Nov 02, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 9.0, isApplied: false, isBookmarked: false },
        { id: 9, company: "Uber", role: "SDE Specialist", ctc: "38.5 LPA", deadline: "Nov 10, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 8.8, isApplied: false, isBookmarked: false },
        { id: 10, company: "Adobe", role: "Product Developer", ctc: "34.0 LPA", deadline: "Nov 12, 2024", tier: "Tier 2", type: "Full-Time", cgpa: 8.5, isApplied: false, isBookmarked: false },
        { id: 11, company: "Swiggy", role: "Backend Developer", ctc: "26.5 LPA", deadline: "Nov 15, 2024", tier: "Startup", type: "Full-Time", cgpa: 7.8, isApplied: false, isBookmarked: false },
        { id: 12, company: "Netflix", role: "Content Engineer", ctc: "48.0 LPA", deadline: "Nov 20, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 9.2, isApplied: false, isBookmarked: false },
        { id: 13, company: "Goldman Sachs", role: "Strategic Analyst", ctc: "21.0 LPA", deadline: "Nov 08, 2024", tier: "Tier 1", type: "Full-Time", cgpa: 8.0, isApplied: false, isBookmarked: false },
        { id: 14, company: "Morgan Stanley", role: "Technology Assoc.", ctc: "19.5 LPA", deadline: "Nov 04, 2024", tier: "Tier 2", type: "Full-Time", cgpa: 7.5, isApplied: false, isBookmarked: false },
        { id: 15, company: "Coinbase", role: "Crypto Engineer", ctc: "36.0 LPA", deadline: "Nov 18, 2024", tier: "Startup", type: "Full-Time", cgpa: 8.2, isApplied: false, isBookmarked: false }
    ];

    let filters = {
        search: '',
        type: 'Full-Time',
        minCgpa: 'No Limit',
        tier: 'All Tiers'
    };

    let isFilterVisible = true;
    let isRefreshing = false;

    const renderSelf = () => {
        const filteredJobs = getFilteredJobs();

        container.innerHTML = `
            <div class="dashboard-header" style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h1 style="font-size: 2rem; color: var(--primary);">Available Opportunities</h1>
                    <p style="color: var(--text-muted);">Discover and apply to top companies visiting campus.</p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-primary" id="toggle-filter-btn" style="background: ${isFilterVisible ? 'var(--primary)' : 'white'}; color: ${isFilterVisible ? 'white' : 'var(--primary)'}; border: 1px solid var(--primary);">
                        <ion-icon name="filter-outline"></ion-icon> ${isFilterVisible ? 'Hide Filter' : 'Show Filter'}
                    </button>
                    <button class="btn-primary" id="global-reset-btn" style="background: white; color: var(--text-muted); border: 1px solid var(--border);">
                        <ion-icon name="refresh-outline"></ion-icon> Reset
                    </button>
                </div>
            </div>

            <div class="card" id="filter-card" style="margin-bottom: 32px; padding: 20px; transition: all 0.3s ease; display: ${isFilterVisible ? 'block' : 'none'}; opacity: ${isFilterVisible ? '1' : '0'}; transform: ${isFilterVisible ? 'translateY(0)' : 'translateY(-10px)'};">
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 16px; align-items: flex-end;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>SEARCH COMPANY / ROLE</label>
                        <div class="input-with-icon">
                            <ion-icon name="search-outline"></ion-icon>
                            <input type="text" id="search-input" placeholder="e.g. Software Engineer" value="${filters.search}">
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>MIN CGPA</label>
                        <select id="cgpa-filter" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                            <option ${filters.minCgpa === 'No Limit' ? 'selected' : ''}>No Limit</option>
                            <option ${filters.minCgpa === '7.0+' ? 'selected' : ''}>7.0+</option>
                            <option ${filters.minCgpa === '8.0+' ? 'selected' : ''}>8.0+</option>
                            <option ${filters.minCgpa === '9.0+' ? 'selected' : ''}>9.0+</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>TIER</label>
                        <select id="tier-filter" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                            <option ${filters.tier === 'All Tiers' ? 'selected' : ''}>All Tiers</option>
                            <option ${filters.tier === 'Tier 1' ? 'selected' : ''}>Tier 1</option>
                            <option ${filters.tier === 'Tier 2' ? 'selected' : ''}>Tier 2</option>
                            <option ${filters.tier === 'Startup' ? 'selected' : ''}>Startup</option>
                        </select>
                    </div>
                    <button class="btn-primary" id="search-btn" style="height: 48px; min-width: 120px;">Search</button>
                </div>
            </div>

            <div id="job-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
                ${isRefreshing 
                    ? `<div class="card" style="grid-column: 1/-1; text-align: center; padding: 64px;">
                        <div class="loader-spinner" style="margin: 0 auto 20px;"></div>
                        <p style="color: var(--text-muted); font-weight: 600;">Updating opportunity feed...</p>
                       </div>`
                    : (filteredJobs.length > 0
                        ? filteredJobs.map(job => renderJobCard(job)).join('')
                        : `<div class="card" style="grid-column: 1/-1; text-align: center; padding: 64px;">
                            <ion-icon name="search-outline" style="font-size: 3rem; color: var(--text-muted);"></ion-icon>
                            <h3 style="margin-top: 16px;">No opportunities match your search</h3>
                            <p style="color: var(--text-muted);">Try adjusting your filters or search keywords.</p>
                           </div>`)
                }
            </div>
        `;

        setupHandlers();
    };

    const getFilteredJobs = () => {
        return jobs.filter(job => {
            const matchesSearch = job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                job.role.toLowerCase().includes(filters.search.toLowerCase());
            const matchesTier = filters.tier === 'All Tiers' || job.tier === filters.tier;

            let matchesCgpa = true;
            if (filters.minCgpa !== 'No Limit') {
                const min = parseFloat(filters.minCgpa);
                matchesCgpa = job.cgpa >= min;
            }

            return matchesSearch && matchesTier && matchesCgpa;
        });
    };

    const bindJobCardActions = (root) => {
        root.querySelectorAll('.btn-apply').forEach(btn => {
            btn.addEventListener('click', () => {
                const jobId = parseInt(btn.dataset.id);
                const job = jobs.find(j => j.id === jobId);
                if (job && !job.isApplied) {
                    job.isApplied = true;
                    alert(`Application submitted successfully for ${job.role} at ${job.company}!`);
                    renderSelf();
                }
            });
        });

        root.querySelectorAll('.btn-bookmark').forEach(btn => {
            btn.addEventListener('click', () => {
                const jobId = parseInt(btn.dataset.id);
                const job = jobs.find(j => j.id === jobId);
                if (job) {
                    job.isBookmarked = !job.isBookmarked;
                    renderSelf();
                }
            });
        });
    };

    const setupHandlers = () => {
        // Toggle Filter
        document.getElementById('toggle-filter-btn').addEventListener('click', () => {
            isFilterVisible = !isFilterVisible;
            renderSelf();
        });

        // Global Reset
        document.getElementById('global-reset-btn').addEventListener('click', () => {
            filters = { search: '', type: 'Full-Time', minCgpa: 'No Limit', tier: 'All Tiers' };
            renderSelf();
        });

        // Action: Search
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                // Update filters from DOM
                filters.search = document.getElementById('search-input').value;
                filters.minCgpa = document.getElementById('cgpa-filter').value;
                filters.tier = document.getElementById('tier-filter').value;
                
                // Show a brief loading state for feedback
                const grid = document.getElementById('job-grid');
                grid.innerHTML = `
                    <div class="card" style="grid-column: 1/-1; text-align: center; padding: 64px;">
                        <div class="loader-spinner" style="margin: 0 auto 20px;"></div>
                        <p style="color: var(--text-muted);">Finding matches...</p>
                    </div>
                `;
                
                setTimeout(() => {
                    renderSelf(); // This will use the updated 'filters' object
                }, 400);
            });
        }

        // We can still allow 'Enter' to trigger search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') searchBtn.click();
            });
        }

        bindJobCardActions(container);
    };

    renderSelf();
}

function renderJobCard(job) {
    const tierColor = job.tier === 'Tier 1' ? 'tag-warning' : (job.tier === 'Tier 2' ? 'tag-info' : 'tag-success');

    return `
        <div class="card job-card" style="display: flex; flex-direction: column; gap: 16px; border: 1px solid ${job.isApplied ? 'var(--success)' : 'var(--border)'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <div style="width: 48px; height: 48px; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary); border: 1px solid var(--border);">
                        ${job.company.charAt(0)}
                    </div>
                    <div>
                        <h3 style="font-size: 1.1rem;">${job.company}</h3>
                        <p style="font-size: 0.9rem; color: var(--text-muted); font-weight: 500;">${job.role}</p>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                    <span class="tag ${tierColor}">${job.tier}</span>
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">Min. CGPA: ${job.cgpa}</span>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; background: #f8fafc; padding: 12px; border-radius: 8px;">
                <div>
                    <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 2px; font-weight: 800;">Package</label>
                    <span style="font-weight: 800; color: var(--success); font-size: 1rem;">${job.ctc}</span>
                </div>
                <div>
                    <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 2px; font-weight: 800;">Deadline</label>
                    <span style="font-weight: 700;">${job.deadline}</span>
                </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <span class="tag" style="background: rgba(var(--primary-rgb), 0.05); color: var(--primary);">${job.type}</span>
                <span class="tag" style="background: rgba(var(--primary-rgb), 0.05); color: var(--primary);">On-Campus</span>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border); padding-top: 16px; display: flex; gap: 12px;">
                <button class="btn-primary btn-view" data-id="${job.id}" style="flex: 1; background: white; color: var(--primary); border: 1px solid var(--primary);">
                    View Details
                </button>
                <button class="btn-primary btn-apply ${job.isApplied ? 'btn-disabled' : ''}" data-id="${job.id}" style="flex: 1; ${job.isApplied ? 'background: var(--success); cursor: default;' : ''}">
                    ${job.isApplied ? '<ion-icon name="checkmark-done-outline" style="margin-right: 8px;"></ion-icon> Applied' : 'Apply Now'}
                </button>
                <button class="btn-primary btn-bookmark" data-id="${job.id}" style="background: white; color: ${job.isBookmarked ? 'var(--warning)' : 'var(--text-muted)'}; border: 1px solid ${job.isBookmarked ? 'var(--warning)' : 'var(--border)'}; padding: 10px;">
                    <ion-icon name="${job.isBookmarked ? 'bookmark' : 'bookmark-outline'}"></ion-icon>
                </button>
            </div>
        </div>
    `;
}
