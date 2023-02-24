import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { MutatingDots } from "react-loader-spinner";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const Signin = () => {
  const { data, isLoading, error } = useSWR(
    "http://localhost:3001/auth/google/link",
    fetcher
  );

  return (
    <>
      {isLoading ? (
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
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Link href={data}>
            <Image
              src="/btn_google_signin_dark_normal_web@2x.png"
              alt="google login button"
              width={382}
              height={92}
              className="hover:opacity-70"
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default Signin;
