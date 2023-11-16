# HPAIR Delegate Portal

This is the Harvard College Project for Asian and International Relations Delegate Portal for 2022 (and hopefully beyond), where delegates can apply to the HPAIR conferences.

Also see the [docs](./docs/) and the [Notion onboarding page](https://www.notion.so/hpair-docs/HPAIR-Documentation-49b5e33481a94288bad010a6612dd16f) for more information.


## Tech stack

**Project**

- Primary language: Javascript
- Package manager: Node Package Manager (npm)

**Frontend**

- JavaScript library: [React](https://reactjs.org/)
- Build tooling: [react-scripts](https://create-react-app.dev/)
- Styling framework: [Material UI](https://mui.com/material-ui/)

**Backend**

Our backend is entirely built on [Firebase](https://firebase.google.com/), an app development platform from Google.

- Database: [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore)
- Authentication: [Firebase Auth](https://firebase.google.com/docs/auth)
- File storage: [Firebase Cloud Storage](https://firebase.google.com/docs/storage)
- Hosting: [Firebase Hosting](https://firebase.google.com/docs/hosting)
- API and cloud functions: [Firebase Cloud Functions](https://firebase.google.com/docs/functions)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.



### 2. Clone this repository

We recommend setting up an [SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) for authenticating to GitHub.


### 3. Install dependencies

```bash
npm install # install dependencies
```

### 4. Configure Firebase

You will need to connect your local machine to Firebase. Install the [Firebase CLI](https://firebase.google.com/docs/cli). If you are already logged in, you may need to `firebase logout` first.

```sh
npm install firebase-tools
firebase --version # ensure you have at least v10.2.0
firebase login # log in to tech@hpair.org
```

### 5. Configure environment variables

You will need to put the two files `firebase-config.dev.json` and `firebase-config.prod.json` in the `src/` directory. These should contain the necessary credentials to interact with Firebase. Ask a tech associate if you are unsure what these values are. These values are _not_ strictly confidential, but we keep them private so other people can't run phishing scams on our behalf, inadvertently modify user data, or mess with analytics.

You will also need a **private key** for the Firebase Admin SDK for both projects. This can be downloaded from the Firebase project under `Project settings > Service accounts`. You should rename these to `.dev.admin-config.json`, `.prod.admin-config.json`. These go in the `functions/src` folder and are **HIGHLY CONFIDENTIAL.** Access to these allows a person _full access_ to our repository, including our massive amounts of confidential delegate data. Please ensure they are **NEVER** shared to a public location. Whenever these are regenerated, you will also need to update the GitHub secrets

Finally, you will also need to put the SendGrid API Key as well as the authorize.net credentials in `functions/.env`. An example is included in `functions/.env.example`. You can find these in our [internal passwords file](https://docs.google.com/document/d/1V335ElUqSJ73FIpMopH3RoaO2sSGLgXkrUyoRMoeUNs/edit?usp=sharing) (DO NOT SHARE).


### 6. Run the code

```bash
npm run build # launches the Firebase emulator suite, live-compiles the cloud functions, and starts a local development server
```

See [package.json](./package.json) for more information about yarn scripts and deploying.

```sh
firebase deploy
```

## Workflow

### dev branch
We have divided the repository into two principal, permanent banches: `master` and `dev`. The branch `master` holds the current production repo, that is, the code for the app currently deployed to firebase. `master` can only be modified via a pull request, and it should only be modified by merging with `dev` after rigorous testing of all functionality. The other permanent branch, `dev`, holds the app next up for deployment. `dev` is hosted by a Vercel app, and it should only be pushed to with buildable code.