# KuNaListic 🚀
> Premium Full-Stack Web App Showcase, Custom Client Request Pipeline & Admin Control Panel.

Built with **Next.js 15 (App Router)**, **Neon Serverless PostgreSQL**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Features Overview

### 1. 🚀 Web Apps Showcase
- **Curated Applications Catalog**: Live showcase of production web applications (e.g. SpotAPI, OpenMontage, Ratnadeep Care, 5ONG Studio).
- **Interactive Filtering**: Filter by category (*SaaS / DevOps*, *Creator / Media*, *Healthcare / ERP*, *AI / Music*, etc.) with animated layout tabs.
- **Instant Reactive Search**: Filter apps by title, summary, keyword, or tech stack chips in real time.
- **App Details Modal**: Inspect architecture highlights, key features, technology badges, live site links, and GitHub repository links.
- **Interactive Upvotes / Likes**: Instant optimistic upvote counter with particle confetti burst effects.
- **Telemetry**: Live view counters and like counters tracked in PostgreSQL.

### 2. ✨ Custom App Request System
- **Client Commissioning Form**: Allows visitors and clients to submit detailed project briefs.
- **Structured Fields**:
  - Client Name, Email, Organization
  - Working Project Title
  - Project / Service Type (*3D Animation*, *Motion Graphics*, *Web Design*, *SaaS Development*, *3D Design*, *Web Development*, etc.)
  - Interactive Budget Tiers (*<$500*, *$500 - $1,500*, *$1,500 - $5,000*, *$5,000+*)
  - Timeline estimates & Reference design links
- **Submission Feedback**: Confetti celebration and a **Reference Tracking ID** receipt.

### 3. 🛡️ Admin Control Panel (`/admin`)
- **Secure Passcode Gate**: Instant frictionless login with master passcode.
  - **Default Passcode**: `kunalistic-admin-2026` (configurable in `.env.local`).
- **Overview & Telemetry**:
  - Live metric cards (Total Apps, Featured Apps, Client Inquiries, Pending Inquiries, Cumulative Views, Total Upvotes).
- **Apps Catalog Management**:
  - **Create New App**: Modal form to add title, slug, tagline, description, category, tags, live URL, GitHub URL, thumbnail, tech stack, and featured status.
  - **Edit App**: Update any existing application.
  - **Delete App**: Remove applications with one click.
- **Client Requests Pipeline**:
  - Filter requests by status (*Pending*, *Reviewing*, *Accepted*, *In Progress*, *Completed*, *Declined*).
  - Inspect client contact information, scope, budget, and timeline.
  - Update status and priority (*Low*, *Normal*, *High*, *Urgent*).
  - Add **Private Admin Notes & Milestones** directly into PostgreSQL.
- **Neon Cloud DB Diagnostics**:
  - Live database cluster status, connection pool info, and table schemas.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 19, TypeScript, App Router)
- **Database**: [Neon](https://neon.tech) Serverless PostgreSQL (`@neondatabase/serverless`)
- **Animations & Motion**: Framer Motion & Canvas Confetti
- **Styling**: Tailwind CSS & Glassmorphism design system
- **Icons**: Lucide React & Custom SVG Icons

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables** (`.env.local`):
   ```env
   DATABASE_URL="postgresql://neondb_owner:password@ep-xyz.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ADMIN_SECRET_KEY="kunalistic-admin-2026"
   NEXT_PUBLIC_APP_NAME="KuNaListic"
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the showcase.
   Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin Control Panel.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## 🔑 Admin Credentials
- **URL**: `http://localhost:3000/admin`
- **Passcode**: `kunalistic-admin-2026`
