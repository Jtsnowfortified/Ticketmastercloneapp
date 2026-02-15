import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import TicketmasterSplash from "./components/TicketmasterSplash";

export default function Root() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return <TicketmasterSplash />;
  }

  return <Outlet />;
}
