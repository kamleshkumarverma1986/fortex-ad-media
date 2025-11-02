import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Fortex AD Media",
  description: "Your partner in crafting compelling ad campaigns",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
