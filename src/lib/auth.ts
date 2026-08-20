import { AdminSettingsConfig } from "./types";

const AUTH_KEY = "rakesh_portfolio_admin_session_v2";
const SETTINGS_KEY = "rakesh_portfolio_settings_v1";

// Default SHA-256 hash for secure verification (never stores plaintext)
const DEFAULT_HASH = "f2a94ccda4a9db9a64cf9ed334843e5e604af2635e52408c464fcda64df69d2b";

const DEFAULT_SETTINGS: AdminSettingsConfig = {
  adminEmail: "rakeshreddy@king.com",
  adminName: "Bhargava Sai Rakesh Reddy",
  aiProvider: "built-in",
  useSupabase: false,
};

// Helper to compute SHA-256 hash in browser
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

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

  async verifyAndUnlock(password: string): Promise<{ success: boolean; message?: string }> {
    if (!password || password.trim().length === 0) {
      return { success: false, message: "Please enter the admin password." };
    }

    try {
      const inputHash = await sha256(password);
      const configuredHash =
        import.meta.env.VITE_ADMIN_PASSWORD_HASH ||
        (import.meta.env.VITE_ADMIN_PASSWORD ? await sha256(import.meta.env.VITE_ADMIN_PASSWORD) : null) ||
        DEFAULT_HASH;

      if (inputHash === configuredHash) {
        // Create secure persistent session with 7-day validity
        const session = {
          role: "admin",
          unlockedAt: Date.now(),
          expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
          token: `admin-sess-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true };
      }

      return { success: false, message: "Incorrect password. Access denied." };
    } catch (err) {
      return { success: false, message: "Verification error. Please try again." };
    }
  },

  lock() {
    localStorage.removeItem(AUTH_KEY);
  },

  logout() {
    this.lock();
  },

  isAuthenticated(): boolean {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (!session.token || !session.expiresAt) return false;
      if (Date.now() > session.expiresAt) {
        this.lock();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  // New helper to retrieve admin user info from settings
  getAdminUser() {
    const settings = this.getSettings();
    return {
      name: settings.adminName,
      email: settings.adminEmail,
    };
  },
};
