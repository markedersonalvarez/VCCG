import { useState } from 'react';
import { Camera, Mail, Phone, Building, Shield, CheckCircle } from 'lucide-react';

export default function Profile() {
  const [form, setForm] = useState({
    email: 'andhika.p@hospital.med',
    phone: '+62 812 3456 7890',
    department: 'Cardiology Center, Floor 3',
    license: 'MED-4928-1192',
    firstName: 'Andhika',
    lastName: 'Pratama',
    specialty: 'Senior Cardiologist',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-slate-800 text-center">My Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5 text-center">Manage your personal information and credentials</p>
      </div>

      <div className="w-full max-w-xl">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Teal Header */}
          <div className="h-28 bg-gradient-to-r from-teal-500 to-teal-400 relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-12 mb-3 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Dr. Andhika Pratama"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center shadow-md hover:bg-teal-600 transition-colors border-2 border-white">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Identity */}
          <div className="text-center pb-4 px-6">
            <h2 className="text-xl font-bold text-slate-800">Dr. Andhika Pratama</h2>
            <p className="text-teal-500 text-sm font-medium mt-0.5">Senior Cardiologist</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="bg-teal-50 text-teal-600 text-xs px-2.5 py-1 rounded-full font-medium">Cardiology</span>
              <span className="bg-slate-100 text-slate-500 text-xs px-2.5 py-1 rounded-full font-medium">Active</span>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 pb-6 border-t border-slate-100 pt-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Building className="w-3.5 h-3.5" /> Department
                </label>
                <input
                  type="text"
                  value={form.department}
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Shield className="w-3.5 h-3.5" /> License No.
                </label>
                <input
                  type="text"
                  value={form.license}
                  onChange={e => setForm({ ...form, license: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={handleSave}
                className={`px-8 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300
                  ${saved
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                    : 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:-translate-y-0.5'
                  }`}
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Saved Successfully
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Patients Treated', value: '1,492' },
            { label: 'Years Experience', value: '12' },
            { label: 'Avg. Rating', value: '4.9' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
