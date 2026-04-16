// ─── LinkBeet Animation Durations — "Spatial AI Light" (locked 2026-04-15) ───
// Motion values from DESIGN.md §5. Use these instead of inline Duration values.
class AppDurations {
  AppDurations._();

  /// 200ms — overlay fade-in (bg-black/50 drawer backdrop)
  static const overlayFade = Duration(milliseconds: 200);

  /// 300ms — sidebar collapse/expand, drawer slide-in (ease-in-out)
  static const sidebarCollapse = Duration(milliseconds: 300);

  /// 300ms — alias for sidebarCollapse (page transitions, component animations)
  static const pageTransition = Duration(milliseconds: 300);

  /// 800ms — page entry fadeInUp (opacity 0→1, translateY 15px→0)
  static const pageEntry = Duration(milliseconds: 800);

  // ── Stagger delays for page entry ─────────────────────────────────────────
  /// Heading entry (0ms offset)
  static const staggerHeading = Duration(milliseconds: 0);

  /// Input/search entry (100ms offset)
  static const staggerInput = Duration(milliseconds: 100);

  /// Suggestions/chips entry (200ms offset)
  static const staggerSuggestions = Duration(milliseconds: 200);

  // ── Legacy aliases ─────────────────────────────────────────────────────────
  static const fast = Duration(milliseconds: 150);
  static const normal = Duration(milliseconds: 300); // → use pageTransition
  static const slow = Duration(milliseconds: 400);
}
