// js/coordinator/jobs.js — API Version
import { api } from '../api.js';

let searchQuery = '';
let allJobs = [];

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Loading Opportunities...</h2></div>`;

    try {
        allJobs = await api.get('/jobs');
        renderPage(container);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Error fetching jobs: ${err.message}</div>`;
    }
}

function renderPage(container) {
    const filtered = allJobs.filter(j => 
        j.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
        j.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Global Opportunities</h1>
            <p style="color: var(--text-muted);">Job profiles and requirements from the online database.</p>
        </div>

        <div class="card" style="margin-bottom: 24px;">
            <input id="opp-search" type="text" placeholder="Search by company or role..." 
                value="${searchQuery}" style="width:100%; padding:14px; border:1px solid var(--border); border-radius:10px;">
        </div>

        <div class="coord-jobs-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:24px;">
            ${filtered.map(j => `
                <div class="card coord-job-card" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:16px;">
                            <div style="width:48px; height:48px; background:var(--primary); color:white; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:800;">${j.company.charAt(0)}</div>
                            <span class="tag tag-success">₹${j.package} LPA</span>
                        </div>
                        <h3>${j.company}</h3>
                        <p style="color:var(--text-muted); margin-top:4px;">${j.role}</p>
                    </div>
                    
                    <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem; color:var(--text-muted);"><ion-icon name="calendar-outline"></ion-icon> Active</span>
                        <button class="btn-primary" style="padding:8px 16px; font-size:0.85rem; border-radius:6px;">View Full Profile</button>
                    </div>
                </div>
            `).join('')}
            ${filtered.length === 0 ? '<div class="card">No jobs match your search.</div>' : ''}
        </div>
    `;

    container.querySelector('#opp-search').addEventListener('input', e => {
        searchQuery = e.target.value;
        renderPage(container);
    });
}
