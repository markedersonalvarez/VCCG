import { useState } from 'react';
import { Bell, Moon, ShieldAlert, ChevronRight, Globe, Volume2, Lock } from 'lucide-react';

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none shrink-0
        ${enabled ? 'bg-teal-500' : 'bg-slate-200'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300
          ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}

export default function SettingsView() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    darkMode: false,
    emailAlerts: true,
    soundEffects: false,
    autoLogout: true,
    language: 'English',
  });

  const toggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(s => ({ ...s, [key]: !s[key] }));
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-slate-800 text-center">System Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5 text-center">Manage your account preferences and security</p>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-4">
        {/* Notifications Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-500" />
            <span className="text-sm font-semibold text-slate-700">Notifications</span>
          </div>

          <div className="divide-y divide-slate-50">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Push Notifications</p>
                <p className="text-xs text-slate-500 mt-0.5">Receive alerts for new appointments and messages.</p>
              </div>
              <Toggle enabled={settings.pushNotifications} onToggle={() => toggle('pushNotifications')} />
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Email Alerts</p>
                <p className="text-xs text-slate-500 mt-0.5">Daily summary and critical patient notifications.</p>
              </div>
              <Toggle enabled={settings.emailAlerts} onToggle={() => toggle('emailAlerts')} />
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Sound Effects</p>
                <p className="text-xs text-slate-500 mt-0.5">Play audio cues for messages and alerts.</p>
              </div>
              <Toggle enabled={settings.soundEffects} onToggle={() => toggle('soundEffects')} />
            </div>
          </div>
        </div>

        {/* Appearance Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
            <Moon className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Appearance</span>
          </div>

          <div className="divide-y divide-slate-50">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Dark Mode</p>
                <p className="text-xs text-slate-500 mt-0.5">Toggle system appearance.</p>
              </div>
              <Toggle enabled={settings.darkMode} onToggle={() => toggle('darkMode')} />
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Language</p>
                  <p className="text-xs text-slate-500 mt-0.5">Interface display language.</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-100 transition-colors">
                {settings.language} <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Security</span>
          </div>

          <div className="divide-y divide-slate-50">
            {/* 2FA Row - highlighted */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-rose-600">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors shrink-0 ml-4">
                Enable 2FA
              </button>
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Auto Logout</p>
                <p className="text-xs text-slate-500 mt-0.5">Automatically sign out after 30 minutes of inactivity.</p>
              </div>
              <Toggle enabled={settings.autoLogout} onToggle={() => toggle('autoLogout')} />
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Change Password</p>
                <p className="text-xs text-slate-500 mt-0.5">Last updated 3 months ago.</p>
              </div>
              <button className="flex items-center gap-2 text-sm text-teal-600 bg-teal-50 border border-teal-100 rounded-xl px-3 py-1.5 hover:bg-teal-100 transition-colors font-medium">
                Update <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-rose-100 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-semibold text-rose-600">Danger Zone</span>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Delete Account</p>
              <p className="text-xs text-slate-500 mt-0.5">Permanently remove your account and all associated data.</p>
            </div>
            <button className="px-3 py-1.5 border border-rose-200 text-rose-500 text-xs font-semibold rounded-xl hover:bg-rose-50 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
