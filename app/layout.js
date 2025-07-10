import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "DeepSeek",
  description: "Full Stack Project",
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
  <html lang="en">
    <body className={`${inter.className} bg-[#292a2d] text-white`}>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </body>
  </html>
</ClerkProvider>
   
  );
}

