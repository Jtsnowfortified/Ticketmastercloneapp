import { X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export default function MyTicketsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  // Event data based on eventId
  const eventData: Record<string, any> = {
    '2': {
      section: '114',
      row: '25',
      seat: '3',
      title: 'Harry Styles: Together, Together',
      date: 'Wed, Sep 24, 2025',
      time: '7:00 PM',
      venue: 'Madison Square Garden',
      image: 'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelView: 'Lower level',
    },
    '1': {
      section: '114',
      row: '25',
      seat: '3',
      title: 'Ariana Grande - The Eternal Sunshine Tour',
      date: 'Wed, Sep 24, 2025',
      time: '7:00 PM',
      venue: 'TD Garden',
      image: 'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelView: 'Lower level',
    },
    default: {
      section: '114',
      row: '25',
      seat: '3',
      title: 'Harry Styles: Together, Together',
      date: 'Wed, Sep 24, 2025',
      time: '7:00 PM',
      venue: 'Madison Square Garden',
      image: 'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelView: 'Lower level',
    },
  };

  const event = eventData[eventId || 'default'] || eventData.default;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-black px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-white">
          <X size={24} />
        </button>
        <h1 className="text-white text-lg font-bold">My Tickets</h1>
        <button className="text-white text-base">Help</button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white px-4 pt-6 pb-4">
        {/* Ticket Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          {/* Verified Resale Ticket Badge */}
          <div className="bg-[#0060FF] px-4 py-3 text-center">
            <span className="text-white text-base font-medium">Verified Resale Ticket</span>
          </div>

          {/* Seat Information */}
          <div className="bg-[#0060FF] px-4 py-6 flex items-center justify-around">
            <div className="text-center flex-1">
              <div className="text-white/60 text-xs font-normal mb-1 tracking-wide">SEC</div>
              <div className="text-white text-4xl font-bold">{event.section}</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-white/60 text-xs font-normal mb-1 tracking-wide">ROW</div>
              <div className="text-white text-4xl font-bold">{event.row}</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-white/60 text-xs font-normal mb-1 tracking-wide">SEAT</div>
              <div className="text-white text-4xl font-bold">{event.seat}</div>
            </div>
          </div>

          {/* Event Image */}
          <div className="relative h-64">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center">
              <h2 className="text-white text-2xl font-bold mb-2 leading-tight">{event.title}</h2>
              <p className="text-white text-sm">{event.date}, {event.time} • {event.venue}</p>
            </div>
          </div>

          {/* Lower Level Label */}
          <div className="px-4 py-5 text-center">
            <p className="text-black text-lg font-medium">{event.levelView}</p>
          </div>

          {/* Add to Apple Wallet Button */}
          <div className="px-4 pb-5">
            <button className="w-full bg-black text-white py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2">
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                <rect x="2" y="4" width="20" height="12" rx="2" fill="#FFD700" stroke="white" strokeWidth="1.5" />
                <rect x="4" y="6" width="6" height="4" rx="0.5" fill="#FFB800" />
                <rect x="11" y="6" width="9" height="1.5" rx="0.5" fill="white" />
                <rect x="11" y="8.5" width="7" height="1.5" rx="0.5" fill="white" />
              </svg>
              Add to Apple Wallet
            </button>
          </div>

          {/* View Barcode and Ticket Details Links */}
          <div className="px-4 pb-5 flex items-center justify-center gap-8">
            <button className="text-[#0060FF] text-sm font-semibold underline">
              View Barcode
            </button>
            <button className="text-gray-600 text-sm font-semibold underline">
              Ticket Details
            </button>
          </div>

          {/* ticketmaster.verified Badge */}
          <div className="px-4 pb-5">
            <div className="bg-[#0060FF] py-3 rounded-xl flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2" fill="none" />
                <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white text-sm font-medium">ticketmaster.Verified</span>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 pb-6">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-[#0060FF]"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 px-2">
          <button className="flex-1 bg-[#0060FF] text-white py-3.5 rounded-xl font-bold text-base">
            Transfer
          </button>
          <button className="flex-1 bg-gray-300 text-white py-3.5 rounded-xl font-bold text-base">
            Sell
          </button>
        </div>

        {/* Map Preview */}
        <div className="mt-6 h-64 rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div className="w-full h-full relative">
            <img
              src="https://images.unsplash.com/photo-1744914918310-5fd8ac75ce18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb29ycyUyMEZpZWxkJTIwc3RhZGl1bSUyMG1hcCUyMERlbnZlciUyMGFlcmlhbHxlbnwxfHx8fDE3NzExODk1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Map"
              className="w-full h-full object-cover"
            />
            {/* Map pin overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="bg-red-500 w-12 h-12 rounded-full border-4 border-white shadow-xl"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
              </div>
            </div>
            {/* Venue label */}
            <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold">
              {event.venue}
            </div>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="bg-white flex justify-center py-2">
        <div className="w-32 h-1 bg-black rounded-full opacity-40"></div>
      </div>
    </div>
  );
}