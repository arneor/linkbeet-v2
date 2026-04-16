import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_durations.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/discovery_search_input.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/filter_chip_row.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/suggestion_pill_row.dart';
import 'package:linkbeet/src/modules/search/presentation/router/search_router_module.dart';

// Static mock data — mirrors web/src/app/page.tsx TRENDING array
const _kTrending = [
  'Top-rated coffee shops near me',
  'Affordable salons open now',
  'Street food vendors around me',
  'Event photographers in the city',
  'Fitness trainers accepting clients',
  'Digital creators for brand promos',
  'Budget-friendly co-working spaces',
];

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with TickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _logoAnim;
  late final Animation<double> _chipsAnim;
  late final Animation<double> _suggestionsAnim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppDurations.pageEntry,
    );
    _logoAnim = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
    );
    _chipsAnim = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.1, 0.7, curve: Curves.easeOut),
    );
    _suggestionsAnim = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.2, 0.8, curve: Curves.easeOut),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Widget _fadeSlide({
    required Animation<double> animation,
    required Widget child,
  }) {
    return FadeTransition(
      opacity: animation,
      child: SlideTransition(
        position: Tween<Offset>(
          begin: const Offset(0, 0.15),
          end: Offset.zero,
        ).animate(animation),
        child: child,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            // ── Scrollable main content ─────────────────────────────────
            SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(16, 32, 16, 120),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Logo + wordmark (centered)
                  _fadeSlide(
                    animation: _logoAnim,
                    child: Center(
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Image.asset(
                            AppAssets.logo,
                            width: 40,
                            height: 40,
                            fit: BoxFit.contain,
                          ),
                          AppSpacing.horizontalGap12,
                          const Text(
                            'LinkBeet',
                            style: TextStyle(
                              fontSize: 36,
                              fontWeight: FontWeight.w500,
                              color: AppColors.textPrimary,
                              letterSpacing: -0.5,
                              height: 1.0,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  AppSpacing.verticalGap32,
                  // Trending searches section
                  _fadeSlide(
                    animation: _logoAnim,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Trending searches',
                          style: TextStyle(
                            fontSize: AppFontSizes.filterChip,
                            fontWeight: FontWeight.w600,
                            color: AppColors.textTertiary,
                            letterSpacing: 0.5,
                          ),
                        ),
                        AppSpacing.verticalGap8,
                        Column(
                          children: _kTrending.asMap().entries.map((entry) {
                            final index = entry.key;
                            final label = entry.value;
                            return Column(
                              children: [
                                GestureDetector(
                                  onTap: () {
                                    SearchResultsRoute(query: label).go(context);
                                  },
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                      vertical: 14,
                                    ),
                                    child: Row(
                                      children: [
                                        Container(
                                          width: 32,
                                          height: 32,
                                          decoration: BoxDecoration(
                                            color: AppColors.secondaryBg,
                                            borderRadius: AppRadius.pill,
                                          ),
                                          child: const Icon(
                                            Icons.trending_up_rounded,
                                            size: AppSizes.iconSm,
                                            color: AppColors.accent,
                                          ),
                                        ),
                                        AppSpacing.horizontalGap12,
                                        Expanded(
                                          child: Text(
                                            label,
                                            style: const TextStyle(
                                              fontSize: AppFontSizes.bodySmall,
                                              color: AppColors.textSecondary,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                if (index < _kTrending.length - 1)
                                  Divider(
                                    height: 1,
                                    color: AppColors.border,
                                    indent: 44,
                                  ),
                              ],
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ),
                  AppSpacing.verticalGap24,
                  // Filter chips row (breaks out of column padding via full-bleed)
                  _fadeSlide(
                    animation: _chipsAnim,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: -16),
                      child: const FilterChipRow(),
                    ),
                  ),
                  AppSpacing.verticalGap12,
                  // Suggestion pills row
                  _fadeSlide(
                    animation: _suggestionsAnim,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: -16),
                      child: const SuggestionPillRow(),
                    ),
                  ),
                ],
              ),
            ),
            // ── Floating bottom search input (M-01) ─────────────────────
            Positioned(
              bottom: 16,
              left: 16,
              right: 16,
              child: DiscoverySearchInput(
                onSubmitted: (query) {
                  if (query.isNotEmpty) {
                    SearchResultsRoute(query: query).go(context);
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
