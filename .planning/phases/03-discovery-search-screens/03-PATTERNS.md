# Phase 3: Discovery & Search Screens — Pattern Map

**Mapped:** 2026-04-16 **Files analyzed:** 7 new/modified files **Analogs found:** 5 / 7

---

## File Classification

| New/Modified File                                                                  | Role   | Data Flow                    | Closest Analog                                                                                       | Match Quality                      |
| ---------------------------------------------------------------------------------- | ------ | ---------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `mobile/lib/src/modules/home/presentation/ui/screens/home_screen.dart`             | screen | request-response (mock data) | `mobile/lib/src/modules/foundation/app/presentation/ui/screens/splash_screen.dart`                   | role-match                         |
| `mobile/lib/src/modules/home/presentation/ui/widgets/discovery_search_input.dart`  | widget | event-driven                 | `web/src/app/page.tsx` (search pill)                                                                 | partial (cross-platform reference) |
| `mobile/lib/src/modules/home/presentation/ui/widgets/filter_chip_row.dart`         | widget | event-driven                 | `web/src/app/page.tsx` (chip row)                                                                    | partial (cross-platform reference) |
| `mobile/lib/src/modules/home/presentation/ui/widgets/suggestion_pill_row.dart`     | widget | event-driven                 | `web/src/app/page.tsx` (trending row)                                                                | partial (cross-platform reference) |
| `mobile/lib/src/modules/search/presentation/ui/screens/search_results_screen.dart` | screen | request-response (mock data) | `mobile/lib/src/modules/home/presentation/ui/screens/home_screen.dart` (stub) + `splash_screen.dart` | role-match                         |
| `mobile/lib/src/modules/search/presentation/router/search_router_module.dart`      | route  | request-response             | `mobile/lib/src/modules/home/presentation/router/home_router_module.dart`                            | exact                              |
| `mobile/lib/src/core/router/app_routes.dart` (modify)                              | config | —                            | self                                                                                                 | exact                              |

---

## Pattern Assignments

### `home_screen.dart` (screen, request-response)

**Analog:** `mobile/lib/src/modules/foundation/app/presentation/ui/screens/splash_screen.dart`

**Imports pattern** (splash_screen.dart lines 1–4):

```dart
import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/modules/home/presentation/router/home_router_module.dart';
```

New home_screen.dart imports must follow the same package-absolute import style:

```dart
import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_durations.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/discovery_search_input.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/filter_chip_row.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/suggestion_pill_row.dart';
```

**StatefulWidget + AnimationController pattern** (splash_screen.dart lines 6–47):

```dart
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0)
        .animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
```

**home_screen.dart must use the same pattern** but with `AppDurations.pageEntry` (800ms) and three
staggered animations:

```dart
// Stagger per AppDurations:
//   heading  → delay: AppDurations.staggerHeading  (0ms)
//   input    → delay: AppDurations.staggerInput    (100ms)
//   chips    → delay: AppDurations.staggerSuggestions (200ms)
_controller = AnimationController(
  vsync: this,
  duration: AppDurations.pageEntry,  // 800ms
);
```

**Scaffold + background color pattern** (splash_screen.dart line 51):

```dart
return Scaffold(
  backgroundColor: AppColors.pageBg,  // #ffffff — NOT the purple splash color
  body: SafeArea(
    child: Stack(
      children: [
        // Greeting + search + chips (scrollable center content)
        // Bottom floating search input — Positioned(bottom: 16)
      ],
    ),
  ),
);
```

**Mobile layout — M-01 bottom-floating search input** (CONTEXT.md M-01):

```dart
// Use Stack + Positioned per M-01 spec
Stack(
  children: [
    // Scrollable greeting + chips area
    SingleChildScrollView(
      padding: AppSpacing.screenPadding,
      child: Column(
        children: [
          // Greeting text
          // Filter chips row
          // Suggestion pills row
        ],
      ),
    ),
    // Floating bottom search input
    Positioned(
      bottom: 16,
      left: 16,
      right: 16,
      child: DiscoverySearchInput(...),
    ),
  ],
)
```

