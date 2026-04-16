import 'package:flutter/material.dart';

// ─── LinkBeet AppColors — "Spatial AI Light" (locked 2026-04-15) ─────────────
// Theme: light mode only. Apple Blue #0071e3 is the ONLY chromatic accent.
// No dark backgrounds. No gradients. No secondary accent colors.
// Mirrors DESIGN.md §1 and shared/constants/src/colors.ts.
class AppColors {
  AppColors._();

  // ── Core Palette ──────────────────────────────────────────────────────────
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);

  // ── Backgrounds ───────────────────────────────────────────────────────────
  static const Color pageBg = Color(0xFFFFFFFF); // Main content, all screens
  static const Color secondaryBg = Color(0xFFF5F5F7); // Cards, section fills
  static const Color inputBg = Color(0xFFFFFFFF); // Search inputs, form fields
  // Sidebar frosted glass — use with BackdropFilter (rgba(249,250,251,0.90))
  static const Color sidebarBg = Color(0xFFF9FAFB); // slate-50
  static const Color sidebarBgFrosted = Color(
    0xE6F9FAFB,
  ); // slate-50 @ 0.90 alpha

  // ── Text ──────────────────────────────────────────────────────────────────
  static const Color textPrimary = Color(
    0xFF1D1D1F,
  ); // #1d1d1f — headings, body
  static const Color textSecondary = Color(
    0xFF475569,
  ); // slate-600 — nav labels, descriptions
  static const Color textTertiary = Color(
    0xFF64748B,
  ); // slate-500 — subtitles, placeholders
  static const Color textPlaceholder = Color(
    0xFFCBD5E1,
  ); // slate-300 — input placeholder
  static const Color textInverse = Color(0xFFFFFFFF); // On blue buttons/badges

  // ── Interactive — Apple Blue is the ONLY chromatic accent ─────────────────
  static const Color accent = Color(
    0xFF0071E3,
  ); // #0071e3 — CTAs, active nav, send btn
  static const Color accentHover = Color(0xFF0077ED); // #0077ED — hover state
  static const Color accentTintBg = Color(
    0x1A0071E3,
  ); // rgba(0,113,227,0.10) — active nav bg
  static const Color accentTintRing = Color(
    0x0D0071E3,
  ); // rgba(0,113,227,0.05) — focus ring
  static const Color accentFocusBorder = Color(
    0x660071E3,
  ); // rgba(0,113,227,0.40) — focused border
  static const Color link = Color(0xFF0066CC); // #0066cc — inline links

  // ── Borders & Dividers ────────────────────────────────────────────────────
  static const Color border = Color(
    0xFFE2E8F0,
  ); // slate-200 — inputs, chips, cards
  static const Color divider = Color(0xFFE2E8F0); // slate-200 — same token

  // ── Semantic (functional — NOT brand) ─────────────────────────────────────
  static const Color success = Color(0xFF10B981); // emerald-500
  static const Color successBg = Color(0xFFD1FAE5); // emerald-100
  static const Color successBorder = Color(0xFF6EE7B7); // emerald-200
  static const Color warning = Color(0xFFF59E0B);
  static const Color warningBg = Color(0xFFFEF3C7);
  static const Color error = Color(0xFFEF4444);
  static const Color errorBg = Color(0xFFFEE2E2);
  static const Color info = Color(0xFF3B82F6);
  static const Color infoBg = Color(0xFFDBEAFE);

  // ── Emerald "Open Now" chip — ONLY use for live-status indicators ──────────
  static const Color openNowText = Color(0xFF065F46); // emerald-700
  static const Color openNowBg = Color(0xFFD1FAE5); // emerald-50
  static const Color openNowBorder = Color(0xFF6EE7B7); // emerald-200

  // ── Overlay ───────────────────────────────────────────────────────────────
  static const Color drawerOverlay = Color(0x80000000); // bg-black/50

  // ── Shadow color references (use in BoxShadow) ────────────────────────────
  // Card shadow:  0 8px 30px rgba(0,0,0,0.06)
  static const Color shadowCard = Color(0x0F000000);
  // Focus shadow: 0 4px 30px rgba(0,113,227,0.15)
  static const Color shadowFocus = Color(0x260071E3);

  // ── BoxShadow constants ────────────────────────────────────────────────────
  static const List<BoxShadow> cardShadow = [
    BoxShadow(color: shadowCard, blurRadius: 30, offset: Offset(0, 8)),
  ];
  static const List<BoxShadow> focusShadow = [
    BoxShadow(color: shadowFocus, blurRadius: 30, offset: Offset(0, 4)),
  ];

  // ── Material ColorScheme — light mode only ────────────────────────────────
  // DESIGN.md §9: "No dark mode."
  static const ColorScheme lightColorScheme = ColorScheme.light(
    primary: accent, // Apple Blue — all primary actions
    onPrimary: white, // White text on blue
    secondary: secondaryBg, // #f5f5f7 — card/surface fill
    onSecondary: textPrimary,
    surface: pageBg, // #ffffff
    onSurface: textPrimary, // #1d1d1f
    error: error,
    onError: white,
    outline: border, // slate-200
    shadow: shadowCard,
    brightness: Brightness.light,
  );
}

