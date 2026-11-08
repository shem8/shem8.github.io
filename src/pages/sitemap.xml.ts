import type { APIContext } from 'astro';
import { allPosts } from '../lib/posts';

export async function GET({ site }: APIContext) {
  const posts = await allPosts();
  const pages = ['/', '/blog/archives/', '/talks/', '/projects/', '/career/', '/press/', '/about/'];
  const cats = [...new Set(posts.flatMap((p) => p.data.categories))].map((c) => `/blog/categories/${c}/`);
  const urls = [...pages, ...cats].map((p) => `<url><loc>${site!.origin}${p}</loc></url>`);
  const postUrls = posts.map((p) => `<url><loc>${site!.origin}${p.data.path}</loc><lastmod>${p.data.date.toISOString()}</lastmod></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...urls, ...postUrls].join('')}</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
