import { SessionProvider } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import Nav from "../components/nav/Nav";

import "../styles/globals.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

const App = () => {
  return (
    <>
      <Nav />
    </>
  );
};

const AppProviderWrapper = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <App />
    </SessionProvider>
  );
};

export default AppProviderWrapper;
