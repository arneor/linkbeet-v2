import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app_colors.dart';
import 'app_radius.dart';
import 'app_typography.dart';

/// LinkBeet AppTheme — "Spatial AI Light" (light mode ONLY, per DESIGN.md)
abstract final class AppTheme {
  static ThemeData get light => ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        scaffoldBackgroundColor: AppColors.pageBg,
        colorScheme: const ColorScheme.light(
          primary: AppColors.accent,
          onPrimary: AppColors.textInverse,
          secondary: AppColors.secondaryBg,
          onSecondary: AppColors.textPrimary,
          surface: AppColors.pageBg,
          onSurface: AppColors.textPrimary,
          error: Color(0xFFDC2626),
          outline: AppColors.border,
        ),
        appBarTheme: AppBarTheme(
          elevation: 0,
          scrolledUnderElevation: 0,
          backgroundColor: AppColors.pageBg,
          foregroundColor: AppColors.textPrimary,
          systemOverlayStyle: SystemUiOverlayStyle.dark,
          titleTextStyle: AppTypography.subHeading,
          centerTitle: false,
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: AppColors.inputBg,
          border: OutlineInputBorder(
            borderRadius: AppRadius.standardRadius,
            borderSide: const BorderSide(color: AppColors.border),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: AppRadius.standardRadius,
            borderSide: const BorderSide(color: AppColors.border),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: AppRadius.standardRadius,
            borderSide: const BorderSide(
              color: AppColors.accentFocusBorder,
              width: 1.5,
            ),
          ),
          hintStyle: AppTypography.inputPlaceholder,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 14,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.accent,
            foregroundColor: AppColors.textInverse,
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: AppRadius.standardRadius,
            ),
            padding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 12,
            ),
            textStyle: AppTypography.buttonPrimary,
          ),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: OutlinedButton.styleFrom(
            foregroundColor: AppColors.textSecondary,
            side: const BorderSide(color: AppColors.border),
            shape: RoundedRectangleBorder(
              borderRadius: AppRadius.standardRadius,
            ),
            padding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 12,
            ),
            textStyle: AppTypography.buttonGhost,
          ),
        ),
        cardTheme: CardThemeData(
          color: AppColors.secondaryBg,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: AppRadius.largeRadius,
          ),
          margin: EdgeInsets.zero,
        ),
        dividerTheme: const DividerThemeData(
          color: AppColors.divider,
          thickness: 1,
          space: 0,
        ),
        chipTheme: ChipThemeData(
          backgroundColor: AppColors.pageBg,
          side: const BorderSide(color: AppColors.border),
          shape: RoundedRectangleBorder(
            borderRadius: AppRadius.circleRadius,
          ),
          labelStyle: AppTypography.filterChip,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        ),
      );
}
