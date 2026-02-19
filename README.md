# MrHutch

Premium Next.js web-app voor warme, luxe baby/kraamcadeau-creaties..

## Stack
- Next.js 14 (App Router) + TypeScript
- TailwindCSS
- Framer Motion
- OpenAI API routes met mock fallback

## Install
```bash
npm install
```

## Environment variables
Maak `.env.local`:
```bash
OPENAI_API_KEY=your_key_here
```

## Run dev
```bash
npm run dev
```
Open: `http://localhost:3000`

## Mock mode (altijd werkend)
Als `OPENAI_API_KEY` ontbreekt:
- `/api/chat` geeft warme mock antwoorden terug
- `/api/image` geeft 4 placeholder afbeeldingen terug

Zo blijft de volledige UX functioneel tijdens development/demo.

## Routes
- `/` landing met hero, how it works, voorbeelden, FAQ
- `/create` 2-fase wizard (chat + generator)
- `/gallery` localStorage grid + detail/download
- `/about` vertrouwen pagina
- `/privacy` privacy samenvatting

## Architectuur
- `app/` routes + API handlers
- `components/ui/` design system basis (Button, Card, Input, Badge, Modal, Toast)
- `components/create/` wizard UI
- `lib/` prompt builder, storage utils, types, mocks

## OpenAI details
- Chat model: `gpt-4o-mini` in `POST /api/chat`
- Image model: `gpt-image-1` in `POST /api/image`
- Signatuur stijl + conceptvariaties in `lib/prompt-builder.ts`
