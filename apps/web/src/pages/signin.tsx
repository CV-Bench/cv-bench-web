import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { MutatingDots } from "react-loader-spinner";
import useSWR from "swr";

import LoginWithButton from "@/components/auth/LoginWithButton";

const Signin = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <LoginWithButton
          getLinkUrl={
            (process.env.HOST_DOMAIN || "http://localhost:3001") +
            "/auth/google/link"
          }
          img="/btn_google_signin_dark_normal_web@2x.png"
        />
        <LoginWithButton
          getLinkUrl={
            (process.env.HOST_DOMAIN || "http://localhost:3001") +
            "/auth/microsoft/link"
          }
          img="/ms-symbollockup_signin_dark.png"
        />
      </div>
    </>
  );
};

export default Signin;
