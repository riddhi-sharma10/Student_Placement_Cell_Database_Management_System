// js/coordinator/navbar.js

export const Navbar = {
    render(user, app) {
        const navbar = document.getElementById('top-navbar');
        if (!navbar) return;

        this._app = app;
        const cleanName = user.name || 'Coordinator';

        navbar.innerHTML = `
            <div class="search-bar">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search for jobs, companies or students...">
            </div>
            <div class="nav-actions">
                <div class="icon-btn" id="nav-notifications" style="cursor: pointer;">
                    <ion-icon name="notifications-outline"></ion-icon>
                    <span class="badge">0</span>
                </div>
                <div class="icon-btn" id="nav-messages" style="cursor: pointer;">
                    <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                </div>
                <div class="user-profile-sm" id="nav-profile-link" style="cursor: pointer; transition: opacity 0.2s;">
                    <div class="user-info-text" style="text-align: right;">
                        <span class="name" style="text-transform: capitalize; font-weight: 700; color: var(--primary);">${cleanName}</span>
                        <span class="role" style="font-weight: 600; font-size: 0.7rem; opacity: 0.6;">COORDINATOR</span>
                    </div>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${user.entityId || 'coordinator'}" alt="Avatar" class="avatar" style="border: 2px solid var(--border);">
                </div>
            </div>
        `;

        // Notification Click
        document.getElementById('nav-notifications')?.addEventListener('click', () => {
            // Future module
        });

        // Messages Click
        document.getElementById('nav-messages')?.addEventListener('click', () => {
            // Future module
        });

        // Profile Click
        document.getElementById('nav-profile-link')?.addEventListener('click', () => {
            const appRef = this._app || window.App;
            if (appRef?.navigateTo) {
                appRef.navigateTo('profile');
                if (appRef.Sidebar?.updateActive) appRef.Sidebar.updateActive('profile');
            }
        });

        // Add hover effect
        const profileLink = document.getElementById('nav-profile-link');
        if (profileLink) {
            profileLink.addEventListener('mouseenter', () => profileLink.style.opacity = '0.7');
            profileLink.addEventListener('mouseleave', () => profileLink.style.opacity = '1');
        }
    }
};
