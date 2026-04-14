// js/admin/analytics.js

const analyticsDataByYear = {
    '2022-23': {
        kpis: {
            placementRate: 78.4,
            avgLpa: 9.8,
            highestLpa: 28.0,
            applications: 26840
        },
        salaryDistribution: [430, 520, 155, 48],
        departmentPlacement: [76, 72, 68],
        monthlyApplications: [1800, 1920, 2050, 2240, 2390, 2520],
        monthlyOffers: [320, 355, 392, 430, 468, 502],
        departments: [
            { name: 'Computer Science Engineering', placementPct: 76, avgLpa: 11.2, medianAts: 78 },
            { name: 'Electronics & Communication Engineering', placementPct: 72, avgLpa: 8.7, medianAts: 73 },
            { name: 'Mechanical Engineering', placementPct: 68, avgLpa: 7.4, medianAts: 70 }
        ],
        insights: [
            'CSE led with highest average package at ₹11.2 LPA.',
            'Mechanical Engineering improved interview conversion by 6% over previous cycle.',
            'Most offers (45%) were in the ₹5-10 LPA band.'
        ]
    },
    '2023-24': {
        kpis: {
            placementRate: 82.1,
            avgLpa: 10.9,
            highestLpa: 34.0,
            applications: 31265
        },
        salaryDistribution: [360, 610, 210, 72],
        departmentPlacement: [83, 79, 74],
        monthlyApplications: [2050, 2180, 2320, 2580, 2760, 2940],
        monthlyOffers: [350, 402, 455, 500, 548, 590],
        departments: [
            { name: 'Computer Science Engineering', placementPct: 83, avgLpa: 12.8, medianAts: 81 },
            { name: 'Electronics & Communication Engineering', placementPct: 79, avgLpa: 9.6, medianAts: 76 },
            { name: 'Mechanical Engineering', placementPct: 74, avgLpa: 8.2, medianAts: 72 }
        ],
        insights: [
            'Overall placement rate crossed 82% with stronger recruiter participation.',
            'ECE saw 11% YoY growth in offers from product companies.',
            'High-package bracket (> ₹20 LPA) increased from 48 to 72 offers.'
        ]
    },
    '2024-25': {
        kpis: {
            placementRate: 84.2,
            avgLpa: 12.4,
            highestLpa: 42.0,
            applications: 34591
        },
        salaryDistribution: [298, 670, 280, 104],
        departmentPlacement: [86, 82, 78],
        monthlyApplications: [2280, 2410, 2590, 2840, 3075, 3340],
        monthlyOffers: [390, 438, 490, 556, 612, 674],
        departments: [
            { name: 'Computer Science Engineering', placementPct: 86, avgLpa: 14.6, medianAts: 84 },
            { name: 'Electronics & Communication Engineering', placementPct: 82, avgLpa: 10.8, medianAts: 79 },
            { name: 'Mechanical Engineering', placementPct: 78, avgLpa: 8.9, medianAts: 74 }
        ],
        insights: [
            'CSE touched 86% placement with highest package at ₹42 LPA.',
            'ECE crossed 80% placement due to embedded systems and VLSI hiring.',
            'Applications grew 10.6% YoY while offer conversion stayed above 20%.'
        ]
    }
};

const analyticsState = {
    year: '2024-25',
    charts: {
        salary: null,
        dept: null,
        trend: null
    }
};

export function render(container, app) {
    container.innerHTML = `
        <div class="admin-dashboard-shell">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Reports & Analytics</h1>
                    <p>Deep dive into placement data and performance metrics.</p>
                </div>
                <div style="display:flex; gap:10px;">
                    <select id="analytics-year" style="border:1px solid var(--border); border-radius:10px; padding:0 12px; font-weight:600; color:var(--text-main);">
                        ${Object.keys(analyticsDataByYear).map((year) => `<option value="${year}" ${year === analyticsState.year ? 'selected' : ''}>${year}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="admin-stat-grid">
                <div class="card admin-stat-card">
                    <div class="admin-stat-meta">
                        <p>Placement Rate</p>
                        <h2 id="kpi-placement-rate">0%</h2>
                    </div>
                </div>
                <div class="card admin-stat-card">
                    <div class="admin-stat-meta">
                        <p>Average Package</p>
                        <h2 id="kpi-avg-lpa">₹0 LPA</h2>
                    </div>
                </div>
                <div class="card admin-stat-card">
                    <div class="admin-stat-meta">
                        <p>Highest Package</p>
                        <h2 id="kpi-highest-lpa">₹0 LPA</h2>
                    </div>
                </div>
                <div class="card admin-stat-card">
                    <div class="admin-stat-meta">
                        <p>Total Applications</p>
                        <h2 id="kpi-applications">0</h2>
                    </div>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:24px;">
                <div class="card">
                    <h3 style="margin-bottom: 14px; color:#0f2f61;">Salary Distribution</h3>
                    <canvas id="salaryChart" style="max-height: 300px;"></canvas>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 14px; color:#0f2f61;">Placement % by Department</h3>
                    <canvas id="pieChart" style="max-height: 300px;"></canvas>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 2fr 1fr; gap:24px;">
                <div class="card">
                    <h3 style="margin-bottom: 14px; color:#0f2f61;">Applications vs Offers Trend (Jul - Dec)</h3>
                    <canvas id="trendChart" style="max-height: 320px;"></canvas>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 12px; color:#0f2f61;">Key Insights</h3>
                    <ul id="analytics-insights" style="padding-left: 18px; color: var(--text-muted); display:grid; gap:10px;"></ul>
                </div>
            </div>

            <div class="card">
                <h3 style="margin-bottom: 14px; color:#0f2f61;">Department Performance Snapshot</h3>
                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Department</th>
                                <th>Placement %</th>
                                <th>Average Package (LPA)</th>
                                <th>Median ATS</th>
                            </tr>
                        </thead>
                        <tbody id="analytics-dept-table"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    bindEvents();
    updateAnalyticsView();
}

