import { Search, MapPin, Calendar, Heart, Ticket, Camera, User, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

// Real Ticketmaster discover page data - current events & tours
const trendingSearches = [
  'Noah Kahan', 'Cardi B', 'Post Malone', 'Jelly Roll',
  'Tame Impala', 'J. Cole', 'Baby Keem', 'Don Toliver',
];

const featuredBanner = {
  title: 'Post Malone',
  subtitle: 'BIG ASS Stadium Tour',
  label: 'ON SALE NOW',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  cta: 'Get Tickets',
};

const popularConcerts = [
  {
    id: 1,
    title: 'TWICE [THIS IS FOR] WORLD TOUR',
    venue: 'Kia Forum',
    date: 'Wed, Jan 21 - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80',
  },
  {
    id: 2,
    title: 'Noah Kahan: The Great Divide Tour',
    venue: 'Hollywood Bowl',
    date: 'Sat, Jun 13 - 7:30 PM',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80',
  },
  {
    id: 3,
    title: 'RUSH: Fifty Something',
    venue: 'Kia Forum',
    date: 'Sun, Jun 7 - 7:30 PM',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80',
  },
  {
    id: 4,
    title: 'Florence + The Machine',
    venue: 'Kia Forum',
    date: 'Tue, May 19 - 7:30 PM',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
  },
  {
    id: 5,
    title: 'New Edition: The New Edition Way',
    venue: 'Kia Forum',
    date: 'Sat, Jan 31 - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&q=80',
  },
];

const popularSports = [
  {
    id: 1,
    title: 'LA Clippers vs Philadelphia 76ers',
    venue: 'Intuit Dome',
    date: 'Mon, Feb 2 - 7:00 PM',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80',
  },
  {
    id: 2,
    title: 'Real Madrid Leyendas v Barca Legends',
    venue: 'BMO Stadium',
    date: 'Sun, Feb 22 - 2:00 PM',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80',
  },
  {
    id: 3,
    title: 'NBA All-Star Celebrity Game',
    venue: 'Kia Forum',
    date: 'Fri, Feb 13 - 4:00 PM',
    image: 'https://images.unsplash.com/photo-1504450758481-7338bbe75005?w=400&q=80',
  },
];

const popularArts = [
  {
    id: 1,
    title: 'Matt Rife: Stay Golden World Tour',
    venue: 'Greek Theatre',
    date: 'Sat, Jul 11 - 7:30 PM',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&q=80',
  },
  {
    id: 2,
    title: 'Gabriel Iglesias & Jo Koy',
    venue: 'SoFi Stadium',
    date: 'Sat, Mar 21 - 7:00 PM',
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80',
  },
  {
    id: 3,
    title: 'The Phantom of the Opera (Touring)',
    venue: 'Hollywood Pantages Theatre',
    date: 'Thu, Jun 25 - 2:00 PM',
    image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&q=80',
  },
];

const spotlightEvents = [
  {
    id: 1,
    label: 'JUST ANNOUNCED',
    title: 'Jelly Roll: Beautifully Broken Tour',
    subtitle: 'Summer 2026',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  },
  {
    id: 2,
    label: 'DON\'T MISS',
    title: 'MANA: Vivir Sin Aire Tour',
    subtitle: 'Sep 18, 2026 - Intuit Dome',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
  },
  {
    id: 3,
    label: 'VIP PACKAGES',
    title: 'Jack Johnson: SURFILMUSIC Tour',
    subtitle: 'Oct 10, 2026 - Hollywood Bowl',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  },
];

const venues = [
  { name: 'Kia Forum', type: 'Concerts', location: 'Inglewood, CA' },
  { name: 'Intuit Dome', type: 'Basketball, Concerts', location: 'Inglewood, CA' },
  { name: 'Hollywood Bowl', type: 'Concerts', location: 'Hollywood, CA' },
  { name: 'SoFi Stadium', type: 'Football, Concerts', location: 'Inglewood, CA' },
  { name: 'Crypto.com Arena', type: 'Basketball, Hockey', location: 'Los Angeles, CA' },
];

type TabKey = 'Concerts' | 'Sports' | 'Arts, Theater & Comedy';

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('Concerts');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories: TabKey[] = ['Concerts', 'Sports', 'Arts, Theater & Comedy'];

  const getEventsForTab = (): typeof popularConcerts => {
    switch (activeTab) {
      case 'Sports': return popularSports;
      case 'Arts, Theater & Comedy': return popularArts;
      default: return popularConcerts;
    }
  };

  const currentEvents = getEventsForTab();

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {/* Header */}
      <header className="bg-[#1C1C1E] px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1" />
          <span className="text-white text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            ticketmaster
          </span>
          <div className="flex-1 flex justify-end">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <rect width="32" height="32" fill="#B22234"/>
                <rect width="32" height="2.46" y="0" fill="white"/>
                <rect width="32" height="2.46" y="4.92" fill="white"/>
                <rect width="32" height="2.46" y="9.84" fill="white"/>
                <rect width="32" height="2.46" y="14.76" fill="white"/>
                <rect width="32" height="2.46" y="19.68" fill="white"/>
                <rect width="32" height="2.46" y="24.6" fill="white"/>
                <rect width="32" height="2.46" y="29.54" fill="white"/>
                <rect width="12.8" height="17.38" fill="#3C3B6E"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Location and Date Filters */}
        <div className="flex items-center gap-3 mb-3">
          <button className="flex items-center gap-1.5 text-sm text-gray-300">
            <MapPin size={14} className="text-[#0060FF]" />
            <span>Los Angeles, CA</span>
          </button>
          <div className="w-px h-4 bg-gray-600" />
          <button className="flex items-center gap-1.5 text-sm text-gray-300">
            <Calendar size={14} className="text-[#0060FF]" />
            <span>All Dates</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search by Artist, Event or Venue"
            className="w-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#0060FF]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0060FF]" size={18} />
        </div>

        {/* Trending Searches Dropdown */}
        {searchFocused && searchQuery === '' && (
          <div className="mt-2 bg-[#2C2C2E] rounded-lg p-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1.5 bg-[#3A3A3C] rounded-full text-xs text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Category Tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto bg-[#1C1C1E] scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              activeTab === category
                ? 'bg-white text-black'
                : 'bg-[#2C2C2E] text-gray-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-24">
        {/* Featured Hero Banner */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={featuredBanner.image}
            alt={featuredBanner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-[#0060FF] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
              {featuredBanner.label}
            </span>
          </div>
          <div className="absolute bottom-5 left-4 right-4">
            <h2 className="text-white text-2xl font-bold mb-0.5">{featuredBanner.title}</h2>
            <p className="text-gray-300 text-sm mb-3">{featuredBanner.subtitle}</p>
            <button className="bg-[#0060FF] text-white px-6 py-2.5 rounded-sm text-sm font-semibold">
              {featuredBanner.cta}
            </button>
          </div>
        </div>

        {/* Spotlight Carousel */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-base font-bold">Spotlight</h3>
            <button className="text-[#0060FF] text-xs font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {spotlightEvents.map((evt) => (
              <div key={evt.id} className="min-w-[260px] rounded-lg overflow-hidden bg-[#1C1C1E] flex-shrink-0">
                <div className="relative h-36">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-2 left-2 bg-[#0060FF] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                    {evt.label}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-semibold leading-tight">{evt.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{evt.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Events for Active Tab */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-base font-bold">
              Popular {activeTab === 'Arts, Theater & Comedy' ? 'Shows' : activeTab}
            </h3>
            <button className="text-[#0060FF] text-xs font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {currentEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 bg-[#1C1C1E] rounded-lg p-2.5">
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold leading-tight truncate">{event.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{event.date}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{event.venue}</p>
                </div>
                <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Trending Near You */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-base font-bold">Trending Near You</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {trendingSearches.slice(0, 5).map((artist) => (
              <button
                key={artist}
                className="flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0060FF] to-[#1C1C1E] flex items-center justify-center overflow-hidden">
                  <span className="text-white text-lg font-bold">{artist.charAt(0)}</span>
                </div>
                <span className="text-white text-[11px] text-center leading-tight">{artist}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Venues */}
        <div className="px-4 mt-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-base font-bold">Popular Venues</h3>
            <button className="text-[#0060FF] text-xs font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {venues.map((venue) => (
              <div key={venue.name} className="flex items-center justify-between bg-[#1C1C1E] rounded-lg px-3 py-3">
                <div>
                  <p className="text-white text-sm font-medium">{venue.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{venue.type} &middot; {venue.location}</p>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-white/10 px-4 pt-2 pb-1">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-0.5 text-[#0060FF] min-w-[48px]"
          >
            <Search size={22} />
            <span className="text-[10px] font-medium">Discover</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-gray-500 min-w-[48px]">
            <Heart size={22} />
            <span className="text-[10px] font-medium">Favourites</span>
          </button>
          <button
            onClick={() => navigate('/my-events')}
            className="flex flex-col items-center gap-0.5 text-gray-500 min-w-[48px]"
          >
            <Ticket size={22} />
            <span className="text-[10px] font-medium">My Events</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-gray-500 min-w-[48px]">
            <Camera size={22} />
            <span className="text-[10px] font-medium">Sell</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 text-gray-500 min-w-[48px]">
            <User size={22} />
            <span className="text-[10px] font-medium">My Account</span>
          </button>
        </div>
        <div className="flex justify-center mt-1.5 pb-1">
          <div className="w-32 h-1 bg-white rounded-full" />
        </div>
      </nav>
    </div>
  );
}
