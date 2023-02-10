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

### Frontend

The frontend is the actual website with the pages the user can see. It has following pages with described functionalities:

### Upload Models **/model/upload**

**User can upload new Blender Models**

The user should select an appropriate file from the local file system and load it. The model should then be visualized in the browser for the user to check if everything is correct. The user should also be able to give the model a name and an access type. The name is later used for reference in the app. The access type denotes if other people are able the see and use the uploaded model. When the user decides to finally uploads the model, everything will be sent to the backend. Afterwards a toast will be shown and the user is directed to __/model/[id]__ of its newly created model.

**Todos**

- Upload Model to browser
- Visualize selected model
- Let user input name and access type
- When uploaded, send model, name and accesstype to the backend
- Show toast when uploaded
- Redirect user to page of new model

**Endpoints**

Upload model: `POST /model`

### List Models **api/model**

**List all accessible models**

User should see a list with the name of the models and other useful infos like the access type and the date the model was created. When a model is selected the user will be redirected to the models __/model/[id]__ page. The page should contain an "Upload new" button, which redirects to __/model/upload__.

**Todos**

- Fetch all the existing models from the backend
- Show models in list
- Redirect when model is selected
- Redirect when upload button is pressed

**Endpoints**

Get models: `GET api/model`

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

Get model: `GET api/model/[id]`

Delete model: `DELETE api/model/[id]`

Update model: `PATCH api/model/[id]`

Download model: `GET api/model/download/[id]`

### List Datasets **/dataset**

**List all accessable datasets**

User should see a list with the name of the dataset and other useful infos like the access type and the date the dataset was created or the size of the dataset. When a dataset is selected the user will be redirected to the datasets __/dataset/[id]__ page. The page should contain a "Create new" button, which redirects to __/dataset/create__.

**Todos**

- Fetch all the existing datasets from the backend
- Show datasets in list
- Redirect when dataset is selected
- Redirect when craete button is pressed

**Endpoints**

Get datasets: `GET api/dataset`

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

Create Dataset: `POST api/dataset/create`

Get Models: `GET api/model`

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

Get dataset: `GET api/dataset/[id]`

Update dataset: `PATCH api/dataset/[id]`

Delete dataset: `DELETE api/dataset/[id]`

Download dataset: `GET api/dataset/download/[id]`

### List Network **/network**

**List all accessable networks**

- Fetch all the existing datasets from the backend
- Show networks in list
- Redirect to __/network/[id]__ when network is selected
- Redirect to __/network/train__ when train button is pressed

**Endpoints**

Get networks: `GET api/network`

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

Start training: `POST api/network/train`
Get datasets: `GET api/dataset`
Get network architectures: `GET api/networkArchitectures`

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

Get network: `GET api/network/[id]`

Update network: `PATCH api/network/[id]`

Delete network: `DELETE api/network/[id]`

Download network: `GET api/network/download/[id]`

### Show Tasks **/task**

**Shows a list of all running and pending tasks**

Tasks are either creation of a dataset or training of a network. Task run asynchronly in dockercontainers on our gpu servers.

- Fetch all tasks created by the user from the backend
- Show all tasks in a list
- When a task is selected redirect to __/task/[id]__

**Endpoints**

Get tasks: `GET api/task`

### Show specific task **/task/[id]**

**Shows details and the log output of a specific task. User should be allowed to download log output and stop the task, which has to be confirmed.**

- Get details of task and log from backend
- (Get progress of the task)
- Show details and log 
- (show progress)
- Check if download of the log is available and either show __Request Download__, __Preparing Data__ or __Download__ button
- OnStop: Show confirmation model
- OnConfirm: call appropriate endpoint to stop the task

** Endpoints**

Get task: `GET api/task/[id]`

Request Log download: `POST api/task/download/request/[id]`

Get download status: `GET api/download/status/[id]`

Download log: `GET api/task/download/[id]`

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

Get user: `GET api/user/[id]`

Update user: `PATCH api/user/[id]`

# Datatypes

## Access Type

```typescript
type AccessType = "public" | "private"
```

## Model



```typescript
interface Model {
  _id: string,
  name: string,
  accessType: AccessType,
  ownerId: string | undefined,
  createdAt: Date,
  updatedAt: Date
}
```

**_id**: uuid created by MongoDB when inserting the data.
**name**: Name of the model the user inputs when uploading.
**accessType**: Wether other users can see this model or not.
**ownerId**: uuid of the user who uploaded the model.
**createdAt**: Date the model was uploaded.
**updatedAt**: Date the model was updated the last time.

## 
