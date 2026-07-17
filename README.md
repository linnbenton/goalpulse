# ⚽ GoalPulse

GoalPulse is a real-time football intelligence dashboard built for the **Superteam × TxLINE Hackathon 2026**.

The project demonstrates how developers can integrate the **TxLINE** sports data platform with the **Solana** ecosystem. It combines live football data, server-side API routing, wallet authentication, subscription activation, and on-chain proof validation using the official TxLINE program.

---

# Overview

GoalPulse provides a simple end-to-end example of the TxLINE developer workflow:

1. Fetch live football matches.
2. Authenticate with TxLINE.
3. Activate API access.
4. Retrieve cryptographic validation payloads.
5. Build validation strategies.
6. Verify sports data against the on-chain TxLINE program.

The application is built with **Next.js App Router**, **React**, **TypeScript**, **Anchor**, and **Solana Wallet Adapter**.

---

# Features

## ⚽ Live Match Feed

- Fetch live football matches from TxLINE.
- Display match information in real time.
- Support live updates using Server-Sent Events (SSE).

---

## 🔐 Authentication

- Guest authentication.
- API token activation.
- Automatic token management during the current session.

---

## 🪙 Solana Integration

- Solana Wallet Adapter.
- Anchor client integration.
- Official TxLINE Devnet Program.
- PDA derivation utilities.
- Transaction preparation.

---

## ✅ On-chain Validation

GoalPulse demonstrates the complete validation flow:

- Fetch validation payload from TxLINE.
- Build validation input.
- Construct validation strategy.
- Derive Daily Scores PDA.
- Execute `validate_stat_v2`.

---

## 📡 Backend API

The application uses Next.js Route Handlers as a secure backend proxy for TxLINE services.

Implemented endpoints include:

| Endpoint                      | Method | Description                 |
| ----------------------------- | ------ | --------------------------- |
| `/api/txline/matches`         | GET    | Fetch live football matches |
| `/api/txline/stream`          | GET    | Server-Sent Events stream   |
| `/api/txline/validate`        | GET    | Retrieve validation payload |
| `/api/txline/stat-validation` | GET    | Stat validation endpoint    |

---

# Tech Stack

| Layer       | Technology            |
| ----------- | --------------------- |
| Framework   | Next.js 16            |
| Frontend    | React 19              |
| Language    | TypeScript            |
| Styling     | Tailwind CSS          |
| Blockchain  | Solana Devnet         |
| SDK         | Anchor                |
| Wallet      | Solana Wallet Adapter |
| HTTP        | Axios                 |
| Sports Data | TxLINE                |

---

# Project Structure

```text
goalpulse/
│
├── app/
│   ├── api/
│   │   └── txline/
│   │       ├── matches/
│   │       ├── stat-validation/
│   │       ├── stream/
│   │       └── validate/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── dashboard/
│       └── AIReasoning.tsx
│
├── idl/
│   └── txoracle.json
│
├── lib/
│   ├── anchor.ts
│   ├── proof.ts
│   ├── strategy.ts
│   ├── validation.ts
│   ├── txline.ts
│   └── txline/
│       ├── activate.ts
│       ├── auth.ts
│       ├── client.ts
│       ├── network.ts
│       ├── onchain.ts
│       ├── purchase.ts
│       ├── stream.ts
│       ├── subscribe.ts
│       └── validation.ts
│
├── scripts/
│   └── generate-idl.ts
│
├── types/
│   └── txline.ts
│
├── package.json
└── README.md
```

---

# On-chain Validation Flow

```text
Connect Wallet
       │
       ▼
Subscribe to TxLINE
       │
       ▼
Guest Authentication
       │
       ▼
Activate API Token
       │
       ▼
Fetch Validation Payload
       │
       ▼
Build Validation Strategy
       │
       ▼
Derive Daily Scores PDA
       │
       ▼
validate_stat_v2()
       │
       ▼
Validation Result
```

---

# Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com

NEXT_PUBLIC_TXLINE_PROGRAM_ID=6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J

NEXT_PUBLIC_TXL_MINT=

TXODDS_JWT=

TXODDS_API_TOKEN=
```

---

# Installation

Clone the repository.

```bash
git clone https://github.com/linnbenton/goalpulse.git

cd goalpulse
```

Install dependencies.

```bash
npm install
```

---

# Development

Run the development server.

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

# TxLINE Integration

GoalPulse integrates with the official TxLINE developer platform through:

- Guest authentication
- API token activation
- Live match endpoints
- Validation endpoints
- Server-Sent Events
- Anchor IDL
- Solana Program interaction

---

# Solana Program

Program ID:

```
6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J
```

IDL:

```
idl/txoracle.json
```

The application currently integrates with the following program instructions:

- `subscribe`
- `validate_stat_v2`

---

# Development Notes

The repository contains helper modules for:

- Anchor provider initialization
- PDA derivation
- Validation payload builder
- Strategy builder
- Proof serialization
- TxLINE authentication
- Subscription activation

These utilities simplify interaction with the official TxLINE on-chain program.

---

# License

MIT License

---

# Built For

**Superteam × TxLINE Hackathon 2026**

Built with ❤️ by **linnbenton**
