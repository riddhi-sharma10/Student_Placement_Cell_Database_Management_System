// js/admin/users.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">User Directory</h1>
            <p style="color: var(--text-muted);">Manage all users across the institution.</p>
        </div>
        <div class="card">
            <h3>Registered Users</h3>
            <div class="data-table-container" style="margin-top: 20px;">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>2021CSE001</td><td>Student</td><td><span class="tag tag-success">Active</span></td><td>Edit</td></tr>
                        <tr><td>coord_mathur</td><td>Coordinator</td><td><span class="tag tag-success">Active</span></td><td>Edit</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
