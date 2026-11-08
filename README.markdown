# blog.shem.dev

Shem Magnezi's site, built with [Astro](https://astro.build). Source lives on this branch; `master` holds the generated site that GitHub Pages serves.

## Adding things

Every post, talk, project and press item is one small file. This creates it from a template with the fields explained:

```
npm run new post "My new post"
npm run new talk "My new talk"
npm run new project "My new project"
npm run new press "An interview about something"
npm run new job "Company"
```

Then `npm run dev` to preview at http://localhost:4321, and `npm run deploy` to publish. If a field is wrong, the build stops and says which file and why.

To change something that exists, edit its file:

| What | Where |
|---|---|
| Posts | `src/content/posts/` |
| Talks | `src/content/talks/` |
| Side projects | `src/content/projects/` (`order` sets the position, lower comes first) |
| Press | `src/content/press/` |
| Career page | `src/content/career/` |
| Career on the home page | `src/data/career-highlights.json` |

## How the home page chooses

The home page should look right even when nothing is new.

- **Posts and talks:** anything from the last year comes first, then items with `pinned: 1`, `pinned: 2` and so on. Dates aren't shown.
- **Yellow ticket:** appears by itself when a talk has a future date in `YYYY-MM-DD` form, and disappears the day after, even without a deploy.
- **Side projects:** the first five by `order`.
- **Press:** items with `pinned`, then every other `outlet` as a line of names.

To preview the site as if it were another date: `SITE_NOW=2027-01-10 npm run dev`.

## Other things to know

- `public/.nojekyll` must stay. Without it, GitHub Pages skips the `_astro` folder and the site loses its styles.
- A post with `draft: true` shows in `npm run dev` but is left out of the published site.
- A post with `url:` and `source:` links to another site instead of having its own page.
- Old posts keep their original address through `path`. New posts get `/blog/YYYY/MM/DD/slug/` from the file name. Disqus threads are keyed to `http://blog.shem.dev` plus that path, so don't change it on a published post.
- Scripted motion is in `src/scripts/motion.ts`, the rest is at the end of `src/styles/global.css`. All of it switches off for people who ask for reduced motion.
