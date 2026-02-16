export default function TicketmasterSplash() {
  return (
    <div className="relative w-full h-screen bg-tm-splash-bg flex items-center justify-center overflow-hidden">
      {/* Ticketmaster Logo - centered blue lowercase italic "t" matching real TM loading screen */}
      <span
        className="text-7xl font-bold text-tm-blue"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontStyle: 'italic',
        }}
      >
        t
      </span>
    </div>
  );
}
