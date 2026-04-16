import 'package:flutter/material.dart';

class AppTextStyle {
  AppTextStyle._();

  static TextTheme _textTheme(BuildContext context) =>
      Theme.of(context).textTheme;

  // Display Styles
  static TextStyle? displayLarge(BuildContext context) =>
      _textTheme(context).displayLarge;
  static TextStyle? displayMedium(BuildContext context) =>
      _textTheme(context).displayMedium;
  static TextStyle? displaySmall(BuildContext context) =>
      _textTheme(context).displaySmall;

  // Headline Styles
  static TextStyle? headlineLarge(BuildContext context) =>
      _textTheme(context).headlineLarge;
  static TextStyle? headlineMedium(BuildContext context) =>
      _textTheme(context).headlineMedium;
  static TextStyle? headlineSmall(BuildContext context) =>
      _textTheme(context).headlineSmall;

  // Title Styles
  static TextStyle? titleLarge(BuildContext context) =>
      _textTheme(context).titleLarge;
  static TextStyle? titleMedium(BuildContext context) =>
      _textTheme(context).titleMedium;
  static TextStyle? titleSmall(BuildContext context) =>
      _textTheme(context).titleSmall;

  // Body Styles
  static TextStyle? bodyLarge(BuildContext context) =>
      _textTheme(context).bodyLarge;
  static TextStyle? bodyMedium(BuildContext context) =>
      _textTheme(context).bodyMedium;
  static TextStyle? bodySmall(BuildContext context) =>
      _textTheme(context).bodySmall;

  // Label Styles
  static TextStyle? labelLarge(BuildContext context) =>
      _textTheme(context).labelLarge;
  static TextStyle? labelMedium(BuildContext context) =>
      _textTheme(context).labelMedium;
  static TextStyle? labelSmall(BuildContext context) =>
      _textTheme(context).labelSmall;
}
