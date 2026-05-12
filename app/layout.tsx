import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-Driven Operational Systems Portfolio",
  description:
    "A cinematic Saudi professional portfolio for Security Operations, AI Workflows, Infrastructure Coordination, and Digital Systems.",
  keywords: [
    "Security Operations",
    "AI Workflows",
    "Infrastructure Coordination",
    "Digital Systems",
    "Saudi Arabia",
    "Operational Intelligence"
  ]
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
