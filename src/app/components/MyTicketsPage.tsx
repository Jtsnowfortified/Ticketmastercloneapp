import { X, Info } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface TicketData {
  ticketType: string;
  section: string;
  row: string;
  seat: string;
  generalAdmission?: string; // e.g. "General Admission" replaces ROW/SEAT
  title: string;
  date: string;
  venue: string;
  image: string;
  levelLabel: string; // "Verified Fan Seller" | "Lower Level" | "Mobile" | "LOWER LEVEL"
  deliveryMethod: 'wallet' | 'view' | 'countdown'; // determines card action
  countdownTarget?: string; // ISO date for countdown
  sellActive: boolean; // whether Sell button is blue or gray
  mapQuery: string; // for static map embed
  venueName: string;
}

/* ------------------------------------------------------------------ */
/*  Mock ticket data matching the real TM screenshots                  */
/* ------------------------------------------------------------------ */
// TODO: Replace mock tickets array with real fetch from authenticated backend/user tickets API
const eventTickets: Record<string, TicketData[]> = {
  '1': [
    {
      ticketType: 'Artist Presale',
      section: 'D',
      row: '7',
      seat: '1',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025, 7:00 PM',
      venue: 'Hollywood Bowl',
      image:
        'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'Verified Fan Seller',
      deliveryMethod: 'wallet',
      sellActive: false,
      mapQuery: 'Hollywood+Bowl+Hollywood+CA',
      venueName: 'Hollywood Bowl',
    },
    {
      ticketType: 'Artist Presale',
      section: 'D',
      row: '7',
      seat: '2',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025, 7:00 PM',
      venue: 'Hollywood Bowl',
      image:
        'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'Verified Fan Seller',
      deliveryMethod: 'wallet',
      sellActive: false,
      mapQuery: 'Hollywood+Bowl+Hollywood+CA',
      venueName: 'Hollywood Bowl',
    },
    {
      ticketType: 'Artist Presale',
      section: 'D',
      row: '7',
      seat: '3',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025, 7:00 PM',
      venue: 'Hollywood Bowl',
      image:
        'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'Verified Fan Seller',
      deliveryMethod: 'wallet',
      sellActive: false,
      mapQuery: 'Hollywood+Bowl+Hollywood+CA',
      venueName: 'Hollywood Bowl',
    },
    {
      ticketType: 'Artist Presale',
      section: 'D',
      row: '7',
      seat: '4',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025, 7:00 PM',
      venue: 'Hollywood Bowl',
      image:
        'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'Verified Fan Seller',
      deliveryMethod: 'wallet',
      sellActive: false,
      mapQuery: 'Hollywood+Bowl+Hollywood+CA',
      venueName: 'Hollywood Bowl',
    },
  ],
  '2': [
    {
      ticketType: 'Standard Tickets',
      section: '124',
      row: '15',
      seat: '5',
      title: 'Chris Brown: Breezy Bowl XX',
      date: 'Sun, Sept 14, 7:00pm',
      venue: 'SoFi Stadium',
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'LOWER LEVEL',
      deliveryMethod: 'view',
      sellActive: true,
      mapQuery: 'SoFi+Stadium+Inglewood+CA',
      venueName: 'SoFi Stadium',
    },
    {
      ticketType: 'Standard Tickets',
      section: '124',
      row: '15',
      seat: '6',
      title: 'Chris Brown: Breezy Bowl XX',
      date: 'Sun, Sept 14, 7:00pm',
      venue: 'SoFi Stadium',
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'LOWER LEVEL',
      deliveryMethod: 'view',
      sellActive: true,
      mapQuery: 'SoFi+Stadium+Inglewood+CA',
      venueName: 'SoFi Stadium',
    },
    {
      ticketType: 'Standard Tickets',
      section: '124',
      row: '15',
      seat: '7',
      title: 'Chris Brown: Breezy Bowl XX',
      date: 'Sun, Sept 14, 7:00pm',
      venue: 'SoFi Stadium',
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'LOWER LEVEL',
      deliveryMethod: 'view',
      sellActive: true,
      mapQuery: 'SoFi+Stadium+Inglewood+CA',
      venueName: 'SoFi Stadium',
    },
  ],
  '3': [
    {
      ticketType: 'General Sale',
      section: '248',
      row: '11',
      seat: '18',
      title: 'Lady Gaga: The MAYHEM Ball',
      date: 'Thu, Sep 11, 2025, 8:00 PM',
      venue: 'Scotiabank Arena',
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      levelLabel: '',
      deliveryMethod: 'countdown',
      countdownTarget: new Date(Date.now() + 39 * 86400000 + 13 * 3600000).toISOString(),
      sellActive: false,
      mapQuery: 'Scotiabank+Arena+Toronto',
      venueName: 'Scotiabank Arena',
    },
  ],
  '4': [
    {
      ticketType: 'Artist Presale',
      section: '221',
      row: '13',
      seat: '21',
      title: 'Harry Styles: Together, Together.',
      date: 'Sat, Sep 05, 2026, 8:00 PM',
      venue: 'Madison Square Garden',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      levelLabel: 'Mobile',
      deliveryMethod: 'view',
      sellActive: true,
      mapQuery: 'Madison+Square+Garden+New+York',
      venueName: 'Madison Square Garden',
    },
    {
      ticketType: 'Artist Presale',
      section: '221',
      row: '13',
      seat: '22',
      title: 'Harry Styles: Together, Together.',
      date: 'Sat, Sep 05, 2026, 8:00 PM',
      venue: 'Madison Square Garden',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
      levelLabel: 'Mobile',
      deliveryMethod: 'view',
      sellActive: true,
      mapQuery: 'Madison+Square+Garden+New+York',
      venueName: 'Madison Square Garden',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Countdown Timer                                                    */
/* ------------------------------------------------------------------ */
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const calcTimeLeft = useCallback(() => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [calcTimeLeft]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="py-4 px-4 text-center">
      <p className="text-tm-text-primary text-sm font-semibold mb-3">
        {'Ticket will be ready in:'}
      </p>
      <div className="flex items-center justify-center gap-4">
        {[
          { val: timeLeft.days, label: 'DAY' },
          { val: timeLeft.hours, label: 'HOUR' },
          { val: timeLeft.minutes, label: 'MIN' },
          { val: timeLeft.seconds, label: 'SECONDS' },
        ].map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="text-tm-text-primary text-2xl font-bold leading-none">
              {pad(u.val)}
            </span>
            <span className="text-tm-text-muted text-[8px] font-semibold tracking-wider mt-1">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ticket Card                                                        */
/* ------------------------------------------------------------------ */
function TicketCard({ ticket }: { ticket: TicketData }) {
  return (
    <div className="rounded-2xl overflow-hidden mx-2 bg-tm-surface" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
      {/* Ticket Type Badge */}
      <div className="relative py-2 text-center" style={{ backgroundColor: '#0060FF' }}>
        <span className="text-white text-xs font-semibold tracking-wide">
          {ticket.ticketType}
        </span>
        <button className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Info">
          <Info size={16} className="text-white/70" />
        </button>
      </div>

      {/* SEC / ROW / SEAT */}
      {ticket.generalAdmission ? (
        <div className="flex items-center justify-around py-3.5 px-4" style={{ backgroundColor: '#0060FF' }}>
          <div className="text-center">
            <div className="text-[9px] font-medium tracking-widest mb-0.5 text-white/55">SEC</div>
            <div className="text-white text-xl font-bold leading-none">{ticket.section}</div>
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-bold leading-none">{ticket.generalAdmission}</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-around py-3.5 px-4" style={{ backgroundColor: '#0060FF' }}>
          {[
            { label: 'SEC', value: ticket.section },
            { label: 'ROW', value: ticket.row },
            { label: 'SEAT', value: ticket.seat },
          ].map((col) => (
            <div key={col.label} className="text-center flex-1">
              <div className="text-[9px] font-medium tracking-widest mb-0.5 text-white/55">
                {col.label}
              </div>
              <div className="text-white text-2xl font-bold leading-none">{col.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Event Image */}
      <div className="relative" style={{ height: '190px' }}>
        <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" crossOrigin="anonymous" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h2 className="text-white text-base font-bold mb-1 leading-snug">{ticket.title}</h2>
          <p className="text-white/85 text-xs leading-snug">
            {ticket.date} {'\u00B7'} {ticket.venue}
          </p>
        </div>
      </div>

      {/* White content section below image */}
      <div className="bg-tm-surface">
        {/* Level label */}
        {ticket.levelLabel && (
          <div className="pt-3 pb-1.5 text-center">
            <p className="text-tm-text-primary text-sm font-semibold">{ticket.levelLabel}</p>
          </div>
        )}

        {/* Countdown (only for countdown delivery) */}
        {ticket.deliveryMethod === 'countdown' && ticket.countdownTarget && (
          <CountdownTimer targetDate={ticket.countdownTarget} />
        )}

        {/* Action: Add to Apple Wallet */}
        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-5 pt-2.5 pb-2.5">
            <button className="w-full bg-black text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2">
              <AppleWalletIcon />
              {'Add to Apple Wallet'}
            </button>
          </div>
        )}

        {/* Action: View Ticket */}
        {ticket.deliveryMethod === 'view' && (
          <div className="px-5 pt-2.5 pb-2.5">
            <button
              className="w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 text-white"
              style={{ backgroundColor: '#0060FF' }}
            >
              <BarcodeIcon />
              {'View Ticket'}
            </button>
          </div>
        )}

        {/* Links: View Barcode + Ticket Details */}
        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-4 pb-2.5 flex items-center justify-center gap-8">
            <button className="text-xs font-semibold underline" style={{ color: '#0060FF' }}>
              View Barcode
            </button>
            <button className="text-xs font-semibold underline" style={{ color: '#0060FF' }}>
              Ticket Details
            </button>
          </div>
        )}

        {/* Ticket Details only (for view / countdown) */}
        {ticket.deliveryMethod !== 'wallet' && (
          <div className="px-4 pb-2.5 text-center">
            <button className="text-xs font-semibold" style={{ color: '#0060FF' }}>
              Ticket Details
            </button>
          </div>
        )}

        {/* Verified badge (wallet tickets) */}
        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-5 pb-4">
            <div className="py-2.5 rounded-xl flex items-center justify-center gap-2" style={{ backgroundColor: '#0060FF' }}>
              <VerifiedIcon />
              <span className="text-white text-xs font-medium">{'ticketmaster.verified'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function MyTicketsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);

  const tickets = eventTickets[eventId || '2'] || eventTickets['2'];
  const currentTicket = tickets[0];

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
    setActiveTicketIndex(Math.min(idx, tickets.length - 1));
  }, [tickets.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTicket = (i: number) => {
    scrollRef.current?.scrollTo({ left: scrollRef.current.offsetWidth * i, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-tm-surface">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-tm-surface">
        <button onClick={() => navigate(-1)} className="text-tm-text-primary p-1" aria-label="Close">
          <X size={24} strokeWidth={2.5} />
        </button>
        <h1 className="text-tm-text-primary text-lg font-bold tracking-tight">My Tickets</h1>
        <button className="text-tm-text-primary text-base font-medium">Help</button>
      </header>

      {/* MY TICKETS tab indicator */}
      <div className="bg-tm-surface border-b border-tm-border">
        <div className="text-center py-3 text-sm font-bold tracking-wide text-tm-text-primary border-b-[3px] border-[#0060FF]">
          MY TICKETS {tickets.length}
        </div>
      </div>

      {/* Main scrollable */}
      <div className="flex-1 overflow-y-auto bg-tm-bg">
            <div className="pt-5 pb-2">
              {/* Ticket Carousel */}
              <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {tickets.map((ticket, i) => (
                  <div key={i} className="flex-shrink-0 w-full snap-center">
                    <TicketCard ticket={ticket} />
                  </div>
                ))}
              </div>

              {/* Pagination dots */}
              {tickets.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {tickets.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToTicket(i)}
                      className="w-2 h-2 rounded-full transition-colors"
                      style={{ backgroundColor: i === activeTicketIndex ? '#0060FF' : '#C4C4C4' }}
                      aria-label={`Go to ticket ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* "How Do I Manage My Tickets?" link */}
              {currentTicket.deliveryMethod === 'countdown' && (
                <div className="text-center mt-3 mb-1">
                  <button className="text-sm font-semibold" style={{ color: '#0060FF' }}>
                    {'How Do I Manage My Tickets?'}
                  </button>
                </div>
              )}
            </div>

            {/* Transfer / Sell buttons */}
            <div className="px-4 pb-4 pt-2 flex gap-3">
              <button
                className="flex-1 py-3 rounded-lg font-bold text-sm text-white"
                style={{ backgroundColor: '#0060FF' }}
              >
                Transfer
              </button>
              <button
                className="flex-1 py-3 rounded-lg font-bold text-sm"
                style={{
                  backgroundColor: currentTicket.sellActive ? '#0060FF' : '#D1D5DB',
                  color: currentTicket.sellActive ? '#FFFFFF' : '#9CA3AF',
                }}
              >
                Sell
              </button>
            </div>

            {/* Static Map Preview */}
            <div className="px-0 pb-6">
              <div className="relative w-full overflow-hidden" style={{ height: '180px' }}>
                <iframe
                  title={`Map of ${currentTicket.venueName}`}
                  src={`https://maps.google.com/maps?q=${currentTicket.mapQuery}&z=15&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ pointerEvents: 'none' }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-tm-surface px-3 py-2">
                  <p className="text-tm-text-primary text-sm font-bold">{currentTicket.venueName}</p>
                </div>
              </div>
            </div>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-2 pt-1 bg-tm-bg">
        <div className="w-32 h-1 rounded-full bg-tm-text-muted/40" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function AppleWalletIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="26" height="18" rx="3" fill="#1A1A1A" stroke="#333" strokeWidth="0.5" />
      <rect x="3" y="3" width="22" height="4" rx="1" fill="#FF3B30" />
      <rect x="3" y="7.5" width="22" height="4" rx="1" fill="#FF9500" />
      <rect x="3" y="12" width="22" height="4" rx="1" fill="#34C759" />
    </svg>
  );
}

function BarcodeIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="2" height="16" fill="white" />
      <rect x="4" y="1" width="1" height="16" fill="white" />
      <rect x="6" y="1" width="3" height="16" fill="white" />
      <rect x="10" y="1" width="1" height="16" fill="white" />
      <rect x="12" y="1" width="2" height="16" fill="white" />
      <rect x="15" y="1" width="1" height="16" fill="white" />
      <rect x="17" y="1" width="2" height="16" fill="white" />
      <rect x="20" y="1" width="1" height="16" fill="white" />
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
      <path d="M6 9L8 11L12 7" stroke="#0060FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