**Greeting text style** — use `AppTextStyle.displayLarge` which maps to:

```dart
// From app_theme.dart lines 71–77 (displayLarge):
// fontSize: AppFontSizes.heroGreeting (30px)
// fontWeight: FontWeight.w500
// letterSpacing: -0.5
// color: AppColors.textPrimary (#1d1d1f)
Text(
  'Good morning, Name.',  // time-based via DateTime.now().hour
  style: Theme.of(context).textTheme.displayLarge,
)
// Subtext:
Text(
  'What are you exploring today?',
  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
    color: AppColors.textTertiary,  // slate-500
    fontSize: AppFontSizes.body,    // 17px
  ),
)
```

---

### `discovery_search_input.dart` (widget, event-driven)

**Web analog:** `web/src/app/page.tsx` lines 44–95 (search pill + focused border logic)

**Core pattern** — translate the web focused/unfocused border toggle to Flutter:

```dart
// Web: border-[#0071e3]/40 shadow-[0_4px_30px_rgba(0,113,227,0.15)] on focus
// Flutter equivalent using AppColors:
AnimatedContainer(
  duration: const Duration(milliseconds: 200),
  decoration: BoxDecoration(
    color: AppColors.inputBg,           // white
    borderRadius: AppRadius.searchInput, // 24px (AppRadius.searchInput)
    border: Border.all(
      color: _isFocused
          ? AppColors.accentFocusBorder  // rgba(0,113,227,0.40)
          : AppColors.border,            // slate-200
      width: _isFocused ? 1.5 : 1.0,
    ),
    boxShadow: _isFocused
        ? AppColors.focusShadow          // 0 4px 30px rgba(0,113,227,0.15)
        : AppColors.cardShadow,          // 0 8px 30px rgba(0,0,0,0.06)
  ),
  // Min height 140px per D-02:
  constraints: const BoxConstraints(minHeight: 140),
  child: TextField(
    maxLines: null,                      // textarea, not single line
    style: TextStyle(
      fontSize: AppFontSizes.inputText,  // 17px
      color: AppColors.textPrimary,
    ),
    decoration: InputDecoration(
      hintText: 'Find a cafe, book a salon, hire a creator...',
      hintStyle: TextStyle(color: AppColors.textPlaceholder),
      // Override theme's default border — we handle it in AnimatedContainer
      border: InputBorder.none,
      contentPadding: AppSpacing.searchInputPadding,
    ),
  ),
)
```

**Compact version for search results (S-03):**

```dart
// rounded-[12px] h-[44px] single-line
decoration: BoxDecoration(
  borderRadius: AppRadius.large,  // 12px
  ...
),
constraints: const BoxConstraints(minHeight: 44, maxHeight: 44),
// maxLines: 1 (single-line)
```

**Right-side icon buttons** — from web lines 74–94, translate to Flutter:

```dart
Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    IconButton(
      icon: const Icon(Icons.mic_none_rounded),
      iconSize: AppSizes.iconLg,            // 24px
      color: AppColors.textTertiary,
      onPressed: () {},
    ),
    // Send button — blue when query.isNotEmpty
    AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      width: AppSizes.sendButtonSize,       // 40px
      height: AppSizes.sendButtonSize,
      decoration: BoxDecoration(
        color: _query.isNotEmpty
            ? AppColors.accent              // #0071e3
            : AppColors.secondaryBg,        // #f5f5f7
        borderRadius: AppRadius.sendButton, // 20px
      ),
      child: Icon(
        Icons.arrow_forward_rounded,
        color: _query.isNotEmpty
            ? AppColors.white
            : AppColors.textPlaceholder,
        size: AppSizes.iconLg,
      ),
    ),
  ],
)
```

---

### `filter_chip_row.dart` (widget, event-driven)

**Web analog:** `web/src/app/page.tsx` context — CONTEXT.md D-03 spec

**Core pattern** — horizontal SingleChildScrollView per M-02:

