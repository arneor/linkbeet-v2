import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

class NearMeBioLinkButton extends StatelessWidget {
  const NearMeBioLinkButton({super.key, required this.url});

  final String url;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      borderRadius: BorderRadius.circular(AppSizes.xs),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSizes.px,
          vertical: AppSizes.px,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.link, size: AppSizes.iconSm, color: AppColors.accent),
            AppSpacing.horizontalGap4,
            Flexible(
              child: Text(
                url,
                style: AppTextStyle.labelSmall(context)?.copyWith(
                  color: AppColors.accent,
                  fontWeight: FontWeight.w500,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
