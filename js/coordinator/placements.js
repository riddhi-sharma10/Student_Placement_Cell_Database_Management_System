// js/coordinator/placements.js — API Version
import { api } from '../api.js';

let filterStatus = "All";
let searchQuery = "";
let allStudents = [];

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Syncing with Database...</h2></div>`;

    try {
        // Fetch students with their application counts
        const data = await api.get('/analytics/students-with-applications');
        allStudents = data.rows;
        updatePlacementsDisplay(container);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:40px; text-align:center;">
            <h2 style="color:#ef4444;">Sync Failed</h2>
            <p>${err.message}</p>
        </div>`;
    }

    // Event listeners
    setTimeout(() => {
        const statusSelect = container.querySelector("#filterStatus");
        const searchInput = container.querySelector("#searchStudent");

        if (statusSelect) {
            statusSelect.addEventListener("change", (e) => {
                filterStatus = e.target.value;
                updatePlacementsDisplay(container);
            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                searchQuery = e.target.value.toLowerCase();
                updatePlacementsDisplay(container);
            });
        }
    }, 0);
}

function updatePlacementsDisplay(container) {
    const filtered = allStudents.filter(s => {
        const searchMatch = s.student_name.toLowerCase().includes(searchQuery);
        return searchMatch;
    });

    // Stats
    const total = allStudents.length;
    const placed = allStudents.filter(s => s.selected_count > 0).length;

    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Placement Analytics</h1>
            <p style="color: var(--text-muted);">Real-time tracking of applications and offers from the server.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;">
            <div class="card" style="padding: 24px; text-align: center;">
                <label style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Database Records</label>
                <div style="font-size: 3rem; font-weight: 800; color: var(--primary); margin-top: 8px;">${total}</div>
                <p style="color: var(--text-muted);">Total students tracked</p>
            </div>
            <div class="card" style="padding: 24px; text-align: center;">
                <label style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Verified Placements</label>
                <div style="font-size: 3rem; font-weight: 800; color: var(--success); margin-top: 8px;">${placed}</div>
                <p style="color: var(--text-muted);">${((placed/total)*100).toFixed(1)}% Success Rate</p>
            </div>
        </div>

        <div class="card" style="margin-bottom: 24px;">
            <div class="form-group" style="margin-bottom: 0;">
                <input id="searchStudent" type="text" placeholder="Search by student name..." style="width:100%; padding:14px; border:1px solid var(--border); border-radius:10px;">
            </div>
        </div>

        <div class="card">
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Roll No</th>
                            <th style="text-align:center">CGPA</th>
                            <th style="text-align:center">Applications</th>
                            <th style="text-align:center">Offers</th>
                            <th style="text-align:center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.map(s => `
                            <tr>
                                <td><b>${s.student_name}</b></td>
                                <td>${s.roll_no}</td>
                                <td style="text-align:center">${s.cgpa}</td>
                                <td style="text-align:center"><span class="tag tag-info">${s.total_applications}</span></td>
                                <td style="text-align:center"><b style="color:var(--success)">${s.selected_count}</b></td>
                                <td style="text-align:center">
                                    <span class="tag ${s.selected_count > 0 ? 'tag-success' : 'tag-warning'}">
                                        ${s.selected_count > 0 ? 'Placed' : 'In Progress'}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
