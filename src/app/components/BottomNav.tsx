import { Search, Heart, Tag, User } from 'lucide-react';
import { useNavigate } from 'react-router';

type Page = 'discover' | 'for-you' | 'my-events' | 'sell' | 'my-account';

interface BottomNavProps {
  activePage: Page;
}

function MyEventsIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? 'var(--tm-blue)' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 10h20" />
      <path d="M12 4v6" />
    </svg>
  );
}

export default function BottomNav({ activePage }: BottomNavProps) {
  const navigate = useNavigate();

  const tabs: { key: Page; label: string; icon: React.ReactNode; route: string }[] = [
    {
      key: 'discover',
      label: 'Discover',
      icon: <Search size={22} />,
      route: '/',
    },
    {
      key: 'for-you',
      label: 'For You',
      icon: <Heart size={22} />,
      route: '/for-you',
    },
    {
      key: 'my-events',
      label: 'My Events',
      icon: <MyEventsIcon active={activePage === 'my-events'} />,
      route: '/my-events',
    },
    {
      key: 'sell',
      label: 'Sell',
      icon: <Tag size={22} />,
      route: '/sell',
    },
    {
      key: 'my-account',
      label: 'My Account',
      icon: <User size={22} />,
      route: '/my-account',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-tm-nav-bg border-t border-tm-nav-border px-2 pt-2 pb-1 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activePage === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.route)}
              className={`flex flex-col items-center gap-0.5 py-1 min-w-[60px] transition-colors ${
                isActive ? 'text-tm-blue' : 'text-tm-text-muted'
              }`}
            >
              {tab.key === 'my-events' ? tab.icon : tab.icon}
              <span
                className={`text-[10px] ${isActive ? 'font-semibold text-tm-blue' : 'text-tm-text-muted'}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Home Indicator */}
      <div className="flex justify-center mt-1.5 pb-1">
        <div className="w-32 h-1 rounded-full bg-tm-text-muted/40" />
      </div>
    </nav>
  );
}
