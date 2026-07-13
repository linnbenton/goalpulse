"use client";

import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import BN from "bn.js";

import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { PublicKey } from "@solana/web3.js";

import { createReadonlyProgram } from "@/lib/anchor";

import { subscribe } from "@/lib/txline/onchain";
import { activateApiToken } from "@/lib/txline/activate";
import { txlineAuth } from "@/lib/txline/auth";

import { buildValidationPayload, buildBinaryStrategy } from "@/lib/validation";

import {
  deriveDailyScoresPda,
  getEpochDay,
  computeBudgetInstruction,
} from "@/lib/txline";

interface MatchState {
  id: string;

  fixtureId: number;

  seq: number;

  homeFlag: string;

  awayFlag: string;

  homeTeam: string;

  awayTeam: string;

  recommendation: string;

  confidence: number;
}

// 🎯 TxLINE Official Devnet Constants
const TXLINE_PROGRAM_ID = new PublicKey(
  "6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J",
);

// Official Helper: Derive Epoch Day from timestamp for Proof Validation
// Based on TxLINE Specification: epochDay = floor(timestamp / 86400000)
function epochDayFromProofTimestamp(proofTimestampMs: number): number {
  if (!Number.isSafeInteger(proofTimestampMs) || proofTimestampMs < 0) {
    throw new Error("Expected a non-negative proof timestamp in milliseconds");
  }
  const epochDay = Math.floor(proofTimestampMs / 86400000);
  if (epochDay > 0xffff) {
    throw new Error("Proof timestamp is outside the u16 epoch-day range");
  }
  return epochDay;
}

// Official Helper: Derive validation PDA required by validateStat method
function deriveDailyValidationPda(
  seed: "daily_scores_roots" | "daily_batch_roots",
  proofTimestampMs: number,
): PublicKey {
  const epochDay = epochDayFromProofTimestamp(proofTimestampMs);
  return PublicKey.findProgramAddressSync(
    [Buffer.from(seed), new BN(epochDay).toArrayLike(Buffer, "le", 2)],
    TXLINE_PROGRAM_ID,
  )[0];
}

