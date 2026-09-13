# KUNALISTIC — Unified Digital Utility Platform

**Primary Domain:** [https://kunalistic.io](https://kunalistic.io)  
**Primary Tagline:** *"One place. Every little tool."*  
**Secondary Positioning:** *"Your digital toolbox."*

---

## 1. Product Vision & Philosophy

**Kunalistic** is a unified digital utility ecosystem containing a rapidly growing collection of useful micro-applications. Instead of navigating dozens of ad-riddled, untrustworthy websites for small digital tasks, Kunalistic provides all of them within one cohesive, editorial-grade platform.

- **Privacy-First In-Browser Processing:** Files are processed locally inside the user's browser using HTML5 Canvas and `pdf-lib`. Images and confidential documents are never uploaded to our servers.
- **Zero Subscriptions:** No monthly plans, no annual plans, no Pro badges, no paywalls, and no forced logins for basic tools.
- **Voluntary Creator Support:** Users who find genuine value can voluntarily support the creator at `/support` (preset amounts: ₹49, ₹99, ₹199, ₹499, or custom).
- **Strict Brand Identity:** The entire design system is strictly constructed from two official colors:
  - **Champion Blue:** `#151130`
  - **Lavender Tonic:** `#C8BEFA`
  *(All surfaces, borders, states, and typography derive exclusively from opacity/contrast variations of this palette).*

---

## 2. Tech Stack

- **Framework:** Next.js 16.3.5 (App Router, Server Components, Route Handlers)
- **UI & Runtime:** React 19.2.8, TypeScript (strict mode), Node.js 26.x
- **Styling:** Tailwind CSS 4.x with custom design tokens mapped in `app/globals.css`
- **Iconography:** Lucide React (dynamically rendered via `DynamicIcon`)
- **Client-Side File Processing:** `pdf-lib` for PDF operations, HTML5 Canvas / OffscreenCanvas for image conversions, resizing, and compression
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) policies (DDL in `lib/supabase/schema.sql`)
- **Package Manager:** `pnpm`

---

## 3. Modular Micro-App Architecture & Tool Registry

Tools are registered centrally in `lib/registry/index.ts`. To add a new micro-app to Kunalistic:
1. Implement your component in `components/tools/<category>/YourTool.tsx`.
2. Map it in `components/tools/ToolDispatcher.tsx`.
3. Add the tool metadata entry to `TOOL_REGISTRY` in `lib/registry/index.ts`.

It automatically appears in:
- Global Search (`Ctrl + K` / `Cmd + K`)
- Dedicated dynamic route `/tools/<slug>` with auto-generated SEO metadata & JSON-LD schema
- Category pages (`/categories/<category>`)
- Homepage popular/trending feeds
- Related utilities drawers
- Dynamic `sitemap.xml`

---

## 4. 19 MVP Tools Implemented

| Category | Slug | Name | Description |
|---|---|---|---|
| **Image** | `image-compressor` | Image Compressor | Client-side compression with quality slider & savings % |
| **Image** | `image-converter` | Image Converter | In-browser conversion between PNG, JPG, and WEBP |
| **Image** | `image-resizer` | Image Resizer | Scale dimensions with aspect ratio lock & scale presets |
| **Image** | `jpg-to-png` | JPG to PNG | Direct lossless PNG export |
| **Image** | `png-to-jpg` | PNG to JPG | Compact JPG export with custom background fill |
| **PDF** | `jpg-to-pdf` | JPG to PDF | Assemble multiple photos into a single PDF document |
| **PDF** | `pdf-to-jpg` | PDF to JPG | Client-side PDF page extraction into high-DPI JPGs |
| **PDF** | `merge-pdf` | Merge PDF | Combine multiple PDFs with custom ordering via `pdf-lib` |
| **PDF** | `split-pdf` | Split PDF | Extract page intervals (e.g. 1-3, 5) into a new PDF |
| **Developer** | `json-formatter` | JSON Formatter | Indent (2-space, 4-space, tabs), beautify, minify & copy |
| **Developer** | `json-validator` | JSON Validator | Syntax verification, line/column tracking & auto-repair |
| **Text** | `word-counter` | Word Counter | Words, characters, reading speed, and keyword density |
| **Text** | `character-counter`| Character Counter | Byte size & live social limit trackers (X, IG, LinkedIn) |
| **Student** | `percentage-calculator` | Percentage Calculator | 5 calculation modes with mathematical formula working |
| **Student** | `age-calculator` | Age Calculator | Chronological age, next birthday countdown & milestones |
| **Student** | `unit-converter` | Unit Converter | Universal multi-domain converter (Length, Mass, Temp, etc.) |
| **Creator** | `viral-reel-idea-generator`| Viral Reel Idea Gen | Flagship AI tool: Hooks, scene blueprints, captions & CTA |
| **Creator** | `viral-hook-generator`| Viral Hook Generator | 10+ psychological hooks categorized by proven frameworks |
| **Creator** | `caption-generator` | Caption Generator | Formatted social captions with emojis & tiered hashtags |

---

## 5. Local Setup Instructions

### Prerequisites
- Node.js 24+ (Node 26 recommended)
- `pnpm` (version 12+)

### Installation
```bash
# 1. Clone repository & enter directory
cd kunalistic

# 2. Install dependencies
pnpm install

# 3. Copy environment configuration
cp .env.example .env.local

# 4. Start development server
pnpm dev --port 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Environment Variables (`.env.local`)

```env
# Application URL
NEXT_PUBLIC_APP_URL=https://kunalistic.io

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sbp_your_key
SUPABASE_SECRET_KEY=sbs_your_service_key

# AI Provider Configuration (default: heuristics)
AI_PROVIDER=heuristics
AI_MODEL=gpt-4o-mini
AI_API_KEY=

# Voluntary Support Payment Provider (default: simulator)
PAYMENT_PROVIDER=simulator
PAYMENT_PUBLIC_KEY=rzp_live_public_key
PAYMENT_SECRET_KEY=secret_key
PAYMENT_WEBHOOK_SECRET=webhook_secret

# Privacy Analytics
ANALYTICS_ENABLED=true
```

---

## 7. Supabase Database Setup

To configure Supabase:
1. Create a new Supabase project.
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `lib/supabase/schema.sql` and run the script.
4. Row Level Security (RLS) will automatically protect user favorites, history, saved outputs, and supporter transactions.

---

## 8. Deployment (Vercel)

1. Push your code to your GitHub repository.
2. Import the project in Vercel.
3. Set the Framework Preset to **Next.js**.
4. Configure Environment Variables matching `.env.example`.
5. Deploy! Vercel will automatically build the 58+ prerendered static pages and edge-ready API routes.
