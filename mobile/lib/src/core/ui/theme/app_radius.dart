import 'package:flutter/material.dart';

/// LinkBeet Design System — Border Radius Scale
abstract final class AppRadius {
  static const double micro = 5;
  static const double standard = 8;
  static const double comfortable = 11;
  static const double large = 12;
  static const double searchInput = 24;
  static const double sendButton = 20;
  static const double pill = 980;
  static const double circle = 999;

  // Convenience BorderRadius objects
  static final BorderRadius microRadius = BorderRadius.circular(micro);
  static final BorderRadius standardRadius = BorderRadius.circular(standard);
  static final BorderRadius comfortableRadius =
      BorderRadius.circular(comfortable);
  static final BorderRadius largeRadius = BorderRadius.circular(large);
  static final BorderRadius searchRadius = BorderRadius.circular(searchInput);
  static final BorderRadius sendRadius = BorderRadius.circular(sendButton);
  static final BorderRadius pillRadius = BorderRadius.circular(pill);
  static final BorderRadius circleRadius = BorderRadius.circular(circle);
}
