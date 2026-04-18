import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kChipIconSize = 14.0;
const _kChipPaddingH = 12.0;
const _kChipPaddingV = 6.0;
const _kChipGap = 6.0;
const _kChipArrowGap = 4.0;

class SearchResultLocationChip extends StatelessWidget {
  const SearchResultLocationChip({super.key, this.location = 'Kochi, 2 km'});

  final String location;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        left: AppSizes.md,
        right: AppSizes.md,
        bottom: AppSizes.sm + AppSizes.xs,
      ),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: _kChipPaddingH,
            vertical: _kChipPaddingV,
          ),
          decoration: BoxDecoration(
            color: AppColors.secondaryBg,
            borderRadius: AppRadius.sendButton,
            border: Border.all(color: AppColors.border),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.location_on_outlined,
                color: AppColors.accent,
                size: _kChipIconSize,
              ),
              const SizedBox(width: _kChipGap),
              Text(
                location,
                style: AppTextStyle.labelMedium(
                  context,
                )?.copyWith(letterSpacing: -0.2),
              ),
              const SizedBox(width: _kChipArrowGap),
              const Icon(
                Icons.keyboard_arrow_down,
                color: AppColors.textTertiary,
                size: _kChipIconSize,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
