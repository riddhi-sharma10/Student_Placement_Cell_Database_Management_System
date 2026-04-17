import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Fetching placement archives...</h2></div>`;

    try {
        const historyData = await api.get('/analytics/history');
        renderHistoryPage(container, historyData);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Sync Error: ${err.message}</div>`;
    }
}

function renderHistoryPage(container, archiveData) {
    let currentYear = "2024";
    let currentDept = "All Departments";

    const renderSelf = () => {
        const filteredRecords = archiveData.filter(record => {
            const matchYear = record.year.includes(currentYear);
            const matchDept = currentDept === "All Departments" || (record.dept && record.dept === currentDept);
            return matchYear && matchDept;
        });

        container.innerHTML = `
            <div class="dashboard-header" style="margin-bottom: 32px;">
                <h1 style="font-size: 2rem; color: var(--primary);">Placement History</h1>
                <p style="color: var(--text-muted);">View companies and placement records from previous years.</p>
            </div>

            <div class="card" style="margin-bottom: 32px;">
                <div style="display: flex; gap: 16px; align-items: flex-end;">
                    <div class="form-group" style="flex: 1; margin-bottom: 0;">
                        <label>SELECT ACADEMIC YEAR</label>
                        <select id="year-select" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                            <option ${currentYear === '2024-2025' ? 'selected' : ''}>2024-2025</option>
                            <option ${currentYear === '2023-2024' ? 'selected' : ''}>2023-2024</option>
                            <option ${currentYear === '2022-2023' ? 'selected' : ''}>2022-2023</option>
                            <option ${currentYear === '2021-2022' ? 'selected' : ''}>2021-2022</option>
                        </select>
                    </div>
                    <div class="form-group" style="flex: 1; margin-bottom: 0;">
                        <label>DEPARTMENT</label>
                        <select id="dept-select" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                            <option ${currentDept === 'All Departments' ? 'selected' : ''}>All Departments</option>
                            <option ${currentDept === 'CSE' ? 'selected' : ''}>CSE</option>
                            <option ${currentDept === 'ECE' ? 'selected' : ''}>ECE</option>
                            <option ${currentDept === 'ME' ? 'selected' : ''}>ME</option>
                        </select>
                    </div>
                    <button class="btn-primary" id="search-history-btn" style="min-width: 150px;">Search Records</button>
                </div>
            </div>

            <div class="card">
                <div class="data-table-container">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 1px solid var(--border);">
                                <th style="padding: 16px;">Year</th>
                                <th style="padding: 16px;">Dept</th>
                                <th style="padding: 16px;">Company</th>
                                <th style="padding: 16px;">Job Role</th>
                                <th style="padding: 16px;">Total Placed</th>
                                <th style="padding: 16px;">Highest Package</th>
                                <th style="padding: 16px;">Average Package</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredRecords.length > 0 
                                ? filteredRecords.map(record => `
                                    <tr style="border-bottom: 1px solid var(--border);">
                                        <td style="padding: 16px; font-weight: 600; color: var(--primary);">${record.year}</td>
                                        <td style="padding: 16px;"><span class="tag tag-info">${record.dept || 'N/A'}</span></td>
                                        <td style="padding: 16px;"><b>${record.comp_name}</b></td>
                                        <td style="padding: 16px;">${record.role || 'N/A'}</td>
                                        <td style="padding: 16px;">${record.placed}</td>
                                        <td style="padding: 16px; color: var(--success); font-weight: 700;">${record.highest}</td>
                                        <td style="padding: 16px; font-weight: 600;">${record.average}</td>
                                    </tr>
                                `).join('')
                                : `<tr>
                                    <td colspan="7" style="text-align: center; padding: 48px; color: var(--text-muted);">
                                        No placement records found for this criteria.
                                    </td>
                                   </tr>`
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        setupHandlers();
    };

    const setupHandlers = () => {
        document.getElementById('search-history-btn').addEventListener('click', () => {
            currentYear = document.getElementById('year-select').value;
            currentDept = document.getElementById('dept-select').value;
            renderSelf();
        });
    };

    renderSelf();
}