```dart
// All chips: rounded-full px-4 py-1.5 text-[13px] font-medium border border-slate-200 bg-white
// Flutter: use AppTheme ChipTheme + special emerald for "Open Now"

SingleChildScrollView(
  scrollDirection: Axis.horizontal,       // M-02: no wrap on mobile
  padding: AppSpacing.screenPadding,
  child: Row(
    children: [
      // "Filters" chip with leading icon
      _FilterChip(
        label: 'Filters',
        icon: Icons.tune_rounded,          // SlidersHorizontal equivalent
        onTap: () {},
      ),
      // Separator
      const SizedBox(width: 8),
      Container(width: 1, height: 16, color: AppColors.border),
      const SizedBox(width: 8),
      // Category chips
      _FilterChip(label: 'Restaurants', onTap: () {}),
      _FilterChip(label: 'Salons & Spas', onTap: () {}),
      _FilterChip(label: 'Creators', onTap: () {}),
      // "Open Now" — emerald only (CONTEXT.md D-03)
      _OpenNowChip(onTap: () {}),
    ],
  ),
)

// Standard chip — uses ChipTheme shape (AppRadius.pill, border: AppColors.border)
Widget _FilterChip({required String label, IconData? icon, required VoidCallback onTap}) {
  return GestureDetector(
    onTap: onTap,
    child: Container(
      padding: AppSpacing.filterChipPadding,  // px-3 py-1.5 → 12/6px
      decoration: BoxDecoration(
        color: AppColors.pageBg,              // bg-white
        borderRadius: AppRadius.pill,
        border: Border.all(color: AppColors.border, width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: AppSizes.iconSm, color: AppColors.textSecondary),
            AppSpacing.horizontalGap6,
          ],
          Text(
            label,
            style: TextStyle(
              fontSize: AppFontSizes.filterChip,  // 13px
              fontWeight: FontWeight.w500,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    ),
  );
}

// "Open Now" chip — emerald semantic colors only (CONTEXT.md D-03)
Container(
  padding: AppSpacing.filterChipPadding,
  decoration: BoxDecoration(
    color: AppColors.openNowBg,          // emerald-50
    borderRadius: AppRadius.pill,
    border: Border.all(color: AppColors.openNowBorder, width: 1),
  ),
  child: Text(
    'Open Now',
    style: TextStyle(
      fontSize: AppFontSizes.filterChip,
      fontWeight: FontWeight.w500,
      color: AppColors.openNowText,      // emerald-700
    ),
  ),
)
```

---

### `suggestion_pill_row.dart` (widget, event-driven)

**Web analog:** `web/src/app/page.tsx` TRENDING list (lines 9–17, 118–140)

**Core pattern** — horizontal scroll, 2 visible on mobile per M-03:

```dart
// Pills: px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-2xl text-[14px] font-medium text-slate-600
// AppRadius.large = 12px (rounded-2xl)

SingleChildScrollView(
  scrollDirection: Axis.horizontal,
  padding: AppSpacing.screenPadding,
  child: Row(
    children: [
      _SuggestionPill(
        icon: Icons.location_on_outlined,
        iconColor: AppColors.success,         // emerald-500
        label: 'Top-rated near me',
        onTap: () {},
      ),
      AppSpacing.horizontalGap8,
      _SuggestionPill(
        icon: Icons.auto_awesome_rounded,
        iconColor: const Color(0xFFA855F7),   // purple-500 — one-off, not in AppColors
        label: 'Featured this week',
        onTap: () {},
      ),
      AppSpacing.horizontalGap8,
      _SuggestionPill(
        icon: Icons.search_rounded,
        iconColor: AppColors.accent,          // #0071e3
        label: 'Search by category',
        onTap: () {},
      ),
    ],
  ),
)

Widget _SuggestionPill({required IconData icon, required Color iconColor, required String label, required VoidCallback onTap}) {
  return GestureDetector(
    onTap: onTap,
    child: Container(
      padding: AppSpacing.suggestionPillPadding,  // px-4 py-2.5 → 16/10px
      decoration: BoxDecoration(
        color: AppColors.pageBg,
        borderRadius: AppRadius.large,            // 12px (rounded-2xl)
        border: Border.all(color: AppColors.border, width: 1),
        boxShadow: AppColors.cardShadow,          // shadow-sm
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: AppSizes.iconSm, color: iconColor),
          AppSpacing.horizontalGap8,
          Text(
            label,
            style: TextStyle(
              fontSize: AppFontSizes.suggestionPill,  // 14px
              fontWeight: FontWeight.w500,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    ),
  );
}
```

