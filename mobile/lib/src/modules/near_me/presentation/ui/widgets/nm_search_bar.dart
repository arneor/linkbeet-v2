import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

import 'package:linkbeet/src/core/theme/app_durations.dart';

const _kBarHeight = 44.0;
const _kSearchIconSize = 18.0;
const _kLocationIconSize = 12.0;

class NearMeSearchBar extends StatefulWidget {
  const NearMeSearchBar({super.key, this.onSearch});

  final ValueChanged<String>? onSearch;

  @override
  State<NearMeSearchBar> createState() => _NearMeSearchBarState();
}

class _NearMeSearchBarState extends State<NearMeSearchBar> {
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _controller.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _submit() {
    if (_controller.text.trim().isNotEmpty) {
      widget.onSearch?.call(_controller.text);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: _kBarHeight,
      decoration: BoxDecoration(
        color: AppColors.pageBg,
        border: Border.all(color: AppColors.border),
        borderRadius: AppRadius.pill,
        boxShadow: AppColors.cardShadow,
      ),
      child: Row(
        children: [
          const SizedBox(width: AppSizes.md - AppSizes.px),
          const Icon(
            Icons.search,
            color: AppColors.textTertiary,
            size: _kSearchIconSize,
          ),
          const SizedBox(width: AppSizes.sm),
          Expanded(
            child: TextField(
              controller: _controller,
              decoration: InputDecoration(
                hintText: 'Search nearby places...',
                hintStyle: AppTextStyle.labelMedium(context)?.copyWith(
                  color: AppColors.textPlaceholder,
                ),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                errorBorder: InputBorder.none,
                focusedErrorBorder: InputBorder.none,
                isDense: true,
                contentPadding: EdgeInsets.zero,
              ),
              style: AppTextStyle.labelMedium(context)?.copyWith(
                color: AppColors.textPrimary,
              ),
              textInputAction: TextInputAction.search,
              onSubmitted: (_) => _submit(),
            ),
          ),
          const SizedBox(width: AppSizes.xs),
          _LocationChip(),
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
            hasText: _controller.text.isNotEmpty,
            onTap: _submit,
          ),
          const SizedBox(width: AppSizes.xs),
        ],
      ),
    );
  }
}

class _LocationChip extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSizes.sm + AppSizes.px,
        vertical: AppSizes.xs,
      ),
      margin: const EdgeInsets.only(right: AppSizes.sm),
      decoration: BoxDecoration(
        color: AppColors.secondaryBg,
        borderRadius: AppRadius.pill,
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.location_on_outlined,
            size: _kLocationIconSize,
            color: AppColors.accent,
          ),
          const SizedBox(width: AppSizes.xs - AppSizes.px),
          Text(
            '2 km',
            style: AppTextStyle.labelSmall(context)?.copyWith(
              color: AppColors.textSecondary,
              fontWeight: FontWeight.w500,
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
