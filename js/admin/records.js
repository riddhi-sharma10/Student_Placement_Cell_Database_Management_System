// js/admin/records.js

const recordsByYear = {
    '2023-24': {
        title: 'Academic Year 2023-24',
        subtitle: 'Strong placement cycle with a healthy mix of Tier 1 and growing product companies.',
        stats: {
            placements: 512,
            offers: 684,
            companies: 84,
            averagePackage: '12.4 LPA'
        },
        records: [
            { student: 'Jonathan Doe', department: 'Computer Science', company: 'Microsoft', packageLpa: 24.5, status: 'Placed' },
            { student: 'Alice Miller', department: 'Mechanical Engineering', company: 'Tesla Inc.', packageLpa: 18.0, status: 'Placed' },
            { student: 'Samuel Reed', department: 'Electronics and Communication Engineering', company: 'JP Morgan', packageLpa: 14.2, status: 'Placed' },
            { student: 'Emma Lee', department: 'Electronics and Communication Engineering', company: 'Intel Corp', packageLpa: 21.5, status: 'Rejected' },
            { student: 'Rohan Kapoor', department: 'Computer Science', company: 'Amazon', packageLpa: 31.0, status: 'In Progress' }
        ]
    },
    '2022-23': {
        title: 'Academic Year 2022-23',
        subtitle: 'Stable placement volume with improved participation from service and consulting partners.',
        stats: {
            placements: 468,
            offers: 611,
            companies: 76,
            averagePackage: '11.1 LPA'
        },
        records: [
            { student: 'Meera Iyer', department: 'Computer Science', company: 'Deloitte', packageLpa: 16.4, status: 'Placed' },
            { student: 'Aman Desai', department: 'Electronics and Communication Engineering', company: 'Infosys', packageLpa: 6.8, status: 'Placed' },
            { student: 'Priya Nair', department: 'Computer Science', company: 'Cisco', packageLpa: 15.2, status: 'Placed' },
            { student: 'Varun Sethi', department: 'Mechanical Engineering', company: 'Bosch', packageLpa: 9.4, status: 'In Progress' },
            { student: 'Karan Patel', department: 'Electronics and Communication Engineering', company: 'Wipro', packageLpa: 5.2, status: 'Rejected' }
        ]
    },
    '2021-22': {
        title: 'Academic Year 2021-22',
        subtitle: 'Rebuilding year with consistent recruiting activity and improved campus engagement.',
        stats: {
            placements: 414,
            offers: 553,
            companies: 68,
            averagePackage: '9.8 LPA'
        },
        records: [
            { student: 'Ananya Rao', department: 'Computer Science', company: 'TCS', packageLpa: 4.2, status: 'Placed' },
            { student: 'Nidhi Kapoor', department: 'Electronics and Communication Engineering', company: 'Capgemini', packageLpa: 7.1, status: 'Placed' },
            { student: 'Tobias Reed', department: 'Mechanical Engineering', company: 'HCL', packageLpa: 6.4, status: 'Placed' },
            { student: 'Faiz Alam', department: 'Computer Science', company: 'Accenture', packageLpa: 8.5, status: 'In Progress' },
            { student: 'Ishita Roy', department: 'Electronics and Communication Engineering', company: 'Cognizant', packageLpa: 5.8, status: 'Rejected' }
        ]
    }
};

const recordsState = {
    activeYear: '2023-24',
    query: '',
    status: 'all',
    department: 'all'
};

