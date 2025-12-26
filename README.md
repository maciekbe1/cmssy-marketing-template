# Cmssy Marketplace

Blocks and templates for Cmssy CMS, deployed to **Vercel CDN**.

## 🏗️ Architecture

```
Git Repo (cmssy-marketplace)
  → GitHub Actions on tag push
  → Build blocks to ESM bundles
  → Deploy to Vercel
  → CDN URLs: https://cdn.cmssy.com/@cmssy/blocks.hero/1.0.0/
  → Register in MongoDB via GraphQL API
```

## 📦 Package Structure

```
packages/
├── blocks/
│   └── hero/
│       ├── package.json       # Manifest with cmssy section
│       ├── src/
│       │   ├── index.tsx      # React component
│       │   └── index.css      # Styles
│       └── dist/              # Build output
│
└── templates/
    └── marketing-saas/
        ├── package.json
        └── pages/             # Page blueprints
```

## 🚀 Development

### Install Dependencies

```bash
pnpm install
```

### Build a Block

```bash
cd packages/blocks/hero
pnpm build
```

### Deploy

Tag and push to trigger CI/CD:

```bash
git tag blocks/hero@1.0.0
git push --tags
```

GitHub Actions will:
1. Build the block
2. Deploy to Vercel
3. Update MongoDB catalog

## 📋 Creating a New Block

1. Create package directory:
```bash
mkdir -p packages/blocks/my-block/src
```

2. Add `package.json` with manifest (see hero block example)

3. Create component in `src/index.tsx`

4. Build and test locally:
```bash
cd packages/blocks/my-block
pnpm build
```

5. Tag and deploy:
```bash
git add .
git commit -m "feat(blocks): add my-block"
git tag blocks/my-block@1.0.0
git push --tags
```

## 🔗 CDN URLs

Blocks are accessible at:
```
https://cdn.cmssy.com/@cmssy/blocks.<name>/<version>/index.js
https://cdn.cmssy.com/@cmssy/blocks.<name>/<version>/index.css
```

## 📚 Documentation

See [Linear Document](https://linear.app/cmssy/document/marketplace-architecture-implementation-plan-6347041d6b91) for full technical specification.

## 🔒 License

MIT
