import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';

// ─── LinkBeet AppTheme — "Spatial AI Light" (locked 2026-04-15) ──────────────
// Light mode only. DESIGN.md §9: "No dark mode. No dark backgrounds."
// Font: system default — SF Pro on iOS, Roboto on Android (DESIGN.md §2 §10).
// Apple Blue #0071e3 is the sole chromatic accent throughout.
// No bottom navigation bar — drawer navigation only (DESIGN.md §9, §10).
class AppTheme {
  AppTheme._();

  // ── Light Theme ───────────────────────────────────────────────────────────
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    // null = system font: SF Pro on iOS, Roboto on Android (DESIGN.md §2 §10)
    fontFamily: null,
    brightness: Brightness.light,
    primaryColor: AppColors.accent,
    scaffoldBackgroundColor: AppColors.pageBg,
    colorScheme: AppColors.lightColorScheme,
    extensions: const <ThemeExtension<dynamic>>[CustomColors.light],
    textTheme: _textTheme(AppColors.lightColorScheme),
    appBarTheme: _appBarTheme(AppColors.lightColorScheme),
    elevatedButtonTheme: _elevatedButtonTheme(AppColors.lightColorScheme),
    outlinedButtonTheme: _outlinedButtonTheme(AppColors.lightColorScheme),
    textButtonTheme: _textButtonTheme(AppColors.lightColorScheme),
    iconButtonTheme: _iconButtonTheme(AppColors.lightColorScheme),
    inputDecorationTheme: _inputDecorationTheme(AppColors.lightColorScheme),
    cardTheme: _cardTheme(AppColors.lightColorScheme),
    popupMenuTheme: _popupMenuTheme(AppColors.lightColorScheme),
    dialogTheme: _dialogTheme(AppColors.lightColorScheme),
    bottomSheetTheme: _bottomSheetTheme(AppColors.lightColorScheme),
    tabBarTheme: _tabBarTheme(AppColors.lightColorScheme),
    dividerTheme: _dividerTheme(AppColors.lightColorScheme),
    checkboxTheme: _checkboxTheme(AppColors.lightColorScheme),
    radioTheme: _radioTheme(AppColors.lightColorScheme),
    switchTheme: _switchTheme(AppColors.lightColorScheme),
    sliderTheme: _sliderTheme(AppColors.lightColorScheme),
    chipTheme: _chipTheme(AppColors.lightColorScheme),
    tooltipTheme: _tooltipTheme(AppColors.lightColorScheme),
    floatingActionButtonTheme: _floatingActionButtonTheme(
      AppColors.lightColorScheme,
    ),
    listTileTheme: _listTileTheme(AppColors.lightColorScheme),
    progressIndicatorTheme: _progressIndicatorTheme(AppColors.lightColorScheme),
    snackBarTheme: _snackBarTheme(AppColors.lightColorScheme),
    expansionTileTheme: _expansionTileTheme(AppColors.lightColorScheme),
    drawerTheme: _drawerTheme(AppColors.lightColorScheme),
  );

  // ── System UI overlay — light mode ────────────────────────────────────────
  static const SystemUiOverlayStyle systemUiOverlayStyle = SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark, // Dark icons on white bg
    statusBarBrightness: Brightness.light, // iOS
    systemNavigationBarColor: AppColors.pageBg,
    systemNavigationBarIconBrightness: Brightness.dark,
  );
}

