import { Inter, Poppins } from "next/font/google";

// Using Inter as a replacement for Integral CF (bold, modern sans-serif)
const integralCF = Inter({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-integralCF",
  display: "swap",
});

// Using Poppins as a replacement for Satoshi (clean, modern sans-serif)
const satoshi = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-satoshi",
  display: "swap",
});

export { integralCF, satoshi };
