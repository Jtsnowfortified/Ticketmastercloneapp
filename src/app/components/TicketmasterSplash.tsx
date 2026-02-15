export default function TicketmasterSplash() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Ticketmaster Logo - small bold lowercase t with bounce animation */}
      <div className="animate-bounce-once">
        <span className="text-white text-8xl font-bold italic" style={{ fontFamily: 'Georgia, serif' }}>
          t
        </span>
      </div>

      <style>{`
        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          25% {
            transform: translateY(-25px) scale(1.05);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
          75% {
            transform: translateY(-5px) scale(1);
          }
        }
        
        .animate-bounce-once {
          animation: bounce-once 1s ease-out;
        }
      `}</style>
    </div>
  );
}