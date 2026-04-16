import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class LbEmptyState extends StatelessWidget {
  final String message;
  final IconData? icon;

  const LbEmptyState({
    super.key,
    required this.message,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null)
              Icon(
                icon,
                size: 48,
                color: AppColors.textPlaceholder,
              ),
            if (icon != null) const SizedBox(height: 16),
            Text(
              message,
              style: AppTypography.body.copyWith(
                color: AppColors.textPlaceholder,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
