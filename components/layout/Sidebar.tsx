import Link from "next/link";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Matches",
    href: "#",
  },
  {
    name: "Signals",
    href: "#",
  },
  {
    name: "Analysis",
    href: "#",
  },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        background: "#111827",
        padding: 24,
        borderRight: "1px solid #1f2937",
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          marginBottom: 30,
        }}
      >
        GoalPulse
      </h1>

      {menus.map((menu) => (
        <Link
          key={menu.name}
          href={menu.href}
          style={{
            display: "block",
            marginBottom: 16,
            color: "#d1d5db",
          }}
        >
          {menu.name}
        </Link>
      ))}
    </aside>
  );
}
