import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';

class DsHomeSearchInput extends StatelessWidget {
  const DsHomeSearchInput({
    super.key,
    required this.controller,
    required this.focusNode,
    required this.isFocused,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final bool isFocused;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      height: 62,
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: AppRadius.pill,
        border: Border.all(
          color: isFocused ? AppColors.accentFocusBorder : AppColors.border,
          width: isFocused ? 1.5 : 1.0,
        ),
        boxShadow: isFocused
            ? AppColors.focusShadow
            : const [
                BoxShadow(
                  color: Color(0x0F000000),
                  blurRadius: 12,
                  offset: Offset(0, 2),
                ),
              ],
      ),
      child: Row(
        children: [
          // Search icon
          Padding(
            padding: const EdgeInsets.only(left: 16),
            child: Icon(
              Icons.search_rounded,
              size: 20,
              color: isFocused ? AppColors.accent : AppColors.textPlaceholder,
            ),
          ),
          // Text field
          Expanded(
            child: TextField(
              controller: controller,
              focusNode: focusNode,
              style: const TextStyle(
                fontSize: AppFontSizes.inputText,
                color: AppColors.textPrimary,
              ),
              decoration: const InputDecoration(
                hintText: 'Find a cafe, book a salon, hire a creator...',
                hintStyle: TextStyle(
                  fontSize: 16,
                  color: AppColors.textPlaceholder,
                ),
                border: InputBorder.none,
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 0,
                ),
                isDense: true,
              ),
            ),
          ),
          // Right controls: mic + send
          Padding(
            padding: const EdgeInsets.only(right: 6),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Mic button
                SizedBox(
                  width: 40,
                  height: 40,
                  child: IconButton(
                    padding: EdgeInsets.zero,
                    icon: const Icon(Icons.mic_none_rounded),
                    iconSize: 20,
                    color: AppColors.textPlaceholder,
                    onPressed: () {},
                  ),
                ),
                // Send button — blue when query non-empty
                AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: controller.text.isNotEmpty
                        ? AppColors.accent
                        : AppColors.secondaryBg,
                    shape: BoxShape.circle,
                  ),
                  child: Material(
                    color: Colors.transparent,
                    shape: const CircleBorder(),
                    child: InkWell(
                      customBorder: const CircleBorder(),
                      onTap: () {},
                      child: Icon(
                        Icons.arrow_forward_rounded,
                        size: 20,
                        color: controller.text.isNotEmpty
                            ? AppColors.white
                            : const Color(0xFFCBD5E1),
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
