import { X } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import {
  fetchEventById,
  fetchTicketsForEvent,
  type DbEvent,
  type DbTicket,
} from '../services/supabaseClient';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface TicketData {
  ticketType: string;
  ticketTypeColor: string;
  section: string;
  row: string;
  seat: string;
  title: string;
  date: string;
  venue: string;
  venueLine2?: string;
  image: string;
  levelLabel: string;
  deliveryMethod: 'wallet' | 'view' | 'countdown';
  countdownTarget?: string;
  sellActive: boolean;
  mapQuery: string;
  venueName: string;
}

/* ------------------------------------------------------------------ */
/*  DB -> TicketData mapper                                            */
/* ------------------------------------------------------------------ */
function mapDbToTicketData(event: DbEvent, ticket: DbTicket): TicketData {
  return {
    ticketType: ticket.ticket_type,
    ticketTypeColor: ticket.ticket_type_color,
    section: ticket.section,
    row: ticket.row,
    seat: ticket.seat,
    title: event.title,
    date: event.date,
    venue: event.venue,
    venueLine2: event.venue_line2 || undefined,
    image: event.image,
    levelLabel: ticket.level_label || '',
    deliveryMethod: ticket.delivery_method,
    countdownTarget: ticket.countdown_target || undefined,
    sellActive: ticket.sell_active,
    mapQuery: event.map_query,
    venueName: event.venue_name,
  };
}