// ─── TextTheme ────────────────────────────────────────────────────────────────
// Mirrors DESIGN.md §2 type scale. Tracking via letterSpacing.
TextTheme _textTheme(ColorScheme colorScheme) {
  return TextTheme(
    // displayLarge → hero greeting (30px mobile, medium 500)
    displayLarge: TextStyle(
      fontSize: AppFontSizes.heroGreeting,
      fontWeight: FontWeight.w500,
      color: colorScheme.onSurface,
      height: 1.1,
      letterSpacing: -0.5,
    ),
    // displayMedium → tile heading (28px, 400)
    displayMedium: TextStyle(
      fontSize: AppFontSizes.tileHeading,
      fontWeight: FontWeight.w400,
      color: colorScheme.onSurface,
      height: 1.14,
      letterSpacing: 0.196,
    ),
    // displaySmall → sub-heading (21px, 400)
    displaySmall: TextStyle(
      fontSize: AppFontSizes.subHeading,
      fontWeight: FontWeight.w400,
      color: colorScheme.onSurface,
      height: 1.19,
      letterSpacing: 0.231,
    ),
    // headlineMedium → section heading (40px, 600)
    headlineMedium: TextStyle(
      fontSize: AppFontSizes.sectionHeading,
      fontWeight: FontWeight.w600,
      color: colorScheme.onSurface,
      height: 1.1,
    ),
    // headlineSmall → subHeading alias
    headlineSmall: TextStyle(
      fontSize: AppFontSizes.subHeading,
      fontWeight: FontWeight.w600,
      color: colorScheme.onSurface,
      height: 1.19,
    ),
    // titleLarge → screen/section titles
    titleLarge: TextStyle(
      fontSize: AppFontSizes.body,
      fontWeight: FontWeight.w600,
      color: colorScheme.onSurface,
      letterSpacing: -0.374,
    ),
    // bodyLarge → standard body (17px, 400, tight tracking)
    bodyLarge: TextStyle(
      fontSize: AppFontSizes.body,
      fontWeight: FontWeight.w400,
      color: colorScheme.onSurface,
      height: 1.47,
      letterSpacing: -0.374,
    ),
    // bodyMedium → secondary body (15px)
    bodyMedium: TextStyle(
      fontSize: AppFontSizes.bodySmall,
      fontWeight: FontWeight.w400,
      color: colorScheme.onSurface,
      height: 1.47,
    ),
    // bodySmall → caption (14px, -0.224 tracking)
    bodySmall: TextStyle(
      fontSize: AppFontSizes.caption,
      fontWeight: FontWeight.w400,
      color: colorScheme.onSurface.withAlpha((255 * 0.7).round()),
      height: 1.29,
      letterSpacing: -0.224,
    ),
    // labelLarge → button / CTA text
    labelLarge: TextStyle(
      fontSize: AppFontSizes.button,
      fontWeight: FontWeight.w400,
      color: colorScheme.onSurface,
    ),
    // labelMedium → filter chip (13px, 500)
    labelMedium: TextStyle(
      fontSize: AppFontSizes.filterChip,
      fontWeight: FontWeight.w500,
      color: colorScheme.onSurface,
    ),
    // labelSmall → micro / fine print (12px)
    labelSmall: TextStyle(
      fontSize: AppFontSizes.micro,
      fontWeight: FontWeight.w400,
      color: colorScheme.onSurface.withAlpha((255 * 0.7).round()),
      height: 1.33,
      letterSpacing: -0.12,
    ),
  );
}

// ─── AppBar ───────────────────────────────────────────────────────────────────
AppBarTheme _appBarTheme(ColorScheme colorScheme) {
  return AppBarTheme(
    elevation: 0,
    scrolledUnderElevation: 0,
    centerTitle: false,
    backgroundColor: AppColors.pageBg,
    surfaceTintColor: Colors.transparent,
    foregroundColor: AppColors.textPrimary,
    iconTheme: const IconThemeData(
      color: AppColors.textPrimary,
      size: AppSizes.iconLg,
    ),
    actionsIconTheme: const IconThemeData(
      color: AppColors.textPrimary,
      size: AppSizes.iconLg,
    ),
    titleTextStyle: const TextStyle(
      fontSize: AppFontSizes.subHeading,
      fontWeight: FontWeight.w600,
      color: AppColors.textPrimary,
      letterSpacing: -0.2,
    ),
    systemOverlayStyle: AppTheme.systemUiOverlayStyle,
  );
}

