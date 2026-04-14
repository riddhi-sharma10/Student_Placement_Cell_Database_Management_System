// js/admin/messages.js

export function render(container) {
    const messages = [
        { side: 'left', text: 'Good evening Admin. Deloitte confirmed 25 interview slots for tomorrow.', time: 'Just now' },
        { side: 'right', text: 'Perfect. Please share final shortlisted student list by 8 PM.', time: 'Just now' },
        { side: 'left', text: 'Done. I will upload the list and interview room plan shortly.', time: 'Just now' }
    ];

    container.innerHTML = `
        <div class="admin-dashboard-shell" style="gap:24px;">
            <div class="admin-dashboard-header">
                <div>
                    <h1>Messages</h1>
                    <p>Direct communication with coordinators and recruiters.</p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 340px 1fr; gap:24px; height: calc(100vh - 235px); min-height: 490px;">
                <div class="card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; border-radius:16px;">
                    <div style="padding:22px 18px; border-bottom:1px solid #e2e8f0;">
                        <div style="display:flex; align-items:center; gap:10px; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:12px; padding:11px 12px;">
                            <ion-icon name="search-outline" style="font-size:1rem; color:#64748b;"></ion-icon>
                            <input type="text" placeholder="Search chats..." style="width:100%; border:none; outline:none; background:transparent; color:#0f172a; font-size:1rem;">
                        </div>
                    </div>

                    <div style="flex:1; overflow:auto;">
                        <div style="padding:16px 20px; border-bottom:1px solid #e2e8f0; background:#e8eff8;">
                            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
                                <strong style="color:#0f1f46; font-size:1.02rem;">Placement Coordinator</strong>
                                <span style="font-size:0.88rem; color:#64748b;">Active</span>
                            </div>
                            <p style="margin:4px 0 0; color:#64748b; font-size:0.95rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Deloitte confirmed interview slots...</p>
                        </div>
                    </div>
                </div>

                <div class="card" style="padding:0; overflow:hidden; display:flex; flex-direction:column; border-radius:16px;">
                    <div style="padding:18px 26px; border-bottom:1px solid #e2e8f0; display:flex; align-items:center; gap:12px;">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=placement-coordinator" alt="Coordinator" style="width:44px; height:44px; border-radius:50%; border:1px solid #dbe4f0;">
                        <div>
                            <h4 style="margin:0; color:#0f1f46; font-size:1.08rem;">Placement Coordinator</h4>
                            <span style="font-size:0.92rem; color:#10b981; font-weight:600;">Online</span>
                        </div>
                    </div>

                    <div id="chat-feed" style="flex:1; background:#f8fafc; overflow:auto; padding:26px; display:flex; flex-direction:column; gap:18px;">
                        ${messages.map((msg) => renderBubble(msg)).join('')}
                    </div>

                    <div style="padding:20px 24px; border-top:1px solid #e2e8f0;">
                        <form id="chat-form" style="display:flex; gap:12px; align-items:center;">
                            <input id="chat-input" type="text" placeholder="Type a message..." required style="flex:1; border:1px solid #dbe4f0; border-radius:12px; padding:12px 14px; outline:none; font-size:1rem; background:#fff;">
                            <button type="submit" style="width:44px; height:44px; border:none; border-radius:12px; background:var(--primary); color:#fff; display:grid; place-items:center; cursor:pointer;">
                                <ion-icon name="send" style="font-size:1.1rem;"></ion-icon>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    const feed = container.querySelector('#chat-feed');
    const form = container.querySelector('#chat-form');
    const input = container.querySelector('#chat-input');

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = input?.value?.trim();
        if (!text || !feed) return;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = renderBubble({ side: 'right', text, time: 'Just now' });
        feed.appendChild(wrapper.firstElementChild);
        input.value = '';
        feed.scrollTop = feed.scrollHeight;
    });

    if (feed) feed.scrollTop = feed.scrollHeight;
}

function renderBubble(message) {
    const isRight = message.side === 'right';
    return `
        <div style="display:flex; justify-content:${isRight ? 'flex-end' : 'flex-start'};">
            <div style="max-width:64%; padding:14px 16px; border-radius:16px; line-height:1.35; ${
                isRight
                    ? 'background:#1f3f76; color:#ffffff; border-bottom-right-radius:6px;'
                    : 'background:#ffffff; color:#0f172a; border:1px solid #dbe4f0; border-bottom-left-radius:6px;'
            }">
                <div style="font-size:1.05rem;">${message.text}</div>
                <div style="margin-top:4px; font-size:0.84rem; opacity:${isRight ? '0.9' : '0.65'}; text-align:${isRight ? 'right' : 'left'};">${message.time}</div>
            </div>
        </div>
    `;
}
