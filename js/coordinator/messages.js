import { api } from '../api.js';

export async function render(container, app) {
    let messages = [
        { side: "left", text: "Hello! Have you reviewed the upcoming TCS recruitment drive structure?" },
        { side: "right", text: "Yes, I am assigning the registered students from my department now." },
        { side: "left", text: "Great. Please ensure all their resumes are finalized by EOD." }
    ];

    container.innerHTML = `
        <div class="admin-dashboard-shell" style="gap:24px;">
            <div class="dashboard-header" style="margin-bottom: 24px;">
                <h1 style="font-size: 2rem; color: var(--primary);">Messages</h1>
                <p style="color: var(--text-muted);">Communicate directly with Administration or your assigned Students.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px; height: calc(100vh - 220px);">
                <!-- Left Sidebar: Admins & Students -->
                <div class="card" style="display: flex; flex-direction: column; padding: 0;">
                    <div style="padding: 20px; border-bottom: 1px solid var(--border);">
                        <div class="input-with-icon" style="background: var(--bg-light);">
                            <ion-icon name="search-outline"></ion-icon>
                            <input type="text" placeholder="Search chats...">
                        </div>
                    </div>
                    
                    <div style="flex: 1; overflow-y: auto;">
                        <!-- Administration Section -->
                        <h5 style="margin: 16px 20px 8px; font-size: 0.75rem; text-transform: uppercase; color: var(--primary); font-weight: 800; letter-spacing: 1px; display:flex; align-items:center; gap:6px;">
                            <ion-icon name="shield-checkmark"></ion-icon> Administration
                        </h5>
                        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); cursor: pointer; background: #f0f7ff;" onclick="document.getElementById('chat-active-name').innerText='CGDC Admin'">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <h4 style="font-size: 0.95rem; margin:0;">CGDC Admin</h4>
                                <span style="font-size: 0.7rem; color: var(--success); font-weight:700;">Active</span>
                            </div>
                            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Please ensure all their resumes...</p>
                        </div>

                        <!-- My Students Section -->
                        <h5 style="margin: 24px 20px 8px; font-size: 0.75rem; text-transform: uppercase; color: var(--text-main); font-weight: 800; letter-spacing: 1px; display:flex; align-items:center; gap:6px;">
                            <ion-icon name="people"></ion-icon> My Students
                        </h5>
                        <div id="students-chat-list">
                            <div style="padding: 20px; text-align: center; color: var(--text-muted);">
                                <ion-icon name="sync" style="animation: spin 1s linear infinite; font-size: 1.5rem;"></ion-icon>
                                <p style="margin-top: 8px; font-size:0.85rem;">Loading students...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Chat Window -->
                <div class="card" style="display: flex; flex-direction: column; padding: 0;">
                    <!-- Chat Header -->
                    <div style="padding: 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 14px; background: #f8fafc; border-radius: 20px 20px 0 0;">
                        <div style="width: 42px; height: 42px; border-radius: 50%; background: #e0e7ff; color: #4f46e5; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">CG</div>
                        <div>
                            <h4 style="font-size: 1.05rem; margin:0;" id="chat-active-name">CGDC Admin</h4>
                            <span style="font-size: 0.75rem; color: var(--success); font-weight: 600; display:flex; align-items:center; gap:4px;">
                                <div style="width:6px; height:6px; background:var(--success); border-radius:50%;"></div> Online
                            </span>
                        </div>
                        <div style="margin-left: auto; display:flex; gap:12px; color:var(--text-muted); font-size:1.2rem;">
                            <ion-icon name="call-outline" style="cursor:pointer;"></ion-icon>
                            <ion-icon name="videocam-outline" style="cursor:pointer;"></ion-icon>
                            <ion-icon name="information-circle-outline" style="cursor:pointer;"></ion-icon>
                        </div>
                    </div>

                    <!-- Message Feed -->
                    <div id="chat-feed" style="flex: 1; padding: 24px; overflow-y: auto; background: white; display: flex; flex-direction: column; gap: 16px;">
                        ${messages.map(msg => renderMessageBubble(msg.side, msg.text)).join('')}
                    </div>

                    <!-- Input Area -->
                    <div style="padding: 20px; border-top: 1px solid var(--border); background: #f8fafc; border-radius: 0 0 20px 20px;">
                        <form id="chat-form" style="display: flex; gap: 12px; align-items:center;">
                            <ion-icon name="attach-outline" style="font-size:1.5rem; color:var(--text-muted); cursor:pointer; padding:0 8px;"></ion-icon>
                            <input type="text" id="chat-input" placeholder="Type your message..." style="flex: 1; padding: 14px 16px; border: 1px solid var(--border); border-radius: 12px; outline: none; font-family:inherit; font-size:0.95rem;" autocomplete="off" required>
                            <button type="submit" class="btn-primary" style="padding: 14px 20px; border-radius: 12px; display:flex; align-items:center; gap:8px;">
                                <span>Send</span>
                                <ion-icon name="send"></ion-icon>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupForm(messages);
    scrollToBottom();
    fetchStudents();
}

async function fetchStudents() {
    try {
        const students = await api.get('/coordinator/students');
        const listContainer = document.getElementById('students-chat-list');
        
        if (!listContainer) return;
        
        if (!students || students.length === 0) {
            listContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No students assigned.</div>`;
            return;
        }

        const studentHtml = students.map(student => {
            const initials = student.avatar;
            return `
                <div class="chat-list-item" style="padding: 16px 20px; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.2s;" 
                     onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'"
                     onclick="document.getElementById('chat-active-name').innerText='${student.name}'">
                    <div style="display: flex; gap: 14px; align-items: center;">
                        <div style="width: 38px; height: 38px; min-width:38px; border-radius: 50%; background: #f1f5f9; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; border:1px solid #e2e8f0;">${initials}</div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <h4 style="font-size: 0.9rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color:var(--text-main);">${student.name}</h4>
                            </div>
                            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 4px 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${student.department} • ${student.rollNo}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        listContainer.innerHTML = studentHtml;

    } catch(err) {
        const container = document.getElementById('students-chat-list');
        if(container) container.innerHTML = `<div style="padding: 20px; text-align: center; color: red; font-size: 0.85rem;">Failed to load students.</div>`;
    }
}

const setupForm = (messages) => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const feed = document.getElementById('chat-feed');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (text) {
                messages.push({ side: 'right', text: text });
                
                const div = document.createElement('div');
                div.innerHTML = renderMessageBubble('right', text);
                feed.appendChild(div.firstElementChild);
                
                input.value = '';
                scrollToBottom();
            }
        });
    }
};

const scrollToBottom = () => {
    const feed = document.getElementById('chat-feed');
    if (feed) feed.scrollTop = feed.scrollHeight;
};

function renderMessageBubble(side, text) {
    const isRight = side === 'right';
    return `
        <div style="display: flex; justify-content: ${isRight ? 'flex-end' : 'flex-start'};">
            <div class="message-bubble" style="max-width: 75%; padding: 14px 18px; border-radius: 18px; font-size: 0.95rem; position: relative; line-height: 1.5;
                ${isRight ? 'background: var(--primary); color: white; border-bottom-right-radius: 4px; box-shadow:0 4px 6px -1px rgba(59,130,246,0.1);' : 'background: #f1f5f9; color: var(--text-main); border: 1px solid transparent; border-bottom-left-radius: 4px;'}">
                ${text}
                <div style="font-size: 0.65rem; margin-top: 6px; opacity: ${isRight ? '0.8' : '0.6'}; text-align: ${isRight ? 'right' : 'left'}; font-weight:600;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        </div>
    `;
}
