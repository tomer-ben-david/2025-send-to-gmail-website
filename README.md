# QuiKey - Website

This is the official website for QuiKey, a macOS right-click enhancement tool.

## Live Website

The website is hosted at: `https://quikey.app`

## About QuiKey

QuiKey is a macOS app that supercharges your Finder and selected-text right-click menus. It adds fast file actions in Finder and AI actions for text in any app.

### Features

- Finder right-click actions: Upload to Drive, Analyze with ChatGPT/Gemini/Claude, Convert to PDF, Compress video
- Selected-text actions: Analyze, Translate, Define, Summarize, Explain, Grammar check (ChatGPT/Gemini/Claude)
- AI Chats with file context, history, and exports
- AI Squads (multi-step workflows across providers)
- OpenRouter model catalog for chats and squads
- Templates, history, and usage statistics inside the app

## Website Structure

Built with [Astro](https://astro.build/).

- `src/pages/` - Page components
- `src/layouts/` - Layout templates
- `src/content/blog/` - Blog posts in Markdown

## Development

### Local Development

1. Clone this repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

### Build

```bash
npm run build
```

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Onboarding Videos

Onboarding videos are distributed via the GitHub release `onboarding-v1` in this repo.
Current assets include:

- `value_demo.mp4`
- `onboarding_drive.mp4`
- `onboarding_pdf.mp4`
- `onboarding_ai.mp4`
- `onboarding_notifications.mp4`
- `onboarding_claude_cli.mp4`

## Community

Stay up to date with QuiKey:

- **Twitter/X**: Follow us on [@sonixvo](https://x.com/sonixvo) for updates and announcements
- **Medium**: Read our articles and tutorials on [Medium](https://medium.com/quikey)

## License

MIT
