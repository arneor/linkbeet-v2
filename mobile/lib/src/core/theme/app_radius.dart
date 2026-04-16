import 'package:flutter/material.dart';

// ─── LinkBeet Border Radius — "Spatial AI Light" (locked 2026-04-15) ─────────
// Scale from DESIGN.md §6. Use these instead of inline BorderRadius.circular().
class AppRadius {
  AppRadius._();

  /// 5px — small tags, micro badges
  static final micro = BorderRadius.circular(5);

  /// 8px — buttons, nav items, logo badge, cards (DESIGN.md "standard")
  static final standard = BorderRadius.circular(8);

  /// 8px — alias for standard (backward compat)
  static final md = BorderRadius.circular(8);

  /// 11px — search filter chips
  static final comfortable = BorderRadius.circular(11);

  /// 12px — feature panels, suggestion pills (rounded-2xl)
  static final large = BorderRadius.circular(12);

  /// 12px — alias for large (backward compat)
  static final lg = BorderRadius.circular(12);

  /// 20px — send button (circular-ish)
  static final sendButton = BorderRadius.circular(20);

  /// 24px — main search input box
  static final searchInput = BorderRadius.circular(24);

  /// 9999px — avatars, toggle switches, circular elements
  static final avatar = BorderRadius.circular(9999);

  /// 9999px — alias for avatar (pill shapes)
  static final pill = BorderRadius.circular(9999);

  // ── Legacy aliases — kept for backward compat ─────────────────────────────
  static final tiny = BorderRadius.circular(2);
  static final xs = BorderRadius.circular(4);
  static final sm = BorderRadius.circular(6);
  static final xl = BorderRadius.circular(16);
  static final xxl = BorderRadius.circular(20); // → use sendButton
  static final xxxl = BorderRadius.circular(24); // → use searchInput
}
