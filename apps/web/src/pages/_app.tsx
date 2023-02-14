import { SessionProvider, signIn, useSession } from "next-auth/react";
import NavLayout from "../components/nav/NavLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { MutatingDots } from "react-loader-spinner";
import ModalProvider from "@/components/modal/ModalProvider";

import "../styles/globals.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") signIn();
  // }, [status]);

  console.log(session);

  return (
    <>
      {/* {status === "authenticated" ? ( */}
      {true ? (
        <NavLayout>
          <Component {...pageProps} />
        </NavLayout>
      ) : (
        <MutatingDots
          height="100"
          width="100"
          color="white"
          secondaryColor="white"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
          }}
          wrapperClass=""
          visible={true}
        />
      )}
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
      <ModalProvider>
        <App pageProps={pageProps} Component={Component} router={router} />
      </ModalProvider>
    </SessionProvider>
  );
};

export default AppProviderWrapper;
