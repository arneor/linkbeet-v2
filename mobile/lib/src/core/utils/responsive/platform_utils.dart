import 'package:flutter/foundation.dart';
import 'dart:io' show Platform;

class PlatformUtils {
  static bool get isAndroid => !kIsWeb && Platform.isAndroid;

  static bool get isIOS => !kIsWeb && Platform.isIOS;
}
