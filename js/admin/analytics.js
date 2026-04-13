// js/admin/analytics.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Reports & Analytics</h1>
            <p style="color: var(--text-muted);">Deep dive into placement data and performance metrics.</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div class="card">
                <h3 style="margin-bottom: 20px;">Salary Distribution</h3>
                <canvas id="salaryChart" style="max-height: 300px;"></canvas>
            </div>
            <div class="card">
                <h3 style="margin-bottom: 20px;">Placement % by Department</h3>
                <canvas id="pieChart" style="max-height: 300px;"></canvas>
            </div>
        </div>
    `;

    setTimeout(() => {
        // Salary Doughnut Chart
        const sCtx = document.getElementById('salaryChart');
        if (sCtx) {
            new Chart(sCtx, {
                type: 'doughnut',
                data: {
                    labels: ['< 5 LPA', '5-10 LPA', '10-20 LPA', '> 20 LPA'],
                    datasets: [{
                        data: [300, 450, 120, 45],
                        backgroundColor: ['#94a3b8', '#1B3A6B', '#F5A623', '#10b981']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }

        // Department Pie Chart
        const pCtx = document.getElementById('pieChart');
        if (pCtx) {
            new Chart(pCtx, {
                type: 'pie',
                data: {
                    labels: ['CSE', 'ECE', 'ME', 'CE', 'EE'],
                    datasets: [{
                        data: [85, 72, 60, 45, 55],
                        backgroundColor: ['#1B3A6B', '#2c5282', '#4a5568', '#718096', '#a0aec0']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } }
                }
            });
        }
    }, 100);
}