// ─── Elevated Button — Apple Blue primary CTA ─────────────────────────────────
ElevatedButtonThemeData _elevatedButtonTheme(ColorScheme colorScheme) {
  return ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: 0,
      foregroundColor: AppColors.white,
      backgroundColor: AppColors.accent,
      disabledForegroundColor: AppColors.white.withAlpha((255 * 0.5).round()),
      disabledBackgroundColor: AppColors.accent.withAlpha((255 * 0.4).round()),
      side: BorderSide.none,
      minimumSize: const Size(0, AppSizes.touchTarget),
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      textStyle: const TextStyle(
        fontSize: AppFontSizes.button,
        fontWeight: FontWeight.w400,
      ),
      shape: RoundedRectangleBorder(borderRadius: AppRadius.standard),
    ),
  );
}

// ─── Outlined Button — secondary / ghost ──────────────────────────────────────
OutlinedButtonThemeData _outlinedButtonTheme(ColorScheme colorScheme) {
  return OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      foregroundColor: AppColors.textPrimary,
      side: const BorderSide(color: AppColors.border, width: 1),
      minimumSize: const Size(0, AppSizes.touchTarget),
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      textStyle: const TextStyle(
        fontSize: AppFontSizes.button,
        fontWeight: FontWeight.w400,
      ),
      shape: RoundedRectangleBorder(borderRadius: AppRadius.standard),
    ),
  );
}

// ─── Text Button ───────────────────────────────────────────────────────────────
TextButtonThemeData _textButtonTheme(ColorScheme colorScheme) {
  return TextButtonThemeData(
    style: TextButton.styleFrom(
      padding: AppSpacing.paddingHorizontalMd,
      shape: RoundedRectangleBorder(borderRadius: AppRadius.standard),
      foregroundColor: AppColors.accent,
      textStyle: const TextStyle(
        fontSize: AppFontSizes.button,
        fontWeight: FontWeight.w400,
      ),
    ),
  );
}

// ─── Icon Button ───────────────────────────────────────────────────────────────
IconButtonThemeData _iconButtonTheme(ColorScheme colorScheme) {
  return IconButtonThemeData(
    style: IconButton.styleFrom(
      foregroundColor: AppColors.textSecondary,
      iconSize: AppSizes.iconLg,
      minimumSize: const Size(AppSizes.touchTarget, AppSizes.touchTarget),
      padding: AppSpacing.paddingAllSm,
    ),
  );
}

// ─── Input Decoration — DESIGN.md §4 ──────────────────────────────────────────
InputDecorationTheme _inputDecorationTheme(ColorScheme colorScheme) {
  return InputDecorationTheme(
    filled: true,
    fillColor: AppColors.inputBg,
    errorMaxLines: 3,
    prefixIconColor: AppColors.textTertiary,
    suffixIconColor: AppColors.textTertiary,
    labelStyle: const TextStyle(
      fontSize: AppFontSizes.body,
      color: AppColors.textSecondary,
    ),
    hintStyle: const TextStyle(
      fontSize: AppFontSizes.body,
      color: AppColors.textPlaceholder, // slate-300
    ),
    errorStyle: TextStyle(
      fontStyle: FontStyle.normal,
      color: colorScheme.error,
    ),
    floatingLabelStyle: const TextStyle(color: AppColors.accent),
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    border: OutlineInputBorder(
      borderRadius: AppRadius.standard,
      borderSide: const BorderSide(color: AppColors.border, width: 1),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: AppRadius.standard,
      borderSide: const BorderSide(color: AppColors.border, width: 1),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: AppRadius.standard,
      borderSide: const BorderSide(
        color: AppColors.accentFocusBorder, // rgba(0,113,227,0.40)
        width: 1.5,
      ),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: AppRadius.standard,
      borderSide: BorderSide(color: colorScheme.error, width: 1),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: AppRadius.standard,
      borderSide: BorderSide(color: colorScheme.error, width: 1.5),
    ),
  );
}

