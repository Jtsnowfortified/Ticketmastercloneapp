import { X } from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { supabase } from '@/lib/supabase'
/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface TicketData {
  ticketType: string;
  ticketTypeColor: string; // text color of ticket type label
  section: string;
  row: string;
  seat: string;
  title: string;
  date: string;
  venue: string;
  venueLine2?: string; // second line under venue
  image: string;
  levelLabel: string;
  deliveryMethod: 'wallet' | 'view' | 'countdown';
  countdownTarget?: string;
  sellActive: boolean;
  mapQuery: string;
  venueName: string;
}

/* ------------------------------------------------------------------ */
/* (hook usage for fetching tickets moved inside the component to avoid
   calling React hooks at the top-level. See the component implementation
   below for the correct usage.) */
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
        {/* Info icon */}
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
            <div
              className="font-medium tracking-widest text-white/60 uppercase"
              style={{ fontSize: '10px', marginBottom: '2px' }}
            >
              {col.label}
            </div>
            <div className="text-white font-bold leading-none" style={{ fontSize: '24px' }}>
              {col.value}
            </div>
          </div>
        ))}
      </div>

      {/* Event Image with text overlay */}
      <div className="relative" style={{ height: '200px' }}>
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h2
            className="text-white font-bold leading-tight mb-1"
            style={{ fontSize: '17px' }}
          >
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

      {/* White content section below image */}
      <div className="bg-tm-surface">
        {/* Level label */}
        {ticket.levelLabel && (
          <div className="pt-3 pb-1 text-center">
            <p className="text-tm-text-primary" style={{ fontSize: '13px', fontStyle: 'italic' }}>
              {ticket.levelLabel}
            </p>
          </div>
        )}

        {/* Countdown (only for countdown delivery) */}
        {ticket.deliveryMethod === 'countdown' && ticket.countdownTarget && (
          <CountdownTimer targetDate={ticket.countdownTarget} />
        )}

        {/* Action: Add to Apple Wallet -- uses real Apple Wallet icon image */}
        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-5 pt-2 pb-2">
            <button
              className="w-full bg-black text-white rounded-lg flex items-center justify-center gap-2"
              style={{ height: '44px' }}
            >
              <img
                src="/images/apple-wallet-icon.jpg"
                alt="Apple Wallet"
                className="rounded"
                style={{ width: '26px', height: '26px' }}
              />
              <span className="font-semibold" style={{ fontSize: '14px' }}>
                {'Add to Apple Wallet'}
              </span>
            </button>
          </div>
        )}

        {/* Action: View Ticket */}
        {ticket.deliveryMethod === 'view' && (
          <div className="px-5 pt-2 pb-2">
            <button
              className="w-full rounded-lg flex items-center justify-center gap-2 text-white"
              style={{ backgroundColor: '#0060FF', height: '44px' }}
            >
              <BarcodeIcon />
              <span className="font-semibold" style={{ fontSize: '14px' }}>
                {'View Ticket'}
              </span>
            </button>
          </div>
        )}

        {/* Links: View Barcode + Ticket Details */}
        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-4 pb-2 flex items-center justify-center gap-10 pt-1">
            <button
              className="font-semibold"
              style={{ color: '#0060FF', fontSize: '13px', textDecoration: 'underline' }}
            >
              View Barcode
            </button>
            <button
              className="font-semibold"
              style={{ color: '#0060FF', fontSize: '13px', textDecoration: 'underline' }}
            >
              Ticket Details
            </button>
          </div>
        )}

        {/* Ticket Details only (for view / countdown) */}
        {ticket.deliveryMethod !== 'wallet' && (
          <div className="px-4 pb-2 text-center pt-1">
            <button
              className="font-semibold"
              style={{ color: '#0060FF', fontSize: '13px' }}
            >
              Ticket Details
            </button>
          </div>
        )}

        {/* Verified badge */}
        {ticket.deliveryMethod === 'wallet' && (
          <div className="px-5 pt-1 pb-4">
            <div
              className="rounded-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0060FF', height: '40px' }}
            >
              <VerifiedIcon />
              <span className="text-white font-medium" style={{ fontSize: '13px', fontStyle: 'italic' }}>
                {'ticketmaster.verified'}
              </span>
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

  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch real tickets from Supabase
  useEffect(() => {
    async function fetchTickets() {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
      } else {
        const mappedTickets: TicketData[] = (data || []).map((t: any) => ({
          ticketType: t.type || 'Standard Tickets',
          ticketTypeColor: '#4ADE80',
          section: t.section || 'N/A',
          row: t.row || 'N/A',
          seat: t.seat || 'N/A',
          title: t.event_name,
          date: t.date,
          venue: t.venue,
          venueLine2: '',
          image: t.image_url || 'https://picsum.photos/id/1015/600/400',
          levelLabel: 'Verified Fan Seller',
          deliveryMethod: 'wallet',
          sellActive: false,
          mapQuery: t.venue ? t.venue.replace(/ /g, '+') : '',
          venueName: t.venue || '',
        }));
        setTickets(mappedTickets);
      }
      setLoading(false);
    }

    fetchTickets();
  }, []);

  const currentTicket = tickets[0] || ({} as TicketData);

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading tickets...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-tm-surface-alt">
      {/* Header */}
      <header className="flex items-center justify-between px-4" style={{ backgroundColor: '#0060FF', paddingTop: '10px', paddingBottom: '10px' }}>
        <button onClick={() => navigate(-1)} className="text-white p-1">
          <X size={22} strokeWidth={2.5} />
        </button>
        <h1 className="text-white font-bold" style={{ fontSize: '16px' }}>My Tickets</h1>
        <button className="text-white font-medium" style={{ fontSize: '15px' }}>Help</button>
      </header>

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
                />
              ))}
            </div>
          )}
        </div>

        {/* Transfer / Sell buttons */}
        <div className="px-4 pb-4 pt-2 flex gap-3">
          <button
            onClick={() => navigate(`/transfer/${eventId || '1'}`)}
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

        {/* Map */}
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
