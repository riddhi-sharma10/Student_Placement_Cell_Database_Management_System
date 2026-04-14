// js/common/settings.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Account Settings</h1>
            <p style="color: var(--text-muted);">Manage your security and notification preferences.</p>
        </div>

        <div style="max-width: 800px;">
            <div class="card" style="margin-bottom: 24px;">
                <h3>Change Password</h3>
                <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div class="form-group">
                        <label>CURRENT PASSWORD</label>
                        <input type="password" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div class="form-group">
                        <label>NEW PASSWORD</label>
                        <input type="password" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div class="form-group">
                        <label>CONFIRM NEW PASSWORD</label>
                        <input type="password" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <button class="btn-primary" style="align-self: flex-start;">Update Password</button>
                </div>
            </div>

            <div class="card">
                <h3>Notification Settings</h3>
                <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>Email notifications for new jobs</span>
                        <input type="checkbox" checked style="width: 20px; height: 20px;">
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>SMS alerts for interview schedules</span>
                        <input type="checkbox" checked style="width: 20px; height: 20px;">
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>System announcements</span>
                        <input type="checkbox" style="width: 20px; height: 20px;">
                    </label>
                    <button class="btn-primary" style="align-self: flex-start; margin-top: 20px;">Save Preferences</button>
                </div>
            </div>
        </div>
    `;
}
