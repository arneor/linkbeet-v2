import 'package:flutter/material.dart';

import '../../theme/app_colors.dart';
import '../../theme/app_spacing.dart';
import '../lb_avatar.dart';

class LbAppBar extends StatelessWidget implements PreferredSizeWidget {
  const LbAppBar({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(AppSpacing.topBarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      toolbarHeight: AppSpacing.topBarHeight,
      backgroundColor: AppColors.pageBg,
      elevation: 0,
      scrolledUnderElevation: 0,
      leading: IconButton(
        icon: const Icon(
          Icons.menu,
          color: AppColors.textPrimary,
          size: 24,
        ),
        onPressed: () => Scaffold.of(context).openDrawer(),
        tooltip: 'Menu',
      ),
      actions: [
        Padding(
          padding: const EdgeInsets.only(right: 12),
          child: GestureDetector(
            onTap: () {
              // TODO: Navigate to profile / show account menu
            },
            child: const LbAvatar(
              initials: 'U',
              size: AppSpacing.avatarSize,
            ),
          ),
        ),
      ],
    );
  }
}
