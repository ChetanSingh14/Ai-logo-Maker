import {Tektur } from "next/font/google";
import "./globals.css";
import Provider from "../app/Provider";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"

const tektur=Tektur({
  subsets: ["latin"],

})
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={tektur.className} 
      >
        <Provider>
        {children}
        </Provider>
        
        <Toaster/>
  
      </body>
    </html>
    </ClerkProvider>
  );
}