---

### `search_results_screen.dart` (screen, request-response)

**Analog:** `mobile/lib/src/modules/foundation/app/presentation/ui/screens/splash_screen.dart` +
CONTEXT.md S-01/S-02/S-03

**Scaffold + AppBar pattern:**

```dart
// S-03: compact search bar sticky at top
Scaffold(
  backgroundColor: AppColors.pageBg,
  appBar: AppBar(
    // Uses AppTheme.appBarTheme — elevation 0, white bg, dark icons
    titleSpacing: 0,
    title: DiscoverySearchInput(
      compact: true,               // S-03: rounded-[12px] h-[44px] single-line
      initialQuery: widget.query,
    ),
  ),
  body: SafeArea(child: _ResultsList()),
)
```

**Profile Card pattern** (CONTEXT.md S-01):

```dart
// bg-white or #f5f5f7, rounded-[12px], no border, shadow on hover
Container(
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
  padding: AppSpacing.paddingAllMd,   // 16px all sides
  decoration: BoxDecoration(
    color: AppColors.secondaryBg,     // #f5f5f7
    borderRadius: AppRadius.large,    // 12px
    // No border. Shadow:
    boxShadow: AppColors.cardShadow,  // 0 8px 30px rgba(0,0,0,0.06)
  ),
  child: Row(
    children: [
      // Avatar — 48px, rounded-full, accent blue placeholder
      CircleAvatar(
        radius: 24,
        backgroundColor: AppColors.accent,
        child: const Icon(Icons.person, color: AppColors.white),
      ),
      AppSpacing.horizontalGap12,
      Expanded(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Name: text-slate-900 font-medium text-[17px]
            Text(
              name,
              style: TextStyle(
                fontSize: AppFontSizes.body,      // 17px
                fontWeight: FontWeight.w500,
                color: AppColors.textPrimary,
              ),
            ),
            AppSpacing.verticalGap4,
            Row(children: [
              // Industry badge: bg-[#0071e3]/10 text-[#0071e3] text-[11px] rounded-full
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.accentTintBg,  // rgba(0,113,227,0.10)
                  borderRadius: AppRadius.pill,
                ),
                child: Text(
                  industry,
                  style: TextStyle(
                    fontSize: AppFontSizes.badge,  // 11px
                    color: AppColors.accent,
                  ),
                ),
              ),
            ]),
            AppSpacing.verticalGap4,
            // Distance: text-[#0071e3] text-[13px] font-medium (N-02 prominent distance)
            Text(
              distance,
              style: TextStyle(
                fontSize: AppFontSizes.filterChip, // 13px
                color: AppColors.accent,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    ],
  ),
)
```

**Results list layout** (CONTEXT.md S-02):

```dart
// List on mobile, 2-column grid on desktop (use LayoutBuilder)
LayoutBuilder(
  builder: (context, constraints) {
    // Mobile: single column ListView
    if (constraints.maxWidth < 768) {
      return ListView.builder(
        itemCount: results.length,
        itemBuilder: (context, i) => ProfileCard(profile: results[i]),
      );
    }
    // Desktop: 2-column GridView
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 3.0,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
      ),
      itemBuilder: (context, i) => ProfileCard(profile: results[i]),
    );
  },
)

// Results count header:
Text(
  '${results.length} results',
  style: TextStyle(
    fontSize: AppFontSizes.filterChip,  // 13px
    color: AppColors.textTertiary,      // slate-500
  ),
)

// Empty state:
Center(
  child: Text(
    'No results found',
    style: TextStyle(color: AppColors.textPlaceholder),
  ),
)
```

---

### `search_router_module.dart` (route, request-response)

**Analog:** `mobile/lib/src/modules/home/presentation/router/home_router_module.dart` — exact copy
pattern

