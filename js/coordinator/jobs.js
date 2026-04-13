// js/coordinator/jobs.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Job Profiles</h1>
            <p style="color: var(--text-muted);">Manage and track upcoming company job profiles.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
            ${renderJobManageCard("Google", "Software Engineer", 45.0, 120, "Open")}
            ${renderJobManageCard("Amazon", "SDE Intern", 22.0, 450, "Open")}
            ${renderJobManageCard("TCS", "Digital Role", 7.0, 1200, "Closed")}
            ${renderJobManageCard("Meta", "Product Manager", 52.0, 85, "Draft")}
        </div>
    `;
}

function renderJobManageCard(company, role, packageLpa, apps, status) {
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                <h3 style="font-size: 1.1rem;">${company}</h3>
                <span class="tag ${status === 'Open' ? 'tag-success' : 'tag-info'}">${status}</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">${role}</p>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 20px;">
                <span>Package: <b>${packageLpa} LPA</b></span>
                <span>Applicants: <b>${apps}</b></span>
            </div>
            <button class="btn-primary" style="width: 100%;">View Applicants</button>
        </div>
    `;
}
