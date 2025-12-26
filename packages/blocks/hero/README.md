# Hero Block

Modern hero section with gradient background, animated orbs, and social proof.

## Features

- ✨ Gradient background with animated orbs
- 🎨 Customizable badge, heading, and subheading
- 🔗 Two CTA buttons (primary & secondary)
- 👥 Social proof section
- 🌙 Dark mode support
- 📱 Fully responsive

## Preview

![Hero Block Preview](https://cdn.cmssy.com/@cmssy/blocks.hero/1.0.0/preview.png)

## Installation

Via marketplace:
```graphql
mutation {
  installPackage(input: {
    packageSlug: "@cmssy/blocks.hero"
    version: "1.0.0"
    workspaceId: "your-workspace-id"
  }) {
    success
    message
  }
}
```

## Editable Fields

- **Badge Text**: Small label above heading
- **Heading**: Main heading text (first line)
- **Heading Highlight**: Second line with gradient effect
- **Subheading**: Description below heading
- **Primary Button Text & URL**: Main CTA button
- **Secondary Button Text & URL**: Secondary CTA button
- **Social Proof Count & Text**: User count and description

## Dependencies

- React 18+
- Tailwind CSS (required for styling)
- Lucide React icons (embedded as SVG)

## License

MIT
