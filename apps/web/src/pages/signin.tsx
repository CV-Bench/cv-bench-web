import axios from "axios";
import Link from "next/link";
import { MutatingDots } from "react-loader-spinner";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const Signin = () => {
  const { data, isLoading, error } = useSWR(
    "http://localhost/auth/google/link",
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
        <Link href={data || ""}>GOOGLE LOGIN</Link>
      )}
    </>
  );
};

export default Signin;
