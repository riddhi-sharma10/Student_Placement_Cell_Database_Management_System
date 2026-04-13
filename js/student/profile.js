// js/student/profile.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">My Profile</h1>
            <p style="color: var(--text-muted);">Manage your professional identity and placement credentials.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <div class="card" style="text-align: center;">
                    <img src="${app.state.user.avatar}" alt="Avatar" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 16px; border: 4px solid #f1f5f9;">
                    <h2 style="font-size: 1.5rem;">${app.state.user.name}</h2>
                    <p style="color: var(--text-muted); margin-bottom: 16px;">B.Tech Computer Science • Semester VII</p>
                    <div class="tag tag-success" style="font-size: 0.85rem;">Profile Verified 100%</div>
                    
                    <div style="margin-top: 24px; text-align: left; border-top: 1px solid var(--border); padding-top: 24px;">
                        <div style="margin-bottom: 16px;">
                            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">CGPA</label>
                            <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">9.42 / 10.0</div>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">GRADUATION YEAR</label>
                            <div style="font-weight: 600;">2025</div>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">EMAIL</label>
                            <div style="font-weight: 600;">${app.state.user.username}@university.edu</div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3>Resume Asset</h3>
                    <div style="margin-top: 16px; padding: 16px; border: 2px dashed #e2e8f0; border-radius: 12px; text-align: center;">
                        <ion-icon name="document-text" style="font-size: 2.5rem; color: var(--text-muted);"></ion-icon>
                        <p style="font-size: 0.85rem; margin-top: 8px; font-weight: 600;">Resume_Final_v2.pdf</p>
                        <p style="font-size: 0.7rem; color: var(--text-muted);">Uploaded on Oct 01, 2024</p>
                        <button class="btn-primary" style="margin-top: 16px; width: 100%;">Replace Resume</button>
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 24px;">
                <div class="card">
                    <h3 style="margin-bottom: 24px;">Skills & Competencies</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        <span class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem;">Python</span>
                        <span class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem;">React.js</span>
                        <span class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem;">Node.js</span>
                        <span class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem;">Machine Learning</span>
                        <span class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem;">SQL</span>
                        <span class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem;">Java</span>
                        <span class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem;">AWS Cloud</span>
                        <button style="border: 2px dashed var(--border); background: transparent; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; cursor: pointer;">+ Add Skill</button>
                    </div>
                </div>

                <div class="card">
                    <h3 style="margin-bottom: 24px;">Academic Information</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                        <div class="form-group">
                            <label>COLLEGE/UNIVERSITY</label>
                            <input type="text" value="Editorial Institution of Technology" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;" disabled>
                        </div>
                        <div class="form-group">
                            <label>BRANCH</label>
                            <input type="text" value="Computer Science & Engineering" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;" disabled>
                        </div>
                        <div class="form-group">
                            <label>CLASS 10 PERCENTAGE</label>
                            <input type="text" value="95.4%" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        </div>
                        <div class="form-group">
                            <label>CLASS 12 PERCENTAGE</label>
                            <input type="text" value="92.8%" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        </div>
                    </div>
                    <button class="btn-primary" style="margin-top: 24px;">Save Profile Updates</button>
                </div>
            </div>
        </div>
    `;
}
