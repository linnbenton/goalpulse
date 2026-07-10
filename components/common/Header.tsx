"use client";

import { FC } from "react";
// Remove the curly braces if WalletButton is a default export
import { WalletButton } from "@/components/wallet/WalletButton";

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

      {/* Insert the Phantom Wallet connection button here */}
      <WalletButton />
    </header>
  );
};
