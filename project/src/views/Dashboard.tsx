import { useState } from 'react';
import { ChevronDown, ArrowDown, Heart, Activity, TrendingUp } from 'lucide-react';

const weekDays = [
  { date: '25', day: 'SUN' },
  { date: '26', day: 'MON', active: true },
  { date: '27', day: 'TUE' },
  { date: '28', day: 'WED' },
  { date: '29', day: 'THU' },
  { date: '30', day: 'FRI' },
];

const appointments = [
  { time: '08:00 AM', name: 'Nicholas Amazon', duration: '8:00 - 8:15 am', initials: 'NA', color: 'bg-teal-500' },
  { time: '08:30 AM', name: 'Logan Anderson', duration: '8:16 - 8:30 am', initials: 'LA', color: 'bg-blue-500' },
  { time: '09:00 AM', name: 'Have a Break', duration: '9:00 - 9:30 am', isBreak: true },
  { time: '09:30 AM', name: 'Leonard Campbell', duration: '9:30 - 9:45 am', initials: 'LC', color: 'bg-violet-500' },
  { time: '10:00 AM', name: 'Harvey Roberts', duration: '10:00 - 10:15 am', initials: 'HR', color: 'bg-amber-500' },
  { time: '10:30 AM', name: 'Elnora Goodwin', duration: '10:30 - 10:45 am', initials: 'EG', color: 'bg-rose-500' },
];

function HeartRateSparkline() {
  const points = [40, 45, 38, 55, 42, 60, 48, 52, 45, 58, 50, 55];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 120, h = 40;
  const pts = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill="url(#tealGrad)" strokeWidth="0" />
      <defs>
        <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BloodPressureSparkline() {
  const points = [55, 60, 52, 65, 58, 70, 62, 68, 58, 72, 65, 68];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 120, h = 40;
  const pts = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill="url(#coralGrad)" strokeWidth="0" />
      <defs>
        <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function VisitorsChart() {
  const data = [
    { day: 'Mon', patients: 18, revenue: 12 },
    { day: 'Tue', patients: 24, revenue: 18 },
    { day: 'Wed', patients: 20, revenue: 15 },
    { day: 'Thu', patients: 30, revenue: 24 },
    { day: 'Fri', patients: 26, revenue: 20 },
    { day: 'Sat', patients: 14, revenue: 10 },
    { day: 'Sun', patients: 8, revenue: 6 },
  ];

  const maxP = Math.max(...data.map(d => d.patients));
  const maxR = Math.max(...data.map(d => d.revenue));
  const w = 100, h = 100;

  const pPts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.patients / maxP) * h;
    return `${x},${y}`;
  }).join(' ');

  const rPts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.revenue / maxR) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-teal-500 inline-block rounded"></span>Patients</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-400 inline-block rounded"></span>Revenue</span>
        </div>
        <button className="text-xs text-slate-500 flex items-center gap-1 border border-slate-200 rounded-lg px-2.5 py-1 hover:bg-slate-50 transition-colors">
          This Week <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      <svg viewBox="0 0 100 100" className="w-full h-40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="tealChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="coralChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" />
        ))}
        <polyline points={`0,100 ${pPts} 100,100`} fill="url(#tealChartGrad)" strokeWidth="0" />
        <polyline points={pPts} fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`0,100 ${rPts} 100,100`} fill="url(#coralChartGrad)" strokeWidth="0" />
        <polyline points={rPts} fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((d) => (
          <span key={d.day} className="text-[10px] text-slate-400">{d.day}</span>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="flex gap-6 h-full">
      {/* Left Main Panel */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dr. Andhika</h1>
          <p className="text-slate-500 text-sm mt-0.5">Hi Doctor, let's take a closer look at your patients and appointments</p>
        </div>

        {/* Current Patient Cards */}
        <div>
          <h2 className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">Current Patient</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Patient Info Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                  NA
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Nicholas Amazon</p>
                  <p className="text-xs text-slate-400">8:00 - 8:15</p>
                </div>
              </div>
              <span className="inline-block bg-teal-50 text-teal-600 text-xs font-medium px-2.5 py-1 rounded-full">
                Last visit 2 weeks ago
              </span>
            </div>

            {/* Heart Rate Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-teal-500" />
                <span className="text-xs font-medium text-slate-500">Heart Rate</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-slate-800">92</span>
                <span className="text-slate-400 text-xs">/100 PRBPM</span>
              </div>
              <HeartRateSparkline />
            </div>

            {/* Blood Pressure Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-medium text-slate-500">Blood Pressure</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-slate-800">89</span>
                <span className="text-slate-400 text-xs">/120 MMHG</span>
              </div>
              <BloodPressureSparkline />
            </div>
          </div>
        </div>

        {/* Visitors & Revenue Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Visitors & Revenue</h2>
          <VisitorsChart />
        </div>

        {/* Metrics & Revenue */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                <span className="text-slate-400 text-xs uppercase tracking-wide">Monthly Overview</span>
              </div>
              <p className="text-2xl font-bold">182</p>
              <p className="text-slate-400 text-sm">Total patients this month</p>
              <p className="text-slate-500 text-xs mt-1">26 patients cancelled their appointments</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Revenue This Month</p>
              <p className="text-xl font-bold text-teal-400 mt-0.5">$9,260.84</p>
            </div>
            <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <ArrowDown className="w-4 h-4 text-slate-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-slate-800 rounded-2xl p-5 flex flex-col shrink-0">
        <h2 className="text-white font-semibold mb-4">Upcoming Appointments</h2>

        {/* Week Picker */}
        <div className="flex gap-1.5 mb-5">
          {weekDays.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 flex flex-col items-center py-2 rounded-xl text-xs transition-all duration-200
                ${selectedDay === i
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-900/30'
                  : 'text-slate-400 hover:bg-slate-700'
                }`}
            >
              <span className="font-bold text-sm">{d.date}</span>
              <span className={`text-[9px] mt-0.5 ${selectedDay === i ? 'text-teal-100' : 'text-slate-500'}`}>{d.day}</span>
            </button>
          ))}
        </div>

        {/* Date Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-300 text-sm font-medium">Monday 26</span>
          <span className="bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">12 visitors</span>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
          {appointments.map((appt, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex flex-col items-center shrink-0">
                <span className="text-slate-500 text-[10px] w-14 text-right">{appt.time}</span>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-2 h-2 rounded-full mt-1 ${appt.isBreak ? 'bg-slate-600' : 'bg-teal-400'}`} />
                {i < appointments.length - 1 && <div className="w-0.5 h-8 bg-slate-700 mt-1" />}
              </div>
              {appt.isBreak ? (
                <div className="flex-1 bg-slate-700/60 border border-dashed border-slate-600 rounded-xl px-3 py-2">
                  <p className="text-slate-400 text-xs font-medium">Have a Break</p>
                  <p className="text-slate-500 text-[10px]">{appt.duration}</p>
                </div>
              ) : (
                <div className="flex-1 bg-white rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full ${appt.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                    {appt.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-800 text-xs font-semibold truncate">{appt.name}</p>
                    <p className="text-slate-400 text-[10px]">{appt.duration}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
