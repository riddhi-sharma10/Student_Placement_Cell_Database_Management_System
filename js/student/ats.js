// js/student/ats.js

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Resume ATS Optimizer</h1>
            <p style="color: var(--text-muted);">Analyze your resume against industry standards and job descriptions.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
            <div class="card" id="upload-area" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px; border: 2px dashed var(--primary); background: #f0f7ff; cursor: pointer; transition: all 0.2s ease;">
                <input type="file" id="resume-upload-input" accept=".pdf" style="display: none;">
                <ion-icon name="cloud-upload-outline" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></ion-icon>
                <h2 id="upload-title" style="margin-bottom: 8px;">Upload New Resume</h2>
                <p id="upload-instruction" style="color: var(--text-muted); text-align: center; margin-bottom: 24px;">Drag and drop your PDF resume here or click to browse. Supported format: PDF (Max 5MB)</p>
                
                <div class="form-group" style="width: 100%; max-width: 300px;" onclick="event.stopPropagation()">
                    <label>VERSION LABEL</label>
                    <input type="text" id="version-label" placeholder="e.g. Software Engineer v2" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 16px;">
                </div>
                
                <button class="btn-primary" id="start-analysis-btn" style="width: 100%; max-width: 300px;" onclick="event.stopPropagation()">
                    <span id="btn-text">Start ATS Analysis</span>
                    <ion-icon name="analytics-outline" id="btn-icon" style="margin-left: 8px;"></ion-icon>
                </button>
            </div>

            <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                    <h3>Latest Analysis Result</h3>
                    <span class="tag tag-info">Latest: Oct 12, 2024</span>
                </div>
                
                <div style="display: flex; align-items: center; gap: 40px; margin-bottom: 32px; background: rgba(34, 197, 94, 0.03); padding: 24px; border-radius: 20px; border: 1px solid rgba(34, 197, 94, 0.1);">
                    <div style="position: relative; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 100 100" style="transform: rotate(-90deg); width: 100%; height: 100%; filter: drop-shadow(0 4px 12px rgba(34, 197, 94, 0.2));">
                            <!-- Background Track -->
                            <circle cx="50" cy="50" r="42" fill="transparent" stroke="#e2e8f0" stroke-width="8" />
                            <!-- Progress Bar with Gradient -->
                            <circle cx="50" cy="50" r="42" fill="transparent" stroke="url(#score-gradient)" 
                                stroke-width="8" stroke-dasharray="263.8" stroke-dashoffset="31.6" 
                                stroke-linecap="round" />
                            <defs>
                                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#22c55e" />
                                    <stop offset="100%" stop-color="#4ade80" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div style="position: absolute; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <span style="font-size: 2.2rem; font-weight: 900; color: var(--success); line-height: 1;">88</span>
                            <span style="font-size: 0.6rem; font-weight: 800; color: #64748b; margin-top: 4px; letter-spacing: 0.5px;">SCORE</span>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                            <ion-icon name="ribbon" style="color: var(--success); font-size: 1.25rem;"></ion-icon>
                            <h4 style="font-size: 1.4rem; color: var(--success); font-weight: 800; margin: 0;">Strong Match!</h4>
                        </div>
                        <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0; font-weight: 500;">Your resume performs exceptionally well for <b>Software Engineer</b> roles. We found <b>14/15</b> core keywords during the scan.</p>
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

    // Setup Handlers
    setTimeout(() => {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('resume-upload-input');
        const uploadTitle = document.getElementById('upload-title');
        const uploadText = document.getElementById('upload-instruction');
        const startBtn = document.getElementById('start-analysis-btn');

        if (uploadArea && fileInput) {
            // Trigger file input when clicking the card
            uploadArea.addEventListener('click', () => fileInput.click());

            // Handle file selection
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    if (file.name.toLowerCase().endsWith('.pdf')) {
                        uploadTitle.innerText = "File Selected!";
                        uploadText.innerHTML = `<span style="color: var(--primary); font-weight: 700;">${file.name}</span><br>Click again to change file.`;
                        uploadArea.style.borderColor = "var(--success)";
                        uploadArea.style.background = "rgba(34, 197, 94, 0.05)";
                    } else {
                        alert("Please upload a PDF file.");
                        fileInput.value = "";
                    }
                }
            });

            // Start Analysis Logic
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    if (fileInput.files.length === 0) {
                        alert("Please select a resume (PDF) first.");
                        return;
                    }

                    const btnText = document.getElementById('btn-text');
                    const btnIcon = document.getElementById('btn-icon');
                    
                    // Loading State
                    startBtn.classList.add('btn-disabled');
                    btnText.innerText = "Analyzing Resume...";
                    btnIcon.setAttribute('name', 'sync-outline');
                    btnIcon.classList.add('rotating');

                    setTimeout(() => {
                        alert("ATS Analysis Complete! Your score has been updated.");
                        btnText.innerText = "Start ATS Analysis";
                        btnIcon.setAttribute('name', 'analytics-outline');
                        btnIcon.classList.remove('rotating');
                        startBtn.classList.remove('btn-disabled');
                    }, 2000);
                });
            }
        }
    }, 0);
}
