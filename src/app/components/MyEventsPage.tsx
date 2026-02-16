import { Ticket } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025, 7:00 PM',
      venue: 'Hollywood Bowl',
      tickets: 4,
      image:
        'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Chris Brown: Breezy Bowl XX',
      date: 'Sun, Sept 14, 7:00pm',
      venue: 'SoFi Stadium',
      tickets: 3,
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Lady Gaga: The MAYHEM Ball',
      date: 'Thu, Sep 11, 2025, 8:00 PM',
      venue: 'Scotiabank Arena',
      tickets: 1,
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
    },
    {
      id: 4,
      title: 'Harry Styles: Together, Together.',
      date: 'Sat, Sep 05, 2026, 8:00 PM',
      venue: 'Madison Square Garden',
      tickets: 2,
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
    },
  ];

  const pastEvents: typeof upcomingEvents = [];

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-tm-bg flex flex-col">
      {/* Header - ticketmaster logo matching real TM app */}
      <header className="bg-tm-surface px-4 pt-3 pb-0">
        <div className="flex items-center justify-between mb-3">
          {/* Ticketmaster logo */}
          <div className="flex items-center gap-1.5">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontStyle: 'italic',
                color: 'var(--tm-blue)',
              }}
            >
              ticketmaster
            </span>
            <span className="text-xs align-top" style={{ color: 'var(--tm-blue)', fontFamily: 'serif' }}>
              {'®'}
            </span>
            {/* US Flag icon */}
            <div className="w-5 h-5 rounded-full overflow-hidden ml-0.5 flex-shrink-0 border border-tm-border">
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
          <button className="text-tm-text-primary text-base font-medium">Help</button>
        </div>
      </header>

      {/* Tabs - Upcoming / Past with blue indicator bar */}
      <div className="bg-tm-surface border-b border-tm-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('upcoming')}
            className="flex-1 relative py-3 text-center"
          >
            <span
              className={`text-base font-semibold ${
                activeTab === 'upcoming' ? 'text-tm-text-primary' : 'text-tm-text-muted'
              }`}
            >
              Upcoming
            </span>
            {activeTab === 'upcoming' && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-tm-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className="flex-1 relative py-3 text-center"
          >
            <span
              className={`text-base font-semibold ${
                activeTab === 'past' ? 'text-tm-text-primary' : 'text-tm-text-muted'
              }`}
            >
              Past
            </span>
            {activeTab === 'past' && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-tm-blue" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24 bg-tm-bg">
        {events.length > 0 ? (
          <div className="flex flex-col gap-4 p-4">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => navigate(`/my-tickets/${event.id}`)}
                className="relative rounded-2xl overflow-hidden w-full text-left"
                style={{ boxShadow: '0 1px 8px var(--tm-card-overlay)' }}
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
                      {event.tickets} {event.tickets === 1 ? 'ticket' : 'tickets'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <Ticket size={48} className="text-tm-text-muted mb-4" />
            <p className="text-tm-text-secondary text-base font-medium">No past events</p>
            <p className="text-tm-text-muted text-sm mt-1">
              Events you've attended will show up here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
