"use client";

import React from "react";
import Link from "next/link";

// Pre-defined mock stream matching target specifications for the hackathon MVP
const liveSignals = [
  {
    id: "sig-001",
    timestamp: "14:32:10 UTC",
    match: "Argentina vs Brazil",
    type: "ODDS_DROP_VOLATILITY",
    severity: "CRITICAL",
    message: "Sharp 18.4% drop detected in Home Win odds within 45 seconds.",
    confidence: "94.2%",
  },
  {
    id: "sig-002",
    timestamp: "14:31:05 UTC",
    match: "Argentina vs Brazil",
    type: "SENTIMENT_SPIKE",
    severity: "WARNING",
    message:
      "Social volume spike (+300% / min) tracking aggressive team press metrics.",
    confidence: "81.5%",
  },
];

export default function SignalsPage() {
  return (
    <div className="p-8 bg-[#0a0f1d] min-h-screen text-slate-100">
      {/* Navigation Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors group"
        >
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Dashboard
        </Link>
      </div>

      {/* Page Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            INTELLIGENCE SIGNALS
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time automated streams triggered by deterministic match data
            processing models.
          </p>
        </div>
      </div>

      {/* Main Signal Display Feed Grid */}
      <div className="space-y-4">
        {liveSignals.map((signal) => (
          <div
            key={signal.id}
            className="bg-[#111827] border border-slate-800 p-5 rounded-xl shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-400">
                  {signal.timestamp}
                </span>
                <h2 className="text-sm font-bold tracking-wide text-slate-200">
                  {signal.match}
                </h2>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-900 tracking-wider">
                  {signal.type}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-wider ${
                    signal.severity === "CRITICAL"
                      ? "bg-red-950 text-red-400 border border-red-900"
                      : "bg-amber-950 text-amber-400 border border-amber-900"
                  }`}
                >
                  {signal.severity}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium mb-3">
              {signal.message}
            </p>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-500">Confidence Metric:</span>
              <span className="text-emerald-400 font-bold">
                {signal.confidence}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
