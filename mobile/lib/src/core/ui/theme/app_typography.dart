import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'app_colors.dart';

/// LinkBeet Design System — Typography Scale
/// Uses Google Fonts Inter for consistency with web.
abstract final class AppTypography {
  static TextStyle get _baseStyle => GoogleFonts.inter(
        color: AppColors.textPrimary,
      );

  // === Display ===
  static TextStyle get heroGreeting => _baseStyle.copyWith(
        fontSize: 30,
        fontWeight: FontWeight.w500,
        height: 1.15,
        letterSpacing: -0.5,
      );

  static TextStyle get sectionHeading => _baseStyle.copyWith(
        fontSize: 28,
        fontWeight: FontWeight.w600,
        height: 1.10,
        letterSpacing: -0.5,
      );

  // === Headings ===
  static TextStyle get tileHeading => _baseStyle.copyWith(
        fontSize: 22,
        fontWeight: FontWeight.w400,
        height: 1.14,
        letterSpacing: 0.196,
      );

  static TextStyle get subHeading => _baseStyle.copyWith(
        fontSize: 18,
        fontWeight: FontWeight.w400,
        height: 1.19,
        letterSpacing: 0.231,
      );

  // === Body ===
  static TextStyle get body => _baseStyle.copyWith(
        fontSize: 17,
        fontWeight: FontWeight.w400,
        height: 1.47,
        letterSpacing: -0.374,
      );

  static TextStyle get bodySecondary => body.copyWith(
        color: AppColors.textSecondary,
      );

  // === Navigation ===
  static TextStyle get navLabel => _baseStyle.copyWith(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        color: AppColors.textSecondary,
      );

  static TextStyle get navLabelActive => navLabel.copyWith(
        color: AppColors.accent,
      );

  // === Input ===
  static TextStyle get inputText => _baseStyle.copyWith(
        fontSize: 17,
        fontWeight: FontWeight.w400,
        height: 1.5,
        letterSpacing: -0.5,
        color: AppColors.textPrimary,
      );

  static TextStyle get inputPlaceholder => inputText.copyWith(
        color: AppColors.textPlaceholder,
      );

  // === Chips & Pills ===
  static TextStyle get filterChip => _baseStyle.copyWith(
        fontSize: 13,
        fontWeight: FontWeight.w500,
        color: AppColors.textSecondary,
      );

  static TextStyle get suggestionPill => _baseStyle.copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: AppColors.textSecondary,
      );

  // === Buttons ===
  static TextStyle get buttonPrimary => _baseStyle.copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: AppColors.textInverse,
      );

  static TextStyle get buttonGhost => _baseStyle.copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: AppColors.textSecondary,
      );

  // === Captions & Micro ===
  static TextStyle get caption => _baseStyle.copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        height: 1.29,
        letterSpacing: -0.224,
        color: AppColors.textSecondary,
      );

  static TextStyle get micro => _baseStyle.copyWith(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        height: 1.33,
        letterSpacing: -0.12,
        color: AppColors.textTertiary,
      );

  // === Badge ===
  static TextStyle get badge => _baseStyle.copyWith(
        fontSize: 11,
        fontWeight: FontWeight.w500,
      );
}