/* ------------------------------------------------------------------ */
/*  Fallback hardcoded data                                            */
/* ------------------------------------------------------------------ */
const eventTickets: Record<string, TicketData[]> = {
  '1': [
    {
      ticketType: 'Artist Presale',
      ticketTypeColor: '#4ADE80',
      section: 'D',
      row: '7',
      seat: '1',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025 7:00 PM',
      venue: 'Hollywood Bowl',
      venueLine2: 'Hollywood, CA',
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
      ticketTypeColor: '#4ADE80',
      section: 'D',
      row: '7',
      seat: '2',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025 7:00 PM',
      venue: 'Hollywood Bowl',
      venueLine2: 'Hollywood, CA',
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
      ticketTypeColor: '#4ADE80',
      section: 'D',
      row: '7',
      seat: '3',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025 7:00 PM',
      venue: 'Hollywood Bowl',
      venueLine2: 'Hollywood, CA',
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
      ticketTypeColor: '#4ADE80',
      section: 'D',
      row: '7',
      seat: '4',
      title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
      date: 'Sat, Nov 8, 2025 7:00 PM',
      venue: 'Hollywood Bowl',
      venueLine2: 'Hollywood, CA',
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
      ticketType: 'Verified Resale Ticket',
      ticketTypeColor: '#FFFFFF',
      section: '114',
      row: '25',
      seat: '1',
      title: 'Chris brown: Breezy Bowl XX',
      date: 'Wed, sep 24, 2025, 7:00 PM',
      venue: 'Coors field',
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'Lower level',
      deliveryMethod: 'wallet',
      sellActive: false,
      mapQuery: 'Coors+Field+Denver+CO',
      venueName: 'Coors Field',
    },
    {
      ticketType: 'Verified Resale Ticket',
      ticketTypeColor: '#FFFFFF',
      section: '114',
      row: '25',
      seat: '3',
      title: 'Chris brown: Breezy Bowl XX',
      date: 'Wed, sep 24, 2025, 7:00 PM',
      venue: 'Coors field',
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'Lower level',
      deliveryMethod: 'wallet',
      sellActive: false,
      mapQuery: 'Coors+Field+Denver+CO',
      venueName: 'Coors Field',
    },
    {
      ticketType: 'Verified Resale Ticket',
      ticketTypeColor: '#FFFFFF',
      section: '114',
      row: '25',
      seat: '5',
      title: 'Chris brown: Breezy Bowl XX',
      date: 'Wed, sep 24, 2025, 7:00 PM',
      venue: 'Coors field',
      image:
        'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      levelLabel: 'Lower level',
      deliveryMethod: 'wallet',
      sellActive: false,
      mapQuery: 'Coors+Field+Denver+CO',
      venueName: 'Coors Field',
    },
  ],
  '3': [
    {
      ticketType: 'General Sale',
      ticketTypeColor: '#FFFFFF',
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
      ticketTypeColor: '#4ADE80',
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
      ticketTypeColor: '#4ADE80',
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
/*  SWR fetcher: fetch event + tickets and map to TicketData[]         */
/* ------------------------------------------------------------------ */
async function fetchTicketDataForEvent(eventId: string): Promise<TicketData[] | null> {
  const [event, tickets] = await Promise.all([
    fetchEventById(eventId),
    fetchTicketsForEvent(eventId),
  ]);
  if (!event || !tickets || tickets.length === 0) return null;
  return tickets.map((t) => mapDbToTicketData(event, t));
}

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
    <div className="py-4 px-6 text-center">
      <p className="text-tm-text-primary font-semibold mb-4" style={{ fontSize: '15px' }}>
        {'Ticket will be ready in:'}
      </p>
      <div className="flex items-start justify-center gap-5">
        {[
          { val: timeLeft.days, label: 'DAY' },
          { val: timeLeft.hours, label: 'HOUR' },
          { val: timeLeft.minutes, label: 'MIN' },
          { val: timeLeft.seconds, label: 'SECONDS' },
        ].map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="text-tm-text-primary font-bold leading-none" style={{ fontSize: '28px' }}>
              {pad(u.val)}
            </span>
            <span className="text-tm-text-muted font-semibold tracking-wider mt-1.5" style={{ fontSize: '9px' }}>
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
    <div
      className="rounded-xl overflow-hidden mx-4 bg-tm-surface"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}
    >
      {/* Ticket Type Badge */}
      <div className="relative py-2 text-center" style={{ backgroundColor: '#0060FF' }}>
        <span
          className="font-semibold tracking-wide"
          style={{ color: ticket.ticketTypeColor, fontSize: '13px' }}
        >
          {ticket.ticketType}
        </span>
        <button className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Info">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
            <text x="10" y="14.5" textAnchor="middle" fill="white" fillOpacity="0.7" fontSize="12" fontWeight="600" fontFamily="serif" fontStyle="italic">i</text>
          </svg>
        </button>
      </div>

      {/* SEC / ROW / SEAT */}
      <div className="flex items-center justify-around py-3 px-4" style={{ backgroundColor: '#0060FF' }}>
        {[
          { label: 'SEC', value: ticket.section },
          { label: 'ROW', value: ticket.row },
          { label: 'SEAT', value: ticket.seat },
        ].map((col) => (
          <div key={col.label} className="text-center flex-1">
            <div className="font-medium tracking-widest text-white/60 uppercase" style={{ fontSize: '10px', marginBottom: '2px' }}>
              {col.label}
            </div>
            <div className="text-white font-bold leading-none" style={{ fontSize: '24px' }}>
              {col.value}
            </div>
          </div>
        ))}
      </div>

      {/* Event Image */}
      <div className="relative" style={{ height: '200px' }}>
        <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" crossOrigin="anonymous" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h2 className="text-white font-bold leading-tight mb-1" style={{ fontSize: '17px' }}>
            {ticket.title}
          </h2>
          <p className="text-white/80 leading-snug" style={{ fontSize: '12px' }}>
            {ticket.date} {'\u00B7'} {ticket.venue}
          </p>
          {ticket.venueLine2 && (
            <p className="text-white/70 text-center" style={{ fontSize: '12px' }}>
              {ticket.venueLine2}
            </p>
          )}
        </div>
      </div>

      {/* White content section */}
      <div className="bg-tm-surface">
        {ticket.levelLabel && (
          <div className="pt-3 pb-1 text-center">
            <p className="text-tm-text-primary" style={{ fontSize: '13px', fontStyle: 'italic' }}>
              {ticket.levelLabel}
            </p>
          </div>
        )}

        {ticket.deliveryMethod === 'countdown' && ticket.countdownTarget && (
          <CountdownTimer targetDate={ticket.countdownTarget} />
        )}

        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-5 pt-2 pb-2">
            <button className="w-full bg-black text-white rounded-lg flex items-center justify-center gap-2" style={{ height: '44px' }}>
              <img src="/images/apple-wallet-icon.jpg" alt="Apple Wallet" className="rounded" style={{ width: '26px', height: '26px' }} />
              <span className="font-semibold" style={{ fontSize: '14px' }}>{'Add to Apple Wallet'}</span>
            </button>
          </div>
        )}

        {ticket.deliveryMethod === 'view' && (
          <div className="px-5 pt-2 pb-2">
            <button className="w-full rounded-lg flex items-center justify-center gap-2 text-white" style={{ backgroundColor: '#0060FF', height: '44px' }}>
              <BarcodeIcon />
              <span className="font-semibold" style={{ fontSize: '14px' }}>{'View Ticket'}</span>
            </button>
          </div>
        )}

        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-4 pb-2 flex items-center justify-center gap-10 pt-1">
            <button className="font-semibold" style={{ color: '#0060FF', fontSize: '13px', textDecoration: 'underline' }}>View Barcode</button>
            <button className="font-semibold" style={{ color: '#0060FF', fontSize: '13px', textDecoration: 'underline' }}>Ticket Details</button>
          </div>
        )}

        {ticket.deliveryMethod !== 'wallet' && (
          <div className="px-4 pb-2 text-center pt-1">
            <button className="font-semibold" style={{ color: '#0060FF', fontSize: '13px' }}>Ticket Details</button>
          </div>
        )}

        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-5 pt-1 pb-4">
            <div className="rounded-lg flex items-center justify-center gap-2" style={{ backgroundColor: '#0060FF', height: '40px' }}>
              <VerifiedIcon />
              <span className="text-white font-medium" style={{ fontSize: '13px', fontStyle: 'italic' }}>{'ticketmaster.verified'}</span>
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

  const eid = eventId || '2';

  // Fetch from Supabase, fall back to hardcoded
  const { data: dbTickets } = useSWR(
    `tickets-${eid}`,
    () => fetchTicketDataForEvent(eid),
    { refreshInterval: 15000, revalidateOnFocus: true }
  );

  const tickets = dbTickets || eventTickets[eid] || eventTickets['2'];
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

  if (!currentTicket) return null;

  return (
    <div className="min-h-screen flex flex-col bg-tm-surface-alt">
      {/* Header */}
      <header className="flex items-center justify-between px-4" style={{ backgroundColor: '#0060FF', paddingTop: '10px', paddingBottom: '10px' }}>
        <button onClick={() => navigate(-1)} className="text-white p-1" aria-label="Close">
          <X size={22} strokeWidth={2.5} />
        </button>
        <h1 className="text-white font-bold" style={{ fontSize: '16px' }}>My Tickets</h1>
        <button className="text-white font-medium" style={{ fontSize: '15px' }}>Help</button>
      </header>

      {/* Main scrollable */}
      <div className="flex-1 overflow-y-auto bg-tm-bg">
        <div className="pt-4 pb-2">
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
            <div className="flex justify-center gap-1.5 mt-3">
              {tickets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToTicket(i)}
                  className="rounded-full transition-colors"
                  style={{
                    width: '7px',
                    height: '7px',
                    backgroundColor: i === activeTicketIndex ? '#0060FF' : '#C4C4C4',
                  }}
                  aria-label={`Go to ticket ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* "How Do I Manage My Tickets?" link (for countdown) */}
          {currentTicket.deliveryMethod === 'countdown' && (
            <div className="text-center mt-3 mb-1">
              <button className="font-semibold" style={{ color: '#0060FF', fontSize: '13px' }}>
                {'How Do I Manage My Tickets?'}
              </button>
            </div>
          )}
        </div>

        {/* Transfer / Sell buttons */}
        <div className="px-4 pb-4 pt-2 flex gap-3">
          <button
            onClick={() => navigate(`/transfer/${eid}`)}
            className="flex-1 rounded-lg font-bold text-white"
            style={{ backgroundColor: '#0060FF', fontSize: '14px', height: '46px' }}
          >
            Transfer
          </button>
          <button
            className="flex-1 rounded-lg font-bold"
            style={{
              backgroundColor: currentTicket.sellActive ? '#0060FF' : '#D1D5DB',
              color: currentTicket.sellActive ? '#FFFFFF' : '#9CA3AF',
              fontSize: '14px',
              height: '46px',
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
              <p className="text-tm-text-primary font-bold" style={{ fontSize: '13px' }}>
                {currentTicket.venueName}
              </p>
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
function BarcodeIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0L11.1 2.4L14.1 1.8L14.4 4.8L17.1 6.3L15.6 9L17.1 11.7L14.4 13.2L14.1 16.2L11.1 15.6L9 18L6.9 15.6L3.9 16.2L3.6 13.2L0.9 11.7L2.4 9L0.9 6.3L3.6 4.8L3.9 1.8L6.9 2.4L9 0Z"
        fill="white"
      />
      <path d="M6 9L8 11L12 7" stroke="#0060FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
