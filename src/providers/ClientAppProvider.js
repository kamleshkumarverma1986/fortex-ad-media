"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider as AuthSessionProvider } from "next-auth/react";

/* ClientAppProvider is for both HeroUI and Session */
const ClientAppProvider = ({ children, session }) => (
  <AuthSessionProvider session={session}>
    <NextUIProvider>{children}</NextUIProvider>
  </AuthSessionProvider>
);

export default ClientAppProvider;
