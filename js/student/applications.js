// js/student/applications.js

const applicationsData = [
    { company: "Global Tech Solutions", role: "Software Engineer II", date: "Oct 12, 2024", score: 88, status: "Selected" },
    { company: "Nexus Analytics", role: "Data Scientist", date: "Oct 08, 2024", score: 92, status: "Interviewing" },
    { company: "FinBridge Systems", role: "Backend Developer", date: "Oct 05, 2024", score: 75, status: "Closed" },
    { company: "CloudScale AI", role: "DevOps Intern", date: "Sep 28, 2024", score: 65, status: "Rejected" },
    { company: "Amazon", role: "SDE Intern", date: "Sep 20, 2024", score: 94, status: "Shortlisted" },
    { company: "Meta", role: "Frontend Dev", date: "Sep 15, 2024", score: 91, status: "Applied" },
    { company: "Microsoft", role: "Software Engineer", date: "Sep 10, 2024", score: 85, status: "Interviewing" },
];

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">My Applications</h1>
            <p style="color: var(--text-muted);">Track the status of all your submitted applications.</p>
        </div>

        <div class="card" style="margin-bottom: 24px; padding: 12px;">
            <div style="display: flex; gap: 8px;" id="filter-buttons">
                <button class="role-option active" data-filter="all" style="padding: 8px 16px; width: auto;">All Applications</button>
                <button class="role-option" data-filter="Applied" style="padding: 8px 16px; width: auto;">Applied</button>
                <button class="role-option" data-filter="Shortlisted" style="padding: 8px 16px; width: auto;">Shortlisted</button>
                <button class="role-option" data-filter="Selected" style="padding: 8px 16px; width: auto;">Selected</button>
                <button class="role-option" data-filter="Rejected" style="padding: 8px 16px; width: auto;">Rejected</button>
            </div>
        </div>

        <div class="card">
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Applied Date</th>
                            <th>ATS Score</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="applications-tbody">
                        <!-- Rows injected here -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const tbody = document.getElementById('applications-tbody');
    const filterButtons = document.querySelectorAll('#filter-buttons .role-option');

    const updateTable = (filter) => {
        const filteredData = filter === 'all' 
            ? applicationsData 
            : applicationsData.filter(item => item.status === filter);
        
        tbody.innerHTML = filteredData.map(item => renderAppRow(item.company, item.role, item.date, item.score, item.status)).join('');
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateTable(btn.dataset.filter);
        });
    });

    // Initial render
    updateTable('all');
}

function renderAppRow(company, role, date, score, status) {
    const statusClasses = {
        'Selected': 'tag-success',
        'Interviewing': 'tag-warning',
        'Shortlisted': 'tag-info',
        'Rejected': 'tag-danger',
        'Closed': 'tag-danger',
        'Applied': 'tag-info'
    };

    return `
        <tr>
            <td style="font-weight: 600;">${company}</td>
            <td>${role}</td>
            <td>${date}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 700; color: ${score > 80 ? 'var(--success)' : 'var(--warning)'};">${score}%</span>
                    <div style="width: 60px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                        <div style="width: ${score}%; height: 100%; background: ${score > 80 ? 'var(--success)' : 'var(--warning)'};"></div>
                    </div>
                </div>
            </td>
            <td><span class="tag ${statusClasses[status] || 'tag-info'}">${status}</span></td>
            <td>
                <button style="background: transparent; border: none; font-size: 1.25rem; color: var(--text-muted); cursor: pointer;">
                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                </button>
            </td>
        </tr>
    `;
}
