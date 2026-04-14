// js/coordinator/profile.js — Clean, balanced layout

import { students } from './data.js';

const coordProfile = {
  name:        "Dr. Priya Singh",
  employeeId:  "COORD-CSE-2023-01",
  phone:       "+91 98765 43210",
  email:       "priya.singh@college.edu",
  linkedin:    "linkedin.com/in/drpriyasinghcse",
  office:      "Block B, Room 204, Academic Complex",
  department:  "Computer Science & Engineering",
  designation: "Placement Coordinator – CSE Dept.",
  joinDate:    "Jan 15, 2023",
  education: [
    { degree: "Ph.D. – Computer Science & Engineering", institution: "IIT Bombay",  year: "2016", color: "#1B3A6B" },
    { degree: "M.Tech – Software Systems",              institution: "BITS Pilani", year: "2011", color: "#2c5282" },
    { degree: "B.Tech – Computer Science & Engineering", institution: "VIT Vellore", year: "2009", color: "#3b82f6" },
  ],
};

const upcomingConsultations = [
  { studentId: 4,  studentName: "Aman Verma",    avatar: "AV", avatarBg: "#ef4444", date: "Apr 16, 2025", time: "3:00 PM",  duration: "30 min", mode: "In-person", topic: "Interview Prep & Mock Coding Round", status: "Confirmed" },
  { studentId: 3,  studentName: "Sara Chen",     avatar: "SC", avatarBg: "#10b981", date: "Apr 17, 2025", time: "11:00 AM", duration: "45 min", mode: "Online",    topic: "Application Review — TCS & Google", status: "Confirmed" },
  { studentId: 6,  studentName: "Rohan Singh",   avatar: "RS", avatarBg: "#0284c7", date: "Apr 18, 2025", time: "2:30 PM",  duration: "30 min", mode: "In-person", topic: "Career Guidance — Getting Started", status: "Pending" },
  { studentId: 10, studentName: "Siddhant Nair", avatar: "SN", avatarBg: "#f59e0b", date: "Apr 22, 2025", time: "10:00 AM", duration: "30 min", mode: "Online",    topic: "Infosys Interview Preparation", status: "Confirmed" },
  { studentId: 2,  studentName: "Alex Sterling", avatar: "AS", avatarBg: "#2c5282", date: "Apr 25, 2025", time: "4:00 PM",  duration: "60 min", mode: "In-person", topic: "Microsoft Shortlist — Deep Dive Prep", status: "Confirmed" },
];

