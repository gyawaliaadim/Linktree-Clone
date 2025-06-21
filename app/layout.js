import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react"

export default function RootLayout({ children }) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
    <html lang="en"
    webcrx="">
      <body className="bg-black text-white max-w-screen h-max">
        <Navbar/>
        {children}
      </body>
    </html>
    </Suspense>
  );
}
