import type { APIContext } from 'astro';
import { allPosts } from '../lib/posts';
import { atom } from '../lib/atom';

export async function GET({ site }: APIContext) {
  return atom(await allPosts(), site!.origin, '/atom.xml');
}
