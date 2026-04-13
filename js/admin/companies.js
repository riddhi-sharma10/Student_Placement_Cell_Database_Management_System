// js/admin/companies.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h1 style="font-size: 2rem; color: var(--primary);">Registered Companies</h1>
                <p style="color: var(--text-muted);">Manage the directory of partner companies.</p>
            </div>
            <button class="btn-primary">+ Add New Company</button>
        </div>

        <div class="card">
            <div class="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Industry</th>
                            <th>Tier</th>
                            <th>Active Jobs</th>
                            <th>Total Placements</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Google India</b></td>
                            <td>Technology</td>
                            <td><span class="tag tag-warning">Dream</span></td>
                            <td>4</td>
                            <td>156</td>
                            <td><button class="btn-primary" style="padding: 6px 12px; font-size: 0.7rem;">Details</button></td>
                        </tr>
                        <tr>
                            <td><b>J.P. Morgan</b></td>
                            <td>Fintech</td>
                            <td><span class="tag tag-info">Tier 1</span></td>
                            <td>2</td>
                            <td>89</td>
                            <td><button class="btn-primary" style="padding: 6px 12px; font-size: 0.7rem;">Details</button></td>
                        </tr>
                        <tr>
                            <td><b>TCS</b></td>
                            <td>IT Services</td>
                            <td><span class="tag tag-info">Mass</span></td>
                            <td>12</td>
                            <td>1450</td>
                            <td><button class="btn-primary" style="padding: 6px 12px; font-size: 0.7rem;">Details</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
