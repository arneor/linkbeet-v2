import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';
import 'package:linkbeet/src/modules/search/data/search_mock_data.dart';

const _kTopPickBadgeBg = Color(0xFFFFF7ED);
const _kTopPickBadgeBorder = Color(0xFFFFEDD5);
const _kTopPickBadgeText = Color(0xFFE65100);
const _kTopPickGradientStart = Color(0xFFFB923C);
const _kTopPickGradientEnd = Color(0xFFF97316);
const _kTopPickCtaBg = Color(0xFF1D1D1F);
const _kTopPickStarColor = Color(0xFF1E293B);
const _kBottomPadding = 80.0;
const _kMetaIconSize = 14.0;
const _kBannerHeight = 120.0;

class SearchResultSuggestionsSection extends StatelessWidget {
  const SearchResultSuggestionsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.secondaryBg,
      padding: const EdgeInsets.only(
        left: AppSizes.md,
        right: AppSizes.md,
        top: AppSizes.xl,
        bottom: _kBottomPadding,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _PeopleAlsoSearch(terms: kPeopleAlsoSearch),
          AppSpacing.verticalGap24,
          const _TopPickSection(),
        ],
      ),
    );
  }
}

class _PeopleAlsoSearch extends StatelessWidget {
  const _PeopleAlsoSearch({required this.terms});

  final List<String> terms;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'People also search',
          style: AppTextStyle.bodyMedium(
            context,
          )?.copyWith(fontWeight: FontWeight.w600, letterSpacing: -0.3),
        ),
        AppSpacing.verticalGap12,
        ...terms.map(
          (term) => Padding(
            padding: const EdgeInsets.only(bottom: AppSizes.sm),
            child: _AlsoSearchItem(term: term),
          ),
        ),
      ],
    );
  }
}

class _AlsoSearchItem extends StatelessWidget {
  const _AlsoSearchItem({required this.term});

  final String term;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSizes.md,
        vertical: AppSizes.sm + AppSizes.xs,
      ),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: AppRadius.standard,
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          const Icon(
            Icons.search,
            size: AppSizes.iconSm + AppSizes.px,
            color: AppColors.textTertiary,
          ),
          AppSpacing.horizontalGap12,
          Expanded(
            child: Text(
              term,
              style: AppTextStyle.bodySmall(
                context,
              )?.copyWith(color: AppColors.textSecondary),
            ),
          ),
          const Icon(
            Icons.arrow_outward,
            size: AppSizes.iconSm,
            color: AppColors.textTertiary,
          ),
        ],
      ),
    );
  }
}

class _TopPickSection extends StatelessWidget {
  const _TopPickSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              'Top Pick',
              style: AppTextStyle.bodyMedium(
                context,
              )?.copyWith(fontWeight: FontWeight.w600, letterSpacing: -0.3),
            ),
            Container(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSizes.sm,
                vertical: AppSizes.px,
              ),
              decoration: BoxDecoration(
                color: _kTopPickBadgeBg,
                border: Border.all(color: _kTopPickBadgeBorder),
                borderRadius: AppRadius.micro,
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(
                    Icons.star,
                    size: AppSizes.iconXs,
                    color: _kTopPickBadgeText,
                  ),
                  const SizedBox(width: AppSizes.xs),
                  Text(
                    'Highest Rated',
                    style: AppTextStyle.labelSmall(context)?.copyWith(
                      fontWeight: FontWeight.w500,
                      color: _kTopPickBadgeText,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        AppSpacing.verticalGap12,
        const _TopPickCard(),
      ],
    );
  }
}

class _TopPickCard extends StatelessWidget {
  const _TopPickCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: AppRadius.large,
        border: Border.all(color: AppColors.border),
        boxShadow: AppColors.cardShadow,
      ),
      child: ClipRRect(
        borderRadius: AppRadius.large,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              height: _kBannerHeight,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [_kTopPickGradientStart, _kTopPickGradientEnd],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                ),
              ),
            ),
            Padding(
              padding: AppSpacing.paddingAllMd,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        'Luxe Hair Studio',
                        style: AppTextStyle.bodyMedium(
                          context,
                        )?.copyWith(fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(width: AppSizes.xs),
                      const Icon(
                        Icons.verified,
                        color: AppColors.accent,
                        size: AppSizes.iconSm,
                      ),
                    ],
                  ),
                  AppSpacing.verticalGap4,
                  Row(
                    children: [
                      const Icon(
                        Icons.star,
                        size: _kMetaIconSize,
                        color: _kTopPickStarColor,
                      ),
                      const SizedBox(width: AppSizes.xs),
                      Text('4.9', style: AppTextStyle.labelMedium(context)),
                      Text(
                        ' · 312 reviews · 0.5 km',
                        style: AppTextStyle.labelMedium(
                          context,
                        )?.copyWith(color: AppColors.textTertiary),
                      ),
                    ],
                  ),
                  AppSpacing.verticalGap16,
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(
                      vertical: AppSizes.sm + AppSizes.px,
                    ),
                    decoration: BoxDecoration(
                      color: _kTopPickCtaBg,
                      borderRadius: AppRadius.pill,
                    ),
                    alignment: Alignment.center,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(
                          Icons.open_in_new,
                          color: AppColors.white,
                          size: _kMetaIconSize,
                        ),
                        const SizedBox(width: AppSizes.xs + AppSizes.px),
                        Text(
                          'Visit Bio',
                          style: AppTextStyle.labelMedium(
                            context,
                          )?.copyWith(color: AppColors.white),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