export function render(container, app) {
    const current = recordsByYear[recordsState.activeYear];
    const filteredRecords = getFilteredRecords(current.records);
    const statusSummary = getStatusSummary(current.records);
    const departmentOptions = Array.from(new Set(current.records.map((record) => record.department)));
    const placementRate = getPlacementRate(current.records);
    const highestPackage = getHighestPackage(current.records);
    const topRecruiter = getTopRecruiter(current.records);

    container.innerHTML = `
        <div class="admin-dashboard-shell admin-records-shell">
            <div class="admin-dashboard-header admin-records-header">
                <div>
                    <h1>Year-wise Placement Records</h1>
                    <p>Historical placement performance arranged by academic year and matched to the admin theme.</p>
                </div>
            </div>

            <div class="card admin-record-hero">
                <div class="admin-record-hero-top">
                    <div>
                        <p class="admin-record-label">Selected Archive</p>
                        <h2>${current.title}</h2>
                        <p>${current.subtitle}</p>
                    </div>
                    <div class="admin-record-year-group" id="admin-record-year-group">
                        ${Object.keys(recordsByYear).map((year) => `
                            <button type="button" class="admin-year-pill ${year === recordsState.activeYear ? 'active' : ''}" data-year="${year}">${year}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="admin-record-stats">
                    <div class="admin-record-stat">
                        <span>Total Placements</span>
                        <strong>${formatNumber(current.stats.placements)}</strong>
                    </div>
                    <div class="admin-record-stat">
                        <span>Total Offers</span>
                        <strong>${formatNumber(current.stats.offers)}</strong>
                    </div>
                    <div class="admin-record-stat">
                        <span>Hiring Companies</span>
                        <strong>${formatNumber(current.stats.companies)}</strong>
                    </div>
                    <div class="admin-record-stat admin-record-stat-accent">
                        <span>Average Package</span>
                        <strong>${current.stats.averagePackage}</strong>
                    </div>
                    <div class="admin-record-stat">
                        <span>Highest Package</span>
                        <strong>${highestPackage.toFixed(1)} LPA</strong>
                    </div>
                </div>
            </div>

            <div class="admin-grid-two admin-grid-balance">
                <div class="card admin-record-flow-card">
                    <div class="admin-card-head">
                        <h3>Placement Flow</h3>
                        <span>How the cycle moved across the year</span>
                    </div>
                    <div class="admin-record-flow">
                        <div class="admin-record-flow-step">
                            <span>1</span>
                            <div>
                                <strong>Registration</strong>
                                <p>Students complete profile and eligibility checks.</p>
                            </div>
                        </div>
                        <div class="admin-record-flow-step">
                            <span>2</span>
                            <div>
                                <strong>Shortlisting</strong>
                                <p>Companies review applications and shortlist candidates.</p>
                            </div>
                        </div>
                        <div class="admin-record-flow-step">
                            <span>3</span>
                            <div>
                                <strong>Interviews</strong>
                                <p>Technical and HR rounds are tracked through the cycle.</p>
                            </div>
                        </div>
                        <div class="admin-record-flow-step">
                            <span>4</span>
                            <div>
                                <strong>Final Outcome</strong>
                                <p>Placed, in-progress, or rejected status is updated.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card admin-record-summary-card">
                    <div class="admin-card-head">
                        <h3>Archive Summary</h3>
                        <span>Quick snapshot for the selected year</span>
                    </div>
                    <div class="admin-record-summary-list">
                        <div>
                            <span>Archive</span>
                            <strong>${recordsState.activeYear}</strong>
                        </div>
                        <div>
                            <span>Placement ratio</span>
                            <strong>${placementRate}% placed</strong>
                        </div>
                        <div>
                            <span>Top recruiter</span>
                            <strong>${topRecruiter}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card admin-record-table-card">
                <div class="admin-card-head admin-card-head-inline">
                    <div>
                        <h3>Placement Records</h3>
                        <span>Detailed records for ${recordsState.activeYear}</span>
                    </div>
                    <span class="admin-record-pill">${formatNumber(filteredRecords.length)} / ${formatNumber(current.records.length)} entries</span>
                </div>

                <div class="admin-record-controls">
                    <div class="admin-record-search">
                        <ion-icon name="search-outline"></ion-icon>
                        <input id="admin-record-search" type="text" placeholder="Search student, department, company..." value="${recordsState.query}">
                    </div>

                    <select id="admin-record-status-filter" aria-label="Filter by record status">
                        <option value="all" ${recordsState.status === 'all' ? 'selected' : ''}>All Status</option>
                        <option value="Placed" ${recordsState.status === 'Placed' ? 'selected' : ''}>Placed</option>
                        <option value="In Progress" ${recordsState.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Rejected" ${recordsState.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    </select>

                    <select id="admin-record-dept-filter" aria-label="Filter by department">
                        <option value="all" ${recordsState.department === 'all' ? 'selected' : ''}>All Departments</option>
                        ${departmentOptions.map((department) => `<option value="${department}" ${recordsState.department === department ? 'selected' : ''}>${department}</option>`).join('')}
                    </select>
                </div>

                <div class="admin-record-status-row">
                    ${renderStatusChip('all', 'All', current.records.length)}
                    ${renderStatusChip('Placed', 'Placed', statusSummary.Placed)}
                    ${renderStatusChip('In Progress', 'In Progress', statusSummary['In Progress'])}
                    ${renderStatusChip('Rejected', 'Rejected', statusSummary.Rejected)}
                </div>

                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Department</th>
                                <th>Company</th>
                                <th>Package (LPA)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredRecords.length ? filteredRecords.map((record) => `
                                    <tr>
                                        <td>
                                            <div class="admin-record-student">
                                                <div class="admin-record-avatar">${getInitials(record.student)}</div>
                                                <strong>${record.student}</strong>
                                            </div>
                                        </td>
                                        <td>${record.department}</td>
                                        <td>${record.company}</td>
                                        <td>${record.packageLpa.toFixed(1)}</td>
                                        <td><span class="tag ${getStatusTag(record.status)}">${record.status}</span></td>
                                    </tr>
                                `).join('')
                                : `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">No records match your filters.</td></tr>`}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    bindInteractions(container, app);
}

