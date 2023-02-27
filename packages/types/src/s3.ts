export enum Bucket {
  MODELS = "models",
  DATASETS = "datasets",
  BACKGROUNDS = "backgrounds",
  NETWORKS = "networks"
}

export const createBucketKey = (bucket: Bucket, key: string) =>
  bucket + "/" + key;
