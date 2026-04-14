// js/coordinator/applications.js — PAGE 4: APPLICATIONS

import { allApplications as baseApps, students } from './data.js';

// Work on a mutable copy
let applications = baseApps.map(a => ({ ...a }));

let searchQuery = '';
let filterStatus  = 'All';
let filterCompany = 'All';
let dateFrom      = '';
let dateTo        = '';
let sortCol       = 'appliedDate';
let sortDir       = 'desc';
let selectedRows  = new Set();

const STATUSES  = ['All','Applied','Shortlisted','Interview','Selected','Rejected'];
const COMPANIES = ['All', ...new Set(baseApps.map(a => a.company))];

export function render(container, app) {
  renderPage(container);
}

function renderPage(container) {
  const filtered = getFiltered();

  const totals = {
    total:       filtered.length,
    shortlisted: filtered.filter(a => a.status === 'Shortlisted').length,
    interview:   filtered.filter(a => a.status === 'Interview').length,
    selected:    filtered.filter(a => a.status === 'Selected').length,
    rejected:    filtered.filter(a => a.status === 'Rejected').length,
  };

  // clear orphan selections
  filtered.forEach(a => { if (!filtered.find(x => x.id === a.id)) selectedRows.delete(a.id); });

  container.innerHTML = `
    <div class="coord-page-header">
      <div>
        <h1 class="coord-page-title">Applications</h1>
        <p class="coord-page-sub">Track and manage all applications for your 10 assigned students</p>
      </div>
      <button class="coord-export-btn" id="export-csv-btn">
        <ion-icon name="download-outline"></ion-icon> Export CSV
      </button>
    </div>

    <!-- Summary Strip -->
    <div class="coord-summary-strip">
      ${renderChip('Total',       totals.total,       'All',         filterStatus === 'All')}
      ${renderChip('Shortlisted', totals.shortlisted,  'Shortlisted', filterStatus === 'Shortlisted')}
      ${renderChip('Interviews',  totals.interview,    'Interview',   filterStatus === 'Interview')}
      ${renderChip('Selected',    totals.selected,     'Selected',    filterStatus === 'Selected')}
      ${renderChip('Rejected',    totals.rejected,     'Rejected',    filterStatus === 'Rejected')}
    </div>

    <!-- Filter Bar (Redesigned) -->
    <div class="card" style="padding: 20px; border-radius: 14px; margin-bottom: 24px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
      <div style="flex: 1; min-width: 250px; position: relative;">
        <ion-icon name="search-outline" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 1.1rem;"></ion-icon>
        <input id="app-search" type="text" placeholder="Search by student name, role or company..." value="${escapeHtml(searchQuery)}" style="width: 100%; padding: 12px 16px 12px 44px; border: 1px solid var(--border); border-radius: 10px; font-family: inherit; font-size: 0.9rem; outline: none; transition: border-color 0.2s; background: #f8fafc;">
      </div>
      
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <select id="app-status" style="padding: 12px 16px; border: 1px solid var(--border); border-radius: 10px; outline: none; font-family: inherit; font-size: 0.9rem; min-width: 140px; background: white; cursor: pointer;">
          ${STATUSES.map(s => `<option value="${s}" ${filterStatus === s ? 'selected':''}>${s}</option>`).join('')}
        </select>
        
        <select id="app-company" style="padding: 12px 16px; border: 1px solid var(--border); border-radius: 10px; outline: none; font-family: inherit; font-size: 0.9rem; min-width: 140px; background: white; cursor: pointer;">
          ${COMPANIES.map(c => `<option value="${c}" ${filterCompany === c ? 'selected':''}>${c}</option>`).join('')}
        </select>
        
        <div style="display: flex; align-items: center; gap: 8px;">
          <input id="app-date-from" type="date" value="${dateFrom}" style="padding: 11px 12px; border: 1px solid var(--border); border-radius: 10px; outline: none; font-family: inherit; font-size: 0.85rem; background: white;">
          <span style="color: #94a3b8; font-size: 0.8rem;">to</span>
          <input id="app-date-to" type="date" value="${dateTo}" style="padding: 11px 12px; border: 1px solid var(--border); border-radius: 10px; outline: none; font-family: inherit; font-size: 0.85rem; background: white;">
        </div>

        <button id="app-reset" style="padding: 12px 18px; background: #f1f5f9; color: #475569; border: none; border-radius: 10px; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 6px; cursor: pointer; transition: background 0.2s;">
          <ion-icon name="refresh-outline"></ion-icon> Reset
        </button>
      </div>
    </div>

    <!-- Bulk Actions (visible when rows selected) -->
    <div class="coord-bulk-bar ${selectedRows.size > 0 ? '' : 'hidden'}" id="bulk-bar">
      <span><b>${selectedRows.size}</b> row(s) selected</span>
      <div class="coord-bulk-actions">
        <select id="bulk-status-select" class="coord-select" style="min-width:160px">
          <option value="">— Set Status —</option>
          ${['Applied','Shortlisted','Interview','Selected','Rejected'].map(s =>
            `<option value="${s}">${s}</option>`).join('')}
        </select>
        <button class="btn-primary" id="bulk-apply-btn" style="padding:8px 16px">Apply</button>
        <button class="coord-reset-btn" id="bulk-clear-btn">Clear</button>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="overflow:hidden">
      <div class="data-table-container">
        <table class="coord-table">
          <thead>
            <tr>
              <th style="width:40px"><input type="checkbox" id="select-all-chk"></th>
              ${renderTh('Student',     'studentName')}
              ${renderTh('Company',     'company')}
              ${renderTh('Role',        'role')}
              ${renderTh('Applied Date','appliedDate')}
              ${renderTh('ATS Score',   'atsScore')}
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody id="app-table-body">
            ${filtered.map(a => renderAppRow(a)).join('')}
            ${filtered.length === 0 ? `
              <tr><td colspan="8" style="text-align:center;padding:40px;color:#94a3b8">
                No applications match the current filters
              </td></tr>
            ` : ''}
          </tbody>
        </table>
      </div>
      <div class="coord-table-footer">
        Showing <b>${filtered.length}</b> of <b>${applications.length}</b> applications
      </div>
    </div>
  `;

  attachEvents(container, filtered);
}