**Exact pattern to copy** (home_router_module.dart lines 1–14):

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/screens/search_results_screen.dart';

part 'search_router_module.g.dart';

@TypedGoRoute<SearchResultsRoute>(path: AppRoutePath.search)
class SearchResultsRoute extends GoRouteData with $SearchResultsRoute {
  const SearchResultsRoute({required this.query});

  final String query;  // path/query parameter for the search term

  @override
  Widget build(BuildContext context, GoRouterState state) =>
      SearchResultsScreen(query: query);
}
```

---

### `app_routes.dart` (modify — add search path)

**Self-analog** — add one constant to each abstract class:

```dart
// Add to AppRouteName:
static const search = 'search';

// Add to AppRoutePath:
static const search = '/search';
```

---

## Shared Patterns

### Theme access — CustomColors extension

**Source:** `mobile/lib/src/core/theme/app_colors.dart` lines 111–170 **Apply to:** All screen and
widget files

```dart
// Preferred for semantic tokens not in ColorScheme:
final colors = Theme.of(context).extension<CustomColors>()!;
colors.accent          // AppColors.accent
colors.textPrimary
colors.cardBg          // AppColors.secondaryBg — #f5f5f7
colors.openNowText     // emerald-700

// For static values (no context needed), use AppColors directly:
AppColors.border       // slate-200
AppColors.cardShadow   // BoxShadow constant
AppColors.focusShadow  // BoxShadow constant
```

### Page entry animation — staggered fadeInUp

**Source:** `mobile/lib/src/core/theme/app_durations.dart` + `splash_screen.dart`
AnimationController pattern **Apply to:** `home_screen.dart`, `search_results_screen.dart`

```dart
// Three CurvedAnimations from one controller, offset via Interval:
_headingAnim = CurvedAnimation(
  parent: _controller,
  curve: const Interval(0.0, 0.6, curve: Curves.easeOut),  // staggerHeading 0ms
);
_inputAnim = CurvedAnimation(
  parent: _controller,
  curve: const Interval(0.1, 0.7, curve: Curves.easeOut),  // staggerInput 100ms
);
_chipsAnim = CurvedAnimation(
  parent: _controller,
  curve: const Interval(0.2, 0.8, curve: Curves.easeOut),  // staggerSuggestions 200ms
);

// Wrap widgets with:
FadeTransition(
  opacity: _headingAnim,
  child: SlideTransition(
    position: Tween<Offset>(
      begin: const Offset(0, 0.15),  // translateY(15px) → 15% of widget height
      end: Offset.zero,
    ).animate(_headingAnim),
    child: greetingWidget,
  ),
)
```

### Scaffold base

**Source:** `mobile/lib/src/app/my_app.dart` line 34, `app_theme.dart` line 24 **Apply to:** All
screen files

```dart
// Theme is already wired — all Scaffolds automatically get:
//   scaffoldBackgroundColor: AppColors.pageBg (#ffffff)
//   No bottomNavigationBar (drawer nav only per DESIGN.md §9)
// Screens must NOT set backgroundColor unless overriding for a specific reason.
return Scaffold(
  // Do NOT set backgroundColor — inherited from AppTheme.lightTheme
  body: SafeArea(child: ...),
);
```

### Go router navigation from screen

**Source:** `mobile/lib/src/modules/foundation/app/presentation/ui/screens/splash_screen.dart` line
39 **Apply to:** All screens that navigate

```dart
// Type-safe navigation via generated route data class:
const SearchResultsRoute(query: query).go(context);
// or push (adds to stack):
const SearchResultsRoute(query: query).push(context);
```

### Import ordering convention

**Source:** All existing dart files — consistent pattern:

```dart
// 1. dart: SDK imports (if any)
// 2. package:flutter/material.dart
// 3. package:flutter/* other flutter packages
// 4. package:linkbeet/src/core/... (core utilities, theme, router)
// 5. package:linkbeet/src/modules/... (other modules)
// 6. relative imports within same module (rare — prefer package: paths)
```

### Bottom sheet pattern (Near Me M-04)

**Source:** `mobile/lib/src/core/theme/app_theme.dart` lines 335–347 (`_bottomSheetTheme`) **Apply
to:** Near Me radius selector

```dart
showModalBottomSheet(
  context: context,
  // Shape is already wired in AppTheme.bottomSheetTheme:
  // borderRadius: BorderRadius.vertical(top: Radius.circular(12))
  // Use AppRadius.searchInput (24px) per M-04 spec — pass shape explicitly:
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
  ),
  backgroundColor: AppColors.pageBg,
  builder: (context) => _RadiusSelectorSheet(),
);

