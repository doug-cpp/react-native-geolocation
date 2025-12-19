# React Native Geolocation

## Overview

This project uses [React Native Geolocation](https://github.com/michalchudziak/react-native-geolocation). The Geolocation API module for React Native that extends the [Geolocation web spec](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation). The library supports TurboModules and also legacy React Native architecture. It is fully compatible with TypeScript and supports modern [Play Services Location API](https://developers.google.com/android/reference/com/google/android/gms/location/FusedLocationProviderClient.html).

## Getting Started

> **Note**: Make sure you have prepared your environment with the steps described below before proceeding.

### Prerequisites

- Node.js (version 18 or higher)
- Java JDK (version 17 or higher)
- Android Studio
- Android device with USB debugging enabled

### Environment Setup

#### Install Java SDK (JDK)

- Download and install the latest [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html)
- Set the `JAVA_HOME` environment variable to point to your JDK installation folder
- Verify installation by running `java -version` in your terminal

#### Install Android Studio

- Download and install [Android Studio](https://developer.android.com/studio)
- During installation, include the Android SDK, SDK Platform tools, and Android SDK Build-Tools components
- Install the necessary SDK packages for React Native development

#### Prepare Your Android Device

##### Enable Developer Options

1. Go to **Settings** \> **About phone**
2. Tap **Build number** 7 times until you see "You are now a developer!"
3. Go back to **Settings** \> **Developer options**

##### Enable USB Debugging

1. In **Developer options**, enable **USB debugging**
2. Connect your device to computer via USB cable

##### Grant USB Debugging Permission

1. When first connecting, you'll see a dialog on your device: **"Allow USB debugging?"**
2. Check **"Always allow from this computer"** and tap **OK**
3. If you don't see the prompt, disconnect and reconnect the USB cable

##### Verify Connection

``` sh
adb devices
```

You should see your device listed. If it shows "unauthorized", check the USB debugging prompt on your device.

## Setup and Configuration

### Library Installation

Install the React Native Geolocation library via npm or yarn:

``` bash
npm install @react-native-community/geolocation

# or
yarn add @react-native-community/geolocation
```

### Gradle Version Fix

To avoid build issues, fix your Gradle version dependencies in `android/build.gradle`:

``` gradle
buildscript {
    ext {
        buildToolsVersion = "36.0.0"
        minSdkVersion = 24
        compileSdkVersion = 36
        targetSdkVersion = 36
        ndkVersion = "27.1.12297006"
        kotlinVersion = "2.1.20"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.5.2")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:2.1.20")
    }
}

apply plugin: "com.facebook.react.rootproject"
```

Also specify distribution URL in `android/gradle/wrapper/gradle-wrapper.properties`:

```gradle
distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip
```

These verifications ensure compatibility with the Geolocation native modules.

### Geolocation Permissions

Android (`android/app/src/main/AndroidManifest.xml`):

``` xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### Basic Usage Example

``` tsx
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(info => console.log(info));
```

## Running

### Install Dependencies

``` sh
npm install
```

### Start Metro Bundler

``` sh
npm start
```

### Run on Android Device

``` sh
npm run android
```

## Development Workflow

### Making Changes

1. Edit your files (Metro will automatically detect changes)
2. Save the file — Fast Refresh will update the app instantly
3. For native changes, you may need to run `npm run android` again

### Optional: Install to run on device without Metro or USB Connection

If you want to test or demo the POC without relying on a Metro bundler or being physically connected to your computer via USB (for example, in an outdoor environment), you can build and install a standalone release APK.

```bash
# Go to android directory
cd android

# Build a release
./gradlew assembleRelease

# The release APK will be located at:
# android/app/build/outputs/apk/release/app-release.apk

# With USB device active for now, install the just built release
adb install app/build/outputs/apk/release/app-release.apk
```

> Note: This installation is **optional** and intended for use cases where you want to run the app fully independent from your development machine and without any live reload capabilities.

### Common Development Commands

``` sh
# Start development server
npm start

# Build and run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint
```

## Creating a New POC

To create a new POC from this:

1. **Copy this POC** to a new directory (`cp -r GeoLocationPOC/ NewPOC/`)
2. **Update package.json** with your POC name and description
3. **Add specific dependencies** your POC requires (ex.: `npm install new-lib`)
4. **Remove unused libs in package.json** (ex.: remove `"@react-native-community/geolocation": "^3.4.0",` line)
5. **Remove `node_modules/` folder and `package-lock.json` file** (`rm -rf node_modules package-lock.json`)
6. **Update app.json** with your display name
7. **Rename directory**: from: `android/app/src/main/java/com/geolocationpoc/` to `android/app/src/main/java/com/newpoc`
8. **Update package references** from `com.geolocationpoc` to `com.newpoc` (global find and replace)
9. **Update path references** from `com/geolocationpoc` to `com/newpoc` (global find and replace)
10. **Implement your functionality** in `App.tsx` and new POC components

## Troubleshooting

### Device Not Recognized

``` sh
# Check if device is connected
adb devices
```

#### If device shows "unauthorized"

1. Check USB cable connection
2. Look for USB debugging prompt on device
3. Revoke USB debugging authorizations in Developer options and reconnect

### Build Failures

``` sh
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset Metro cache
npm start -- --reset-cache

# Full clean and reinstall dependencies
rm -rf node_modules/ package-lock.json && npm install
```

### Metro Connection Issues

- Ensure Metro is running (`npm start`)
- Check network when using Wi-Fi debugging
- Verify USB connection

### USB Debugging Not Appearing

1. Try different USB ports
2. Use original device USB cable
3. Check if USB debugging is properly enabled in your device
4. Restart both device and computer if needed

### Useful ADB Commands

``` sh
# List connected devices
adb devices

# Restart ADB server
adb kill-server && adb start-server

# View device logs
adb logcat

# Install APK directly
adb install app-debug.apk
```

## Learn More

- [React Native Official Documentation](https://reactnative.dev/docs/getting-started)
- [Android Developer Setup](https://developer.android.com/studio)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)

This template provides a solid foundation for rapid POC development while maintaining code quality and development best practices.

---

<div align="center"><br/>Made with ❤️ for React Native Android Development<br/>⁂</div>
