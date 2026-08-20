import { AdminSettingsConfig } from "./types";

const AUTH_KEY = "rakesh_portfolio_auth_v1";
const SETTINGS_KEY = "rakesh_portfolio_settings_v1";

const DEFAULT_SETTINGS: AdminSettingsConfig = {
  adminEmail: "rakeshreddy@king.com",
  adminName: "Bhargava Sai Rakesh Reddy",
  aiProvider: "built-in",
  useSupabase: false,
};

// Default password hash/value
const DEFAULT_PASSWORD = "1234@rakesh";
const PASSWORD_KEY = "rakesh_portfolio_admin_pwd_v1";

export const authService = {
  getSettings(): AdminSettingsConfig {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<AdminSettingsConfig>) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  },

  login(email: string, password: string): { success: boolean; message?: string } {
    const settings = this.getSettings();
    const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;

    const cleanInputEmail = email.trim().toLowerCase();
    const cleanAdminEmail = settings.adminEmail.trim().toLowerCase();

    if (cleanInputEmail !== cleanAdminEmail) {
      return { success: false, message: "Invalid email address." };
    }

    if (password !== storedPassword) {
      return { success: false, message: "Invalid password." };
    }

    // Set authenticated session with timestamp
    const session = {
      email: cleanInputEmail,
      name: settings.adminName,
      token: `adm-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { success: true };
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (!session.token || !session.expiresAt) return false;
      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  getAdminUser() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  changePassword(oldPass: string, newPass: string): { success: boolean; message?: string } {
    const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (oldPass !== storedPassword) {
      return { success: false, message: "Current password is incorrect." };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, message: "New password must be at least 6 characters long." };
    }
    localStorage.setItem(PASSWORD_KEY, newPass);
    return { success: true, message: "Password updated successfully." };
  },
};
