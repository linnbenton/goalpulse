"use client";

import {
  useWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";

export default function AIReasoning() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const handleExecuteBuy = async () => {
    if (!connected || !anchorWallet) {
      console.log(
        "[Web3 Link] Wallet disconnected. Summoning wallet modal interface...",
      );
      setVisible(true);
      return;
    }

    try {
      console.log(`[Web3 Sync] Connected via: ${publicKey?.toBase58()}`);

      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions(),
      );
      const programId = new web3.PublicKey("YOUR_ANCHOR_PROGRAM_ID");

      // 🟢 SAFE FALLBACK: Creates an empty valid IDL schema skeleton so TypeScript compiles with zero errors
      const safeIdl = {
        version: "0.1.0",
        name: "goalpulse",
        instructions: [],
      };

      const program = new Program(safeIdl as any, provider);
      console.log("Preparing transaction instruction parameters...");

      // NOTE: Once your real contract is deployed, change safeIdl to your imported JSON schema file
      const tx = await program.methods
        .takePosition("match-1", new BN(91))
        .accounts({
          user: anchorWallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      console.log(`[Solana Sync] Transaction successfully broadcasted: ${tx}`);

      await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txid: tx,
          matchId: "match-1",
          status: "BUY",
        }),
      });
    } catch (error) {
      console.error(
        "[Web3 Error] Pipeline processing sequence critically aborted:",
        error,
      );
    }
  };

  return (
    <div className="card">
      <h3>AI Recommendation</h3>

      <h1
        style={{
          marginTop: 18,
          color: "#22c55e",
          fontSize: 42,
        }}
      >
        BUY
      </h1>

      <p style={{ marginTop: 20 }}>Confidence</p>
      <h2>91%</h2>

      <ul style={{ marginTop: 20, lineHeight: 2 }}>
        <li>✔ Argentina dominates possession</li>
        <li>✔ Brazil received red card</li>
        <li>✔ Odds falling rapidly</li>
        <li>✔ Momentum increasing</li>
      </ul>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleExecuteBuy}
          className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-md transition-all duration-200 shadow-[0_0_15px_rgba(34,197,94,0.5)] active:scale-95 text-xs uppercase tracking-wider"
        >
          {connected ? "EXECUTE BUY SIGNAL" : "CONNECT WALLET TO EXECUTE"}
        </button>
        <button className="border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 active:scale-95 text-xs uppercase tracking-wider">
          PASS
        </button>
      </div>
    </div>
  );
}
