import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

class NearMeAppBar extends StatelessWidget implements PreferredSizeWidget {
  const NearMeAppBar({super.key, required this.onMenuTap});

  final VoidCallback onMenuTap;

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      elevation: 0,
      backgroundColor: AppColors.pageBg,
      leading: GestureDetector(
        onTap: () => Navigator.of(context).maybePop(),
        child: const Icon(
          Icons.arrow_back,
          color: AppColors.textPrimary,
          size: AppSizes.iconMd,
        ),
      ),
      title: Text(
        'Near Me',
        style: AppTextStyle.bodyMedium(context)?.copyWith(
          fontWeight: FontWeight.w600,
          letterSpacing: -0.3,
        ),
      ),
      centerTitle: true,
      actions: [
        IconButton(
          icon: const Icon(
            Icons.tune,
            color: AppColors.textPrimary,
            size: AppSizes.iconAction,
          ),
          onPressed: () {},
        ),
      ],
    );
  }
}
