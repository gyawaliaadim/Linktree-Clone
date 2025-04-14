import "./globals.css";
import Navbar from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en"
    webcrx="">
      <body className="bg-black text-white max-w-screen h-max">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
