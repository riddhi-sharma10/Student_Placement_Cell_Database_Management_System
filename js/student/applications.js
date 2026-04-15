// js/student/applications.js — API Version
import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Fetching your application history...</h2></div>`;

    try {
        const apps = await api.get('/applications');
        renderTable(container, apps);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Error: ${err.message}</div>`;
    }
}

function renderTable(container, apps) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">My Applications</h1>
            <p style="color: var(--text-muted);">Tracking ${apps.length} applications in the live online database.</p>
        </div>

        <div class="card">
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>App ID</th>
                            <th>Status</th>
                            <th>Applied Date</th>
                            <th>Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${apps.map(a => `
                            <tr>
                                <td><b>APP-${a.id}</b></td>
                                <td><span class="tag ${a.status === 'Selected' ? 'tag-success' : 'tag-info'}">${a.status}</span></td>
                                <td>${new Date(a.applied_date).toLocaleDateString()}</td>
                                <td style="color:var(--text-muted); font-size: 0.8rem;">JOB-REF-${a.job_id}</td>
                            </tr>
                        `).join('')}
                        ${apps.length === 0 ? '<tr><td colspan="4" style="text-align:center; padding:32px;">No applications found. Try applying for a job first!</td></tr>' : ''}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
