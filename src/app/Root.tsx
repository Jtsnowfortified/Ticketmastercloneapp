import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import TicketmasterSplash from "./components/TicketmasterSplash";
import BottomNav from "./components/BottomNav";

type Page = 'discover' | 'for-you' | 'my-events' | 'sell' | 'my-account';

function getActivePage(pathname: string): Page {
  if (pathname.startsWith('/my-events')) return 'my-events';
  if (pathname.startsWith('/for-you')) return 'for-you';
  if (pathname.startsWith('/sell')) return 'sell';
  if (pathname.startsWith('/my-account')) return 'my-account';
  return 'discover';
}

export default function Root() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return <TicketmasterSplash />;
  }

  // Hide bottom nav on ticket detail pages (full-screen modal views)
  const isTicketModal = location.pathname.startsWith('/my-tickets') || location.pathname.startsWith('/transfer');
  const activePage = getActivePage(location.pathname);

  return (
    <div className="min-h-screen bg-tm-bg">
      <Outlet />
      {!isTicketModal && <BottomNav activePage={activePage} />}
    </div>
  );
}
