#!/bin/bash
set -e  # Exit immediately if any command fails

# Function to print separators
print_separator() {
    echo
    echo "****************************************"
    echo
}

# Check if platform and flavor are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ Error: Missing arguments."
    echo "Usage: ./build.sh [platform] [flavor] [build_type] [build_number] [build_name]"
    echo "Example: ./build.sh ios stage ipa 42 4.0.0"
    echo "         ./build.sh android prod apk 285 4.0.0"
    exit 1
fi

PLATFORM=$1
FLAVOR=$2
BUILD_TYPE=$3
BUILD_NUMBER=$4
APP_VERSION=$5

# Defaults
if [ -z "$BUILD_TYPE" ]; then
    if [ "$PLATFORM" = "ios" ]; then
        BUILD_TYPE="ipa"
    else
        BUILD_TYPE="apk"
    fi
fi

if [ -z "$BUILD_NUMBER" ]; then
    BUILD_NUMBER="1"
fi

if [ -z "$APP_VERSION" ]; then
    APP_VERSION="1.0.0"
fi

# Clean terminal
clear

# Clean Flutter build
print_separator
echo "🚀 Running flutter clean..."
flutter clean

print_separator
echo "📦 Running flutter pub get..."
flutter pub get

if [ "$PLATFORM" = "ios" ]; then
    print_separator
    echo "📂 Navigating to ios directory..."
    cd ios || exit

    print_separator
    echo "🛠 Running pod deintegrate..."
    pod deintegrate

    print_separator
    echo "🗑 Removing Podfile.lock..."
    rm -f Podfile.lock

    print_separator
    echo "🔄 Updating pod repo..."
    pod repo update

    print_separator
    echo "📦 Running pod install..."
    pod install

    print_separator
    echo "🔙 Navigating back to project root..."
    cd ..

    print_separator
    echo "📲 Building IPA for iOS with version $APP_VERSION+$BUILD_NUMBER"
    flutter build ipa \
      --flavor "$FLAVOR" \
      -t lib/main_$FLAVOR.dart \
      --build-name="$APP_VERSION" \
      --build-number="$BUILD_NUMBER" \
      --release

elif [ "$PLATFORM" = "android" ]; then
    if [ "$BUILD_TYPE" = "apk" ]; then
        print_separator
        echo "📱 Building APK for Android with version $APP_VERSION+$BUILD_NUMBER"
        flutter build apk \
          --flavor "$FLAVOR" \
          -t lib/main_$FLAVOR.dart \
          --build-name="$APP_VERSION" \
          --build-number="$BUILD_NUMBER" \
          --release
    elif [ "$BUILD_TYPE" = "appbundle" ]; then
        print_separator
        echo "📦 Building AAB for Android with version $APP_VERSION+$BUILD_NUMBER"
        flutter build appbundle \
          --flavor "$FLAVOR" \
          -t lib/main_$FLAVOR.dart \
          --build-name="$APP_VERSION" \
          --build-number="$BUILD_NUMBER" \
          --release
    else
        echo "❌ Error: Invalid build type specified. Use 'apk' or 'appbundle'."
        exit 1
    fi
else
    echo "❌ Error: Invalid platform specified. Use 'ios' or 'android'."
    exit 1
fi

print_separator
echo "✅ Build completed for $PLATFORM [$FLAVOR - $BUILD_TYPE] Version: $APP_VERSION+$BUILD_NUMBER"
print_separator