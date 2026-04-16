import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';

class SuggestionPillRow extends StatelessWidget {
  const SuggestionPillRow({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: AppSpacing.screenPadding,
      child: Row(
        children: [
          _SuggestionPill(
            icon: Icons.location_on_outlined,
            iconColor: AppColors.success,
            label: 'Top-rated near me',
            onTap: () {},
          ),
          AppSpacing.horizontalGap8,
          _SuggestionPill(
            icon: Icons.auto_awesome_rounded,
            iconColor: const Color(0xFFA855F7), // purple-500 — one-off, not in AppColors
            label: 'Featured this week',
            onTap: () {},
          ),
          AppSpacing.horizontalGap8,
          _SuggestionPill(
            icon: Icons.search_rounded,
            iconColor: AppColors.accent,
            label: 'Search by category',
            onTap: () {},
          ),
        ],
      ),
    );
  }
}

class _SuggestionPill extends StatelessWidget {
  const _SuggestionPill({
    required this.icon,
    required this.iconColor,
    required this.label,
    required this.onTap,
  });

  final IconData icon;
  final Color iconColor;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: AppSpacing.suggestionPillPadding,
        decoration: BoxDecoration(
          color: AppColors.pageBg,
          borderRadius: AppRadius.large,
          border: Border.all(color: AppColors.border),
          boxShadow: AppColors.cardShadow,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: AppSizes.iconSm, color: iconColor),
            AppSpacing.horizontalGap8,
            Text(
              label,
              style: const TextStyle(
                fontSize: AppFontSizes.suggestionPill,
                fontWeight: FontWeight.w500,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
