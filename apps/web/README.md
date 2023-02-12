This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# System Description

Our system consist of four major components: Frontend, Backend, Server Task Manager and MongoDB.

## Frontend

The frontend is the actual website with the pages the user can see. It has following pages with described functionalities:

### Upload Models **/model/upload**

**User can upload new Blender Models**

The user should select an appropriate file from the local file system and load it. The model should then be visualized in the browser for the user to check if everything is correct. The user should also be able to give the model a name and an access type. The name is later used for reference in the app. The access type denotes if other people are able the see and use the uploaded model. When the user decides to finally uploads the model, everything will be sent to the backend. Afterwards a toast will be shown and the user is directed to **/model/[id]** of its newly created model.

**Todos**

- Upload Model to browser
- Visualize selected model
- Let user input name and access type
- When uploaded, send model, name and accesstype to the backend
- Show toast when uploaded
- Redirect user to **/model/[id]**

**Endpoints**

- Upload model: `POST api/model`

### List Models **api/model**

**List all accessible models**

User should see a list with the name of the models and other useful infos like the access type and the date the model was created. When a model is selected the user will be redirected to the models **/model/[id]** page. The page should contain an "Upload new" button, which redirects to **/model/upload**.

**Todos**

- Fetch all the existing models from the backend
- Show models in list
- Redirect to **/model/[id]** when model is selected
- Redirect to **/model/upload** when upload button is pressed

**Endpoints**

- Get models: `GET api/model`

### Show Model **/model/[id]**

**Show details of a model, allow basic operations and editing.**

User should see a visualization of the selected model and is able to change the name and the access type. A button should allow the user to delete the model. Before finally deleting, the user should be prompted to confirm the operation with a model. It should also be possible to download the model again.

**Todos**

- Fetch model from the backend
- Visualize the model
- Let user change name and access type
- When updated, send changed data to the backend
- When user presses delete button show confirmation modal
- When confirmed, call appropriate endpoint
- After deletion redirect to dashboard
- Show Toast when deleted or updated
- Show toast when model is downloaded

**Endpoints**

- Get model: `GET api/model/[id]`
- Delete model: `DELETE api/model/[id]`
- Update model: `PATCH api/model/[id]`
- Request download Download: `POST api/download/[id]`
- Check download status: `GET api/download/status/[id]`
- Download model: `GET api/model/download/[id]`

### List Datasets **/dataset**

**List all accessable datasets**

User should see a list with the name of the dataset and other useful infos like the access type and the date the dataset was created or the size of the dataset. When a dataset is selected the user will be redirected to the datasets **/dataset/[id]** page. The page should contain a "Create new" button, which redirects to **/dataset/create**.

**Todos**

- Fetch all the existing datasets from the backend
- Show datasets in list
- Redirect when dataset is selected
- Redirect when create button is pressed

**Endpoints**

- Get datasets: `GET api/dataset`

### Create Dataset from Model **/dataset/create**

**Create a new dataset from a selected model**

User should see a list of existing models from which he can select one. The user is also propted to give the dataset a name for later reference and specify the access type. When everything is filled in the user can start the creation of the dataset. After creation is started, the user should be redirected to the dashboard and a toast should be shown.

**Todos**

- Fetch existing models from backend
- Show models in a list and let the user select one
- Let the user fill in a name and specify the access type
- Upload all data to the backend when creation button is pressed
- Redirect user to dashboard
- Show toast

**Endpoints**

- Create Dataset: `POST api/dataset/create`
- Get Models: `GET api/model`

### Show Dataset **/dataset/[id]**

**Show details of a dataset**

Show a detailed page of a dataset and let the user change the name and redefine the access type. It should also be possible to delete and download the dataset. On deletion the user should confirm his operation.

**Todos**

- Fetch dataset from the backend
- Show details of the dataset
- Let user change name and access type
- When updated, send changed data to the backend
- When user presses delete button show confirmation modal
- When confirmed, call appropriate endpoint
- After deletion redirect to dashboard
- Show Toast when deleted or updated
- Show toast when dataset is downloaded

**Endpoints**

- Get dataset: `GET api/dataset/[id]`
- Update dataset: `PATCH api/dataset/[id]`
- Delete dataset: `DELETE api/dataset/[id]`
- Download dataset: `GET api/dataset/download/[id]`

### List Network **/network**

**List all accessable networks**

- Fetch all the existing datasets from the backend
- Show networks in list
- Redirect to **/network/[id]** when network is selected
- Redirect to **/network/train** when train button is pressed

**Endpoints**

- Get networks: `GET api/network`

### Start Training **/network/train**

**Start a new training with selected dataset and network architecture**

