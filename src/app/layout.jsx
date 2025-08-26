// src/app/layout.jsx
import "./globals.css";
import ThemeProvider from "@/components/ui/theme-provider";
import A11yProvider from "@/components/a11y/A11yProvider";
import A11yFab from "@/components/a11y/A11yFab";
import A11yMotionBridge from "@/components/a11y/A11yMotionBridge";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <ThemeProvider>
          <A11yMotionBridge>{children}</A11yMotionBridge>

          {/* Accessibility */}
          <A11yProvider />
          <A11yFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
