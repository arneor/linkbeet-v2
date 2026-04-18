import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';
import 'package:linkbeet/src/modules/search/data/search_mock_data.dart';

const _kCardPaddingV = 14.0;
const _kMetaIconSize = 14.0;
const _kTagPaddingH = 8.0;
const _kTagPaddingV = 3.0;
const _kTagSpacing = 6.0;

class SearchResultCard extends StatelessWidget {
  const SearchResultCard({super.key, required this.item});

  final SearchResultItem item;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSizes.md,
        vertical: _kCardPaddingV,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _NameRow(item: item),
          AppSpacing.verticalGap8,
          _MetaRow(item: item),
          AppSpacing.verticalGap8,
          Text(
            item.description,
            style: AppTextStyle.labelMedium(context)?.copyWith(
              color: AppColors.textSecondary,
              height: 1.5,
              letterSpacing: -0.2,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          AppSpacing.verticalGap8,
          _TagRow(tags: item.tags),
        ],
      ),
    );
  }
}

class _NameRow extends StatelessWidget {
  const _NameRow({required this.item});

  final SearchResultItem item;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: AppSizes.touchTarget,
          height: AppSizes.touchTarget,
          decoration: BoxDecoration(
            color: Color(item.avatarColor),
            shape: BoxShape.circle,
          ),
        ),
        AppSpacing.horizontalGap12,
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Flexible(
                    child: Text(
                      item.name,
                      style: AppTextStyle.bodyMedium(context)?.copyWith(
                        fontWeight: FontWeight.w600,
                        letterSpacing: -0.3,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  if (item.isVerified)
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
              Text(
                item.handle,
                style: AppTextStyle.labelSmall(context)?.copyWith(
                  color: AppColors.accent,
                  fontWeight: FontWeight.w400,
                  letterSpacing: -0.2,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _MetaRow extends StatelessWidget {
  const _MetaRow({required this.item});

  final SearchResultItem item;

  @override
  Widget build(BuildContext context) {
    final base = AppTextStyle.labelMedium(context);
    final muted = base?.copyWith(color: AppColors.textTertiary);
    return Row(
      children: [
        const Icon(
          Icons.star_border,
          size: _kMetaIconSize,
          color: AppColors.textPrimary,
        ),
        AppSpacing.horizontalGap4,
        Text('${item.rating}', style: base),
        Text(' (${item.reviewCount})', style: muted),
        Text(' · ', style: muted),
        Text('${item.distanceKm} km', style: muted),
        Text(' · ', style: muted),
        if (item.isOpenNow)
          Text('Open now', style: base?.copyWith(color: AppColors.openNowText))
        else
          Text(
            'Closes at ${item.closingTime}',
            style: base?.copyWith(color: AppColors.error),
          ),
      ],
    );
  }
}

class _TagRow extends StatelessWidget {
  const _TagRow({required this.tags});

  final List<String> tags;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: _kTagSpacing,
      runSpacing: AppSizes.xs,
      children: tags.take(4).map((tag) => _Tag(label: tag)).toList(),
    );
  }
}

class _Tag extends StatelessWidget {
  const _Tag({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: _kTagPaddingH,
        vertical: _kTagPaddingV,
      ),
      decoration: BoxDecoration(
        color: AppColors.secondaryBg,
        borderRadius: AppRadius.micro,
        border: Border.all(color: AppColors.border),
      ),
      child: Text(
        label,
        style: AppTextStyle.labelSmall(context)?.copyWith(
          color: AppColors.textSecondary,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
