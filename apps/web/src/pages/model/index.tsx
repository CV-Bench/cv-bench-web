import { useModelList } from "@/hooks/model";

const ModelList = () => {
  // GET MODEL LIST WITH
  const { data: models } = useModelList();

  console.log("MODELS", models);

  return <></>;
};

export default ModelList;
