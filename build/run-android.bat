gradle assembleDebug ^
&& adb install -r ./app/build/outputs/apk/debug/app-debug.apk ^
&& adb shell am start -n com.example.app/com.example.app.MainActivity

