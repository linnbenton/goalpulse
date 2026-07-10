// @ts-ignore
import "./globals.css";
// @ts-ignore
import "@solana/wallet-adapter-react-ui/styles.css";
import type { Metadata } from "next";

// @ts-ignore
import { AppWalletProvider } from "../wallet/WalletProvider";

export const metadata: Metadata = {
  title: "GoalPulse",
  description: "Real-Time Football Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 3. Wrap application with the provider */}
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}
