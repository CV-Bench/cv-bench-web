import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const LoginWithButton = ({
  getLinkUrl,
  img
}: {
  getLinkUrl: string;
  img: string;
}) => {
  const { data, isLoading, error } = useSWR(getLinkUrl, fetcher);

  return (
    <Link href={data || ""}>
      <Image
        src={img}
        alt="login button"
        width={250}
        height={100}
        className="hover:opacity-70"
      />
    </Link>
  );
};

export default LoginWithButton;
