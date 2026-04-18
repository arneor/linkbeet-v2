import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kFilterHeight = 40.0;
const _kFilterPaddingH = 14.0;
const _kFilterPaddingV = 6.0;
const _kAnimDuration = Duration(milliseconds: 180);

class NearMeCategoryFilter extends StatelessWidget {
  const NearMeCategoryFilter({
    super.key,
    required this.categories,
    required this.activeIndex,
    required this.onTap,
  });

  final List<({String icon, String label})> categories;
  final int activeIndex;
  final ValueChanged<int> onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: _kFilterHeight,
      child: ListView.separated(
        padding: AppSpacing.paddingHorizontalMd,
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        separatorBuilder: (context, i) => AppSpacing.horizontalGap8,
        itemBuilder: (context, i) {
          final cat = categories[i];
          final isActive = i == activeIndex;
          return GestureDetector(
            onTap: () => onTap(i),
            child: AnimatedContainer(
              duration: _kAnimDuration,
              padding: const EdgeInsets.symmetric(
                horizontal: _kFilterPaddingH,
                vertical: _kFilterPaddingV,
              ),
              decoration: BoxDecoration(
                color: isActive ? AppColors.accent : AppColors.pageBg,
                borderRadius: AppRadius.pill,
                border: Border.all(
                  color: isActive ? AppColors.accent : AppColors.border,
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(cat.icon, style: const TextStyle(fontSize: 14)),
                  AppSpacing.horizontalGap6,
                  Text(
                    cat.label,
                    style: AppTextStyle.labelMedium(context)?.copyWith(
                      fontWeight: FontWeight.w500,
                      color: isActive
                          ? AppColors.textInverse
                          : AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
