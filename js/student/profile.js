// js/student/profile.js

export function render(container, app) {
    // Initial State
    let profileData = {
        name: app.state.user.name.replace(/^User\s+/i, ''),
        phone: "+1 (555) 012-3456",
        email: `${app.state.user.username}@university.edu`,
        portfolio: "https://sterling-dev.portfolio",
        summary: "Aspiring Software Engineer with a focus on Systems Architecture and Distributed Computing. Passionate about building scalable cloud infrastructure and optimizing performance for high-traffic applications. Seeking a role that challenges my problem-solving skills in a collaborative dev environment.",
        cgpa: "9.42 / 10.0",
        skills: ["Python", "React.js", "Node.js", "Machine Learning", "SQL"],
        resume: {
            name: "Resume_Final_v2.pdf",
            uploadedAt: "2 weeks ago"
        },
        placementActive: true
    };

    let isSkillDeleteMode = false;

    const profImage = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${app.state.user.username}`;

    const renderSelf = () => {
        container.innerHTML = `
            <div class="profile-header-banner">
                <div class="profile-avatar-wrapper">
                    <img src="${profImage}" alt="Avatar">
                    <div class="profile-verify-badge" style="background: #dcfce7; color: #15803d; border-color: #10b981;">
                        <ion-icon name="checkmark-circle"></ion-icon>
                        PHOTO VERIFIED
                    </div>
                </div>
                
                <div class="profile-info-main">
                    <h1 style="text-transform: capitalize;">${profileData.name}</h1>
                    <div class="profile-info-meta">
                        <span>Computer Science & Engineering</span>
                    </div>
                    <div class="profile-info-meta" style="margin-top: 10px; font-size: 0.9rem;">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <span>Class of 2024</span>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
                <!-- Left Column -->
                <div style="display: flex; flex-direction: column; gap: 32px;">
                    <!-- Personal Information -->
                    <div class="card" id="card-personal">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
                            <ion-icon name="person-circle" style="font-size: 1.8rem; color: var(--primary);"></ion-icon>
                            <h3 style="font-size: 1.3rem;">Personal Information</h3>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                            <div class="form-group" id="field-group-phone">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <label style="margin-bottom: 0;">PHONE NUMBER</label>
                                    <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-phone"></ion-icon>
                                </div>
                                <div id="phone-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                    <ion-icon name="call" style="color: #64748b;"></ion-icon>
                                    <span style="font-weight: 600;">${profileData.phone}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>INSTITUTIONAL EMAIL</label>
                                <div style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; opacity: 0.7; cursor: not-allowed;">
                                    <ion-icon name="lock-closed" style="color: #64748b; flex-shrink: 0;"></ion-icon>
                                    <span style="font-weight: 600; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileData.email}</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group" id="field-group-portfolio">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                <label style="margin-bottom: 0;">PORTFOLIO</label>
                                <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-portfolio"></ion-icon>
                            </div>
                            <div id="portfolio-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                <ion-icon name="link" style="color: #64748b;"></ion-icon>
                                <span style="flex: 1; font-weight: 600; color: #3b82f6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileData.portfolio}</span>
                                <ion-icon name="open-outline" style="color: #94a3b8; cursor: pointer;"></ion-icon>
                            </div>
                        </div>
                    </div>

                    <!-- Professional Summary -->
                    <div class="card" id="field-group-summary">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <ion-icon name="document-text" style="font-size: 1.8rem; color: var(--primary);"></ion-icon>
                                <h3 style="font-size: 1.3rem;">Professional Summary</h3>
                            </div>
                            <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary); font-size: 1.2rem;" id="edit-summary"></ion-icon>
                        </div>
                        <div id="summary-container" style="background: #f1f5f9; padding: 24px; border-radius: 12px; line-height: 1.6; color: #334155; font-size: 0.95rem;">
                            ${profileData.summary}
                        </div>
                    </div>

                    <!-- Current CGPA Card (Minimized) -->
                    <div class="card" id="field-group-cgpa" style="padding: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <ion-icon name="ribbon" style="font-size: 1.5rem; color: var(--primary);"></ion-icon>
                                <h3 style="font-size: 1.1rem;">Current CGPA</h3>
                            </div>
                            <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-cgpa"></ion-icon>
                        </div>
                        <div id="cgpa-container" style="background: #f1f5f9; padding: 12px 20px; border-radius: 12px; display: inline-block;">
                            <span style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${profileData.cgpa}</span>
                        </div>
                    </div>

                    <!-- Placement Status Card -->
                    <div class="card" id="placement-status-card" style="background: linear-gradient(135deg, var(--primary) 0%, #0c1c3a 100%); color: white; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 40px;">
                        <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8; margin-bottom: 8px;">CURRENT DRIVE</span>
                        <h2 style="font-size: 2rem; margin-bottom: 32px;">Placement Status</h2>
                        
                        <div id="placement-badge" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); padding: 32px; border-radius: 20px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 20px; backdrop-filter: blur(10px);">
                            <div style="width: 54px; height: 54px; background: ${profileData.placementActive ? '#ffedd5' : '#fecaca'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);">
                                <ion-icon name="${profileData.placementActive ? 'checkmark-circle' : 'close-circle'}" style="font-size: 2rem;"></ion-icon>
                            </div>
                            <div style="text-align: left;">
                                <h4 style="font-size: 1.1rem; opacity: 0.8;">Currently</h4>
                                <h3 style="font-size: 1.8rem;">${profileData.placementActive ? 'Active' : 'Opted Out'}</h3>
                                <p style="font-size: 0.85rem; opacity: 0.6; margin-top: 4px;">${profileData.placementActive ? 'Open to all incoming offers' : 'Drive participation disabled'}</p>
                            </div>
                        </div>
                        
                        <a href="javascript:void(0)" id="btn-toggle-placement" style="margin-top: 40px; color: #ffedd5; font-size: 0.9rem; font-weight: 700; text-decoration: none; border-bottom: 1px dashed rgba(255,255,255,0.3); padding-bottom: 4px;">
                            ${profileData.placementActive ? 'Opt-out of Placement Drive' : 'Re-enroll in Placement Drive'}
                        </a>
                    </div>
                </div>

                <!-- Right Column -->
                <div style="display: flex; flex-direction: column; gap: 32px;">
                    <div class="card" style="padding: 32px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
                            <ion-icon name="people" style="font-size: 1.8rem; color: var(--primary);"></ion-icon>
                            <h3 style="font-size: 1.3rem;">Assigned Coordinator</h3>
                        </div>
                        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 32px;">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #f87171;">
                            <div>
                                <h4 style="font-size: 1.25rem;">Dr. Eleanor Vance</h4>
                                <p style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;">Head of Placement, CS Dept.</p>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
                            <div style="display: flex; align-items: center; gap: 12px; color: var(--text-muted);">
                                <ion-icon name="mail" style="font-size: 1.2rem;"></ion-icon>
                                <span style="font-size: 1rem; font-weight: 600;">e.vance@university.edu</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px; color: var(--text-muted);">
                                <ion-icon name="call" style="font-size: 1.2rem;"></ion-icon>
                                <span style="font-size: 1rem; font-weight: 600;">Ext. 4410</span>
                            </div>
                        </div>
                        <button class="btn-primary" id="btn-book-consultation" style="width: 100%; padding: 16px; font-size: 1rem;">
                            <ion-icon name="calendar-clear" style="margin-right: 8px;"></ion-icon>
                            Book Consultation
                        </button>
                    </div>

                    <div class="card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                            <h3 style="margin-bottom: 0;">Skills & Competencies</h3>
                            <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary); font-size: 1.2rem;" id="edit-skills-set"></ion-icon>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;" id="skills-list">
                            ${profileData.skills.map(skill => `
                                <div class="tag tag-info" style="padding: 8px 16px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                    ${skill}
                                    ${isSkillDeleteMode ? `<ion-icon name="close-circle" style="cursor: pointer; color: #ef4444;" data-skill="${skill}"></ion-icon>` : ''}
                                </div>
                            `).join('')}
                            <button id="add-skill-btn" style="border: 2px dashed var(--border); background: transparent; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; cursor: pointer;">+ Add Skill</button>
                        </div>
                        <div id="skill-input-container" style="display: none; margin-top: 12px;">
                            <input type="text" id="new-skill-name" placeholder="Enter skill..." style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 8px;">
                            <button class="btn-primary" id="save-skill-btn" style="padding: 6px 16px; font-size: 0.8rem;">Add</button>
                        </div>
                        ${isSkillDeleteMode ? `<button class="btn-primary" id="done-skills-btn" style="margin-top: 16px; width: 100%; font-size: 0.8rem;">Done</button>` : ''}
                    </div>

                    <div class="card">
                        <h3>Resume Management</h3>
                        <div style="margin-top: 16px; padding: 20px; border: 2px dashed #e2e8f0; border-radius: 12px; text-align: center;">
                            <ion-icon name="document-text" style="font-size: 2.5rem; color: var(--text-muted);"></ion-icon>
                            <p style="font-size: 0.85rem; margin-top: 8px; font-weight: 700;" id="resume-filename-display">${profileData.resume.name}</p>
                            <p style="font-size: 0.7rem; color: var(--text-muted);" id="resume-upload-date">Uploaded ${profileData.resume.uploadedAt}</p>
                            <input type="file" id="resume-upload-input" accept=".pdf" style="display: none;">
                            <button class="btn-primary" id="btn-update-resume" style="margin-top: 20px; width: 100%; border: 1px solid var(--border); background: white; color: var(--primary);">
                                Update Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        setupHandlers();
    };

    const setupHandlers = () => {
        setupEditField('edit-phone', 'phone-container', 'phone', profileData.phone, 'field-group-phone');
        setupEditField('edit-portfolio', 'portfolio-container', 'portfolio', profileData.portfolio, 'field-group-portfolio');
        setupEditField('edit-summary', 'summary-container', 'summary', profileData.summary, 'field-group-summary', true);
        setupEditField('edit-cgpa', 'cgpa-container', 'cgpa', profileData.cgpa, 'field-group-cgpa');

        // Placement Status Toggle
        const togglePlacementBtn = document.getElementById('btn-toggle-placement');
        togglePlacementBtn.addEventListener('click', () => {
            profileData.placementActive = !profileData.placementActive;
            const confirmMsg = profileData.placementActive 
                ? "Are you sure you want to re-enroll in the placement drive?" 
                : "Are you sure you want to opt-out? You will not receive new placement offers.";
            
            if (confirm(confirmMsg)) {
                renderSelf();
            } else {
                profileData.placementActive = !profileData.placementActive; // Revert
            }
        });

        // Resume Logic
        const resumeInput = document.getElementById('resume-upload-input');
        const updateResumeBtn = document.getElementById('btn-update-resume');
        const filenameDisplay = document.getElementById('resume-filename-display');
        const uploadDateDisplay = document.getElementById('resume-upload-date');

        updateResumeBtn.addEventListener('click', () => {
            resumeInput.click();
        });

        resumeInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                profileData.resume.name = file.name;
                profileData.resume.uploadedAt = "Just now";
                filenameDisplay.innerText = file.name;
                uploadDateDisplay.innerText = "Uploaded Just now";
            }
        });

        // Book Consultation
        document.getElementById('btn-book-consultation').addEventListener('click', () => {
            window.App.navigateTo('messages');
        });

        // Skills Logic
        const addSkillBtn = document.getElementById('add-skill-btn');
        const skillInputContainer = document.getElementById('skill-input-container');
        const newSkillName = document.getElementById('new-skill-name');
        const saveSkillBtn = document.getElementById('save-skill-btn');
        const skillsList = document.getElementById('skills-list');
        const editSkillsBtn = document.getElementById('edit-skills-set');

        addSkillBtn.addEventListener('click', () => {
            skillInputContainer.style.display = 'block';
            addSkillBtn.style.display = 'none';
            newSkillName.focus();
        });

        saveSkillBtn.addEventListener('click', () => {
            const skill = newSkillName.value.trim();
            if (skill) {
                profileData.skills.push(skill);
                renderSelf(); 
            } else {
                skillInputContainer.style.display = 'none';
                addSkillBtn.style.display = 'block';
            }
        });

        editSkillsBtn.addEventListener('click', () => {
            isSkillDeleteMode = !isSkillDeleteMode;
            renderSelf();
        });

        skillsList.addEventListener('click', (e) => {
            if (e.target.tagName === 'ION-ICON' && e.target.getAttribute('data-skill')) {
                const skillToDelete = e.target.getAttribute('data-skill');
                profileData.skills = profileData.skills.filter(s => s !== skillToDelete);
                renderSelf();
            }
        });

        const doneSkillsBtn = document.getElementById('done-skills-btn');
        if (doneSkillsBtn) {
            doneSkillsBtn.addEventListener('click', () => {
                isSkillDeleteMode = false;
                renderSelf();
            });
        }
    };

    const setupEditField = (iconId, containerId, dataKey, initialValue, groupContainerId, isTextarea = false) => {
        const icon = document.getElementById(iconId);
        const container = document.getElementById(containerId);
        
        icon.addEventListener('click', () => {
            if (icon.style.display === 'none') return;
            icon.style.display = 'none';
            const inputHtml = isTextarea 
                ? `<textarea style="width: 100%; padding: 12px; border: 1px solid var(--primary); border-radius: 12px; font-family: inherit; font-size: 0.95rem; margin-bottom: 12px;" id="field-${dataKey}">${profileData[dataKey]}</textarea>`
                : `<input type="text" style="flex: 1; padding: 8px; border: 1px solid var(--primary); border-radius: 8px; font-weight: 700; font-family: inherit;" id="field-${dataKey}" value="${profileData[dataKey]}">`;
            
            const wrapper = document.createElement('div');
            wrapper.style.width = '100%';
            wrapper.innerHTML = isTextarea ? inputHtml : `<div style="display:flex; align-items:center; gap:12px;">${inputHtml}</div>`;
            
            container.innerHTML = '';
            container.appendChild(wrapper);

            const saveBtn = document.createElement('button');
            saveBtn.className = 'btn-primary';
            saveBtn.innerText = 'Save';
            saveBtn.style.marginTop = '12px';
            saveBtn.style.padding = '8px 24px';
            saveBtn.style.fontSize = '0.85rem';
            container.appendChild(saveBtn);

            saveBtn.onclick = () => {
                const input = document.getElementById(`field-${dataKey}`);
                if (input) {
                    profileData[dataKey] = input.value;
                    icon.style.display = 'block';
                    if (isTextarea) {
                        container.innerHTML = profileData[dataKey];
                    } else {
                        const iconType = dataKey === 'phone' ? 'call' : dataKey === 'portfolio' ? 'link' : 'ribbon';
                        const colorClass = dataKey === 'portfolio' ? 'color: #3b82f6;' : '';
                        const fontSize = dataKey === 'cgpa' ? 'font-size: 1.5rem;' : '';
                        const iconStyle = dataKey === 'cgpa' ? 'display:none;' : '';
                        container.innerHTML = `
                            <ion-icon name="${iconType}" style="color: #64748b; ${iconStyle}"></ion-icon>
                            <span style="font-weight: 800; ${colorClass} ${fontSize} white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileData[dataKey]}</span>
                            ${dataKey === 'portfolio' ? '<ion-icon name="open-outline" style="color: #94a3b8; cursor: pointer;"></ion-icon>' : ''}
                        `;
                    }
                }
            };
        });
    };

    renderSelf();
}
