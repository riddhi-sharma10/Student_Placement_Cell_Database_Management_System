// js/coordinator/notifications.js

export function render(container, app) {
  const notifications = [
    {
      id: 1, icon: 'mic-outline', iconColor: '#3b82f6',
      title: 'Interview Scheduled',
      message: 'A technical interview round has been scheduled for <b>Priya Desai</b> with <b>Google</b> on Feb 15.',
      time: 'Just now'
    },
    {
      id: 2, icon: 'business-outline', iconColor: '#8b5cf6',
      title: 'Company HR Reached Out',
      message: 'The HR team from <b>Microsoft</b> requested additional academic transcripts for shortlisted candidates.',
      time: '2 hours ago'
    },
    {
      id: 3, icon: 'calendar-outline', iconColor: '#f59e0b',
      title: 'New Consultation Request',
      message: '<b>Rohan Singh</b> has requested a 1-on-1 consultation regarding mock interview preparation.',
      time: '5 hours ago'
    },
    {
      id: 4, icon: 'checkmark-circle-outline', iconColor: '#10b981',
      title: 'Student Placed!',
      message: '<b>Sara Chen</b> has successfully cleared the final rounds and accepted the offer from <b>Atlassian</b>.',
      time: '1 day ago'
    },
    {
      id: 5, icon: 'document-text-outline', iconColor: '#64748b',
      title: 'Application Deadline Approaching',
      message: 'The application window for the <b>Amazon SDE-1</b> role closes in 24 hours. 3 assigned students haven\'t applied yet.',
      time: '2 days ago'
    }
  ];

  container.innerHTML = `
    <div class="dashboard-header" style="margin-bottom: 32px;">
      <h1 style="font-size: 2rem; color: var(--primary);">Notifications Center</h1>
      <p style="color: var(--text-muted);">Stay updated on student progress and placement cell alerts</p>
    </div>

    <div class="card">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${notifications.map(n => renderNotificationItem(n)).join('')}
      </div>
    </div>
  `;
}

function renderNotificationItem(n) {
  return `
    <div style="display: flex; gap: 16px; padding: 16px; border-bottom: 1px solid var(--border); align-items: flex-start;">
      <div style="width: 40px; height: 40px; border-radius: 10px; background: ${n.iconColor}20; color: ${n.iconColor}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">
        <ion-icon name="${n.icon}"></ion-icon>
      </div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin: 0;">${n.title}</h4>
          <span style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; margin-left: 12px;">${n.time}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.5;">${n.message}</p>
      </div>
    </div>
  `;
}
