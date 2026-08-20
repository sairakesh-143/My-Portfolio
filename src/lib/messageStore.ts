import { ContactMessage } from "./types";

const MESSAGE_STORAGE_KEY = "rakesh_portfolio_messages_v1";

const initialMessages: ContactMessage[] = [
  {
    id: "msg-welcome-1",
    name: "Recruiter / Hiring Team",
    email: "careers@techstart.io",
    subject: "Full-Stack / AI Developer Internship Opportunity",
    message:
      "Hi Rakesh, We reviewed your WareMind AI and AI Finance Dashboard projects. We would love to invite you for an introductory conversation regarding our summer software engineering roles.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    read: false,
  },
];

const messageListeners = new Set<() => void>();

function notifyMessages() {
  messageListeners.forEach((l) => l());
}

export const messageStore = {
  subscribe(listener: () => void) {
    messageListeners.add(listener);
    return () => {
      messageListeners.delete(listener);
    };
  },

  getMessages(): ContactMessage[] {
    try {
      const raw = localStorage.getItem(MESSAGE_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(initialMessages));
        return initialMessages;
      }
      return JSON.parse(raw);
    } catch {
      return initialMessages;
    }
  },

  getUnreadCount(): number {
    return this.getMessages().filter((m) => !m.read).length;
  },

  addMessage(msg: Omit<ContactMessage, "id" | "createdAt" | "read">): ContactMessage {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    messages.unshift(newMsg);
    localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages));
    notifyMessages();
    return newMsg;
  },

  markAsRead(id: string) {
    const messages = this.getMessages();
    const found = messages.find((m) => m.id === id);
    if (found) {
      found.read = true;
      localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(messages));
      notifyMessages();
    }
  },

  deleteMessage(id: string) {
    const messages = this.getMessages();
    const filtered = messages.filter((m) => m.id !== id);
    localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(filtered));
    notifyMessages();
  },
};
