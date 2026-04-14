// js/coordinator/company.js — PAGE 5: COMPANY VIEW

import { companies, students, allApplications } from './data.js';

let selectedCompanyId = companies[0].id;
let searchQuery = '';
let filterTier  = 'All';
let filterStatus = 'All';

export function render(container, app) {
  renderPage(container);
}

function renderPage(container) {
  const filteredCompanies = getFilteredCompanies();
  const selectedCompany   = companies.find(c => c.id === selectedCompanyId) || companies[0];

  // Per-company student stats
  const companyApps = allApplications.filter(a => a.company === selectedCompany.name);
  const studentsApplied   = [...new Set(companyApps.map(a => a.studentId))];
  const studentsShorted    = companyApps.filter(a => ['Shortlisted','Interview','Selected'].includes(a.status)).map(a => a.studentId);
  const studentsSelected   = companyApps.filter(a => a.status === 'Selected').map(a => a.studentId);
  const myStudentsTable    = students.map(s => {
    const app = companyApps.find(a => a.studentId === s.id);
    return { ...s, roleApplied: app?.role || '—', appStatus: app?.status || '—' };
  });

  container.innerHTML = `
    <div class="coord-page-header">
      <div>
        <h1 class="coord-page-title">Company View</h1>
        <p class="coord-page-sub">Explore companies and track your students' engagement</p>
      </div>
    </div>

    <div class="coord-company-shell">

      <!-- LEFT PANEL: Company List -->
      <div class="card coord-company-list-panel">
        <!-- Search + Filters -->
        <div class="coord-company-list-head">
          <div class="coord-search-wrap compact">
            <ion-icon name="search-outline"></ion-icon>
            <input id="comp-search" type="text" placeholder="Search company…"
              value="${escapeHtml(searchQuery)}" class="coord-search-input">
          </div>
          <div class="coord-company-filter-row">
            <select id="comp-tier" class="coord-select compact">
              ${['All','Tier 1','Tier 2','Tier 3'].map(t =>
                `<option value="${t}" ${filterTier === t ? 'selected':''}>${t}</option>`).join('')}
            </select>
            <select id="comp-status" class="coord-select compact">
              ${['All','Active','Inactive'].map(s =>
                `<option value="${s}" ${filterStatus === s ? 'selected':''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Company Entries -->
        <div class="coord-company-entries" id="company-entries">
          ${filteredCompanies.map(c => `
            <div class="coord-company-entry ${c.id === selectedCompanyId ? 'active' : ''}"
                 data-company-id="${c.id}">
              <div class="coord-company-entry-avatar" style="background:${companyColor(c.name)}">${c.name.charAt(0)}</div>
              <div class="coord-company-entry-info">
                <h4>${c.name}</h4>
                <p class="coord-muted">${c.industry}</p>
              </div>
              <div class="coord-company-entry-right">
                <span class="tag ${c.tier === 'Tier 1' ? 'tag-success' : 'tag-info'}">${c.tier}</span>
                <span class="coord-company-status-dot ${c.status === 'Active' ? 'active' : ''}"></span>
              </div>
            </div>
          `).join('')}
          ${filteredCompanies.length === 0 ? `
            <div class="coord-empty" style="padding:40px 20px">
              <ion-icon name="business-outline"></ion-icon>
              <p>No companies match filters</p>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- RIGHT PANEL: Company Detail -->
      <div class="coord-company-detail-panel" id="company-detail-panel">
        ${renderCompanyDetail(selectedCompany, companyApps, studentsApplied, studentsShorted, studentsSelected, myStudentsTable)}
      </div>

    </div>
  `;

  // Events
  container.querySelector('#comp-search').addEventListener('input', e => {
    searchQuery = e.target.value; renderPage(container);
  });
  container.querySelector('#comp-tier').addEventListener('change', e => {
    filterTier = e.target.value; renderPage(container);
  });
  container.querySelector('#comp-status').addEventListener('change', e => {
    filterStatus = e.target.value; renderPage(container);
  });
  container.querySelectorAll('.coord-company-entry').forEach(entry => {
    entry.addEventListener('click', () => {
      selectedCompanyId = parseInt(entry.dataset.companyId);
      renderPage(container);
    });
  });
}

function renderCompanyDetail(c, companyApps, applied, shorted, selected, myStudentsTable) {
  const upcomingVisit = c.upcomingVisit;
  return `
    <!-- Section 1: Company Info -->
    <div class="card coord-company-info-card">
      <div class="coord-company-info-top">
        <div class="coord-company-big-avatar" style="background:${companyColor(c.name)}">${c.name.charAt(0)}</div>
        <div class="coord-company-info-body">
          <div class="coord-company-info-title-row">
            <h2>${c.name}</h2>
            <span class="tag ${c.tier === 'Tier 1' ? 'tag-success' : 'tag-info'}">${c.tier}</span>
            <span class="tag ${c.status === 'Active' ? 'tag-success' : 'tag-danger'}">${c.status}</span>
          </div>
          <p class="coord-muted">${c.industry}</p>
          <a href="https://${c.website}" target="_blank" class="coord-website-link">
            <ion-icon name="globe-outline"></ion-icon> ${c.website}
          </a>
        </div>
      </div>
    </div>

    <!-- Section 2: HR Contact -->
    <div class="card coord-section-card">
      <h3 class="coord-section-title"><ion-icon name="person-circle-outline"></ion-icon> HR Contact</h3>
      <div class="coord-hr-grid">
        <div class="coord-hr-item">
          <label>Name</label>
          <p>${c.hr.name}</p>
        </div>
        <div class="coord-hr-item">
          <label>Email</label>
          <a href="mailto:${c.hr.email}" class="coord-hr-link">${c.hr.email}</a>
        </div>
        <div class="coord-hr-item">
          <label>Phone</label>
          <p>${c.hr.phone}</p>
        </div>
        <div class="coord-hr-item">
          <label>LinkedIn</label>
          <a href="https://${c.hr.linkedin}" target="_blank" class="coord-hr-link">
            <ion-icon name="logo-linkedin"></ion-icon> View Profile
          </a>
        </div>
      </div>
      <p class="coord-readonly-note"><ion-icon name="lock-closed-outline"></ion-icon> Read-only — set by Admin</p>
    </div>

    <!-- Section 3: Jobs at Company -->
    <div class="card coord-section-card">
      <h3 class="coord-section-title"><ion-icon name="briefcase-outline"></ion-icon> Active Job Listings</h3>
      <div class="data-table-container" style="margin-top:12px">
        <table class="coord-table">
          <thead>
            <tr>
              <th>Role</th>
              <th style="text-align:center">Package (₹ LPA)</th>
              <th style="text-align:center">Deadline</th>
              <th style="text-align:center">Status</th>
            </tr>
          </thead>
          <tbody>
            ${c.jobs.map(j => `
              <tr>
                <td><b>${j.role}</b></td>
                <td style="text-align:center">₹${j.package} LPA</td>
                <td style="text-align:center" class="coord-muted">${j.deadline}</td>
                <td style="text-align:center">
                  <span class="tag ${j.status === 'Open' ? 'tag-success' : 'tag-danger'}">${j.status}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 4: My Students Stats -->
    <div class="card coord-section-card">
      <h3 class="coord-section-title"><ion-icon name="people-outline"></ion-icon> My Students Stats</h3>
      <div class="coord-company-stats-row">
        <div class="coord-company-stat-box blue">
          <span class="num">${applied.length}</span>
          <span>Applied</span>
          <small>out of 10</small>
        </div>
        <div class="coord-company-stat-box orange">
          <span class="num">${[...new Set(shorted)].length}</span>
          <span>Shortlisted</span>
          <small>out of 10</small>
        </div>
        <div class="coord-company-stat-box green">
          <span class="num">${[...new Set(selected)].length}</span>
          <span>Selected</span>
          <small>out of 10</small>
        </div>
      </div>
    </div>

    <!-- Section 5: My Students Table -->
    <div class="card coord-section-card">
      <h3 class="coord-section-title"><ion-icon name="list-outline"></ion-icon> My Students (Read-only)</h3>
      <div class="data-table-container" style="margin-top:12px">
        <table class="coord-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th style="text-align:center">CGPA</th>
              <th>Role Applied</th>
              <th style="text-align:center">Status</th>
            </tr>
          </thead>
          <tbody>
            ${myStudentsTable.map(s => `
              <tr>
                <td>
                  <div class="coord-student-cell">
                    <div class="coord-avatar-sm" style="background:${avatarBg(s.id)}">${s.avatar}</div>
                    <b>${s.name}</b>
                  </div>
                </td>
                <td style="text-align:center">${s.cgpa.toFixed(2)}</td>
                <td class="coord-muted">${s.roleApplied}</td>
                <td style="text-align:center">${appStatusBadge(s.appStatus)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Upcoming Visit -->
    ${upcomingVisit ? `
      <div class="card coord-section-card coord-visit-card">
        <h3 class="coord-section-title"><ion-icon name="calendar-outline"></ion-icon> Upcoming Company Visit</h3>
        <div class="coord-visit-detail">
          <div class="coord-visit-detail-item">
            <label>Date</label>
            <p>${upcomingVisit.date}</p>
          </div>
          <div class="coord-visit-detail-item">
            <label>Mode</label>
            <span class="tag ${upcomingVisit.mode === 'Online' ? 'tag-info' : 'tag-warning'}">${upcomingVisit.mode}</span>
          </div>
          <div class="coord-visit-detail-item">
            <label>HR Contact</label>
            <p>${upcomingVisit.hrContact}</p>
          </div>
        </div>
      </div>
    ` : ''}
  `;
}

function getFilteredCompanies() {
  return companies.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchName = c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
    const tierOk    = filterTier === 'All' || c.tier === filterTier;
    const statusOk  = filterStatus === 'All' || c.status === filterStatus;
    return matchName && tierOk && statusOk;
  });
}

const companyColors = {
  'Google India': '#4285F4', 'Amazon': '#FF9900', 'Microsoft': '#00BCF2',
  'TCS': '#1C5FA9', 'Infosys': '#007CC3', 'Zomato': '#E23744',
};
function companyColor(name) { return companyColors[name] || '#1B3A6B'; }

const palette = ['#1B3A6B','#2c5282','#10b981','#F5A623','#7c3aed','#ef4444','#0284c7','#f59e0b','#059669','#dc2626'];
const avatarBg = id => palette[(id - 1) % palette.length];

function appStatusBadge(status) {
  const map = {
    'Selected':    '<span class="tag tag-success">Selected</span>',
    'Interview':   '<span class="tag tag-warning">Interview</span>',
    'Shortlisted': '<span class="tag tag-info">Shortlisted</span>',
    'Applied':     '<span class="tag" style="background:#f1f5f9;color:#475569">Applied</span>',
    'Rejected':    '<span class="tag tag-danger">Rejected</span>',
    '—':           '<span style="color:#94a3b8">—</span>',
  };
  return map[status] || `<span class="tag">${status}</span>`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
