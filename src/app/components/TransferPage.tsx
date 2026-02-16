import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface EventData {
  ticketType: string;
  ticketTypeColor: string;
  section: string;
  row: string;
  seats: string[];
  title: string;
  date: string;
  venue: string;
  venueLine2?: string;
  image: string;
}

/* ------------------------------------------------------------------ */
/*  Mock transfer data matching MyTicketsPage events                   */
/* ------------------------------------------------------------------ */
const transferEvents: Record<string, EventData> = {
  '1': {
    ticketType: 'Artist Presale',
    ticketTypeColor: '#4ADE80',
    section: 'D',
    row: '7',
    seats: ['1', '2', '3', '4'],
    title: 'Junior H - $AD BOYZ LIVE & BROKEN TOUR',
    date: 'Sat, Nov 8, 2025 7:00 PM',
    venue: 'Hollywood Bowl',
    venueLine2: 'Hollywood, CA',
    image:
      'https://images.unsplash.com/photo-1606075809824-eba8beb2c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmlhbmElMjBncmFuZGUlMjBjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzExNTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  '2': {
    ticketType: 'Verified Resale Ticket',
    ticketTypeColor: '#FFFFFF',
    section: '114',
    row: '25',
    seats: ['1', '2', '3'],
    title: 'Chris brown: Breezy Bowl XX',
    date: 'Wed, sep 24, 2025, 7:00 PM',
    venue: 'Coors field',
    image:
      'https://images.unsplash.com/photo-1747656336064-c2ca5e98b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc2luZ2VyJTIweWVsbG93JTIwb3V0Zml0JTIwcGVyZm9ybWluZ3xlbnwxfHx8fDE3NzExNTgzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  '3': {
    ticketType: 'General Sale',
    ticketTypeColor: '#FFFFFF',
    section: '248',
    row: '11',
    seats: ['18'],
    title: 'Lady Gaga: The MAYHEM Ball',
    date: 'Thu, Sep 11, 2025, 8:00 PM',
    venue: 'Scotiabank Arena',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
  },
  '4': {
    ticketType: 'Artist Presale',
    ticketTypeColor: '#4ADE80',
    section: '221',
    row: '13',
    seats: ['21', '22'],
    title: 'Harry Styles: Together, Together.',
    date: 'Sat, Sep 05, 2026, 8:00 PM',
    venue: 'Madison Square Garden',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80',
  },
};