// ─── Card — no border, BoxShadow for depth (DESIGN.md §4) ────────────────────
CardThemeData _cardTheme(ColorScheme colorScheme) {
  return CardThemeData(
    color: AppColors.secondaryBg,
    elevation: 0,
    shadowColor: Colors.transparent,
    margin: EdgeInsets.zero,
    shape: RoundedRectangleBorder(
      borderRadius: AppRadius.standard,
      side: BorderSide.none,
    ),
  );
}

// ─── Popup Menu ────────────────────────────────────────────────────────────────
PopupMenuThemeData _popupMenuTheme(ColorScheme colorScheme) {
  return PopupMenuThemeData(
    color: AppColors.pageBg,
    elevation: 8,
    shadowColor: AppColors.shadowCard,
    shape: RoundedRectangleBorder(borderRadius: AppRadius.large),
  );
}

// ─── Dialog ────────────────────────────────────────────────────────────────────
DialogThemeData _dialogTheme(ColorScheme colorScheme) {
  return DialogThemeData(
    backgroundColor: AppColors.pageBg,
    elevation: 0,
    shadowColor: AppColors.shadowCard,
    shape: RoundedRectangleBorder(borderRadius: AppRadius.large),
  );
}

// ─── Bottom Sheet ──────────────────────────────────────────────────────────────
BottomSheetThemeData _bottomSheetTheme(ColorScheme colorScheme) {
  return BottomSheetThemeData(
    backgroundColor: AppColors.pageBg,
    modalBackgroundColor: AppColors.pageBg,
    elevation: 0,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(
        top: Radius.circular(AppSizes.borderRadiusLarge),
      ),
    ),
  );
}

// ─── Tab Bar ───────────────────────────────────────────────────────────────────
TabBarThemeData _tabBarTheme(ColorScheme colorScheme) {
  return const TabBarThemeData(
    indicatorSize: TabBarIndicatorSize.tab,
    labelColor: AppColors.accent,
    unselectedLabelColor: AppColors.textSecondary,
    indicator: UnderlineTabIndicator(
      borderSide: BorderSide(color: AppColors.accent, width: 2),
    ),
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────
DividerThemeData _dividerTheme(ColorScheme colorScheme) {
  return const DividerThemeData(
    color: AppColors.divider,
    thickness: 1,
    space: 1,
  );
}

// ─── Checkbox ──────────────────────────────────────────────────────────────────
CheckboxThemeData _checkboxTheme(ColorScheme colorScheme) {
  return CheckboxThemeData(
    shape: RoundedRectangleBorder(borderRadius: AppRadius.xs),
    checkColor: WidgetStateProperty.all(AppColors.white),
    fillColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) return AppColors.accent;
      return Colors.transparent;
    }),
    side: const BorderSide(color: AppColors.border, width: 1.5),
  );
}

// ─── Radio ──────────────────────────────────────────────────────────────────────
RadioThemeData _radioTheme(ColorScheme colorScheme) {
  return RadioThemeData(
    fillColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) return AppColors.accent;
      return AppColors.textTertiary;
    }),
  );
}

// ─── Switch ─────────────────────────────────────────────────────────────────────
SwitchThemeData _switchTheme(ColorScheme colorScheme) {
  return SwitchThemeData(
    thumbColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) return AppColors.white;
      return AppColors.textTertiary;
    }),
    trackColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) return AppColors.accent;
      return AppColors.border;
    }),
  );
}

// ─── Slider ─────────────────────────────────────────────────────────────────────
SliderThemeData _sliderTheme(ColorScheme colorScheme) {
  return const SliderThemeData(
    activeTrackColor: AppColors.accent,
    inactiveTrackColor: AppColors.border,
    thumbColor: AppColors.accent,
    overlayColor: AppColors.accentTintBg,
  );
}

