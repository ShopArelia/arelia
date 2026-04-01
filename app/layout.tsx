import type { Metadata } from "next";
import { DMSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arelia",
  description: "Shop with purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${DMSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-primary-50">{children}</body>
    </html>
  );
}
