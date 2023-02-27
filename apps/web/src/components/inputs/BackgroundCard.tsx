import { useRouter } from "next/router";

interface BackgroundCardProps {
  name: string;
  imgSrc: string;
  date: string;
  tags: string[];
}

const BackgroundCard = (props: BackgroundCardProps) => {
  const router = useRouter();

  const changeUrl = () => {
    router.push("background/".concat(String(props.name)));
  };

  return (
    <>
      <div
        className="relative  m-5 border-2 border-white rounded-lg bg-gray-800"
        onClick={changeUrl}
      >
        <div className="w-full p-4 border-b-2 ">
          <img className="object-content " src={props.imgSrc} />
        </div>
        <div className="p-3 overflow-y-scroll mb-6 ">
          {props.tags.map((_d) => (
            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {_d}
            </span>
          ))}
        </div>
        <div className="absolute text-white right-2 bottom-1">{props.date}</div>
      </div>
    </>
  );
};
export default BackgroundCard;
