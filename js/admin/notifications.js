// js/common/notifications.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Notifications</h1>
            <p style="color: var(--text-muted);">Stay updated with the latest activity in your portal.</p>
        </div>

        <div class="card">
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${renderNotificationItem("New Job Opportunity", "Google is hiring for SDE Roles. Apply before Oct 25.", "2h ago", "briefcase", "#3b82f6")}
                ${renderNotificationItem("Application Shortlisted", "You have been shortlisted for the initial round of Amazon.", "5h ago", "checkmark-circle", "#10b981")}
                ${renderNotificationItem("System Update", "Placement portal will be under maintenance on Oct 20.", "1d ago", "settings", "#64748b")}
                ${renderNotificationItem("Interview Scheduled", "Technical Round with Nexus Analytics scheduled for tomorrow.", "2d ago", "calendar", "#f59e0b")}
            </div>
        </div>
    `;
}

function renderNotificationItem(title, text, time, icon, color) {
    return `
        <div style="display: flex; gap: 16px; padding: 16px; border-bottom: 1px solid var(--border); align-items: flex-start;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: ${color}20; color: ${color}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                <ion-icon name="${icon}"></ion-icon>
            </div>
            <div style="flex: 1;">
                <h4 style="font-size: 0.95rem; font-weight: 700;">${title}</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${text}</p>
                <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 8px;">${time}</span>
            </div>
        </div>
    `;
}
