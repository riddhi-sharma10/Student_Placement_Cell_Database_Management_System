// js/common/notifications.js

export function render(container, app) {
  // Mock notification data specifically tailored for Placement Coordinator
  const notifications = [
    { 
      id: 1, type: 'interview', icon: 'mic-outline', iconColor: '#3b82f6', bg: '#eff6ff', 
      title: 'Interview Scheduled', 
      message: 'A technical interview round has been scheduled for <b>Priya Desai</b> with <b>Google</b> on Feb 15.', 
      time: 'Just now', unread: true 
    },
    { 
      id: 2, type: 'company', icon: 'business-outline', iconColor: '#8b5cf6', bg: '#f5f3ff', 
      title: 'Company HR Reached Out', 
      message: 'The HR team from <b>Microsoft</b> requested additional academic transcripts for shortlisted candidates.', 
      time: '2 hours ago', unread: true 
    },
    { 
      id: 3, type: 'system', icon: 'calendar-outline', iconColor: '#f59e0b', bg: '#fffbeb', 
      title: 'New Consultation Request', 
      message: '<b>Rohan Singh</b> has requested a 1-on-1 consultation regarding mock interview preparation.', 
      time: '5 hours ago', unread: false 
    },
    { 
      id: 4, type: 'success', icon: 'checkmark-circle-outline', iconColor: '#10b981', bg: '#ecfdf5', 
      title: 'Student Placed!', 
      message: '<b>Sara Chen</b> has successfully cleared the final rounds and accepted the offer from <b>Atlassian</b>.', 
      time: '1 day ago', unread: false 
    },
    { 
      id: 5, type: 'application', icon: 'document-text-outline', iconColor: '#64748b', bg: '#f8fafc', 
      title: 'Application Deadline Approaching', 
      message: 'The application window for the <b>Amazon SDE-1</b> role closes in 24 hours. 3 assigned students haven\'t applied yet.', 
      time: '2 days ago', unread: false 
    }
  ];

  container.innerHTML = `
    <div class="dashboard-header" style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 style="font-size: 2rem; color: var(--primary);">Notifications Center</h1>
        <p style="color: var(--text-muted); margin-top: 4px;">Stay updated on student progress and placement cell alerts</p>
      </div>
      <button class="btn-primary" style="background: white; color: var(--primary); border: 1px solid #e2e8f0; font-weight: 600; padding: 10px 18px; display: flex; align-items: center; gap: 8px;">
        <ion-icon name="checkmark-done-outline"></ion-icon> Mark all as read
      </button>
    </div>

    <div class="card" style="padding: 0; overflow: hidden; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      
      <!-- Filter Tabs -->
      <div style="display: flex; border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
        <div style="padding: 16px 24px; font-weight: 700; color: var(--primary); border-bottom: 2px solid var(--primary); cursor: pointer;">All Alerts</div>
        <div style="padding: 16px 24px; font-weight: 600; color: #64748b; cursor: pointer; transition: color 0.2s;">Unread (2)</div>
        <div style="padding: 16px 24px; font-weight: 600; color: #64748b; cursor: pointer; transition: color 0.2s;">Interviews</div>
      </div>
      
      <!-- Notification List -->
      <div class="notifications-list">
        ${notifications.map((n, i) => `
          <div class="notification-row" style="display: flex; gap: 16px; padding: 24px; border-bottom: 1px solid #e2e8f0; background: ${n.unread ? '#f4f9ff' : 'white'}; transition: background 0.2s; cursor: pointer;">
            
            <div style="width: 42px; height: 42px; border-radius: 10px; background: ${n.iconColor}20; color: ${n.iconColor}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
              <ion-icon name="${n.icon}"></ion-icon>
            </div>
            
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <h3 style="margin: 0; font-size: 1.05rem; color: var(--text-main); font-weight: ${n.unread ? '700' : '600'};">
                  ${n.title}
                  ${n.unread ? '<span style="display:inline-block; width:8px; height:8px; background:var(--accent); border-radius:50%; margin-left:6px; transform:translateY(-2px);"></span>' : ''}
                </h3>
                <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600; white-space: nowrap;">${n.time}</span>
              </div>
              <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">
                ${n.message}
              </p>
              

            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach hover styles dynamically using JS map iteration container
  const rows = container.querySelectorAll('.notification-row');
  rows.forEach((row, idx) => {
    row.addEventListener('mouseenter', () => {
      row.style.background = notifications[idx].unread ? '#ebf4ff' : '#f8fafc';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = notifications[idx].unread ? '#f4f9ff' : 'white';
    });
  });
}
