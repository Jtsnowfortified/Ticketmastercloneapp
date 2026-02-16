export default function TicketmasterSplash() {
  return (
    <div className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Ticketmaster Logo - centered blue lowercase italic "t" matching real TM loading screen */}
      <span
        className="text-7xl font-bold"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontStyle: 'italic',
          color: '#026CDF',
        }}
      >
        t
      </span>
    </div>
  );
}
