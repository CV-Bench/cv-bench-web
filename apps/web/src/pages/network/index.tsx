import Link from "next/link";

const NetworkList = () => {
  return (
    <>
      <div className="bg-slate-800 p-4 flex rounded-lg text-white">
        <Link href="/network/create">Create Network</Link>
      </div>
    </>
  );
};

export default NetworkList;
