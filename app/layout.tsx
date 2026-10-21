import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LOVEATFIRSTSIGHT FINDS | Find Your Style",
    template: "%s | LOVEATFIRSTSIGHT FINDS",
  },
  description:
    "Discover fashion you'll love at LOVEATFIRSTSIGHT FINDS. Explore available styles, discover special offers, and contact us about orders, pickup and delivery in Nairobi, Kenya.",
  applicationName: "LOVEATFIRSTSIGHT FINDS",
  openGraph: {
    title: "LOVEATFIRSTSIGHT FINDS",
    description:
      "Discover your next favourite look with LOVEATFIRSTSIGHT FINDS.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
