// src/app/layout.jsx
import "./globals.css";
import ThemeProvider from "@/components/ui/theme-provider";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
