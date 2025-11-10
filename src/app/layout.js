import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectToDB } from "@/utils/database";
import ClientAppProvider from "@/providers/ClientAppProvider";
import FloatingChatButton from "@/components/FloatingChatButton";
import SonnerToaster from "@/components/SonnerToaster";

export const metadata = {
  title:
    "Fortex AD Media - Strategic Advertising for Offline Stores | Business Growth Solutions",
  description:
    "Empower your offline store with Fortex AD Media's strategic advertising campaigns. We help businesses attract more customers and boost sales through targeted ad solutions across multiple channels. Expert partner in driving real results for offline retail stores.",
  keywords:
    "offline store advertising, business growth advertising, retail marketing, targeted ad campaigns, offline business promotion, store advertising solutions, retail advertising agency",
  authors: [{ name: "Fortex AD Media" }],
  creator: "Fortex AD Media",
  publisher: "Fortex AD Media",
  openGraph: {
    title: "Fortex AD Media - Strategic Advertising for Offline Stores",
    description:
      "Specialized advertising solutions that help offline stores attract customers and increase sales through creative, targeted campaigns.",
    type: "website",
    locale: "en_US",
    siteName: "Fortex AD Media",
    url: "https://www.fortex.co.in/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortex AD Media - Strategic Advertising for Offline Stores",
    description:
      "Empowering offline businesses with strategic advertising campaigns that drive real results and business growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.fortex.co.in/",
  },
  metadataBase: new URL("https://www.fortex.co.in"),
  icons: {
    icon: "/company-icons/favicon.ico",
    shortcut: "/company-icons/favicon.ico",
    apple: "/company-icons/apple-touch-icon.png",
  },
  manifest: "/company-icons/site.webmanifest",
  themeColor: "#ffffff",
};

export const viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({ children }) {
  // Connecting the mongodb on the first page load
  await connectToDB();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ClientAppProvider>
          <Navbar />
          <main>{children}</main>
          <SonnerToaster />
          <FloatingChatButton />
          <Footer />
        </ClientAppProvider>
      </body>
    </html>
  );
}
