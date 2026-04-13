// js/admin/records.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Year-wise Placement Record</h1>
            <p style="color: var(--text-muted);">Historical data of placements across all academic years.</p>
        </div>
        <div class="card">
            <h3>Yearly Archives</h3>
            <p style="color: var(--text-muted); margin-top: 10px;">Select an academic year to view full records.</p>
            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button class="btn-primary" style="background: white; color: var(--primary); border: 1px solid var(--border);">2023-24</button>
                <button class="btn-primary" style="background: white; color: var(--primary); border: 1px solid var(--border);">2022-23</button>
                <button class="btn-primary" style="background: white; color: var(--primary); border: 1px solid var(--border);">2021-22</button>
            </div>
        </div>
    `;
}
