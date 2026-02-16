import { Search, Heart, Ticket, Tag, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: 'Beyonce live',
      date: 'Mon dec 12 10am',
      venue: 'PETCO park',
      tickets: 1,
      image:
        'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Chris brown: Breezy Bowl XX',
      date: 'Wed, sep 24, 2025, 7:00 PM',
      venue: 'Coors field',
      tickets: 3,
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const pastEvents: typeof upcomingEvents = [];

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - White background with ticketmaster logo, matching real TM app */}
      <header className="bg-white px-4 pt-3 pb-0">
        <div className="flex items-center justify-between mb-3">
          {/* Ticketmaster logo */}
          <div className="flex items-center gap-1.5">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontStyle: 'italic',
                color: '#026CDF',
              }}
            >
              ticketmaster
            </span>
            <span className="text-xs align-top" style={{ color: '#026CDF', fontFamily: 'serif' }}>
              {'®'}
            </span>
            {/* US Flag icon */}
            <div className="w-5 h-5 rounded-full overflow-hidden ml-0.5 flex-shrink-0 border border-gray-200">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <rect width="32" height="32" fill="#B22234" />
                <rect width="32" height="2.46" y="2.46" fill="white" />
                <rect width="32" height="2.46" y="7.38" fill="white" />
                <rect width="32" height="2.46" y="12.3" fill="white" />
                <rect width="32" height="2.46" y="17.22" fill="white" />
                <rect width="32" height="2.46" y="22.14" fill="white" />
                <rect width="32" height="2.46" y="27.06" fill="white" />
                <rect width="12.8" height="17.22" fill="#3C3B6E" />
              </svg>
            </div>
          </div>
          {/* Help button */}
          <button className="text-black text-base font-medium">Help</button>
        </div>
      </header>

      {/* Tabs - Upcoming / Past with blue indicator bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('upcoming')}
            className="flex-1 relative py-3 text-center"
          >
            <span
              className={`text-base font-semibold ${
                activeTab === 'upcoming' ? 'text-black' : 'text-gray-400'
              }`}
            >
              Upcoming
            </span>
            {activeTab === 'upcoming' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                style={{ backgroundColor: '#026CDF' }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className="flex-1 relative py-3 text-center"
          >
            <span
              className={`text-base font-semibold ${
                activeTab === 'past' ? 'text-black' : 'text-gray-400'
              }`}
            >
              Past
            </span>
            {activeTab === 'past' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                style={{ backgroundColor: '#026CDF' }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24 bg-gray-50">
        {events.length > 0 ? (
          <div className="flex flex-col gap-4 p-4">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => navigate(`/my-tickets/${event.id}`)}
                className="relative rounded-2xl overflow-hidden w-full text-left shadow-sm"
                style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.1)' }}
              >
                {/* Event image - tall card */}
                <div className="relative" style={{ height: '260px' }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Event info overlaid at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                    <h3 className="text-white text-lg font-bold leading-snug mb-1">
                      {event.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {event.date} {'\u00B7'} {event.venue}
                    </p>
                    <p className="text-white/80 text-sm mt-0.5">
                      {event.tickets} {event.tickets === 1 ? 'tickets' : 'tickets'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <Ticket size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-base font-medium">No past events</p>
            <p className="text-gray-400 text-sm mt-1">
              Events you've attended will show up here
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation - white bg matching real TM app */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pt-2 pb-1">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-0.5 py-1 min-w-[60px]"
          >
            <Search size={22} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">Discover</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 py-1 min-w-[60px]">
            <Heart size={22} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">For You</span>
          </button>
          <button
            onClick={() => navigate('/my-events')}
            className="flex flex-col items-center gap-0.5 py-1 min-w-[60px]"
          >
            {/* My Events icon - matches TM's ticket/envelope style icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#026CDF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 10h20" />
              <path d="M12 4v6" />
            </svg>
            <span className="text-[10px] font-semibold" style={{ color: '#026CDF' }}>
              My Events
            </span>
          </button>
          <button className="flex flex-col items-center gap-0.5 py-1 min-w-[60px]">
            <Tag size={22} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">Sell</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 py-1 min-w-[60px]">
            <User size={22} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">My Account</span>
          </button>
        </div>
        {/* Home Indicator */}
        <div className="flex justify-center mt-1 pb-1">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </nav>
    </div>
  );
}