function renderTh(label, col) {
  const active = sortCol === col;
  const arrow  = active ? (sortDir === 'asc' ? '↑' : '↓') : '';
  return `<th class="coord-sortable ${active ? 'sort-active' : ''}" data-col="${col}">${label} ${arrow}</th>`;
}

function renderChip(label, count, filter, active) {
  return `
    <button class="coord-summary-chip ${active ? 'active' : ''}" data-filter="${filter}">
      <span class="coord-chip-num">${count}</span>
      <span class="coord-chip-label">${label}</span>
    </button>
  `;
}

function renderAppRow(a) {
  const checked = selectedRows.has(a.id) ? 'checked' : '';
  return `
    <tr class="coord-table-row ${selectedRows.has(a.id) ? 'row-selected' : ''}" data-app-id="${a.id}">
      <td><input type="checkbox" class="row-chk" data-app-id="${a.id}" ${checked}></td>
      <td>
        <div class="coord-student-cell">
          <div class="coord-avatar-sm" style="background:${stuAvatarBg(a.studentId)}">${stuAvatar(a.studentId)}</div>
          <div>
            <b>${a.studentName}</b>
            <div class="coord-muted" style="font-size:0.75rem">CGPA ${a.studentCGPA}</div>
          </div>
        </div>
      </td>
      <td><b>${a.company}</b></td>
      <td class="coord-muted">${a.role}</td>
      <td class="coord-muted">${a.appliedDate}</td>
      <td>
        <span class="coord-ats ${a.atsScore >= 85 ? 'high' : a.atsScore >= 70 ? 'mid' : 'low'}">${a.atsScore}</span>
      </td>
      <td>${statusBadge(a.status)}</td>
      <td>
        <select class="coord-status-update" data-app-id="${a.id}">
          ${['Applied','Shortlisted','Interview','Selected','Rejected'].map(s =>
            `<option value="${s}" ${a.status === s ? 'selected' : ''}>${s}</option>`
          ).join('')}
        </select>
      </td>
    </tr>
  `;
}

