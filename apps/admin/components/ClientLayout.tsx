'use client';
import NavbarAdmin from "../components/NavbarAdmin";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body>
        <NavbarAdmin />
        {children}
        </body>
    </html>
  );
}
