import 'package:flutter/material.dart';

/// LinkBeet Design System — Color Tokens
/// Source of truth: DESIGN.md "Spatial AI Light" theme
/// Apple Blue (#0071e3) is the ONLY chromatic accent color.
abstract final class AppColors {
  // === Backgrounds ===
  static const Color pageBg = Color(0xFFFFFFFF);
  static const Color secondaryBg = Color(0xFFF5F5F7);
  static const Color sidebarBg = Color(0xE6F9FAFB); // slate-50/90
  static const Color inputBg = Color(0xFFFFFFFF);

  // === Text ===
  static const Color textPrimary = Color(0xFF1D1D1F); // slate-900
  static const Color textSecondary = Color(0xFF475569); // slate-600
  static const Color textTertiary = Color(0xFF64748B); // slate-500
  static const Color textPlaceholder = Color(0xFFCBD5E1); // slate-300
  static const Color textInverse = Color(0xFFFFFFFF);

  // === Interactive — Apple Blue ONLY ===
  static const Color accent = Color(0xFF0071E3);
  static const Color accentHover = Color(0xFF0077ED);
  static const Color accentTintBg = Color(0x1A0071E3); // 10% opacity
  static const Color accentTintRing = Color(0x0D0071E3); // 5% opacity
  static const Color accentFocusBorder = Color(0x660071E3); // 40% opacity
  static const Color linkLight = Color(0xFF0066CC);

  // === Borders & Dividers ===
  static const Color border = Color(0xFFE2E8F0); // slate-200
  static const Color divider = Color(0xFFE2E8F0); // slate-200

  // === Special Accent (sparingly) ===
  static const Color emeraldText = Color(0xFF15803D); // emerald-700
  static const Color emeraldBg = Color(0xFFF0FDF4); // emerald-50
  static const Color emeraldBorder = Color(0xFFA7F3D0); // emerald-200

  // === Suggestion Pill Icon Colors ===
  static const Color iconEmerald = Color(0xFF10B981); // emerald-500
  static const Color iconPurple = Color(0xFFA855F7); // purple-500
  static const Color iconBlue = Color(0xFF0071E3); // same as accent

  // === Shadows (used as Color values for Shadow widgets) ===
  static const Color shadowDefault = Color(0x0F000000); // rgba(0,0,0,0.06)
  static const Color shadowFocus = Color(0x260071E3); // rgba(0,113,227,0.15)

  // === Overlay ===
  static const Color drawerOverlay = Color(0x80000000); // black/50
}
