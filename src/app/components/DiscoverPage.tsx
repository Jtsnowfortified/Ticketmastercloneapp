import { Search, MapPin, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import useSWR from 'swr';
import {
  hasApiKey,
  fetchEvents,
  fetchFeaturedEvent,
  fetchAttractions,
  fetchVenues,
  swrKeys,
} from '../services/ticketmasterApi';

/* ─────────────────────── Fallback static data ─────────────────────── */
const fallbackConcerts = [
  { id: 'f1', title: 'TWICE [THIS IS FOR] WORLD TOUR', venue: 'Kia Forum', date: 'Wed, Jan 21 - 8:00 PM', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80', url: '' },
  { id: 'f2', title: 'Noah Kahan: The Great Divide Tour', venue: 'Hollywood Bowl', date: 'Sat, Jun 13 - 7:30 PM', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80', url: '' },
  { id: 'f3', title: 'RUSH: Fifty Something', venue: 'Kia Forum', date: 'Sun, Jun 7 - 7:30 PM', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80', url: '' },
  { id: 'f4', title: 'Florence + The Machine', venue: 'Kia Forum', date: 'Tue, May 19 - 7:30 PM', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80', url: '' },
  { id: 'f5', title: 'New Edition: The New Edition Way', venue: 'Kia Forum', date: 'Sat, Jan 31 - 8:00 PM', image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&q=80', url: '' },
];
const fallbackSports = [
  { id: 's1', title: 'LA Clippers vs Philadelphia 76ers', venue: 'Intuit Dome', date: 'Mon, Feb 2 - 7:00 PM', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80', url: '' },
  { id: 's2', title: 'Real Madrid Leyendas v Barca Legends', venue: 'BMO Stadium', date: 'Sun, Feb 22 - 2:00 PM', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80', url: '' },
  { id: 's3', title: 'NBA All-Star Celebrity Game', venue: 'Kia Forum', date: 'Fri, Feb 13 - 4:00 PM', image: 'https://images.unsplash.com/photo-1504450758481-7338bbe75005?w=400&q=80', url: '' },
];
const fallbackArts = [
  { id: 'a1', title: 'Matt Rife: Stay Golden World Tour', venue: 'Greek Theatre', date: 'Sat, Jul 11 - 7:30 PM', image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&q=80', url: '' },
  { id: 'a2', title: 'Gabriel Iglesias & Jo Koy', venue: 'SoFi Stadium', date: 'Sat, Mar 21 - 7:00 PM', image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80', url: '' },
  { id: 'a3', title: 'The Phantom of the Opera (Touring)', venue: 'Hollywood Pantages Theatre', date: 'Thu, Jun 25 - 2:00 PM', image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&q=80', url: '' },
];
const fallbackFeatured = { id: 'fb', title: 'Post Malone', venue: '', date: '', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', url: '' };
const fallbackTrending = [
  { id: 't1', name: 'Noah Kahan', image: '', upcoming: 0 },
  { id: 't2', name: 'Cardi B', image: '', upcoming: 0 },
  { id: 't3', name: 'Post Malone', image: '', upcoming: 0 },
  { id: 't4', name: 'Jelly Roll', image: '', upcoming: 0 },
  { id: 't5', name: 'Tame Impala', image: '', upcoming: 0 },
  { id: 't6', name: 'J. Cole', image: '', upcoming: 0 },
  { id: 't7', name: 'Baby Keem', image: '', upcoming: 0 },
  { id: 't8', name: 'Don Toliver', image: '', upcoming: 0 },
];
const fallbackVenues = [
  { id: 'v1', name: 'Kia Forum', location: 'Inglewood, CA', image: '', upcoming: 0 },
  { id: 'v2', name: 'Intuit Dome', location: 'Inglewood, CA', image: '', upcoming: 0 },
  { id: 'v3', name: 'Hollywood Bowl', location: 'Hollywood, CA', image: '', upcoming: 0 },
  { id: 'v4', name: 'SoFi Stadium', location: 'Inglewood, CA', image: '', upcoming: 0 },
  { id: 'v5', name: 'Crypto.com Arena', location: 'Los Angeles, CA', image: '', upcoming: 0 },
];

const LA_DMA = '324';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

type TabKey = 'Concerts' | 'Sports' | 'Arts, Theater & Comedy';
const classMap: Record<TabKey, string> = {
  Concerts: 'music',
  Sports: 'sports',
  'Arts, Theater & Comedy': 'arts',
};
const fallbackMap: Record<TabKey, typeof fallbackConcerts> = {
  Concerts: fallbackConcerts,
  Sports: fallbackSports,
  'Arts, Theater & Comedy': fallbackArts,
};

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('Concerts');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const live = hasApiKey();
  const categories: TabKey[] = ['Concerts', 'Sports', 'Arts, Theater & Comedy'];

  // Live data fetchers with SWR -- auto-refresh every 5 min
  const { data: liveConcerts } = useSWR(
    swrKeys.concerts(),
    () => fetchEvents({ classificationName: 'music', dmaId: LA_DMA, size: 15 }),
    { refreshInterval: REFRESH_INTERVAL, revalidateOnFocus: true, fallbackData: undefined }
  );
  const { data: liveSports } = useSWR(
    swrKeys.sports(),
    () => fetchEvents({ classificationName: 'sports', dmaId: LA_DMA, size: 10 }),
    { refreshInterval: REFRESH_INTERVAL, revalidateOnFocus: true }
  );
  const { data: liveArts } = useSWR(
    swrKeys.arts(),
    () => fetchEvents({ classificationName: 'arts', dmaId: LA_DMA, size: 10 }),
    { refreshInterval: REFRESH_INTERVAL, revalidateOnFocus: true }
  );
  const { data: liveFeatured } = useSWR(
    swrKeys.featured(),
    () => fetchFeaturedEvent(),
    { refreshInterval: REFRESH_INTERVAL, revalidateOnFocus: true }
  );
  const { data: liveTrending } = useSWR(
    swrKeys.trending(),
    () => fetchAttractions({ classificationName: 'music', size: 8 }),
    { refreshInterval: REFRESH_INTERVAL, revalidateOnFocus: true }
  );
  const { data: liveVenues } = useSWR(
    swrKeys.venues(),
    () => fetchVenues({ stateCode: 'CA', size: 5 }),
    { refreshInterval: REFRESH_INTERVAL, revalidateOnFocus: true }
  );
  const { data: searchResults, isLoading: searchLoading } = useSWR(
    swrKeys.search(searchQuery),
    () => fetchEvents({ keyword: searchQuery, size: 8 }),
    { dedupingInterval: 400 }
  );

  // Resolved data -- live if available, fallback otherwise
  const liveTabMap: Record<TabKey, typeof liveConcerts> = {
    Concerts: liveConcerts,
    Sports: liveSports,
    'Arts, Theater & Comedy': liveArts,
  };
  const currentEvents = (live ? liveTabMap[activeTab] : null) || fallbackMap[activeTab];
  const featured = (live ? liveFeatured : null) || fallbackFeatured;
  const trending = (live ? liveTrending : null) || fallbackTrending;
  const venues = (live ? liveVenues : null) || fallbackVenues;

  const showSearch = searchFocused && searchQuery.length > 1 && live;

  return (
    <div className="min-h-screen bg-tm-bg flex flex-col">
      {/* Header */}
      <header className="bg-tm-surface px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <span className="text-tm-text-primary text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              ticketmaster
            </span>
            {live && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-0.5" title="Live data active" />
            )}
          </div>
          <div className="flex-1 flex justify-end">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-tm-border">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <rect width="32" height="32" fill="#B22234" />
                <rect width="32" height="2.46" y="0" fill="white" />
                <rect width="32" height="2.46" y="4.92" fill="white" />
                <rect width="32" height="2.46" y="9.84" fill="white" />
                <rect width="32" height="2.46" y="14.76" fill="white" />
                <rect width="32" height="2.46" y="19.68" fill="white" />
                <rect width="32" height="2.46" y="24.6" fill="white" />
                <rect width="32" height="2.46" y="29.54" fill="white" />
                <rect width="12.8" height="17.38" fill="#3C3B6E" />
              </svg>
            </div>
          </div>
        </div>

        {/* Location and Date Filters */}
        <div className="flex items-center gap-3 mb-3">
          <button className="flex items-center gap-1.5 text-sm text-tm-text-secondary">
            <MapPin size={14} className="text-tm-blue" />
            <span>Los Angeles, CA</span>
          </button>
          <div className="w-px h-4 bg-tm-border" />
          <button className="flex items-center gap-1.5 text-sm text-tm-text-secondary">
            <Calendar size={14} className="text-tm-blue" />
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
            onBlur={() => setTimeout(() => setSearchFocused(false), 300)}
            placeholder="Search by Artist, Event or Venue"
            className="w-full px-4 py-3 rounded-lg bg-tm-search-bg text-tm-text-primary placeholder-tm-text-muted text-sm focus:outline-none focus:ring-1 focus:ring-tm-blue"
          />
          {searchLoading ? (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-tm-blue animate-spin" size={18} />
          ) : (
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-tm-blue" size={18} />
          )}
        </div>

        {/* Trending Searches (when search empty & focused) */}
        {searchFocused && searchQuery === '' && (
          <div className="mt-2 bg-tm-surface-alt rounded-lg p-3">
            <p className="text-xs text-tm-text-muted font-semibold uppercase tracking-wide mb-2">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {trending.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSearchQuery(t.name)}
                  className="px-3 py-1.5 bg-tm-surface rounded-full text-xs text-tm-text-primary border border-tm-border"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live search results */}
        {showSearch && searchResults && searchResults.length > 0 && (
          <div className="mt-2 bg-tm-surface-alt rounded-lg overflow-hidden">
            {searchResults.map((evt) => (
              <a
                key={evt.id}
                href={evt.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 border-b border-tm-border last:border-0"
              >
                {evt.image && (
                  <img src={evt.image} alt={evt.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-tm-text-primary text-sm font-medium truncate">{evt.title}</p>
                  <p className="text-tm-text-muted text-xs">{evt.date}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Category Tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto bg-tm-surface scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              activeTab === category
                ? 'bg-tm-blue text-white'
                : 'bg-tm-surface-alt text-tm-text-secondary'
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
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-tm-blue text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
              ON SALE NOW
            </span>
          </div>
          <div className="absolute bottom-5 left-4 right-4">
            <h2 className="text-white text-2xl font-bold mb-0.5">{featured.title}</h2>
            {featured.venue && <p className="text-gray-300 text-sm mb-3">{featured.venue}</p>}
            <button className="bg-tm-blue text-white px-6 py-2.5 rounded-sm text-sm font-semibold">
              Get Tickets
            </button>
          </div>
        </div>

        {/* Trending Near You */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-tm-text-primary text-base font-bold">Trending Near You</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {trending.map((artist) => (
              <button
                key={artist.id}
                onClick={() => setSearchQuery(artist.name)}
                className="flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tm-blue to-blue-400 flex items-center justify-center overflow-hidden">
                  {artist.image ? (
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-lg font-bold">{artist.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-tm-text-primary text-[11px] text-center leading-tight">{artist.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Events for Active Tab */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-tm-text-primary text-base font-bold">
              Popular {activeTab === 'Arts, Theater & Comedy' ? 'Shows' : activeTab}
            </h3>
            <button className="text-tm-blue text-xs font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={12} />
            </button>
          </div>
          {currentEvents.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="animate-spin text-tm-blue" size={24} />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {currentEvents.map((event) => (
                <a
                  key={event.id}
                  href={event.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-tm-surface rounded-lg p-2.5"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-tm-text-primary text-sm font-semibold leading-tight truncate">{event.title}</p>
                    <p className="text-tm-text-secondary text-xs mt-1">{event.date}</p>
                    <p className="text-tm-text-muted text-xs mt-0.5">{event.venue}</p>
                  </div>
                  <ChevronRight size={16} className="text-tm-text-muted flex-shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Popular Venues */}
        <div className="px-4 mt-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-tm-text-primary text-base font-bold">Popular Venues</h3>
            <button className="text-tm-blue text-xs font-semibold flex items-center gap-0.5">
              See All <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {venues.map((venue) => (
              <div key={venue.id} className="flex items-center justify-between bg-tm-surface rounded-lg px-3 py-3">
                <div>
                  <p className="text-tm-text-primary text-sm font-medium">{venue.name}</p>
                  <p className="text-tm-text-muted text-xs mt-0.5">
                    {venue.location}
                    {venue.upcoming > 0 && ` \u00B7 ${venue.upcoming} events`}
                  </p>
                </div>
                <ChevronRight size={16} className="text-tm-text-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
