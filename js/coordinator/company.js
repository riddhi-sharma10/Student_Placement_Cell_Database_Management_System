// js/coordinator/company.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Company Management</h1>
            <p style="color: var(--text-muted);">Monitor partner status, selections, and recruitment activity.</p>
        </div>

        <div class="card" style="margin-bottom: 32px; padding: 20px;">
            <div style="display: flex; gap: 16px; align-items: flex-end;">
                <div class="form-group" style="flex: 1; margin-bottom: 0;">
                    <label>SEARCH PARTNER</label>
                    <div class="input-with-icon">
                        <ion-icon name="search-outline"></ion-icon>
                        <input type="text" placeholder="Type company name...">
                    </div>
                </div>
                <button class="btn-primary">Search</button>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 24px;">
            ${renderCompanyCard("Google India", "Active", 156, "₹18.5 LPA")}
            ${renderCompanyCard("Amazon", "Active", 89, "₹14.2 LPA")}
            ${renderCompanyCard("TCS", "Active", 1450, "₹7.0 LPA")}
            ${renderCompanyCard("Microsoft", "Inactive", 45, "₹22.0 LPA")}
            ${renderCompanyCard("Zomato", "Active", 12, "₹28.0 LPA")}
        </div>
    `;
}

function renderCompanyCard(name, status, selected, avg) {
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="font-size: 1.25rem;">${name}</h3>
                <span class="tag ${status === 'Active' ? 'tag-success' : 'tag-danger'}">${status}</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div style="padding: 16px; background: #f8fafc; border-radius: 12px; text-align: center;">
                    <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Total Selected</label>
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-top: 4px;">${selected}</div>
                </div>
                <div style="padding: 16px; background: #f8fafc; border-radius: 12px; text-align: center;">
                    <label style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Avg Package</label>
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--success); margin-top: 4px;">${avg}</div>
                </div>
            </div>

            <button class="btn-primary" style="width: 100%; margin-top: 20px; background: white; color: var(--primary); border: 1px solid var(--border);">
                View Recruitment Statistics
            </button>
        </div>
    `;
}
