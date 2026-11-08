import { allPosts, plain } from '../lib/posts';

export async function GET() {
  const entries = (await allPosts()).map((p) => [p.data.path, plain(p.body ?? '').toLowerCase()]);
  return new Response(JSON.stringify(Object.fromEntries(entries)), { headers: { 'Content-Type': 'application/json' } });
}
