// js/student/dashboard.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Welcome back, ${app.state.user.name.split(' ')[1] || app.state.user.name}! 👋</h1>
            <p style="color: var(--text-muted);">Check your latest placement updates and opportunities.</p>
        </div>

        <div class="stats-grid">
            <!-- Total Applications -->
            <div class="card stat-card-alt">
                <label>Total Applications</label>
                <div class="value">24</div>
                <div class="trend success">
                    <ion-icon name="trending-up-outline"></ion-icon>
                    <span>4 new this week</span>
                </div>
            </div>

            <!-- Interviews Scheduled -->
            <div class="card stat-card-alt">
                <label>Interviews Scheduled</label>
                <div class="value">03</div>
                <div class="trend primary">
                    <ion-icon name="calendar-outline"></ion-icon>
                    <span>Next: tomorrow at 10 AM</span>
                </div>
            </div>

            <!-- Offers Received -->
            <div class="card stat-card-alt">
                <label>Offers Received</label>
                <div class="value">02</div>
                <div class="trend warning">
                    <ion-icon name="star"></ion-icon>
                    <span>Top 5% of batch</span>
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h2 style="font-size: 1.25rem;">Recent Applications</h2>
                    <button class="btn-primary" style="padding: 6px 16px; font-size: 0.8rem;" onclick="window.App.navigateTo('applications')">View All</button>
                </div>
                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600;">Global Tech Solutions</td>
                                <td>Software Engineer II</td>
                                <td>Oct 12, 2024</td>
                                <td><span class="tag tag-success">Offer Accepted</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">Nexus Analytics</td>
                                <td>Data Scientist</td>
                                <td>Oct 08, 2024</td>
                                <td><span class="tag tag-info">In Progress</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">FinBridge Systems</td>
                                <td>Backend Developer</td>
                                <td>Oct 05, 2024</td>
                                <td><span class="tag tag-danger">Closed</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">CloudScale AI</td>
                                <td>DevOps Intern</td>
                                <td>Sep 28, 2024</td>
                                <td><span class="tag tag-danger">Rejected</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 24px;">
                <div class="card" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white;">
                    <h3>Upcoming Interviews</h3>
                    <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 12px; border-left: 4px solid var(--accent);">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="font-weight: 600;">Nexus Analytics</span>
                            <span style="font-size: 0.7rem; opacity: 0.7;">TOMORROW</span>
                        </div>
                        <p style="font-size: 0.85rem; margin-top: 4px;">Data Scientist Technical Round</p>
                        <div style="margin-top: 12px; display: flex; gap: 12px; font-size: 0.75rem; opacity: 0.8;">
                            <span><ion-icon name="videocam-outline"></ion-icon> Virtual</span>
                            <span><ion-icon name="people-outline"></ion-icon> 3 Panelists</span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3>Career Milestone</h3>
                    <div style="margin-top: 20px; position: relative; padding-left: 24px; border-left: 2px dashed #e2e8f0;">
                        <div style="position: relative; margin-bottom: 24px;">
                            <div style="position: absolute; left: -33px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--success); border: 4px solid white; box-shadow: 0 0 0 4px #dcfce7;"></div>
                            <span style="font-size: 0.85rem; font-weight: 600;">Pre-Placement Talk</span>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">Completed • Sep 15</p>
                        </div>
                        <div style="position: relative; margin-bottom: 24px;">
                            <div style="position: absolute; left: -33px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--success); border: 4px solid white; box-shadow: 0 0 0 4px #dcfce7;"></div>
                            <span style="font-size: 0.85rem; font-weight: 600;">Aptitude Clearance</span>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">Completed • Sep 22</p>
                        </div>
                        <div style="position: relative;">
                            <div style="position: absolute; left: -33px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--warning); border: 4px solid white; box-shadow: 0 0 0 4px #fef9c3;"></div>
                            <span style="font-size: 0.85rem; font-weight: 600;">Technical Assessment</span>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">Current Stage • In Progress</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
