// js/admin/profile.js

const PASSWORD_STORAGE_KEY = 'portal_passwords';

function getProfileStorageKey(username) {
    return `admin_profile_${username}`;
}

function getDefaultProfile(user) {
    const cleanName = (user.name || 'Admin User').replace(/^User\s+/i, '');
    const username = user.username || 'admin.user';
    const avatar = user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}`;

    return {
        name: cleanName,
        email: `${username}@university.edu`,
        phone: '+91 98765 43210',
        designation: 'Placement Cell Administrator',
        department: 'Training & Placement Office',
        employeeId: 'ADM-2024-001',
        officeLocation: 'Admin Block, 2nd Floor',
        bio: 'Responsible for managing placement operations, employer relations, and institutional recruitment workflows. Dedicated to providing structural support to students and bridging the gap between industry requirements and academic excellence.',
        gender: '',
        avatar
    };
}

function loadProfile(user) {
    const username = user.username || 'admin.user';
    const defaults = getDefaultProfile(user);
    try {
        const saved = JSON.parse(localStorage.getItem(getProfileStorageKey(username)) || '{}');
        return { ...defaults, ...saved };
    } catch {
        return defaults;
    }
}

function saveProfile(user, profile) {
    const username = user.username || 'admin.user';
    localStorage.setItem(getProfileStorageKey(username), JSON.stringify(profile));
}

function updateSessionUser(app, updates) {
    if (!app?.state?.user) return;
    app.state.user = { ...app.state.user, ...updates };
    localStorage.setItem('placement_user', JSON.stringify(app.state.user));
}

export function render(container, app) {
    const user = app?.state?.user || {};
    let profileState = loadProfile(user);
    let genderLocked = Boolean(profileState.gender);

    const renderSelf = () => {
        container.innerHTML = `
            <div class="profile-header-banner">
                <div class="profile-avatar-wrapper" style="position: relative; display: inline-block;">
                    <img src="${profileState.avatar}" alt="Avatar" id="admin-avatar-img" style="cursor: pointer; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">
                    <div class="profile-verify-badge" style="background: #e0f2fe; color: #0369a1; border-color: #38bdf8;">
                        <ion-icon name="shield-checkmark"></ion-icon>
                        ADMIN VERIFIED
                    </div>
                </div>
                
                <div class="profile-info-main">
                    <div style="display:flex; align-items:center; gap:16px; margin-bottom:10px;">
                        <h1 style="text-transform: capitalize; margin: 0; font-size: 2.4rem;">${profileState.name}</h1>
                    </div>

                    <div class="profile-info-meta" style="gap: 14px; font-size: 1rem; font-weight: 500; opacity: 0.95; margin-bottom: 16px;">
                        <span>${profileState.designation}</span>
                        <span class="dot"></span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <ion-icon name="id-card-outline" style="font-size:1.1rem; opacity:0.8;"></ion-icon>
                            <span>${profileState.employeeId}</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 12px; font-size: 0.85rem; opacity: 0.9; background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 20px; width: fit-content; border: 1px solid rgba(255,255,255,0.15);">
                        <ion-icon name="business-outline" style="font-size: 1.1rem;"></ion-icon>
                        <span style="font-weight: 600; letter-spacing: 0.5px;">${profileState.department}</span>
                        <span style="opacity: 0.5; margin: 0 4px;">|</span>
                        <ion-icon name="location-outline" style="font-size: 1.1rem;"></ion-icon>
                        <span>${profileState.officeLocation}</span>
                    </div>
                </div>

                <div style="margin-left: auto; display: flex; gap: 24px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); padding: 20px 28px; border-radius: 20px; backdrop-filter: blur(10px);">
                    <div style="text-align: center;">
                        <div style="font-size: 1.6rem; font-weight: 700; color: #93c5fd; line-height: 1;">124</div>
                        <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-top: 8px;">Active Coords</div>
                    </div>
                    <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.6rem; font-weight: 700; color: #34d399; line-height: 1;">86</div>
                        <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-top: 8px;">Companies</div>
                    </div>
                    <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.6rem; font-weight: 700; color: #fcd34d; line-height: 1;">2.4k</div>
                        <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-top: 8px;">Students</div>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
                <!-- Left Column -->
                <div style="display: flex; flex-direction: column; gap: 32px;">
                    <!-- Profile Details -->
                    <div class="card">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
                            <ion-icon name="person-circle" style="font-size: 1.8rem; color: var(--primary);"></ion-icon>
                            <h3 style="font-size: 1.3rem;">Profile Details</h3>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            <div class="form-group">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <label style="margin-bottom: 0px; font-weight: 700; font-size: 0.75rem; color: var(--text-muted);">FULL NAME</label>
                                    <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-name"></ion-icon>
                                </div>
                                <div id="name-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                    <ion-icon name="person" style="color: #64748b; font-size: 1.1rem;"></ion-icon>
                                    <span style="font-weight: 600;">${profileState.name}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <label style="margin-bottom: 0px; font-weight: 700; font-size: 0.75rem; color: var(--text-muted);">DESIGNATION</label>
                                    <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-designation"></ion-icon>
                                </div>
                                <div id="designation-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                    <ion-icon name="briefcase" style="color: #64748b; font-size: 1.1rem;"></ion-icon>
                                    <span style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileState.designation}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <label style="margin-bottom: 0px; font-weight: 700; font-size: 0.75rem; color: var(--text-muted);">PHONE NUMBER</label>
                                    <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-phone"></ion-icon>
                                </div>
                                <div id="phone-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                    <ion-icon name="call" style="color: #64748b; font-size: 1.1rem;"></ion-icon>
                                    <span style="font-weight: 600;">${profileState.phone}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <label style="margin-bottom: 0px; font-weight: 700; font-size: 0.75rem; color: var(--text-muted);">INSTITUTIONAL EMAIL</label>
                                    <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-email"></ion-icon>
                                </div>
                                <div id="email-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                    <ion-icon name="mail" style="color: #64748b; font-size: 1.1rem; flex-shrink: 0;"></ion-icon>
                                    <span style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileState.email}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <label style="margin-bottom: 0px; font-weight: 700; font-size: 0.75rem; color: var(--text-muted);">DEPARTMENT</label>
                                    <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-department"></ion-icon>
                                </div>
                                <div id="department-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                    <ion-icon name="business" style="color: #64748b; font-size: 1.1rem;"></ion-icon>
                                    <span style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileState.department}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <label style="margin-bottom: 0px; font-weight: 700; font-size: 0.75rem; color: var(--text-muted);">OFFICE LOCATION</label>
                                    <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary);" id="edit-office"></ion-icon>
                                </div>
                                <div id="office-container" style="background: #f1f5f9; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                                    <ion-icon name="location" style="color: #64748b; font-size: 1.1rem; flex-shrink: 0;"></ion-icon>
                                    <span style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileState.officeLocation}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Administrative Bio -->
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <ion-icon name="document-text" style="font-size: 1.8rem; color: var(--primary);"></ion-icon>
                                <h3 style="font-size: 1.3rem; margin: 0;">Administrative Bio</h3>
                            </div>
                            <ion-icon name="create-outline" style="cursor: pointer; color: var(--primary); font-size: 1.2rem;" id="edit-bio"></ion-icon>
                        </div>
                        <div id="bio-container" style="background: #f1f5f9; padding: 24px; border-radius: 12px; line-height: 1.6; color: #334155; font-size: 0.95rem;">
                            ${profileState.bio}
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div style="display: flex; flex-direction: column; gap: 32px;">
                    <!-- Attributes -->
                    <div class="card" style="padding: 32px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                            <ion-icon name="shield" style="font-size: 1.8rem; color: var(--primary);"></ion-icon>
                            <h3 style="font-size: 1.3rem; margin: 0;">Account Attributes</h3>
                        </div>

                        <div style="margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">ROLE CLEARANCE</span>
                            </div>
                            <div style="background: #f8fafc; padding: 12px 16px; border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; gap: 12px;">
                                <ion-icon name="key" style="color: var(--primary); font-size: 1.2rem;"></ion-icon>
                                <span style="font-weight: 700; color: var(--text-main);">Global Admin</span>
                            </div>
                        </div>


                    </div>

                    <!-- Hidden Inputs & Auth -->
                    <input id="admin-avatar-input" type="file" accept="image/*" style="display:none;">
                </div>
            </div>
        `;

        setupHandlers();
    };

    const setupHandlers = () => {
        // Avatar upload logic
        const avatarImage = document.getElementById('admin-avatar-img');
        const avatarInput = document.getElementById('admin-avatar-input');

        if (avatarImage && avatarInput) {
            avatarImage.addEventListener('click', () => avatarInput.click());

            avatarInput.addEventListener('change', (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    profileState.avatar = String(reader.result);
                    saveAdminProfile();
                    renderSelf();
                };
                reader.readAsDataURL(file);
            });
        }

        // Field Edit setups
        setupInlineEdit('edit-phone', 'phone-container', 'phone', false, 'call');
        setupInlineEdit('edit-email', 'email-container', 'email', false, 'mail');
        setupInlineEdit('edit-name', 'name-container', 'name', false, 'person');
        setupInlineEdit('edit-designation', 'designation-container', 'designation', false, 'briefcase');
        setupInlineEdit('edit-department', 'department-container', 'department', false, 'business');
        setupInlineEdit('edit-office', 'office-container', 'officeLocation', false, 'location');
        setupInlineEdit('edit-bio', 'bio-container', 'bio', true);

    };

    const saveAdminProfile = () => {
        saveProfile(user, profileState);
        updateSessionUser(app, { name: profileState.name, avatar: profileState.avatar });
        // Optionally update the global navbar representation
        const navAvatar = document.querySelector('#top-navbar .avatar');
        if (navAvatar) navAvatar.src = profileState.avatar;
    };



    const setupInlineEdit = (iconId, containerId, field, isTextarea = false, iconName = '') => {
        const icon = document.getElementById(iconId);
        const container = document.getElementById(containerId);
        if (!icon || !container) return;

        icon.addEventListener('click', () => {
            if (icon.style.display === 'none') return;
            icon.style.display = 'none';

            const inputHtml = isTextarea
                ? `<textarea id="input-${field}" style="width: 100%; padding: 12px; border: 1px solid var(--primary); border-radius: 12px; font-family: inherit; font-size: 0.95rem; margin-bottom: 12px; min-height: 120px; outline: none; resize: vertical;">${profileState[field]}</textarea>`
                : `<input id="input-${field}" type="text" style="flex: 1; padding: 8px 12px; border: 1px solid var(--primary); border-radius: 8px; font-weight: 600; font-family: inherit; font-size: 0.95rem; outline: none;" value="${profileState[field]}">`;

            const wrapper = document.createElement('div');
            wrapper.style.width = '100%';
            wrapper.innerHTML = isTextarea ? inputHtml : `<div style="display:flex; align-items:center; gap:12px;">${inputHtml}</div>`;

            container.innerHTML = '';
            container.appendChild(wrapper);

            const btnRow = document.createElement('div');
            btnRow.style.display = 'flex';
            btnRow.style.gap = '8px';
            btnRow.style.marginTop = isTextarea ? '0' : '12px';

            const saveBtn = document.createElement('button');
            saveBtn.className = 'btn-primary';
            saveBtn.innerText = 'Save';
            saveBtn.style.padding = '8px 24px';
            saveBtn.style.fontSize = '0.85rem';

            const cancelBtn = document.createElement('button');
            cancelBtn.innerText = 'Cancel';
            cancelBtn.style.padding = '8px 24px';
            cancelBtn.style.fontSize = '0.85rem';
            cancelBtn.style.background = '#e2e8f0';
            cancelBtn.style.color = '#334155';
            cancelBtn.style.border = 'none';
            cancelBtn.style.borderRadius = '10px';
            cancelBtn.style.fontWeight = '600';
            cancelBtn.style.cursor = 'pointer';

            btnRow.appendChild(cancelBtn);
            btnRow.appendChild(saveBtn);
            container.appendChild(btnRow);

            const resetView = () => {
                icon.style.display = 'block';
                if (isTextarea) {
                    container.innerHTML = profileState[field];
                } else {
                    container.innerHTML = `
                        <ion-icon name="${iconName}" style="color: #64748b; font-size: 1.1rem; flex-shrink: 0;"></ion-icon>
                        <span style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${profileState[field]}</span>
                    `;
                }
            };

            cancelBtn.onclick = () => resetView();

            saveBtn.onclick = () => {
                const input = document.getElementById(`input-${field}`);
                if (input) {
                    profileState[field] = input.value;
                    saveAdminProfile();
                    resetView();
                }
            };
        });
    };

    renderSelf();
}
