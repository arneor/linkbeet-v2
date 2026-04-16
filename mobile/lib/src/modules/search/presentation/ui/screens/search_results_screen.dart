import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/discovery_search_input.dart';
import 'package:linkbeet/src/modules/search/presentation/router/search_router_module.dart';

// ── Mock data — 5 profiles (no backend) ──────────────────────────────────────
class _Profile {
  const _Profile({
    required this.name,
    required this.industry,
    required this.distance,
    required this.rating,
  });

  final String name;
  final String industry;
  final String distance;
  final String rating;
}

const _kMockProfiles = [
  _Profile(
    name: 'The Brew House',
    industry: 'Cafe',
    distance: '0.3 km',
    rating: '4.8',
  ),
  _Profile(
    name: 'Glow Salon & Spa',
    industry: 'Salon',
    distance: '0.7 km',
    rating: '4.6',
  ),
  _Profile(
    name: 'Pixel Creators',
    industry: 'Creator',
    distance: '1.2 km',
    rating: '4.9',
  ),
  _Profile(
    name: 'FitLife Studio',
    industry: 'Fitness',
    distance: '1.5 km',
    rating: '4.7',
  ),
  _Profile(
    name: 'Street Bites',
    industry: 'Restaurant',
    distance: '2.1 km',
    rating: '4.5',
  ),
];

// ── SearchResultsScreen ───────────────────────────────────────────────────────

class SearchResultsScreen extends StatelessWidget {
  const SearchResultsScreen({super.key, required this.query});

  final String query;

  List<_Profile> get _filteredResults => _kMockProfiles
      .where(
        (p) =>
            query.isEmpty ||
            p.name.toLowerCase().contains(query.toLowerCase()) ||
            p.industry.toLowerCase().contains(query.toLowerCase()),
      )
      .toList();

  @override
  Widget build(BuildContext context) {
    final results = _filteredResults;
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(color: AppColors.textPrimary),
        titleSpacing: 0,
        title: Padding(
          padding: const EdgeInsets.only(right: 16),
          child: DiscoverySearchInput(
            compact: true,
            initialQuery: query,
            onSubmitted: (newQuery) {
              SearchResultsRoute(query: newQuery).go(context);
            },
          ),
        ),
      ),
      body: SafeArea(
        child: results.isEmpty
            ? const Center(
                child: Text(
                  'No results found',
                  style: TextStyle(color: AppColors.textPlaceholder),
                ),
              )
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Results count (S-02)
                  Padding(
                    padding: const EdgeInsets.only(
                      left: 16,
                      right: 16,
                      top: 12,
                      bottom: 8,
                    ),
                    child: Text(
                      '${results.length} results',
                      style: const TextStyle(
                        fontSize: AppFontSizes.filterChip,
                        color: AppColors.textTertiary,
                      ),
                    ),
                  ),
                  // Profile cards list
                  Expanded(
                    child: ListView.builder(
                      itemCount: results.length,
                      itemBuilder: (context, i) =>
                          _ProfileCard(profile: results[i]),
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}

// ── Profile Card ──────────────────────────────────────────────────────────────

class _ProfileCard extends StatelessWidget {
  const _ProfileCard({required this.profile});

  final _Profile profile;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: AppSpacing.paddingAllMd,
      decoration: BoxDecoration(
        color: AppColors.secondaryBg,
        borderRadius: AppRadius.large,
        boxShadow: AppColors.cardShadow,
      ),
      child: Row(
        children: [
          // Avatar — 48px, rounded-full, accent blue placeholder
          CircleAvatar(
            radius: 24,
            backgroundColor: AppColors.accent,
            child: Text(
              profile.name[0],
              style: const TextStyle(
                color: AppColors.white,
                fontWeight: FontWeight.w600,
                fontSize: AppFontSizes.body,
              ),
            ),
          ),
          AppSpacing.horizontalGap12,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  profile.name,
                  style: const TextStyle(
                    fontSize: AppFontSizes.body,
                    fontWeight: FontWeight.w500,
                    color: AppColors.textPrimary,
                  ),
                ),
                AppSpacing.verticalGap4,
                Row(
                  children: [
                    // Industry badge
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.accentTintBg,
                        borderRadius: AppRadius.pill,
                      ),
                      child: Text(
                        profile.industry,
                        style: const TextStyle(
                          fontSize: AppFontSizes.badge,
                          color: AppColors.accent,
                        ),
                      ),
                    ),
                    AppSpacing.horizontalGap8,
                    // Rating
                    const Icon(
                      Icons.star_rounded,
                      size: 12,
                      color: AppColors.textTertiary,
                    ),
                    const SizedBox(width: 2),
                    Text(
                      profile.rating,
                      style: const TextStyle(
                        fontSize: AppFontSizes.filterChip,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
                AppSpacing.verticalGap4,
                // Distance — Apple Blue per N-02 spec
                Text(
                  profile.distance,
                  style: const TextStyle(
                    fontSize: AppFontSizes.filterChip,
                    fontWeight: FontWeight.w500,
                    color: AppColors.accent,
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