function bindEvents() {
    document.getElementById('analytics-year')?.addEventListener('change', (event) => {
        analyticsState.year = event.target.value;
        updateAnalyticsView();
    });

}

function updateAnalyticsView() {
    const yearData = analyticsDataByYear[analyticsState.year];
    if (!yearData) return;

    setText('kpi-placement-rate', `${yearData.kpis.placementRate.toFixed(1)}%`);
    setText('kpi-avg-lpa', `₹${yearData.kpis.avgLpa.toFixed(1)} LPA`);
    setText('kpi-highest-lpa', `₹${yearData.kpis.highestLpa.toFixed(1)} LPA`);
    setText('kpi-applications', formatNumber(yearData.kpis.applications));

    renderDepartmentTable(yearData.departments);
    renderInsights(yearData.insights);
    renderCharts(yearData);
}

function renderInsights(insights) {
    const list = document.getElementById('analytics-insights');
    if (!list) return;
    list.innerHTML = insights.map((point) => `<li>${point}</li>`).join('');
}

function renderDepartmentTable(rows) {
    const tbody = document.getElementById('analytics-dept-table');
    if (!tbody) return;

    tbody.innerHTML = rows.map((row) => `
        <tr>
            <td>${row.name}</td>
            <td>${row.placementPct}%</td>
            <td>${row.avgLpa.toFixed(1)}</td>
            <td>${row.medianAts}</td>
        </tr>
    `).join('');
}

function renderCharts(yearData) {
    destroyCharts();

    const salaryCanvas = document.getElementById('salaryChart');
    if (salaryCanvas) {
        analyticsState.charts.salary = new Chart(salaryCanvas, {
            type: 'doughnut',
            data: {
                labels: ['< 5 LPA', '5-10 LPA', '10-20 LPA', '> 20 LPA'],
                datasets: [{
                    data: yearData.salaryDistribution,
                    backgroundColor: ['#94a3b8', '#1B3A6B', '#F5A623', '#10b981'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '52%',
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    const deptCanvas = document.getElementById('pieChart');
    if (deptCanvas) {
        analyticsState.charts.dept = new Chart(deptCanvas, {
            type: 'pie',
            data: {
                labels: ['CSE', 'ECE', 'ME'],
                datasets: [{
                    data: yearData.departmentPlacement,
                    backgroundColor: ['#1B3A6B', '#355C91', '#7B8CA5']
                }]
            },
            options: {
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    const trendCanvas = document.getElementById('trendChart');
    if (trendCanvas) {
        analyticsState.charts.trend = new Chart(trendCanvas, {
            type: 'line',
            data: {
                labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Applications',
                        data: yearData.monthlyApplications,
                        borderColor: '#1B3A6B',
                        backgroundColor: 'rgba(27, 58, 107, 0.1)',
                        fill: true,
                        tension: 0.35
                    },
                    {
                        label: 'Offers',
                        data: yearData.monthlyOffers,
                        borderColor: '#F5A623',
                        backgroundColor: 'rgba(245, 166, 35, 0.08)',
                        fill: true,
                        tension: 0.35
                    }
                ]
            },
            options: {
                plugins: { legend: { position: 'top', align: 'end' } },
                scales: {
                    y: { grid: { color: '#edf2f7' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

function destroyCharts() {
    Object.values(analyticsState.charts).forEach((chart) => chart?.destroy());
    analyticsState.charts.salary = null;
    analyticsState.charts.dept = null;
    analyticsState.charts.trend = null;
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-IN').format(value);
}
