import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_durations.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

// Default (unfocused) shadow — lighter than the focus shadow from AppColors
const _kDefaultShadow = [
  BoxShadow(color: AppColors.shadowCard, blurRadius: 12, offset: Offset(0, 2)),
];
const _kActionPaddingR = 6.0;

class DsHomeSearchInput extends StatelessWidget {
  const DsHomeSearchInput({
    super.key,
    required this.controller,
    required this.focusNode,
    required this.isFocused,
    this.onSearch,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final bool isFocused;
  final VoidCallback? onSearch;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: AppDurations.overlayFade,
      height: AppSizes.searchBarHeight,
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: AppRadius.pill,
        border: Border.all(
          color: isFocused ? AppColors.accentFocusBorder : AppColors.border,
          width: isFocused ? 1.5 : 1.0,
        ),
        boxShadow: isFocused ? AppColors.focusShadow : _kDefaultShadow,
      ),
      child: Row(
        children: [
          Padding(
            padding: const EdgeInsets.only(left: AppSizes.md),
            child: Icon(
              Icons.search_rounded,
              size: AppSizes.iconAction,
              color: isFocused ? AppColors.accent : AppColors.textPlaceholder,
            ),
          ),
          Expanded(
            child: TextField(
              controller: controller,
              focusNode: focusNode,
              textInputAction: TextInputAction.search,
              onSubmitted: (_) => onSearch?.call(),
              style: AppTextStyle.bodyLarge(context),
              decoration: InputDecoration(
                hintText: 'Find a cafe, book a salon, hire a creator...',
                hintStyle: AppTextStyle.bodyLarge(context)?.copyWith(
                  color: AppColors.textPlaceholder,
                ),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(
                  horizontal: AppSizes.sm + AppSizes.xs,
                ),
                isDense: true,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(right: _kActionPaddingR),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  width: AppSizes.sendButtonSize,
                  height: AppSizes.sendButtonSize,
                  child: IconButton(
                    padding: EdgeInsets.zero,
                    icon: const Icon(Icons.mic_none_rounded),
                    iconSize: AppSizes.iconAction,
                    color: AppColors.textPlaceholder,
                    onPressed: () {},
                  ),
                ),
                _SendButton(
                  hasText: controller.text.isNotEmpty,
                  onTap: onSearch,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SendButton extends StatelessWidget {
  const _SendButton({required this.hasText, this.onTap});

  final bool hasText;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: AppDurations.overlayFade,
      width: AppSizes.sendButtonSize,
      height: AppSizes.sendButtonSize,
      decoration: BoxDecoration(
        color: hasText ? AppColors.accent : AppColors.secondaryBg,
        shape: BoxShape.circle,
      ),
      child: Material(
        color: Colors.transparent,
        shape: const CircleBorder(),
        child: InkWell(
          customBorder: const CircleBorder(),
          onTap: hasText ? onTap : null,
          child: Icon(
            Icons.arrow_forward_rounded,
            size: AppSizes.iconAction,
            color: hasText ? AppColors.white : AppColors.textPlaceholder,
          ),
        ),
      ),
    );
  }
}
