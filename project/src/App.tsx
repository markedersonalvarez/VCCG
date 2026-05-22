import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Schedule from './views/Schedule';
import Analytics from './views/Analytics';
import Messages from './views/Messages';
import Profile from './views/Profile';
import SettingsView from './views/SettingsView';

const views = [Dashboard, Schedule, Analytics, Messages, Profile, SettingsView];

export default function App() {
  const [activeView, setActiveView] = useState(0);

  const ActiveView = views[activeView];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} messageCount={2} />

      <main className="flex-1 ml-16 overflow-y-auto">
        <div className="p-6 min-h-full">
          <ActiveView />
        </div>
      </main>
    </div>
  );
}
