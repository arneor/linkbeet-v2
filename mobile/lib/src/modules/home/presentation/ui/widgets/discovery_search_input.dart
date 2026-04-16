import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_durations.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';

class DiscoverySearchInput extends StatefulWidget {
  const DiscoverySearchInput({
    super.key,
    this.compact = false,
    this.initialQuery = '',
    this.onQueryChanged,
    this.onSubmitted,
    this.onFocusChanged,
  });

  final bool compact;
  final String initialQuery;
  final ValueChanged<String>? onQueryChanged;
  final ValueChanged<String>? onSubmitted;
  final ValueChanged<bool>? onFocusChanged;

  @override
  State<DiscoverySearchInput> createState() => _DiscoverySearchInputState();
}

class _DiscoverySearchInputState extends State<DiscoverySearchInput> {
  late final TextEditingController _controller;
  late final FocusNode _focusNode;
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialQuery);
    _focusNode = FocusNode()
      ..addListener(() {
        setState(() => _isFocused = _focusNode.hasFocus);
        widget.onFocusChanged?.call(_focusNode.hasFocus);
      });
    _controller.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final borderRadius =
        widget.compact ? AppRadius.large : AppRadius.searchInput;
    final minHeight = widget.compact ? 44.0 : 52.0;

    return AnimatedContainer(
      duration: AppDurations.fast,
      constraints: BoxConstraints(minHeight: minHeight),
      decoration: BoxDecoration(
        color: AppColors.inputBg,
        borderRadius: borderRadius,
        border: Border.all(
          color: _isFocused ? AppColors.accentFocusBorder : AppColors.border,
          width: _isFocused ? 1.5 : 1.0,
        ),
        boxShadow: _isFocused ? AppColors.focusShadow : AppColors.cardShadow,
      ),
      child: Row(
        children: [
          // Search icon — left, 16px padding
          Padding(
            padding: const EdgeInsets.only(left: 16),
            child: Icon(
              Icons.search_rounded,
              size: AppSizes.iconLg,
              color:
                  _isFocused ? AppColors.accent : AppColors.textPlaceholder,
            ),
          ),
          AppSpacing.horizontalGap8,
          // Text input
          Expanded(
            child: TextField(
              controller: _controller,
              focusNode: _focusNode,
              maxLines: 1,
              style: const TextStyle(
                fontSize: AppFontSizes.inputText,
                color: AppColors.textPrimary,
              ),
              decoration: const InputDecoration(
                hintText: 'Find a cafe, book a salon, hire a creator...',
                hintStyle: TextStyle(
                  fontSize: AppFontSizes.inputText,
                  color: AppColors.textPlaceholder,
                ),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(vertical: 14),
                isDense: true,
              ),
              onChanged: widget.onQueryChanged,
              onSubmitted: widget.onSubmitted,
            ),
          ),
          // Right controls
          Padding(
            padding: const EdgeInsets.only(right: 6),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (!widget.compact)
                  // Mic button — voice search
                  SizedBox(
                    width: AppSizes.touchTarget,
                    height: AppSizes.touchTarget,
                    child: IconButton(
                      icon: const Icon(Icons.mic_none_rounded),
                      iconSize: AppSizes.iconLg,
                      color: AppColors.textPlaceholder,
                      padding: EdgeInsets.zero,
                      onPressed: () {},
                    ),
                  ),
                AppSpacing.horizontalGap4,
                // Send button — blue when query non-empty
                AnimatedContainer(
                  duration: AppDurations.fast,
                  width: AppSizes.sendButtonSize,
                  height: AppSizes.sendButtonSize,
                  decoration: BoxDecoration(
                    color: _controller.text.isNotEmpty
                        ? AppColors.accent
                        : AppColors.secondaryBg,
                    borderRadius: AppRadius.sendButton,
                  ),
                  child: Material(
                    color: Colors.transparent,
                    child: InkWell(
                      borderRadius: AppRadius.sendButton,
                      onTap: () {
                        if (_controller.text.isNotEmpty) {
                          widget.onSubmitted?.call(_controller.text);
                        }
                      },
                      child: Icon(
                        Icons.arrow_forward_rounded,
                        size: AppSizes.iconLg,
                        color: _controller.text.isNotEmpty
                            ? AppColors.white
                            : AppColors.textPlaceholder,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
