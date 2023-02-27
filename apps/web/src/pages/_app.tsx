import NavLayout from "../components/nav/NavLayout";
import { useRouter } from "next/router";
import { MutatingDots } from "react-loader-spinner";
import ModalProvider from "@/components/modal/ModalProvider";

import "../styles/globals.css";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionUser } from "types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Signin from "./signin";

//TODO remove when network works
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [user, setUser] = useState(undefined as SessionUser | undefined);

  const { data, isLoading, error } = useSWR(
    (process.env.HOST_DOMAIN || "http://localhost:3001") + "/auth/user",
    fetcher
  );

  console.log(data);

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
          <NavLayout user={user as SessionUser}>
            <Component {...pageProps} />
          </NavLayout>
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
