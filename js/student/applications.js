
import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `
        <div style="padding: 24px;">
            <h2>Loading your application history...</h2>
        </div>
    `;

    try {
        const applications = await api.get('/applications');
        renderApplications(container, applications);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Database Sync Error: ${err.message}</div>`;
    }
}

function renderApplications(container, data) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Application History</h1>
            <p style="color: var(--text-muted);">Track your progress across all recruitment cycles.</p>
        </div>

        <div class="card" style="padding: 0; overflow: hidden; border: 1px solid var(--border);">
            <div class="data-table-container">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8fafc; border-bottom: 2px solid var(--border);">
                            <th style="padding: 16px; text-align: left; font-weight: 700; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Company & Role</th>
                            <th style="padding: 16px; text-align: left; font-weight: 700; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Applied on</th>
                            <th style="padding: 16px; text-align: left; font-weight: 700; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Status</th>
                            <th style="padding: 16px; text-align: center; font-weight: 700; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">ATS Score</th>
                            <th style="padding: 16px; text-align: right; font-weight: 700; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.length > 0 ? data.map(app => `
                            <tr style="border-bottom: 1px solid var(--border); transition: background 0.2s;" class="hover-row">
                                <td style="padding: 16px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 40px; height: 40px; border-radius: 8px; background: #eff6ff; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;">
                                            ${app.comp_name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style="font-weight: 700; color: var(--text-main);">${app.comp_name}</div>
                                            <div style="font-size: 0.8rem; color: var(--text-muted);">${app.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 16px; color: #64748b; font-weight: 500;">
                                    ${new Date(app.applied_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td style="padding: 16px;">
                                    <span class="tag ${getStatusClass(app.status)}" style="font-weight: 800; font-size: 0.7rem; text-transform: uppercase;">
                                        ${app.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td style="padding: 16px; text-align: center;">
                                    <div style="font-weight: 800; color: ${app.ats_score > 80 ? 'var(--success)' : '#64748b'};">${app.ats_score || '--'}</div>
                                </td>
                                <td style="padding: 16px; text-align: right;">
                                    <button class="btn-primary" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 6px;">
                                        Timeline
                                    </button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="5" style="padding: 48px; text-align: center; color: var(--text-muted);">
                                    <ion-icon name="folder-open-outline" style="font-size: 2rem; margin-bottom: 12px;"></ion-icon>
                                    <p>No applications found in the database.</p>
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getStatusClass(status) {
    const map = {
        'selected': 'tag-success',
        'shortlisted': 'tag-info',
        'rejected': 'tag-danger',
        'applied': 'tag-warning',
        'under_review': 'tag-info'
    };
    return map[status] || 'tag-muted';
}
