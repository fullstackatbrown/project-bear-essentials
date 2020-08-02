# README: Brown Essentials - Client

Welcome to the Brown Essentials Client repository!

## Dev Setup

First, ensure that you have the latest versions of Node.js, Yarn, and React Native installed on your machine. This project uses Yarn as a package manager instead of npm. Moreover, ensure that you either have a mobile emulator installed on your computer, or the Expo app installed on your mobile device. Next, run `yarn global add expo-cli` to install Expo, which will be required to begin a local version of the app.

After installing dependencies by running `yarn`, you can serve an instance of the app from your device by running `yarn start`. The DevTools will open in a browser, and by scanning the QR code with your mobile device, a local, hot-reloaded version of the app will run on your device.

## Tooling

### ESLint

This project uses ESLint to enforce code style. To run the linter, run `yarn lint` in the `client/` directory. Some rules to note:

-   Indents should use four (4) spaces.
-   Linebreaks should be in Unix style.
-   Double quotes for strings.
-   Include semicolons.

### TypeScript

This project uses TypeScript to enforce typing. To run the typechecker, run `yarn type` in the `client/` directory. Note that the linter will not enforce type checking, but the typechecker will, so please run both when cleaning your code.

## Building

`yarn build`
