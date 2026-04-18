import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

// Vertical padding per row — sits between AppSizes.sm (8) and AppSizes.md (16)
const _kItemPaddingV = 14.0;
// Trending icon size — between iconSm (16) and iconMd (22)
const _kTrendingIconSize = 18.0;
// Divider indent = icon width + gap + horizontal padding = 24 + 16 + 16
const _kDividerIndent = AppSizes.iconLg + AppSizes.md + AppSizes.md;

class DsHomeTrendingList extends StatelessWidget {
  const DsHomeTrendingList({
    super.key,
    required this.items,
    required this.onItemTap,
  });

  final List<String> items;
  final ValueChanged<String> onItemTap;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(AppSizes.md, AppSizes.md, AppSizes.md, 0),
          child: Text(
            'Trending Searches',
            style: AppTextStyle.bodySmall(context)?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        ...items.asMap().entries.map((entry) {
          final index = entry.key;
          final label = entry.value;
          return Column(
            children: [
              _TrendingItem(label: label, onTap: () => onItemTap(label)),
              if (index < items.length - 1)
                Container(
                  height: AppSizes.dividerHeight,
                  margin: const EdgeInsets.only(left: _kDividerIndent),
                  color: AppColors.border,
                ),
            ],
          );
        }),
      ],
    );
  }
}

class _TrendingItem extends StatelessWidget {
  const _TrendingItem({required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSizes.md,
          vertical: _kItemPaddingV,
        ),
        child: Row(
          children: [
            // No bg circle on mobile — matches web md:rounded-full md:bg-slate-100
            const SizedBox(
              width: AppSizes.iconLg,
              height: AppSizes.iconLg,
              child: Icon(
                Icons.trending_up_rounded,
                size: _kTrendingIconSize,
                color: AppColors.textPlaceholder,
              ),
            ),
            AppSpacing.horizontalGap16,
            Expanded(
              child: Text(
                label,
                style: AppTextStyle.bodyMedium(context)?.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
