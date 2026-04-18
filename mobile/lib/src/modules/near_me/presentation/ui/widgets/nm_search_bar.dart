import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kBarHeight = 44.0;
const _kSearchIconSize = 18.0;
const _kLocationIconSize = 12.0;

class NearMeSearchBar extends StatelessWidget {
  const NearMeSearchBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: _kBarHeight,
      decoration: BoxDecoration(
        color: AppColors.pageBg,
        border: Border.all(color: AppColors.border),
        borderRadius: AppRadius.pill,
        boxShadow: AppColors.cardShadow,
      ),
      child: Row(
        children: [
          const SizedBox(width: AppSizes.md - AppSizes.px),
          const Icon(
            Icons.search,
            color: AppColors.textTertiary,
            size: _kSearchIconSize,
          ),
          const SizedBox(width: AppSizes.sm),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search nearby places...',
                hintStyle: AppTextStyle.labelMedium(context)?.copyWith(
                  color: AppColors.textPlaceholder,
                ),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                errorBorder: InputBorder.none,
                focusedErrorBorder: InputBorder.none,
                isDense: true,
                contentPadding: EdgeInsets.zero,
              ),
              style: AppTextStyle.labelMedium(context)?.copyWith(
                color: AppColors.textPrimary,
              ),
              textInputAction: TextInputAction.search,
            ),
          ),
          _LocationChip(),
        ],
      ),
    );
  }
}

class _LocationChip extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSizes.sm + AppSizes.px,
        vertical: AppSizes.xs,
      ),
      margin: const EdgeInsets.only(right: AppSizes.sm),
      decoration: BoxDecoration(
        color: AppColors.secondaryBg,
        borderRadius: AppRadius.pill,
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.location_on_outlined,
            size: _kLocationIconSize,
            color: AppColors.accent,
          ),
          const SizedBox(width: AppSizes.xs - AppSizes.px),
          Text(
            '2 km',
            style: AppTextStyle.labelSmall(context)?.copyWith(
              color: AppColors.textSecondary,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
