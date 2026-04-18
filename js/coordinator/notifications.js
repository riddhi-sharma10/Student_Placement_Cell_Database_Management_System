// js/coordinator/notifications.js

export function render(container) {
    container.innerHTML = `
        <div class="admin-dashboard-shell" style="gap:24px;">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Notifications</h1>
                    <p>Updates on your assigned students, applications, and placements.</p>
                </div>
            </div>

            <div class="card" style="padding:10px 0;">
                ${renderNotificationItem('Student Accepted Offer', 'Aman Sharma just accepted the Systems Engineer offer from Infosys.', '15m ago', 'checkmark-circle', '#10b981')}
                ${renderNotificationItem('Application Submitted', 'Megha Gupta submitted an application for the SDE role at Amazon.', '1h ago', 'paper-plane', '#3b82f6')}
                ${renderNotificationItem('Interview Result Published', 'Check the results for the recent Deloitte technical round.', '3h ago', 'document-text', '#f59e0b')}
                ${renderNotificationItem('Missing Resume', 'Aryan has not uploaded a resume yet. Send a reminder.', '4h ago', 'alert-circle', '#ef4444')}
                ${renderNotificationItem('Administration Notice', 'Final placement reports are due by the end of the week. Please review your stats.', '1d ago', 'megaphone', '#6366f1', true)}
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
            <div style="flex:1; min-width:0; display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
                <div>
                    <h4 style="margin:0; font-size:1.05rem; color:#0f1f46; font-weight:800;">${title}</h4>
                    <p style="margin:4px 0 0; color:#50627f; font-size:0.98rem; line-height:1.4;">${text}</p>
                </div>
                <span style="display:inline-block; color:#64748b; font-size:0.85rem; font-weight:600; white-space:nowrap; padding-top:2px;">${time}</span>
            </div>
        </div>
    `;
}
