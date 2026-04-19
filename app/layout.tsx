import type { Metadata } from "next";
import { DMSans400, DMSans500, DMSerifReg, DMSerifItalic } from "./fonts";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      className={`${DMSans400.variable} ${DMSans500.variable} ${DMSerifReg.variable} ${DMSerifItalic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-primary-50">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
