// js/coordinator/jobs.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Job Profiles & Applicants</h1>
            <p style="color: var(--text-muted);">Monitor recruitment progress and review student applications for each profile.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <h2 style="font-size: 1.25rem;">Active Profiles</h2>
                ${renderJobManageCard("Google", "Software Engineer", 120, "Open", true)}
                ${renderJobManageCard("Amazon", "SDE Intern", 450, "Open", false)}
                ${renderJobManageCard("TCS", "Digital Role", 1200, "Closed", false)}
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h3>Applicant Details: Google SDE</h3>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn-primary" style="padding: 6px 12px; font-size: 0.75rem;">Export CSV</button>
                        <button class="btn-primary" style="padding: 6px 12px; font-size: 0.75rem;">Bulk Action</button>
                    </div>
                </div>

                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>CGPA</th>
                                <th>Skills</th>
                                <th>ATS</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${renderApplicantRow("Riddhi Sharma", "9.82", "React, Node, SQL", "94%", "Shortlisted")}
                            ${renderApplicantRow("Alex Sterling", "9.42", "Python, AWS", "88%", "Under Review")}
                            ${renderApplicantRow("Sara Chen", "8.95", "Java, Docker", "92%", "Interviewing")}
                            ${renderApplicantRow("Aman Verma", "7.80", "C++, Linux", "65%", "Rejected")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderJobManageCard(company, role, apps, status, isActive) {
    return `
        <div class="card" style="cursor: pointer; border: 2px solid ${isActive ? 'var(--primary)' : 'transparent'}; background: ${isActive ? '#f0f7ff' : 'var(--white)'}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="font-size: 1rem;">${company}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">${role}</p>
                </div>
                <span class="tag ${status === 'Open' ? 'tag-success' : 'tag-info'}">${status}</span>
            </div>
            <div style="margin-top: 12px; font-size: 0.85rem; color: var(--primary); font-weight: 700;">
                ${apps} Applicants
            </div>
        </div>
    `;
}

function renderApplicantRow(name, cgpa, skills, score, status) {
    const statusClasses = {
        'Shortlisted': 'tag-info',
        'Under Review': 'tag-warning',
        'Interviewing': 'tag-success',
        'Rejected': 'tag-danger'
    };
    return `
        <tr>
            <td style="font-weight: 600;">${name}</td>
            <td>${cgpa}</td>
            <td style="font-size: 0.8rem; color: var(--text-muted); max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${skills}</td>
            <td><span style="font-weight: 700;">${score}</span></td>
            <td><span class="tag ${statusClasses[status]}">${status}</span></td>
        </tr>
    `;
}
