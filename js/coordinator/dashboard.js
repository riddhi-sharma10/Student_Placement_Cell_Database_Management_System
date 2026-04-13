// js/coordinator/dashboard.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Coordinator Dashboard</h1>
            <p style="color: var(--text-muted);">Manage job openings, student applications, and placement progress.</p>
        </div>

        <div class="stats-grid">
            <div class="card stat-card">
                <div class="stat-icon" style="background: #e0f2fe; color: #0369a1;">
                    <ion-icon name="people-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>Total Students</h3>
                    <div class="value">1,240</div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Academic Year 2024-25</span>
                </div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #dcfce7; color: #15803d;">
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>Placed Students</h3>
                    <div class="value">856</div>
                    <span style="font-size: 0.75rem; color: var(--success);">69% Placement Rate</span>
                </div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #fef9c3; color: #a16207;">
                    <ion-icon name="briefcase-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>Active Jobs</h3>
                    <div class="value">42</div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">12 closing this week</span>
                </div>
            </div>
            <div class="card stat-card">
                <div class="stat-icon" style="background: #fee2e2; color: #b91c1c;">
                    <ion-icon name="document-text-outline"></ion-icon>
                </div>
                <div class="stat-info">
                    <h3>Pending Reviews</h3>
                    <div class="value">128</div>
                    <span style="font-size: 0.75rem; color: var(--danger);">Action Required</span>
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div class="card">
                <h3 style="margin-bottom: 20px;">Placement Progress by Dept.</h3>
                <canvas id="deptChart" style="max-height: 300px;"></canvas>
            </div>
            <div class="card">
                <h3 style="margin-bottom: 20px;">Upcoming Company Visits</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${renderVisitRow("Google", "Oct 15", "Software Engineer", "tag-warning")}
                    ${renderVisitRow("Microsoft", "Oct 18", "Full Stack Dev", "tag-info")}
                    ${renderVisitRow("Nvidia", "Oct 22", "Hardware Eng", "tag-success")}
                </div>
            </div>
        </div>
    `;

    // Initialize Chart
    setTimeout(() => {
        const ctx = document.getElementById('deptChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['CSE', 'ECE', 'ME', 'CE', 'EE'],
                    datasets: [{
                        label: '% Placed',
                        data: [85, 72, 60, 45, 55],
                        backgroundColor: ['#1B3A6B', '#2c5282', '#4a5568', '#718096', '#a0aec0'],
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true, max: 100 }
                    }
                }
            });
        }
    }, 100);
}

function renderVisitRow(company, date, role, color) {
    return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid var(--border); border-radius: 12px;">
            <div style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 40px; height: 40px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--primary);">
                    ${company.charAt(0)}
                </div>
                <div>
                    <h4 style="font-size: 0.95rem;">${company}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">${role}</p>
                </div>
            </div>
            <div style="text-align: right;">
                <span style="display: block; font-weight: 700; font-size: 0.9rem;">${date}</span>
                <span class="tag ${color}" style="font-size: 0.7rem;">Confirmed</span>
            </div>
        </div>
    `;
}
