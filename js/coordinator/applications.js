// js/coordinator/applications.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Application Management</h1>
            <p style="color: var(--text-muted);">Review and update status for student applications.</p>
        </div>
        
        <div class="card" style="margin-bottom: 24px;">
            <div style="display: flex; gap: 16px; align-items: flex-end;">
                <div class="form-group" style="flex: 1; margin-bottom: 0;">
                    <label>SELECT COMPANY</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
                        <option>Global Tech Solutions</option>
                        <option>Nexus Analytics</option>
                        <option>Amazon</option>
                    </select>
                </div>
                <button class="btn-primary">Load Applicants</button>
            </div>
        </div>

        <div class="card">
            <h3>Recent Applications</h3>
            <div class="data-table-container" style="margin-top: 20px;">
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>CGPA</th>
                            <th>ATS Score</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Alex Sterling</b></td>
                            <td>9.42</td>
                            <td>88%</td>
                            <td><span class="tag tag-info">Under Review</span></td>
                            <td><button class="btn-primary" style="padding: 6px 12px; font-size: 0.7rem;">Update</button></td>
                        </tr>
                        <tr>
                            <td><b>Sara Chen</b></td>
                            <td>8.95</td>
                            <td>92%</td>
                            <td><span class="tag tag-warning">Interviewing</span></td>
                            <td><button class="btn-primary" style="padding: 6px 12px; font-size: 0.7rem;">Update</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
