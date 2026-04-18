import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_theme.dart';
import 'package:linkbeet/src/core/ui/widgets/discover_stories_button.dart';
import 'package:linkbeet/src/modules/near_me/presentation/router/near_me_router_module.dart';

class DsHomeAppBar extends StatelessWidget implements PreferredSizeWidget {
  const DsHomeAppBar({super.key, required this.onMenuTap});

  final VoidCallback onMenuTap;

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      elevation: 0,
      systemOverlayStyle: AppTheme.systemUiOverlayStyle,
      leading: GestureDetector(
        onTap: onMenuTap,
        behavior: HitTestBehavior.opaque,
        child: const Padding(
          padding: EdgeInsets.all(AppSizes.menuIconPadding),
          child: _MenuIcon(),
        ),
      ),
      actions: [
        DiscoverStoriesButton(
          onTap: () => NearMeRoute().push(context),
        ),
        AppSpacing.horizontalGap16,
      ],
    );
  }
}

// Staggered-line hamburger — three bars with decreasing widths (Notion/Linear style).
class _MenuIcon extends StatelessWidget {
  const _MenuIcon();

  static const _kBarHeight = 2.0;
  static const _kBarGap = 5.0;
  static const _kBarDecoration = BoxDecoration(
    color: AppColors.textPrimary,
    borderRadius: BorderRadius.all(Radius.circular(1)),
  );

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(width: 22, height: _kBarHeight, decoration: _kBarDecoration),
        const SizedBox(height: _kBarGap),
        Container(width: 16, height: _kBarHeight, decoration: _kBarDecoration),
        const SizedBox(height: _kBarGap),
        Container(width: 10, height: _kBarHeight, decoration: _kBarDecoration),
      ],
    );
  }
}
