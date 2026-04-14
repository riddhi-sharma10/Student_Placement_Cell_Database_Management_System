// js/student/opportunities.js

export function render(container, app) {
    let jobs = [
        { id: 1, company: "Meta", role: "Software Engineer", ctc: "45.0 LPA", deadline: "Oct 25, 2024", tier: "Dream", type: "Full-Time", cgpa: 9.0, isApplied: false, isBookmarked: false },
        { id: 2, company: "J.P. Morgan", role: "Analyst (SDE)", ctc: "18.5 LPA", deadline: "Oct 22, 2024", tier: "Top Tier", type: "Full-Time", cgpa: 8.0, isApplied: false, isBookmarked: true },
        { id: 3, company: "Amazon", role: "Cloud Associate", ctc: "22.0 LPA", deadline: "Oct 20, 2024", tier: "Dream", type: "Full-Time", cgpa: 8.5, isApplied: true, isBookmarked: false },
        { id: 4, company: "TCS", role: "Ninja/Digital", ctc: "7.0 LPA", deadline: "Oct 30, 2024", tier: "Mass", type: "Full-Time", cgpa: 6.0, isApplied: false, isBookmarked: false },
        { id: 5, company: "Zomato", role: "Frontend Dev", ctc: "28.0 LPA", deadline: "Oct 18, 2024", tier: "Dream", type: "Full-Time", cgpa: 8.0, isApplied: false, isBookmarked: false },
        { id: 6, company: "Oracle", role: "Cloud Support", ctc: "12.0 LPA", deadline: "Oct 28, 2024", tier: "Tier 1", type: "Internship", cgpa: 7.5, isApplied: false, isBookmarked: false }
    ];

    let filters = {
        search: '',
        type: 'All Types',
        minCgpa: 'No Limit',
        tier: 'All Tiers'
    };

    const renderSelf = () => {
        const filteredJobs = jobs.filter(job => {
            const matchesSearch = job.company.toLowerCase().includes(filters.search.toLowerCase()) || 
                                job.role.toLowerCase().includes(filters.search.toLowerCase());
            const matchesType = filters.type === 'All Types' || job.type === filters.type;
            const matchesTier = filters.tier === 'All Tiers' || job.tier === filters.tier;
            
            let matchesCgpa = true;
            if (filters.minCgpa !== 'No Limit') {
                const min = parseFloat(filters.minCgpa);
                matchesCgpa = job.cgpa >= min;
            }

            return matchesSearch && matchesType && matchesTier && matchesCgpa;
        });

        container.innerHTML = `
            <div class="dashboard-header" style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h1 style="font-size: 2rem; color: var(--primary);">Available Opportunities</h1>
                    <p style="color: var(--text-muted);">Discover and apply to top companies visiting campus.</p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-primary" style="background: white; color: var(--primary); border: 1px solid var(--border);">
                        <ion-icon name="filter-outline"></ion-icon> Filter
                    </button>
                    <button class="btn-primary" id="refresh-btn">
                        <ion-icon name="sync-outline"></ion-icon> Refresh
                    </button>
                </div>
            </div>

            <div class="card" style="margin-bottom: 32px; padding: 20px;">
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 16px; align-items: flex-end;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>SEARCH COMPANY / ROLE</label>
                        <div class="input-with-icon">
                            <ion-icon name="search-outline"></ion-icon>
                            <input type="text" id="search-input" placeholder="e.g. Software Engineer" value="${filters.search}">
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>JOB TYPE</label>
                        <select id="type-filter" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                            <option ${filters.type === 'All Types' ? 'selected' : ''}>All Types</option>
                            <option ${filters.type === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
                            <option ${filters.type === 'Internship' ? 'selected' : ''}>Internship</option>
                        </select>
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
                            <option ${filters.tier === 'Dream' ? 'selected' : ''}>Dream</option>
                            <option ${filters.tier === 'Top Tier' ? 'selected' : ''}>Top Tier</option>
                            <option ${filters.tier === 'Tier 1' ? 'selected' : ''}>Tier 1</option>
                            <option ${filters.tier === 'Mass' ? 'selected' : ''}>Mass</option>
                        </select>
                    </div>
                    <button class="btn-accent" id="reset-filters" style="height: 48px;">Reset</button>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
                ${filteredJobs.length > 0 
                    ? filteredJobs.map(job => renderJobCard(job)).join('') 
                    : `<div class="card" style="grid-column: 1/-1; text-align: center; padding: 64px;">
                        <ion-icon name="search-outline" style="font-size: 3rem; color: var(--text-muted);"></ion-icon>
                        <h3 style="margin-top: 16px;">No opportunities match your search</h3>
                        <p style="color: var(--text-muted);">Try adjusting your filters or search keywords.</p>
                       </div>`
                }
            </div>
        `;

        setupHandlers();
    };

    const setupHandlers = () => {
        // Search & Filters
        document.getElementById('search-input').addEventListener('input', (e) => {
            filters.search = e.target.value;
            renderSelf();
        });
        document.getElementById('type-filter').addEventListener('change', (e) => {
            filters.type = e.target.value;
            renderSelf();
        });
        document.getElementById('cgpa-filter').addEventListener('change', (e) => {
            filters.minCgpa = e.target.value;
            renderSelf();
        });
        document.getElementById('tier-filter').addEventListener('change', (e) => {
            filters.tier = e.target.value;
            renderSelf();
        });
        document.getElementById('reset-filters').addEventListener('click', () => {
            filters = { search: '', type: 'All Types', minCgpa: 'No Limit', tier: 'All Tiers' };
            renderSelf();
        });
        document.getElementById('refresh-btn').addEventListener('click', () => {
            renderSelf();
        });

        // Job Card Actions
        container.querySelectorAll('.btn-apply').forEach(btn => {
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

        container.querySelectorAll('.btn-bookmark').forEach(btn => {
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

    renderSelf();
}

function renderJobCard(job) {
    const tierColor = job.tier === 'Dream' ? 'tag-warning' : (job.tier === 'Top Tier' ? 'tag-success' : 'tag-info');
    
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
