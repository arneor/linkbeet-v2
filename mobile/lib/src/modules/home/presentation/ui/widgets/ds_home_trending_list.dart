import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';

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
        // Header
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 16, 16, 0),
          child: Text(
            'Trending Searches',
            style: TextStyle(
              fontSize: AppFontSizes.caption,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        // Items
        ...items.asMap().entries.map((entry) {
          final index = entry.key;
          final label = entry.value;
          return Column(
            children: [
              InkWell(
                onTap: () => onItemTap(label),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 14,
                  ),
                  child: Row(
                    children: [
                      // Trending icon — 24px, no bg circle on mobile
                      // (matches web: md:w-[32px] md:h-[32px] md:rounded-full md:bg-slate-100
                      //  vs mobile: just 24px icon)
                      const SizedBox(
                        width: 24,
                        height: 24,
                        child: Icon(
                          Icons.trending_up_rounded,
                          size: 18,
                          color: AppColors.textPlaceholder,
                        ),
                      ),
                      AppSpacing.horizontalGap16,
                      Expanded(
                        child: Text(
                          label,
                          style: const TextStyle(
                            fontSize: AppFontSizes.bodySmall,
                            fontWeight: FontWeight.w400,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              if (index < items.length - 1)
                Container(
                  height: 1,
                  margin: const EdgeInsets.only(left: 56),
                  color: AppColors.border,
                ),
            ],
          );
        }),
      ],
    );
  }
}
