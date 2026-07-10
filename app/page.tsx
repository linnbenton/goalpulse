"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the Solana Wallet Button to prevent hydration/SSR mismatch errors
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

export default function HomePage() {
  return (
    <main className="container mx-auto">
      <header className="flex justify-between items-center py-6 px-4">
        <div className="logo">
          <h2 className="text-xl font-bold text-white tracking-wider font-mono">
            GOAL<span className="text-emerald-500">PULSE</span>
          </h2>
        </div>

        <div>
          {/* Solana Wallet Adapter MultiButton stylized for Cyberpunk aesthetic */}
          <WalletMultiButtonDynamic className="!bg-emerald-500 !text-slate-950 !font-mono !font-bold !px-5 !py-2 !rounded-lg !text-xs !tracking-wider !transition-all hover:!bg-emerald-400 hover:!shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
        </div>
      </header>

      {/* Hero Interactive Marketing Section */}
      <section
        style={{
          minHeight: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: 24,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
          }}
          className="tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400"
        >
          GoalPulse
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: 20,
            maxWidth: 700,
          }}
          className="leading-relaxed"
        >
          Real-Time Football Intelligence Platform powered by TxODDS & Solana.
        </p>

        {/* Action Link directing users into the core analytics app dashboard */}
        <Link
          href="/dashboard"
          style={{
            background: "#10b981", // Emerald-500
            color: "#020617",
            padding: "16px 34px",
            borderRadius: 10,
            fontWeight: 700,
          }}
          className="shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all duration-300 tracking-wide"
        >
          Launch Dashboard
        </Link>
      </section>

      {/* Simple Footer Layout */}
      <footer className="py-6 text-center text-xs text-slate-600 font-mono border-t border-slate-900">
        TxLINE Hackathon 2026 Integration Environment
      </footer>
    </main>
  );
}
