import { useBackgroundList } from "@/hooks/background";
import BackgroundCard from "@/components/inputs/BackgroundCard";
import Link from "next/link";

const _data = {
  titel: "titel",
  description: "some Discription",
  imgSrc:
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
};

const data = [
  {
    name: "1",
    imgSrc:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    date: "20/12/2001",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    name: "2",
    imgSrc:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    date: "20/12/2001",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    name: "3",
    imgSrc:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    date: "20/12/2001",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    name: "4",
    imgSrc:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    date: "20/12/2001",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    name: "5",
    imgSrc:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    date: "20/12/2001",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    name: "6",
    imgSrc:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    date: "20/12/2001",
    tags: ["tag1", "tag2", "tag3"]
  }
];

const BackgroundList = () => {
  // GET BACKGROUND LIST WITH
  // const backgrounds = useBackgroundList()

  return (
    <>
      <div className="bg-gray-800 p-4 flex rounded-lg ">
        <div className="flex justify-center items-center">
          <img className="object-content w-5 h-5  " src={_data.imgSrc} />
        </div>
        <div className="ml-4 text-white">
          <div className="font-bold text-white">{_data.titel}</div>
          <div>{_data.description}</div>
        </div>
        <Link href="/background/upload">Upload Background</Link>
      </div>

      <div className=" grid lg:grid-cols-5 sm:grid-cols-1">
        {data.map((_d) => (
          <BackgroundCard
            name={_d.name}
            imgSrc={_d.imgSrc}
            date={_d.date}
            tags={_d.tags}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundList;
