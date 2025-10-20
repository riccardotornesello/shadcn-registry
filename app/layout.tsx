import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Packed Form Registry",
  description: "A custom registry for the Packed Form component using shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
