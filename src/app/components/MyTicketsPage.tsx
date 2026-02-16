import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

interface TicketData {
  ticketType: string;
  section: string;
  row: string;
  seat: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  image: string;
  levelView: string;
}

export default function MyTicketsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);

  // Each event can have multiple tickets (seats)
  const eventTickets: Record<string, TicketData[]> = {
    '1': [
      {
        ticketType: 'Artist Presale',
        section: 'D',
        row: '7',
        seat: '1',
        title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
        date: 'Sat, Nov 8, 2025',
        time: '7:00 PM',
        venue: 'Hollywood Bowl',
        location: 'Hollywood, CA',
        image: 'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        levelView: 'Verified Fan Seller',
      },
      {
        ticketType: 'Artist Presale',
        section: 'D',
        row: '7',
        seat: '2',
        title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
        date: 'Sat, Nov 8, 2025',
        time: '7:00 PM',
        venue: 'Hollywood Bowl',
        location: 'Hollywood, CA',
        image: 'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        levelView: 'Verified Fan Seller',
      },
      {
        ticketType: 'Artist Presale',
        section: 'D',
        row: '7',
        seat: '3',
        title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
        date: 'Sat, Nov 8, 2025',
        time: '7:00 PM',
        venue: 'Hollywood Bowl',
        location: 'Hollywood, CA',
        image: 'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        levelView: 'Verified Fan Seller',
      },
      {
        ticketType: 'Artist Presale',
        section: 'D',
        row: '7',
        seat: '4',
        title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
        date: 'Sat, Nov 8, 2025',
        time: '7:00 PM',
        venue: 'Hollywood Bowl',
        location: 'Hollywood, CA',
        image: 'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        levelView: 'Verified Fan Seller',
      },
    ],
    '2': [
      {
        ticketType: 'Verified Resale Ticket',
        section: '114',
        row: '25',
        seat: '3',
        title: 'Chris brown: Breezy Bowl XX',
        date: 'Wed, sep 24, 2025',
        time: '7:00 PM',
        venue: 'Coors field',
        location: '',
        image: 'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        levelView: 'Lower level',
      },
      {
        ticketType: 'Verified Resale Ticket',
        section: '114',
        row: '25',
        seat: '4',
        title: 'Chris brown: Breezy Bowl XX',
        date: 'Wed, sep 24, 2025',
        time: '7:00 PM',
        venue: 'Coors field',
        location: '',
        image: 'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        levelView: 'Lower level',
      },
      {
        ticketType: 'Verified Resale Ticket',
        section: '114',
        row: '25',
        seat: '5',
        title: 'Chris brown: Breezy Bowl XX',
        date: 'Wed, sep 24, 2025',
        time: '7:00 PM',
        venue: 'Coors field',
        location: '',
        image: 'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        levelView: 'Lower level',
      },
    ],
  };

  const tickets = eventTickets[eventId || '2'] || eventTickets['2'];

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveTicketIndex(Math.min(index, tickets.length - 1));
  }, [tickets.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTicket = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  const currentTicket = tickets[activeTicketIndex];

  return (
    <div className="min-h-screen flex flex-col bg-tm-surface-alt">
      {/* Header - adapts to dark/light mode */}
      <header className="flex items-center justify-between px-4 bg-tm-surface-alt py-3">
        <button
          onClick={() => navigate(-1)}
          className="text-tm-text-primary p-1"
          aria-label="Close"
        >
          <X size={22} strokeWidth={2.5} />
        </button>
        <h1 className="text-tm-text-primary text-lg font-bold tracking-tight">My Tickets</h1>
        <button className="text-tm-text-primary text-base font-medium">Help</button>
      </header>

      {/* Thin blue accent line under header */}
      <div className="w-full h-[2px]" style={{ backgroundColor: '#0060FF' }} />

      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto bg-tm-surface-alt">
        <div className="px-4 pt-5 pb-4">
          {/* Horizontal ticket carousel */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-center"
              >
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          {tickets.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {tickets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToTicket(index)}
                  className="w-2 h-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: index === activeTicketIndex ? '#0060FF' : '#6B7280',
                  }}
                  aria-label={`Go to ticket ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Transfer / Sell buttons */}
        <div className="px-5 pb-6 pt-2 flex gap-3">
          <button
            className="flex-1 py-3.5 rounded-lg font-bold text-base text-white"
            style={{ backgroundColor: '#0060FF' }}
          >
            Transfer
          </button>
          <button
            className="flex-1 py-3.5 rounded-lg font-bold text-base"
            style={{ backgroundColor: '#C4C4C4', color: '#888888' }}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-2 pt-1 bg-tm-surface-alt">
        <div className="w-32 h-1 rounded-full bg-tm-text-muted/40" />
      </div>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: TicketData }) {
  const venueDisplay = ticket.location
    ? `${ticket.venue}\n${ticket.location}`
    : `${ticket.venue}`;

  return (
    <div
      className="rounded-2xl overflow-hidden mx-1"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
    >
      {/* Ticket Type Badge */}
      <div
        className="py-2.5 text-center"
        style={{ backgroundColor: '#0060FF' }}
      >
        <span className="text-white text-sm font-semibold tracking-wide">
          {ticket.ticketType}
        </span>
      </div>

      {/* Section / Row / Seat */}
      <div
        className="flex items-center justify-around py-5 px-4"
        style={{ backgroundColor: '#0060FF' }}
      >
        <div className="text-center flex-1">
          <div className="text-xs font-medium tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
            SEC
          </div>
          <div className="text-white text-4xl font-bold leading-none">{ticket.section}</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-xs font-medium tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
            ROW
          </div>
          <div className="text-white text-4xl font-bold leading-none">{ticket.row}</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-xs font-medium tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
            SEAT
          </div>
          <div className="text-white text-4xl font-bold leading-none">{ticket.seat}</div>
        </div>
      </div>

      {/* Event Image with overlay text */}
      <div className="relative" style={{ height: '220px' }}>
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center">
          <h2 className="text-white text-xl font-bold mb-2 leading-tight">
            {ticket.title}
          </h2>
          <p className="text-white text-sm leading-snug">
            {ticket.date}, {ticket.time} {'\u00B7'} {venueDisplay.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Level / Seller label */}
      <div className="bg-white px-4 pt-4 pb-3 text-center">
        <p className="text-black text-base font-medium">{ticket.levelView}</p>
      </div>

      {/* Add to Apple Wallet */}
      <div className="bg-white px-5 pb-4">
        <button className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5">
          <AppleWalletIcon />
          Add to Apple Wallet
        </button>
      </div>

      {/* View Barcode + Ticket Details */}
      <div className="bg-white px-4 pb-4 flex items-center justify-center gap-10">
        <button className="text-sm font-semibold underline" style={{ color: '#0060FF' }}>
          View Barcode
        </button>
        <button className="text-sm font-semibold underline" style={{ color: '#0060FF' }}>
          Ticket Details
        </button>
      </div>

      {/* ticketmaster.verified badge */}
      <div className="bg-white px-5 pb-5">
        <div
          className="py-3 rounded-xl flex items-center justify-center gap-2"
          style={{ backgroundColor: '#0060FF' }}
        >
          <VerifiedIcon />
          <span className="text-white text-sm font-medium">ticketmaster.verified</span>
        </div>
      </div>
    </div>
  );
}

function AppleWalletIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="26" height="18" rx="3" fill="#1A1A1A" stroke="#333" strokeWidth="0.5"/>
      <rect x="3" y="3" width="22" height="4" rx="1" fill="#FF3B30"/>
      <rect x="3" y="7.5" width="22" height="4" rx="1" fill="#FF9500"/>
      <rect x="3" y="12" width="22" height="4" rx="1" fill="#34C759"/>
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0L11.1 2.4L14.1 1.8L14.4 4.8L17.1 6.3L15.6 9L17.1 11.7L14.4 13.2L14.1 16.2L11.1 15.6L9 18L6.9 15.6L3.9 16.2L3.6 13.2L0.9 11.7L2.4 9L0.9 6.3L3.6 4.8L3.9 1.8L6.9 2.4L9 0Z"
        fill="white"
      />
      <path
        d="M6 9L8 11L12 7"
        stroke="#0060FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
