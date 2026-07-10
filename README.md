# ⚽ GoalPulse Dashboard — Real-Time Football Intelligence

GoalPulse is a high-performance, real-time sports intelligence platform built for the **Superteam Earn: TxLINE Hackathon 2026**.

Powered by **TxLINE's cryptographically verifiable sports data layer on Solana**, GoalPulse tracks, filters, and analyzes live FIFA World Cup match data to generate autonomous, high-confidence trading signals for decentralized applications.

Featuring a sleek **Cyberpunk-inspired UI** with neon aesthetics, GoalPulse bridges high-speed sports data ingestion with actionable AI-powered insights.

---

# 🚀 Features

### ⚡ Real-Time Match Intelligence

- Stream live FIFA World Cup match data from TxLINE.
- Monitor scores, match minutes, game status, and key events.
- Receive updates with minimal latency.

### 🤖 AI Recommendation Agent

The built-in **Sharp Movement Detector** continuously analyzes:

- Live odds movement
- Ball possession changes
- Match incidents (red cards, penalties, injuries)
- Match momentum

Every 60 seconds, the agent produces a recommendation:

- 🟢 BUY
- 🟡 WATCH
- 🔴 SELL

### 📊 Live Odds Monitoring

Visualize consensus market odds:

- Home Win
- Draw
- Away Win

Data is sourced directly from the TxLINE ecosystem.

### 📜 Deterministic Signal Log

Every generated signal includes:

- Timestamp
- Confidence score
- Recommendation
- Supporting market indicators

ensuring complete transparency and auditability.

---

# 🛠 Tech Stack

| Layer       | Technology           |
| ----------- | -------------------- |
| Framework   | Next.js (App Router) |
| Frontend    | React                |
| Styling     | Tailwind CSS         |
| Theme       | Cyberpunk / Neon UI  |
| Language    | TypeScript           |
| Sports Data | TxLINE API           |
| Blockchain  | Solana Devnet        |

---

# 📋 Hackathon Requirements

## 💡 Project Overview

GoalPulse is designed for:

- Sports prediction markets
- SportsFi applications
- Autonomous trading agents
- Market makers
- Web3 betting infrastructure

Instead of relying on manual analysis, GoalPulse continuously evaluates live market conditions and generates machine-readable trading signals that can be consumed by users or autonomous smart contracts.

---

# 🔌 TxLINE APIs Used

| Endpoint            | Purpose                           |
| ------------------- | --------------------------------- |
| `/auth/guest/start` | Guest authentication              |
| `/api/matches`      | Live & upcoming World Cup matches |

---

# 🚀 Getting Started

## Prerequisites

- Node.js 20+
- npm
- Git

---

## Installation

Clone the repository:

```bash
git clone https://github.com/linnbenton/goalpulse.git

cd goalpulse
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
TXODDS_JWT=your_activated_jwt_token

TXODDS_API_TOKEN=your_activated_api_token

NEXT_PUBLIC_TXLINE_ORIGIN=https://txline-dev.txodds.com
```

> During TxLINE Devnet maintenance, the application includes a secure fallback mechanism to keep the UI functional for local development.

---

## Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🧠 Signal Engine

GoalPulse evaluates multiple live market factors using a deterministic scoring model.

```text
Confidence Score =
(Odds Movement × Market Weight)
+ (Match Events × Incident Weight)
+ (Possession × Momentum Weight)
```

This scoring engine generates explainable recommendations rather than opaque predictions, making it suitable for autonomous trading workflows.

---

# 📁 Project Structure

```
goalpulse/
│
├── app/
├── components/
├── lib/
├── public/
├── styles/
├── .env.local
├── package.json
└── README.md
```

---

# 💬 TxLINE Developer Experience

## ❤️ What We Loved

- Consistent normalized JSON schema
- Fast integration workflow
- Excellent API structure
- Cryptographically verifiable sports data
- Native Solana ecosystem support

## ⚠ Challenges

During development we occasionally encountered:

```
read ECONNRESET
```

on the `/auth/guest/start` endpoint during periods of heavy Devnet traffic.

Providing an official sandbox server or mock authentication endpoint would significantly improve the local development experience.

---

# 🌍 Future Roadmap

- AI-powered match summaries
- Autonomous prediction agents
- On-chain prediction settlement
- Wallet integration
- Historical analytics dashboard
- Multi-tournament support

---

# 📄 License

MIT License

---

## Built for

**Superteam Earn — TxLINE Hackathon 2026**

Built with 💚 by **linnbenton**
