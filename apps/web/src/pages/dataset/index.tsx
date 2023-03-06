import Link from "next/link";

const DatasetList = () => {
  return (
    <>
      <div className="bg-slate-800 p-4 flex rounded-lg text-white">
        <Link href="/dataset/create">Create Dataset</Link>
      </div>
    </>
  );
};

export default DatasetList;
