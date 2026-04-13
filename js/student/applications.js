// js/student/applications.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">My Applications</h1>
            <p style="color: var(--text-muted);">Track the status of all your submitted applications.</p>
        </div>

        <div class="card" style="margin-bottom: 24px; padding: 12px;">
            <div style="display: flex; gap: 8px;">
                <button class="role-option active" style="padding: 8px 16px; width: auto;">All Applications</button>
                <button class="role-option" style="padding: 8px 16px; width: auto;">Applied</button>
                <button class="role-option" style="padding: 8px 16px; width: auto;">Shortlisted</button>
                <button class="role-option" style="padding: 8px 16px; width: auto;">Selected</button>
                <button class="role-option" style="padding: 8px 16px; width: auto;">Rejected</button>
            </div>
        </div>

        <div class="card">
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Applied Date</th>
                            <th>ATS Score</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderAppRow("Global Tech Solutions", "Software Engineer II", "Oct 12, 2024", 88, "Selected")}
                        ${renderAppRow("Nexus Analytics", "Data Scientist", "Oct 08, 2024", 92, "Interviewing")}
                        ${renderAppRow("FinBridge Systems", "Backend Developer", "Oct 05, 2024", 75, "Closed")}
                        ${renderAppRow("CloudScale AI", "DevOps Intern", "Sep 28, 2024", 65, "Rejected")}
                        ${renderAppRow("Amazon", "SDE Intern", "Sep 20, 2024", 94, "Shortlisted")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderAppRow(company, role, date, score, status) {
    const statusClasses = {
        'Selected': 'tag-success',
        'Interviewing': 'tag-warning',
        'Shortlisted': 'tag-info',
        'Rejected': 'tag-danger',
        'Closed': 'tag-danger'
    };

    return `
        <tr>
            <td style="font-weight: 600;">${company}</td>
            <td>${role}</td>
            <td>${date}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 700; color: ${score > 80 ? 'var(--success)' : 'var(--warning)'};">${score}%</span>
                    <div style="width: 60px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                        <div style="width: ${score}%; height: 100%; background: ${score > 80 ? 'var(--success)' : 'var(--warning)'};"></div>
                    </div>
                </div>
            </td>
            <td><span class="tag ${statusClasses[status] || 'tag-info'}">${status}</span></td>
            <td>
                <button style="background: transparent; border: none; font-size: 1.25rem; color: var(--text-muted); cursor: pointer;">
                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                </button>
            </td>
        </tr>
    `;
}
