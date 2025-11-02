"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider as AuthSessionProvider } from "next-auth/react";

/* ClientAppProvider is for both HeroUI and Session */
const ClientAppProvider = ({ children, session }) => (
  <AuthSessionProvider session={session}>
    <HeroUIProvider>{children}</HeroUIProvider>
  </AuthSessionProvider>
);

export default ClientAppProvider;
