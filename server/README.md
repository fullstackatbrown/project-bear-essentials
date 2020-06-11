# README: Brown Essentials - Server

Welcome to the Brown Essentials Server repository!

## Dev Setup

First, ensure that you have the latest versions of Node.js and installed on your machine. This project uses Yarn as a package manager instead of npm. After installing dependencies by running `yarn`, you can start the webserver by running `yarn start`. This will start a local instance of the webserver at port 8080, unless otherwise specified.

## Tooling

### ESLint

This project uses ESLint to enforce code style. To run the linter, run `yarn lint` in the `client/` directory. Some rules to note:

- Indents should use four (4) spaces.
- Linebreaks should be in Unix style.
- Double quotes for strings.
- Include semicolons.

### TypeScript

This project uses TypeScript to enforce typing. To run the typechecker, run `yarn type` in the `client/` directory. Note that the linter will not enforce type checking, but the typechecker will, so please run both when cleaning your code.

## Deployment

First, ensure that you have the Google Cloud cli installed, and that the account you are signed into has authorization to access the Brown Essential GCP console. Next, run the following two commands in the `server/` directory:

```bash
gcloud builds submit --tag gcr.io/fsab-brown-essentials/api
gcloud beta run deploy --image gcr.io/fsab-brown-essentials/api
```

This will serve the API at https://api-2cu446h72q-uc.a.run.app/graphql.
