# Chat
<br>
Mobile Chat App created using React Native.<br>
Provides users with a customizable chat interface and options to share images and location.
<br>

## Features 
* Sign in with Anonymous Username<br>
* Send/Receive Messages in Real-Time<br>
* Select Chat Room Background Color<br>
* Image and Location Sharing<br>
* View Cached Chats While Offline<br>

## Technologies Used:
* Developed and tested using Expo<br>
* Chat interface and functionalities created using React Native Gifted Chat<br>
* Storage sources: Google Firestore Database (images) and user's device local storage<br>
* Users authenticated anonymously using Google Firebase authentication<br>
* Designed according to client specifications<br>


# How to Set Up Your Own Chat App--

## Setting Up the Development Environment
1. Ensure you have a suitable version of Node installed. <br>
* Check [Expo's Documentation](https://docs.expo.dev/) and run ```npm --version``` in your terminal to ensure your version of Node is compatible. <br>
2. Install Expo on your machine with ```npm install -g expo-cli``` <br>
3. You'll also need a place to run the project.  Either download the Expo Go app on your physical device or follow the instructions below on how to Set Up An Emulator.<br>
4. Sign up for an Expo account [here](https://expo.dev/signup).<br>
5. Finally, log into Expo on your terminal with ```expo login```.  You can check the currently logged in account witih ```expo whoami```.<br>

### Setting Up An Emulator
I used Android Studio's Virtual Device emulator. Check out the official documentation for [Android Studio](https://developer.android.com/studio/run/emulator-acceleration). <br>
Here's how I set one up:
1. [Download](https://developer.android.com/studio) and install Android Studio.
2. Select Custom installation type and be sure to Select "Android Virtual Device".
3. Configure Android Studio from the Welcome Screen by first selecting "More Actions" and "SDK Manager" from the dropdown menu.
4. Check which Android SDK Platform is installed by default and select the Google Play System Image that corresponds with the platform.<br>
* Note: If you're using an older machine, like my 2017 Macbook Air, you'll need to select an older version of these items that corresponds with API Level 33 and only encountered minor issues.
5. Back on the Welcome Screen, select "More Options" again and select "Virtual Device Manager" from the dropdown menu.
6. Create a Virtual Device and be sure to select one with the Google Play Icon.
7. Once your virtual device is created, Open Virtual Device Manager again, and click on the Play butto. Your emulator will "Start Up".

### Setting Up Storage
If you want your App to save any message data from the chat, you'll need a storage solution.  I used Google Firebase, instructions for implementing below.
1. Head to [Google Firebase](https://firebase.google.com/) and click on Get Started.  If this is your first time using Google Firebase, complete your registration before moving to Step 2.
2. Click on 'Add a Project' or 'Create a Project'.  Once it loads, click **Continue** and give your project a name.
3. From the **Build** menu on the left hand side of your screen, click on **Firestore Database**, and then click on Create Database in the main screen.
4. Create your Database in Production Mode, Select the Multi-region network that's closest to you, and click Next.
5. Click on the **Rules** tab and change ```allow read, write: if false;``` to ```allow read, write: if true;``` and click on the Publish button.
6. Once you create your Expo project (next section), you'll come back to Firebase to register your app and connect it to your **Web App** with the Firebase SDK.<br>
**Once you're back to your App in Firebase:**
* Open your **Project Settings** from the Settings Icon on the top left of your screen and scroll down to **Your Apps**.  
* You'll want to register your App as a **Web App** so click on the ```</>``` icon.
* Name your App, then follow the instructions to include your ```firebaseConfig``` information in your code file.

## Creating an Expo Project
1. ```npx create-expo-app your-app-title --template```<br>
If this is your first Expo App, you'll likely receive a few permission prompts, so type ```y``` and press Enter as needed.<br>
2. I used a ```Blank``` template and installed necessary dependencies along the way, but feel free to use ```Navigation (Typescript)``` instead, if you're using Typescript instead of JS. <br>
3. Run ```expo start``` and navigate to the app you're running it on to be sure it's ready to go.

## Dependencies Necessary
In your project directory you'll need to install the following:<br>
* ```"expo-image-picker"```
* ```"expo-location"```
* ```"expo-media-library"```
* ```"firebase"```
* ```"react"```
* ```"react-native"```
* ```"react-native-gifted-chat"```
* ```"react-native-navigation"```
* ```"react-native-maps"```
* ```"react-native-screens"```
* ```"@react-native-async-storage/async-storage"```<br>
<br>

## Here's my Chat App in action
[<img src="https://youtube.com/shorts/PCV3IW9spaw" width="50%">](https://youtube.com/shorts/PCV3IW9spaw "Chat App Demo")