// ─── Chip — filter chip style per DESIGN.md §4 ────────────────────────────────
ChipThemeData _chipTheme(ColorScheme colorScheme) {
  return ChipThemeData(
    backgroundColor: AppColors.pageBg,
    labelStyle: const TextStyle(
      color: AppColors.textSecondary,
      fontSize: AppFontSizes.filterChip,
      fontWeight: FontWeight.w500,
    ),
    selectedColor: AppColors.accentTintBg,
    secondarySelectedColor: AppColors.accentTintBg,
    secondaryLabelStyle: const TextStyle(
      color: AppColors.accent,
      fontSize: AppFontSizes.filterChip,
      fontWeight: FontWeight.w500,
    ),
    padding: AppSpacing.filterChipPadding,
    checkmarkColor: AppColors.accent,
    shape: RoundedRectangleBorder(
      borderRadius: AppRadius.pill,
      side: const BorderSide(color: AppColors.border, width: 1),
    ),
    brightness: Brightness.light,
    elevation: 0,
    pressElevation: 0,
    shadowColor: Colors.transparent,
  );
}

// ─── Tooltip ───────────────────────────────────────────────────────────────────
TooltipThemeData _tooltipTheme(ColorScheme colorScheme) {
  return TooltipThemeData(
    decoration: BoxDecoration(
      color: AppColors.textPrimary,
      borderRadius: AppRadius.standard,
    ),
    textStyle: const TextStyle(
      color: AppColors.white,
      fontSize: AppFontSizes.caption,
    ),
  );
}

// ─── FAB ────────────────────────────────────────────────────────────────────────
FloatingActionButtonThemeData _floatingActionButtonTheme(
  ColorScheme colorScheme,
) {
  return FloatingActionButtonThemeData(
    backgroundColor: AppColors.accent,
    foregroundColor: AppColors.white,
    elevation: 0,
    shape: RoundedRectangleBorder(borderRadius: AppRadius.large),
  );
}

// ─── List Tile ──────────────────────────────────────────────────────────────────
ListTileThemeData _listTileTheme(ColorScheme colorScheme) {
  return ListTileThemeData(
    iconColor: AppColors.textSecondary,
    tileColor: Colors.transparent,
    textColor: AppColors.textPrimary,
    minLeadingWidth: AppSizes.touchTarget,
    minVerticalPadding: 12,
    shape: RoundedRectangleBorder(borderRadius: AppRadius.standard),
  );
}

// ─── Progress Indicator ─────────────────────────────────────────────────────────
ProgressIndicatorThemeData _progressIndicatorTheme(ColorScheme colorScheme) {
  return const ProgressIndicatorThemeData(
    color: AppColors.accent,
    linearTrackColor: AppColors.border,
    circularTrackColor: AppColors.border,
  );
}

// ─── Snackbar ───────────────────────────────────────────────────────────────────
SnackBarThemeData _snackBarTheme(ColorScheme colorScheme) {
  return SnackBarThemeData(
    backgroundColor: AppColors.textPrimary,
    contentTextStyle: const TextStyle(
      color: AppColors.white,
      fontSize: AppFontSizes.caption,
    ),
    shape: RoundedRectangleBorder(borderRadius: AppRadius.standard),
    behavior: SnackBarBehavior.floating,
  );
}

// ─── Expansion Tile ─────────────────────────────────────────────────────────────
ExpansionTileThemeData _expansionTileTheme(ColorScheme colorScheme) {
  return ExpansionTileThemeData(
    iconColor: AppColors.textSecondary,
    textColor: AppColors.textPrimary,
    collapsedIconColor: AppColors.textSecondary,
    collapsedTextColor: AppColors.textPrimary,
    backgroundColor: Colors.transparent,
    collapsedBackgroundColor: Colors.transparent,
    shape: RoundedRectangleBorder(borderRadius: AppRadius.standard),
    collapsedShape: RoundedRectangleBorder(borderRadius: AppRadius.standard),
  );
}

// ─── Drawer — DESIGN.md §3 mobile drawer spec ─────────────────────────────────
// Width: 260px, same nav items as web sidebar, frosted glass treatment.
DrawerThemeData _drawerTheme(ColorScheme colorScheme) {
  return const DrawerThemeData(
    backgroundColor: AppColors.sidebarBg,
    elevation: 0,
    shadowColor: AppColors.shadowCard,
    width: AppSizes.drawerWidth,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
  );
}
