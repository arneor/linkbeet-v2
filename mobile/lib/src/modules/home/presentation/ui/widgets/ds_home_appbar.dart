import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_theme.dart';
import 'package:linkbeet/src/core/ui/widgets/discover_stories_button.dart';

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
          padding: EdgeInsets.all(14),
          child: _ModernMenuIcon(),
        ),
      ),
      actions: [
        // Spacer — right side reserved for the DiscoverStoriesButton (fixed)
        DiscoverStoriesButton(),
        AppSpacing.horizontalGap16,
      ],
    );
  }
}

/// Modern staggered-line hamburger icon — three lines with decreasing widths.
/// Popular in premium SaaS/app designs (Notion, Linear, etc.).
class _ModernMenuIcon extends StatelessWidget {
  const _ModernMenuIcon();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 22,
          height: 2,
          decoration: BoxDecoration(
            color: AppColors.textPrimary,
            borderRadius: BorderRadius.circular(1),
          ),
        ),
        const SizedBox(height: 5),
        Container(
          width: 16,
          height: 2,
          decoration: BoxDecoration(
            color: AppColors.textPrimary,
            borderRadius: BorderRadius.circular(1),
          ),
        ),
        const SizedBox(height: 5),
        Container(
          width: 10,
          height: 2,
          decoration: BoxDecoration(
            color: AppColors.textPrimary,
            borderRadius: BorderRadius.circular(1),
          ),
        ),
      ],
    );
  }
}
