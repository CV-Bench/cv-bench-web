import { SessionProvider } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import NavLayout from "../components/nav/NavLayout";

import "../styles/globals.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
    </>
  );
};

const AppProviderWrapper = ({
  Component,
  pageProps: { session, ...pageProps },
  router
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <App pageProps={pageProps} Component={Component} router={router} />
    </SessionProvider>
  );
};

export default AppProviderWrapper;
