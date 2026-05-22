import { Home, Calendar, BarChart2, MessageSquare, User, Settings, Activity } from 'lucide-react';

interface SidebarProps {
  activeView: number;
  onViewChange: (view: number) => void;
  messageCount?: number;
}

const navItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: Calendar, label: 'Schedule' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: User, label: 'Profile' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar({ activeView, onViewChange, messageCount = 2 }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-16 bg-white border-r border-slate-100 flex flex-col items-center py-6 z-50 shadow-sm">
      <div className="mb-8">
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <nav className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === index;
          const hasNotification = index === 3 && messageCount > 0;

          return (
            <button
              key={index}
              onClick={() => onViewChange(index)}
              title={item.label}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group
                ${isActive
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-200'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              {hasNotification && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {messageCount}
                </span>
              )}
              <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-50">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">AP</span>
        </div>
      </div>
    </aside>
  );
}
