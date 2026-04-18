import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';
import 'package:linkbeet/src/modules/near_me/data/near_me_mock_data.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_app_bar.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_category_filter.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_nearby_list_item.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_promo_banner.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_quick_action_tile.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_recently_viewed_item.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_search_bar.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_section_header.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_top_rated_card.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/widgets/nm_trending_offer_tile.dart';

class NearMeScreen extends StatefulWidget {
  const NearMeScreen({super.key});

  @override
  State<NearMeScreen> createState() => _NearMeScreenState();
}

class _NearMeScreenState extends State<NearMeScreen> {
  int _activeCategoryIndex = 0;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: AppColors.pageBg,
      appBar: NearMeAppBar(
        onMenuTap: () => _scaffoldKey.currentState?.openDrawer(),
      ),
      body: Column(
        children: [
          // ── Sticky Header ──────────────────────────────────────────────
          ColoredBox(
            color: AppColors.pageBg,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSizes.md,
                    vertical: AppSizes.sm + AppSizes.px,
                  ),
                  child: const NearMeSearchBar(),
                ),
                NearMeCategoryFilter(
                  categories: kNearMeCategories,
                  activeIndex: _activeCategoryIndex,
                  onTap: (i) => setState(() => _activeCategoryIndex = i),
                ),
                AppSpacing.verticalGap12,
              ],
            ),
          ),

          // ── Scrollable Content ────────────────────────────────────────
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.only(bottom: 80),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppSpacing.verticalGap12,

                  // Promo Banner
                  Padding(
                    padding: AppSpacing.paddingHorizontalMd,
                    child: const NearMePromoBanner(),
                  ),

                  AppSpacing.verticalGap24,

                  // Quick Actions
                  Padding(
                    padding: AppSpacing.paddingHorizontalMd,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: const [
                        NearMeQuickActionTile(
                          icon: Icons.star_border,
                          label: 'Top Rated',
                        ),
                        NearMeQuickActionTile(
                          icon: Icons.local_offer_outlined,
                          label: 'Offers',
                        ),
                        NearMeQuickActionTile(
                          icon: Icons.auto_awesome_outlined,
                          label: 'New',
                        ),
                        NearMeQuickActionTile(
                          icon: Icons.access_time_outlined,
                          label: 'Open Now',
                        ),
                      ],
                    ),
                  ),

                  AppSpacing.verticalGap24,

                  // Top Rated
                  NearMeSectionHeader(
                    title: 'Top Rated Near You',
                    onSeeAll: () {},
                  ),
                  AppSpacing.verticalGap16,
                  SizedBox(
                    height: 220,
                    child: ListView.separated(
                      padding: AppSpacing.paddingHorizontalMd,
                      scrollDirection: Axis.horizontal,
                      itemCount: kTopRatedNearMe.length,
                      separatorBuilder: (context, i) =>
                          AppSpacing.horizontalGap10,
                      itemBuilder: (context, i) =>
                          NearMeTopRatedCard(item: kTopRatedNearMe[i]),
                    ),
                  ),

                  AppSpacing.verticalGap32,

                  // Trending Offers
                  NearMeSectionHeader(
                    title: 'Trending Offers',
                    onSeeAll: () {},
                  ),
                  AppSpacing.verticalGap10,
                  Padding(
                    padding: AppSpacing.paddingHorizontalMd,
                    child: Container(
                      decoration: BoxDecoration(
                        color: AppColors.secondaryBg,
                        borderRadius: AppRadius.large,
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Column(
                        children: List.generate(kTrendingOffers.length, (i) {
                          return Column(
                            children: [
                              NearMeTrendingOfferTile(
                                offer: kTrendingOffers[i],
                              ),
                              if (i != kTrendingOffers.length - 1)
                                const Divider(
                                  height: 1,
                                  color: Color(0xFFF1F5F9),
                                ),
                            ],
                          );
                        }),
                      ),
                    ),
                  ),

                  AppSpacing.verticalGap32,

                  // All Nearby header (custom — sort indicator instead of See All)
                  Padding(
                    padding: AppSpacing.paddingHorizontalMd,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'All Nearby',
                          style: AppTextStyle.bodyMedium(context)?.copyWith(
                            fontWeight: FontWeight.w600,
                            letterSpacing: -0.3,
                          ),
                        ),
                        Row(
                          children: [
                            const Icon(
                              Icons.swap_vert,
                              size: AppSizes.iconSm,
                              color: AppColors.textTertiary,
                            ),
                            AppSpacing.horizontalGap4,
                            Text(
                              'Distance',
                              style: AppTextStyle.labelMedium(context)
                                  ?.copyWith(color: AppColors.textTertiary),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  AppSpacing.verticalGap8,
                  ListView.builder(
                    padding: AppSpacing.paddingHorizontalMd,
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: kAllNearby.length,
                    itemBuilder: (context, i) =>
                        NearMeNearbyListItem(item: kAllNearby[i]),
                  ),

                  AppSpacing.verticalGap32,

                  // Recently Viewed
                  NearMeSectionHeader(
                    title: 'Recently Viewed',
                    onSeeAll: () {},
                  ),
                  AppSpacing.verticalGap10,
                  ListView.builder(
                    padding: AppSpacing.paddingHorizontalMd,
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: kTopRatedNearMe.length,
                    itemBuilder: (context, i) {
                      final item =
                          kTopRatedNearMe[kTopRatedNearMe.length - 1 - i];
                      return NearMeRecentlyViewedItem(item: item);
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
