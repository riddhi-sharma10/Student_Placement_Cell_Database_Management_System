// js/admin/normalization.js — Shows database normalization concepts

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Database Normalization</h1>
            <p style="color: var(--text-muted);">How our database is structured to avoid redundancy and ensure integrity</p>
        </div>

        <!-- 1NF -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="color: var(--primary); margin-bottom: 8px;">1NF — First Normal Form</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">Every column stores atomic (single) values. No comma-separated lists.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
                <div>
                    <p style="color:#ef4444;font-weight:700;margin-bottom:8px;">❌ Before 1NF (Bad)</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#fef2f2;">
                            <th style="padding:8px;border:1px solid #fecaca;text-align:left;">student_id</th>
                            <th style="padding:8px;border:1px solid #fecaca;text-align:left;">name</th>
                            <th style="padding:8px;border:1px solid #fecaca;text-align:left;background:#fee2e2;">skills (❌ list!)</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Riddhi</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">React, SQL, Node</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">Alex</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Python, Docker</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p style="color:#10b981;font-weight:700;margin-bottom:8px;">✅ After 1NF (Good)</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;text-align:left;">student_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;text-align:left;">skill</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">React</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">SQL</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Node.js</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">Python</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- 2NF -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="color: var(--primary); margin-bottom: 8px;">2NF — Second Normal Form</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">No partial dependencies. Every column depends on the FULL primary key.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
                <div>
                    <p style="color:#ef4444;font-weight:700;margin-bottom:8px;">❌ Before 2NF</p>
                    <p style="font-size:0.8rem;color:#94a3b8;margin-bottom:8px;">composite key: (student_id, job_id)</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#fef2f2;">
                            <th style="padding:8px;border:1px solid #fecaca;">student_id</th>
                            <th style="padding:8px;border:1px solid #fecaca;">job_id</th>
                            <th style="padding:8px;border:1px solid #fecaca;background:#fee2e2;">company_name ❌</th>
                            <th style="padding:8px;border:1px solid #fecaca;">status</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Google</td><td style="padding:8px;border:1px solid #e2e8f0;">Applied</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Google</td><td style="padding:8px;border:1px solid #e2e8f0;">Selected</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p style="color:#10b981;font-weight:700;margin-bottom:8px;">✅ After 2NF</p>
                    <p style="font-size:0.8rem;color:#94a3b8;margin-bottom:8px;">company moved to jobs table</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;margin-bottom:8px;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">student_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">job_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">status</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;">Applied</td></tr></tbody>
                    </table>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">job_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">company_name ✅</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;">Google</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- 3NF -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="color: var(--primary); margin-bottom: 8px;">3NF — Third Normal Form</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">No transitive dependencies. Non-key columns must depend only on the primary key.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
                <div>
                    <p style="color:#ef4444;font-weight:700;margin-bottom:8px;">❌ Before 3NF</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#fef2f2;">
                            <th style="padding:8px;border:1px solid #fecaca;">id</th>
                            <th style="padding:8px;border:1px solid #fecaca;">name</th>
                            <th style="padding:8px;border:1px solid #fecaca;">department</th>
                            <th style="padding:8px;border:1px solid #fecaca;background:#fee2e2;">hod_name ❌</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Riddhi</td><td style="padding:8px;border:1px solid #e2e8f0;">CSE</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Dr. Mehta</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">Alex</td><td style="padding:8px;border:1px solid #e2e8f0;">CSE</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Dr. Mehta</td></tr>
                        </tbody>
                    </table>
                    <p style="font-size:0.8rem;color:#94a3b8;margin-top:8px;">hod_name depends on department, not on student id</p>
                </div>
                <div>
                    <p style="color:#10b981;font-weight:700;margin-bottom:8px;">✅ After 3NF</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;margin-bottom:8px;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">name</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">dept_id ✅</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Riddhi</td><td style="padding:8px;border:1px solid #e2e8f0;">10</td></tr></tbody>
                    </table>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">dept_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">dept_name</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">hod_name ✅</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">10</td><td style="padding:8px;border:1px solid #e2e8f0;">CSE</td><td style="padding:8px;border:1px solid #e2e8f0;">Dr. Mehta</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Our Schema -->
        <div class="card">
            <h2 style="color: var(--primary); margin-bottom: 8px;">Our Database Schema (3NF Compliant)</h2>
            <p style="color: var(--text-muted); margin-bottom: 24px;">All tables in our system satisfy 1NF, 2NF, and 3NF</p>
            <div style="display:flex;gap:16px;flex-wrap:wrap;">
                ${renderSchemaTable('students', ['id (PK)', 'name', 'roll_no', 'cgpa', 'dept_id (FK)', 'coordinator_id (FK)'])}
                ${renderSchemaTable('departments', ['id (PK)', 'dept_name', 'hod_name'])}
                ${renderSchemaTable('coordinators', ['id (PK)', 'name', 'dept_id (FK)'])}
                ${renderSchemaTable('companies', ['id (PK)', 'name', 'industry', 'tier'])}
                ${renderSchemaTable('jobs', ['id (PK)', 'company_id (FK)', 'role', 'package', 'cgpa_cutoff'])}
                ${renderSchemaTable('applications', ['id (PK)', 'student_id (FK)', 'job_id (FK)', 'status', 'applied_date'])}
                ${renderSchemaTable('placements', ['id (PK)', 'student_id (FK)', 'company_id (FK)', 'package_lpa', 'offer_date'])}
                ${renderSchemaTable('student_skills', ['id (PK)', 'student_id (FK)', 'skill'])}
            </div>
        </div>
    `;
}

function renderSchemaTable(name, columns) {
    return `
        <div style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;min-width:160px;flex:1;">
            <div style="background:var(--primary);color:white;padding:10px 14px;font-weight:700;font-size:0.85rem;">${name}</div>
            <div>
                ${columns.map(col => `
                    <div style="padding:8px 14px;font-size:0.8rem;border-bottom:1px solid #f1f5f9;
                        color:${col.includes('PK') ? '#1B3A6B' : col.includes('FK') ? '#f59e0b' : '#475569'};
                        font-weight:${col.includes('PK') || col.includes('FK') ? '700' : '400'};">
                        ${col}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
