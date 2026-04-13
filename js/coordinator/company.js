// js/coordinator/company.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Company View</h1>
            <p style="color: var(--text-muted);">Detailed statistics and profiles for partner companies.</p>
        </div>
        <div class="card">
            <h3>Search Company</h3>
            <div class="input-with-icon" style="margin-top: 20px;">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search...">
            </div>
        </div>
    `;
}
