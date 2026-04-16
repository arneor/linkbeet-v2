import 'package:flutter/material.dart';

import '../theme/app_colors.dart';

class LbLoading extends StatelessWidget {
  const LbLoading({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(
        color: AppColors.accent,
        strokeWidth: 2.5,
      ),
    );
  }
}
