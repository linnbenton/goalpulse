"use client";

import { useMatches } from "@/hooks/useMatches";

export default function MatchList() {
  const { matches, loading } = useMatches();

  if (loading) {
    return <div className="card">Loading...</div>;
  }

  return (
    <div className="card">
      <h2
        style={{
          marginBottom: 20,
        }}
      >
        Live Matches
      </h2>

      {/* 1. Safely verify that matches is an array and contains records */}
      {Array.isArray(matches) && matches.length > 0 ? (
        matches.map((match) => (
          <div
            key={match.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 14,
              borderBottom: "1px solid #1f2937",
            }}
          >
            <span>
              {match.homeTeam} vs {match.awayTeam}
            </span>

            <strong>
              {match.homeScore} - {match.awayScore}
            </strong>

            <span>{match.minute}'</span>
          </div>
        ))
      ) : (
        /* 2. Render clean placeholder UI when data array is empty or invalid */
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            color: "#6b7280",
          }}
        >
          No live matches available at the moment.
        </div>
      )}
    </div>
  );
}
