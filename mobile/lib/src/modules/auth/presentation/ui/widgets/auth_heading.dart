import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';

class AuthHeading extends StatelessWidget {
  const AuthHeading({super.key, required this.title, this.subtitle});

  final String title;
  final Widget? subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            color: AppColors.textPrimary,
            fontSize: 36,
            fontWeight: FontWeight.w600,
            letterSpacing: -1.0,
            height: 1.05,
          ),
        ),
        if (subtitle != null) ...[
          const SizedBox(height: 12),
          DefaultTextStyle.merge(
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: AppColors.textSecondary,
              fontSize: 15,
              fontWeight: FontWeight.w400,
              letterSpacing: -0.2,
              height: 1.4,
            ),
            child: subtitle!,
          ),
        ],
      ],
    );
  }
}
