import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "WoodCraft Furniture | Premium Modern Wooden Furniture",
  description: "Transform your home with WoodCraft. Discover luxury handcrafted sofas, dining sets, office desks, beds, and home décor made from solid oak and walnut.",
  keywords: "furniture, luxury furniture, sofa, dining table, oak wood, walnut wood, custom furniture, home decor, woodcraft",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
