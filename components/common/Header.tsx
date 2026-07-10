"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

// Dynamically import Solana's Multi-Button to prevent SSR (Server-Side Rendering) issues on Vercel deployment
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

export const Header: FC = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div className="logo">
        <h1 style={{ color: "#fff", margin: 0 }}>GoalPulse</h1>
      </div>

      {/* Official Phantom / Solana Wallet Connection Button */}
      <div className="wallet-wrapper">
        <WalletMultiButtonDynamic />
      </div>
    </header>
  );
};
