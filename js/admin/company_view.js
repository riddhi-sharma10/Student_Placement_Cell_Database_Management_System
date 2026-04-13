// js/admin/company_view.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
                <h1 style="font-size: 2rem; color: var(--primary);">Company Profile: Google India</h1>
                <p style="color: var(--text-muted);">View detailed hiring history and performance metrics for this partner.</p>
            </div>
            <button class="btn-primary" onclick="window.App.navigateTo('companies')">
                <ion-icon name="arrow-back-outline"></ion-icon> Back to Directory
            </button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <div class="card" style="text-align: center;">
                    <div style="width: 80px; height: 80px; background: #f8fafc; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 800; color: var(--primary); margin: 0 auto 16px; border: 1px solid var(--border);">G</div>
                    <h2 style="font-size: 1.5rem;">Google India</h2>
                    <p style="color: var(--text-muted); margin-bottom: 16px;">Technology • Tier: Dream</p>
                    <div class="tag tag-success">Active Partner</div>
                    
                    <div style="margin-top: 24px; text-align: left; border-top: 1px solid var(--border); padding-top: 24px;">
                        <div style="margin-bottom: 16px;">
                            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">TOTAL OFFERS</label>
                            <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">156</div>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">AVG. PACKAGE</label>
                            <div style="font-weight: 600;">₹18.5 LPA</div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3>Contact Information</h3>
                    <div style="margin-top: 16px;">
                        <p style="font-size: 0.9rem;"><b>Representative:</b> Aman Sharma</p>
                        <p style="font-size: 0.9rem; margin-top: 8px;"><b>Email:</b> recruiting@google.com</p>
                        <p style="font-size: 0.9rem; margin-top: 8px;"><b>Office:</b> Hyderabad, India</p>
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 24px;">
                <div class="card">
                    <h3>Job Profiles under Company</h3>
                    <div class="data-table-container" style="margin-top: 16px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Year</th>
                                    <th>Apps</th>
                                    <th>Selected</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Software Engineer</td><td>2024</td><td>450</td><td>12</td><td><span class="tag tag-success">Selected</span></td></tr>
                                <tr><td>Data Analyst</td><td>2023</td><td>280</td><td>8</td><td><span class="tag tag-info">Closed</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card">
                    <h3>Salary Insights</h3>
                    <div style="height: 200px; display: flex; align-items: flex-end; gap: 20px; padding: 20px 0;">
                        <div style="flex: 1; height: 40%; background: var(--primary); border-radius: 8px 8px 0 0; position: relative;">
                            <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; font-weight: 700;">8L</span>
                            <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem;">2021</span>
                        </div>
                        <div style="flex: 1; height: 60%; background: var(--primary); border-radius: 8px 8px 0 0; position: relative;">
                            <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; font-weight: 700;">12L</span>
                            <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem;">2022</span>
                        </div>
                        <div style="flex: 1; height: 85%; background: var(--primary); border-radius: 8px 8px 0 0; position: relative;">
                            <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; font-weight: 700;">17L</span>
                            <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem;">2023</span>
                        </div>
                        <div style="flex: 1; height: 95%; background: var(--primary); border-radius: 8px 8px 0 0; position: relative;">
                            <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; font-weight: 700;">18.5L</span>
                            <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem;">2024</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
