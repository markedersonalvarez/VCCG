import { useState, useEffect } from 'react';
import { Users, TrendingUp, Activity, BarChart2, Calendar, Clock } from 'lucide-react';

function ProgressBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function LoadingBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 75) return 25;
        return p + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal-500 rounded-full transition-all duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

const departmentStats = [
  { name: 'Cardiology', patients: 412, pct: 82, trend: '+8.2%' },
  { name: 'General Medicine', patients: 338, pct: 68, trend: '+3.1%' },
  { name: 'Orthopedics', patients: 290, pct: 58, trend: '+11.4%' },
  { name: 'Neurology', patients: 245, pct: 49, trend: '-1.2%' },
  { name: 'Pediatrics', patients: 207, pct: 41, trend: '+5.6%' },
];

const monthlyData = [
  { month: 'Jan', count: 98 },
  { month: 'Feb', count: 112 },
  { month: 'Mar', count: 134 },
  { month: 'Apr', count: 121 },
  { month: 'May', count: 145 },
  { month: 'Jun', count: 162 },
  { month: 'Jul', count: 158 },
  { month: 'Aug', count: 174 },
  { month: 'Sep', count: 183 },
  { month: 'Oct', count: 165 },
  { month: 'Nov', count: 140 },
  { month: 'Dec', count: 0 },
];

export default function Analytics() {
  const maxCount = Math.max(...monthlyData.map(d => d.count));

  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Performance Analytics</h1>
        <p className="text-slate-500 text-sm mt-0.5">Deep dive into clinic statistics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-teal-500 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-teal-100 text-xs font-medium uppercase tracking-wide">Total Patients YTD</span>
            <Users className="w-5 h-5 text-teal-200" />
          </div>
          <p className="text-4xl font-black">1,492</p>
          <p className="text-teal-200 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +15.3% vs last year
          </p>
        </div>

        <div className="rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-rose-100 text-xs font-medium uppercase tracking-wide">Recovery Rate</span>
            <Activity className="w-5 h-5 text-rose-200" />
          </div>
          <p className="text-4xl font-black">84%</p>
          <p className="text-rose-200 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2.1% vs last quarter
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Growth vs Last Month</span>
            <BarChart2 className="w-5 h-5 text-slate-500" />
          </div>
          <p className="text-4xl font-black text-teal-400">+12.5%</p>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-teal-500" /> 165 patients in Oct
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 flex-1">
        {/* Monthly Patients Bar Chart */}
        <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">Monthly Patient Volume</h3>
              <p className="text-xs text-slate-400 mt-0.5">January — December 2026</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-600">2026</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-36">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ${d.count === 0 ? 'bg-slate-100' : i === 9 ? 'bg-teal-500' : 'bg-teal-200'}`}
                  style={{ height: d.count === 0 ? '8px' : `${(d.count / maxCount) * 100}%` }}
                />
                <span className="text-[9px] text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>

          {/* Loading indicator for "detailed charts" */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-slate-300" />
            </div>
            <p className="text-xs text-slate-400">Detailed demographic charts loading...</p>
            <LoadingBar />
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800">By Department</h3>
            <Clock className="w-4 h-4 text-slate-300" />
          </div>
          <div className="flex flex-col gap-4">
            {departmentStats.map((dept, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-700">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{dept.patients}</span>
                    <span className={`text-[10px] font-semibold ${dept.trend.startsWith('+') ? 'text-teal-500' : 'text-rose-500'}`}>
                      {dept.trend}
                    </span>
                  </div>
                </div>
                <ProgressBar
                  value={dept.pct}
                  color={i === 0 ? 'bg-teal-500' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-amber-400' : i === 3 ? 'bg-rose-400' : 'bg-violet-400'}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Avg patients/day</span>
              <span className="font-semibold text-slate-800">5.3</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-slate-500">Peak hour</span>
              <span className="font-semibold text-slate-800">10:00 — 11:00 AM</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-slate-500">Satisfaction score</span>
              <span className="font-semibold text-teal-600">4.8 / 5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
