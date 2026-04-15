// js/admin/notifications.js

export function render(container) {
    container.innerHTML = `
        <div class="admin-dashboard-shell" style="gap:24px;">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Notifications</h1>
                    <p>Admin activity feed for placements, coordinators and system events.</p>
                </div>
            </div>

            <div class="card" style="padding:10px 0;">
                ${renderNotificationItem('New Company Registration', 'Infosys has requested onboarding approval for 2026 hiring cycle.', '15m ago', 'business', '#3b82f6')}
                ${renderNotificationItem('Coordinator Update', 'Placement Coordinator uploaded final shortlist for Deloitte interviews.', '1h ago', 'people', '#10b981')}
                ${renderNotificationItem('Interview Panel Scheduled', 'Panel allocation completed for 4 companies on Apr 16.', '3h ago', 'calendar', '#f59e0b')}
                ${renderNotificationItem('Offer Statistics Refreshed', 'Placement records were synced with latest offer data.', '6h ago', 'stats-chart', '#6366f1')}
                ${renderNotificationItem('System Maintenance Alert', 'Portal backup will run tonight from 01:00 AM to 01:30 AM.', '1d ago', 'settings', '#64748b', true)}
            </div>
        </div>
    `;
}

function renderNotificationItem(title, text, time, icon, color, isLast = false) {
    return `
        <div style="display:flex; gap:16px; padding:20px 24px; border-bottom:${isLast ? 'none' : '1px solid #e2e8f0'}; align-items:flex-start;">
            <div style="width:48px; height:48px; border-radius:12px; background:${color}22; color:${color}; display:flex; align-items:center; justify-content:center; font-size:1.25rem; flex:0 0 auto;">
                <ion-icon name="${icon}"></ion-icon>
            </div>
            <div style="flex:1; min-width:0;">
                <h4 style="margin:0; font-size:1.05rem; color:#0f1f46; font-weight:800;">${title}</h4>
                <p style="margin:4px 0 0; color:#50627f; font-size:0.98rem;">${text}</p>
                <span style="display:block; margin-top:8px; color:#64748b; font-size:0.88rem;">${time}</span>
            </div>
        </div>
    `;
}
