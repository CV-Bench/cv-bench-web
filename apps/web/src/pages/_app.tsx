import axios from "axios";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { MutatingDots } from "react-loader-spinner";
import useSWR from "swr";

import ModalProvider from "@/components/modal/ModalProvider";
import { useSocket } from "@/hooks/useSocket";

import { SessionUser } from "shared-types";

import NavLayout from "../components/nav/NavLayout";
import "../styles/globals.css";

import Signin from "./signin";

//TODO remove when network works
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [user, setUser] = useState(undefined as SessionUser | undefined);

  const { data, isLoading, error } = useSWR(
    (process.env.NEXT_PUBLIC_HOST_DOMAIN || "http://localhost:3001") +
      "/auth/user",
    fetcher
  );

  useSocket();

  useEffect(() => {
    if (!isLoading) {
      try {
        let tmp: SessionUser = data;
        tmp.loggedInAt = new Date(tmp.loggedInAt);
        tmp = SessionUser.parse(tmp);
        setUser(tmp);
        if (router.pathname.startsWith("/signin")) {
          router.push("/");
        }
      } catch (e) {
        router.push("/signin");
        setUser(undefined);
      }
    }
  }, [isLoading]);

  if (isLoading)
    return (
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
    );
  else
    return (
      <>
        {user ? (
          <>
            <NavLayout user={user as SessionUser}>
              <Component {...pageProps} user={user as SessionUser} />
            </NavLayout>
            <Toaster position="top-right" />
          </>
        ) : (
          <Signin {...pageProps} />
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
    <ModalProvider>
      <App pageProps={pageProps} Component={Component} router={router} />
    </ModalProvider>
  );
};

export default AppProviderWrapper;
