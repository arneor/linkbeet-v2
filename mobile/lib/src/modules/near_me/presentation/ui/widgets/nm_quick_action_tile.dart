import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kTileSize = 56.0;

class NearMeQuickActionTile extends StatelessWidget {
  const NearMeQuickActionTile({
    super.key,
    required this.icon,
    required this.label,
    this.onTap,
  });

  final IconData icon;
  final String label;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: _kTileSize,
          height: _kTileSize,
          decoration: BoxDecoration(
            color: AppColors.secondaryBg,
            shape: BoxShape.circle,
            boxShadow: AppColors.cardShadow,
          ),
          child: Material(
            color: Colors.transparent,
            shape: const CircleBorder(),
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: onTap ?? () {},
              child: Center(
                child: Icon(icon, size: AppSizes.iconMd, color: AppColors.textPrimary),
              ),
            ),
          ),
        ),
        AppSpacing.verticalGap6,
        Text(
          label,
          style: AppTextStyle.labelSmall(context)?.copyWith(
            color: AppColors.textSecondary,
            fontWeight: FontWeight.w500,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
