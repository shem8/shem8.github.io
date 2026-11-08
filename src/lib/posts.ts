import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'> & { data: { path: string } };

/** One row in a list of writing: a post here, or a piece on another site. */
export interface Row { id: string; title: string; href: string; excerpt?: string; date: Date; source?: string; categories: string[]; external: boolean; pinned?: number; }

const YEAR = 365 * 24 * 3600 * 1000;
export const buildTime = process.env.SITE_NOW ? new Date(process.env.SITE_NOW).getTime() : Date.now();

const published = async () => (await getCollection('posts')).filter((p) => import.meta.env.DEV || !p.data.draft);

const newestFirst = <T extends { data: { date: Date } }>(a: T, b: T) => b.data.date.getTime() - a.data.date.getTime();

/** Posts that have a page on this site. */
export async function allPosts(): Promise<Post[]> {
  return (await published())
    .filter((p) => !p.data.url)
    .map((p) => ({ ...p, data: { ...p.data, path: p.data.path ?? pathFromId(p.id) } }) as Post)
    .sort(newestFirst);
}

function pathFromId(id: string) {
  const m = id.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!m) throw new Error(`Post file names start with a date, like 2027-01-31-my-post.md (got ${id})`);
  return `/blog/${m[1]}/${m[2]}/${m[3]}/${m[4]}/`;
}

/** Everything written, here and elsewhere, newest first. */
export async function allRows(): Promise<Row[]> {
  const here: Row[] = (await allPosts()).map((p) => ({ id: p.id, title: p.data.title, href: p.data.path, excerpt: excerpt(p), date: p.data.date, categories: p.data.categories, external: false, pinned: p.data.pinned }));
  const away: Row[] = (await published()).filter((p) => p.data.url).map((p) => ({ id: p.id, title: p.data.title, href: p.data.url!, date: p.data.date, source: p.data.source, categories: p.data.categories, external: true, pinned: p.data.pinned }));
  return [...here, ...away].sort((a, b) => b.date.getTime() - a.date.getTime());
}

/** Home page: anything from the last year comes first, then pinned posts. Never goes stale. */
export async function frontRows(count = 5): Promise<Row[]> {
  const rows = await allRows();
  const fresh = rows.filter((r) => buildTime - r.date.getTime() < YEAR);
  const pinned = rows.filter((r) => r.pinned && !fresh.includes(r)).sort((a, b) => a.pinned! - b.pinned!);
  return [...fresh, ...pinned].slice(0, count);
}

/** Plain-text excerpt: the part before the "more" marker, without Markdown or HTML. */
export function excerpt(post: { body?: string }, max = 170): string {
  const text = plain((post.body ?? '').split(/<!--\s*more\s*-->/)[0]);
  if (text.length <= max) return text.replace(/:$/, '…');
  return text.slice(0, text.lastIndexOf(' ', max)).replace(/[,;:\-–]+$/, '') + '…';
}

export const plain = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*#+\s*/gm, '')
    .replace(/[*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const formatDate = (d: Date, opts: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }) =>
  d.toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });

export const categoryLabel = (c: string) =>
  ({ android: 'Android', humor: 'Humor', kotlin: 'Kotlin', life: 'Life', publicspeaking: 'Public speaking', web: 'Web' } as Record<string, string>)[c] ?? c;

/** Absolute URLs, because feed readers have no base path. */
export const absolutize = (html: string, site: string) =>
  html.replace(/(src|href)="\/(?!\/)/g, `$1="${site}/`);
