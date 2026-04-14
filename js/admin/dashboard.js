// js/admin/dashboard.js

const dashboardData = {
    stats: [
        { label: 'Total Students', value: 12480, icon: 'people-outline', note: '+4% MoM', noteType: 'neutral' },
        { label: 'Companies', value: 482, icon: 'business-outline', note: 'Active', noteType: 'active' },
        { label: 'Profiles Verified', value: 11042, icon: 'id-card-outline', note: '', noteType: 'neutral' },
        { label: 'Applications', value: 34591, icon: 'send-outline', note: '', noteType: 'neutral' },
        { label: 'Interviews', value: 8214, icon: 'calendar-clear-outline', note: '', noteType: 'neutral' },
        { label: 'Total Offers', value: 5102, icon: 'checkmark-done-outline', note: '', noteType: 'neutral' },
        { label: 'Placements', value: 4890, icon: 'briefcase-outline', note: '', noteType: 'neutral' },
        { label: 'Placement %', value: '84.2%', icon: 'newspaper-outline', note: '', noteType: 'highlight' }
    ],
    trend: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        placements: [420, 620, 810, 1010, 1120, 700]
    },
    tiers: [
        { label: 'Tier 1 (Fortune 500)', value: 217, color: '#0f2f61' },
        { label: 'Tier 2 (Growth Startups)', value: 144, color: '#4a6296' },
        { label: 'Tier 3 (Local Leaders)', value: 121, color: '#f2cf9e' }
    ],
    departments: [
        { name: 'Computer Science', placed: 1420 },
        { name: 'Mechanical Engineering', placed: 980 },
        { name: 'Electronics and Communication Engineering', placed: 850 }
    ],
    topCompanies: [
        { name: 'Global Dynamics Inc.', industry: 'Technology & Cloud', offers: 142 },
        { name: 'Stellar Fintech', industry: 'Financial Services', offers: 98 },
        { name: 'NexGen Robotics', industry: 'Industrial Automation', offers: 85 }
    ],
    records: [
        { initials: 'JD', student: 'Jonathan Doe', department: 'Computer Science', company: 'Microsoft', packageLpa: 24.5, status: 'in-progress' },
        { initials: 'AM', student: 'Alice Miller', department: 'Mechanical Engineering', company: 'Tesla Inc.', packageLpa: 18.0, status: 'placed' },
        { initials: 'SR', student: 'Samuel Reed', department: 'Electronics and Communication Engineering', company: 'JP Morgan', packageLpa: 14.2, status: 'placed' },
        { initials: 'EL', student: 'Emma Lee', department: 'Electronics and Communication Engineering', company: 'Intel Corp', packageLpa: 21.5, status: 'rejected' },
        { initials: 'RK', student: 'Rohan Kapoor', department: 'Computer Science', company: 'Amazon', packageLpa: 31.0, status: 'placed' }
    ]
};

const dashboardState = {
    statusFilter: 'all'
};

