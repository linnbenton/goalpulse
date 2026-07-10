import Link from "next/link";

// Array structure defining sidebar navigation items with their respective routes
const menus = [
  {
    name: "Dashboard",
    href: "/", // Main landing page path
  },
  {
    name: "Matches",
    href: "/dashboard", // Activated route to show the main match tracking environment
  },
  {
    name: "Signals",
    href: "/signals", // Activated route to navigate to the Intelligence Signals page
  },
  {
    name: "Analysis",
    href: "/analysis", // Activated route for analysis dashboard
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

      {/* Dynamic menu rendering using Next.js Link client-side navigation */}
      {menus.map((menu) => (
        <Link
          key={menu.name}
          href={menu.href}
          style={{
            display: "block",
            marginBottom: 16,
            color: "#d1d5db",
            textDecoration: "none",
          }}
          className="hover:text-emerald-400 transition-colors duration-200"
        >
          {menu.name}
        </Link>
      ))}
    </aside>
  );
}
