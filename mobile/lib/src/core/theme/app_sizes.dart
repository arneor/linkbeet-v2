// ─── LinkBeet Sizes — "Spatial AI Light" (locked 2026-04-15) ─────────────────
// Key measurements from DESIGN.md §3, §7, §10.
// Base unit: 8px. Touch targets: minimum 44×44px (DESIGN.md §10).
class AppSizes {
  AppSizes._();

  // ── Layout tokens (DESIGN.md §3 & §7) ────────────────────────────────────
  /// Drawer/sidebar width — 260px (same as web expanded sidebar)
  static const double drawerWidth = 260.0;

  /// TopBar / AppBar height — 48px
  static const double topBarHeight = 52.0;

  /// Sidebar nav item height — 48px
  static const double navItemHeight = 48.0;

  /// Logo badge size — 32×32px
  static const double logoBadgeSize = 32.0;

  /// Active nav indicator bar width — 2px
  static const double navIndicatorWidth = 2.0;

  /// Active nav indicator bar height — 20px
  static const double navIndicatorHeight = 20.0;

  // ── Touch targets (DESIGN.md §10: minimum 44×44px) ────────────────────────
  /// Minimum touch target size — 44px
  static const double touchTarget = 44.0;

  /// Send / action button (circular) — 40×40px
  static const double sendButtonSize = 40.0;

  /// Avatar / profile image — 32px
  static const double avatarSize = 32.0;

  /// Small avatar / user indicator chip — 28px
  static const double avatarSm = 28.0;

  // ── Icon sizes ────────────────────────────────────────────────────────────
  static const double iconXs = 12.0;
  static const double iconSm = 16.0;
  static const double iconMd = 22.0; // Search icon per DESIGN.md §4
  static const double iconLg = 24.0;
  static const double iconXl = 32.0;

  /// Icon size for search / mic interactive icons — 20px
  static const double iconAction = 20.0;

  // ── Component-specific sizes ──────────────────────────────────────────────
  /// Home screen search bar height — 62px
  static const double searchBarHeight = 62.0;

  /// Menu (hamburger) icon tap-area padding — 14px
  static const double menuIconPadding = 14.0;

  /// Active filter tab underline indicator height — 3px
  static const double tabIndicatorHeight = 3.0;

  // ── Spacing scale (base 8px) ──────────────────────────────────────────────
  static const double px = 2.0;
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;

  // ── Border Radius (numeric — use AppRadius for BorderRadius objects) ───────
  static const double borderRadiusMicro = 5.0; // small tags
  static const double borderRadiusStandard = 8.0; // buttons, cards, nav items
  static const double borderRadiusComfortable = 11.0; // search filter chips
  static const double borderRadiusLarge = 12.0; // panels, suggestion pills
  static const double borderRadiusSendButton = 20.0; // send button
  static const double borderRadiusSearchInput = 24.0; // main search box

  // ── Legacy aliases ────────────────────────────────────────────────────────
  static const double borderRadiusXs = 2.0;
  static const double borderRadiusSm = 4.0;
  static const double borderRadiusMd = 8.0; // → use borderRadiusStandard
  static const double borderRadiusLg = 12.0; // → use borderRadiusLarge
  static const double borderRadiusXl = 16.0;
  static const double borderRadius = borderRadiusStandard;
  static const double fontSizeSm = 13.0; // → use AppFontSizes.filterChip
  static const double fontSizeMd = 17.0; // → use AppFontSizes.body
  static const double fontSizeLg = 21.0; // → use AppFontSizes.subHeading
  static const double buttonHeight = 48.0;
  static const double cardRadiusMd = 8.0;
  static const double cardRadiusLg = 12.0;
  static const double cardElevation =
      0.0; // No elevation — shadow via BoxShadow
  static const double dividerHeight = 1.0;
  static const double zero = 0.0;
  static const double defaultSpace = 24.0;
  static const double spaceBtwItems = 16.0;
}
