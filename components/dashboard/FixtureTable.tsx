"use client";

import { useFixtures } from "@/hooks/useFixtures";

export default function FixtureTable({
  jwt,
  apiToken,
}: {
  jwt: string;
  apiToken: string;
}) {
  const { fixtures, loading } = useFixtures(jwt, apiToken);

  if (loading) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>Upcoming Fixtures</h2>

      {fixtures.map((fixture) => (
        <div
          key={fixture.FixtureId}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 12,
            borderBottom: "1px solid #333",
          }}
        >
          <span>
            {fixture.Participant1} vs {fixture.Participant2}
          </span>

          <span>{fixture.Competition}</span>
        </div>
      ))}
    </div>
  );
}
