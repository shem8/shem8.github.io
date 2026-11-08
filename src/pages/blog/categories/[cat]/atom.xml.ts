import type { APIContext } from 'astro';
import { allPosts, categoryLabel } from '../../../../lib/posts';
import { atom } from '../../../../lib/atom';

export async function getStaticPaths() {
  const posts = await allPosts();
  return [...new Set(posts.flatMap((p) => p.data.categories))].map((cat) => ({ params: { cat } }));
}

export async function GET({ site, params }: APIContext) {
  const posts = (await allPosts()).filter((p) => p.data.categories.includes(params.cat!));
  return atom(posts, site!.origin, `/blog/categories/${params.cat}/atom.xml`, `Shem Magnezi: ${categoryLabel(params.cat!)}`);
}
