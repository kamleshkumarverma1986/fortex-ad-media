import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectToDB } from "@/utils/database";
import ClientAppProvider from "@/providers/ClientAppProvider";
import FloatingChatButton from "@/components/FloatingChatButton";

export const metadata = {
  title:
    "Forex AD Media - Strategic Advertising for Offline Stores | Business Growth Solutions",
  description:
    "Empower your offline store with Forex AD Media's strategic advertising campaigns. We help businesses attract more customers and boost sales through targeted ad solutions across multiple channels. Expert partner in driving real results for offline retail stores.",
  keywords:
    "offline store advertising, business growth advertising, retail marketing, targeted ad campaigns, offline business promotion, store advertising solutions, retail advertising agency",
  authors: [{ name: "Forex AD Media" }],
  creator: "Forex AD Media",
  publisher: "Forex AD Media",
  openGraph: {
    title: "Forex AD Media - Strategic Advertising for Offline Stores",
    description:
      "Specialized advertising solutions that help offline stores attract customers and increase sales through creative, targeted campaigns.",
    type: "website",
    locale: "en_US",
    siteName: "Forex AD Media",
    url: "https://www.fortex.co.in/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forex AD Media - Strategic Advertising for Offline Stores",
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
};

export default async function RootLayout({ children }) {
  // Connecting the mongodb on the first page load
  await connectToDB();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ClientAppProvider>
          <Navbar />
          <main>{children}</main>
          <FloatingChatButton />
          <Footer />
        </ClientAppProvider>
      </body>
    </html>
  );
}
