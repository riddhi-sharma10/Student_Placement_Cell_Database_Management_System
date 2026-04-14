// js/common/sidebar.js

export const Sidebar = {
    render(role, app) {
        const sidebar = document.getElementById('sidebar');
        
        const menuItems = {
            student: [
                { id: 'dashboard', label: 'Dashboard', icon: 'grid-outline' },
                { id: 'profile', label: 'My Profile', icon: 'person-outline' },
                { id: 'opportunities', label: 'Opportunities', icon: 'briefcase-outline' },
                { id: 'applications', label: 'Applications', icon: 'document-text-outline' },
                { id: 'history', label: 'Archives', icon: 'time-outline' },
                { id: 'ats', label: 'ATS Performance', icon: 'analytics-outline' },
            ],
            coordinator: [
                { id: 'dashboard', label: 'Dashboard', icon: 'speedometer-outline' },
                { id: 'jobs', label: 'Job Profiles', icon: 'layers-outline' },
                { id: 'applications', label: 'App Management', icon: 'people-outline' },
                { id: 'company', label: 'Company View', icon: 'business-outline' },
            ],
            admin: [
                { id: 'overview', label: 'Overview', icon: 'earth-outline' },
                { id: 'users', label: 'User Directory', icon: 'people-circle-outline' },
                { id: 'analytics', label: 'Reports & Analytics', icon: 'bar-chart-outline' },
                { id: 'companies', label: 'Registered Cos.', icon: 'business-outline' },
                { id: 'records', label: 'Placement Records', icon: 'archive-outline' },
            ]
        };

        const commonItems = [
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
                    ${menuItems[role].map(item => `
                        <div class="nav-item" data-page="${item.id}">
                            <ion-icon name="${item.icon}"></ion-icon>
                            <span>${item.label}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="nav-group">
                    <div class="nav-label">System</div>
                    ${commonItems.map(item => `
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

        // Add Click Events
        sidebar.querySelectorAll('.nav-item[data-page]').forEach(item => {
            item.addEventListener('click', () => {
                app.navigateTo(item.dataset.page);
            });
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            if (confirm("Are you sure you want to logout?")) {
                app.logout();
            }
        });
    },

    updateActive(pageId) {
        const items = document.querySelectorAll('.nav-item');
        items.forEach(item => {
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};
