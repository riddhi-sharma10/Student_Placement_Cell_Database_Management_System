// js/coordinator/company.js — API VERSION
import { api } from '../api.js';

let allCompanies = [];
let selectedCompanyId = null;
let searchQuery = '';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Fetching Companies...</h2></div>`;

    try {
        allCompanies = await api.get('/companies');
        if (allCompanies.length > 0 && !selectedCompanyId) {
            selectedCompanyId = allCompanies[0].id;
        }
        renderPage(container);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Error: ${err.message}</div>`;
    }
}

function renderPage(container) {
    const filtered = allCompanies.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const selected = allCompanies.find(c => c.id === selectedCompanyId) || allCompanies[0];

    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Recruitment Partners</h1>
            <p style="color: var(--text-muted);">Collaborating companies and their active roles.</p>
        </div>

        <div style="display: grid; grid-template-columns: 350px 1fr; gap: 24px; align-items: start;">
            
            <!-- Company List -->
            <div class="card" style="padding: 0; overflow: hidden;">
                <div style="padding: 16px; border-bottom: 1px solid var(--border);">
                    <input id="comp-search" type="text" placeholder="Search partners..." 
                        value="${searchQuery}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border);">
                </div>
                <div style="max-height: 600px; overflow-y: auto;">
                    ${filtered.map(c => `
                        <div class="company-item ${c.id === selectedCompanyId ? 'active' : ''}" 
                             onclick="window.selectCompany(${c.id})"
                             style="padding: 16px; border-bottom: 1px solid var(--border); cursor: pointer; 
                                    background: ${c.id === selectedCompanyId ? '#eff6ff' : 'transparent'};
                                    border-left: 4px solid ${c.id === selectedCompanyId ? 'var(--primary)' : 'transparent'};">
                            <h4 style="margin: 0; color: var(--primary);">${c.name}</h4>
                            <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">${c.industry} • <span class="tag">${c.tier || 'Tier 3'}</span></p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Company Details -->
            <div id="detail-pane">
                ${selected ? renderDetail(selected) : '<div class="card">No company selected</div>'}
            </div>
        </div>
    `;

    // Global helper for click
    window.selectCompany = (id) => {
        selectedCompanyId = id;
        renderPage(container);
    };

    container.querySelector('#comp-search').addEventListener('input', e => {
        searchQuery = e.target.value;
        renderPage(container);
    });
}

function renderDetail(c) {
    return `
        <div class="card" style="margin-bottom: 24px;">
            <div style="display: flex; gap: 24px; align-items: center;">
                <div style="width: 80px; height: 80px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800;">
                    ${c.name.charAt(0)}
                </div>
                <div>
                    <h2 style="margin: 0; color: var(--primary);">${c.name}</h2>
                    <p style="margin: 4px 0 0 0; color: var(--text-muted); font-size: 1.1rem;">${c.industry}</p>
                    <div style="margin-top: 12px; display: flex; gap: 8px;">
                        <span class="tag tag-info">${c.tier || 'Tier 3'}</span>
                        <span class="tag tag-success">Active Partner</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 style="margin-top: 0; color: var(--primary); display: flex; align-items: center; gap: 8px;">
                <ion-icon name="analytics-outline"></ion-icon> Server Insights
            </h3>
            <p style="color:var(--text-muted); margin-bottom: 24px;">Recent stats from the global placement record.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <label style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: #64748b;">Offers Given</label>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-top: 4px;">--</div>
                </div>
                <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <label style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: #64748b;">Average CTC</label>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #10b981; margin-top: 4px;">₹-- LPA</div>
                </div>
            </div>
            
            <div style="margin-top: 24px; padding: 16px; background: #fffbeb; border-radius: 8px; border: 1px solid #fef3c7; display: flex; gap: 12px; align-items: center;">
                <ion-icon name="information-circle" style="color: #d97706; font-size: 1.5rem;"></ion-icon>
                <p style="margin: 0; font-size: 0.9rem; color: #92400e;">Stats are being synced from the <b>${c.name}</b> recruitment history.</p>
            </div>
        </div>
    `;
}
