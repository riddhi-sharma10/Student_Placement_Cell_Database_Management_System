// js/coordinator/messages.js — PAGE 6: MESSAGES

import { students, adminContact, mockChats as baseMockChats } from "./data.js";

// Work on a mutable deep copy of chats
const chats = {};
Object.keys(baseMockChats).forEach((k) => {
  chats[k] = baseMockChats[k].map((m) => ({ ...m }));
});

let selectedId = "admin";
let searchContacts = "";

export function render(container, app) {
  renderPage(container);
}

function renderPage(container) {
  const contact = getContact(selectedId);
  const messages = chats[selectedId] || [];
  const allContacts = getSearchedContacts();

  container.innerHTML = `
    <div class="coord-page-header" style="margin-bottom:0">
      <div>
        <h1 class="coord-page-title">Messages</h1>
        <p class="coord-page-sub">Direct communications with your students and department admin</p>
      </div>
    </div>

    <div class="coord-messages-shell">

      <!-- LEFT PANEL -->
      <div class="card coord-msg-left">
        <div class="coord-msg-left-head">
          <div class="coord-search-wrap compact">
            <ion-icon name="search-outline"></ion-icon>
            <input id="msg-search" type="text" placeholder="Search contacts…"
              value="${escapeHtml(searchContacts)}" class="coord-search-input">
          </div>
        </div>

        <div class="coord-contact-list" id="contact-list">
          <!-- Admin Section -->
          <div class="coord-contact-section-label">Admin</div>
          <div class="coord-contact-item ${selectedId === "admin" ? "active" : ""}"
               data-contact-id="admin">
            <div class="coord-contact-avatar admin-avatar">DA</div>
            <div class="coord-contact-info">
              <h4>${adminContact.name}</h4>
              <p class="coord-contact-preview">${lastMessage("admin")}</p>
            </div>
            <div class="coord-contact-meta">
              <span class="coord-contact-time">${lastTime("admin")}</span>
              <span class="coord-contact-status online"></span>
            </div>
          </div>

          <!-- Students Section -->
          <div class="coord-contact-section-label" style="margin-top:8px">My Students</div>
          ${allContacts
            .map((s) => {
              const msgs = chats[s.id] || [];
              const unread =
                msgs.filter((m) => m.senderType === "student").length > 0 &&
                msgs.length > 0;
              return `
              <div class="coord-contact-item ${selectedId === String(s.id) ? "active" : ""}"
                   data-contact-id="${s.id}">
                <div class="coord-contact-avatar" style="background:${avatarBg(s.id)}">${s.avatar}</div>
                <div class="coord-contact-info">
                  <h4>${s.name}</h4>
                  <p class="coord-contact-preview">${lastMessage(s.id)}</p>
                </div>
                <div class="coord-contact-meta">
                  <span class="coord-contact-time">${lastTime(s.id)}</span>
                  <span class="coord-contact-status ${s.status === "online" ? "online" : ""}"></span>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="card coord-msg-right">
        <!-- Chat Header -->
        <div class="coord-chat-header">
          <div class="coord-chat-header-avatar" style="background:${selectedId === "admin" ? "#1B3A6B" : avatarBg(parseInt(selectedId))}">
            ${contact.avatar}
          </div>
          <div class="coord-chat-header-info">
            <h3>${contact.name}</h3>
            <span class="coord-chat-online ${contact.status === "online" ? "online" : ""}">
              <span class="dot"></span>
              ${contact.status === "online" ? "Online" : "Offline"}
            </span>
          </div>
          ${
            selectedId !== "admin"
              ? `
            <div class="coord-chat-header-actions">
              <span class="coord-chat-dept-badge">Computer Science</span>
            </div>
          `
              : ""
          }
        </div>

        <!-- Message Feed -->
        <div class="coord-chat-feed" id="chat-feed">
          ${
            messages.length > 0
              ? messages.map((m) => renderBubble(m)).join("")
              : `
            <div class="coord-chat-empty">
              <ion-icon name="chatbubbles-outline"></ion-icon>
              <p>Start a conversation with ${contact.name}</p>
            </div>
          `
          }
        </div>

        <!-- Input Bar -->
        <div class="coord-chat-input-bar">
          <button class="coord-attach-btn" id="attach-btn" title="Attach PDF or Image">
            <ion-icon name="attach-outline"></ion-icon>
          </button>
          <input type="file" id="file-input" accept=".pdf,image/*" style="display:none">
          <input type="text" id="chat-input-field" placeholder="Type a message…" class="coord-chat-input"
                 autocomplete="off">
          <button class="coord-send-btn btn-primary" id="send-btn">
            <ion-icon name="send"></ion-icon>
          </button>
        </div>
      </div>

    </div>
  `;

  // Events
  container.querySelector("#msg-search").addEventListener("input", (e) => {
    searchContacts = e.target.value;
    renderPage(container);
  });

  container.querySelectorAll(".coord-contact-item").forEach((item) => {
    item.addEventListener("click", () => {
      selectedId = item.dataset.contactId;
      renderPage(container);
    });
  });

  // Send message
  const sendBtn = container.querySelector("#send-btn");
  const inputFld = container.querySelector("#chat-input-field");
  const attachBtn = container.querySelector("#attach-btn");
  const fileInput = container.querySelector("#file-input");
  const feed = container.querySelector("#chat-feed");

  const sendMessage = () => {
    const text = inputFld.value.trim();
    if (!text) return;
    if (!chats[selectedId]) chats[selectedId] = [];
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const msg = {
      id: Date.now(),
      senderType: "coordinator",
      senderName: "You",
      message: text,
      timestamp: now,
    };
    chats[selectedId].push(msg);

    const bubble = document.createElement("div");
    bubble.innerHTML = renderBubble(msg);
    feed.appendChild(bubble.firstElementChild);
    inputFld.value = "";
    scrollToBottom(feed);
  };

  sendBtn.addEventListener("click", sendMessage);
  inputFld.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  attachBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowed.includes(file.type)) {
      alert("Only PDF and image files are allowed!");
      fileInput.value = "";
      return;
    }
    const text = `📎 ${file.name}`;
    if (!chats[selectedId]) chats[selectedId] = [];
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const msg = {
      id: Date.now(),
      senderType: "coordinator",
      senderName: "You",
      message: text,
      timestamp: now,
    };
    chats[selectedId].push(msg);
    const bubble = document.createElement("div");
    bubble.innerHTML = renderBubble(msg);
    feed.appendChild(bubble.firstElementChild);
    fileInput.value = "";
    scrollToBottom(feed);
  });

  scrollToBottom(feed);
}

function renderBubble(m) {
  const isSelf = m.senderType === "coordinator";
  return `
    <div class="coord-bubble-wrap ${isSelf ? "self" : "other"}">
      ${!isSelf ? `<div class="coord-bubble-avatar" style="background:${m.senderType === "admin" ? "#1B3A6B" : "#10b981"}">${m.senderName.charAt(0)}</div>` : ""}
      <div class="coord-bubble ${isSelf ? "self" : "other"}">
        <p>${escapeHtml(m.message)}</p>
        <span class="coord-bubble-time">${m.timestamp}</span>
      </div>
    </div>
  `;
}

function lastMessage(id) {
  const msgs = chats[id] || [];
  if (!msgs.length) return "No messages yet";
  const last = msgs[msgs.length - 1];
  const preview =
    last.message.length > 40 ? last.message.slice(0, 40) + "…" : last.message;
  return last.senderType === "coordinator" ? `You: ${preview}` : preview;
}

function lastTime(id) {
  const msgs = chats[id] || [];
  if (!msgs.length) return "";
  return msgs[msgs.length - 1].timestamp || "";
}

function getContact(id) {
  if (id === "admin") return adminContact;
  return students.find((s) => s.id === parseInt(id)) || adminContact;
}

function getSearchedContacts() {
  const q = searchContacts.toLowerCase();
  return students.filter((s) => s.name.toLowerCase().includes(q));
}

function scrollToBottom(feed) {
  if (feed)
    setTimeout(() => {
      feed.scrollTop = feed.scrollHeight;
    }, 50);
}

const palette = [
  "#1B3A6B",
  "#2c5282",
  "#10b981",
  "#F5A623",
  "#7c3aed",
  "#ef4444",
  "#0284c7",
  "#f59e0b",
  "#059669",
  "#dc2626",
];
const avatarBg = (id) => palette[(id - 1) % palette.length];

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
