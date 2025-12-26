# Cmssy Marketplace - Vendor Starter Template

**Starter template for publishing blocks to the Cmssy marketplace.**

Vendors fork this repo, deploy to their own CDN (Vercel), and register packages via GraphQL API.

---

## 🚀 Quick Start (For Vendors)

### 1. Fork this repository

```bash
gh repo fork maciekbe1/cmssy-marketplace --clone
cd cmssy-marketplace
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Customize your block

```bash
cd packages/blocks/hero

# Edit package.json
# - Change @cmssy to @your-vendor
# - Update description, version, fields

# Edit src/index.tsx
# - Build your React component
```

### 4. Build locally

```bash
pnpm build
```

Your block compiles to `packages/blocks/hero/dist/index.js` (ESM format).

### 5. Deploy to Vercel

```bash
# Link to your Vercel account
vercel link

# Deploy
git add .
git commit -m "feat: add my block"
git push

# Vercel auto-deploys on push to main
```

Your block is now live at:
```
https://your-project.vercel.app/@your-vendor/blocks.hero/1.0.0/index.js
```

### 6. Register in Cmssy

Call the Cmssy GraphQL API to add your block to the marketplace:

```graphql
mutation {
  registerPackage(input: {
    slug: "@your-vendor/blocks.hero"
    version: "1.0.0"
    componentUrl: "https://your-cdn.vercel.app/@your-vendor/blocks.hero/1.0.0/index.js"
    vendorId: "your-vendor-id"
    vendorCdnBase: "https://your-cdn.vercel.app"
    schemaFields: [...]
    defaultContent: {...}
  }) {
    packageId
    status
  }
}
```

Your block is now in the marketplace! 🎉

---

## 📦 Package Structure

```
packages/blocks/hero/
├── package.json      # Block manifest
├── src/
│   └── index.tsx     # React component
├── dist/             # Built output (gitignored)
└── README.md
```

## 📄 Package Manifest (package.json)

Every block needs a `package.json` with a `cmssy` section:

```json
{
  "name": "@your-vendor/blocks.hero",
  "version": "1.0.0",
  "description": "Hero section with heading and CTA",
  "cmssy": {
    "packageType": "block",
    "category": "marketing",
    "tags": ["hero", "landing", "cta"],
    "schemaFields": [
      {
        "key": "heading",
        "type": "text",
        "label": "Main Heading",
        "required": true
      },
      {
        "key": "ctaText",
        "type": "string",
        "label": "CTA Button Text"
      },
      {
        "key": "ctaUrl",
        "type": "link",
        "label": "CTA URL"
      }
    ],
    "defaultContent": {
      "heading": "Welcome to our site",
      "ctaText": "Get Started",
      "ctaUrl": "/signup"
    },
    "pricing": {
      "licenseType": "free"
    }
  }
}
```

### Schema Field Types

| Type | Description | UI Component |
|---|---|---|
| `string` | Short text | Text input |
| `text` | Long text | Textarea |
| `number` | Number | Number input |
| `boolean` | True/false | Toggle |
| `link` | URL | URL input |
| `image` | Image URL | Image upload |
| `color` | Color | Color picker |

### Categories

- `marketing` - Hero, CTA, pricing, testimonials
- `typography` - Headings, text blocks
- `media` - Images, videos, galleries
- `layout` - Grids, containers, spacers
- `forms` - Contact forms, newsletter signups

## 🛠️ Build Scripts

```bash
# Build all blocks
pnpm build

# Build single block
pnpm build:block packages/blocks/hero

# Prepare CDN structure (copies dist/ to public/)
pnpm prepare-cdn
```

## 🌐 CDN Structure

After deployment, your blocks will be available at:

```
https://your-cdn.vercel.app/@vendor/blocks.name/version/index.js
```

**Example**:
```
https://acme-blocks.vercel.app/@acme/blocks.pricing/1.0.0/index.js
```

The `prepare-cdn.js` script creates this structure:
```
public/
└── @your-vendor/
    └── blocks.hero/
        └── 1.0.0/
            ├── index.js
            └── index.js.map
```

## 🔧 Vercel Configuration

The included `vercel.json` configures:
- Public directory: `public/`
- Build command: `pnpm build`
- CORS headers: `Access-Control-Allow-Origin: *`
- Cache headers: `max-age=31536000, immutable`

No changes needed - just deploy!

## ✅ Requirements

- **Node.js** 18+
- **pnpm** 8+
- **Vercel account** (free tier works)
- **Cmssy vendor API key** (request at vendors@cmssy.com)

## 🎨 Example Blocks

This repo includes a hero block as reference:

```tsx
// packages/blocks/hero/src/index.tsx
import React from 'react';

export default function HeroBlock({ content }) {
  return (
    <section className="hero">
      <h1>{content.heading}</h1>
      <a href={content.ctaUrl}>{content.ctaText}</a>
    </section>
  );
}
```

Study `packages/blocks/hero/` for a complete example.

## 📚 Documentation

- **Vendor Guide**: Coming soon
- **API Reference**: [docs.cmssy.io/api](https://docs.cmssy.io/api)
- **Examples**: Check `/packages/blocks/hero/`

## 🤝 Support

- **Email**: vendors@cmssy.com
- **Discord**: [cmssy.com/discord](https://cmssy.com/discord)
- **Docs**: [docs.cmssy.io](https://docs.cmssy.io)

## 📝 For @cmssy Team

This repo also serves as the official @cmssy blocks repository. We use it to:
- Publish official blocks (@cmssy/blocks.*)
- Test the vendor workflow
- Dogfood marketplace features

Our blocks are deployed to: `https://cmssy-marketplace.vercel.app`

---

## 🔒 License

MIT

Built with ❤️ by the Cmssy team
