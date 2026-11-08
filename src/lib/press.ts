import { getCollection, type CollectionEntry } from 'astro:content';

export type PressItem = CollectionEntry<'press'>;

export async function allPress(): Promise<PressItem[]> {
  // Items without a date stay on top of their group.
  return (await getCollection('press')).sort((a, b) => (b.data.date ?? '9999').localeCompare(a.data.date ?? '9999'));
}

/** WIRED and The Times covered Kickoff, but there are no article links to file them under. */
const NO_LINK_OUTLETS = ['WIRED', 'The Times'];

export async function outlets(): Promise<string[]> {
  return [...new Set([...NO_LINK_OUTLETS, ...(await allPress()).flatMap((p) => p.data.outlet ?? [])])];
}

export async function frontPress(): Promise<PressItem[]> {
  return (await allPress()).filter((p) => p.data.pinned).sort((a, b) => a.data.pinned! - b.data.pinned!);
}
