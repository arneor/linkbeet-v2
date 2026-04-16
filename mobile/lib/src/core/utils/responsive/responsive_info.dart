import 'dart:io' show Platform;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/utils/responsive/responsive_config.dart';
import 'package:linkbeet/src/core/utils/responsive/responsive_type.dart';

/// Responsive utilities and information
class ResponsiveInfo {
  final DeviceType deviceType;
  final ScreenSize screenSize;
  final PlatformType platformType;
  final Size screenSize2D;
  final double pixelRatio;
  final Orientation orientation;
  final bool isLandscape;
  final bool isPortrait;
  final double aspectRatio;
  final bool isHighDensity;
  final bool isMediumDensity;
  final bool isLowDensity;

  const ResponsiveInfo({
    required this.deviceType,
    required this.screenSize,
    required this.platformType,
    required this.screenSize2D,
    required this.pixelRatio,
    required this.orientation,
    required this.isLandscape,
    required this.isPortrait,
    required this.aspectRatio,
    required this.isHighDensity,
    required this.isMediumDensity,
    required this.isLowDensity,
  });

  /// Create ResponsiveInfo from BuildContext
  factory ResponsiveInfo.of(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final size = mediaQuery.size;
    final width = size.width;
    final height = size.height;
    final pixelRatio = mediaQuery.devicePixelRatio;
    final orientation = mediaQuery.orientation;
    final aspectRatio = width / height;

    // Determine platform type
    PlatformType platformType;
    if (kIsWeb) {
      platformType = PlatformType.web;
    } else {
      if (Platform.isIOS) {
        platformType = PlatformType.ios;
      } else if (Platform.isAndroid) {
        platformType = PlatformType.android;
      } else if (Platform.isMacOS) {
        platformType = PlatformType.macos;
      } else if (Platform.isWindows) {
        platformType = PlatformType.windows;
      } else if (Platform.isLinux) {
        platformType = PlatformType.linux;
      } else if (Platform.isFuchsia) {
        platformType = PlatformType.fuchsia;
      } else {
        platformType = PlatformType.web;
      }
    }

    // Determine device type based on platform and screen size
    DeviceType deviceType;
    if (width >= ResponsiveConfig.tvBreakpoint) {
      deviceType = DeviceType.tv;
    } else if (width >= ResponsiveConfig.desktopBreakpoint) {
      deviceType = DeviceType.desktop;
    } else if (width >= ResponsiveConfig.tabletBreakpoint) {
      deviceType = DeviceType.tablet;
    } else if (width >= ResponsiveConfig.mobileBreakpoint) {
      // Additional logic for tablet detection on mobile platforms
      if ((platformType == PlatformType.ios ||
              platformType == PlatformType.android) &&
          aspectRatio < ResponsiveConfig.tabletAspectRatio &&
          width > 700) {
        deviceType = DeviceType.tablet;
      } else {
        deviceType = DeviceType.mobile;
      }
    } else {
      // Very small screens - could be watch or small mobile
      if (width < 300 || height < 300) {
        deviceType = DeviceType.watch;
      } else {
        deviceType = DeviceType.mobile;
      }
    }

    // Override device type for desktop platforms
    if (platformType == PlatformType.macos ||
        platformType == PlatformType.windows ||
        platformType == PlatformType.linux) {
      if (width >= ResponsiveConfig.desktopBreakpoint) {
        deviceType = DeviceType.desktop;
      } else if (width >= ResponsiveConfig.tabletBreakpoint) {
        deviceType = DeviceType.tablet;
      } else if (width >= ResponsiveConfig.mobileBreakpoint) {
        deviceType = DeviceType.mobile;
      } else {
        // Keep the original detection for very small screens
        deviceType = deviceType;
      }
    }

    // Determine screen size category
    ScreenSize screenSize;
    if (width < ResponsiveConfig.mobileBreakpoint) {
      screenSize = ScreenSize.small;
    } else if (width < ResponsiveConfig.tabletBreakpoint) {
      screenSize = ScreenSize.medium;
    } else if (width < ResponsiveConfig.desktopBreakpoint) {
      screenSize = ScreenSize.large;
    } else {
      screenSize = ScreenSize.extraLarge;
    }

    // Density information
    final isHighDensity = pixelRatio >= ResponsiveConfig.highDensityThreshold;
    final isMediumDensity =
        pixelRatio >= ResponsiveConfig.mediumDensityThreshold &&
        pixelRatio < ResponsiveConfig.highDensityThreshold;
    final isLowDensity = pixelRatio < ResponsiveConfig.mediumDensityThreshold;

    return ResponsiveInfo(
      deviceType: deviceType,
      screenSize: screenSize,
      platformType: platformType,
      screenSize2D: size,
      pixelRatio: pixelRatio,
      orientation: orientation,
      isLandscape: orientation == Orientation.landscape,
      isPortrait: orientation == Orientation.portrait,
      aspectRatio: aspectRatio,
      isHighDensity: isHighDensity,
      isMediumDensity: isMediumDensity,
      isLowDensity: isLowDensity,
    );
  }

  // Convenience getters for device types
  bool get isMobile => deviceType == DeviceType.mobile;
  bool get isTablet => deviceType == DeviceType.tablet;
  bool get isDesktop => deviceType == DeviceType.desktop;
  bool get isTV => deviceType == DeviceType.tv;
  bool get isWatch => deviceType == DeviceType.watch;

  // Convenience getters for platforms
  bool get isIOS => platformType == PlatformType.ios;
  bool get isAndroid => platformType == PlatformType.android;
  bool get isMacOS => platformType == PlatformType.macos;
  bool get isWindows => platformType == PlatformType.windows;
  bool get isLinux => platformType == PlatformType.linux;
  bool get isWeb => platformType == PlatformType.web;
  bool get isFuchsia => platformType == PlatformType.fuchsia;

  // Convenience getters for screen sizes
  bool get isSmallScreen => screenSize == ScreenSize.small;
  bool get isMediumScreen => screenSize == ScreenSize.medium;
  bool get isLargeScreen => screenSize == ScreenSize.large;
  bool get isExtraLargeScreen => screenSize == ScreenSize.extraLarge;

  // Platform groups
  bool get isMobilePlatform => isIOS || isAndroid;
  bool get isDesktopPlatform => isMacOS || isWindows || isLinux;
  bool get isTouchDevice =>
      isMobilePlatform || (isWeb && (isMobile || isTablet));

  @override
  String toString() {
    return 'ResponsiveInfo(deviceType: $deviceType, screenSize: $screenSize, '
        'platformType: $platformType, orientation: $orientation, '
        'size: ${screenSize2D.width}x${screenSize2D.height}, '
        'pixelRatio: $pixelRatio, aspectRatio: ${aspectRatio.toStringAsFixed(2)})';
  }
}
