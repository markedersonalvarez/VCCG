import { useState } from 'react';
import { Search, Paperclip, Send, Circle } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online: boolean;
  initials: string;
  color: string;
}

interface Message {
  id: number;
  contactId: number;
  text: string;
  fromMe: boolean;
  time: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    role: 'Endocrinologist',
    lastMessage: 'The patient labs came back — all markers look within normal range.',
    time: '9:42 AM',
    online: true,
    initials: 'SJ',
    color: 'bg-teal-500',
  },
  {
    id: 2,
    name: 'Nurse Ratched',
    role: 'Head Nurse, Ward 3',
    lastMessage: 'Room 12B patient is requesting a follow-up this afternoon.',
    time: '8:15 AM',
    unread: 2,
    online: false,
    initials: 'NR',
    color: 'bg-rose-500',
  },
  {
    id: 3,
    name: 'Admin Office',
    role: 'Hospital Administration',
    lastMessage: 'Reminder: Q4 performance review scheduled for Friday.',
    time: 'Yesterday',
    online: false,
    initials: 'AO',
    color: 'bg-slate-500',
  },
  {
    id: 4,
    name: 'Dr. Marcus Chen',
    role: 'Radiologist',
    lastMessage: 'Scan results have been uploaded to patient #4492 chart.',
    time: 'Yesterday',
    online: true,
    initials: 'MC',
    color: 'bg-blue-500',
  },
  {
    id: 5,
    name: 'Pharmacy Dept.',
    role: 'Medication & Prescriptions',
    lastMessage: 'Prescription #8821 has been filled and is ready for pickup.',
    time: 'Mon',
    online: false,
    initials: 'PH',
    color: 'bg-amber-500',
  },
];

const messages: Message[] = [
  {
    id: 1,
    contactId: 1,
    text: 'Good morning, Dr. Andhika! I reviewed the cardio panel for Mr. Amazon. His troponin levels are slightly elevated.',
    fromMe: false,
    time: '9:10 AM',
  },
  {
    id: 2,
    contactId: 1,
    text: 'Thank you for the heads up, Sarah. I already ordered a repeat ECG for 11 AM. Should we also request an echo?',
    fromMe: true,
    time: '9:15 AM',
  },
  {
    id: 3,
    contactId: 1,
    text: 'Yes, an echocardiogram would be very helpful. I can coordinate with cardio imaging. Do you want me to add the order?',
    fromMe: false,
    time: '9:18 AM',
  },
  {
    id: 4,
    contactId: 1,
    text: "Please go ahead. Also, let's schedule a joint review at 2 PM today if you're free.",
    fromMe: true,
    time: '9:22 AM',
  },
  {
    id: 5,
    contactId: 1,
    text: 'The patient labs came back — all markers look within normal range.',
    fromMe: false,
    time: '9:42 AM',
  },
];

export default function Messages() {
  const [activeContact, setActiveContact] = useState(1);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentContact = contacts.find(c => c.id === activeContact);
  const chat = messages.filter(m => m.contactId === activeContact);

  return (
    <div className="flex gap-5 h-full">
      {/* Chat List */}
      <div className="w-80 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-lg mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search chats..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl text-sm text-slate-700 placeholder-slate-400 border border-transparent focus:border-teal-300 focus:outline-none focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map(contact => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact.id)}
              className={`w-full p-4 flex items-start gap-3 text-left transition-colors border-b border-slate-50 last:border-0
                ${activeContact === contact.id ? 'bg-teal-50' : 'hover:bg-slate-50'}`}
            >
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {contact.initials}
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold truncate ${activeContact === contact.id ? 'text-teal-700' : 'text-slate-800'}`}>
                    {contact.name}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">{contact.time}</span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{contact.role}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[11px] text-slate-500 truncate">{contact.lastMessage}</p>
                  {contact.unread && (
                    <span className="ml-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {currentContact && (
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${currentContact.color} flex items-center justify-center text-white text-sm font-bold`}>
                {currentContact.initials}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{currentContact.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Circle className={`w-2 h-2 fill-current ${currentContact.online ? 'text-emerald-400' : 'text-slate-300'}`} />
                  <span className={`text-xs ${currentContact.online ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {currentContact.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400">{currentContact.role}</p>
          </div>

          {/* Chat Bubbles */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
            {chat.map(msg => (
              <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
                {!msg.fromMe && (
                  <div className={`w-7 h-7 rounded-full ${currentContact.color} flex items-center justify-center text-white text-[10px] font-bold mr-2 self-end shrink-0`}>
                    {currentContact.initials}
                  </div>
                )}
                <div className={`max-w-[70%] flex flex-col ${msg.fromMe ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${msg.fromMe
                      ? 'bg-teal-500 text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                    }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-slate-100">
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2 border border-transparent focus-within:border-teal-300 focus-within:bg-white transition-all">
              <button className="text-slate-400 hover:text-teal-500 transition-colors shrink-0">
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') setInput(''); }}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setInput('')}
                className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