function bindInteractions(container, app) {
    container.querySelectorAll('.admin-year-pill').forEach((button) => {
        button.addEventListener('click', () => {
            recordsState.activeYear = button.dataset.year;
            recordsState.query = '';
            recordsState.status = 'all';
            recordsState.department = 'all';
            render(container, app);
        });
    });

    container.querySelector('#admin-record-search')?.addEventListener('input', (event) => {
        recordsState.query = event.target.value.trim();
        render(container, app);
    });

    container.querySelector('#admin-record-status-filter')?.addEventListener('change', (event) => {
        recordsState.status = event.target.value;
        render(container, app);
    });

    container.querySelector('#admin-record-dept-filter')?.addEventListener('change', (event) => {
        recordsState.department = event.target.value;
        render(container, app);
    });

    container.querySelectorAll('.admin-record-chip').forEach((button) => {
        button.addEventListener('click', () => {
            recordsState.status = button.dataset.status;
            render(container, app);
        });
    });
}

function getFilteredRecords(records) {
    const query = recordsState.query.toLowerCase();

    return records.filter((record) => {
        const queryMatch = !query || [
            record.student,
            record.department,
            record.company,
            record.status,
            record.packageLpa
        ].some((value) => String(value).toLowerCase().includes(query));

        const statusMatch = recordsState.status === 'all' || record.status === recordsState.status;
        const departmentMatch = recordsState.department === 'all' || record.department === recordsState.department;

        return queryMatch && statusMatch && departmentMatch;
    });
}

function getStatusSummary(records) {
    return records.reduce((acc, record) => {
        const key = record.status;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, { Placed: 0, 'In Progress': 0, Rejected: 0 });
}

function getPlacementRate(records) {
    if (!records.length) return '0.0';
    const placed = records.filter((record) => record.status === 'Placed').length;
    return ((placed / records.length) * 100).toFixed(1);
}

function getHighestPackage(records) {
    if (!records.length) return 0;
    return Math.max(...records.map((record) => record.packageLpa));
}

function getTopRecruiter(records) {
    if (!records.length) return '-';

    const counts = records.reduce((acc, record) => {
        acc[record.company] = (acc[record.company] || 0) + 1;
        return acc;
    }, {});

    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return `${top[0]} (${top[1]})`;
}

function renderStatusChip(status, label, count) {
    return `
        <button type="button" class="admin-record-chip ${recordsState.status === status ? 'active' : ''}" data-status="${status}">
            ${label}
            <span>${count}</span>
        </button>
    `;
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-IN').format(value);
}

function getInitials(name) {
    return name.split(' ').slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase();
}

function getStatusTag(status) {
    if (status === 'Placed') return 'tag-success';
    if (status === 'In Progress') return 'tag-warning';
    return 'tag-danger';
}
