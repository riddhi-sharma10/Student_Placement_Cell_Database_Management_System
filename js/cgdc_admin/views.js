// js/admin/views.js — Explores MySQL Views
import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Fetching View Definitions...</h2></div>`;

    try {
        const { availableViews, descriptions } = await api.get('/views');
        renderViewsList(container, availableViews, descriptions);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px;">Error: ${err.message}. Make sure views are created in MySQL.</div>`;
    }
}

function renderViewsList(container, views, descriptions) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">MySQL Database Views</h1>
            <p style="color: var(--text-muted);">Virtual tables generated from complex JOINs for better performance.</p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 2fr; gap: 24px;">
            <div class="card" style="padding:0; overflow:hidden;">
                <div style="padding:16px; background:var(--bg-muted); font-weight:700;">Available Views</div>
                ${views.map(v => `
                    <div class="view-item" onclick="window.fetchViewData('${v}')" 
                         style="padding:16px; border-bottom:1px solid var(--border); cursor:pointer; hover:background:#f8fafc;">
                        <div style="font-weight:600; color:var(--primary);">${v}</div>
                        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${descriptions[v]}</div>
                    </div>
                `).join('')}
            </div>

            <div id="view-result-pane">
                <div class="card" style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; color:var(--text-muted);">
                    <ion-icon name="eye-outline" style="font-size:3rem; opacity:0.3;"></ion-icon>
                    <p style="margin-top:16px;">Select a view from the left to see live data</p>
                </div>
            </div>
        </div>
    `;

    window.fetchViewData = async (viewName) => {
        const pane = document.getElementById('view-result-pane');
        pane.innerHTML = `<div class="card"><h3>Loading ${viewName}...</h3></div>`;
        
        try {
            const data = await api.get(`/views/${viewName}`);
            renderTable(pane, viewName, data.rows);
        } catch (err) {
            pane.innerHTML = `<div class="card" style="color:#ef4444;">Failed to fetch view: ${err.message}</div>`;
        }
    };
}

function renderTable(container, title, rows) {
    if (rows.length === 0) {
        container.innerHTML = `<div class="card"><h3>${title}</h3><p>No data found in this view.</p></div>`;
        return;
    }

    const headers = Object.keys(rows[0]);

    container.innerHTML = `
        <div class="card">
            <h3 style="margin-top:0; color:var(--primary);">${title}</h3>
            <p style="color:var(--text-muted); margin-bottom:20px;">Fetching from <code>SELECT * FROM ${title}</code></p>
            <div class="data-table-container" style="max-height:500px; overflow-y:auto;">
                <table>
                    <thead>
                        <tr>
                            ${headers.map(h => `<th>${h.replace(/_/g, ' ')}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                ${headers.map(h => `<td>${row[h]}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
