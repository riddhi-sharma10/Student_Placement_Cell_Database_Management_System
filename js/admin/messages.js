// js/common/messages.js

export function render(container, app) {
    let messages = [
        { side: "left", text: "Hello! Please upload your verified marksheet to the portal." },
        { side: "right", text: "Sure sir, I will do it by tonight." },
        { side: "left", text: "Great. The deadline is tomorrow morning." }
    ];

    const renderTemplate = () => {
        container.innerHTML = `
            <div class="dashboard-header" style="margin-bottom: 32px;">
                <h1 style="font-size: 2rem; color: var(--primary);">Messages</h1>
                <p style="color: var(--text-muted);">Direct communication with the Training & Placement Office.</p>
            </div>

            <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px; height: calc(100vh - 240px);">
                <!-- Left Sidebar: Only TPO -->
                <div class="card" style="display: flex; flex-direction: column; padding: 0;">
                    <div style="padding: 20px; border-bottom: 1px solid var(--border);">
                        <div class="input-with-icon" style="background: var(--bg-light);">
                            <ion-icon name="search-outline"></ion-icon>
                            <input type="text" placeholder="Search chats...">
                        </div>
                    </div>
                    <div style="flex: 1; overflow-y: auto;">
                        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); cursor: pointer; background: #f0f7ff;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <h4 style="font-size: 0.9rem;">TPO Coordinator</h4>
                                <span style="font-size: 0.7rem; color: var(--text-muted);">Active</span>
                            </div>
                            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Please submit your documents...</p>
                        </div>
                    </div>
                </div>

                <!-- Right Chat Window -->
                <div class="card" style="display: flex; flex-direction: column; padding: 0;">
                    <!-- Chat Header -->
                    <div style="padding: 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px;">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=coordinator" style="width: 40px; height: 40px; border-radius: 50%;">
                        <div>
                            <h4 style="font-size: 1rem;">TPO Coordinator</h4>
                            <span style="font-size: 0.75rem; color: var(--success); font-weight: 600;">Online</span>
                        </div>
                    </div>

                    <!-- Message Feed -->
                    <div id="chat-feed" style="flex: 1; padding: 24px; overflow-y: auto; background: #f8fafc; display: flex; flex-direction: column; gap: 16px;">
                        ${messages.map(msg => renderMessageBubble(msg.side, msg.text)).join('')}
                    </div>

                    <!-- Input Area -->
                    <div style="padding: 20px; border-top: 1px solid var(--border);">
                        <form id="chat-form" style="display: flex; gap: 12px;">
                            <input type="text" id="chat-input" placeholder="Type a message..." style="flex: 1; padding: 12px; border: 1px solid var(--border); border-radius: 10px; outline: none;" required>
                            <button type="submit" class="btn-primary" style="padding: 12px;">
                                <ion-icon name="send"></ion-icon>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        setupForm();
        scrollToBottom();
    };

    const setupForm = () => {
        const form = document.getElementById('chat-form');
        const input = document.getElementById('chat-input');
        const feed = document.getElementById('chat-feed');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = input.value.trim();
                if (text) {
                    // Add message to state
                    messages.push({ side: 'right', text: text });
                    
                    // Append bubble manually for performance/smoothness instead of full re-render
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

    renderTemplate();
}

function renderMessageBubble(side, text) {
    const isRight = side === 'right';
    return `
        <div style="display: flex; justify-content: ${isRight ? 'flex-end' : 'flex-start'};">
            <div class="message-bubble" style="max-width: 70%; padding: 12px 16px; border-radius: 16px; font-size: 0.9rem; position: relative;
                ${isRight ? 'background: var(--primary); color: white; border-bottom-right-radius: 4px;' : 'background: white; border: 1px solid var(--border); border-bottom-left-radius: 4px;'}">
                ${text}
                <div style="font-size: 0.6rem; margin-top: 4px; opacity: 0.7; text-align: ${isRight ? 'right' : 'left'};">Just now</div>
            </div>
        </div>
    `;
}