/* ------------------------------------------------------------------ */
/*  Mini Ticket Card (dimmed behind bottom sheet)                      */
/* ------------------------------------------------------------------ */
function MiniTicketCard({ event }: { event: EventData }) {
  return (
    <div className="mx-4 rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}>
      {/* Ticket type badge */}
      <div className="text-center py-2" style={{ backgroundColor: '#0060FF' }}>
        <span className="font-semibold tracking-wide" style={{ color: event.ticketTypeColor, fontSize: '13px' }}>
          {event.ticketType}
        </span>
      </div>
      {/* SEC / ROW / SEAT */}
      <div className="flex items-center justify-around py-3 px-4" style={{ backgroundColor: '#0060FF' }}>
        <div className="text-center flex-1">
          <div className="font-medium tracking-widest text-white/60 uppercase" style={{ fontSize: '10px', marginBottom: '2px' }}>SEC</div>
          <div className="text-white font-bold leading-none" style={{ fontSize: '22px' }}>{event.section}</div>
        </div>
        <div className="text-center flex-1">
          <div className="font-medium tracking-widest text-white/60 uppercase" style={{ fontSize: '10px', marginBottom: '2px' }}>ROW</div>
          <div className="text-white font-bold leading-none" style={{ fontSize: '22px' }}>{event.row}</div>
        </div>
        <div className="text-center flex-1">
          <div className="font-medium tracking-widest text-white/60 uppercase" style={{ fontSize: '10px', marginBottom: '2px' }}>SEAT</div>
          <div className="text-white font-bold leading-none" style={{ fontSize: '22px' }}>{event.seats[0]}</div>
        </div>
      </div>
      {/* Event image */}
      <div className="relative" style={{ height: '160px' }}>
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" crossOrigin="anonymous" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h2 className="text-white font-bold leading-tight mb-0.5" style={{ fontSize: '15px' }}>{event.title}</h2>
          <p className="text-white/80 leading-snug" style={{ fontSize: '11px' }}>
            {event.date} {'\u00B7'} {event.venue}
          </p>
          {event.venueLine2 && (
            <p className="text-white/70 text-center" style={{ fontSize: '11px' }}>{event.venueLine2}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Seat Pill Component                                                */
/* ------------------------------------------------------------------ */
function SeatPill({ seat, selected, onToggle }: { seat: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex flex-col items-center overflow-hidden rounded-xl"
      style={{
        width: '80px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
      }}
    >
      {/* Blue top half with seat label */}
      <div
        className="w-full text-center py-2.5"
        style={{ backgroundColor: '#0060FF' }}
      >
        <span className="text-white font-bold" style={{ fontSize: '11px' }}>
          SEAT {seat}
        </span>
      </div>
      {/* White bottom half with toggle circle */}
      <div className="w-full bg-white flex items-center justify-center py-3">
        <div
          className="rounded-full transition-all"
          style={{
            width: '22px',
            height: '22px',
            backgroundColor: selected ? '#0060FF' : 'transparent',
            border: selected ? '2px solid #0060FF' : '2px solid #D1D5DB',
          }}
        />
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Transfer Page                                                 */
/* ------------------------------------------------------------------ */
export default function TransferPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = transferEvents[eventId || '2'] || transferEvents['2'];

  // Step management: 'select' -> 'form'
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleTransferTo = () => {
    if (selectedSeats.length > 0) {
      setStep('form');
    }
  };

  const handleBack = () => {
    setStep('select');
  };

  return (
    <div className="min-h-screen flex flex-col bg-tm-surface-alt">
      {/* Header */}
      <header
        className="flex items-center justify-between px-4"
        style={{ backgroundColor: '#0060FF', paddingTop: '10px', paddingBottom: '10px' }}
      >
        <button onClick={() => navigate(-1)} className="text-white p-1" aria-label="Close">
          <X size={22} strokeWidth={2.5} />
        </button>
        <h1 className="text-white font-bold" style={{ fontSize: '16px' }}>
          My Tickets
        </h1>
        <button className="text-white font-medium" style={{ fontSize: '15px' }}>
          Help
        </button>
      </header>

      {/* Ticket card preview (dimmed) */}
      <div className="relative pt-3 pb-0" style={{ opacity: 0.5 }}>
        <MiniTicketCard event={event} />
      </div>

      {/* Bottom Sheet */}
      <div
        className="flex-1 flex flex-col bg-white rounded-t-2xl -mt-4 relative z-10"
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}
      >
        {step === 'select' ? (
          /* ------- STEP 1: SELECT TICKETS TO TRANSFER ------- */
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <div className="pt-5 pb-3 px-6">
              <h2
                className="text-center font-bold tracking-wide uppercase"
                style={{ fontSize: '14px', color: '#374151', letterSpacing: '0.5px' }}
              >
                SELECT TICKETS TO TRANSFER
              </h2>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-gray-200" />

            {/* Row summary */}
            <div className="flex items-center justify-between px-6 pt-4 pb-3">
              <span style={{ fontSize: '14px', color: '#374151' }}>
                {'Sec '}
                <span className="font-bold">{event.section}</span>
                {', Row '}
                <span className="font-bold">{event.row}</span>
              </span>
              <span style={{ fontSize: '14px', color: '#374151' }}>
                <span className="font-bold">{event.seats.length}</span>
                {' Tickets'}
              </span>
            </div>

            {/* Seat pills */}
            <div className="flex items-center justify-center gap-3 px-6 py-3 flex-wrap">
              {event.seats.map((seat) => (
                <SeatPill
                  key={seat}
                  seat={seat}
                  selected={selectedSeats.includes(seat)}
                  onToggle={() => toggleSeat(seat)}
                />
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom bar */}
            <div className="border-t border-gray-200 px-5 py-4 flex items-center justify-between">
              <span className="font-bold" style={{ fontSize: '14px', color: '#111827' }}>
                {selectedSeats.length} Selected
              </span>
              <button
                onClick={handleTransferTo}
                className="flex items-center gap-1 font-bold"
                style={{
                  fontSize: '14px',
                  color: selectedSeats.length > 0 ? '#0060FF' : '#9CA3AF',
                }}
                disabled={selectedSeats.length === 0}
              >
                TRANSFER TO
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pb-2 pt-0.5">
              <div className="w-32 h-1 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
            </div>
          </div>
        ) : (
          /* ------- STEP 2: TRANSFER FORM ------- */
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Title */}
            <div className="pt-5 pb-3 px-6">
              <h2
                className="text-center font-bold tracking-wide uppercase"
                style={{ fontSize: '14px', color: '#374151', letterSpacing: '0.5px' }}
              >
                TRANSFER TICKETS
              </h2>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-gray-200" />

            {/* Selected tickets summary */}
            <div className="px-6 pt-4 pb-2">
              <p className="font-semibold" style={{ fontSize: '14px', color: '#374151' }}>
                {selectedSeats.length} Tickets Selected
              </p>
              {selectedSeats.map((seat) => (
                <p key={seat} style={{ fontSize: '13px', color: '#6B7280' }}>
                  {'Sec '}
                  <span className="font-bold text-gray-800">{event.section}</span>
                  {' Row '}
                  <span className="font-bold text-gray-800">{event.row}</span>
                  {' Seat '}
                  <span className="font-bold text-gray-800">{seat}</span>
                </p>
              ))}
            </div>

            {/* Form fields */}
            <div className="px-6 pt-3 pb-4 flex flex-col gap-4 flex-1">
              {/* First Name */}
              <div>
                <label className="block font-semibold mb-1.5" style={{ fontSize: '13px', color: '#374151' }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 outline-none transition-colors focus:border-[#0060FF] focus:ring-1 focus:ring-[#0060FF]"
                  style={{ fontSize: '14px', color: '#111827' }}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block font-semibold mb-1.5" style={{ fontSize: '13px', color: '#374151' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 outline-none transition-colors focus:border-[#0060FF] focus:ring-1 focus:ring-[#0060FF]"
                  style={{ fontSize: '14px', color: '#111827' }}
                />
              </div>

              {/* Email or Mobile Number */}
              <div>
                <label className="block font-semibold mb-1.5" style={{ fontSize: '13px', color: '#374151' }}>
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Mobile Number"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 outline-none transition-colors focus:border-[#0060FF] focus:ring-1 focus:ring-[#0060FF]"
                  style={{ fontSize: '14px', color: '#111827' }}
                />
              </div>

              {/* Note */}
              <div>
                <label className="block font-semibold mb-1.5" style={{ fontSize: '13px', color: '#374151' }}>
                  Note:
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder=""
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 outline-none transition-colors resize-none focus:border-[#0060FF] focus:ring-1 focus:ring-[#0060FF]"
                  style={{ fontSize: '14px', color: '#111827' }}
                />
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 px-5 py-4 flex items-center justify-between mt-auto">
              <button
                onClick={handleBack}
                className="flex items-center gap-0.5 font-semibold"
                style={{ fontSize: '14px', color: '#6B7280' }}
              >
                <ChevronLeft size={18} strokeWidth={2} />
                Back
              </button>
              <button
                className="rounded-lg font-bold text-white px-5"
                style={{
                  backgroundColor: '#0060FF',
                  fontSize: '14px',
                  height: '44px',
                }}
              >
                {'Transfer ' + selectedSeats.length + ' Tickets'}
              </button>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pb-2 pt-0.5">
              <div className="w-32 h-1 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
