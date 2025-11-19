// src/app/components/NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  const navItems = [
    { name: "Tra Cứu Điểm", href: "/" },
    { name: "Báo Cáo & Thống Kê", href: "/reports" },
  ];

  return (
    <header className="bg-indigo-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-indigo-200 transition"
        >
          Golden Owl Scores
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-white hover:text-indigo-200 transition duration-150 font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