- Fetch datasets from the backend
- Show datasets in list or table
- Let user select a dataset
- Fetch network architectures from the backend
- Show network architectures in list or table
- Let user select a network architecture
- Let user define a name and an access type
- Upload all data to the backend when train button is pressed
- Redirect user to dahsboard
- Show toast

**Endpoints**

- Start training: `POST api/network/train`
- Get datasets: `GET api/dataset`
- Get network architectures: `GET api/networkArchitectures`

### Show Network **/network/[id]**

**Show details of an existing network**

- Fetch network details from the backend
- Show details of the network
- Let user change name and access type
- When updated, send changed data to the backend
- When user presses delete button show confirmation modal
- When confirmed, call appropriate endpoint
- After deletion redirect to dashboard
- Show Toast when deleted or updated
- Redirect to dashboard after deletion
- Show toast when network is downloaded

**Endpoints**

- Get network: `GET api/network/[id]`
- Update network: `PATCH api/network/[id]`
- Delete network: `DELETE api/network/[id]`
- Download network: `GET api/network/download/[id]`

### Show Tasks **/task**

**Shows a list of all running and pending tasks**

Tasks are either creation of a dataset or training of a network. Task run asynchronly in dockercontainers on our gpu servers.

- Fetch all tasks created by the user from the backend
- Show all tasks in a list
- When a task is selected redirect to **/task/[id]**

**Endpoints**

- Get tasks: `GET api/task`

### Show specific task **/task/[id]**

**Shows details and the log output of a specific task. User should be allowed to download log output and stop the task, which has to be confirmed.**

- Get details of task and log from backend
- (Get progress of the task)
- Show details and log
- (show progress)
- Check if download of the log is available and either show **Request Download**, **Preparing Data** or **Download** button
- OnStop: Show confirmation model
- OnConfirm: call appropriate endpoint to stop the task

**Endpoints**

- Get task: `GET api/task/[id]`
- Stop task: `DELETE api/task/[id]`
- Request Log download: `POST api/download/request/[id]`
- Get download status: `GET api/download/status/[id]`
- Download log: `GET api/task/download/[id]`

### Sign in **/signin**

**Let the user sign in in with credentials**

**Endpoints**

> Todo

### Sign up **/signup**

**Let the user create a new account**

**Endpoints**

> Todo

### Profile **/profile**

**Let user see and change basic user data**

- Get all user data
- Show user data in input fields. When data is not changeable disable input
- Send updated data to the backend

**Endpoints**

- Get user: `GET api/user/[id]`
- Update user: `PATCH api/user/[id]`

## Backend

### Annotation: Accessibility

Data is accessible for a user if both conditions hold:

- The userId in the model is the same as the sessions user id OR The access type of the model is public
- The model is not marked as deleted

Data belongs to a user when:

- The userId in the datas database entry equals the userId in the session of the request

### Upload Model `POST api/model`

Create a new model and save it.

- Create a model entry in the database
- Upload the real model to the bucket with key [id]\_model.zip
- Create a new Data Request with state upload, so the server will download the model into the file system
- Create Audit Event
- Return the id of the new model

### Get all Models `GET api/model`

Return a list of all accessible models

### Get specific Model `GET api/model/[id]`

Get a specific model based on the model id

Only return the model if it is accessible by the user.

### Delete Model `DELETE api/model/[id]`

Deletes a single model based on the id. The model can only be deleted when it belongs to the user.

- Mark the model with [id] as deleted
- Create a new delete request for the model
- Create Audit Event

### Update Model `PATCH api/model/[id]`

Changes the name or the access type of a model. Always update the updatedAt value as well. A model can only be updated when it belongs to the user.

- Update name and access type of the model
- Create Audit Event

### Download Model `GET api/model/download/[id]`

Download a model. A model can only be downloaded when it belongs to the user.

Either download the model to the client or create a blob url to redirect the user to the file in the bucket.

Create Audit Event when downloaded

### Start new Dataset creation `POST api/dataset/create`

Start the creation of a new dataset based on a selected model.

- Create a new task with status pending and necessary informations
- Create Audit Event

### Get all Datasets `GET api/dataset`

Return a list of all accessible datasets.

### Get specific Dataset `GET api/dataset/[id]`

Return details of a specific dataset, not the whole dataset! Return the dataset only if it is accessible.

### Update Dataset `PATCH api/dataset/[id]`

Update name and access type of a dataset. Only update the values if the dataset belongs to the user.

- Update name and access type of the dataset
- Create Audit Event

### Delete Dataset `DELETE api/dataset/[id]`

Deletes a single dataset based in the is. The dataset can only be deleted whin it belongs to the user.

