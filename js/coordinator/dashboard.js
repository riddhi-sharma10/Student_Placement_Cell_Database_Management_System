import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = loadingHTML('Dashboard');

    try {
        // Fetch both dashboard stats AND real profile in parallel
        // Profile gives us the TRUE name from PLACEMENT_COORDINATOR (not the stale localStorage name)
        const [stats, profile] = await Promise.all([
            api.get('/coordinator/dashboard'),
            api.get('/coordinator/profile')
        ]);

        console.log('[dashboard] stats:', stats);
        console.log('[dashboard] profile:', profile);

        // Sync real name into app state so navbar also stays consistent
        if (profile.name) {
            app.state.user.name = profile.name;
            // Re-render navbar with the correct name
            if (app.Navbar) app.Navbar.render(app.state.user);
        }

        renderShell(container, profile.name, profile.department, stats);
    } catch (err) {
        console.error('[dashboard] fetch error:', err);
        container.innerHTML = errorHTML(err.message);
    }
}

function renderShell(container, coordName, dept, stats) {
    const firstName = (coordName || 'Coordinator').split(' ')[0];

    container.innerHTML = `
        <div class="admin-dashboard-shell">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Welcome, ${firstName}! 👋</h1>
                    <p>${dept} Placement Coordinator &mdash; Live data from the placement database.</p>
                </div>
                <div>
                    <span class="tag tag-success" style="padding:6px 16px;font-size:0.85rem;">&#x2714; DB Connected</span>
                </div>
            </div>

            <div class="admin-stat-grid">
                ${statCard('people-circle-outline',   'My Students',        stats.totalStudents,       'Assigned to you',             false)}
                ${statCard('checkmark-done-circle-outline','Placed',        stats.totalPlaced,          stats.placementRate + '% rate',true)}
                ${statCard('document-text-outline',   'Applications',       stats.totalApplications,   'Total submitted',             false)}
                ${statCard('calendar-outline',        'Upcoming Interviews',stats.upcomingInterviews,   'Scheduled ahead',             false)}
            </div>

            <!-- Placement Progress Bar -->
            <div class="card" style="margin-top:24px;padding:24px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                    <div>
                        <h3 style="margin:0;">Placement Progress</h3>
                        <p style="color:var(--text-muted);font-size:0.85rem;margin-top:4px;">
                            ${stats.totalPlaced} of ${stats.totalStudents} students placed
                        </p>
                    </div>
                    <span class="tag tag-success" style="font-size:1rem;padding:8px 20px;">
                        ${stats.placementRate}%
                    </span>
                </div>
                <div style="background:#f1f5f9;border-radius:12px;overflow:hidden;height:18px;">
                    <div style="width:${Math.min(Number(stats.placementRate),100)}%;background:linear-gradient(90deg,#0f2f61,#3b6cc7);height:100%;border-radius:12px;transition:width 1.2s ease;"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:0.78rem;color:var(--text-muted);font-weight:600;">
                    <span>0%</span><span>50%</span><span>100%</span>
                </div>
            </div>

            <!-- Quick Summary Row -->
            <div class="admin-grid-two" style="margin-top:24px;">
                <div class="card" style="padding:24px;">
                    <div class="admin-card-head">
                        <h3>Coordinator Info</h3>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                            <span style="color:var(--text-muted);font-size:0.85rem;font-weight:600;">Full Name</span>
                            <span style="font-weight:700;">${coordName}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                            <span style="color:var(--text-muted);font-size:0.85rem;font-weight:600;">Department</span>
                            <span style="font-weight:700;">${dept}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:10px 0;">
                            <span style="color:var(--text-muted);font-size:0.85rem;font-weight:600;">Students Managed</span>
                            <span class="tag tag-info">${stats.totalStudents}</span>
                        </div>
                    </div>
                </div>
                <div class="card" style="padding:24px;">
                    <div class="admin-card-head">
                        <h3>Quick Stats</h3>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                            <span style="color:var(--text-muted);font-size:0.85rem;font-weight:600;">Total Applications</span>
                            <span class="tag tag-warning">${stats.totalApplications}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                            <span style="color:var(--text-muted);font-size:0.85rem;font-weight:600;">Placed Students</span>
                            <span class="tag tag-success">${stats.totalPlaced}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:10px 0;">
                            <span style="color:var(--text-muted);font-size:0.85rem;font-weight:600;">Upcoming Interviews</span>
                            <span class="tag tag-info">${stats.upcomingInterviews}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function statCard(icon, label, value, sub, highlight) {
    return `
        <div class="card admin-stat-card ${highlight ? 'admin-stat-card-highlight' : ''}">
            <div class="admin-stat-top">
                <div class="admin-stat-icon">
                    <ion-icon name="${icon}"></ion-icon>
                </div>
            </div>
            <div class="admin-stat-meta">
                <p>${label}</p>
                <h2>${value ?? 0}</h2>
            </div>
            <p style="color:var(--text-muted);font-size:0.8rem;margin-top:6px;">${sub}</p>
        </div>
    `;
}

function loadingHTML(p) {
    return `<div style="display:flex;align-items:center;justify-content:center;height:400px;flex-direction:column;gap:12px;color:var(--text-muted);">
        <ion-icon name="sync-outline" style="font-size:2.5rem;animation:spin 1s linear infinite;"></ion-icon>
        <p>Loading ${p}...</p></div>`;
}
function errorHTML(msg) {
    return `<div style="padding:40px;text-align:center;">
        <ion-icon name="alert-circle-outline" style="font-size:3rem;color:#ef4444;"></ion-icon>
        <h2 style="margin-top:16px;">Failed to load</h2>
        <p style="color:var(--text-muted);margin-top:8px;">${msg}</p>
        <button onclick="window.location.reload()" class="btn-primary" style="margin-top:24px;">Retry</button>
    </div>`;
}
