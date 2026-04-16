import 'package:flutter/material.dart';

// ─── LinkBeet Spacing — "Spatial AI Light" (locked 2026-04-15) ───────────────
// Base unit: 8px. Mirrors DESIGN.md §7 and shared/constants/src/spacing.ts.
// Use these instead of inline SizedBox / EdgeInsets.
class AppSpacing {
  AppSpacing._();

  // ── Vertical Gaps ─────────────────────────────────────────────────────────
  static const verticalGap2 = SizedBox(height: 2);
  static const verticalGap4 = SizedBox(height: 4);
  static const verticalGap6 = SizedBox(height: 6);
  static const verticalGap8 = SizedBox(height: 8);
  static const verticalGap10 = SizedBox(height: 10);
  static const verticalGap12 = SizedBox(height: 12);
  static const verticalGap16 = SizedBox(height: 16);
  static const verticalGap20 = SizedBox(height: 20);
  static const verticalGap24 = SizedBox(height: 24);
  static const verticalGap32 = SizedBox(height: 32);
  static const verticalGap48 = SizedBox(height: 48);

  // ── Horizontal Gaps ───────────────────────────────────────────────────────
  static const horizontalGap2 = SizedBox(width: 2);
  static const horizontalGap4 = SizedBox(width: 4);
  static const horizontalGap6 = SizedBox(width: 6);
  static const horizontalGap8 = SizedBox(width: 8);
  static const horizontalGap10 = SizedBox(width: 10);
  static const horizontalGap12 = SizedBox(width: 12);
  static const horizontalGap16 = SizedBox(width: 16);
  static const horizontalGap20 = SizedBox(width: 20);
  static const horizontalGap24 = SizedBox(width: 24);

  // ── EdgeInsets constants ──────────────────────────────────────────────────
  static const paddingAllXs = EdgeInsets.all(4);
  static const paddingAllSm = EdgeInsets.all(8);
  static const paddingAllMd = EdgeInsets.all(16);
  static const paddingAllLg = EdgeInsets.all(24);
  static const paddingAllXl = EdgeInsets.all(32);

  static const paddingHorizontalXs = EdgeInsets.symmetric(horizontal: 4);
  static const paddingHorizontalSm = EdgeInsets.symmetric(horizontal: 8);
  static const paddingHorizontalMd = EdgeInsets.symmetric(horizontal: 16);
  static const paddingHorizontalLg = EdgeInsets.symmetric(horizontal: 24);

  static const paddingVerticalXs = EdgeInsets.symmetric(vertical: 4);
  static const paddingVerticalSm = EdgeInsets.symmetric(vertical: 8);
  static const paddingVerticalMd = EdgeInsets.symmetric(vertical: 16);
  static const paddingVerticalLg = EdgeInsets.symmetric(vertical: 24);

  /// Standard screen-level horizontal padding — 16px sides (DESIGN.md §7)
  static const screenPadding = EdgeInsets.symmetric(horizontal: 16);

  /// Nav item internal padding — px-3 (12px) per DESIGN.md §3
  static const navItemPadding = EdgeInsets.symmetric(
    horizontal: 12,
    vertical: 0,
  );

  /// Search input internal padding — matches web pl-14 pr-[100px] py-[20px]
  static const searchInputPadding = EdgeInsets.fromLTRB(56, 20, 100, 20);

  /// Filter chip padding — px-3 py-1.5 per DESIGN.md §4
  static const filterChipPadding = EdgeInsets.symmetric(
    horizontal: 12,
    vertical: 6,
  );

  /// Suggestion pill padding — px-4 py-2.5 per DESIGN.md §4
  static const suggestionPillPadding = EdgeInsets.symmetric(
    horizontal: 16,
    vertical: 10,
  );
}
