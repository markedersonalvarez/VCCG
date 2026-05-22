import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const activeDots = new Set([4, 8, 12, 16, 20, 7, 14, 21]);

const shiftColors: Record<number, string> = {
  4: 'bg-teal-50 border-teal-200 text-teal-700',
  8: 'bg-teal-50 border-teal-200 text-teal-700',
  12: 'bg-teal-50 border-teal-200 text-teal-700',
  16: 'bg-teal-50 border-teal-200 text-teal-700',
  20: 'bg-teal-50 border-teal-200 text-teal-700',
  7: 'bg-blue-50 border-blue-200 text-blue-700',
  14: 'bg-blue-50 border-blue-200 text-blue-700',
  21: 'bg-blue-50 border-blue-200 text-blue-700',
};

const shiftLabels: Record<number, string> = {
  4: 'Morning',
  8: 'Morning',
  12: 'Full Day',
  16: 'Morning',
  20: 'Evening',
  7: 'Off Duty',
  14: 'Off Duty',
  21: 'Off Duty',
};

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Schedule() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9); // October
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  };

  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Master Schedule</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your monthly availability and shifts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <button
            onClick={next}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 transition-colors shadow-sm"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col overflow-hidden">
        {/* Month Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">{months[month]} {year}</h2>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span> Active Shift
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span> Off Duty
            </span>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {DAYS.map(d => (
            <div key={d} className="py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1">
          {cells.map((day, idx) => {
            const hasShift = day !== null && activeDots.has(day);
            const isToday = isCurrentMonth && day === todayDate;
            const isSelected = day === selectedDay;
            const shiftColor = day !== null ? shiftColors[day] : '';
            const shiftLabel = day !== null ? shiftLabels[day] : '';

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                className={`border-b border-r border-slate-50 p-2 flex flex-col items-center min-h-[80px] cursor-pointer transition-all duration-150
                  ${day ? 'hover:bg-slate-50' : 'bg-slate-50/30'}
                  ${isSelected ? 'bg-teal-50/60' : ''}
                `}
              >
                {day && (
                  <>
                    <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                      ${isToday ? 'bg-teal-500 text-white font-bold' : isSelected ? 'text-teal-600 font-semibold' : 'text-slate-700'}`}>
                      {day}
                    </span>
                    {hasShift && (
                      <div className="mt-1.5 w-full flex flex-col items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${shiftColor.includes('teal') ? 'bg-teal-500' : 'bg-blue-400'}`} />
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md border ${shiftColor}`}>
                          {shiftLabel}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">{months[month]} {selectedDay}, {year}</p>
            <p className="text-sm text-slate-500 mt-0.5">
              {activeDots.has(selectedDay)
                ? `Shift: ${shiftLabels[selectedDay]} — 08:00 AM to ${shiftLabels[selectedDay] === 'Full Day' ? '06:00 PM' : shiftLabels[selectedDay] === 'Evening' ? '10:00 PM' : '01:00 PM'}`
                : 'No scheduled shifts for this day.'}
            </p>
          </div>
          {activeDots.has(selectedDay) && (
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${shiftColors[selectedDay]}`}>
              {shiftLabels[selectedDay]}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
