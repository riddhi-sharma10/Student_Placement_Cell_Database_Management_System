// js/common/navbar.js

export const Navbar = {
    render(user) {
        const navbar = document.getElementById('top-navbar');
        navbar.innerHTML = `
            <div class="search-bar">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search for jobs, companies or students...">
            </div>
            <div class="nav-actions">
                <div class="icon-btn" id="nav-notifications" style="cursor: pointer;">
                    <ion-icon name="notifications-outline"></ion-icon>
                    <span class="badge">3</span>
                </div>
                <div class="icon-btn" id="nav-messages" style="cursor: pointer;">
                    <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                    <span class="badge">1</span>
                </div>
                <div class="user-profile-sm">
                    <div class="user-info-text" style="text-align: right;">
                        <span class="name" style="text-transform: capitalize;">${user.name}</span>
                        <span class="role">${user.role.toUpperCase()}</span>
                    </div>
                    <img src="${user.avatar}" alt="Avatar" class="avatar">
                </div>
            </div>
        `;

        // Notification Click
        document.getElementById('nav-notifications').addEventListener('click', () => {
            window.App.navigateTo('notifications');
        });

        // Messages Click
        document.getElementById('nav-messages').addEventListener('click', () => {
            window.App.navigateTo('messages');
        });
    }
};