export function render(container, app) {
    container.innerHTML = `
        <div class="admin-dashboard-shell">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Placement Overview</h1>
                </div>
            </div>

            <div class="admin-stat-grid">
                ${dashboardData.stats.map(renderStatCard).join('')}
            </div>

            <div class="admin-grid-two">
                <div class="card">
                    <div class="admin-card-head">
                        <h3>Placement Trend</h3>
                        <span>Monthly growth trajectory (Jul - Dec)</span>
                    </div>
                    <canvas id="admin-placement-trend" class="admin-chart"></canvas>
                </div>

                <div class="card">
                    <div class="admin-card-head">
                        <h3>Company Tiers</h3>
                        <span>${formatNumber(getTierTotal())} total units</span>
                    </div>
                    <div class="admin-tier-chart-wrap">
                        <canvas id="admin-company-tier" class="admin-chart admin-chart-sm"></canvas>
                        <div class="admin-tier-center">
                            <strong>${formatNumber(getTierTotal())}</strong>
                            <span>Total Units</span>
                        </div>
                    </div>
                    <div class="admin-tier-list">
                        ${dashboardData.tiers.map((tier) => {
                            const percent = ((tier.value / getTierTotal()) * 100).toFixed(1);
                            return `
                                <div class="admin-tier-item">
                                    <span><i style="background:${tier.color}"></i>${tier.label}</span>
                                    <strong>${percent}%</strong>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>

            <div class="admin-grid-two admin-grid-balance">
                <div class="card">
                    <div class="admin-card-head">
                        <h3>Department Placements</h3>
                        <span>Confirmed placements by department</span>
                    </div>
                    <div class="admin-dept-list">
                        ${dashboardData.departments.map(renderDepartmentRow).join('')}
                    </div>
                </div>

                <div class="card">
                    <div class="admin-card-head admin-card-head-inline">
                        <div>
                            <h3>Top 5 Hiring Companies</h3>
                            <span>By offers rolled out this cycle</span>
                        </div>
                        <button id="admin-view-all-companies" class="admin-link-btn" type="button">View All</button>
                    </div>
                    <div class="admin-company-list">
                        ${dashboardData.topCompanies.map((company) => renderTopCompany(company)).join('')}
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="admin-card-head admin-card-head-inline">
                    <div>
                        <h3>Recent Placement Records</h3>
                        <span>Latest outcomes across departments and partners</span>
                    </div>
                    <div class="admin-table-actions">
                        <div class="admin-filter-wrap">
                            <button id="admin-record-filter-btn" class="admin-user-action" type="button">
                                <ion-icon name="funnel-outline"></ion-icon>
                                Filter
                            </button>
                            <div id="admin-record-filter-panel" class="admin-filter-panel hidden" style="width: 210px;">
                                <div class="admin-filter-title">Record Status</div>
                                <div class="admin-filter-grid">
                                    <label>
                                        <span>Status</span>
                                        <select id="admin-record-filter" aria-label="Filter records by status">
                                            <option value="all">All</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="placed">Placed</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </label>
                                </div>
                                <div class="admin-filter-actions">
                                    <button id="admin-apply-record-filter" class="btn-primary" type="button">Apply</button>
                                </div>
                            </div>
                        </div>
                        <button id="admin-export-csv" class="btn-primary" type="button">
                            <ion-icon name="download-outline"></ion-icon>
                            Export CSV
                        </button>
                    </div>
                </div>

                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Department</th>
                                <th>Company</th>
                                <th>Package (LPA)</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="admin-recent-records-body"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    renderRecentRecords();
    initCharts();
    bindEvents(app);
}

function renderStatCard(stat) {
    const value = typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value;
    const noteClass = stat.noteType === 'highlight' ? 'admin-note-highlight' : (stat.noteType === 'active' ? 'admin-note-active' : 'admin-note-neutral');

    return `
        <div class="card admin-stat-card ${stat.noteType === 'highlight' ? 'admin-stat-card-highlight' : ''}">
            <div class="admin-stat-top">
                <div class="admin-stat-icon">
                    <ion-icon name="${stat.icon}"></ion-icon>
                </div>
                ${stat.note ? `<span class="${noteClass}">${stat.note}</span>` : ''}
            </div>
            <div class="admin-stat-meta">
                <p>${stat.label}</p>
                <h2>${value}</h2>
            </div>
        </div>
    `;
}

function renderDepartmentRow(department) {
    const max = Math.max(...dashboardData.departments.map((d) => d.placed));
    const pct = Math.round((department.placed / max) * 100);

    return `
        <div class="admin-dept-row">
            <div class="admin-dept-top">
                <strong>${department.name}</strong>
                <span>${formatNumber(department.placed)}</span>
            </div>
            <div class="admin-dept-track">
                <div style="width:${pct}%"></div>
            </div>
        </div>
    `;
}

function renderTopCompany(company) {
    return `
        <div class="admin-company-item">
            <div class="admin-company-avatar">${company.name.charAt(0)}</div>
            <div>
                <strong>${company.name}</strong>
                <p>${company.industry}</p>
            </div>
            <div class="admin-company-offers">
                <strong>${company.offers}</strong>
                <span>offers</span>
            </div>
        </div>
    `;
}

