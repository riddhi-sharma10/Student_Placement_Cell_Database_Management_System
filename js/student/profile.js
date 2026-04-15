// js/student/profile.js — API Version
import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Fetching your verified profile...</h2></div>`;

    try {
        const student = await api.get('/students/profile');
        renderStudentProfile(container, app, student);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Access Denied: ${err.message}. Make sure your student record exists in the database.</div>`;
    }
}

function renderStudentProfile(container, app, s) {
    const profImage = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${s.s_id}`;

    container.innerHTML = `
        <div class="profile-header-banner">
            <div class="profile-avatar-wrapper">
                <img src="${profImage}" alt="Avatar">
                <div class="profile-verify-badge" style="background: #dcfce7; color: #15803d; border-color: #10b981;">
                    <ion-icon name="checkmark-circle"></ion-icon>
                    OFFICIAL RECORD
                </div>
            </div>
            
            <div class="profile-info-main">
                <h1 style="text-transform: capitalize;">${s.s_name}</h1>
                <div class="profile-info-meta">
                    <span>${s.dept}</span>
                </div>
                <div class="profile-info-meta" style="margin-top: 10px; font-size: 0.9rem;">
                    <ion-icon name="school-outline"></ion-icon>
                    <span>Class of ${s.graduation_yr || '2025'}</span>
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
            <div class="card">
                <h3>System Information</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top:20px;">
                    <div>
                        <label>ROLL NO</label>
                        <p style="font-weight: 700;">${s.s_id}</p>
                    </div>
                    <div>
                        <label>CGPA</label>
                        <p style="font-weight: 800; color:var(--primary); font-size: 1.5rem;">${s.cgpa}</p>
                    </div>
                    <div>
                        <label>EMAIL</label>
                        <p>${s.email}</p>
                    </div>
                    <div>
                        <label>PHONE</label>
                        <p>${s.phone}</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3>Placement Status</h3>
                <div style="margin-top:20px; padding:20px; background: #f8fafc; border-radius:12px; text-align:center;">
                    <div style="font-size: 1.2rem; font-weight: 800; color: ${s.profile_status === 'Active' ? 'var(--success)' : 'var(--danger)'};">
                        ${s.profile_status}
                    </div>
                    <p style="color:var(--text-muted); font-size:0.8rem; margin-top:8px;">Your recruitment status in the live drive.</p>
                </div>
                
                <div style="margin-top:24px; border-top:1px solid var(--border); padding-top:20px;">
                    <label>Coordinator ID</label>
                    <p>${s.coord_id || 'Not Assigned'}</p>
                </div>
            </div>
        </div>
    `;
}
