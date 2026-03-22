# OutreachIQ — GTM Agent by ThinklyLabs

## What I Built

A purpose-built GTM agent chatbot with **4 intelligent modes**: Lead Scoring, Outreach Email Generation, Sales Brief Generation, and ICP Matching.

Built specifically inspired by ThinklyLabs' philosophy: **"We don't pitch AI. We install it."**

The bot is powered by a **synthetic multivariate knowledge base** — 20 scored leads, 12 outreach templates with performance metrics, weighted ICP dimensions, and 12 company intelligence profiles — all fed as structured RAG context to Gemini.

## Why This Topic

ThinklyLabs builds GTM automation agents. I built their product back to them as a demo — showing I understand not just the tech but the actual use case.

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Frontend      | React 19 + Tailwind CSS 3          |
| AI Model      | Gemini 2.0 Flash (`@google/generative-ai`) |
| Knowledge Base| Synthetic multivariate RAG data     |
| Deployment    | Vercel                              |

## Features

### 4 Purpose-Built Modes

1. **🎯 Lead Scorer** — Paste lead info → get score/10 with reasoning + color-coded verdict
2. **✉️ Outreach Email** — Input prospect details → personalized cold email with subject, body, CTA
3. **📋 Sales Brief** — Input company name → full sales brief with pain points, positioning, talking points
4. **🔍 ICP Matcher** — Describe a lead → match percentage with dimension breakdown

### Synthetic Multivariate Training Data

- **20 leads × 8 features** (industry, size, tools, pain points, decision maker, funding, etc.)
- **12 email templates × 5 metrics** (open rate, reply rate, conversion, personalization, tone)
- **6 weighted ICP dimensions** with ideal/partial scoring ranges
- **12 company profiles × 6 attributes** (tech stack, recent news, key challenges)

### UX Details

- Dark theme with electric blue (#3B82F6) accents
- Keyboard shortcuts: Enter to send, Shift+Enter for newline
- Character count, timestamps on messages
- Copy button on every AI response
- Loading animation (typing dots)
- Error state with retry button
- Empty state with example prompt button
- Mobile responsive (collapsible sidebar)

## How To Run

### 1. Clone & Install

```bash
git clone <repo-url>
cd OutreachIQ
npm install
```

### 2. Set API Key

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

## Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variable: `VITE_GEMINI_API_KEY` = your key
4. Deploy!

## Project Structure

```
OutreachIQ/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind theme & animations
├── postcss.config.js       # PostCSS config
├── vercel.json             # Vercel SPA rewrites
└── src/
    ├── main.jsx            # React entry point
    ├── index.css           # Tailwind directives + custom styles
    ├── App.jsx             # Main application component
    └── knowledgeBase.js    # Synthetic multivariate RAG data
```
