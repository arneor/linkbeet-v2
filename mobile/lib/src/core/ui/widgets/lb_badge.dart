import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_radius.dart';
import '../theme/app_typography.dart';

enum LbBadgeVariant { neutral, featured }

class LbBadge extends StatelessWidget {
  final String label;
  final LbBadgeVariant variant;

  const LbBadge({
    super.key,
    required this.label,
    this.variant = LbBadgeVariant.neutral,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: switch (variant) {
          LbBadgeVariant.neutral => AppColors.secondaryBg,
          LbBadgeVariant.featured => AppColors.accentTintBg,
        },
        borderRadius: AppRadius.circleRadius,
      ),
      child: Text(
        label,
        style: AppTypography.badge.copyWith(
          color: switch (variant) {
            LbBadgeVariant.neutral => AppColors.textSecondary,
            LbBadgeVariant.featured => AppColors.accent,
          },
        ),
      ),
    );
  }
}
