import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_radius.dart';
import '../theme/app_spacing.dart';
import '../theme/app_typography.dart';

enum LbButtonVariant { primary, ghost, pill }

class LbButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final LbButtonVariant variant;
  final bool isLoading;
  final IconData? icon;
  final double? width;

  const LbButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = LbButtonVariant.primary,
    this.isLoading = false,
    this.icon,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: AppSpacing.touchTargetMin,
      child: switch (variant) {
        LbButtonVariant.primary => ElevatedButton(
            onPressed: isLoading ? null : onPressed,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.accent,
              foregroundColor: AppColors.textInverse,
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: AppRadius.standardRadius,
              ),
            ),
            child: _buildChild(AppTypography.buttonPrimary),
          ),
        LbButtonVariant.ghost => OutlinedButton(
            onPressed: isLoading ? null : onPressed,
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.textSecondary,
              side: const BorderSide(color: AppColors.border),
              shape: RoundedRectangleBorder(
                borderRadius: AppRadius.standardRadius,
              ),
            ),
            child: _buildChild(AppTypography.buttonGhost),
          ),
        LbButtonVariant.pill => OutlinedButton(
            onPressed: isLoading ? null : onPressed,
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.accent,
              side: const BorderSide(color: AppColors.accent),
              shape: RoundedRectangleBorder(
                borderRadius: AppRadius.pillRadius,
              ),
            ),
            child: _buildChild(
              AppTypography.buttonGhost.copyWith(color: AppColors.accent),
            ),
          ),
      },
    );
  }

  Widget _buildChild(TextStyle style) {
    if (isLoading) {
      return const SizedBox(
        width: 20,
        height: 20,
        child: CircularProgressIndicator(strokeWidth: 2),
      );
    }
    if (icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 18),
          const SizedBox(width: 8),
          Text(label, style: style),
        ],
      );
    }
    return Text(label, style: style);
  }
}
