// src/app/layout.tsx
import NavBar from "../../components/NavBar";
import "./globals.css"; // Đảm bảo CSS được import

// Cấu hình metadata (optional)
export const metadata = {
  title: "Golden Owl Dashboard",
  description: "Scores check and reports dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-100 min-h-screen">
        <NavBar />
        <main>
          {children}{" "}
          {/* Đây là nơi nội dung của các trang /, /reports được hiển thị */}
        </main>
      </body>
    </html>
  );
}