// Drag handle at top of sheet:
Column(
  children: [
    Center(
      child: Container(
        margin: const EdgeInsets.only(top: 12, bottom: 16),
        width: 36,
        height: 4,
        decoration: BoxDecoration(
          color: AppColors.border,
          borderRadius: AppRadius.pill,
        ),
      ),
    ),
    // Radius chips: "500m", "1km", "5km", "10km"
    // Same _FilterChip widget used in filter_chip_row.dart
  ],
)
```

---

## No Analog Found

| File                                                                              | Role   | Data Flow               | Reason                                                                                                               |
| --------------------------------------------------------------------------------- | ------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `mobile/lib/src/modules/home/presentation/ui/widgets/discovery_search_input.dart` | widget | event-driven            | No search input widget exists in Flutter codebase yet — use web `page.tsx` as cross-platform specification reference |
| `mobile/lib/src/modules/near_me/presentation/ui/screens/near_me_screen.dart`      | screen | event-driven (location) | No location-aware screens exist yet — use CONTEXT.md N-01/N-02 + geolocator package (already in pubspec.yaml)        |

---

## Key Constants Quick Reference

| Design Token                  | Flutter Constant                   | Value                           |
| ----------------------------- | ---------------------------------- | ------------------------------- |
| Search input radius (large)   | `AppRadius.searchInput`            | 24px                            |
| Search input radius (compact) | `AppRadius.large`                  | 12px                            |
| Filter chip radius            | `AppRadius.pill`                   | 9999px                          |
| Suggestion pill radius        | `AppRadius.large`                  | 12px                            |
| Card radius                   | `AppRadius.large`                  | 12px                            |
| Button radius                 | `AppRadius.standard`               | 8px                             |
| Greeting font size            | `AppFontSizes.heroGreeting`        | 30px                            |
| Body font size                | `AppFontSizes.body`                | 17px                            |
| Filter chip font              | `AppFontSizes.filterChip`          | 13px                            |
| Suggestion pill font          | `AppFontSizes.suggestionPill`      | 14px                            |
| Industry badge font           | `AppFontSizes.badge`               | 11px                            |
| Apple Blue accent             | `AppColors.accent`                 | #0071e3                         |
| Page background               | `AppColors.pageBg`                 | #ffffff                         |
| Card background               | `AppColors.secondaryBg`            | #f5f5f7                         |
| Border color                  | `AppColors.border`                 | slate-200                       |
| Card shadow                   | `AppColors.cardShadow`             | 0 8px 30px rgba(0,0,0,0.06)     |
| Focus shadow                  | `AppColors.focusShadow`            | 0 4px 30px rgba(0,113,227,0.15) |
| Page entry duration           | `AppDurations.pageEntry`           | 800ms                           |
| Heading stagger               | `AppDurations.staggerHeading`      | 0ms                             |
| Input stagger                 | `AppDurations.staggerInput`        | 100ms                           |
| Chips stagger                 | `AppDurations.staggerSuggestions`  | 200ms                           |
| Screen h-padding              | `AppSpacing.screenPadding`         | 16px sides                      |
| Filter chip padding           | `AppSpacing.filterChipPadding`     | 12px / 6px                      |
| Suggestion pill padding       | `AppSpacing.suggestionPillPadding` | 16px / 10px                     |

---

## Metadata

**Analog search scope:** `mobile/lib/src/`, `web/src/app/page.tsx` **Files scanned:** 18 **Pattern
extraction date:** 2026-04-16
