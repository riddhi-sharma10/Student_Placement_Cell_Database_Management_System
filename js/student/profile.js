
import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `<div style="padding: 24px;"><h2>Loading official records...</h2></div>`;

    try {
        const student = await api.get('/students/profile');
        renderProfile(container, student);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Database Sync Error: ${err.message}</div>`;
    }
}

function renderProfile(container, student) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">My Profile</h1>
            <p style="color: var(--text-muted);">View and manage your official university placement record.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">
            <!-- Profile Info -->
            <div class="card" style="padding: 32px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 24px;">
                <div style="width: 120px; height: 120px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 800; border: 6px solid #f0f7ff; box-shadow: 0 10px 25px rgba(27, 58, 107, 0.15);">
                    ${student.s_name.charAt(0)}
                </div>
                <div>
                    <h2 style="font-size: 1.5rem; color: var(--text-main); font-weight: 800; margin-bottom: 4px;">${student.s_name}</h2>
                    <p style="color: var(--text-muted); font-weight: 600;">Student ID: ${student.s_id}</p>
                </div>
                <div style="width: 100%; height: 1px; background: var(--border);"></div>
                <div style="width: 100%; display: flex; flex-direction: column; gap: 16px; text-align: left;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <ion-icon name="mail-outline" style="color: var(--primary); font-size: 1.2rem;"></ion-icon>
                        <span style="font-weight: 600; color: var(--text-main);">${student.email}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <ion-icon name="call-outline" style="color: var(--primary); font-size: 1.2rem;"></ion-icon>
                        <span style="font-weight: 600; color: var(--text-main);">${student.phone || 'No phone added'}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <ion-icon name="location-outline" style="color: var(--primary); font-size: 1.2rem;"></ion-icon>
                        <span style="font-weight: 600; color: var(--text-main); uppercase;">${student.dept}</span>
                    </div>
                </div>
            </div>

            <!-- Academic & Placement Details -->
            <div style="display: flex; flex-direction: column; gap: 32px;">
                
                <div class="card" style="padding: 32px;">
                    <h3 style="margin-bottom: 24px; font-weight: 800; border-bottom: 1px solid var(--border); padding-bottom: 16px;">Academic Overview</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                        <div>
                            <label style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Current CGPA</label>
                            <div style="font-size: 2rem; font-weight: 900; color: var(--primary); margin-top: 8px;">${student.cgpa}</div>
                        </div>
                        <div>
                            <label style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Graduation Year</label>
                            <div style="font-size: 2rem; font-weight: 900; color: var(--text-main); margin-top: 8px;">${student.graduation_yr}</div>
                        </div>
                    </div>
                </div>

                <div class="card" style="padding: 32px;">
                    <h3 style="margin-bottom: 24px; font-weight: 800; border-bottom: 1px solid var(--border); padding-bottom: 16px;">Placement Status</h3>
                    <div style="display: flex; align-items: center; gap: 20px;">
                        <div style="width: 64px; height: 64px; border-radius: 16px; background: ${student.profile_status === 'placed' ? 'var(--success-bg)' : '#fef3c7'}; color: ${student.profile_status === 'placed' ? 'var(--success)' : '#d97706'}; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                            <ion-icon name="${student.profile_status === 'placed' ? 'ribbon' : 'time'}"></ion-icon>
                        </div>
                        <div>
                            <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); text-transform: capitalize;">${student.profile_status.replace('_', ' ')}</div>
                            <p style="color: var(--text-muted); margin-top: 4px; font-size: 0.9rem;">Verified by the Placement Coordinator</p>
                        </div>
                    </div>
                </div>

                <div class="card" style="padding: 32px; border: 2px dashed var(--border); background: #fafafa; text-align: center;">
                    <h4 style="margin-bottom: 16px; color: var(--text-muted);">Official Resume Record</h4>
                    <a href="${student.resume_url || '#'}" target="_blank" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; text-decoration: none;">
                        <ion-icon name="document-text-outline"></ion-icon>
                        View Verified Resume
                    </a>
                </div>

            </div>
        </div>
    `;
}