- Mark the dataset with [id] as deleted
- Create a new Data request with type delete for the dataset
- Create Audit Event

### Download Dataset `GET api/dataset/download/[id]`

Download a dataset. A dataset can only be downloaded when it belongs to the user.

Either download the dataset to the client or create a blob url to redirect the user to the file in the bucket.

- Create Audit Event

### Get all Networks `GET api/network`

Return a list of all accessible networks. Networks are already trained on users datasets.

### Get specific Network `GET api/network/[id]`

Return details of a specific network, not the whole network! Return the network only if it is accessible.

### Update Network `PATCH api/network/[id]`

Update name and access type of a network. Only update the values if the network belongs to the user.

- Update name and access type of the network
- Create Audit Event

### Delete Network `DELETE api/network/[id]`

Deletes a single dataset based in the is. The dataset can only be deleted whin it belongs to the user.

- Mark the network with [id] as deleted
- Create a new Data Request with type delete for the network
- Create Audit Event

### Download Network `GET api/network/download/[id]`

Download a dataset. A dataset can only be downloaded when it belongs to the user.

Either download the dataset to the client or create a blob url to redirect the user to the file in the bucket.

- Create Audit Event

### Start Training `POST api/network/train`

Start the training of a new model based on the selected dataset and the network architecture, which can be something like YOLO, ....

- Schedule a new task with the appropriate type and necessary informations
- Create Audit Event

### Get Network Architectures `GET api/networkArchitectures`

Return a list of all possible network architectures. Can be found in the database.

### Get all Tasks `GET api/task`

Return a list of all running, pending and finished tasks that belongs to the user.

### Get specific Task `GET api/task/[id]`

Return details of a specific task that belongs to the user.

### Stop Task `POST api/task/stop/[id]`

Stop a running task.

- Schedule a new stop request for the task
- Create Audit Event

### Task Finished `POST api/task/finish/[id]`

Called when a task finishes on our servers.

- Mark task as finished.
- Create new Notification that task has completed.
- Create Audit Event

### Download Task Log `GET api/task/download/[id]`

Download a log output of a task. A log output can only be downloaded when it belongs to the user.

Either download the log output to the client or create a blob url to redirect the user to the file in the bucket.

- Create Audit Event

### Request Download `POST api/download/[id]`

Create a download request for a specific type of data with the id [id]. Set the status of the request to pending.

- Create Audit Event

### Get Download Status `GET api/download/status/[id]?type=[type]`

Return the status of a specific download request. [id] should not the the id of the download request but the id of the data. Type is the type of the data.

### Get Notifications `GET api/notification`

Returns a list of all notifications that belong to the user

### Delete Notification `DELETE api/notification/[id]`

Deletes a notification

### Patch Notification `PATCH api/notification/[id]`

Marks a notification as read or unread

## Server

In general, the following properties hold:

- We dont know what traffic we can expect
- We may have huge amounts of data, just because of the datasets alone.
- We want to use the tool internally
- We want to reduce running costs to a bare minimum
- We dont want to overthing huge parts of the architecture when eventually scaling up the app
- Training and dataset creation takes a lot of time, therefore, we can't provide the user an instant result
- We may want to make a monetarization possible in the future
- The servers in our lab dont have a public ip and there is no way of doing that since we dont have access to the ISP or router
- The Server should have the least possible overhead to Be as performant as possible. Running the backend and the tasks on the same machine is not an option.

Therefore, some decisions regarding the whole architecture of the app had been made:

- To reduce costs and for scaling the app internally we definitelly want to run the training and creation of datasets on our own servers.
- Monetarization can be done by prioritising some users over others.
- To reduce costs and handle large amounts of data, we try to keep the data on our servers and not use the buckets if it is not needed. Meaning, we will only upload the data when the user is explicitelly requesting to download them.
- Since the server is not directly accessable by the backend, we have to find a workaround. This workaround will be the async communication over the database. Data is added and marked in the database then read be the server and appropriate processes will be instantiated.

To make the above things possible, the _server_ will be a collection a different python scripts, which will in a given frequency and each taking over one of the following tasks. Additionally some other cronjobs to manage data will be running:

- Update log outputs in the Database of all running tasks
- Check for new download requests and upload requested data to the bucket
- Check for new upload requests and download requested data to the server
- Clean up expired Downloads
- Clean up expired Tasks
- Start new tasks
- Stop tasks
- Delete data
- Delete Notifications

### Log Updater

- Get all currently running tasks
- Read the last X lines of the log
- Update the log in the task

### Uploader

- Get all pending download requests
- Upload the data according the request to our bucket
- Update the download request to be ready instead of pending
- Set the expiration date of the request
- Create a notification for the user, which tells that the download is available

