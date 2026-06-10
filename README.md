# Homis

A full-stack real-time messaging application inspired by Discord. Create servers, organize channels, chat with others, and jump into voice/video calls — all in one place.

**Live:** [https://homis.onrender.com](https://homis.onrender.com)

---

## Features

- **Servers & Channels** — Create servers, invite members, and organize conversations into text, audio, and video channels
- **Real-time Messaging** — Instant messaging powered by Socket.io with fallback polling
- **Voice & Video Calls** — In-channel video/audio rooms via Jitsi Meet (no account required)
- **Role Management** — Three-tier role system: Admin, Moderator, and Member with granular permissions
- **File Uploads** — Share images and PDFs in conversations via UploadThing
- **Message Actions** — Edit and delete your own messages in real time
- **Authentication** — Secure sign-up and sign-in powered by Clerk
- **Light & Dark Mode** — Full theme support across all UI components
- **Responsive Design** — Mobile-friendly layout with collapsible sidebars

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| Auth | Clerk |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Real-time | Socket.io |
| Video/Audio | Jitsi Meet (iframe) |
| File Uploads | UploadThing |
| UI | shadcn/ui + Tailwind CSS + Radix UI |
| State | Zustand |
| Deployment | Render |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account
- A [Supabase](https://supabase.com) project (PostgreSQL)
- An [UploadThing](https://uploadthing.com) account

### Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Aaryan123456679/Homis.git
   cd Homis
   ```

2. **Install dependencies**
   ```bash
   nvm use 18
   npm install
   ```

3. **Set up environment variables** — copy `.env.example` to `.env` and fill in your keys:
   ```bash
   cp .env.example .env
   ```

   | Variable | Where to get it |
   |---|---|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → API Keys |
   | `CLERK_SECRET_KEY` | Clerk dashboard → API Keys |
   | `DATABASE_URL` | Supabase → Project Settings → Database |
   | `UPLOADTHING_SECRET` | UploadThing dashboard |
   | `UPLOADTHING_APP_ID` | UploadThing dashboard |

4. **Push the database schema**
   ```bash
   npx prisma db push
   ```

5. **Start the dev server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Sign-in / sign-up pages
│   ├── (main)/             # Main app layout (servers, channels, DMs)
│   └── (setup)/            # First-time server creation
├── components/
│   ├── chat/               # Message list, input, file upload
│   ├── modals/             # All dialog modals (create server, manage members, etc.)
│   ├── navigation/         # Left sidebar server navigation
│   ├── server/             # Server header, channel list, member list
│   └── ui/                 # shadcn/ui base components
├── hooks/                  # Zustand modal store, custom hooks
├── lib/                    # Prisma client, utility functions
├── pages/api/socket/       # Socket.io server (Pages Router API route)
└── prisma/                 # Database schema
```

---

## Deployment

The app is deployed on [Render](https://render.com) using the included `render.yaml`. It connects to a Supabase PostgreSQL database via the connection pooler.

Key environment variables required in Render:
- All variables from `.env.example`
- `NEXT_PUBLIC_SITE_URL` set to your Render service URL

After deploying, add your Render domain to **Clerk → Domains** to enable authentication on the live URL.
