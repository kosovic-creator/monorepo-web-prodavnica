import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Prodavnica",
  description: "Web prodavnica - client app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <div className="flex flex-col min-h-screen">
          <ClientLayout>
            <main className="flex-1">{children}</main>
          </ClientLayout>
          <Footer />
        </div>
      </body>
    </html>
  );
}
