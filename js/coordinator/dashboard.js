// js/coordinator/dashboard.js — PAGE 1: COORDINATOR DASHBOARD (API VERSION)

import { api } from '../api.js';

export async function render(container, app) {
  // Show loading state
  container.innerHTML = `
    <div style="display:flex; justify-content:center; align-items:center; height:60vh;">
      <div style="text-align:center;">
        <ion-icon name="sync-outline" style="font-size:3rem; color:var(--primary); animation:spin 1s linear infinite;"></ion-icon>
        <p style="color:var(--text-muted); margin-top:16px;">Connecting to Live Server...</p>
      </div>
    </div>
  `;

  try {
    // 1. Fetch Summary Statistics
    const stats = await api.get('/analytics/summary');
    
    // 2. Fetch Placed Students for the "Recent Activity" (optional, for now use summary)
    // const placedStudents = await api.get('/analytics/placed-students');

    renderDashboard(container, app, stats);
  } catch (err) {
    container.innerHTML = `
      <div class="card" style="padding: 40px; text-align: center; margin: 24px;">
        <ion-icon name="alert-circle-outline" style="font-size: 3rem; color: #ef4444;"></ion-icon>
        <h2 style="margin-top: 16px;">Backend Connection Failed</h2>
        <p style="color:var(--text-muted); margin-top: 8px;">${err.message}</p>
        <button onclick="window.location.reload()" class="btn-primary" style="margin-top: 24px;">Retry Connection</button>
      </div>
    `;
  }
}

function renderDashboard(container, app, stats) {
  const userName = app.state.user.name.split(' ')[0] || app.state.user.name;

  container.innerHTML = `
    <!-- Welcome Header -->
    <div class="dashboard-header" style="margin-bottom: 32px;">
      <h1 style="font-size: 2rem; color: var(--primary);">Welcome back, ${userName}! 👋</h1>
      <p style="color: var(--text-muted);">Live data from your online database.</p>
    </div>

    <!-- Stats Grid -->
    <div class="coord-stats-grid">
      ${renderStatCard('people', 'Total Students', stats.totalStudents, 'Across all batches', 'primary')}
      ${renderStatCard('checkmark-circle', 'Placements', stats.totalPlaced, `${stats.placementRate}% Success Rate`, 'success')}
      ${renderStatCard('business', 'Companies', stats.totalCompanies, 'Registered Partners', 'accent')}
      ${renderStatCard('document-text', 'Applications', stats.totalApplications, 'Under review', 'warning')}
    </div>

    <!-- Placement Progress Bar -->
    <div class="card coord-progress-card">
      <div class="coord-progress-header">
        <div>
          <h3 class="coord-progress-title">Global Placement Progress</h3>
          <p class="coord-progress-sub">${stats.totalPlaced} out of ${stats.totalStudents} students placed</p>
        </div>
        <span class="coord-progress-badge">${stats.placementRate}%</span>
      </div>
      <div class="coord-progress-track">
        <div class="coord-progress-fill" style="width: ${stats.placementRate}%"></div>
      </div>
    </div>

    <div style="margin-top: 32px; padding: 24px; text-align:center;" class="card">
        <h3 style="color:var(--primary)">Connection Status: ONLINE ✅</h3>
        <p style="color:var(--text-muted); font-size: 0.9rem; margin-top:8px;">Database Host: ${localStorage.getItem('placement_server_host') || 'Remote Aiven Cluster'}</p>
    </div>
  `;
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
