import type { Post } from './posts';
import { absolutize } from './posts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function atom(posts: Post[], site: string, selfPath: string, title = 'Shem Magnezi') {
  const updated = posts[0]?.data.date.toISOString() ?? new Date().toISOString();
  const entries = posts.slice(0, 20).map((p) => {
    const url = site + p.data.path;
    return `<entry><title type="html">${esc(p.data.title)}</title><link href="${url}"/><updated>${p.data.date.toISOString()}</updated><id>${url}</id><content type="html">${esc(absolutize(p.rendered?.html ?? '', site))}</content></entry>`;
  });
  const body = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom"><title>${esc(title)}</title><link href="${site}${selfPath}" rel="self"/><link href="${site}/"/><updated>${updated}</updated><id>${site}/</id><author><name>Shem Magnezi</name></author>${entries.join('')}</feed>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