### Downloader

- Get all pending upload requests
- Download the data according the request to our server
- Delete the upload request

### Cleanup Downloads

- Get all expired download requests
- Delete the download requests
- Delete the data in the bucket
- Create a Notification for the user that the download expired

### Cleanup Tasks

- Get all finished Tasks
- Terminate all Dockers
- Get all finished tasks that finished X days ago. A task is finshed when it has the status `aborted` or `finished`.
- Delete the task
- Delete all data that is especially created only for the task (log output)

### Start Task

- Get all Pending tasks from the database
- Start the task according to the type and the included task data (modelId, datasetId...)
- Start the docker with the tasks id as name
- Create a new Notification to tell the user that the task started

### Stop Task

- Read all stop requests from the database
- Stop all dockers in the requests. The dockers name should be the taskId field in the stop request
- Set the appropriate tasks status to be aborted
- Update the UpdatedAt field

### Delete Data

- Check for new delete requests in the database
- Delete the data on the server and in the database referenced by the request
- Delete the entry itself

### Delete Notifications

- Check for notifications that are read and older than X days
- Delete all notifications

# Datatypes

### Basics

```typescript
type AccessType = "public" | "private";
```

```typescript
type DataType = "model" | "dataset" | "network";
```

### User

```typescript
interface User {
  _id: ObjectId; // UUID of the user
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
}
```

### Data

```typescript
interface Data {
  _id: ObjectId; // UUID created by MongoDB when inserting the data. This is the reference to the data stored on the server or in the bucket.
  name: string; // Name of the data the user inputs when uploading.
  accessType: AccessType; // Wether other users can see this data or not.
  userId: string | undefined; // UUID of the user who uploaded the data.
  createdAt: Date; // Date the data was uploaded.
  updatedAt: Date; // Last time the data was updated
  isDeleted: boolean | undefined; // Wether the data is deleted or not
}
```

### Model

```typescript
interface Model extends Data {}
```

### Dataset

```typescript
interface Dataset extends Data {
  modelId: ObjectId;
}
```

### Network

```typescript
interface Network extends Data {
  datasetId: ObjectId;
  networkArchitectureId: ObjectId;
}
```

### Network Architecture

```typescript
interface NetworkArchitecture {
  _id: ObjectId;
  name: string;
  identifier: string;
  description: string;
  createdAt: Date;
}
```

### Data Request (Download, Upload, Delete)

```typescript
type DataRequestType = "download" | "upload" | "delete";
```

```typescript
interface DataRequest {
  _id: ObjectId;
  userId: ObjectId;
  dataId: ObjectId;
  dataType: DataType;
  createdAt: Date;
  type: DataRequestType;
}
```

```typescript
interface Download extends Omit<DataRequest, "type"> {
  expiresAt: Date;
}
```

### Task

```typescript
type TaskType = "network" | "dataset";
```

```typescript
type TaskStatus = "pending" | "running" | "aborted" | "finished";
```

```typescript
interface Task {
  _id: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  type: TaskType;
  info: {
    modelId?: ObjectId;
    datasetId?: ObjectId;
    networkArchitectureId?: ObjectId;
  };
}
```

### Task Stop Request

```typescript
interface StopRequest {
  _id: ObjectId;
  taskId: ObectId;
  userId: ObjectId;
  createdAt: Date;
}
```

### Audit Event

```typescript
type AuditEventType =
  | "CREATE_MODEL"
  | "UPDATE_MODEL"
  | "DELETE_MODEL"
  | "DOWNLOAD_MODEL"
  | "REQUEST_MODEL_DOWNLOAD"
  | "CREATE_DATASET"
  | "DATASET_CREATED"
  | "CREATE_DATASET"
  | "UPDATE_DATASET"
  | "DELETE_DATASET"
  | "DOWNLOAD_DATASET"
  | "REQUEST_DATASET_DOWNLOAD"
  | "TRAING_NETWORK"
  | "NETWORK_TRAINED"
  | "CREATE_NETWORK"
  | "UPDATE_NETWORK"
  | "DELETE_NETWORK"
  | "DOWNLOAD_NETWORK"
  | "REQUEST_NETWORK_DOWNLOAD"
  | "STOP_TASK"
  | "CREATE_USER"
  | "LOG_IN_USER";
```

```typescript
interface AuditEvent {
  _id: ObjectId;
  userId: ObjectId | undefined;
  type: AuditEventType;
  createdAt: Date;
}
```

### Notifiactions

```typescript
interface Notification {
  _id: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  read: boolean;
  description: string;
  title: string;
}
```

<!--
# Additional Explenations

### Downloads

### Tasks

### Notifications

### Deletions -->
