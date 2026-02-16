const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY || '';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export interface TMEvent {
  id: string;
  name: string;
  url: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
    };
    status?: { code: string };
  };
  images: { url: string; width: number; height: number; ratio?: string }[];
  _embedded?: {
    venues?: { name: string; city?: { name: string }; state?: { stateCode: string } }[];
    attractions?: { name: string; images?: { url: string; width: number }[] }[];
  };
  classifications?: { segment?: { name: string }; genre?: { name: string } }[];
  priceRanges?: { min: number; max: number; currency: string }[];
}

export interface TMAttraction {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  classifications?: { segment?: { name: string } }[];
  upcomingEvents?: { _total: number };
}

export interface TMVenue {
  id: string;
  name: string;
  city?: { name: string };
  state?: { stateCode: string };
  images?: { url: string; width: number }[];
  upcomingEvents?: { _total: number };
}

interface TMResponse<T> {
  _embedded?: { events?: T[]; attractions?: T[]; venues?: T[] };
  page: { size: number; totalElements: number; totalPages: number; number: number };
}

function getBestImage(images: { url: string; width: number }[], minWidth = 300): string {
  if (!images || images.length === 0) return '';
  const sorted = [...images].sort((a, b) => b.width - a.width);
  const best = sorted.find((img) => img.width >= minWidth) || sorted[0];
  return best.url;
}

function formatEventDate(event: TMEvent): string {
  try {
    const d = event.dates.start;
    const date = new Date(d.localDate + (d.localTime ? `T${d.localTime}` : ''));
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    let hours = date.getHours();
    const mins = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day}, ${month} ${dateNum} - ${hours}:${mins} ${ampm}`;
  } catch {
    return event.dates.start.localDate;
  }
}

function getVenueName(event: TMEvent): string {
  const v = event._embedded?.venues?.[0];
  if (!v) return '';
  return v.city ? `${v.name}, ${v.city.name}` : v.name;
}

export function transformEvent(event: TMEvent) {
  return {
    id: event.id,
    title: event.name,
    venue: getVenueName(event),
    date: formatEventDate(event),
    image: getBestImage(event.images),
    url: event.url,
  };
}

export function transformAttraction(attr: TMAttraction) {
  return {
    id: attr.id,
    name: attr.name,
    image: getBestImage(attr.images || [], 200),
    upcoming: attr.upcomingEvents?._total || 0,
  };
}

export function transformVenue(venue: TMVenue) {
  return {
    id: venue.id,
    name: venue.name,
    location: venue.city ? `${venue.city.name}, ${venue.state?.stateCode || ''}` : '',
    image: venue.images ? getBestImage(venue.images, 200) : '',
    upcoming: venue.upcomingEvents?._total || 0,
  };
}

export function hasApiKey(): boolean {
  return !!API_KEY;
}

async function fetchTM<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    ...params,
  });
  const res = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`);
  if (!res.ok) throw new Error(`TM API error: ${res.status}`);
  return res.json();
}

export async function fetchEvents(params: {
  keyword?: string;
  classificationName?: string;
  city?: string;
  dmaId?: string;
  size?: number;
  sort?: string;
  page?: number;
} = {}): Promise<ReturnType<typeof transformEvent>[]> {
  const qp: Record<string, string> = {
    size: String(params.size || 15),
    sort: params.sort || 'relevance,desc',
  };
  if (params.keyword) qp.keyword = params.keyword;
  if (params.classificationName) qp.classificationName = params.classificationName;
  if (params.city) qp.city = params.city;
  if (params.dmaId) qp.dmaId = params.dmaId;
  if (params.page) qp.page = String(params.page);

  const data = await fetchTM<TMResponse<TMEvent>>('/events.json', qp);
  return (data._embedded?.events || []).map(transformEvent);
}

export async function fetchFeaturedEvent(): Promise<ReturnType<typeof transformEvent> | null> {
  const data = await fetchTM<TMResponse<TMEvent>>('/events.json', {
    size: '1',
    sort: 'relevance,desc',
    dmaId: '324', // Los Angeles DMA
  });
  const events = data._embedded?.events;
  if (!events || events.length === 0) return null;
  return transformEvent(events[0]);
}

export async function fetchAttractions(params: {
  keyword?: string;
  classificationName?: string;
  size?: number;
} = {}): Promise<ReturnType<typeof transformAttraction>[]> {
  const qp: Record<string, string> = { size: String(params.size || 8) };
  if (params.keyword) qp.keyword = params.keyword;
  if (params.classificationName) qp.classificationName = params.classificationName;

  const data = await fetchTM<TMResponse<TMAttraction>>('/attractions.json', qp);
  return (data._embedded?.attractions || []).map(transformAttraction);
}

export async function fetchVenues(params: {
  keyword?: string;
  city?: string;
  stateCode?: string;
  size?: number;
} = {}): Promise<ReturnType<typeof transformVenue>[]> {
  const qp: Record<string, string> = { size: String(params.size || 5) };
  if (params.keyword) qp.keyword = params.keyword;
  if (params.city) qp.city = params.city;
  if (params.stateCode) qp.stateCode = params.stateCode;

  const data = await fetchTM<TMResponse<TMVenue>>('/venues.json', qp);
  return (data._embedded?.venues || []).map(transformVenue);
}

// SWR fetcher keys
export const swrKeys = {
  concerts: () => hasApiKey() ? ['events', 'music', '324'] : null,
  sports: () => hasApiKey() ? ['events', 'sports', '324'] : null,
  arts: () => hasApiKey() ? ['events', 'arts', '324'] : null,
  featured: () => hasApiKey() ? ['featured', '324'] : null,
  trending: () => hasApiKey() ? ['attractions', 'music'] : null,
  venues: () => hasApiKey() ? ['venues', 'CA'] : null,
  search: (q: string) => hasApiKey() && q ? ['search', q] : null,
};