// ─── CustomColors ThemeExtension ──────────────────────────────────────────────
// Provides LinkBeet semantic tokens not available in the base ColorScheme.
// Access via: Theme.of(context).extension<CustomColors>()!
@immutable
class CustomColors extends ThemeExtension<CustomColors> {
  const CustomColors({
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.textPlaceholder,
    required this.accent,
    required this.accentTintBg,
    required this.cardBg,
    required this.inputFill,
    required this.inputFocusedBorder,
    required this.borderDefault,
    required this.success,
    required this.warning,
    required this.openNowText,
    required this.openNowBg,
    required this.openNowBorder,
    required this.drawerOverlay,
  });

  final Color textPrimary;
  final Color textSecondary;
  final Color textTertiary;
  final Color textPlaceholder;
  final Color accent;
  final Color accentTintBg;
  final Color cardBg;
  final Color inputFill;
  final Color inputFocusedBorder;
  final Color borderDefault;
  final Color success;
  final Color warning;
  final Color openNowText;
  final Color openNowBg;
  final Color openNowBorder;
  final Color drawerOverlay;

  // Light mode only — mirrors DESIGN.md tokens
  static const CustomColors light = CustomColors(
    textPrimary: AppColors.textPrimary,
    textSecondary: AppColors.textSecondary,
    textTertiary: AppColors.textTertiary,
    textPlaceholder: AppColors.textPlaceholder,
    accent: AppColors.accent,
    accentTintBg: AppColors.accentTintBg,
    cardBg: AppColors.secondaryBg,
    inputFill: AppColors.inputBg,
    inputFocusedBorder: AppColors.accentFocusBorder,
    borderDefault: AppColors.border,
    success: AppColors.success,
    warning: AppColors.warning,
    openNowText: AppColors.openNowText,
    openNowBg: AppColors.openNowBg,
    openNowBorder: AppColors.openNowBorder,
    drawerOverlay: AppColors.drawerOverlay,
  );

  @override
  CustomColors copyWith({
    Color? textPrimary,
    Color? textSecondary,
    Color? textTertiary,
    Color? textPlaceholder,
    Color? accent,
    Color? accentTintBg,
    Color? cardBg,
    Color? inputFill,
    Color? inputFocusedBorder,
    Color? borderDefault,
    Color? success,
    Color? warning,
    Color? openNowText,
    Color? openNowBg,
    Color? openNowBorder,
    Color? drawerOverlay,
  }) {
    return CustomColors(
      textPrimary: textPrimary ?? this.textPrimary,
      textSecondary: textSecondary ?? this.textSecondary,
      textTertiary: textTertiary ?? this.textTertiary,
      textPlaceholder: textPlaceholder ?? this.textPlaceholder,
      accent: accent ?? this.accent,
      accentTintBg: accentTintBg ?? this.accentTintBg,
      cardBg: cardBg ?? this.cardBg,
      inputFill: inputFill ?? this.inputFill,
      inputFocusedBorder: inputFocusedBorder ?? this.inputFocusedBorder,
      borderDefault: borderDefault ?? this.borderDefault,
      success: success ?? this.success,
      warning: warning ?? this.warning,
      openNowText: openNowText ?? this.openNowText,
      openNowBg: openNowBg ?? this.openNowBg,
      openNowBorder: openNowBorder ?? this.openNowBorder,
      drawerOverlay: drawerOverlay ?? this.drawerOverlay,
    );
  }

  @override
  ThemeExtension<CustomColors> lerp(
    ThemeExtension<CustomColors>? other,
    double t,
  ) {
    if (other is! CustomColors) return this;
    return CustomColors(
      textPrimary: Color.lerp(textPrimary, other.textPrimary, t)!,
      textSecondary: Color.lerp(textSecondary, other.textSecondary, t)!,
      textTertiary: Color.lerp(textTertiary, other.textTertiary, t)!,
      textPlaceholder: Color.lerp(textPlaceholder, other.textPlaceholder, t)!,
      accent: Color.lerp(accent, other.accent, t)!,
      accentTintBg: Color.lerp(accentTintBg, other.accentTintBg, t)!,
      cardBg: Color.lerp(cardBg, other.cardBg, t)!,
      inputFill: Color.lerp(inputFill, other.inputFill, t)!,
      inputFocusedBorder: Color.lerp(
        inputFocusedBorder,
        other.inputFocusedBorder,
        t,
      )!,
      borderDefault: Color.lerp(borderDefault, other.borderDefault, t)!,
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
      openNowText: Color.lerp(openNowText, other.openNowText, t)!,
      openNowBg: Color.lerp(openNowBg, other.openNowBg, t)!,
      openNowBorder: Color.lerp(openNowBorder, other.openNowBorder, t)!,
      drawerOverlay: Color.lerp(drawerOverlay, other.drawerOverlay, t)!,
    );
  }
}
