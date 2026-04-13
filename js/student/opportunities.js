// js/student/opportunities.js

export function render(container, app) {
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
                <button class="btn-primary">
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
                        <input type="text" placeholder="e.g. Software Engineer">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label>JOB TYPE</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        <option>Full-Time</option>
                        <option>Internship</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label>MIN CGPA</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        <option>No Limit</option>
                        <option>7.0+</option>
                        <option>8.0+</option>
                        <option>9.0+</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label>TIER</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        <option>All Tiers</option>
                        <option>Dream (10LPA+)</option>
                        <option>Mass Recruiter</option>
                    </select>
                </div>
                <button class="btn-accent" style="height: 48px;">Reset</button>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
            ${renderJobCard("Meta", "Software Engineer", "45.0 LPA", "Oct 25, 2024", "Dream", "Full-Time")}
            ${renderJobCard("J.P. Morgan", "Analyst (SDE)", "18.5 LPA", "Oct 22, 2024", "Top Tier", "Full-Time")}
            ${renderJobCard("Amazon", "Cloud Associate", "22.0 LPA", "Oct 20, 2024", "Dream", "Full-Time")}
            ${renderJobCard("TCS", "Ninja/Digital", "7.0 LPA", "Oct 30, 2024", "Mass", "Full-Time")}
            ${renderJobCard("Zomato", "Frontend Dev", "28.0 LPA", "Oct 18, 2024", "Dream", "Full-Time")}
            ${renderJobCard("Oracle", "Cloud Support", "12.0 LPA", "Oct 28, 2024", "Tier 1", "Internship")}
        </div>
    `;
}

function renderJobCard(company, role, ctc, deadline, tier, type) {
    return `
        <div class="card job-card" style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <div style="width: 48px; height: 48px; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary); border: 1px solid var(--border);">
                        ${company.charAt(0)}
                    </div>
                    <div>
                        <h3 style="font-size: 1.1rem;">${company}</h3>
                        <p style="font-size: 0.9rem; color: var(--text-muted);">${role}</p>
                    </div>
                </div>
                <span class="tag ${tier === 'Dream' ? 'tag-warning' : 'tag-info'}">${tier}</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px;">
                <div>
                    <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 2px;">Package</label>
                    <span style="font-weight: 700; color: var(--success);">${ctc}</span>
                </div>
                <div>
                    <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 2px;">Deadline</label>
                    <span style="font-weight: 600;">${deadline}</span>
                </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <span class="tag" style="background: #f1f5f9; color: var(--text-muted);">${type}</span>
                <span class="tag" style="background: #f1f5f9; color: var(--text-muted);">On-Campus</span>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border); padding-top: 16px; display: flex; gap: 12px;">
                <button class="btn-primary" style="flex: 1;">Apply Now</button>
                <button class="btn-primary" style="background: white; color: var(--text-muted); border: 1px solid var(--border); padding: 10px;">
                    <ion-icon name="bookmark-outline"></ion-icon>
                </button>
            </div>
        </div>
    `;
}
