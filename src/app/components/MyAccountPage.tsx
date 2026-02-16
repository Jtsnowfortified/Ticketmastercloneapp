import { useState } from 'react';
import {
  User,
  ChevronRight,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  Heart,
  Star,
  Mail,
  Phone,
  Lock,
  Smartphone,
  X,
  ChevronLeft,
} from 'lucide-react';

/* ---------- sub-screens ---------- */
type Screen = 'main' | 'profile' | 'preferences' | 'payment' | 'settings';

/* ============================================================
   My Account page – matches the real Ticketmaster mobile app
   ============================================================ */
export default function MyAccountPage() {
  const [screen, setScreen] = useState<Screen>('main');

  /* mock user */
  const user = {
    firstName: 'John',
    lastName: 'Diallo',
    email: 'johndiallo@email.com',
    phone: '+1 (555) 123-4567',
    initials: 'JD',
    member: 'Member since 2023',
  };

  /* ---- Profile sub-screen ---- */
  if (screen === 'profile') {
    return (
      <div className="min-h-screen bg-tm-bg pb-24">
        <header className="flex items-center gap-3 px-4 py-3 bg-tm-surface border-b border-tm-border">
          <button onClick={() => setScreen('main')} aria-label="Back" className="text-tm-blue">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-tm-text-primary font-bold" style={{ fontSize: '16px' }}>My Profile</h1>
        </header>
        <div className="px-4 pt-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3"
              style={{ backgroundColor: '#0060FF' }}
            >
              {user.initials}
            </div>
            <p className="text-tm-text-primary font-semibold" style={{ fontSize: '18px' }}>
              {user.firstName} {user.lastName}
            </p>
            <p className="text-tm-text-muted text-xs mt-0.5">{user.member}</p>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <ProfileField icon={<User size={18} />} label="First Name" value={user.firstName} />
            <ProfileField icon={<User size={18} />} label="Last Name" value={user.lastName} />
            <ProfileField icon={<Mail size={18} />} label="Email" value={user.email} />
            <ProfileField icon={<Phone size={18} />} label="Phone" value={user.phone} />
            <ProfileField icon={<Lock size={18} />} label="Password" value="**********" />
          </div>

          <button
            className="w-full mt-8 py-3 rounded-lg text-white font-semibold text-sm"
            style={{ backgroundColor: '#0060FF' }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  }

  /* ---- Preferences sub-screen ---- */
  if (screen === 'preferences') {
    return (
      <div className="min-h-screen bg-tm-bg pb-24">
        <header className="flex items-center gap-3 px-4 py-3 bg-tm-surface border-b border-tm-border">
          <button onClick={() => setScreen('main')} aria-label="Back" className="text-tm-blue">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-tm-text-primary font-bold" style={{ fontSize: '16px' }}>Preferences</h1>
        </header>
        <div className="px-4 pt-5">
          <p className="text-tm-text-secondary text-xs mb-5">
            Tell us what you love so we can personalize your experience.
          </p>

          <h2 className="text-tm-text-primary font-bold text-sm mb-3">Favorite Categories</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Concerts', 'Sports', 'Arts & Theater', 'Comedy', 'Family'].map((cat) => (
              <button
                key={cat}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-tm-border text-tm-text-primary bg-tm-surface"
              >
                {cat}
              </button>
            ))}
          </div>

          <h2 className="text-tm-text-primary font-bold text-sm mb-3">Notifications</h2>
          <div className="space-y-3">
            <ToggleRow label="Event Alerts" sublabel="Get notified about events you might like" defaultOn />
            <ToggleRow label="Presale Alerts" sublabel="Be first to know about presales" defaultOn />
            <ToggleRow label="Price Drop Alerts" sublabel="Know when ticket prices drop" defaultOn={false} />
            <ToggleRow label="Marketing Emails" sublabel="Offers and promotions from Ticketmaster" defaultOn={false} />
          </div>
        </div>
      </div>
    );
  }

  /* ---- Payment Methods sub-screen ---- */
  if (screen === 'payment') {
    return (
      <div className="min-h-screen bg-tm-bg pb-24">
        <header className="flex items-center gap-3 px-4 py-3 bg-tm-surface border-b border-tm-border">
          <button onClick={() => setScreen('main')} aria-label="Back" className="text-tm-blue">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-tm-text-primary font-bold" style={{ fontSize: '16px' }}>Payment Methods</h1>
        </header>
        <div className="px-4 pt-5">
          {/* Saved card */}
          <div className="bg-tm-surface rounded-xl border border-tm-border p-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-tm-surface-alt flex items-center justify-center">
                <CreditCard size={18} className="text-tm-text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-tm-text-primary text-sm font-semibold">Visa ending in 4242</p>
                <p className="text-tm-text-muted text-xs">Expires 12/2027</p>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#0060FF' }}>
                Default
              </span>
            </div>
          </div>

          <div className="bg-tm-surface rounded-xl border border-tm-border p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-tm-surface-alt flex items-center justify-center">
                <CreditCard size={18} className="text-tm-text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-tm-text-primary text-sm font-semibold">Mastercard ending in 8821</p>
                <p className="text-tm-text-muted text-xs">Expires 06/2026</p>
              </div>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-lg font-semibold text-sm border-2 text-tm-blue"
            style={{ borderColor: '#0060FF' }}
          >
            + Add Payment Method
          </button>
        </div>
      </div>
    );
  }

  /* ---- Settings sub-screen ---- */
  if (screen === 'settings') {
    return (
      <div className="min-h-screen bg-tm-bg pb-24">
        <header className="flex items-center gap-3 px-4 py-3 bg-tm-surface border-b border-tm-border">
          <button onClick={() => setScreen('main')} aria-label="Back" className="text-tm-blue">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-tm-text-primary font-bold" style={{ fontSize: '16px' }}>Settings</h1>
        </header>
        <div className="px-4 pt-5 space-y-5">
          <h2 className="text-tm-text-primary font-bold text-sm">Security</h2>
          <div className="space-y-3">
            <ToggleRow label="Two-Factor Authentication" sublabel="Add extra security to your account" defaultOn />
            <ToggleRow label="Passkeys" sublabel="Sign in with Face ID or fingerprint" defaultOn={false} />
          </div>

          <div className="border-t border-tm-border pt-5">
            <h2 className="text-tm-text-primary font-bold text-sm mb-3">App Settings</h2>
            <div className="space-y-3">
              <ToggleRow label="Mobile Ticket Animations" sublabel="Show animations on ticket screens" defaultOn />
              <ToggleRow label="Location Services" sublabel="Help us find events near you" defaultOn />
            </div>
          </div>

          <div className="border-t border-tm-border pt-5">
            <h2 className="text-tm-text-primary font-bold text-sm mb-3">Legal</h2>
            <SettingsLink label="Terms of Use" />
            <SettingsLink label="Privacy Policy" />
            <SettingsLink label="Purchase Policy" />
          </div>

          <div className="border-t border-tm-border pt-5">
            <p className="text-tm-text-muted text-xs text-center">
              Ticketmaster v23.8.1 (clone)
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ============= MAIN ACCOUNT SCREEN ============= */
  return (
    <div className="min-h-screen bg-tm-bg pb-24">
      {/* Header */}
      <header className="px-4 pt-3 pb-4 bg-tm-surface border-b border-tm-border">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-tm-text-primary font-bold" style={{ fontSize: '17px' }}>My Account</h1>
          <span className="text-tm-text-muted text-xs">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="US"
              className="inline-block w-5 h-3.5 rounded-sm mr-1"
              style={{ verticalAlign: 'middle' }}
              crossOrigin="anonymous"
            />
            US
          </span>
        </div>
      </header>

      {/* User Card */}
      <div className="px-4 pt-5 pb-2">
        <div className="bg-tm-surface rounded-2xl border border-tm-border p-4 flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
            style={{ backgroundColor: '#0060FF' }}
          >
            {user.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-tm-text-primary font-bold text-base truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-tm-text-secondary text-xs truncate">{user.email}</p>
            <p className="text-tm-text-muted text-[11px] mt-0.5">{user.member}</p>
          </div>
          <ChevronRight size={18} className="text-tm-text-muted shrink-0" />
        </div>
      </div>

      {/* Menu sections */}
      <div className="px-4 pt-4">
        {/* Account Management */}
        <p className="text-tm-text-muted text-[11px] font-semibold uppercase tracking-wider mb-2 px-1">
          Account
        </p>
        <div className="bg-tm-surface rounded-xl border border-tm-border overflow-hidden">
          <MenuItem
            icon={<User size={18} />}
            label="My Profile"
            sublabel="Name, email, phone, password"
            onClick={() => setScreen('profile')}
          />
          <Divider />
          <MenuItem
            icon={<Heart size={18} />}
            label="Preferences"
            sublabel="Favorites, notifications, interests"
            onClick={() => setScreen('preferences')}
          />
          <Divider />
          <MenuItem
            icon={<CreditCard size={18} />}
            label="Payment Methods"
            sublabel="Manage saved cards"
            onClick={() => setScreen('payment')}
          />
        </div>

        {/* Support & Info */}
        <p className="text-tm-text-muted text-[11px] font-semibold uppercase tracking-wider mb-2 px-1 mt-6">
          Support
        </p>
        <div className="bg-tm-surface rounded-xl border border-tm-border overflow-hidden">
          <MenuItem
            icon={<Shield size={18} />}
            label="Fan Guarantee"
            sublabel="Your ticket purchase protection"
          />
          <Divider />
          <MenuItem
            icon={<HelpCircle size={18} />}
            label="Help"
            sublabel="FAQs, contact support"
          />
          <Divider />
          <MenuItem
            icon={<Star size={18} />}
            label="Rate the App"
            sublabel="Tell us what you think"
          />
        </div>

        {/* Settings & Sign Out */}
        <p className="text-tm-text-muted text-[11px] font-semibold uppercase tracking-wider mb-2 px-1 mt-6">
          Settings
        </p>
        <div className="bg-tm-surface rounded-xl border border-tm-border overflow-hidden">
          <MenuItem
            icon={<Settings size={18} />}
            label="Settings"
            sublabel="Security, legal, app preferences"
            onClick={() => setScreen('settings')}
          />
          <Divider />
          <MenuItem
            icon={<Smartphone size={18} />}
            label="Manage Devices"
            sublabel="Trusted devices for your account"
          />
        </div>

        {/* Sign Out */}
        <button className="w-full mt-6 mb-4 bg-tm-surface border border-tm-border rounded-xl py-3.5 flex items-center justify-center gap-2">
          <LogOut size={18} className="text-red-500" />
          <span className="text-red-500 font-semibold text-sm">Sign Out</span>
        </button>

        <p className="text-tm-text-muted text-[10px] text-center pb-6">
          {'Ticketmaster \u00A9 2026. All rights reserved.'}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Reusable sub-components
   ============================================================ */

function MenuItem({
  icon,
  label,
  sublabel,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-tm-surface-alt transition-colors"
    >
      <span className="text-tm-blue shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-tm-text-primary text-sm font-semibold">{label}</p>
        {sublabel && <p className="text-tm-text-muted text-[11px] mt-0.5">{sublabel}</p>}
      </div>
      <ChevronRight size={16} className="text-tm-text-muted shrink-0" />
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-tm-border ml-14" />;
}

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-tm-surface rounded-xl border border-tm-border p-3.5">
      <p className="text-tm-text-muted text-[11px] font-medium mb-1">{label}</p>
      <div className="flex items-center gap-2.5">
        <span className="text-tm-blue shrink-0">{icon}</span>
        <p className="text-tm-text-primary text-sm">{value}</p>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  sublabel,
  defaultOn,
}: {
  label: string;
  sublabel: string;
  defaultOn: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="bg-tm-surface rounded-xl border border-tm-border p-3.5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-tm-text-primary text-sm font-semibold">{label}</p>
        <p className="text-tm-text-muted text-[11px] mt-0.5">{sublabel}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full shrink-0 relative transition-colors ${on ? '' : 'bg-tm-surface-alt'}`}
        style={on ? { backgroundColor: '#0060FF' } : undefined}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            on ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function SettingsLink({ label }: { label: string }) {
  return (
    <button className="w-full flex items-center justify-between py-3 active:opacity-70">
      <span className="text-tm-text-primary text-sm">{label}</span>
      <ChevronRight size={16} className="text-tm-text-muted" />
    </button>
  );
}
