import { api } from '../api.js';

let all = [], filtered = [], searchQ = '', statusF = 'all';

export async function render(container, app) {
    container.innerHTML = loadingHTML('Applications');
    try {
        all = await api.get('/coordinator/applications');
        console.log('[applications] count:', all.length, all[0]);
        filtered = [...all];
        renderShell(container);
    } catch (err) {
        console.error('[applications] error:', err);
        container.innerHTML = errorHTML(err.message);
    }
}

function renderShell(container) {
    const counts = {
        all: all.length,
        applied: all.filter(a => a.status === 'applied').length,
        shortlisted: all.filter(a => a.status === 'shortlisted').length,
        selected: all.filter(a => a.status === 'selected').length,
        rejected: all.filter(a => a.status === 'rejected').length,
        under_review: all.filter(a => a.status === 'under_review').length
    };

    container.innerHTML = `
        <div class="admin-dashboard-shell">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Applications</h1>
                    <p>${all.length} total applications from your students</p>
                </div>
                <div style="display:flex;gap:10px;align-items:center;">
                    <input id="app-search" type="text" placeholder="Search student, company or role..."
                        value="${searchQ}"
                        style="padding:9px 16px;border:1px solid #e2e8f0;border-radius:8px;width:280px;font-size:0.9rem;outline:none;">
                    <div style="position:relative;">
                        <button id="app-filter-btn" class="admin-user-action">
                            <ion-icon name="funnel-outline"></ion-icon> Filter
                        </button>
                        <div id="app-filter-panel" class="admin-filter-panel hidden"
                             style="position:absolute;right:0;top:calc(100%+8px);z-index:200;background:white;border:1px solid #e2e8f0;border-radius:12px;padding:16px;width:200px;box-shadow:0 8px 24px rgba(0,0,0,0.1);">
                            <label style="font-size:0.75rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:8px;">STATUS</label>
                            <select id="app-status-sel" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:12px;">
                                <option value="all"         ${statusF==='all'?'selected':''}>All (${counts.all})</option>
                                <option value="applied"     ${statusF==='applied'?'selected':''}>Applied (${counts.applied})</option>
                                <option value="under_review"${statusF==='under_review'?'selected':''}>Under Review (${counts.under_review})</option>
                                <option value="shortlisted" ${statusF==='shortlisted'?'selected':''}>Shortlisted (${counts.shortlisted})</option>
                                <option value="selected"    ${statusF==='selected'?'selected':''}>Selected (${counts.selected})</option>
                                <option value="rejected"    ${statusF==='rejected'?'selected':''}>Rejected (${counts.rejected})</option>
                            </select>
                            <button id="app-apply-filter" class="btn-primary" style="width:100%;padding:8px;border-radius:6px;">Apply</button>
                        </div>
                    </div>
                </div>
            </div>

            <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
                <span class="tag tag-info"    style="padding:6px 14px;">Applied: <b>${counts.applied}</b></span>
                <span class="tag tag-warning" style="padding:6px 14px;">Under Review: <b>${counts.under_review}</b></span>
                <span class="tag tag-info"    style="padding:6px 14px;">Shortlisted: <b>${counts.shortlisted}</b></span>
                <span class="tag tag-success" style="padding:6px 14px;">Selected: <b>${counts.selected}</b></span>
                <span class="tag tag-danger"  style="padding:6px 14px;">Rejected: <b>${counts.rejected}</b></span>
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
                                <th>Package (LPA)</th>
                                <th>ATS Score</th>
                                <th>Applied On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="app-tbody">${appRows()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    wireEvents(container);
}

function appRows() {
    if (!filtered.length) return `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted);">No applications found.</td></tr>`;
    return filtered.map(a => `
        <tr>
            <td><b>${a.studentName || '—'}</b></td>
            <td style="color:var(--text-muted);font-size:0.85rem;">${a.dept || '—'}</td>
            <td>${a.company || '—'}</td>
            <td style="font-size:0.9rem;">${a.role || '—'}</td>
            <td style="color:var(--success);font-weight:700;">${a.packageLpa ? '₹' + Number(a.packageLpa).toFixed(1) : '—'}</td>
            <td>${a.atsScore != null
                ? `<span class="tag ${Number(a.atsScore) >= 70 ? 'tag-success' : Number(a.atsScore) >= 50 ? 'tag-warning' : 'tag-danger'}">${Number(a.atsScore).toFixed(0)}%</span>`
                : '<span style="color:var(--text-muted);">—</span>'}</td>
            <td style="font-size:0.85rem;color:var(--text-muted);">${a.appliedDate || '—'}</td>
            <td><span class="tag ${statusTag(a.status)}">${String(a.status || '').replace('_',' ').toUpperCase()}</span></td>
        </tr>
    `).join('');
}

function statusTag(s) {
    if (s === 'selected')    return 'tag-success';
    if (s === 'rejected')    return 'tag-danger';
    if (s === 'shortlisted' || s === 'under_review') return 'tag-info';
    return 'tag-warning';
}

function wireEvents(container) {
    const searchInp   = container.querySelector('#app-search');
    const filterBtn   = container.querySelector('#app-filter-btn');
    const filterPanel = container.querySelector('#app-filter-panel');
    const applyBtn    = container.querySelector('#app-apply-filter');

    searchInp?.addEventListener('input', e => {
        searchQ = e.target.value.toLowerCase();
        applyFilters();
        const tb = document.getElementById('app-tbody');
        if (tb) tb.innerHTML = appRows();
    });
    filterBtn?.addEventListener('click', () => filterPanel?.classList.toggle('hidden'));
    applyBtn?.addEventListener('click', () => {
        statusF = container.querySelector('#app-status-sel')?.value || 'all';
        filterPanel?.classList.add('hidden');
        applyFilters();
        const tb = document.getElementById('app-tbody');
        if (tb) tb.innerHTML = appRows();
    });
    document.addEventListener('click', e => {
        if (!filterPanel?.contains(e.target) && !filterBtn?.contains(e.target))
            filterPanel?.classList.add('hidden');
    });
}

function applyFilters() {
    filtered = all.filter(a => {
        const sm = !searchQ ||
            (a.studentName || '').toLowerCase().includes(searchQ) ||
            (a.company || '').toLowerCase().includes(searchQ) ||
            (a.role || '').toLowerCase().includes(searchQ);
        const fm = statusF === 'all' || a.status === statusF;
        return sm && fm;
    });
}

function loadingHTML(p) {
    return `<div style="display:flex;align-items:center;justify-content:center;height:400px;flex-direction:column;gap:12px;color:var(--text-muted);">
        <ion-icon name="sync-outline" style="font-size:2.5rem;animation:spin 1s linear infinite;"></ion-icon>
        <p>Loading ${p}...</p></div>`;
}
function errorHTML(msg) {
    return `<div style="padding:40px;text-align:center;">
        <ion-icon name="alert-circle-outline" style="font-size:3rem;color:#ef4444;"></ion-icon>
        <h2 style="margin-top:16px;">Error loading applications</h2>
        <p style="color:var(--text-muted);margin-top:8px;">${msg}</p></div>`;
}
