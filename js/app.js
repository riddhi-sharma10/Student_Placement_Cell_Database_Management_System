// js/app.js - Main Application Orchestrator

import { initLogin } from './auth/login.js';
import { Sidebar } from './common/sidebar.js';
import { Navbar } from './common/navbar.js';

const App = {
    state: {
        user: null,
        role: null, // 'student', 'coordinator', 'admin'
        currentPage: 'dashboard'
    },

    init() {
        console.log("Placement Portal Initialized");
        this.checkAuth();
    },

    checkAuth() {
        const savedUser = localStorage.getItem('placement_user');
        if (savedUser) {
            this.state.user = JSON.parse(savedUser);
            this.state.role = this.state.user.role;
            this.showPortal();
        } else {
            this.showLogin();
        }
    },

    showLogin() {
        document.getElementById('auth-container').classList.remove('hidden');
        document.getElementById('portal-container').classList.add('hidden');
        initLogin(this);
    },

    showPortal() {
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('portal-container').classList.remove('hidden');
        
        // Initialize Core UI
        Sidebar.render(this.state.role, this);
        Navbar.render(this.state.user);
        
        // Load default page
        this.navigateTo('dashboard');
    },

    async navigateTo(pageId) {
        this.state.currentPage = pageId;
        const pageContent = document.getElementById('page-content');
        
        // Update Sidebar active state
        Sidebar.updateActive(pageId);

        // Dynamic Module Loading based on role and page
        try {
            let module;
            const role = this.state.role;
            const commonPages = ['settings', 'notifications', 'messages'];
            
            let modulePath;
            if (commonPages.includes(pageId)) {
                modulePath = `./common/${pageId}.js`;
            } else {
                modulePath = `./${role}/${pageId}.js`;
            }
            
            module = await import(modulePath);
            
            if (module && module.render) {
                pageContent.innerHTML = '';
                module.render(pageContent, this);
            } else {
                pageContent.innerHTML = `<h1>Page not found: ${pageId}</h1>`;
            }
        } catch (error) {
            console.error("Navigation error:", error);
            pageContent.innerHTML = `
                <div class="card">
                    <h2>Error loading page</h2>
                    <p>The module for <b>${pageId}</b> could not be loaded.</p>
                </div>
            `;
        }
    },

    logout() {
        localStorage.removeItem('placement_user');
        this.state.user = null;
        this.state.role = null;
        window.location.reload();
    }
};

window.App = App;
App.init();

export default App;
