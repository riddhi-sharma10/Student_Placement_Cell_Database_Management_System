// js/coordinator/settings.js

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
                        <input type="password" id="current-pass" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div class="form-group">
                        <label>NEW PASSWORD</label>
                        <input type="password" id="new-pass" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div class="form-group">
                        <label>CONFIRM NEW PASSWORD</label>
                        <input type="password" id="confirm-pass" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <button class="btn-primary" id="update-pass-btn" style="align-self: flex-start;">Update Password</button>
                    <p id="pass-feedback" style="font-size: 0.85rem; display: none;"></p>
                </div>
            </div>

            <div class="card">
                <h3>Notification Settings</h3>
                <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>Email notifications for new jobs</span>
                        <input type="checkbox" id="pref-email" checked style="width: 20px; height: 20px; accent-color: var(--primary);">
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>SMS alerts for interview schedules</span>
                        <input type="checkbox" id="pref-sms" checked style="width: 20px; height: 20px; accent-color: var(--primary);">
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <span>System announcements</span>
                        <input type="checkbox" id="pref-ann" style="width: 20px; height: 20px; accent-color: var(--primary);">
                    </label>
                    <button class="btn-primary" id="save-pref-btn" style="align-self: flex-start; margin-top: 20px;">Save Preferences</button>
                </div>
            </div>
        </div>
    `;

    // Setup Handlers
    setTimeout(() => {
        // --- Password Logic ---
        const updatePassBtn = document.getElementById('update-pass-btn');
        const passFeedback = document.getElementById('pass-feedback');

        if (updatePassBtn) {
            updatePassBtn.addEventListener('click', () => {
                const current = document.getElementById('current-pass').value;
                const next = document.getElementById('new-pass').value;
                const confirm = document.getElementById('confirm-pass').value;

                if (!current || !next || !confirm) {
                    showFeedback("Please fill in all password fields.", "red");
                    return;
                }

                if (next !== confirm) {
                    showFeedback("New passwords do not match.", "red");
                    return;
                }

                if (next.length < 6) {
                    showFeedback("Password must be at least 6 characters.", "red");
                    return;
                }

                // Simulate API call
                updatePassBtn.classList.add('btn-disabled');
                updatePassBtn.innerText = "Updating...";
                
                setTimeout(() => {
                    showFeedback("Password updated successfully!", "green");
                    document.getElementById('current-pass').value = '';
                    document.getElementById('new-pass').value = '';
                    document.getElementById('confirm-pass').value = '';
                    updatePassBtn.classList.remove('btn-disabled');
                    updatePassBtn.innerText = "Update Password";
                }, 1500);
            });
        }

        const showFeedback = (msg, color) => {
            passFeedback.innerText = msg;
            passFeedback.style.color = color;
            passFeedback.style.display = 'block';
            setTimeout(() => {
                passFeedback.style.display = 'none';
            }, 3000);
        };

        // --- Preferences Logic ---
        const savePrefBtn = document.getElementById('save-pref-btn');
        if (savePrefBtn) {
            savePrefBtn.addEventListener('click', () => {
                const prefs = {
                    email: document.getElementById('pref-email').checked,
                    sms: document.getElementById('pref-sms').checked,
                    ann: document.getElementById('pref-ann').checked
                };

                savePrefBtn.classList.add('btn-disabled');
                savePrefBtn.innerText = "Saving...";

                setTimeout(() => {
                    savePrefBtn.innerText = "Saved!";
                    setTimeout(() => {
                        savePrefBtn.classList.remove('btn-disabled');
                        savePrefBtn.innerText = "Save Preferences";
                    }, 1000);
                }, 800);
            });
        }
    }, 0);
}
