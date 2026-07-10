"use client";

import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Must use 'export default' if imported without curly braces
const WalletButton: FC = () => {
  return (
    <div className="wallet-wrapper">
      <WalletMultiButton />
    </div>
  );
};

export default WalletButton;
