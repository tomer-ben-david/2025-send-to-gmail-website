import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://quikey.app',
  integrations: [mdx()],
  output: 'static',
});