export function render(container, app) {
  const displayName = app.state.user.name || coordProfile.name;
  const profImage   = `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.state.user.username || 'coordinator'}`;

  const renderSelf = () => {
    container.innerHTML = `

      <!-- ── Hero Banner (student-profile style, user loves this) ── -->
      <div class="profile-header-banner">
        <div class="profile-avatar-wrapper">
          <img src="${profImage}" alt="${displayName}">
          <div class="profile-verify-badge" style="background:#dcfce7; color:#15803d; border-color:#10b981;">
            <ion-icon name="shield-checkmark"></ion-icon> VERIFIED
          </div>
        </div>

        <div class="profile-info-main">
          <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
            <h1 style="text-transform:capitalize; margin:0;">${displayName}</h1>
            <div style="background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.4); color:#d1fae5; padding:6px 14px; border-radius:30px; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:6px; flex-shrink:0; height:fit-content">
              <span style="width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block"></span>
              Active
            </div>
          </div>
          
          <div class="profile-info-meta" style="margin-bottom:12px; gap: 12px; font-weight: 500;">
            <span>${coordProfile.designation}</span>
            <span class="dot"></span>
            <span>${coordProfile.department}</span>
          </div>
          
          <div class="profile-info-meta" style="font-size:0.9rem; gap: 16px; opacity: 0.9;">
            <div style="display:flex; align-items:center; gap:6px;">
              <ion-icon name="id-card-outline" style="font-size:1.1rem; opacity:0.8;"></ion-icon>
              <span>${coordProfile.employeeId}</span>
            </div>
            <span class="dot" style="opacity:0.5;"></span>
            <div style="display:flex; align-items:center; gap:6px;">
              <ion-icon name="calendar-outline" style="font-size:1.1rem; opacity:0.8;"></ion-icon>
              <span>Since ${coordProfile.joinDate}</span>
            </div>
          </div>
        </div>
        
        <div style="margin-left: auto; display: flex; gap: 24px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); padding: 20px 28px; border-radius: 20px; backdrop-filter: blur(10px);">
          <div style="text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 700; color: #93c5fd; line-height: 1;">10</div>
            <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-top: 8px;">Assigned</div>
          </div>
          <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
          <div style="text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 700; color: #34d399; line-height: 1;">40%</div>
            <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-top: 8px;">Success</div>
          </div>
          <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
          <div style="text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 700; color: #fcd34d; line-height: 1;">${upcomingConsultations.length}</div>
            <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-top: 8px;">Sessions</div>
          </div>
        </div>
      </div>



      <!-- ── Equal 2-column body ── -->
      <div class="cpr-body">

        <!-- ═══ LEFT: Contact + Education ═══ -->
        <div class="cpr-col">

          <!-- Contact Information -->
          <div class="card cpr-card">
            <div class="cpr-card-head">
              <ion-icon name="person-circle" class="cpr-card-icon"></ion-icon>
              <h3>Contact Information</h3>
            </div>

            <div class="cpr-fields">
              <!-- Phone -->
              <div class="cpr-field" id="fg-phone">
                <div class="cpr-field-label-row">
                  <label>PHONE NUMBER</label>
                  <ion-icon name="create-outline" class="cpr-edit-icon" id="edit-phone"></ion-icon>
                </div>
                <div id="phone-container" class="cpr-field-val">
                  <ion-icon name="call" style="color:#64748b; flex-shrink:0"></ion-icon>
                  <span style="font-weight:600">${coordProfile.phone}</span>
                </div>
              </div>

              <!-- Email -->
              <div class="cpr-field" id="fg-email">
                <div class="cpr-field-label-row">
                  <label>INSTITUTIONAL EMAIL</label>
                  <ion-icon name="create-outline" class="cpr-edit-icon" id="edit-email"></ion-icon>
                </div>
                <div id="email-container" class="cpr-field-val">
                  <ion-icon name="mail" style="color:#64748b; flex-shrink:0"></ion-icon>
                  <span style="font-weight:600; font-size:0.88rem">${coordProfile.email}</span>
                </div>
              </div>

              <!-- Office (locked) -->
              <div class="cpr-field">
                <label class="cpr-label">OFFICE LOCATION</label>
                <div class="cpr-field-val" style="opacity:0.8">
                  <ion-icon name="location" style="color:#64748b; flex-shrink:0"></ion-icon>
                  <span style="font-weight:600; font-size:0.86rem">${coordProfile.office}</span>
                </div>
              </div>

              <!-- LinkedIn -->
              <div class="cpr-field">
                <label class="cpr-label">LINKEDIN</label>
                <div class="cpr-field-val">
                  <ion-icon name="logo-linkedin" style="color:#0a66c2; flex-shrink:0"></ion-icon>
                  <a href="https://${coordProfile.linkedin}" target="_blank"
                     style="font-weight:600; font-size:0.88rem; color:#0a66c2; text-decoration:none">
                    ${coordProfile.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic Qualifications -->
          <div class="card cpr-card">
            <div class="cpr-card-head">
              <ion-icon name="school" class="cpr-card-icon"></ion-icon>
              <h3>Academic Qualifications</h3>
            </div>
            <div class="cpr-edu-list">
              ${coordProfile.education.map(e => `
                <div class="cpr-edu-item" style="border-left-color:${e.color}">
                  <div class="cpr-edu-dot" style="background:${e.color}"></div>
                  <div>
                    <div class="cpr-edu-degree">${e.degree}</div>
                    <div class="cpr-edu-sub">${e.institution} &nbsp;·&nbsp; ${e.year}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>


        </div><!-- end left -->

        <!-- ═══ RIGHT: Upcoming Consultations ═══ -->
        <div class="cpr-col">

          <div class="card cpr-card">
            <div class="cpr-card-head" style="margin-bottom:18px">
              <ion-icon name="calendar-clear" class="cpr-card-icon" style="color:#F5A623"></ion-icon>
              <h3>Upcoming Consultations</h3>
              <span class="tag tag-warning" style="font-size:0.7rem; margin-left:auto">${upcomingConsultations.length} sessions</span>
            </div>

            <div class="cpr-consult-list">
              ${upcomingConsultations.map((c, i) => `
                <div class="cpr-consult-row ${i === 0 ? 'first' : ''}">
                  ${i === 0 ? `<div class="cpr-next-tag">NEXT UP</div>` : ''}
                  <!-- Student -->
                  <div class="cpr-consult-top">
                    <div class="cpr-consult-avatar" style="background:${c.avatarBg}">${c.avatar}</div>
                    <div class="cpr-consult-info">
                      <div class="cpr-consult-name">${c.studentName}</div>
                      <div class="cpr-consult-topic">${c.topic}</div>
                    </div>
                    <span class="tag ${c.status === 'Confirmed' ? 'tag-success' : 'tag-warning'}" style="font-size:0.64rem; flex-shrink:0">${c.status}</span>
                  </div>
                  <!-- Chips -->
                  <div class="cpr-chips">
                    <span class="cpr-chip">
                      <ion-icon name="calendar-outline"></ion-icon>${c.date}
                    </span>
                    <span class="cpr-chip">
                      <ion-icon name="time-outline"></ion-icon>${c.time} · ${c.duration}
                    </span>
                    <span class="cpr-chip ${c.mode === 'Online' ? 'online' : 'offline'}">
                      <ion-icon name="${c.mode === 'Online' ? 'videocam-outline' : 'location-outline'}"></ion-icon>${c.mode}
                    </span>
                  </div>
                  <!-- Msg btn -->
                  <button class="cpr-msg-btn" data-student-id="${c.studentId}">
                    <ion-icon name="chatbubble-outline"></ion-icon> Message Student
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

        </div><!-- end right -->
      </div><!-- end body -->
    `;

    setupHandlers();
  };

  const setupHandlers = () => {
    // Message student buttons
    document.querySelectorAll('.cpr-msg-btn').forEach(btn =>
      btn.addEventListener('click', () => window.App?.navigateTo('messages'))
    );

    setupFieldEdit('edit-phone', 'phone-container', coordProfile, 'phone', 'call');
    setupFieldEdit('edit-email', 'email-container', coordProfile, 'email', 'mail');
  };

  const setupFieldEdit = (iconId, containerId, obj, field, iconName) => {
    const icon = document.getElementById(iconId);
    const cont = document.getElementById(containerId);
    if (!icon || !cont) return;
    icon.addEventListener('click', () => {
      icon.style.display = 'none';
      cont.innerHTML = `
        <ion-icon name="${iconName}" style="color:#64748b; flex-shrink:0"></ion-icon>
        <input type="text" id="inp-${field}" value="${obj[field]}"
          style="flex:1; border:none; outline:none; font-weight:600; font-size:0.9rem; background:transparent; font-family:inherit">
        <button id="sv-${field}" class="btn-primary"
          style="padding:4px 12px; font-size:0.74rem; border-radius:6px; margin-left:auto">Save</button>
      `;
      document.getElementById(`sv-${field}`)?.addEventListener('click', () => {
        const val = document.getElementById(`inp-${field}`)?.value || obj[field];
        obj[field] = val;
        icon.style.display = '';
        cont.innerHTML = `
          <ion-icon name="${iconName}" style="color:#64748b; flex-shrink:0"></ion-icon>
          <span style="font-weight:600">${val}</span>
        `;
      });
    });
  };

  renderSelf();
}
