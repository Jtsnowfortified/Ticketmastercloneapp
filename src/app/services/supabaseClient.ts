import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/* ------------------------------------------------------------------ */
/*  DB Types                                                           */
/* ------------------------------------------------------------------ */
export interface DbEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  venue_line2: string | null;
  image: string;
  map_query: string;
  venue_name: string;
}

export interface DbTicket {
  id: string;
  event_id: string;
  ticket_type: string;
  ticket_type_color: string;
  section: string;
  row: string;
  seat: string;
  level_label: string;
  delivery_method: 'wallet' | 'view' | 'countdown';
  countdown_target: string | null;
  sell_active: boolean;
  is_visible: boolean;
}

/* ------------------------------------------------------------------ */
/*  Fetch helpers                                                      */
/* ------------------------------------------------------------------ */
export async function fetchEvents(): Promise<DbEvent[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('events').select('*').order('created_at');
  if (error) {
    console.error('[supabase] fetchEvents error:', error);
    return null;
  }
  return data;
}

export async function fetchEventById(eventId: string): Promise<DbEvent | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single();
  if (error) {
    console.error('[supabase] fetchEventById error:', error);
    return null;
  }
  return data;
}

export async function fetchTicketsForEvent(eventId: string): Promise<DbTicket[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('event_id', eventId)
    .eq('is_visible', true)
    .order('seat');
  if (error) {
    console.error('[supabase] fetchTicketsForEvent error:', error);
    return null;
  }
  return data;
}

export async function fetchEventsWithTicketCounts(): Promise<
  (DbEvent & { ticket_count: number })[] | null
> {
  if (!supabase) return null;
  const { data: events, error: evErr } = await supabase
    .from('events')
    .select('*')
    .order('created_at');
  if (evErr || !events) return null;

  const { data: tickets, error: tkErr } = await supabase
    .from('tickets')
    .select('event_id')
    .eq('is_visible', true);
  if (tkErr || !tickets) return events.map((e) => ({ ...e, ticket_count: 0 }));

  const countMap: Record<string, number> = {};
  tickets.forEach((t) => {
    countMap[t.event_id] = (countMap[t.event_id] || 0) + 1;
  });

  return events.map((e) => ({ ...e, ticket_count: countMap[e.id] || 0 }));
}
