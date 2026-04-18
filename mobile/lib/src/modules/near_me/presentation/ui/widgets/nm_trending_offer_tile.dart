import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_bio_link_button.dart';

const _kIconSize = 44.0;
const _kBadgePaddingH = 6.0;
const _kBadgePaddingV = 2.0;
const _kBadgeBg = Color(0xFFFFE0E0);
const _kBadgeText = Color(0xFFD32F2F);
const _kIconEmojiFontSize = 20.0;

typedef TrendingOffer = ({
  String icon,
  String label,
  String sub,
  String badge,
  int color,
  String? bioLink,
});

class NearMeTrendingOfferTile extends StatelessWidget {
  const NearMeTrendingOfferTile({super.key, required this.offer});

  final TrendingOffer offer;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.all(AppSizes.sm + AppSizes.xs),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              _OfferIcon(color: offer.color, icon: offer.icon),
              AppSpacing.horizontalGap12,
              Expanded(child: _OfferInfo(offer: offer)),
            ],
          ),
        ),
      ),
    );
  }
}

class _OfferIcon extends StatelessWidget {
  const _OfferIcon({required this.color, required this.icon});

  final int color;
  final String icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: _kIconSize,
      height: _kIconSize,
      decoration: BoxDecoration(
        color: Color(color).withValues(alpha: 0.1),
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Text(icon, style: const TextStyle(fontSize: _kIconEmojiFontSize)),
      ),
    );
  }
}

class _OfferInfo extends StatelessWidget {
  const _OfferInfo({required this.offer});

  final TrendingOffer offer;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          children: [
            Text(
              offer.label,
              style: AppTextStyle.labelMedium(context)?.copyWith(
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
            if (offer.badge.isNotEmpty) ...[
              AppSpacing.horizontalGap8,
              _Badge(label: offer.badge),
            ],
          ],
        ),
        AppSpacing.verticalGap2,
        Text(
          offer.sub,
          style: AppTextStyle.labelMedium(context)?.copyWith(
            color: AppColors.textTertiary,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        if (offer.bioLink != null) ...[
          AppSpacing.verticalGap4,
          NearMeBioLinkButton(url: offer.bioLink!),
        ],
      ],
    );
  }
}

class _Badge extends StatelessWidget {
  const _Badge({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: _kBadgePaddingH,
        vertical: _kBadgePaddingV,
      ),
      decoration: BoxDecoration(
        color: _kBadgeBg,
        borderRadius: AppRadius.micro,
      ),
      child: Text(
        label,
        style: AppTextStyle.labelSmall(context)?.copyWith(
          color: _kBadgeText,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
