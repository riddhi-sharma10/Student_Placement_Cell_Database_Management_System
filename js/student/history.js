// js/student/history.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Placement History</h1>
            <p style="color: var(--text-muted);">View companies and placement records from previous years.</p>
        </div>

        <div class="card" style="margin-bottom: 32px;">
            <div style="display: flex; gap: 16px; align-items: flex-end;">
                <div class="form-group" style="flex: 1; margin-bottom: 0;">
                    <label>SELECT ACADEMIC YEAR</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        <option>2023-2024</option>
                        <option>2022-2023</option>
                        <option>2021-2022</option>
                    </select>
                </div>
                <div class="form-group" style="flex: 1; margin-bottom: 0;">
                    <label>DEPARTMENT</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        <option>All Departments</option>
                        <option>CSE</option>
                        <option>ECE</option>
                    </select>
                </div>
                <button class="btn-primary">Search Records</button>
            </div>
        </div>

        <div class="card">
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Job Role</th>
                            <th>Total Placed</th>
                            <th>Highest Package</th>
                            <th>Average Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Google India</b></td>
                            <td>SDE / Analayst</td>
                            <td>12</td>
                            <td style="color: var(--success); font-weight: 700;">₹45.0 LPA</td>
                            <td>₹18.5 LPA</td>
                        </tr>
                        <tr>
                            <td><b>Amazon</b></td>
                            <td>Cloud Associate</td>
                            <td>18</td>
                            <td style="color: var(--success); font-weight: 700;">₹32.0 LPA</td>
                            <td>₹14.2 LPA</td>
                        </tr>
                        <tr>
                            <td><b>TCS Digital</b></td>
                            <td>System Engineer</td>
                            <td>156</td>
                            <td style="color: var(--success); font-weight: 700;">₹7.5 LPA</td>
                            <td>₹7.0 LPA</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
