// js/student/opportunities.js — API Version
import { api } from '../api.js';

let allJobs = [];
let searchQuery = '';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Fetching job feed...</h2></div>`;

    try {
        allJobs = await api.get('/jobs');
        renderPage(container);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Error: ${err.message}</div>`;
    }
}

function renderPage(container) {
    const filtered = allJobs.filter(j => 
        j.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
        j.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Job Opportunities</h1>
            <p style="color: var(--text-muted);">Real-time job listings from the placement database.</p>
        </div>

        <div class="card" style="margin-bottom: 32px;">
            <div style="display: flex; gap: 16px;">
                <input id="search-input" type="text" placeholder="Search company or role..." 
                    value="${searchQuery}" style="flex: 1; padding: 14px; border: 1px solid var(--border); border-radius: 10px;">
                <button class="btn-primary" style="padding: 0 32px;">Search</button>
            </div>
        </div>

        <div id="job-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
            ${filtered.map(job => `
                <div class="card job-card" style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="display: flex; gap: 16px; align-items: center;">
                            <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800;">
                                ${job.company.charAt(0)}
                            </div>
                            <div>
                                <h3 style="font-size: 1.1rem;">${job.company}</h3>
                                <p style="font-size: 0.9rem; color: var(--text-muted);">${job.role}</p>
                            </div>
                        </div>
                        <span class="tag tag-success">₹${job.package} LPA</span>
                    </div>
                    
                    <div style="margin-top: 12px; display: flex; gap: 12px;">
                        <button class="btn-primary" style="flex: 1;" onclick="alert('Proceeding to Application for JOB-${job.id}')">Apply Now</button>
                    </div>
                </div>
            `).join('')}
            ${filtered.length === 0 ? '<div class="card" style="grid-column: 1/-1;">No jobs found.</div>' : ''}
        </div>
    `;

    container.querySelector('#search-input').addEventListener('input', e => {
        searchQuery = e.target.value;
        renderPage(container);
    });
}
