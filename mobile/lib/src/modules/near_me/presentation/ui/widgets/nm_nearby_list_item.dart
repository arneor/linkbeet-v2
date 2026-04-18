import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';
import 'package:linkbeet/src/modules/near_me/data/near_me_mock_data.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_bio_link_button.dart';

const _kAvatarSize = 64.0;
const _kAvatarRadius = 12.0;
const _kTagPaddingH = 8.0;
const _kTagPaddingV = 3.0;
const _kTagRadius = 6.0;
const _kStarSize = 16.0;
const _kVerticalPadding = 14.0;
const _kVerifiedColor = Color(0xFF0071E3);
const _kVerifiedBg = Color(0x1A0071E3);
const _kOfferBg = Color(0xFFFFF7ED);
const _kOfferText = Color(0xFFE65C00);

class NearMeNearbyListItem extends StatelessWidget {
  const NearMeNearbyListItem({super.key, required this.item});

  final NearMeItem item;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: _kVerticalPadding),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              _Avatar(color: item.avatarColor),
              AppSpacing.horizontalGap16,
              Expanded(child: _ItemInfo(item: item)),
              AppSpacing.horizontalGap8,
              _RatingChip(rating: item.rating),
            ],
          ),
        ),
      ),
    );
  }
}

class _Avatar extends StatelessWidget {
  const _Avatar({required this.color});

  final int color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: _kAvatarSize,
      height: _kAvatarSize,
      decoration: BoxDecoration(
        color: Color(color),
        borderRadius: BorderRadius.circular(_kAvatarRadius),
      ),
    );
  }
}

class _ItemInfo extends StatelessWidget {
  const _ItemInfo({required this.item});

  final NearMeItem item;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          item.name,
          style: AppTextStyle.bodySmall(context)?.copyWith(
            fontWeight: FontWeight.w600,
            letterSpacing: -0.2,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        AppSpacing.verticalGap2,
        Text(
          '${item.category} • ${item.distanceKm} km',
          style: AppTextStyle.labelMedium(context)?.copyWith(
            color: AppColors.textTertiary,
            letterSpacing: -0.1,
          ),
        ),
        if (item.tags.isNotEmpty || item.offerLabel != null) ...[
          AppSpacing.verticalGap6,
          _TagRow(tags: item.tags, offerLabel: item.offerLabel),
        ],
        if (item.bioLink != null) ...[
          AppSpacing.verticalGap6,
          NearMeBioLinkButton(url: item.bioLink!),
        ],
      ],
    );
  }
}

class _TagRow extends StatelessWidget {
  const _TagRow({required this.tags, required this.offerLabel});

  final List<String> tags;
  final String? offerLabel;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        ...tags.map((t) => Padding(
              padding: const EdgeInsets.only(right: AppSizes.sm - AppSizes.px),
              child: _Tag(label: t, isVerified: t == 'Verified'),
            )),
        if (offerLabel != null)
          Padding(
            padding: const EdgeInsets.only(right: AppSizes.sm - AppSizes.px),
            child: _OfferTag(label: offerLabel!),
          ),
      ],
    );
  }
}

class _Tag extends StatelessWidget {
  const _Tag({required this.label, required this.isVerified});

  final String label;
  final bool isVerified;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: _kTagPaddingH,
        vertical: _kTagPaddingV,
      ),
      decoration: BoxDecoration(
        color: isVerified ? _kVerifiedBg : AppColors.secondaryBg,
        borderRadius: BorderRadius.circular(_kTagRadius),
      ),
      child: Text(
        label,
        style: AppTextStyle.labelSmall(context)?.copyWith(
          color: isVerified ? _kVerifiedColor : AppColors.textSecondary,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

class _OfferTag extends StatelessWidget {
  const _OfferTag({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: _kTagPaddingH,
        vertical: _kTagPaddingV,
      ),
      decoration: BoxDecoration(
        color: _kOfferBg,
        borderRadius: BorderRadius.circular(_kTagRadius),
      ),
      child: Text(
        label,
        style: AppTextStyle.labelSmall(context)?.copyWith(
          fontWeight: FontWeight.w600,
          color: _kOfferText,
        ),
      ),
    );
  }
}

class _RatingChip extends StatelessWidget {
  const _RatingChip({required this.rating});

  final double rating;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Icon(Icons.star, size: _kStarSize, color: Colors.amber),
        AppSpacing.horizontalGap2,
        Text(
          '$rating',
          style: AppTextStyle.labelMedium(context)?.copyWith(
            fontWeight: FontWeight.w600,
            color: AppColors.textPrimary,
          ),
        ),
      ],
    );
  }
}
