// js/coordinator/students.js — PAGE 2: MY STUDENTS

import { students } from './data.js';

const palette = ['#1B3A6B','#2c5282','#10b981','#F5A623','#7c3aed','#ef4444','#0284c7','#f59e0b','#059669','#dc2626'];
const avatarBg = id => palette[(id - 1) % palette.length];

let searchQuery = '';
let filterStatus = 'All';
let cgpaMin = '';
let cgpaMax = '';
let openProfileId = null;

export function render(container, app) {
  renderPage(container);
}

function renderPage(container) {
  const filtered = getFiltered();

  container.innerHTML = `
    <div class="coord-page-header">
      <div>
        <h1 class="coord-page-title">My Students</h1>
        <p class="coord-page-sub">Manage and view your 10 assigned Computer Science students</p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="card coord-filter-card">
      <div class="coord-filter-row">
        <div class="coord-search-wrap">
          <ion-icon name="search-outline"></ion-icon>
          <input
            id="stu-search"
            type="text"
            placeholder="Search by name or roll number…"
            value="${escapeHtml(searchQuery)}"
            class="coord-search-input"
          >
        </div>
        <div class="coord-filter-group">
          <label>Status</label>
          <select id="stu-status" class="coord-select">
            ${['All','Active','Placed','Not Applied','Rejected'].map(s =>
              `<option value="${s}" ${filterStatus === s ? 'selected' : ''}>${s}</option>`
            ).join('')}
          </select>
        </div>
        <div class="coord-filter-group">
          <label>CGPA Min</label>
          <input id="stu-cgpa-min" type="number" step="0.1" min="0" max="10"
            placeholder="e.g. 7.5" value="${cgpaMin}" class="coord-num-input">
        </div>
        <div class="coord-filter-group">
          <label>CGPA Max</label>
          <input id="stu-cgpa-max" type="number" step="0.1" min="0" max="10"
            placeholder="e.g. 10" value="${cgpaMax}" class="coord-num-input">
        </div>
        <button id="stu-reset" class="coord-reset-btn">
          <ion-icon name="refresh-outline"></ion-icon> Reset
        </button>
      </div>
      <p class="coord-filter-count">Showing <b>${filtered.length}</b> of ${students.length} students</p>
    </div>

    <!-- Student Cards Grid -->
    <div class="coord-student-grid" id="student-cards-grid">
      ${filtered.map(s => renderStudentCard(s)).join('')}
      ${filtered.length === 0 ? `
        <div class="coord-empty" style="grid-column:1/-1">
          <ion-icon name="people-outline"></ion-icon>
          <p>No students match your filters</p>
        </div>
      ` : ''}
    </div>

    <!-- Profile Modal Overlay -->
    <div id="student-modal-overlay" class="coord-modal-overlay hidden">
      <div class="coord-modal" id="student-modal-content"></div>
    </div>
  `;

  // Events
  const search = container.querySelector('#stu-search');
  const status = container.querySelector('#stu-status');
  const cgpaMinEl = container.querySelector('#stu-cgpa-min');
  const cgpaMaxEl = container.querySelector('#stu-cgpa-max');
  const reset = container.querySelector('#stu-reset');

  // Search: update only the cards grid (NOT full re-render) to keep focus/cursor
  search.addEventListener('input', e => {
    searchQuery = e.target.value;
    updateCards(container);
  });
  // These controls can full re-render since they don't lose focus mid-type
  status.addEventListener('change', e => { filterStatus = e.target.value; renderPage(container); });
  cgpaMinEl.addEventListener('change', e => { cgpaMin = e.target.value; renderPage(container); });
  cgpaMaxEl.addEventListener('change', e => { cgpaMax = e.target.value; renderPage(container); });
  reset.addEventListener('click', () => {
    searchQuery = ''; filterStatus = 'All'; cgpaMin = ''; cgpaMax = '';
    search.value = '';
    renderPage(container);
  });

  // Card → Profile
  container.querySelectorAll('.coord-student-card-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.studentId);
      openProfile(id, container);
    });
  });

  // Overlay close
  const overlay = container.querySelector('#student-modal-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProfile(container);
  });

  // If a profile was open, reopen it (after re-render)
  if (openProfileId !== null) {
    openProfile(openProfileId, container);
  }
}

