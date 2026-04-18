import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = loadingHTML('Offers');
    try {
        const rows = await api.get('/coordinator/offers');
        console.log('[offers] count:', rows.length, rows[0]);
        renderShell(container, rows);
    } catch (err) {
        console.error('[offers] error:', err);
        container.innerHTML = errorHTML(err.message);
    }
}

function renderShell(container, rows) {
    const accepted = rows.filter(r => r.status === 'accepted').length;
    const pending  = rows.filter(r => r.status === 'pending').length;
    const rejected = rows.filter(r => r.status === 'rejected').length;

    container.innerHTML = `
        <div class="admin-dashboard-shell">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Offer Letters</h1>
                    <p>${rows.length} offer${rows.length !== 1 ? 's' : ''} issued to your students</p>
                </div>
            </div>

            <div style="display:flex;gap:10px;margin-bottom:20px;">
                <span class="tag tag-success" style="padding:6px 14px;">Accepted: <b>${accepted}</b></span>
                <span class="tag tag-warning" style="padding:6px 14px;">Pending: <b>${pending}</b></span>
                <span class="tag tag-danger"  style="padding:6px 14px;">Rejected: <b>${rejected}</b></span>
            </div>

            <div class="card">
                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Dept</th>
                                <th>Company</th>
                                <th>Role</th>
                                <th>CTC (LPA)</th>
                                <th>Issued On</th>
                                <th>Joining Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.length ? rows.map(r => `
                                <tr>
                                    <td><b>${r.studentName || '—'}</b></td>
                                    <td style="color:var(--text-muted);font-size:0.85rem;">${r.dept || '—'}</td>
                                    <td>
                                        <div style="font-weight:600;">${r.company || '—'}</div>
                                        <div style="font-size:0.75rem;color:var(--text-muted);">${r.industry || ''} ${r.tier ? '· ' + r.tier : ''}</div>
                                    </td>
                                    <td style="font-size:0.9rem;">${r.role || '—'}</td>
                                    <td style="color:var(--success);font-weight:800;font-size:1rem;">₹${Number(r.ctc || 0).toFixed(2)}</td>
                                    <td style="font-size:0.85rem;">${r.issuedOn || '—'}</td>
                                    <td style="font-size:0.85rem;">${r.joiningDate || '—'}</td>
                                    <td><span class="tag ${statusTag(r.status)}">${String(r.status || '').toUpperCase()}</span></td>
                                </tr>
                            `).join('') : `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted);">No offers found.</td></tr>`}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function statusTag(s) {
    if (s === 'accepted') return 'tag-success';
    if (s === 'rejected') return 'tag-danger';
    return 'tag-warning';
}

function loadingHTML(p) {
    return `<div style="display:flex;align-items:center;justify-content:center;height:400px;flex-direction:column;gap:12px;color:var(--text-muted);">
        <ion-icon name="sync-outline" style="font-size:2.5rem;animation:spin 1s linear infinite;"></ion-icon>
        <p>Loading ${p}...</p></div>`;
}
function errorHTML(msg) {
    return `<div style="padding:40px;text-align:center;">
        <ion-icon name="alert-circle-outline" style="font-size:3rem;color:#ef4444;"></ion-icon>
        <h2 style="margin-top:16px;">Error loading offers</h2>
        <p style="color:var(--text-muted);margin-top:8px;">${msg}</p></div>`;
}
