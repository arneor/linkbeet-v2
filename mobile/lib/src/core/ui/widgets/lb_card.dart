import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_radius.dart';
import '../theme/app_shadows.dart';

class LbCard extends StatelessWidget {
  final Widget child;
  final bool elevated;
  final Color? backgroundColor;
  final EdgeInsetsGeometry? padding;
  final VoidCallback? onTap;

  const LbCard({
    super.key,
    required this.child,
    this.elevated = false,
    this.backgroundColor,
    this.padding,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: padding ?? const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: backgroundColor ?? AppColors.secondaryBg,
          borderRadius: AppRadius.largeRadius,
          boxShadow: elevated ? AppShadows.card : null,
        ),
        child: child,
      ),
    );
  }
}