// Surgically update only the cards grid + count — keeps search input focused
function updateCards(container) {
  const filtered = getFiltered();
  const grid = container.querySelector('#student-cards-grid');
  const count = container.querySelector('.coord-filter-count');
  if (grid) {
    grid.innerHTML = filtered.map(s => renderStudentCard(s)).join('') +
      (filtered.length === 0
        ? `<div class="coord-empty" style="grid-column:1/-1">
             <ion-icon name="people-outline"></ion-icon>
             <p>No students match your filters</p>
           </div>`
        : '');
    // Re-attach card buttons
    grid.querySelectorAll('.coord-student-card-view-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openProfile(parseInt(btn.dataset.studentId), container);
      });
    });
  }
  if (count) count.innerHTML = `Showing <b>${filtered.length}</b> of ${students.length} students`;
}

function getFiltered() {
  return students.filter(s => {
    const q = searchQuery.toLowerCase();
    const nameMatch = s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q);
    const statusMatch = filterStatus === 'All' || s.status === filterStatus;
    const cgpaMinOk = cgpaMin === '' || s.cgpa >= parseFloat(cgpaMin);
    const cgpaMaxOk = cgpaMax === '' || s.cgpa <= parseFloat(cgpaMax);
    return nameMatch && statusMatch && cgpaMinOk && cgpaMaxOk;
  });
}

function renderStudentCard(s) {
  return `
    <div class="coord-student-card" style="padding: 24px; border-radius: 16px; border: 1px solid var(--border); background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 16px; transition: transform 0.2s, box-shadow 0.2s;">
      
      <!-- Top: Avatar & Info -->
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 52px; height: 52px; border-radius: 14px; background:${avatarBg(s.id)}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; flex-shrink: 0;">
          ${s.avatar}
        </div>
        <div style="display: flex; flex-direction: column;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin: 0; line-height: 1.2;">${s.name}</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin: 4px 0 0 0;">${s.rollNo}</p>
        </div>
      </div>

      <!-- Mid: Stats Box -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 16px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; text-align: center;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">CGPA</span>
          <span style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${s.cgpa.toFixed(2)}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">Grad Year</span>
          <span style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${s.gradYear}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">Apps</span>
          <span style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${s.applications.length}</span>
        </div>
      </div>

      <!-- Bottom: Status & Button -->
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start; margin-top: auto;">
        ${statusBadge(s.status)}
        
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: -4px;">
          ${s.skills.slice(0, 3).map(sk => `<span style="background: #f1f5f9; color: #475569; font-size: 0.72rem; padding: 4px 10px; border-radius: 6px; font-weight: 500;">${sk}</span>`).join('')}
          ${s.skills.length > 3 ? `<span style="background: #e2e8f0; color: #334155; font-size: 0.72rem; padding: 4px 8px; border-radius: 6px; font-weight: 600;">+${s.skills.length - 3}</span>` : ''}
        </div>

        <button class="coord-student-card-view-btn" data-student-id="${s.id}" style="width: 100%; padding: 12px; background: #f0f7ff; color: #1B3A6B; border: 1px solid #dbeafe; border-radius: 10px; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: background 0.2s; margin-top: 4px;">
          <ion-icon name="person-outline"></ion-icon> View Profile
        </button>
      </div>
    </div>
  `;
}

