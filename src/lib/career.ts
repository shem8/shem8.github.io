import { getCollection } from 'astro:content';

export const allJobs = async () => (await getCollection('career')).sort((a, b) => b.data.start.localeCompare(a.data.start));
