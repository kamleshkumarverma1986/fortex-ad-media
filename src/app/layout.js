import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectToDB } from "@/utils/database";
import ClientAppProvider from "@/providers/ClientAppProvider";

export const metadata = {
  title: "Fortex AD Media",
  description: "Your partner in crafting compelling ad campaigns",
};

export default async function RootLayout({ children }) {
  // Connecting the mongodb on the first page load
  await connectToDB();

  return (
    <html lang="en">
      <body>
        <ClientAppProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientAppProvider>
      </body>
    </html>
  );
}
