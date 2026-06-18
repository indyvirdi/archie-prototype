import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import ViewportSizer from "@/components/ViewportSizer";
import "./globals.css";

/* Proxima Nova — the licensed Robin/Sidekick brand typeface, self-hosted
   from the same font files as the Robin docs site. */
const proximaNova = localFont({
  src: [
    { path: "../public/fonts/Sidekick/proximanova-regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Sidekick/proximanova-semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Sidekick/proximanova-bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Sidekick/proximanova-extrabold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-proxima-nova",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Archie · Sidekick Health",
  description: "AI chat & search prototype for usability testing",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#001033",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={proximaNova.variable} data-theme="sidekick-mobile">
      <body>
        <ViewportSizer />
        {children}
      </body>
    </html>
  );
}
