import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';
import 'package:linkbeet/src/modules/near_me/data/near_me_mock_data.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_bio_link_button.dart';

const _kCardWidth = 220.0;
const _kRatingBadgePaddingH = 6.0;
const _kRatingBadgePaddingV = 3.0;
const _kStarSize = 10.0;

class NearMeTopRatedCard extends StatelessWidget {
  const NearMeTopRatedCard({super.key, required this.item});

  final NearMeItem item;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: _kCardWidth,
      decoration: BoxDecoration(
        color: AppColors.pageBg,
        borderRadius: AppRadius.large,
        border: Border.all(color: AppColors.border),
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: AppRadius.large,
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: () {},
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: _CardImageArea(item: item)),
              _CardInfo(item: item),
            ],
          ),
        ),
      ),
    );
  }
}

class _CardImageArea extends StatelessWidget {
  const _CardImageArea({required this.item});

  final NearMeItem item;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          decoration: BoxDecoration(
            color: Color(item.avatarColor),
            borderRadius: const BorderRadius.vertical(
              top: Radius.circular(AppSizes.borderRadiusLarge),
            ),
          ),
        ),
        Positioned(
          top: AppSizes.sm,
          left: AppSizes.sm,
          child: _RatingBadge(rating: item.rating),
        ),
      ],
    );
  }
}

class _RatingBadge extends StatelessWidget {
  const _RatingBadge({required this.rating});

  final double rating;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: _kRatingBadgePaddingH,
        vertical: _kRatingBadgePaddingV,
      ),
      decoration: BoxDecoration(
        color: AppColors.white.withValues(alpha: 0.9),
        borderRadius: AppRadius.micro,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.star, size: _kStarSize, color: Colors.amber),
          AppSpacing.horizontalGap2,
          Text(
            '$rating',
            style: AppTextStyle.labelSmall(context)?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}

class _CardInfo extends StatelessWidget {
  const _CardInfo({required this.item});

  final NearMeItem item;

  @override
  Widget build(BuildContext context) {
    final isVerified = item.tags.contains('Verified');
    final secondaryTags = item.tags.where((t) => t != 'Verified').toList();

    return Padding(
      padding: const EdgeInsets.all(AppSizes.sm + AppSizes.px),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Flexible(
                child: Text(
                  item.name,
                  style: AppTextStyle.labelMedium(context)?.copyWith(
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.2,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (isVerified)
                const Padding(
                  padding: EdgeInsets.only(left: AppSizes.xs),
                  child: Icon(
                    Icons.verified,
                    color: AppColors.accent,
                    size: AppSizes.iconSm,
                  ),
                ),
            ],
          ),
          AppSpacing.verticalGap2,
          Text(
            '${item.category} • ${item.distanceKm} km',
            style: AppTextStyle.labelSmall(context)?.copyWith(
              color: AppColors.textTertiary,
            ),
          ),
          if (secondaryTags.isNotEmpty) ...[
            AppSpacing.verticalGap4,
            Wrap(
              spacing: AppSizes.xs,
              children: secondaryTags.map((t) => _SmallTag(t)).toList(),
            ),
          ],
          if (item.bioLink != null) ...[
            AppSpacing.verticalGap6,
            NearMeBioLinkButton(url: item.bioLink!),
          ],
        ],
      ),
    );
  }
}

class _SmallTag extends StatelessWidget {
  const _SmallTag(this.label);

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSizes.sm - AppSizes.px,
        vertical: AppSizes.px,
      ),
      decoration: BoxDecoration(
        color: AppColors.pageBg,
        borderRadius: AppRadius.micro,
        border: Border.all(color: AppColors.border),
      ),
      child: Text(
        label,
        style: AppTextStyle.labelSmall(context)?.copyWith(
          color: AppColors.textSecondary,
        ),
      ),
    );
  }
}
