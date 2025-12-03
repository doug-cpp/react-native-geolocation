# React Native Geolocation

## 1. Setup and Configuration

This project uses [React Native Geolocation](https://github.com/michalchudziak/react-native-geolocation). The Geolocation API module for React Native that extends the [Geolocation web spec](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation). The library supports TurboModules and also legacy React Native architecture. It is fully compatible with TypeScript and supports modern [Play Services Location API](https://developers.google.com/android/reference/com/google/android/gms/location/FusedLocationProviderClient.html).

## 1.1. Library Installation

Install the React Native Geolocation library via npm or yarn:

```bash
npm install @react-native-community/geolocation

# or
yarn add @react-native-community/geolocation
```

## 1.2. Gradle Version Fix

To avoid build issues, fix your Gradle version dependencies in `android/build.gradle` by setting:

```gradle
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

Also specify distribution URL in android/gradle/wrapper/gradle-wrapper.properties:

```text
distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip
```

These verifications ensure compatibility with the Vision Camera native modules.

## 1.3. Geolocation Permissions

Permissions must be declared in native configuration files.

Android (`android/app/src/main/AndroidManifest.xml`):

```xml
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

These allow the app to request and use geolocation at runtime.

## 1.4. Basic Usage Example

```tsx
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(info => console.log(info));
```

---

## 2. Getting Started

> **Note**: Make sure you have prepared your environment with the steps described below before proceeding.

## 2.1 Prerequisites

- Node.js (version 18 or higher)
- Java JDK (version 17 or higher)
- Android Studio
- Android device with USB debugging enabled

## 2.2. Environment Setup

### 2.2.1. Install Java SDK (JDK)

- Download and install the latest [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html)
- Set the `JAVA_HOME` environment variable to point to your JDK installation folder
- Verify installation by running `java -version` in your terminal

### 2.2.2. Install Android Studio

- Download and install [Android Studio](https://developer.android.com/studio)
- During installation, include the Android SDK, SDK Platform tools, and Android SDK Build-Tools components
- Install the necessary SDK packages for React Native development

### 2.2.3. Prepare Your Android Device

#### Enable Developer Options

1. Go to **Settings** > **About phone**
2. Tap **Build number** 7 times until you see "You are now a developer!"
3. Go back to **Settings** > **Developer options**

#### Enable USB Debugging

1. In **Developer options**, enable **USB debugging**
2. Connect your device to computer via USB cable

#### Grant USB Debugging Permission

1. When first connecting, you'll see a dialog on your device: **"Allow USB debugging?"**
2. Check **"Always allow from this computer"** and tap **OK**
3. If you don't see the prompt, disconnect and reconnect the USB cable

#### Verify Connection

```sh
adb devices
```

You should see your device listed. If it shows "unauthorized", check the USB debugging prompt on your device.

## 3. Running

### 3.1 Install Dependencies

```sh
npm install
```

### 3.2 Start Metro Bundler

```sh
npm start
```

Keep this terminal open - Metro will bundle your JavaScript code.

### 3.3 Run on Android Device

```sh
npm run android
```

This will build and install the app on your connected Android device.

---

## 4. Development Workflow

### 4.1. Making Changes

1. Edit your files (Metro will automatically detect changes)
2. Save the file - Fast Refresh will update the app instantly
3. For native changes, you may need to run `npm run android` again

### 4.2. Common Development Commands

```sh
# Start development server
npm start

# Build and run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint
```

---

## 5. Creating a New POC

To create a new POC from this:

1. **Copy this POC** to a new directory
2. **Update package.json** with your POC name and description
3. **Add specific dependencies** your POC requires
4. **Update app.json** with your display name
5. **Rename Android package** from `com.meuapp` to `com.yourpocname`
6. **Implement your functionality** in `App.tsx` and components

---

### 5.1. Adding New Dependencies

When creating your specific POC, add necessary dependencies:

```bash
# Example for Geolocation POC
npm install react-native-vision-camera
```

### 5.2. Android Configuration Updates

For each new POC, update the following Android files:

#### **`android/app/build.gradle`**

```gradle  
android {
    defaultConfig {
        applicationId "com.yourpocname"  // Update this
    }
}
```

#### **Rename package directory**

```bash
# From:
android/app/src/main/java/com/meuapp/

# To:
android/app/src/main/java/com/yourpocname/
```

#### **Update package references** in

- `MainActivity.kt`
- `MainApplication.kt`
- `AndroidManifest.xml`

---

## 6. Troubleshooting

### 6.1. Device Not Recognized

```sh
# Check if device is connected
adb devices

# If device shows "unauthorized":
# 1. Check USB cable connection
# 2. Look for USB debugging prompt on device
# 3. Revoke USB debugging authorizations in Developer options and reconnect
```

### 6.2. Build Failures

```sh
# Clean Android build
cd android && ./gradlew clean

# Reset Metro cache
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules && npm install
```

### 6.3. Metro Connection Issues

- Ensure Metro is running (`npm start`)
- Check that device and computer are on same network if using Wi-Fi debugging    
- For USB: verify proper connection and drivers

### 6.4. USB Debugging Not Appearing

1. Try different USB ports
2. Use original USB cable
3. Check if USB debugging is properly enabled
4. Restart both device and computer if needed

### 6.5. Useful ADB Commands

```sh

# List connected devices
adb devices

# Restart ADB server
adb kill-server && adb start-server

# View device logs
adb logcat

# Install APK directly
adb install app-debug.apk
```

---

## 6. Learn More

- [React Native Official Documentation](https://reactnative.dev/docs/getting-started)
- [Android Developer Setup](https://developer.android.com/studio)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)

This template provides a solid foundation for rapid POC development while maintaining code quality and development best practices.

<div align="center"> <br/> Made with ❤️ for React Native Android Development </div><div align="center">⁂</div>
