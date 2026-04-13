// js/admin/overview.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Global Placement Overview</h1>
            <p style="color: var(--text-muted);">Real-time monitoring of institutional placement performance.</p>
        </div>

        <div class="stats-grid">
            <div class="card stat-card">
                <div class="stat-icon" style="background: #e0f2fe; color: #0369a1;"><ion-icon name="school-outline"></ion-icon></div>
                <div class="stat-info"><h3>Batch Placement</h3><div class="value">84%</div><span style="font-size: 0.75rem; color: var(--success);">↑ 5% YoY</span></div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #dcfce7; color: #15803d;"><ion-icon name="business-outline"></ion-icon></div>
                <div class="stat-info"><h3>Active Partners</h3><div class="value">142</div><span style="font-size: 0.75rem; color: var(--text-muted);">Current AY</span></div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #fef9c3; color: #a16207;"><ion-icon name="cash-outline"></ion-icon></div>
                <div class="stat-info"><h3>Avg CTC</h3><div class="value">₹12.4L</div><span style="font-size: 0.75rem; color: var(--success);">₹2.1L increase</span></div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #fee2e2; color: #b91c1c;"><ion-icon name="document-text-outline"></ion-icon></div>
                <div class="stat-info"><h3>Applications</h3><div class="value">12.5k</div><span style="font-size: 0.75rem; color: var(--text-muted);">Total processed</span></div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px;">
            <div class="card">
                <h3 style="margin-bottom: 20px;">Placement Trend (3 Years)</h3>
                <canvas id="trendChart" style="max-height: 250px;"></canvas>
            </div>
            <div class="card">
                <h3 style="margin-bottom: 20px;">Top 5 Hiring Companies</h3>
                <div style="margin-top: 10px;">
                    ${renderHiringBar("Google", 42, "#4285F4")}
                    ${renderHiringBar("Amazon", 38, "#FF9900")}
                    ${renderHiringBar("Microsoft", 25, "#737373")}
                    ${renderHiringBar("TCS", 124, "#475569")}
                    ${renderHiringBar("Zomato", 12, "#E23744")}
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
            <div class="card">
                <h3 style="margin-bottom: 20px;">Department Placements</h3>
                <canvas id="deptChart" style="max-height: 250px;"></canvas>
            </div>
            <div class="card">
                <h3 style="margin-bottom: 20px;">Recent Placement Records</h3>
                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr><th>Student</th><th>Dept</th><th>Company</th><th>Package</th><th>Date</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Alex Sterling</td><td>CSE</td><td>Google</td><td>₹45L</td><td>Today</td></tr>
                            <tr><td>Sara Chen</td><td>ECE</td><td>Amazon</td><td>₹32L</td><td>Yesterday</td></tr>
                            <tr><td>Mike Boss</td><td>ME</td><td>Tesla</td><td>₹28L</td><td>2 days ago</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        // Trend Chart
        const tCtx = document.getElementById('trendChart');
        if (tCtx) {
            new Chart(tCtx, {
                type: 'line',
                data: {
                    labels: ['2022', '2023', '2024'],
                    datasets: [{ label: 'Students Placed', data: [850, 1100, 1420], borderColor: '#1B3A6B', tension: 0.4, fill: true, backgroundColor: 'rgba(27, 58, 107, 0.05)' }]
                }
            });
        }

        // Dept Chart
        const dCtx = document.getElementById('deptChart');
        if (dCtx) {
            new Chart(dCtx, {
                type: 'polarArea',
                data: {
                    labels: ['CSE', 'ECE', 'ME', 'CE', 'EE'],
                    datasets: [{ data: [120, 95, 80, 45, 60], backgroundColor: ['#1B3A6B', '#2c5282', '#F5A623', '#718096', '#a0aec0'] }]
                }
            });
        }
    }, 100);
}

function renderHiringBar(name, count, color) {
    return `
        <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;"><span style="font-weight: 600;">${name}</span><span>${count}</span></div>
            <div style="width: 100%; height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden;"><div style="width: ${Math.min(count/1.5, 100)}%; height: 100%; background: ${color};"></div></div>
        </div>
    `;
}
