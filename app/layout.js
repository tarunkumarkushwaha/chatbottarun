import localFont from "next/font/local";
import "./globals.css";
import ContextProvider from "@/customhooks/Context";
import Navbar from "@/components/Navbar";
import Foot from "@/components/Foot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "chatbot Tarun",
  description: "Get your own chatbot assistance from chatbot tarun",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <Navbar/>
          {children}
        </ContextProvider>
        <Foot/>
      </body>
    </html>
  );
}
