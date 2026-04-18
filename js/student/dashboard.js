
import { api } from '../api.js';

export async function render(container, app) {
    const studentName = app.state.user.name;
    const studentId = app.state.user.entityId;

    container.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; height:60vh;">
            <div style="text-align:center;">
                <ion-icon name="sync-outline" style="font-size:3rem; color:var(--primary); animation:spin 1s linear infinite;"></ion-icon>
                <p style="color:var(--text-muted); margin-top:16px;">Syncing with Placement Cell Database...</p>
            </div>
        </div>
    `;

    try {
        // Fetch all student-related data in parallel
        const [applications, jobs] = await Promise.all([
            api.get('/applications'),
            api.get('/jobs')
        ]);

        renderDashboard(container, app, applications, jobs);
    } catch (err) {
        container.innerHTML = `
            <div class="card" style="padding: 40px; text-align: center; margin: 24px;">
                <ion-icon name="alert-circle-outline" style="font-size: 3rem; color: #ef4444;"></ion-icon>
                <h2 style="margin-top: 16px;">Database Connection Failed</h2>
                <p style="color:var(--text-muted); margin-top: 8px;">${err.message}</p>
                <button onclick="window.location.reload()" class="btn-primary" style="margin-top: 24px;">Retry Sync</button>
            </div>
        `;
    }
}

function renderDashboard(container, app, applications, jobs) {
    const stats = {
        total: applications.length,
        shortlisted: applications.filter(a => a.status === 'shortlisted').length,
        selected: applications.filter(a => a.status === 'selected').length,
        rejected: applications.filter(a => a.status === 'rejected').length
    };

    const firstName = app.state.user.name.split(' ')[0];

    container.innerHTML = `
        <div class="dashboard-shell">
            <!-- Welcome Header -->
            <div style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h1 style="font-size: 2.2rem; color: var(--primary); font-weight: 800; letter-spacing: -0.5px;">Hey, ${firstName}! 👋</h1>
                    <p style="color: var(--text-muted); font-size: 1.1rem; margin-top: 4px;">Welcome to your personalized recruitment command center.</p>
                </div>
                <div style="text-align: right;">
                    <span class="tag tag-success" style="font-size: 0.85rem; padding: 6px 16px;">DB Connection: Active</span>
                </div>
            </div>

            <!-- Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px;">
                ${renderStatCard('Briefcase', 'Applied', stats.total, 'primary')}
                ${renderStatCard('List', 'Shortlisted', stats.shortlisted, 'info')}
                ${renderStatCard('Checkmark-Circle', 'Selected', stats.selected, 'success')}
                ${renderStatCard('Close-Circle', 'Rejected', stats.rejected, 'danger')}
            </div>

            <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px;">
                <!-- Main Activity Column -->
                <div style="display: flex; flex-direction: column; gap: 32px;">
                    
                    <!-- Recent Applications -->
                    <div class="card" style="padding: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                            <h3 style="font-weight: 800; color: var(--text-main);">Recent Applications</h3>
                            <button onclick="window.navTo('applications')" style="color: var(--primary); font-weight: 700; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                                View All <ion-icon name="arrow-forward-outline"></ion-icon>
                            </button>
                        </div>
                        <div class="activity-feed">
                            ${applications.length > 0 
                                ? applications.slice(0, 5).map(app => `
                                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 12px; transition: transform 0.2s;" class="hover-card">
                                        <div style="display: flex; align-items: center; gap: 16px;">
                                            <div style="width: 48px; height: 48px; border-radius: 10px; background: #f0f7ff; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem;">
                                                ${app.comp_name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 style="margin: 0; font-weight: 700; color: var(--text-main);">${app.comp_name}</h4>
                                                <p style="margin: 2px 0 0; font-size: 0.85rem; color: var(--text-muted);">${app.role}</p>
                                            </div>
                                        </div>
                                        <div style="text-align: right;">
                                            <span class="tag ${getStatusClass(app.status)}" style="text-transform: uppercase; font-size: 0.7rem; font-weight: 800;">${app.status.replace('_', ' ')}</span>
                                            <p style="margin: 6px 0 0; font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">Applied on ${new Date(app.applied_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                `).join('')
                                : `<div style="text-align:center; padding: 40px; color: var(--text-muted);">No applications found yet. Start applying!</div>`
                            }
                        </div>
                    </div>

                    <!-- Recommended Opportunities -->
                    <div class="card" style="padding: 24px;">
                         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                            <h3 style="font-weight: 800; color: var(--text-main);">Hot Opportunities</h3>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            ${jobs.slice(0, 4).map(job => `
                                <div style="padding: 16px; border-radius: 14px; background: #f8fafc; border: 1px solid var(--border); position: relative;">
                                    <h4 style="margin: 0; font-weight: 700;">${job.role}</h4>
                                    <p style="margin: 4px 0 8px; font-size: 0.9rem; font-weight: 600; color: var(--primary);">${job.comp_name}</p>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                                        <span style="font-weight: 800; color: var(--success);">₹${job.package} LPA</span>
                                        <button onclick="window.navTo('opportunities')" style="background: white; border: 1px solid var(--border); padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer;">Details</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                </div>

                <!-- Secondary Column (Quick Info) -->
                <div style="display: flex; flex-direction: column; gap: 32px;">
                    
                    <!-- Placement Success Path (Visual Progress) -->
                    <div class="card" style="padding: 24px; background: var(--primary); color: white;">
                        <h3 style="margin-bottom: 20px;">Recruitment Path</h3>
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            ${renderStep('Applied', stats.total > 0, '1')}
                            ${renderStep('Assessment', stats.shortlisted > 0, '2')}
                            ${renderStep('Interview', stats.shortlisted > 0, '3')}
                            ${renderStep('Offer', stats.selected > 0, '4')}
                        </div>
                    </div>

                    <!-- DB Info Card -->
                    <div class="card" style="padding: 24px; background: #fffcf0; border: 1px solid #f2cf9e;">
                        <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 12px;">
                            <ion-icon name="shield-checkmark" style="color:#d97706; font-size: 1.5rem;"></ion-icon>
                            <h4 style="margin:0; color:#92400e;">Profile Sync Verified</h4>
                        </div>
                        <p style="font-size: 0.85rem; color: #b45309; line-height: 1.5;">Your student record <b>#STUDENT-${app.state.user.entityId}</b> is officially linked to the Placement Cell Master DB.</p>
                    </div>

                </div>
            </div>
        </div>
    `;
}

function renderStatCard(icon, label, value, type) {
    const classes = {
        primary: 'border-left: 4px solid var(--primary); background: #f0f7ff;',
        success: 'border-left: 4px solid var(--success); background: #f0fdf4;',
        danger:  'border-left: 4px solid var(--danger); background: #fef2f2;',
        info:    'border-left: 4px solid var(--info); background: #f0f9ff;'
    };
    
    return `
        <div class="card" style="padding: 20px; ${classes[type] || ''} display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">${label}</span>
                <ion-icon name="${icon}-outline" style="font-size: 1.25rem; color: var(--text-muted);"></ion-icon>
            </div>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--text-main);">${value}</div>
        </div>
    `;
}

function renderStep(label, done, num) {
    return `
        <div style="display: flex; align-items: center; gap: 16px; opacity: ${done ? '1' : '0.4'}">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${done ? 'white' : 'transparent'}; border: 2px solid white; color: ${done ? 'var(--primary)' : 'white'}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">
                ${done ? '✓' : num}
            </div>
            <span style="font-weight: 700; font-size: 0.95rem;">${label}</span>
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
