import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = loadingHTML('Placements');
    try {
        const rows = await api.get('/coordinator/placements');
        console.log('[placements] count:', rows.length, rows[0]);
        renderShell(container, rows);
    } catch (err) {
        console.error('[placements] error:', err);
        container.innerHTML = errorHTML(err.message);
    }
}

function renderShell(container, rows) {
    const totalCTC = rows.reduce((s, r) => s + Number(r.ctc || 0), 0);
    const avgCTC   = rows.length ? (totalCTC / rows.length).toFixed(2) : '0.00';
    const maxCTC   = rows.length ? Math.max(...rows.map(r => Number(r.ctc || 0))).toFixed(2) : '0.00';

    container.innerHTML = `
        <div class="admin-dashboard-shell">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Placements</h1>
                    <p>${rows.length} confirmed placement${rows.length !== 1 ? 's' : ''} (accepted offers)</p>
                </div>
            </div>

            <div class="admin-stat-grid" style="margin-bottom:24px;">
                <div class="card admin-stat-card">
                    <div class="admin-stat-top"><div class="admin-stat-icon"><ion-icon name="trophy-outline"></ion-icon></div></div>
                    <div class="admin-stat-meta"><p>Placed Students</p><h2>${rows.length}</h2></div>
                </div>
                <div class="card admin-stat-card">
                    <div class="admin-stat-top"><div class="admin-stat-icon"><ion-icon name="trending-up-outline"></ion-icon></div></div>
                    <div class="admin-stat-meta"><p>Avg CTC</p><h2>₹${avgCTC}</h2></div>
                </div>
                <div class="card admin-stat-card admin-stat-card-highlight">
                    <div class="admin-stat-top"><div class="admin-stat-icon"><ion-icon name="star-outline"></ion-icon></div></div>
                    <div class="admin-stat-meta"><p>Highest CTC</p><h2>₹${maxCTC}</h2></div>
                </div>
            </div>

            <div class="card">
                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Department</th>
                                <th>CGPA</th>
                                <th>Company</th>
                                <th>Role</th>
                                <th>CTC (LPA)</th>
                                <th>Joining</th>
                                <th>Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.length ? rows.map(r => `
                                <tr>
                                    <td>
                                        <div class="admin-student-cell">
                                            <span class="admin-student-initials">${r.initials || '??'}</span>
                                            <div>
                                                <div style="font-weight:600;">${r.studentName || '—'}</div>
                                                <div style="font-size:0.75rem;color:var(--text-muted);">${r.industry || ''} ${r.tier ? '· ' + r.tier : ''}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="font-size:0.85rem;">${r.department || '—'}</td>
                                    <td><b>${r.cgpa || '—'}</b></td>
                                    <td><b>${r.company || '—'}</b></td>
                                    <td style="color:var(--text-muted);font-size:0.9rem;">${r.role || '—'}</td>
                                    <td style="color:var(--success);font-weight:800;font-size:1rem;">₹${Number(r.ctc || 0).toFixed(2)}</td>
                                    <td style="font-size:0.85rem;">${r.joiningDate || 'TBD'}</td>
                                    <td><span class="tag ${r.verified ? 'tag-success' : 'tag-warning'}">${r.verified ? 'VERIFIED' : 'PENDING'}</span></td>
                                </tr>
                            `).join('') : `
                                <tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted);">No confirmed placements yet.</td></tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function loadingHTML(p) {
    return `<div style="display:flex;align-items:center;justify-content:center;height:400px;flex-direction:column;gap:12px;color:var(--text-muted);">
        <ion-icon name="sync-outline" style="font-size:2.5rem;animation:spin 1s linear infinite;"></ion-icon>
        <p>Loading ${p}...</p></div>`;
}
function errorHTML(msg) {
    return `<div style="padding:40px;text-align:center;">
        <ion-icon name="alert-circle-outline" style="font-size:3rem;color:#ef4444;"></ion-icon>
        <h2 style="margin-top:16px;">Error loading placements</h2>
        <p style="color:var(--text-muted);margin-top:8px;">${msg}</p></div>`;
}
