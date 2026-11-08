import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.shem.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'github-light' } },
});
