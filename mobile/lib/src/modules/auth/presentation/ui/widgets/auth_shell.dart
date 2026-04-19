import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';

/// Scaffold + header chrome shared by all auth screens.
/// - Logo row on top-left.
/// - Optional Go-Back or Skip affordance on top-right.
/// - Scrollable centered body within a max 520px content column.
class AuthShell extends StatelessWidget {
  const AuthShell({
    super.key,
    required this.child,
    this.showBack = false,
    this.onSkip,
  });

  final Widget child;
  final bool showBack;
  final VoidCallback? onSkip;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.pageBg,
      body: SafeArea(
        child: Column(
          children: [
            _AuthTopBar(showBack: showBack, onSkip: onSkip),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(
                  AppSizes.md,
                  AppSizes.md,
                  AppSizes.md,
                  AppSizes.xxl,
                ),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 520),
                    child: child,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AuthTopBar extends StatelessWidget {
  const _AuthTopBar({required this.showBack, this.onSkip});

  final bool showBack;
  final VoidCallback? onSkip;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSizes.md,
        vertical: AppSizes.sm,
      ),
      child: Row(
        children: [
          const _BrandMark(),
          const Spacer(),
          if (showBack)
            TextButton.icon(
              onPressed: () {
                final nav = Navigator.of(context);
                if (nav.canPop()) nav.pop();
              },
              icon: const Icon(
                Icons.arrow_back_rounded,
                size: AppSizes.iconSm,
                color: AppColors.textSecondary,
              ),
              label: const Text(
                'Go Back',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: AppFontSizes.suggestionPill,
                  fontWeight: FontWeight.w500,
                ),
              ),
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSizes.sm,
                  vertical: AppSizes.xs,
                ),
                minimumSize: const Size(AppSizes.touchTarget, AppSizes.touchTarget),
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
            )
          else if (onSkip != null)
            TextButton(
              onPressed: onSkip,
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSizes.sm,
                  vertical: AppSizes.xs,
                ),
                minimumSize: const Size(AppSizes.touchTarget, AppSizes.touchTarget),
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              child: const Text(
                'Skip',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: AppFontSizes.suggestionPill,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _BrandMark extends StatelessWidget {
  const _BrandMark();

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Image.asset(
          AppAssets.trueBlackLogo,
          width: 26,
          height: 26,
          fit: BoxFit.contain,
        ),
        AppSpacing.horizontalGap8,
        const Text(
          'LinkBeet',
          style: TextStyle(
            color: AppColors.textPrimary,
            fontSize: 18,
            fontWeight: FontWeight.w500,
            letterSpacing: -0.4,
          ),
        ),
      ],
    );
  }
}