function attachEvents(container, filtered) {
  // Summary chips
  container.querySelectorAll('.coord-summary-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      filterStatus = chip.dataset.filter;
      renderPage(container);
    });
  });

  // Filters
  container.querySelector('#app-search').addEventListener('input', e => {
    searchQuery = e.target.value; renderPage(container);
  });
  container.querySelector('#app-status').addEventListener('change', e => {
    filterStatus = e.target.value; renderPage(container);
  });
  container.querySelector('#app-company').addEventListener('change', e => {
    filterCompany = e.target.value; renderPage(container);
  });
  container.querySelector('#app-date-from').addEventListener('input', e => {
    dateFrom = e.target.value; renderPage(container);
  });
  container.querySelector('#app-date-to').addEventListener('input', e => {
    dateTo = e.target.value; renderPage(container);
  });
  container.querySelector('#app-reset').addEventListener('click', () => {
    searchQuery = ''; filterStatus = 'All'; filterCompany = 'All'; dateFrom = ''; dateTo = '';
    selectedRows.clear(); renderPage(container);
  });

  // Sortable columns
  container.querySelectorAll('.coord-sortable').forEach(th => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      else { sortCol = col; sortDir = 'asc'; }
      renderPage(container);
    });
  });

  // Select all
  const selectAll = container.querySelector('#select-all-chk');
  selectAll.addEventListener('change', () => {
    if (selectAll.checked) filtered.forEach(a => selectedRows.add(a.id));
    else filtered.forEach(a => selectedRows.delete(a.id));
    renderPage(container);
  });

  // Row checkboxes
  container.querySelectorAll('.row-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      const id = parseInt(chk.dataset.appId);
      if (chk.checked) selectedRows.add(id);
      else selectedRows.delete(id);
      renderPage(container);
    });
  });

  // Inline status update
  container.querySelectorAll('.coord-status-update').forEach(sel => {
    sel.addEventListener('change', e => {
      const id = parseInt(sel.dataset.appId);
      const app = applications.find(a => a.id === id);
      if (app) app.status = e.target.value;
      renderPage(container);
    });
  });

  // Bulk bar
  const bulkApply = container.querySelector('#bulk-apply-btn');
  const bulkClear = container.querySelector('#bulk-clear-btn');
  const bulkSel   = container.querySelector('#bulk-status-select');

  if (bulkApply) {
    bulkApply.addEventListener('click', () => {
      const newStatus = bulkSel?.value;
      if (!newStatus) return;
      selectedRows.forEach(id => {
        const app = applications.find(a => a.id === id);
        if (app) app.status = newStatus;
      });
      selectedRows.clear();
      renderPage(container);
    });
  }
  if (bulkClear) {
    bulkClear.addEventListener('click', () => {
      selectedRows.clear(); renderPage(container);
    });
  }

  // Export CSV
  container.querySelector('#export-csv-btn').addEventListener('click', () => exportCSV(filtered));
}

function getFiltered() {
  return applications.filter(a => {
    const q = searchQuery.toLowerCase();
    const searchMatch = !q || a.studentName.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.company.toLowerCase().includes(q);
    const statusOk  = filterStatus === 'All' || a.status === filterStatus;
    const companyOk = filterCompany === 'All' || a.company === filterCompany;
    const fromOk    = !dateFrom || parseDate(a.appliedDate) >= new Date(dateFrom);
    const toOk      = !dateTo   || parseDate(a.appliedDate) <= new Date(dateTo);
    return searchMatch && statusOk && companyOk && fromOk && toOk;
  }).sort((a, b) => {
    let av = a[sortCol], bv = b[sortCol];
    if (sortCol === 'atsScore' || sortCol === 'studentCGPA') { av = +av; bv = +bv; }
    if (sortCol === 'appliedDate') { av = parseDate(av); bv = parseDate(bv); }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

function parseDate(str) {
  const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
  const parts = str.split(' ');
  if (parts.length === 3) return new Date(parseInt(parts[2]), months[parts[0]], parseInt(parts[1]));
  return new Date(str);
}

function statusBadge(status) {
  const map = {
    'Selected':    '<span class="tag tag-success" style="border-radius:20px; padding:4px 12px; font-weight:600">Selected</span>',
    'Interview':   '<span class="tag tag-warning" style="border-radius:20px; padding:4px 12px; font-weight:600">Interview</span>',
    'Shortlisted': '<span class="tag tag-info" style="border-radius:20px; padding:4px 12px; font-weight:600">Shortlisted</span>',
    'Applied':     '<span class="tag" style="background:#f1f5f9;color:#475569; border-radius:20px; padding:4px 12px; font-weight:600">Applied</span>',
    'Rejected':    '<span class="tag tag-danger" style="border-radius:20px; padding:4px 12px; font-weight:600">Rejected</span>',
  };
  return map[status] || `<span class="tag" style="border-radius:20px; padding:4px 12px; font-weight:600">${status}</span>`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function exportCSV(rows) {
  const headers = ['Student','Company','Role','Applied Date','ATS Score','Status'];
  const csv = [headers, ...rows.map(a => [
    a.studentName, a.company, a.role, a.appliedDate, a.atsScore, a.status
  ])].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'applications_export.csv'; link.click();
  URL.revokeObjectURL(url);
}

const palette = ['#1B3A6B','#2c5282','#10b981','#F5A623','#7c3aed','#ef4444','#0284c7','#f59e0b','#059669','#dc2626'];
const stuAvatarBg = id => palette[(id - 1) % palette.length];
function stuAvatar(id) {
  const stu = students.find(s => s.id === id);
  return stu ? stu.avatar : '?';
}
