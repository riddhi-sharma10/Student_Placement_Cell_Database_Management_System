// js/student/ats.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Resume ATS Optimizer</h1>
            <p style="color: var(--text-muted);">Analyze your resume against industry standards and job descriptions.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
            <div class="card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px; border: 2px dashed var(--primary); background: #f0f7ff;">
                <ion-icon name="cloud-upload-outline" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></ion-icon>
                <h2 style="margin-bottom: 8px;">Upload New Resume</h2>
                <p style="color: var(--text-muted); text-align: center; margin-bottom: 24px;">Drag and drop your PDF resume here or click to browse. Supported format: PDF (Max 5MB)</p>
                
                <div class="form-group" style="width: 100%; max-width: 300px;">
                    <label>VERSION LABEL</label>
                    <input type="text" placeholder="e.g. Software Engineer v2" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 16px;">
                </div>
                
                <button class="btn-primary" style="width: 100%; max-width: 300px;">
                    Start ATS Analysis <ion-icon name="analytics-outline" style="margin-left: 8px;"></ion-icon>
                </button>
            </div>

            <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                    <h3>Latest Analysis Result</h3>
                    <span class="tag tag-info">Latest: Oct 12, 2024</span>
                </div>
                
                <div style="display: flex; align-items: center; gap: 32px; margin-bottom: 32px;">
                    <div style="width: 120px; height: 120px; border-radius: 50%; border: 10px solid #dcfce7; display: flex; align-items: center; justify-content: center; position: relative;">
                        <span style="font-size: 2rem; font-weight: 800; color: var(--success);">88</span>
                        <span style="position: absolute; bottom: 10px; font-size: 0.7rem; font-weight: 700; color: var(--text-muted);">OUT OF 100</span>
                    </div>
                    <div>
                        <h4 style="font-size: 1.25rem; color: var(--success);">Strong Match!</h4>
                        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.4;">Your resume performs exceptionally well for "Software Engineer" roles. We found 14/15 core keywords.</p>
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 12px;">KEYWORDS FOUND</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <span class="tag tag-success">Python</span>
                        <span class="tag tag-success">React</span>
                        <span class="tag tag-success">Node.js</span>
                        <span class="tag tag-success">REST API</span>
                        <span class="tag tag-success">Docker</span>
                        <span class="tag tag-success">Git</span>
                        <span class="tag tag-success">Agile</span>
                    </div>
                </div>

                <div>
                    <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 12px;">MISSING KEYWORDS (IMPROVE)</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <span class="tag tag-danger">Kubernetes</span>
                        <span class="tag tag-danger">CI/CD Pipeline</span>
                        <span class="tag tag-danger">TypeScript</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" style="margin-top: 32px;">
            <h3>Analysis History</h3>
            <div class="data-table-container" style="margin-top: 16px;">
                <table>
                    <thead>
                        <tr>
                            <th>Version Label</th>
                            <th>Date</th>
                            <th>ATS Score</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="font-weight: 600;">Software Engineer v2</td>
                            <td>Oct 12, 2024</td>
                            <td><span style="font-weight: 700; color: var(--success);">88%</span></td>
                            <td><span class="tag tag-success">Optimized</span></td>
                            <td><button class="btn-primary" style="padding: 6px 12px; font-size: 0.75rem;">Download Report</button></td>
                        </tr>
                        <tr>
                            <td style="font-weight: 600;">Frontend Developer v1</td>
                            <td>Oct 05, 2024</td>
                            <td><span style="font-weight: 700; color: var(--warning);">72%</span></td>
                            <td><span class="tag tag-info">Needs Review</span></td>
                            <td><button class="btn-primary" style="padding: 6px 12px; font-size: 0.75rem;">Download Report</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
