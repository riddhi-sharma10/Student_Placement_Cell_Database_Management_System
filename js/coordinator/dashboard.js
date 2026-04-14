// js/coordinator/dashboard.js — PAGE 1: COORDINATOR DASHBOARD

import { coordinator, students, jobOpportunities } from './data.js';

export function render(container, app) {
  const placed     = students.filter(s => s.status === 'Placed').length;
  const active     = students.filter(s => s.status === 'Active').length;
  const notApplied = students.filter(s => s.status === 'Not Applied').length;
  const rejected   = students.filter(s => s.status === 'Rejected').length;
  const total      = students.length;
  const successRate = Math.round((placed / total) * 100);
  const activelyApplying = students.filter(s => s.activelyApplying).length;
  const pendingActions = students.filter(s => s.status === 'Active' || s.status === 'Not Applied').length;
  const placedPercent = (placed / total) * 100;

  // Applications by role data
  const roleCounts = {};
  students.forEach(s => s.applications.forEach(a => {
    roleCounts[a.role] = (roleCounts[a.role] || 0) + 1;
  }));
  const roleLabels = Object.keys(roleCounts).slice(0, 6);
  const roleData   = roleLabels.map(r => roleCounts[r]);

  // Scheduled Interviews
  const scheduledInterviews = [
    { student: 'Priya Desai', rollNo: 'CSE2021015', company: 'Google', role: 'Software Engineer', date: 'Feb 15, 2025', time: '10:00 AM' },
    { student: 'Alex Sterling', rollNo: 'CSE2021002', company: 'Microsoft', role: 'Full Stack', date: 'Feb 25, 2025', time: '2:30 PM' },
    { student: 'Rohan Singh', rollNo: 'CSE2021044', company: 'Zomato', role: 'Backend Engineer', date: 'Mar 8, 2025', time: '11:15 AM' },
    { student: 'Aman Verma', rollNo: 'CSE2021088', company: 'Amazon', role: 'Frontend Engineer', date: 'Mar 12, 2025', time: '01:00 PM' },
    { student: 'Sara Chen', rollNo: 'CSE2021102', company: 'Atlassian', role: 'Product Manager', date: 'Mar 15, 2025', time: '03:45 PM' },
    { student: 'Riddhi Sharma', rollNo: 'CSE2021001', company: 'Visa', role: 'Data Analyst', date: 'Mar 20, 2025', time: '09:30 AM' },
  ];

  const userName = app.state.user.name.split(' ')[0] || app.state.user.name;

  container.innerHTML = `
    <!-- Welcome Header -->
    <div class="dashboard-header" style="margin-bottom: 32px;">
      <h1 style="font-size: 2rem; color: var(--primary);">Welcome back, ${userName}! 👋</h1>
      <p style="color: var(--text-muted);">Manage your students, track placements and review applications.</p>
    </div>

    <!-- Stats Grid -->
    <div class="coord-stats-grid">
      ${renderStatCard('people', 'My Students', total, 'Out of 10 Assigned', 'primary')}
      ${renderStatCard('checkmark-circle', 'Placements', placed, `${successRate}% Success Rate`, 'success')}
      ${renderStatCard('flash', 'Active Students', activelyApplying, 'Currently Applying', 'accent')}
      ${renderStatCard('alert-circle', 'Pending Actions', pendingActions, 'Awaiting Updates', 'warning')}
    </div>

    <!-- Placement Progress Bar -->
    <div class="card coord-progress-card">
      <div class="coord-progress-header">
        <div>
          <h3 class="coord-progress-title">Placement Progress</h3>
          <p class="coord-progress-sub">${placed} out of ${total} students placed this season</p>
        </div>
        <span class="coord-progress-badge">${successRate}%</span>
      </div>
      <div class="coord-progress-track">
        <div class="coord-progress-fill" style="width: ${placedPercent}%"></div>
      </div>
      <div class="coord-progress-legend">
        <span class="coord-legend-item placed"><span></span>Placed (${placed})</span>
        <span class="coord-legend-item active"><span></span>Active (${active})</span>
        <span class="coord-legend-item not-applied"><span></span>Not Applied (${notApplied})</span>
        <span class="coord-legend-item rejected"><span></span>Rejected (${rejected})</span>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="coord-charts-row">

      <!-- Pie Chart: Student Status -->
      <div class="card coord-chart-card">
        <div class="coord-chart-head">
          <h3>Student Status</h3>
          <p>Distribution of your 10 students</p>
        </div>
        <div class="coord-pie-wrap">
          <canvas id="statusPieChart"></canvas>
        </div>
        <div class="coord-pie-legend">
          <div class="coord-pie-legend-item">
            <span style="background:#10b981"></span>Placed <b style="margin-left:4px">${placed}</b>
          </div>
          <div class="coord-pie-legend-item">
            <span style="background:#3b82f6"></span>Active <b style="margin-left:4px">${active}</b>
          </div>
          <div class="coord-pie-legend-item">
            <span style="background:#9ca3af"></span>Not Applied <b style="margin-left:4px">${notApplied}</b>
          </div>
          <div class="coord-pie-legend-item">
            <span style="background:#ef4444"></span>Rejected <b style="margin-left:4px">${rejected}</b>
          </div>
        </div>
      </div>

      <!-- Bar Chart: Applications by Role -->
      <div class="card coord-chart-card">
        <div class="coord-chart-head">
          <h3>Applications by Role</h3>
          <p>How many students applied per role</p>
        </div>
        <div class="coord-bar-wrap">
          <canvas id="roleBarChart"></canvas>
        </div>
      </div>

      <!-- Upcoming Interviews -->
      <div class="card coord-chart-card">
        <div class="coord-chart-head">
          <h3>Upcoming Student Interviews</h3>
          <p>Next scheduled interview rounds</p>
        </div>
        <div class="coord-visits-list">
          ${scheduledInterviews.slice(0,3).map((v, i) => `
            <div class="coord-visit-row" style="align-items: center; padding: 12px 8px; border-radius: 8px;">
              <div class="coord-visit-avatar" style="background:${palette[i+1]}; width:40px; height:40px; border-radius:10px; flex-shrink:0;">${v.student.split(' ').map(n=>n[0]).join('')}</div>
              <div class="coord-visit-info" style="flex:1;">
                <h4 style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:2px;">${v.student}</h4>
                <p style="font-size:0.8rem; color:var(--text-muted);">${v.company} — ${v.role}</p>
              </div>
              <div class="coord-visit-right" style="text-align:right;">
                <div style="font-weight:600; font-size:0.85rem; color: #1B3A6B; margin-bottom: 2px;">${v.date}</div>
                <div style="font-size:0.75rem; color: #64748b;">${v.time}</div>
              </div>
            </div>
          `).join('')}
          <button class="coord-view-all-btn" id="view-all-interviews-btn" style="margin-top: 8px;">
            View All Interviews <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
      </div>

    </div>

    <!-- My Students Quick View -->
    <div class="card coord-students-quick">
      <div class="coord-section-head">
        <div>
          <h3>My Students at a Glance</h3>
          <p>Quick overview of all 10 assigned students</p>
        </div>
        <button class="btn-primary coord-see-all-btn" onclick="window.App.navigateTo('students')">
          See All Students <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </div>
      <div class="data-table-container">
        <table class="coord-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No.</th>
              <th style="text-align:center">CGPA</th>
              <th style="text-align:center">Status</th>
              <th style="text-align:center">Applications</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => `
              <tr class="coord-table-row" data-student="${s.id}">
                <td>
                  <div class="coord-student-cell">
                    <div class="coord-avatar-sm" style="background:${avatarBg(s.id)}">${s.avatar}</div>
                    <span class="coord-student-name">${s.name}</span>
                  </div>
                </td>
                <td class="coord-muted">${s.rollNo}</td>
                <td style="text-align:center">
                  <b class="coord-cgpa ${s.cgpa >= 9 ? 'high' : s.cgpa >= 8 ? 'mid' : 'low'}">${s.cgpa.toFixed(2)}</b>
                </td>
                <td style="text-align:center">${statusBadge(s.status)}</td>
                <td style="text-align:center">
                  <span class="coord-app-count">${s.applications.length}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Interview Details Modal -->
    <div id="dash-interview-modal" class="coord-modal-overlay hidden">
      <div class="coord-modal" id="dash-interview-content" style="max-width: 650px;"></div>
    </div>
  `;

  // Attach row click → navigate to students page
  container.querySelectorAll('.coord-table-row[data-student]').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      window.App.navigateTo('students');
    });
  });

  // Attach interview row click → open modal
  const intModalLayer = container.querySelector('#dash-interview-modal');
  const intContent = container.querySelector('#dash-interview-content');
  
  if (intModalLayer) {
    intModalLayer.addEventListener('click', (e) => {
      if (e.target === intModalLayer) intModalLayer.classList.add('hidden');
    });
  }

  const viewAllBtn = container.querySelector('#view-all-interviews-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      intContent.innerHTML = `
        <div class="coord-modal-header" style="background: linear-gradient(135deg, #1B3A6B 0%, #2c5282 100%); color: white; border-radius: 12px 12px 0 0; padding: 24px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%;">
            <div>
              <h2 style="margin: 0; font-size: 1.5rem;">All Scheduled Interviews</h2>
              <p style="margin: 4px 0 0 0; opacity: 0.9;">Manage all upcoming scheduled rounds</p>
            </div>
            <button class="coord-modal-close" id="int-close-btn" style="background:rgba(255,255,255,0.2); border:none; color:white; width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
        </div>
        
        <div class="coord-modal-body" style="padding: 0;">
          <div class="data-table-container" style="max-height: 480px; overflow-y: auto; padding: 0 24px 24px 24px;">
            <table class="coord-table" style="width:100%; border-collapse:collapse; margin-top:20px;">
              <thead style="position: sticky; top: 0; background: white; z-index: 10;">
                <tr>
                  <th style="padding:12px; text-align:left; border-bottom:1px solid #e2e8f0; color:#64748b;">Candidate</th>
                  <th style="padding:12px; text-align:left; border-bottom:1px solid #e2e8f0; color:#64748b;">Company & Role</th>
                  <th style="padding:12px; text-align:left; border-bottom:1px solid #e2e8f0; color:#64748b;">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                ${scheduledInterviews.map((v, idx) => `
                  <tr>
                    <td style="padding:12px; border-bottom:1px solid #f1f5f9;">
                      <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:36px; height:36px; background:${palette[(idx+1) % palette.length]}; color:white; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:bold; flex-shrink:0;">${v.student.split(' ').map(n=>n[0]).join('')}</div>
                        <div>
                          <div style="font-weight:700; color:var(--text-main); font-size:0.95rem;">${v.student}</div>
                          <div style="font-size:0.75rem; color:#64748b; font-weight:600;">${v.rollNo}</div>
                        </div>
                      </div>
                    </td>
                    <td style="padding:12px; border-bottom:1px solid #f1f5f9;">
                      <div style="font-weight:700; color:var(--text-main); font-size:0.9rem;">${v.company}</div>
                      <div style="font-size:0.8rem; color:#64748b;">${v.role}</div>
                    </td>
                    <td style="padding:12px; border-bottom:1px solid #f1f5f9;">
                      <div style="font-weight:700; color:#1B3A6B; font-size:0.9rem;">${v.date}</div>
                      <div style="font-size:0.8rem; color:#64748b; font-weight:500;">${v.time}</div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      
      intModalLayer.classList.remove('hidden');
      intContent.querySelector('#int-close-btn').addEventListener('click', () => {
        intModalLayer.classList.add('hidden');
      });
    });
  }

  // Draw charts
  setTimeout(() => {
    // Pie chart
    const pieCtx = document.getElementById('statusPieChart');
    if (pieCtx && window.Chart) {
      new window.Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['Placed', 'Active', 'Not Applied', 'Rejected'],
          datasets: [{
            data: [placed, active, notApplied, rejected],
            backgroundColor: ['#10b981', '#3b82f6', '#9ca3af', '#ef4444'],
            borderColor: '#fff',
            borderWidth: 3,
            hoverOffset: 6,
          }]
        },
        options: {
          responsive: true,
          cutout: '68%',
          plugins: { legend: { display: false } },
        }
      });
    }

    // Bar chart
    const barCtx = document.getElementById('roleBarChart');
    if (barCtx && window.Chart) {
      new window.Chart(barCtx, {
        type: 'bar',
        data: {
          labels: roleLabels,
          datasets: [{
            label: 'Applications',
            data: roleData,
            backgroundColor: '#1B3A6B',
            borderRadius: 6,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f1f5f9' } },
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          }
        }
      });
    }
  }, 120);
}

function renderStatCard(icon, label, value, sub, type) {
  const colorMap = {
    primary: { bg: '#eff6ff', icon: '#1B3A6B', val: '#1B3A6B' },
    success: { bg: '#ecfdf5', icon: '#10b981', val: '#10b981' },
    accent:  { bg: '#fffbeb', icon: '#F5A623', val: '#F5A623' },
    warning: { bg: '#fff7ed', icon: '#f97316', val: '#f97316' },
  };
  const c = colorMap[type];
  return `
    <div class="card coord-stat-card">
      <div class="coord-stat-icon" style="background:${c.bg}; color:${c.icon}">
        <ion-icon name="${icon}-outline"></ion-icon>
      </div>
      <div class="coord-stat-body">
        <p class="coord-stat-label">${label}</p>
        <div class="coord-stat-value" style="color:${c.val}">${value}</div>
        <p class="coord-stat-sub">${sub}</p>
      </div>
    </div>
  `;
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

const palette = ['#1B3A6B','#2c5282','#10b981','#F5A623','#7c3aed','#ef4444','#0284c7','#f59e0b','#059669','#dc2626'];
function avatarBg(id) { return palette[(id - 1) % palette.length]; }
