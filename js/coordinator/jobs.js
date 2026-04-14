// js/coordinator/opportunities.js — PAGE 3: OPPORTUNITIES

import { jobOpportunities, students } from './data.js';

let searchQuery  = '';
let filterType   = 'All';
let filterCgpa   = '';
let filterTier   = 'All';
let openJobId    = null;

export function render(container, app) {
  renderPage(container);
}

function renderPage(container) {
  const filtered = getFiltered();

  container.innerHTML = `
    <div class="coord-page-header">
      <div>
        <h1 class="coord-page-title">Opportunities</h1>
        <p class="coord-page-sub">Browse job openings — all filtered to Computer Science department</p>
      </div>
      <span class="coord-dept-lock-badge">
        <ion-icon name="lock-closed-outline"></ion-icon> CSE Branch Only
      </span>
    </div>

    <!-- Filter Bar -->
    <div class="card coord-filter-card">
      <div class="coord-filter-row">
        <div class="coord-search-wrap">
          <ion-icon name="search-outline"></ion-icon>
          <input id="opp-search" type="text" placeholder="Search company or role…"
            value="${escapeHtml(searchQuery)}" class="coord-search-input">
        </div>
        <div class="coord-filter-group">
          <label>Job Type</label>
          <select id="opp-type" class="coord-select">
            ${['All','Full-time','Intern','Contract'].map(t =>
              `<option value="${t}" ${filterType === t ? 'selected' : ''}>${t}</option>`
            ).join('')}
          </select>
        </div>
        <div class="coord-filter-group">
          <label>Min CGPA</label>
          <input id="opp-cgpa" type="number" step="0.5" min="0" max="10"
            placeholder="e.g. 7.5" value="${filterCgpa}" class="coord-num-input">
        </div>
        <div class="coord-filter-group">
          <label>Company Tier</label>
          <select id="opp-tier" class="coord-select">
            ${['All','Tier 1','Tier 2','Tier 3'].map(t =>
              `<option value="${t}" ${filterTier === t ? 'selected' : ''}>${t}</option>`
            ).join('')}
          </select>
        </div>
        <button id="opp-reset" class="coord-reset-btn">
          <ion-icon name="refresh-outline"></ion-icon> Reset
        </button>
      </div>
      <p class="coord-filter-count">Showing <b>${filtered.length}</b> of ${jobOpportunities.length} opportunities</p>
    </div>

    <!-- Job Cards -->
    <div class="coord-jobs-grid" id="opp-jobs-grid">
      ${filtered.map(j => renderJobCard(j)).join('')}
      ${filtered.length === 0 ? `
        <div class="coord-empty" style="grid-column:1/-1">
          <ion-icon name="briefcase-outline"></ion-icon>
          <p>No opportunities match your filters</p>
        </div>
      ` : ''}
    </div>

    <!-- Job Detail Modal -->
    <div id="job-modal-overlay" class="coord-modal-overlay hidden">
      <div class="coord-modal coord-job-modal" id="job-modal-content"></div>
    </div>
  `;

  // Events
  const search = container.querySelector('#opp-search');
  const type   = container.querySelector('#opp-type');
  const cgpa   = container.querySelector('#opp-cgpa');
  const tier   = container.querySelector('#opp-tier');
  const reset  = container.querySelector('#opp-reset');

  search.addEventListener('input', e => { searchQuery = e.target.value; renderPage(container); });
  type.addEventListener('change', e => { filterType = e.target.value; renderPage(container); });
  cgpa.addEventListener('input', e => { filterCgpa = e.target.value; renderPage(container); });
  tier.addEventListener('change', e => { filterTier = e.target.value; renderPage(container); });
  reset.addEventListener('click', () => {
    searchQuery = ''; filterType = 'All'; filterCgpa = ''; filterTier = 'All';
    renderPage(container);
  });

  container.querySelectorAll('.coord-job-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openJobDetail(parseInt(btn.dataset.jobId), container);
    });
  });

  // Overlay close
  const overlay = container.querySelector('#job-modal-overlay');
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeJobDetail(container);
  });

  if (openJobId !== null) openJobDetail(openJobId, container);
}

function getFiltered() {
  return jobOpportunities.filter(j => {
    const q = searchQuery.toLowerCase();
    const match = j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q);
    const typeOk = filterType === 'All' || j.type === filterType;
    const cgpaOk = filterCgpa === '' || j.cgpaCutoff >= parseFloat(filterCgpa);
    const tierOk = filterTier === 'All' || j.tier === filterTier;
    const branchOk = j.branch.includes('CSE');
    return match && typeOk && cgpaOk && tierOk && branchOk;
  });
}

function renderJobCard(j) {
  const eligible = j.eligibleStudents.length;
  const applied  = j.appliedStudents.length;
  const daysLeft = getDaysLeft(j.deadline);
  const urgency  = daysLeft <= 7 ? 'coord-job-urgent' : daysLeft <= 14 ? 'coord-job-soon' : '';

  return `
    <div class="card coord-job-card">
      <div class="coord-job-card-top">
        <div class="coord-company-avatar" style="background:${companyColor(j.company)}">${j.company.charAt(0)}</div>
        <div class="coord-job-card-info">
          <h3>${j.company}</h3>
          <p class="coord-muted">${j.role}</p>
        </div>
        <span class="tag ${j.tier === 'Tier 1' ? 'tag-success' : 'tag-info'}">${j.tier}</span>
      </div>

      <div class="coord-job-card-meta">
        <div class="coord-job-meta-item">
          <ion-icon name="cash-outline"></ion-icon>
          <span>₹${j.package} LPA</span>
        </div>
        <div class="coord-job-meta-item">
          <ion-icon name="briefcase-outline"></ion-icon>
          <span>${j.type}</span>
        </div>
        <div class="coord-job-meta-item ${urgency}">
          <ion-icon name="time-outline"></ion-icon>
          <span>${j.deadline} ${daysLeft <= 7 ? '⚠' : ''}</span>
        </div>
      </div>

      <div class="coord-job-card-students">
        <div class="coord-job-student-stat">
          <span class="coord-eligible-num">${eligible}</span>
          <span class="coord-stat-label2">Eligible</span>
        </div>
        <div class="coord-job-student-div"></div>
        <div class="coord-job-student-stat">
          <span class="coord-applied-num">${applied}</span>
          <span class="coord-stat-label2">Applied</span>
        </div>
        <div class="coord-job-student-div"></div>
        <div class="coord-job-student-stat">
          <span class="coord-cgpa-cut">${j.cgpaCutoff}+</span>
          <span class="coord-stat-label2">CGPA Cut</span>
        </div>
      </div>

      <button class="coord-job-view-btn" data-job-id="${j.id}">
        View Details <ion-icon name="arrow-forward-outline"></ion-icon>
      </button>
    </div>
  `;
}

