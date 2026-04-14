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
        bio: 'Responsible for managing placement operations, employer relations, and institutional recruitment workflows.',
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

function getPasswordMap() {
    try {
        return JSON.parse(localStorage.getItem(PASSWORD_STORAGE_KEY) || '{}');
    } catch {
        return {};
    }
}

function setPassword(username, password) {
    const map = getPasswordMap();
    map[username] = password;
    localStorage.setItem(PASSWORD_STORAGE_KEY, JSON.stringify(map));
}

function getPassword(username) {
    const map = getPasswordMap();
    return map[username] || '';
}

function updateSessionUser(app, updates) {
    if (!app?.state?.user) return;
    app.state.user = { ...app.state.user, ...updates };
    localStorage.setItem('placement_user', JSON.stringify(app.state.user));
}

function editableLabel(text) {
    return `<label style="display:flex; align-items:center; gap:6px;"><ion-icon name="create-outline" style="font-size:.95rem; color:#1d4ed8;"></ion-icon>${text}</label>`;
}

export function render(container, app) {
    const user = app?.state?.user || {};
    const username = user.username || 'admin.user';
    const profileState = loadProfile(user);
    const genderLocked = Boolean(profileState.gender);

    container.innerHTML = `
        <div class="admin-dashboard-shell" style="gap: 24px;">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Admin Profile</h1>
                    <p>Manage account profile and photo.</p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:24px; align-items:start;">
                <div class="card" style="padding:24px;">
                    <div style="display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px;">
                        <img src="${profileState.avatar}" alt="${profileState.name}" style="width:96px; height:96px; border-radius:16px; border:2px solid #dbe4f0; object-fit:cover;">
                        <input id="admin-avatar-input" type="file" accept="image/*" style="display:none;">
                        <button type="button" id="admin-change-photo" class="admin-user-action" style="margin:0;">Change Photo</button>
                        <div>
                            <h3 style="margin:0; color:#0f1f46; font-size:1.35rem;">${profileState.name}</h3>
                            <p style="margin:6px 0 0; color:var(--text-muted); font-size:0.9rem;">${profileState.designation}</p>
                        </div>
                        <span class="tag tag-success">Active Admin</span>
                    </div>

                    <div style="margin-top:12px; width:100%; padding:10px 12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
                        <p style="margin:0; font-size:0.72rem; color:#64748b; text-transform:uppercase; font-weight:700; letter-spacing:.06em;">Gender</p>
                        <strong style="font-size:0.95rem; color:#0f1f46;">${profileState.gender || 'Not selected'}</strong>
                    </div>
                </div>

                <div style="display:grid; gap:16px;">
                    <div class="card" style="padding:24px;">
                        <div class="admin-card-head" style="margin-bottom:14px;">
                            <h3>Profile Information</h3>
                            <span>Pen icon marks editable fields</span>
                        </div>

                        <form id="admin-profile-form" style="display:grid; gap:14px;">
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                                <div class="form-group" style="margin:0;">${editableLabel('Full Name')}<input id="admin-name" type="text" value="${profileState.name}" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px;"></div>
                                <div class="form-group" style="margin:0;">${editableLabel('Designation')}<input id="admin-designation" type="text" value="${profileState.designation}" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px;"></div>
                            </div>

                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                                <div class="form-group" style="margin:0;">${editableLabel('Email')}<input id="admin-email" type="email" value="${profileState.email}" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px;"></div>
                                <div class="form-group" style="margin:0;">${editableLabel('Phone')}<input id="admin-phone" type="text" value="${profileState.phone}" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px;"></div>
                            </div>

                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                                <div class="form-group" style="margin:0;">${editableLabel('Department')}<input id="admin-department" type="text" value="${profileState.department}" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px;"></div>
                                <div class="form-group" style="margin:0;">${editableLabel('Office Location')}<input id="admin-office" type="text" value="${profileState.officeLocation}" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px;"></div>
                            </div>

                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                                <div class="form-group" style="margin:0;">
                                    <label>Gender</label>
                                    ${genderLocked
                                        ? `<input type="text" value="${profileState.gender}" readonly style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px; background:#fff; color:#0f172a;">`
                                        : `<select id="admin-gender" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px;"><option value="">Select</option><option value="Male" ${profileState.gender === 'Male' ? 'selected' : ''}>Male</option><option value="Female" ${profileState.gender === 'Female' ? 'selected' : ''}>Female</option><option value="Other" ${profileState.gender === 'Other' ? 'selected' : ''}>Other</option></select>`}
                                    <p style="margin:6px 0 0; font-size:0.75rem; color:#64748b;">${genderLocked ? 'Gender is locked after first selection.' : 'Select gender once and save profile.'}</p>
                                </div>
                                <div class="form-group" style="margin:0;"><label>Employee ID</label><input type="text" value="${profileState.employeeId}" readonly style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px; background:#fff; color:#0f172a;"></div>
                            </div>

                            <div class="form-group" style="margin:0;">${editableLabel('Bio')}<textarea id="admin-bio" rows="4" style="width:100%; padding:11px 12px; border:1px solid #dbe4f0; border-radius:10px; resize:vertical;">${profileState.bio}</textarea></div>

                            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:6px;">
                                <button type="button" id="admin-profile-reset" class="admin-user-action">Reset</button>
                                <button type="submit" class="btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    `;

    const form = container.querySelector('#admin-profile-form');
    const resetBtn = container.querySelector('#admin-profile-reset');
    const avatarBtn = container.querySelector('#admin-change-photo');
    const avatarInput = container.querySelector('#admin-avatar-input');

    form?.addEventListener('submit', (event) => {
        event.preventDefault();

        const next = {
            ...profileState,
            name: container.querySelector('#admin-name')?.value?.trim() || profileState.name,
            designation: container.querySelector('#admin-designation')?.value?.trim() || profileState.designation,
            email: container.querySelector('#admin-email')?.value?.trim() || profileState.email,
            phone: container.querySelector('#admin-phone')?.value?.trim() || profileState.phone,
            department: container.querySelector('#admin-department')?.value?.trim() || profileState.department,
            officeLocation: container.querySelector('#admin-office')?.value?.trim() || profileState.officeLocation,
            bio: container.querySelector('#admin-bio')?.value?.trim() || profileState.bio,
            gender: profileState.gender
        };

        const selectedGender = container.querySelector('#admin-gender')?.value || '';
        if (!genderLocked && selectedGender) {
            next.gender = selectedGender;
        }

        saveProfile(user, next);
        updateSessionUser(app, { name: next.name, avatar: next.avatar });
        app.navigateTo('dashboard');
    });

    resetBtn?.addEventListener('click', () => render(container, app));

    avatarBtn?.addEventListener('click', () => avatarInput?.click());

    avatarInput?.addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const updated = { ...profileState, avatar: String(reader.result) };
            saveProfile(user, updated);
            updateSessionUser(app, { avatar: updated.avatar, name: updated.name });
            const navAvatar = document.querySelector('#top-navbar .avatar');
            if (navAvatar) navAvatar.src = updated.avatar;
            alert('Profile photo updated.');
            render(container, app);
        };
        reader.readAsDataURL(file);
    });
}
