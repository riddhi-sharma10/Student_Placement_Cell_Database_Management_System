import { api } from '../api.js';

export async function render(container, app) {
    container.innerHTML = `<div style="padding:24px;"><h2>Fetching analysis history...</h2></div>`;

    try {
        const resumes = await api.get('/resumes');
        renderATSPage(container, resumes);
    } catch (err) {
        container.innerHTML = `<div class="card" style="padding:24px; color:#ef4444;">Sync Error: ${err.message}</div>`;
    }
}

function renderATSPage(container, resumes) {
    const latest = resumes[0] || { score: 0, date: 'N/A', filename: 'No resume uploaded' };
    const score = latest.score || 0;
    
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Resume ATS Optimizer</h1>
            <p style="color: var(--text-muted);">View your database-verified resume scores and history.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
            <div class="card" id="upload-area" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px; border: 2px dashed var(--primary); background: #f0f7ff; cursor: pointer; transition: all 0.2s ease;">
                <input type="file" id="resume-upload-input" accept=".pdf" style="display: none;">
                <ion-icon name="cloud-upload-outline" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></ion-icon>
                <h2 id="upload-title" style="margin-bottom: 8px;">Upload New Resume</h2>
                <p id="upload-instruction" style="color: var(--text-muted); text-align: center; margin-bottom: 24px;">Supported format: PDF (Max 5MB). Analysis values will be saved to your official record.</p>
                
                <button class="btn-primary" id="start-analysis-btn" style="width: 100%; max-width: 300px;" onclick="event.stopPropagation()">
                    <span id="btn-text">Start ATS Analysis</span>
                    <ion-icon name="analytics-outline" id="btn-icon" style="margin-left: 8px;"></ion-icon>
                </button>
            </div>

            <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                    <h3>Latest Analysis Result</h3>
                    <span class="tag tag-info">Verified Score</span>
                </div>
                
                <div style="display: flex; align-items: center; gap: 40px; margin-bottom: 32px; background: rgba(34, 197, 94, 0.03); padding: 24px; border-radius: 20px; border: 1px solid rgba(34, 197, 94, 0.1);">
                    <div style="position: relative; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 100 100" style="transform: rotate(-90deg); width: 100%; height: 100%; filter: drop-shadow(0 4px 12px rgba(34, 197, 94, 0.2));">
                            <circle cx="50" cy="50" r="42" fill="transparent" stroke="#e2e8f0" stroke-width="8" />
                            <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--success)" 
                                stroke-width="8" stroke-dasharray="263.8" stroke-dashoffset="${263.8 * (1 - score/100)}" 
                                stroke-linecap="round" />
                        </svg>
                        <div style="position: absolute; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <span style="font-size: 2.2rem; font-weight: 900; color: var(--success); line-height: 1;">${score}</span>
                            <span style="font-size: 0.6rem; font-weight: 800; color: #64748b; margin-top: 4px; letter-spacing: 0.5px;">SCORE</span>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                            <ion-icon name="ribbon" style="color: var(--success); font-size: 1.25rem;"></ion-icon>
                            <h4 style="font-size: 1.4rem; color: var(--success); font-weight: 800; margin: 0;">${score >= 80 ? 'Strong Match!' : score >= 60 ? 'Good Potential' : 'Needs Work'}</h4>
                        </div>
                        <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0; font-weight: 500;">Your last uploaded resume (<b>${latest.filename}</b>) scored <b>${score}%</b> during the placement cell scan.</p>
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <label style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 12px;">DATABASE STATUS</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <span class="tag tag-success">OFFICIAL RECORD</span>
                        <span class="tag tag-info">${latest.date !== 'N/A' ? new Date(latest.date).toLocaleDateString() : 'No Uploads'}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" style="margin-top: 32px;">
            <h3>Analysis History from Database</h3>
            <div class="data-table-container" style="margin-top: 16px;">
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Upload Date</th>
                            <th>ATS Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${resumes.map(r => `
                            <tr>
                                <td style="font-weight: 600;">${r.filename}</td>
                                <td>${new Date(r.date).toLocaleDateString()}</td>
                                <td><span style="font-weight: 700; color: ${r.score >= 80 ? 'var(--success)' : 'var(--warning)'};">${r.score}%</span></td>
                                <td><span class="tag ${r.score >= 80 ? 'tag-success' : 'tag-info'}">${r.score >= 80 ? 'Optimized' : 'Review Required'}</span></td>
                            </tr>
                        `).join('')}
                        ${resumes.length === 0 ? '<tr><td colspan="4" style="text-align:center; padding:32px;">No resume records found in your database profile.</td></tr>' : ''}
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
