# Cmssy Marketing Template

**Reference implementation of a marketing site template for Cmssy.**

This is an example template showing how to structure blocks and templates for Cmssy. It's designed to be easily submittable to the Cmssy Marketplace, but also works as a standalone reference.

---

## 📖 What is this?

This repo demonstrates:

- ✅ **Template structure** - How to organize blocks and pages
- ✅ **Manifest format** - Package.json schema with `cmssy` section
- ✅ **Build process** - ESBuild bundling for CDN deployment
- ✅ **Best practices** - Naming, versioning, schema fields
- ✅ **Marketplace ready** - Can be submitted to Cmssy Marketplace

**Not a vendor starter!** Vendors submit code through Cmssy UI/API - we host everything on our CDN.

---

## 🏗️ Repository Structure

```
cmssy-marketing-template/
├── packages/
│   └── blocks/
│       └── hero/                 # Example hero block
│           ├── package.json      # Block manifest
│           ├── src/index.tsx     # React component
│           └── README.md
│
├── scripts/
│   ├── build-block.js            # ESBuild bundler
│   ├── build-all.js              # Build all packages
│   └── prepare-cdn.js            # Prepare for CDN deployment
│
├── vercel.json                   # Optional: self-hosting config
└── README.md
```

---

## 📦 Block Manifest Format

Every block needs a `package.json` with a `cmssy` section:

```json
{
  "name": "@cmssy/blocks.hero",
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

| Type | Description | Editor UI |
|---|---|---|
| `string` | Short text (1 line) | Text input |
| `text` | Long text (multiline) | Textarea |
| `number` | Numeric value | Number input |
| `boolean` | True/false | Toggle switch |
| `link` | URL | Link input with validation |
| `image` | Image URL | Image upload/URL |
| `color` | Color value | Color picker |

### Categories

- `marketing` - Hero, CTA, pricing, testimonials
- `typography` - Headings, paragraphs, text blocks
- `media` - Images, videos, galleries
- `layout` - Grids, containers, spacers
- `forms` - Contact forms, newsletter signups

---

## 🚀 Two Ways to Use This

### 1. Submit to Cmssy Marketplace (Recommended)

**For vendors who want to monetize:**

1. **Create your block** following the structure in `packages/blocks/hero/`
2. **Submit through Cmssy UI** (coming soon) or API:
   ```graphql
   mutation {
     submitBlock(input: {
       name: "@your-vendor/blocks.pricing"
       sourceCode: "..."
       manifest: {...}
     }) {
       id
       status  # pending_review
     }
   }
   ```
3. **Cmssy reviews & deploys** to our CDN
4. **Set your price** and earn revenue (80/20 split)
5. **Users install from marketplace** - you get paid!

**Benefits:**
- ✅ Hosted on Cmssy CDN (fast, global)
- ✅ Automatic versioning & updates
- ✅ Marketplace exposure
- ✅ Payment processing handled
- ✅ 80% revenue share

### 2. Self-Host (Advanced Users)

**For developers who want full control:**

1. **Fork this repo** (or use as reference)
2. **Build your blocks**:
   ```bash
   pnpm install
   pnpm build
   ```
3. **Deploy to your CDN** (Vercel, Cloudflare, etc.)
4. **Import directly** in your workspace:
   ```graphql
   mutation {
     importBlock(input: {
       workspaceId: "ws_123"
       componentUrl: "https://your-cdn.com/block.js"
       schemaFields: [...]
     })
   }
   ```

**Benefits:**
- ✅ Full control over hosting
- ✅ No commission fees
- ✅ Private/internal blocks
- ❌ No marketplace exposure
- ❌ Manual updates

---

## 🛠️ Development

### Install Dependencies

```bash
pnpm install
```

### Build a Block

```bash
# Build all blocks
pnpm build

# Build single block
pnpm build:block packages/blocks/hero

# Prepare CDN structure
pnpm prepare-cdn
```

Output: `packages/blocks/hero/dist/index.js` (ESM bundle)

### Test Locally

```bash
# Start dev server (if you have a test workspace)
pnpm dev

# Or build and inspect output
pnpm build
cat packages/blocks/hero/dist/index.js
```

---

## 📄 Example: Hero Block

```tsx
// packages/blocks/hero/src/index.tsx
import React from 'react';

export default function HeroBlock({ content }) {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        {content.badgeText && (
          <span className="badge">{content.badgeText}</span>
        )}

        <h1 className="text-6xl font-bold mb-6">
          {content.heading}
        </h1>

        {content.ctaUrl && (
          <a href={content.ctaUrl} className="btn-primary">
            {content.ctaText || 'Get Started'}
          </a>
        )}
      </div>
    </section>
  );
}
```

**Key points:**
- Uses Tailwind CSS (available in Cmssy workspaces)
- Receives `content` prop with user-editable fields
- Handles optional fields gracefully
- Self-contained component

---

## 🌐 CDN Structure (Self-Hosted)

If you're self-hosting, the `prepare-cdn.js` script creates:

```
public/
└── @cmssy/
    └── blocks.hero/
        └── 1.0.0/
            ├── index.js
            └── index.js.map
```

Deploy the `public/` directory to any static host:
- Vercel (`vercel deploy`)
- Cloudflare Pages
- AWS S3 + CloudFront
- Netlify

Blocks will be accessible at:
```
https://your-cdn.com/@cmssy/blocks.hero/1.0.0/index.js
```

---

## ✅ Requirements

- **Node.js** 18+
- **pnpm** 8+
- **React knowledge** (for building blocks)

Optional for self-hosting:
- **Vercel/Cloudflare account**
- **CDN setup**

---

## 📚 Learn More

- **Cmssy Docs**: [docs.cmssy.io](https://docs.cmssy.io) (coming soon)
- **Marketplace Guide**: Submit blocks through platform UI
- **API Reference**: GraphQL schema for programmatic submission

---

## 🤝 Support

- **Email**: hello@cmssy.com
- **Discord**: [cmssy.com/discord](https://cmssy.com/discord)
- **Issues**: [GitHub Issues](https://github.com/maciekbe1/cmssy-marketing-template/issues)

---

## 🔒 License

MIT - Free to use as reference or fork for your own templates.

---

Built with ❤️ by the Cmssy team
