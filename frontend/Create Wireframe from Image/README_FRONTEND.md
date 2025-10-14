# EventAI Frontend

This is the main UI for the EventAI application, built with React, TypeScript, Vite, and Radix UI components.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form handling
- **Lucide React** - Icons

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

### Development Server

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### API Connection

The Vite dev server is configured to proxy API requests to the backend:
- Frontend: `http://localhost:3000` (or 3001 if 3000 is in use)
- Backend API: `http://localhost:5001`
- All `/api/*` requests are proxied to the backend

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Radix-based)
│   ├── figma/          # Figma-generated components
│   ├── EventAIPage.tsx
│   ├── LoginPage.tsx
│   ├── PreferencesPage.tsx
│   ├── SchedulePage.tsx
│   ├── SingleEventPage.tsx
│   └── VendorMarketplacePage.tsx
├── styles/             # Global styles
├── guidelines/         # Design guidelines
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global CSS
```

## Notes

- This frontend uses Vite instead of Create React App for faster builds and HMR
- UI components are built with Radix UI primitives for accessibility
- The proxy configuration in `vite.config.ts` handles API calls to the backend
