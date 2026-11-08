import { existsSync } from 'node:fs';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A date can be as precise as you know it: "2024", "2024-12" or "2024-12-01".
const looseDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)),
  z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'Use YYYY, YYYY-MM or YYYY-MM-DD'),
);

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    path: z.string().optional(), // only old posts need this; new ones get /blog/YYYY/MM/DD/slug/
    categories: z.array(z.string()).default([]),
    description: z.string().optional(),
    pinned: z.number().optional(), // keeps the post on the home page; 1 comes first
    draft: z.boolean().default(false), // visible in npm run dev, left out of the published site
    url: z.string().url().optional(), // the post lives on another site
    source: z.string().optional(), // that site's name
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: looseDate,
    event: z.string().optional(),
    location: z.string().optional(),
    video: z.string().url().optional(),
    slides: z.string().url().optional(),
    pinned: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(), // lower comes first
    image: z.string().refine((p) => existsSync(`public${p}`), { message: 'Image not found. Put it in public/images/projects/' }),
    link: z.string().url().optional(),
  }),
});

const press = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/press' }),
  schema: z.object({
    title: z.string(),
    group: z.enum(['appearances', 'side-projects', 'wilco', 'startup-world']),
    url: z.string().url(),
    source: z.string().optional(),
    date: looseDate.optional(),
    outlet: z.string().optional(), // listed under Press on the home page
    pinned: z.number().optional(), // shown on the home page; 1 comes first
  }),
});

const career = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/career' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dates: z.string(), // shown as written, on the Career page only
    start: z.string(), // YYYY-MM, sets the order
    exit: z.string().optional(), // such as "Acquired by AVG"
  }),
});

export const collections = { posts, talks, projects, press, career };