function renderRecentRecords() {
    const tbody = document.getElementById('admin-recent-records-body');
    if (!tbody) return;

    const rows = dashboardState.statusFilter === 'all'
        ? dashboardData.records
        : dashboardData.records.filter((record) => record.status === dashboardState.statusFilter);

    tbody.innerHTML = rows.length
        ? rows.map((record) => `
            <tr>
                <td>
                    <div class="admin-student-cell">
                        <span class="admin-student-initials">${record.initials}</span>
                        <span>${record.student}</span>
                    </div>
                </td>
                <td>${record.department}</td>
                <td>${record.company}</td>
                <td>${record.packageLpa.toFixed(1)}</td>
                <td><span class="tag ${getStatusClass(record.status)}">${formatStatus(record.status)}</span></td>
                <td><ion-icon name="ellipsis-vertical"></ion-icon></td>
            </tr>
        `).join('')
        : `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);">No records found for selected filter.</td></tr>`;
}

function bindEvents(app) {
    const filter = document.getElementById('admin-record-filter');
    const filterBtn = document.getElementById('admin-record-filter-btn');
    const filterPanel = document.getElementById('admin-record-filter-panel');
    const applyFilterBtn = document.getElementById('admin-apply-record-filter');
    const exportBtn = document.getElementById('admin-export-csv');
    const viewAllBtn = document.getElementById('admin-view-all-companies');

    filterBtn?.addEventListener('click', () => {
        if (filter) filter.value = dashboardState.statusFilter;
        filterPanel?.classList.toggle('hidden');
    });

    applyFilterBtn?.addEventListener('click', () => {
        dashboardState.statusFilter = filter?.value || 'all';
        filterPanel?.classList.add('hidden');
        renderRecentRecords();
    });

    exportBtn?.addEventListener('click', () => {
        const status = dashboardState.statusFilter;
        const rows = status === 'all'
            ? dashboardData.records
            : dashboardData.records.filter((record) => record.status === status);
        exportRecordsAsCsv(rows);
    });

    document.addEventListener('click', (event) => {
        if (!filterPanel || !filterBtn) return;
        const target = event.target;
        if (target instanceof Node && !filterPanel.contains(target) && !filterBtn.contains(target)) {
            filterPanel.classList.add('hidden');
        }
    });

    viewAllBtn?.addEventListener('click', () => app.navigateTo('companies'));
}

function initCharts() {
    const trendCanvas = document.getElementById('admin-placement-trend');
    if (trendCanvas) {
        new Chart(trendCanvas, {
            type: 'bar',
            data: {
                labels: dashboardData.trend.labels,
                datasets: [{
                    label: '2024 Placements',
                    data: dashboardData.trend.placements,
                    backgroundColor: ['#cfd8e3', '#bdc9d8', '#a5b4c7', '#788ca9', '#0f2f61', '#445e8f'],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top', align: 'end' } },
                scales: {
                    y: { grid: { color: '#eef2f7' }, ticks: { stepSize: 200 } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const tierCanvas = document.getElementById('admin-company-tier');
    if (tierCanvas) {
        new Chart(tierCanvas, {
            type: 'doughnut',
            data: {
                labels: dashboardData.tiers.map((tier) => tier.label),
                datasets: [{
                    data: dashboardData.tiers.map((tier) => tier.value),
                    backgroundColor: dashboardData.tiers.map((tier) => tier.color),
                    borderWidth: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: { legend: { display: false } }
            }
        });
    }
}

function exportRecordsAsCsv(rows) {
    const header = ['Student Name', 'Department', 'Company', 'Package (LPA)', 'Status'];
    const content = rows.map((row) => [
        row.student,
        row.department,
        row.company,
        row.packageLpa.toFixed(1),
        row.status
    ]);

    const csv = [header, ...content]
        .map((line) => line.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `placement-records-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function getTierTotal() {
    return dashboardData.tiers.reduce((sum, tier) => sum + tier.value, 0);
}

function getStatusClass(status) {
    const statusClassMap = {
        'in-progress': 'tag-warning',
        placed: 'tag-info',
        rejected: 'tag-danger'
    };

    return statusClassMap[status] || 'tag-info';
}

function formatStatus(status) {
    if (status === 'in-progress') return 'IN PROGRESS';
    return status.toUpperCase();
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-IN').format(value);
}
