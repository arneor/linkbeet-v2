// ─── LinkBeet Font Sizes — "Spatial AI Light" (locked 2026-04-15) ────────────
// Type scale from DESIGN.md §2. Platform font: SF Pro (iOS) / Roboto (Android).
// Use AppFontSizes constants instead of inline fontSize values.
class AppFontSizes {
  AppFontSizes._();

  // ── Display / Hero ────────────────────────────────────────────────────────
  /// Discovery screen greeting headline (mobile = 30px per DESIGN.md)
  static const double heroGreeting = 30.0;

  /// Brand name logotype in home hero (LinkBeet wordmark)
  static const double logoTitle = 36.0;

  /// Major section headers
  static const double sectionHeading = 40.0;

  /// Card / tile headlines
  static const double tileHeading = 28.0;

  /// Card sub-headers
  static const double subHeading = 21.0;

  // ── Body ──────────────────────────────────────────────────────────────────
  /// Standard body text — 17px, tracking -0.374px
  static const double body = 17.0;

  /// Slightly reduced body for secondary content
  static const double bodySmall = 15.0;

  // ── UI Labels ─────────────────────────────────────────────────────────────
  /// Input/textarea text (DESIGN.md: 17–20px)
  static const double inputText = 17.0;

  /// Filter chip labels
  static const double filterChip = 13.0;

  /// Suggestion pill labels
  static const double suggestionPill = 14.0;

  /// Primary CTA / button text
  static const double button = 17.0;

  /// Small button / secondary CTA
  static const double buttonSm = 14.0;

  /// Sidebar / drawer navigation labels
  static const double navLabel = 12.0;

  // ── Caption / Meta ────────────────────────────────────────────────────────
  /// Secondary text, card metadata
  static const double caption = 14.0;

  /// Fine print, badges
  static const double micro = 12.0;

  /// Extra-small labels (badge text from DESIGN.md §4)
  static const double badge = 11.0;

  // ── Legacy aliases — kept for backward compat, prefer named above ─────────
  static const double xxs = 8.0;
  static const double xs = 9.0;
  static const double s = 10.0;
  static const double sm = 11.0; // → use badge
  static const double m = 12.0; // → use navLabel / micro
  static const double md = 13.0; // → use filterChip
  static const double lg = 17.0; // → use body
  static const double xl = 21.0; // → use subHeading
  static const double xxl = 28.0; // → use tileHeading
  static const double h4 = 20.0;
  static const double h3 = 24.0;
  static const double h2 = 26.0;
  static const double h1 = 28.0; // → use tileHeading
  static const double display = 32.0;
  static const double hero = 30.0; // → use heroGreeting
}
