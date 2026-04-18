import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';
import 'package:linkbeet/src/modules/near_me/data/near_me_mock_data.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_bio_link_button.dart';

const _kAvatarSize = 48.0;
const _kStarSize = 16.0;

class NearMeRecentlyViewedItem extends StatelessWidget {
  const NearMeRecentlyViewedItem({super.key, required this.item});

  final NearMeItem item;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: AppSizes.sm),
          child: ListTile(
            contentPadding: EdgeInsets.zero,
            leading: Container(
              width: _kAvatarSize,
              height: _kAvatarSize,
              decoration: BoxDecoration(
                color: Color(item.avatarColor),
                shape: BoxShape.circle,
              ),
            ),
            title: Text(
              item.name,
              style: AppTextStyle.bodySmall(context)?.copyWith(
                fontWeight: FontWeight.w500,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AppSpacing.verticalGap2,
                Text(
                  '${item.category} • ${item.distanceKm} km',
                  style: AppTextStyle.labelMedium(context)?.copyWith(
                    color: AppColors.textTertiary,
                  ),
                ),
                if (item.bioLink != null) ...[
                  AppSpacing.verticalGap4,
                  NearMeBioLinkButton(url: item.bioLink!),
                ],
              ],
            ),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.star_border,
                  size: _kStarSize,
                  color: AppColors.textSecondary,
                ),
                AppSpacing.horizontalGap4,
                Text(
                  '${item.rating}',
                  style: AppTextStyle.labelMedium(context)?.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
