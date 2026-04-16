import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_radius.dart';
import '../theme/app_shadows.dart';
import '../theme/app_typography.dart';

enum LbChipVariant { standard, emerald }

class LbChip extends StatelessWidget {
  final String label;
  final IconData? icon;
  final bool isSelected;
  final LbChipVariant variant;
  final VoidCallback? onTap;

  const LbChip({
    super.key,
    required this.label,
    this.icon,
    this.isSelected = false,
    this.variant = LbChipVariant.standard,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isEmerald = variant == LbChipVariant.emerald;

    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isEmerald
              ? AppColors.emeraldBg
              : (isSelected ? AppColors.accentTintBg : AppColors.pageBg),
          border: Border.all(
            color: isEmerald
                ? AppColors.emeraldBorder
                : (isSelected ? AppColors.accent : AppColors.border),
          ),
          borderRadius: AppRadius.circleRadius,
          boxShadow: AppShadows.sm,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) ...[
              Icon(
                icon,
                size: 14,
                color: isEmerald
                    ? AppColors.emeraldText
                    : (isSelected ? AppColors.accent : AppColors.textSecondary),
              ),
              const SizedBox(width: 4),
            ],
            Text(
              label,
              style: AppTypography.filterChip.copyWith(
                color: isEmerald
                    ? AppColors.emeraldText
                    : (isSelected
                        ? AppColors.accent
                        : AppColors.textSecondary),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
