import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
import ToastWrapper from "./components/ToastWrapper.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-shopify - One Stop Tech Shop",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <SessionWrapper>
          <body className={inter.className}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastWrapper />
          </body>
      </SessionWrapper>

    </html>
  );
}
