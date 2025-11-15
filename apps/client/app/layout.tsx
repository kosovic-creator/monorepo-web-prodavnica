import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prodavnica",
  description: "Web prodavnica - client app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
