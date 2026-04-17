// js/student/dashboard.js — API Version
import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Loading your statistics...</h2></div>`;

    try {
        const apps = await api.get('/applications');
        renderStudentDashboard(container, app, apps);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Sync Error: ${err.message}</div>`;
    }
}

function renderStudentDashboard(container, app, apps) {
    const totalApps = apps.length;
    const selected = apps.filter(a => a.status === 'Selected').length;
    const inProgress = apps.filter(a => ['Applied', 'Shortlisted', 'Interview'].includes(a.status)).length;
    
    // Sort apps by date
    const recentApps = [...apps].sort((a,b) => new RegExp(b.applied_date) - new RegExp(a.applied_date)).slice(0, 5);

    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Welcome back, ${app.state.user.name.split(' ')[0]}! 👋</h1>
            <p style="color: var(--text-muted);">Tracking your applications on the live portal.</p>
        </div>

        <div class="stats-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:24px; margin-bottom: 32px;">
            <div class="card stat-card-alt">
                <label>My Applications</label>
                <div class="value">${totalApps}</div>
                <div class="trend success">
                    <span>Active in DB</span>
                </div>
            </div>

            <div class="card stat-card-alt">
                <label>In Progress</label>
                <div class="value">${inProgress}</div>
                <div class="trend primary">
                    <span>Awaiting feedback</span>
                </div>
            </div>

            <div class="card stat-card-alt">
                <label>Offers Secured</label>
                <div class="value">${selected}</div>
                <div class="trend warning">
                    <span>Congratulations!</span>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 style="margin-bottom: 24px;">Your Recent Activity</h3>
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Applied On</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${recentApps.map(a => `
                            <tr>
                                <td><b>${a.comp_name}</b></td>
                                <td><span class="tag ${a.status === 'selected' || a.status === 'Selected' ? 'tag-success' : 'tag-info'}">${a.status}</span></td>
                                <td style="color:var(--text-muted)">${new Date(a.applied_date).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                        ${recentApps.length === 0 ? '<tr><td colspan="3" style="text-align:center; padding:32px;">No applications found in the database.</td></tr>' : ''}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
