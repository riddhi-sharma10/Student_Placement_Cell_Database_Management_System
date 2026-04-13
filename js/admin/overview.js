// js/admin/overview.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">System Overview</h1>
            <p style="color: var(--text-muted);">Master control panel for the Placement Portal.</p>
        </div>

        <div class="stats-grid">
            <div class="card stat-card">
                <div class="stat-icon" style="background: #e0f2fe; color: #0369a1;">
                    <ion-icon name="school-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>Total Batch</h3>
                    <div class="value">4,500</div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">All Departments</span>
                </div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #dcfce7; color: #15803d;">
                    <ion-icon name="business-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>Companies</h3>
                    <div class="value">142</div>
                    <span style="font-size: 0.75rem; color: var(--success);">+12 New this year</span>
                </div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #fef9c3; color: #a16207;">
                    <ion-icon name="cash-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>Avg Package</h3>
                    <div class="value">₹12.4 LPA</div>
                    <span style="font-size: 0.75rem; color: var(--success);">↑ 15% from last year</span>
                </div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #fee2e2; color: #b91c1c;">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>System Health</h3>
                    <div class="value">99.9%</div>
                    <span style="font-size: 0.75rem; color: var(--success);">All services active</span>
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
            <div class="card">
                <h3 style="margin-bottom: 20px;">Hiring Trends (3 Years)</h3>
                <canvas id="trendChart" style="max-height: 300px;"></canvas>
            </div>
            <div class="card">
                <h3 style="margin-bottom: 20px;">Top Hiring Companies</h3>
                <div style="margin-top: 10px;">
                    ${renderTopCompany("Google", 42, "var(--primary)")}
                    ${renderTopCompany("Amazon", 38, "#2563eb")}
                    ${renderTopCompany("TCS", 124, "#475569")}
                    ${renderTopCompany("Microsoft", 25, "#ea580c")}
                    ${renderTopCompany("Meta", 12, "#1d4ed8")}
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const ctx = document.getElementById('trendChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['2022', '2023', '2024'],
                    datasets: [
                        {
                            label: 'Highest CTC (LPA)',
                            data: [32, 45, 62],
                            borderColor: '#F5A623',
                            tension: 0.4,
                            fill: true,
                            backgroundColor: 'rgba(245, 166, 35, 0.1)'
                        },
                        {
                            label: 'Average CTC (LPA)',
                            data: [8.5, 9.8, 12.4],
                            borderColor: '#1B3A6B',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }
    }, 100);
}

function renderTopCompany(name, count, color) {
    return `
        <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
                <span style="font-weight: 600;">${name}</span>
                <span style="color: var(--text-muted);">${count} offers</span>
            </div>
            <div style="width: 100%; height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden;">
                <div style="width: ${Math.min(count, 100)}%; height: 100%; background: ${color};"></div>
            </div>
        </div>
    `;
}
