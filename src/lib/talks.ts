import { getCollection, type CollectionEntry } from 'astro:content';
import { buildTime } from './posts';

export type Talk = CollectionEntry<'talks'>;

const YEAR = 365 * 24 * 3600 * 1000;

/** The last moment a date could mean: "2024" counts as the end of 2024. */
const endOf = (d: string) => {
  if (d.length === 4) return `${d}-12-31`;
  if (d.length === 7) return new Date(Date.UTC(+d.slice(0, 4), +d.slice(5, 7), 0)).toISOString().slice(0, 10);
  return d;
};
export const until = (t: Talk) => `${endOf(t.data.date)}T23:59:59Z`;
const time = (t: Talk) => new Date(until(t)).getTime();

export async function allTalks(): Promise<Talk[]> {
  return (await getCollection('talks')).sort((a, b) => time(b) - time(a) || a.id.localeCompare(b.id));
}

/** The soonest talk still to come, if there is one. Most of the time there isn't. */
export async function nextTalk(): Promise<Talk | undefined> {
  return (await allTalks()).filter((t) => time(t) >= buildTime).at(-1);
}

/** Home page: talks from the last year, then pinned ones. */
export async function frontTalks(count = 5): Promise<Talk[]> {
  const past = (await allTalks()).filter((t) => time(t) < buildTime);
  const fresh = past.filter((t) => buildTime - time(t) < YEAR);
  const pinned = past.filter((t) => t.data.pinned && !fresh.includes(t)).sort((a, b) => a.data.pinned! - b.data.pinned!);
  return [...fresh, ...pinned].slice(0, count);
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const talkLabel = (t: Talk) => (t.data.date.length === 4 ? t.data.date : `${MONTHS[+t.data.date.slice(5, 7) - 1]} ${t.data.date.slice(0, 4)}`);
export const ticketDay = (t: Talk) => (t.data.date.length === 10 ? String(+t.data.date.slice(8)) : MONTHS[+t.data.date.slice(5, 7) - 1]?.slice(0, 3) ?? '');
export const ticketMonth = (t: Talk) => (t.data.date.length === 10 ? `${MONTHS[+t.data.date.slice(5, 7) - 1].slice(0, 3)} ${t.data.date.slice(0, 4)}` : t.data.date.slice(0, 4));
export const venue = (t: Talk) => [t.data.event, t.data.location].filter(Boolean).join(', ');

/** Paste a normal YouTube link; the page needs the embed form. */
export const embedUrl = (url: string) => {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
};
