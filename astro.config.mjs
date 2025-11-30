import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://send-to-gmail.mindmeld360.com',
  integrations: [mdx()],
  output: 'static',
});
