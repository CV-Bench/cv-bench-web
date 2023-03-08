import {
  S3 as _S3,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

import { Bucket, createBucketKey } from "shared-types";

import { Background } from "./background";
import { Dataset } from "./dataset";
import { Model } from "./model";
import { Network } from "./network";

export const s3Client = new _S3({
  endpoint: process.env.S3_ENDPOINT_URL,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  }
});

export const putObject = (
  bucket: Bucket,
  body: Readable | ReadableStream | Blob,
  key: string,
  options: {
    options?: PutObjectCommandInput;
    onSuccess?: (out: PutObjectCommandOutput) => any;
    onError?: () => any;
  } = {}
) =>
  s3Client
    .putObject({
      Bucket: process.env.BUCKET_NAME,
      Body: body,
      Key: createBucketKey(bucket, key),
      ...(options.options || {})
    })
    .then(options.onSuccess)
    .catch(options.onError);

export const deleteObject = (
  bucket: Bucket,
  key: string,
  options: {
    options?: DeleteObjectCommandInput;
    onSuccess?: (out: DeleteObjectCommandOutput) => any;
    onError?: () => any;
  } = {}
) =>
  s3Client
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: createBucketKey(bucket, key),
      ...(options.options || {})
    })
    .then(options.onSuccess)
    .catch(options.onError);

export const getObject = (
  bucket: Bucket,
  key: string,
  options: {
    options?: GetObjectCommandInput;
    onSuccess?: (out: GetObjectCommandOutput) => any;
    onError?: () => any;
  } = {}
) =>
  s3Client
    .getObject({
      Bucket: process.env.BUCKET_NAME,
      Key: createBucketKey(bucket, key),
      ...(options.options || {})
    })
    .then(options.onSuccess)
    .catch(options.onError);

export const listObjects = (
  bucket: Bucket,
  prefix: string,
  options: {
    options?: ListObjectsV2CommandInput;
    onSuccess?: (out: ListObjectsV2CommandOutput) => any;
    onError?: () => any;
  } = {}
) =>
  s3Client
    .listObjectsV2({
      Bucket: process.env.BUCKET_NAME,
      Prefix: createBucketKey(bucket, prefix),
      ...(options.options || {})
    })
    .then(options.onSuccess)
    .catch(options.onError);

export const getPresignedUrl = async (key: string) => {
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key }),
    {
      expiresIn: 3600
    }
  );
};

const S3 = {
  Model,
  Background,
  Dataset,
  Network
};

export default S3;
