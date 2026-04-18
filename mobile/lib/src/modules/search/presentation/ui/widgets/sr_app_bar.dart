import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kUserAvatarBg = Color(0xFF0F172A); // slate-900
const _kSearchIconSize = 26.0;
const _kAppBarHeight = 56.0;

class SearchResultAppBar extends StatelessWidget
    implements PreferredSizeWidget {
  const SearchResultAppBar({super.key, required this.controller});

  final TextEditingController controller;

  @override
  Size get preferredSize => const Size.fromHeight(_kAppBarHeight);

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
      titleSpacing: 0,
      title: SizedBox(
        height: AppSizes.touchTarget,
        child: TextField(
          controller: controller,
          textAlignVertical: TextAlignVertical.center,
          style: AppTextStyle.bodyMedium(
            context,
          )?.copyWith(letterSpacing: -0.3),
          decoration: InputDecoration(
            filled: true,
            fillColor: AppColors.white,
            suffixIcon: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                InkWell(
                  onTap: () => controller.clear(),
                  child: const Icon(
                    Icons.close,
                    color: AppColors.textTertiary,
                    size: AppSizes.iconSm,
                  ),
                ),
                const SizedBox(width: AppSizes.xs + AppSizes.px),
                InkWell(
                  onTap: () {},
                  child: const Icon(
                    Icons.search,
                    color: AppColors.accent,
                    size: _kSearchIconSize,
                  ),
                ),
                const SizedBox(width: AppSizes.xs + AppSizes.px),
              ],
            ),
            contentPadding: const EdgeInsets.only(
              left: AppSizes.xs + AppSizes.px,
            ),
            border: OutlineInputBorder(
              borderRadius: AppRadius.pill,
              borderSide: const BorderSide(color: AppColors.border),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: AppRadius.pill,
              borderSide: const BorderSide(color: AppColors.border),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: AppRadius.pill,
              borderSide: const BorderSide(color: AppColors.accent, width: 1.5),
            ),
          ),
        ),
      ),
      actions: const [
        SizedBox(width: AppSizes.md),
        _UserAvatar(initial: 'N'),
        SizedBox(width: AppSizes.md),
      ],
    );
  }
}

class _UserAvatar extends StatelessWidget {
  const _UserAvatar({required this.initial});

  final String initial;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: AppSizes.avatarSm,
      height: AppSizes.avatarSm,
      decoration: const BoxDecoration(
        color: _kUserAvatarBg,
        shape: BoxShape.circle,
      ),
      alignment: Alignment.center,
      child: Text(
        initial,
        style: AppTextStyle.labelMedium(
          context,
        )?.copyWith(fontWeight: FontWeight.w600, color: AppColors.white),
      ),
    );
  }
}
