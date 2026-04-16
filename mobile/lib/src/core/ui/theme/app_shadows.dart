import 'package:flutter/material.dart';

import 'app_colors.dart';

/// LinkBeet Design System — Shadow Tokens
abstract final class AppShadows {
  /// Default card shadow: 0 8px 30px rgba(0,0,0,0.06)
  static const List<BoxShadow> card = [
    BoxShadow(
      color: AppColors.shadowDefault,
      offset: Offset(0, 8),
      blurRadius: 30,
    ),
  ];

  /// Focus shadow: 0 4px 30px rgba(0,113,227,0.15)
  static const List<BoxShadow> focus = [
    BoxShadow(
      color: AppColors.shadowFocus,
      offset: Offset(0, 4),
      blurRadius: 30,
    ),
  ];

  /// Small shadow for chips/pills
  static const List<BoxShadow> sm = [
    BoxShadow(
      color: Color(0x0A000000),
      offset: Offset(0, 1),
      blurRadius: 3,
    ),
    BoxShadow(
      color: Color(0x0A000000),
      offset: Offset(0, 1),
      blurRadius: 2,
    ),
  ];
}
