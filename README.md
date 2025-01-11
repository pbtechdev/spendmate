## For starting Android - development
npx expo prebuild --clean

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH

npx expo run:android


## To get the SHA-1 fingure print
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android


## How to install any library for Expo project
npx expo install <your-package-name>