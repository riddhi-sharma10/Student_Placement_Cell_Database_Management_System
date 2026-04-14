// js/coordinator/sidebar.js

export const Sidebar = {
  render(role, app) {
    const sidebar = document.getElementById('sidebar');

    const menu = [
      { id: 'dashboard',    label: 'Dashboard',      icon: 'speedometer-outline' },
      { id: 'students',     label: 'My Students',    icon: 'people-outline' },
      { id: 'jobs',         label: 'Opportunities',  icon: 'briefcase-outline' },
      { id: 'applications', label: 'Applications',   icon: 'documents-outline' },
      { id: 'company',      label: 'Company View',   icon: 'business-outline' },
      { id: 'messages',     label: 'Messages',       icon: 'chatbubble-outline' },
    ];

    const system = [
      { id: 'settings', label: 'Settings', icon: 'settings-outline' },
    ];

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div>
          <div class="brand">PORTALX</div>
          <div class="brand-subtext">ACADEMIC PRESTIGE</div>
        </div>
      </div>

      <div class="sidebar-nav">
        <div class="nav-group">
          <div class="nav-label">Main Menu</div>
          ${menu.map(item => `
            <div class="nav-item" data-page="${item.id}">
              <ion-icon name="${item.icon}"></ion-icon>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
        <div class="nav-group">
          <div class="nav-label">System</div>
          ${system.map(item => `
            <div class="nav-item" data-page="${item.id}">
              <ion-icon name="${item.icon}"></ion-icon>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="sidebar-footer">
        <div class="nav-item" id="logout-btn" style="color: #fda4af;">
          <ion-icon name="log-out-outline"></ion-icon>
          <span>Logout</span>
        </div>
      </div>
    `;

    // Nav clicks
    sidebar.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', () => app.navigateTo(item.dataset.page));
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) app.logout();
    });
  },

  updateActive(pageId) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
  },
};
