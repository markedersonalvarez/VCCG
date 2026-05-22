import { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  BarChart3,
  MessageSquare,
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Clock,
  Users,
  TrendingUp,
  Star,
  ChevronRight,
  Activity,
  Bell,
  Zap,
} from 'lucide-react';

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = ['Features', 'Pricing', 'About', 'Blog'];

const FEATURES = [
  {
    icon: Calendar,
    title: 'Master Scheduling',
    desc: 'Drag-and-drop shift management. Instantly see who is on call, manage time-offs, and automatically detect scheduling conflicts before they happen.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: BarChart3,
    title: 'Patient Analytics',
    desc: 'Track revenue, monitor daily visitor volume, and analyze clinic performance with beautiful, real-time charts directly on your dashboard.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: MessageSquare,
    title: 'Secure Messaging',
    desc: 'Communicate with nurses, admins, and other doctors securely. Request shift covers instantly without ever leaving the application.',
    color: 'bg-amber-50 text-amber-600',
  },
];

const STATS = [
  { value: '98%', label: 'Less Shift Conflicts' },
  { value: '3 hrs', label: 'Saved Per Week' },
  { value: '1M+', label: 'Shifts Managed' },
  { value: '24/7', label: 'Support Access' },
];

const PLANS = [
  {
    name: 'Starter',
    price: 49,
    desc: 'Perfect for small clinics just getting started.',
    features: [
      'Up to 10 staff members',
      'Basic shift scheduling',
      'Patient volume tracking',
      'Email support',
      '7-day data history',
    ],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Professional',
    price: 129,
    desc: 'Everything a growing clinic needs to thrive.',
    features: [
      'Up to 50 staff members',
      'Drag-and-drop scheduling',
      'Full analytics dashboard',
      'Secure in-app messaging',
      'Conflict auto-detection',
      'Priority email & chat support',
      '1-year data history',
    ],
    cta: 'Start free trial',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 299,
    desc: 'Advanced tooling for large hospitals and networks.',
    features: [
      'Unlimited staff members',
      'Multi-location support',
      'Custom analytics & exports',
      'HIPAA audit logs',
      'SSO & advanced permissions',
      'Dedicated account manager',
      'Unlimited data history',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    name: 'Dr. Sarah Jenkins',
    role: "Chief of Medicine, St. Luke's Hospital",
    avatar: 'https://i.pravatar.cc/80?img=47',
    quote: "CareSync eliminated the endless scheduling email chains. Our team coordination improved overnight. I can't imagine going back to spreadsheets.",
    stars: 5,
  },
  {
    name: 'Nicholas Miller',
    role: 'Head Nurse, Riverside Clinic',
    avatar: 'https://i.pravatar.cc/80?img=11',
    quote: 'The shift conflict detection alone has saved us from dozens of headaches every month. The messaging feature keeps our team in sync all day.',
    stars: 5,
  },
  {
    name: 'Dr. Aisha Patel',
    role: 'Medical Director, CityHealth Network',
    avatar: 'https://i.pravatar.cc/80?img=20',
    quote: 'Rolling out CareSync across 3 locations was seamless. The analytics give me real insight into operations I never had before.',
    stars: 5,
  },
];

const AVATARS = [
  'https://i.pravatar.cc/100?img=1',
  'https://i.pravatar.cc/100?img=2',
  'https://i.pravatar.cc/100?img=3',
  'https://i.pravatar.cc/100?img=4',
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const price = (base: number) =>
    billing === 'annual' ? Math.round(base * 0.8) : base;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Nav */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur shadow-sm border-b border-slate-100' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-xl text-sky-600">
            <Activity className="w-6 h-6" />
            CareSync
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">
              Log in
            </button>
            <button className="text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors shadow-sm">
              Get started free
            </button>
          </div>

          <button
            className="md:hidden text-slate-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium text-slate-700"
                onClick={() => setMobileOpen(false)}
              >
                {l}
              </a>
            ))}
            <button className="w-full text-sm font-semibold bg-sky-600 text-white px-5 py-2.5 rounded-lg mt-2">
              Get started free
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e0f2fe 1px, transparent 1px), linear-gradient(to bottom, #e0f2fe 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center w-full">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            Now with AI-powered conflict detection
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.08] tracking-tight max-w-4xl mb-6">
            Medical scheduling,{' '}
            <span className="text-sky-600">beautifully</span> simple.
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
            Eliminate shift conflicts, reduce patient wait times, and get powerful analytics.
            CareSync is the all-in-one rostering dashboard built for modern clinics and hospitals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <button className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5">
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-3.5 rounded-xl transition-all shadow-sm">
              Watch demo
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                Joined by <span className="font-semibold text-slate-700">2,000+</span> medical professionals
              </p>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-20 w-full max-w-5xl mx-auto relative">
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400">
                  app.caresync.health/dashboard
                </div>
              </div>

              {/* Mock dashboard content */}
              <div className="p-6 bg-slate-50 grid grid-cols-3 gap-4">
                {/* Sidebar */}
                <div className="col-span-1 bg-white rounded-xl border border-slate-100 p-4 flex flex-col gap-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Today's Roster</div>
                  {[
                    { name: 'Nicholas Miller', time: '08:00 – 16:00', avatar: 'https://i.pravatar.cc/40?img=11', status: 'on-shift' },
                    { name: 'Dr. Sarah Jenkins', time: '10:00 – 18:00', avatar: 'https://i.pravatar.cc/40?img=47', status: 'on-call' },
                    { name: 'Dr. Aisha Patel', time: '14:00 – 22:00', avatar: 'https://i.pravatar.cc/40?img=20', status: 'upcoming' },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center gap-3">
                      <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 truncate">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.time}</p>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          s.status === 'on-shift'
                            ? 'bg-emerald-50 text-emerald-600'
                            : s.status === 'on-call'
                            ? 'bg-sky-50 text-sky-600'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {s.status === 'on-shift' ? 'On Shift' : s.status === 'on-call' ? 'On Call' : 'Upcoming'}
                      </span>
                    </div>
                  ))}

                  <div className="mt-2 pt-3 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</div>
                    <div className="bg-sky-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-slate-700">Dr. Sarah Jenkins</p>
                      <p className="text-xs text-slate-500 mt-0.5">Can you cover my 10 AM?</p>
                    </div>
                  </div>
                </div>

                {/* Main area */}
                <div className="col-span-2 flex flex-col gap-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Total Patients', value: '182', change: '+12% this week', icon: Users, color: 'text-sky-600 bg-sky-50' },
                      { label: 'Avg. Wait Time', value: '14 min', change: '-3 min vs last week', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
                      { label: 'Shifts Today', value: '8', change: '2 open slots', icon: Calendar, color: 'text-amber-600 bg-amber-50' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-xl border border-slate-100 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-slate-400">{stat.label}</p>
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-4 h-4" />
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                        <p className="text-xs text-emerald-500 mt-0.5 font-medium">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div className="bg-white rounded-xl border border-slate-100 p-4 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold text-slate-700">Patient Volume — This Week</p>
                      <span className="text-xs text-sky-600 font-medium flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +8.2%
                      </span>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t-md bg-sky-100 flex items-end"
                            style={{ height: '96px' }}
                          >
                            <div
                              className="w-full rounded-t-md bg-sky-500"
                              style={{ height: `${h}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute right-4 -bottom-4 bg-white rounded-xl shadow-xl border border-slate-100 p-3 hidden lg:flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-emerald-600" />
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-xs">Conflict resolved</p>
                <p className="text-slate-400 text-xs">Thursday 2 PM shift covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-slate-100 bg-slate-50/60 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by innovative healthcare providers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {["St. Luke's Health", 'Riverside Medical', 'CityHealth Network', 'Summit Clinic', 'MedFirst Group'].map((name) => (
              <span key={name} className="text-slate-700 font-bold text-sm tracking-wide">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">Why CareSync?</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              Everything you need to run<br className="hidden md:block" /> your clinic smoothly.
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Replace messy spreadsheets and fragmented group chats with a single, unified platform designed specifically for medical teams.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <AnimatedSection key={f.title}>
                <div
                  className="group bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.color} mb-5`}>
                    <f.icon className="w-6 h-6" />
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Scale section */}
      <section className="py-28 bg-slate-900 text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Built for scale.{' '}
              <span className="text-sky-400">Designed for humans.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              We understand that medical environments are high-stress. That's why we engineered an interface that requires zero training. It just works.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <AnimatedSection>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex gap-4 h-full">
                <span className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-sky-400" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">HIPAA Compliant Infrastructure</h3>
                  <p className="text-slate-400 leading-relaxed">Enterprise-grade security keeps your patient data safe with end-to-end encryption, access logs, and annual audits.</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex gap-4 h-full">
                <span className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Cross-Device Synchronization</h3>
                  <p className="text-slate-400 leading-relaxed">Start on your desktop, update on your phone. Changes sync in real-time across every device on your team.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <AnimatedSection key={s.label}>
                <div style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="text-4xl md:text-5xl font-extrabold text-sky-400 mb-2">{s.value}</div>
                  <div className="text-slate-400 text-sm font-medium">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Loved by medical teams.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.name}>
                <div
                  className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6 italic flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              Simple, transparent pricing.
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto mb-8">
              No hidden fees. Start free for 14 days, then choose the plan that fits your team.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  billing === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  billing === 'annual' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Annual
                <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {PLANS.map((plan, i) => (
              <AnimatedSection key={plan.name}>
                <div
                  className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-sky-600 border-sky-600 text-white shadow-2xl shadow-sky-200 md:scale-105'
                      : 'bg-white border-slate-200 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-800'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.highlight ? 'text-sky-100' : 'text-slate-500'}`}>{plan.desc}</p>
                  </div>

                  <div className="mb-8">
                    <span className={`text-5xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                      ${price(plan.price)}
                    </span>
                    <span className={`text-sm font-medium ml-1 ${plan.highlight ? 'text-sky-200' : 'text-slate-400'}`}>
                      /mo
                    </span>
                    {billing === 'annual' && (
                      <p className={`text-xs mt-1 ${plan.highlight ? 'text-sky-200' : 'text-emerald-600'}`}>
                        Billed annually (${price(plan.price) * 12}/yr)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle
                          className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-sky-200' : 'text-sky-500'}`}
                        />
                        <span className={plan.highlight ? 'text-sky-50' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      plan.highlight
                        ? 'bg-white text-sky-600 hover:bg-sky-50 shadow-md'
                        : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 text-center">
            <p className="text-sm text-slate-400">
              No credit card required &bull; 14-day free trial &bull; Cancel anytime
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-gradient-to-br from-sky-600 to-sky-700 text-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
          }}
        />
        <AnimatedSection className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">
            Ready to upgrade your clinic?
          </h2>
          <p className="text-xl text-sky-100 mb-10 max-w-xl mx-auto">
            Join thousands of healthcare professionals who have transformed their daily operations with CareSync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 font-semibold px-8 py-4 rounded-xl transition-all hover:bg-sky-50 shadow-xl hover:-translate-y-0.5">
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              Talk to sales
            </button>
          </div>
          <p className="mt-6 text-sky-200 text-sm">
            No credit card required &bull; 14-day free trial &bull; Cancel anytime
          </p>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
                <Activity className="w-5 h-5 text-sky-400" />
                CareSync
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Modernizing healthcare management one shift at a time. Built for clinics, hospitals, and medical networks worldwide.
              </p>
            </div>

            {[
              { heading: 'Product', links: ['Features', 'Pricing', 'Security', 'Changelog'] },
              { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Cookie Policy'] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="font-semibold text-white text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm hover:text-white transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2026 CareSync Technologies Inc. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
