import { Search, Heart, Ticket, Camera, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      date: 'SAT - NOV 8, 2025 - 7:00 PM',
      title: 'JUNIOR H - $AD BOYZ LIVE & BROKEN TOUR',
      venue: 'Hollywood Bowl, Hollywood, CA',
      image: 'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tickets: 4,
    },
    {
      id: 2,
      date: 'WED - SEP 24, 2025 - 7:00 PM',
      title: 'CHRIS BROWN: BREEZY BOWL XX',
      venue: 'Coors Field, Denver, CO',
      image: 'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tickets: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-white text-lg font-semibold">My Events</span>
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <rect width="32" height="32" fill="#B22234"/>
                <rect width="32" height="2.46" y="0" fill="white"/>
                <rect width="32" height="2.46" y="4.92" fill="white"/>
                <rect width="32" height="2.46" y="9.84" fill="white"/>
                <rect width="32" height="2.46" y="14.76" fill="white"/>
                <rect width="32" height="2.46" y="19.68" fill="white"/>
                <rect width="32" height="2.46" y="24.6" fill="white"/>
                <rect width="32" height="2.46" y="29.54" fill="white"/>
                <rect width="12.8" height="17.38" fill="#3C3B6E"/>
              </svg>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <button className="text-white text-sm">Help</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 text-sm font-semibold tracking-wide relative ${
              activeTab === 'upcoming' ? 'text-white' : 'text-gray-500'
            }`}
          >
            UPCOMING ({upcomingEvents.length})
            {activeTab === 'upcoming' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 text-sm font-semibold tracking-wide relative ${
              activeTab === 'past' ? 'text-white' : 'text-gray-500'
            }`}
          >
            PAST (0)
            {activeTab === 'past' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => navigate(`/my-tickets/${event.id}`)}
                className="relative rounded-lg overflow-hidden w-full text-left"
              >
                <div className="relative h-96">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-xs font-semibold uppercase tracking-wide mb-3">
                      {event.date}
                    </p>
                    <h3 className="text-white text-xl font-bold mb-3 leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm">{event.venue}</p>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-gray-400"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="12"
                            height="12"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M2 6h12M6 2v4M10 2v4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>x{event.tickets}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-center">No past events</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-6 py-2">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Search size={24} />
            <span className="text-xs">Discover</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Heart size={24} />
            <span className="text-xs">Favourites</span>
          </button>
          <button
            onClick={() => navigate('/my-events')}
            className="flex flex-col items-center gap-1 text-blue-500"
          >
            <Ticket size={24} />
            <span className="text-xs">My Events</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Camera size={24} />
            <span className="text-xs">Sell</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <User size={24} />
            <span className="text-xs">My Account</span>
          </button>
        </div>
        {/* Home Indicator */}
        <div className="flex justify-center mt-1">
          <div className="w-32 h-1 bg-white rounded-full opacity-30"></div>
        </div>
      </nav>
    </div>
  );
}
