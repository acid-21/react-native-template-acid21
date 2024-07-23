This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# react-native-template-acid21

React native template

This template is used to initialize new RN projects at Acid21 GmbH

Command to start a new project:
npx react-native init ProjectName --template acid21

Used resources:

template:
https://medium.com/dailyjs/the-1-2-3s-of-react-native-templates-1f5dda037e11
https://dev.to/roycechua/how-to-make-your-own-custom-react-native-templates-2021-20l5

navigation:
https://reactnative.dev/docs/navigation
https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da

i18n: https://levelup.gitconnected.com/complete-i18n-guide-to-support-multi-language-for-your-react-native-app-c5ea4e0fa5b3

bottom modals: https://gorhom.github.io/react-native-bottom-sheet/

react native elements: https://reactnativeelements.com/docs
react native paper: https://reactnativepaper.com/

App Icon Generator: https://www.appicon.co/

Toasts: https://github.com/calintamas/react-native-toast-message#readme

App theming:
https://reactnavigation.org/docs/themes/
https://callstack.github.io/react-native-paper/docs/guides/theming

Splash Screen:
https://blog.logrocket.com/building-splash-screens-react-native/

Vector Icons:
https://github.com/oblador/react-native-vector-icons

App Icon change: https://www.npmjs.com/package/app-icon

Common commands:
start project: npm run start
start project with clearing cache: npm start -- --reset-cache
install iod dependencies: cd ios & pod install

Update Version for iOS and Android
The package.json version is used for iOS and Android version. To sync those just run this command:
`npm run aversion`

Deep Links:
https://kaumadiechamalka100.medium.com/how-to-implement-universal-link-app-link-in-react-native-a33eb6532612
https://branch.io/resources/aasa-validator/

Automated Testing:
Selenium documentation: https://www.selenium.dev/documentation/webdriver/drivers/

Rename App or Bundle IDs: https://www.npmjs.com/package/react-native-rename

Generate Release Keystore: keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
Source: https://stackoverflow.com/questions/72974447/how-can-i-make-a-new-release-on-my-android-app-if-i-lost-my-keystore

Automated aab upload:
https://developers.google.com/android-publisher

