import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';

class FilterChipRow extends StatelessWidget {
  const FilterChipRow({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: AppSpacing.screenPadding,
      child: Row(
        children: [
          _FilterChip(
            label: 'Filters',
            icon: Icons.tune_rounded,
            onTap: () {},
          ),
          AppSpacing.horizontalGap8,
          Container(width: 1, height: 16, color: AppColors.border),
          AppSpacing.horizontalGap8,
          _FilterChip(label: 'Restaurants', onTap: () {}),
          AppSpacing.horizontalGap6,
          _FilterChip(label: 'Salons & Spas', onTap: () {}),
          AppSpacing.horizontalGap6,
          _FilterChip(label: 'Creators', onTap: () {}),
          AppSpacing.horizontalGap6,
          _OpenNowChip(onTap: () {}),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({required this.label, this.icon, required this.onTap});

  final String label;
  final IconData? icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: AppSpacing.filterChipPadding,
        decoration: BoxDecoration(
          color: AppColors.pageBg,
          borderRadius: AppRadius.pill,
          border: Border.all(color: AppColors.border),
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
              style: const TextStyle(
                fontSize: AppFontSizes.filterChip,
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

class _OpenNowChip extends StatelessWidget {
  const _OpenNowChip({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: AppSpacing.filterChipPadding,
        decoration: BoxDecoration(
          color: AppColors.openNowBg,
          borderRadius: AppRadius.pill,
          border: Border.all(color: AppColors.openNowBorder),
        ),
        child: const Text(
          'Open Now',
          style: TextStyle(
            fontSize: AppFontSizes.filterChip,
            fontWeight: FontWeight.w500,
            color: AppColors.openNowText,
          ),
        ),
      ),
    );
  }
}