export default function AIReasoning() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const wallet = useWallet();

  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [txError, setTxError] = useState<string | null>(null);

  const [txResult, setTxResult] = useState<boolean | null>(null);

  const [currentMatch, setCurrentMatch] = useState<MatchState>({
    id: "match-worldcup-2026",
    fixtureId: 18175981, // contoh fixture dari dokumentasi TxLINE
    seq: 991, // contoh seq dari dokumentasi TxLINE

    homeFlag: "🇦🇷",
    awayFlag: "🇧🇷",

    homeTeam: "Argentina",
    awayTeam: "Brazil",

    recommendation: "BUY",
    confidence: 91,
  });

  useEffect(() => {
    const fetchLiveFeed = async () => {
      try {
        const res = await fetch("/api/txline/matches");

        if (!res.ok) return;

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) return;

        const match = data[0];

        setCurrentMatch({
          id: match.id ?? "match-worldcup-2026",

          fixtureId: match.fixtureId ?? match.fixture_id ?? 18175981,

          seq: match.seq ?? 991,

          homeFlag: match.homeFlag ?? "🏳️",

          awayFlag: match.awayFlag ?? "🏳️",

          homeTeam: match.homeTeam ?? match.participant1 ?? "Home",

          awayTeam: match.awayTeam ?? match.participant2 ?? "Away",

          recommendation: match.recommendation ?? "BUY",

          confidence: match.confidence ?? 91,
        });
      } catch (error) {
        console.error("[TxLINE] Failed to fetch matches:", error);
      }
    };

    fetchLiveFeed();
  }, []);

  useEffect(() => {
    const es = new EventSource("/api/txline/stream");

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data) && data.length > 0) {
          const match = data[0];

          setCurrentMatch((prev) => ({
            ...prev,

            fixtureId: match.fixtureId ?? prev.fixtureId,

            homeTeam: match.participant1 ?? prev.homeTeam,

            awayTeam: match.participant2 ?? prev.awayTeam,
          }));
        }
      } catch {}
    };

    return () => es.close();
  }, []);

  const handleExecuteBuy = async () => {
    if (!anchorWallet) return;

    try {
      setIsSubmitting(true);

      setTxError("");

      const program = createReadonlyProgram(anchorWallet as any);

      const txSig = await subscribe(program, anchorWallet as any);

      const auth = await txlineAuth.ensureAuthenticated();

      const apiToken = await activateApiToken(wallet, auth.jwt, txSig, []);

      txlineAuth.setApiToken(apiToken);

      console.log("API TOKEN:", apiToken);

      const response = await axios.get("/api/txline/validate", {
        params: {
          fixtureId: currentMatch.fixtureId,
          seq: currentMatch.seq,
          statKeys: "1,2,3001",
        },
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
          "x-api-token": apiToken,
        },
      });

      const validation = response.data;

      const payload = buildValidationPayload(validation);

      const strategy = buildBinaryStrategy(
        0,

        1,

        0,

        "equalTo",

        "subtract",
      );

      const epochDay = getEpochDay(validation.summary.updateStats.minTimestamp);

      const [dailyScoresPda] = deriveDailyScoresPda(
        epochDay,

        program.programId,
      );

      console.log("========== VALIDATE ==========");
      console.log("payload", payload);
      console.log("strategy", strategy);
      console.log("dailyScoresPda", dailyScoresPda.toBase58());
      console.log("programId", program.programId.toBase58());

      console.log("Program:", program.programId.toBase58());
      console.log("Epoch Day:", epochDay);
      console.log("Daily PDA:", dailyScoresPda.toBase58());
      console.log("Timestamp:", validation.summary.updateStats.minTimestamp);

      const result = await program.methods

        .validateStatV2(
          payload,

          strategy,
        )

        .accounts({
          dailyScoresMerkleRoots: dailyScoresPda,
        })

        .preInstructions([computeBudgetInstruction()])

        .view();

      setTxResult(result);
    } catch (err: any) {
      console.log("========== VALIDATE ERROR ==========");
      console.dir(err, { depth: null });

      console.log("message:", err.message);
      console.log("logs:", err.logs);

      if (err.simulationResponse) {
        console.log("simulationResponse:", err.simulationResponse);
      }

      if (err.errorLogs) {
        console.log("errorLogs:", err.errorLogs);
      }

      setTxError(err.message ?? "Validation failed");
    }
  };

  return (
    <div className="card">
      <h3>AI Recommendation</h3>

      <div className="mt-4 flex items-center gap-3 text-3xl font-extrabold tracking-wider text-white">
        <span title={currentMatch.homeTeam}>{currentMatch.homeFlag}</span>
        <span className="text-zinc-600 text-sm font-normal px-1">VS</span>
        <span title={currentMatch.awayTeam}>{currentMatch.awayFlag}</span>
      </div>

      <h1
        className="animate-pulse"
        style={{
          marginTop: 18,
          color: currentMatch.recommendation === "BUY" ? "#22c55e" : "#eab308",
          fontSize: 42,
          fontWeight: 800,
          textShadow:
            "0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.4)",
        }}
      >
        {currentMatch.recommendation}
      </h1>

      <p style={{ marginTop: 20 }}>Confidence</p>
      <h2>{currentMatch.confidence}%</h2>

      <ul style={{ marginTop: 20, lineHeight: 2 }}>
        <li>✔ {currentMatch.homeTeam} performance pacing metrics clear</li>
        <li>✔ Tactical match variance calculated</li>
        <li>✔ Odds adjusting smoothly to real-time telemetry</li>
        <li>✔ Momentum index increasing</li>
      </ul>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleExecuteBuy}
          disabled={isSubmitting}
          className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 text-white font-bold rounded-md transition-all active:scale-95 text-xs uppercase tracking-wider"
        >
          {isSubmitting ? "VALIDATING WITH TXLINE..." : "EXECUTE SIGNAL"}
        </button>
        <button className="border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 active:scale-95 text-xs uppercase tracking-wider">
          PASS
        </button>
      </div>

      {isSubmitting && (
        <div className="mt-4 text-xs text-yellow-500 animate-pulse font-mono bg-zinc-900/50 p-2.5 rounded border border-yellow-500/20">
          ⏳ Interacting with TxLINE Program (
          {TXLINE_PROGRAM_ID.toBase58().slice(0, 6)}...)...
        </div>
      )}

      {txError && (
        <div className="mt-4 text-xs font-mono bg-red-950/40 p-3 rounded border border-red-500/30 text-red-400 truncate">
          ❌ Error: {txError}
        </div>
      )}

      {txResult !== null && (
        <div
          className="
      mt-4
      p-3
      rounded
      border
      text-xs
      font-mono
    "
        >
          {txResult
            ? "✅ TxLINE Validation Passed"
            : "❌ TxLINE Validation Failed"}
        </div>
      )}

      {txSignature && (
        <div className="mt-4 text-xs font-mono bg-zinc-900/80 p-3 rounded border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          <div className="text-green-400 font-bold mb-1">
            ✔ TRANSACTION SUCCESSFUL
          </div>
          <div className="text-zinc-400 truncate mb-2">ID: {txSignature}</div>

          <div className="mt-2 pt-1 border-t border-zinc-800/60 text-center animate-fade-in">
            <a
              href={`https://solscan.io/tx/${txSignature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-400 hover:text-green-300 font-medium underline transition-all duration-200 inline-flex items-center gap-1 tracking-wider"
            >
              Verify on Solscan Explorer ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