function openJobDetail(id, container) {
  openJobId = id;
  const j = jobOpportunities.find(job => job.id === id);
  if (!j) return;

  const overlay = container.querySelector('#job-modal-overlay');
  const modal   = container.querySelector('#job-modal-content');
  overlay.classList.remove('hidden');

  const eligibleList  = students.filter(s => j.eligibleStudents.includes(s.id));
  const appliedList   = students.filter(s => j.appliedStudents.includes(s.id));
  const notAppliedYet = eligibleList.filter(s => !j.appliedStudents.includes(s.id));

  modal.innerHTML = `
    <div class="coord-modal-header">
      <div class="coord-company-avatar" style="background:${companyColor(j.company)}">${j.company.charAt(0)}</div>
      <div class="coord-modal-title-group">
        <h2>${j.role}</h2>
        <p class="coord-muted">${j.company} &nbsp;|&nbsp; ${j.type} &nbsp;|&nbsp; ${j.tier}</p>
      </div>
      <button class="coord-modal-close" id="job-modal-close">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>

    <div class="coord-modal-body coord-job-modal-body">
      <!-- Package + Deadline -->
      <div class="coord-job-meta-strip">
        <div class="coord-job-meta-chip">
          <ion-icon name="cash-outline"></ion-icon> <b>₹${j.package} LPA</b>
        </div>
        <div class="coord-job-meta-chip">
          <ion-icon name="time-outline"></ion-icon> <b>Deadline: ${j.deadline}</b>
        </div>
        <div class="coord-job-meta-chip">
          <ion-icon name="school-outline"></ion-icon><b>CGPA ≥ ${j.cgpaCutoff}</b>
        </div>
        <div class="coord-job-meta-chip">
          <ion-icon name="git-branch-outline"></ion-icon> <b>${j.branch.join(', ')}</b>
        </div>
      </div>

      <!-- Description -->
      <div class="coord-modal-section">
        <h4>Job Description</h4>
        <p class="coord-job-desc">${j.description}</p>
      </div>

      <!-- Required Skills -->
      <div class="coord-modal-section">
        <h4>Required Skills</h4>
        <div class="coord-skills-row" style="flex-wrap:wrap; gap:8px; margin-top:8px">
          ${j.requiredSkills.map(sk => `<span class="coord-skill-tag large">${sk}</span>`).join('')}
        </div>
      </div>

      <!-- My Students Stats -->
      <div class="coord-modal-section">
        <h4>My Students Overview</h4>
        <div class="coord-job-student-grid">
          <div class="coord-job-stat-box">
            <span class="num green">${eligibleList.length}</span>
            <span>Eligible</span>
          </div>
          <div class="coord-job-stat-box">
            <span class="num blue">${appliedList.length}</span>
            <span>Applied</span>
          </div>
          <div class="coord-job-stat-box">
            <span class="num orange">${notAppliedYet.length}</span>
            <span>Yet to Apply</span>
          </div>
        </div>
      </div>

      <!-- Students Table -->
      <div class="coord-modal-section">
        <h4>Student Eligibility (View Only)</h4>
        <div class="coord-job-stu-note">
          <ion-icon name="information-circle-outline"></ion-icon>
          Coordinators cannot apply on behalf of students. This is a read-only view.
        </div>
        <div class="data-table-container" style="margin-top:12px">
          <table class="coord-table">
            <thead>
              <tr>
                <th>Student</th>
                <th style="text-align:center">CGPA</th>
                <th style="text-align:center">Eligible</th>
                <th style="text-align:center">Applied</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => {
                const elig    = j.eligibleStudents.includes(s.id);
                const applied = j.appliedStudents.includes(s.id);
                return `
                  <tr>
                    <td><b>${s.name}</b></td>
                    <td style="text-align:center">${s.cgpa.toFixed(2)}</td>
                    <td style="text-align:center">${elig ? '<span class="tag tag-success">✓ Yes</span>' : '<span class="tag tag-danger">✕ No</span>'}</td>
                    <td style="text-align:center">${applied ? '<span class="tag tag-info">Applied</span>' : '<span style="color:#94a3b8;font-size:0.8rem">—</span>'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#job-modal-close').addEventListener('click', () => closeJobDetail(container));
}

function closeJobDetail(container) {
  openJobId = null;
  const overlay = container.querySelector('#job-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function getDaysLeft(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

const companyColors = {
  'Google India': '#4285F4', 'Amazon': '#FF9900', 'Microsoft': '#00BCF2',
  'TCS': '#1C5FA9', 'Infosys': '#007CC3', 'Zomato': '#E23744',
};
function companyColor(name) { return companyColors[name] || '#1B3A6B'; }

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