function openProfile(id, container) {
  openProfileId = id;
  const s = students.find(st => st.id === id);
  if (!s) return;

  const overlay = container.querySelector('#student-modal-overlay');
  const modal = container.querySelector('#student-modal-content');
  overlay.classList.remove('hidden');

  modal.innerHTML = `
    <div class="coord-modal-header">
      <div class="coord-modal-avatar" style="background:${avatarBg(s.id)}">${s.avatar}</div>
      <div class="coord-modal-title-group">
        <h2>${s.name}</h2>
        <p class="coord-muted">${s.rollNo} &nbsp;|&nbsp; ${s.gradYear} Batch</p>
        ${statusBadge(s.status)}
      </div>
      <button class="coord-modal-close" id="modal-close-btn">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>

    <div class="coord-modal-body">
      <!-- Info Row -->
      <div class="coord-modal-info-grid">
        <div class="coord-modal-info-item">
          <label>Department</label>
          <p>Computer Science</p>
        </div>
        <div class="coord-modal-info-item">
          <label>CGPA</label>
          <p class="${s.cgpa >= 9 ? 'coord-cgpa high' : s.cgpa >= 8 ? 'coord-cgpa mid' : 'coord-cgpa low'}">${s.cgpa.toFixed(2)}</p>
        </div>
        <div class="coord-modal-info-item">
          <label>Graduation Year</label>
          <p>${s.gradYear}</p>
        </div>
        <div class="coord-modal-info-item">
          <label>Resume</label>
          <a href="${s.resumeUrl}" class="coord-resume-link" target="_blank">
            <ion-icon name="document-text-outline"></ion-icon> View Resume
          </a>
        </div>
      </div>
      <!-- Skills -->
      <div class="coord-modal-section" style="margin-top: 24px;">
        <h4 style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 12px; font-weight: 700;">Skills & Competencies</h4>
        <div class="coord-skills-row" style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${s.skills.map(sk => `<span style="background: #f1f5f9; color: #475569; font-size: 0.8rem; padding: 6px 14px; border-radius: 8px; font-weight: 600; border: 1px solid #e2e8f0;">${sk}</span>`).join('')}
        </div>
      </div>

      <!-- Application History -->
      <div class="coord-modal-section">
        <h4>Application History</h4>
        ${s.applications.length > 0 ? `
          <div class="data-table-container" style="margin-top:12px">
            <table class="coord-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Applied Date</th>
                  <th style="text-align:center">ATS Score</th>
                  <th style="text-align:center">Status</th>
                </tr>
              </thead>
              <tbody>
                ${s.applications.map(a => `
                  <tr>
                    <td><b>${a.company}</b></td>
                    <td class="coord-muted">${a.role}</td>
                    <td class="coord-muted">${a.appliedDate}</td>
                    <td style="text-align:center">
                      <span class="coord-ats ${a.atsScore >= 85 ? 'high' : a.atsScore >= 70 ? 'mid' : 'low'}">${a.atsScore}</span>
                    </td>
                    <td style="text-align:center">${appStatusBadge(a.status)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `<div class="coord-empty-sm"><ion-icon name="folder-open-outline"></ion-icon><p>No applications yet</p></div>`}
      </div>
    </div>
  `;

  container.querySelector('#modal-close-btn').addEventListener('click', () => closeProfile(container));
}

function closeProfile(container) {
  openProfileId = null;
  const overlay = container.querySelector('#student-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function statusBadge(status) {
  const map = {
    'Placed':      '<span class="tag tag-success" style="border-radius:20px; padding:4px 12px; font-weight:600">Placed</span>',
    'Active':      '<span class="tag tag-info" style="border-radius:20px; padding:4px 12px; font-weight:600">Active</span>',
    'Not Applied': '<span class="tag" style="background:#f1f5f9;color:#64748b; border-radius:20px; padding:4px 12px; font-weight:600">Not Applied</span>',
    'Rejected':    '<span class="tag tag-danger" style="border-radius:20px; padding:4px 12px; font-weight:600">Rejected</span>',
  };
  return map[status] || `<span class="tag" style="border-radius:20px; padding:4px 12px; font-weight:600">${status}</span>`;
}

function appStatusBadge(status) {
  const map = {
    'Selected':   '<span class="tag tag-success" style="border-radius:20px; padding:4px 10px; font-size:0.75rem; font-weight:600">Selected</span>',
    'Interview':  '<span class="tag tag-warning" style="border-radius:20px; padding:4px 10px; font-size:0.75rem; font-weight:600">Interview</span>',
    'Shortlisted':'<span class="tag tag-info" style="border-radius:20px; padding:4px 10px; font-size:0.75rem; font-weight:600">Shortlisted</span>',
    'Applied':    '<span class="tag" style="background:#f1f5f9;color:#475569; border-radius:20px; padding:4px 10px; font-size:0.75rem; font-weight:600">Applied</span>',
    'Rejected':   '<span class="tag tag-danger" style="border-radius:20px; padding:4px 10px; font-size:0.75rem; font-weight:600">Rejected</span>',
  };
  return map[status] || `<span class="tag" style="border-radius:20px; padding:4px 10px; font-size:0.75rem; font-weight:600">${status}</span>`;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
