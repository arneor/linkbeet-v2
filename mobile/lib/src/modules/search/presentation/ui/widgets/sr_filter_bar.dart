import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kFilters = [
  'Nearest',
  'Top Rated',
  'Verified',
  'Open Now',
  'With Offers',
];
const _kBarPaddingV = 12.0;
const _kTabUnderlineBottom = -12.0;

class SearchResultFilterBar extends StatelessWidget {
  const SearchResultFilterBar({
    super.key,
    required this.resultCount,
    required this.activeIndex,
    required this.onFilterTap,
  });

  final int resultCount;
  final int activeIndex;
  final ValueChanged<int> onFilterTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: AppColors.white,
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        padding: AppSpacing.paddingHorizontalMd,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _ResultCount(count: resultCount),
            ...List.generate(
              _kFilters.length,
              (i) => _FilterTab(
                label: _kFilters[i],
                isActive: i == activeIndex,
                onTap: () => onFilterTap(i),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ResultCount extends StatelessWidget {
  const _ResultCount({required this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: _kBarPaddingV),
      margin: const EdgeInsets.only(right: AppSizes.sm + AppSizes.xs),
      decoration: const BoxDecoration(
        border: Border(right: BorderSide(color: AppColors.border)),
      ),
      child: Padding(
        padding: const EdgeInsets.only(right: AppSizes.md),
        child: Text(
          '$count results',
          style: AppTextStyle.labelMedium(context)?.copyWith(
            fontWeight: FontWeight.w600,
            color: AppColors.textSecondary,
          ),
        ),
      ),
    );
  }
}

class _FilterTab extends StatelessWidget {
  const _FilterTab({
    required this.label,
    required this.isActive,
    required this.onTap,
  });

  final String label;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSizes.sm + AppSizes.xs,
          vertical: _kBarPaddingV,
        ),
        color: Colors.transparent,
        child: Stack(
          clipBehavior: Clip.none,
          alignment: Alignment.center,
          children: [
            Text(
              label,
              style: AppTextStyle.bodySmall(context)?.copyWith(
                fontWeight: FontWeight.w500,
                color: isActive ? AppColors.accent : AppColors.textSecondary,
              ),
            ),
            if (isActive)
              Positioned(
                bottom: _kTabUnderlineBottom,
                left: 0,
                right: 0,
                child: Container(
                  height: AppSizes.tabIndicatorHeight,
                  decoration: const BoxDecoration(
                    color: AppColors.accent,
                    borderRadius: BorderRadius.vertical(
                      top: Radius.circular(AppSizes.px),
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
