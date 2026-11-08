#!/usr/bin/env node
// npm run new post "My title"     npm run new talk "My title"
// npm run new project "My title"  npm run new press "My title"
// npm run new job "Company"
import { mkdirSync, writeFileSync } from 'node:fs';

const [kind, ...words] = process.argv.slice(2);
const title = words.join(' ').trim();
const today = new Date().toISOString().slice(0, 10);
const slug = title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const q = JSON.stringify(title);

const templates = {
  post: [`src/content/posts/${today}-${slug}.md`, `---
title: ${q}
date: "${today}"
categories: [] # any of: android, humor, kotlin, life, publicspeaking, web, or a new one
# draft: true  # uncomment to hide it from the published site
---

The first paragraph shows up as the excerpt in lists.

<!-- more -->

The rest of the post. Put images in public/images/ and use ![description](/images/name.jpg).
`, 'New posts go to the top of the home page for a year.'],
  talk: [`src/content/talks/${slug}.md`, `---
title: ${q}
date: "${today}" # YYYY-MM-DD for a scheduled talk. YYYY-MM or YYYY is fine for old ones.
event: "Event name"
location: "City"
# video: "https://www.youtube.com/watch?v=..."
# slides: "https://..." # the embed link for the deck
---

The abstract, in Markdown.

#### As presented at:

- [Event name](https://example.com) (City), Month Year
`, 'A future date puts it on the yellow ticket until that day passes.'],
  project: [`src/content/projects/${slug}.md`, `---
title: ${q}
order: 5 # lower comes first; the first five are on the home page
image: "/images/projects/${slug}.jpg"
link: "https://example.com" # delete this line if there is no link
---

One short paragraph. The first sentence is what the home page shows.
`, `Add the screenshot at public/images/projects/${slug}.jpg (8:5 works best).`],
  press: [`src/content/press/${slug}.yaml`, `title: ${q}
group: appearances # appearances, side-projects, wilco or startup-world
url: "https://example.com"
source: "on Some Podcast"
date: "${today.slice(0, 7)}"
outlet: "Some Podcast" # the name listed on the home page
# pinned: 1 # show it on the home page; 1 comes first
`, ''],
  job: [`src/content/career/${slug}.md`, `---
company: ${q}
role: "Your role"
dates: "Mon YYYY – present" # shown as written on the Career page
start: "${today.slice(0, 7)}" # sets the order
# exit: "Acquired by Someone"
---

What you did there.
`, ''],
};

const t = templates[kind];
if (!t || !slug) {
  console.error('Usage: npm run new <post|talk|project|press|job> "Title"');
  process.exit(1);
}
const [file, body, tip] = t;
mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
try {
  writeFileSync(file, body, { flag: 'wx' });
} catch {
  console.error(`${file} already exists.`);
  process.exit(1);
}
console.log(`Created ${file}${tip ? `\n${tip}` : ''}\nPreview with npm run dev, publish with npm run deploy.`);
