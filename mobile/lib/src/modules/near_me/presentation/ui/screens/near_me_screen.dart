import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';

// Mock profiles reused from search for near me list
const _kNearMeProfiles = [
  _NearMeProfile(
    name: 'The Brew House',
    industry: 'Cafe',
    distance: '0.3 km',
    rating: '4.8',
  ),
  _NearMeProfile(
    name: 'Glow Salon & Spa',
    industry: 'Salon',
    distance: '0.7 km',
    rating: '4.6',
  ),
  _NearMeProfile(
    name: 'Street Bites',
    industry: 'Restaurant',
    distance: '0.9 km',
    rating: '4.5',
  ),
  _NearMeProfile(
    name: 'FitLife Studio',
    industry: 'Fitness',
    distance: '1.5 km',
    rating: '4.7',
  ),
];

class _NearMeProfile {
  const _NearMeProfile({
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

// ── NearMeScreen ─────────────────────────────────────────────────────────────

class NearMeScreen extends StatefulWidget {
  const NearMeScreen({super.key});

  @override
  State<NearMeScreen> createState() => _NearMeScreenState();
}

class _NearMeScreenState extends State<NearMeScreen> {
  bool _locationGranted = false;
  String _selectedRadius = '1km';

  static const _kRadiusOptions = ['500m', '1km', '5km', '10km'];

  void _showRadiusSelector(BuildContext context) {
    showModalBottomSheet<void>(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      backgroundColor: AppColors.pageBg,
      builder: (ctx) => Padding(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Drag handle
            Center(
              child: Container(
                margin: const EdgeInsets.symmetric(vertical: 12),
                width: 36,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.border,
                  borderRadius: AppRadius.pill,
                ),
              ),
            ),
            const Text(
              'Search radius',
              style: TextStyle(
                fontSize: AppFontSizes.body,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
            AppSpacing.verticalGap16,
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _kRadiusOptions
                  .map(
                    (r) => GestureDetector(
                      onTap: () {
                        setState(() => _selectedRadius = r);
                        Navigator.pop(ctx);
                      },
                      child: Container(
                        padding: AppSpacing.filterChipPadding,
                        decoration: BoxDecoration(
                          color: _selectedRadius == r
                              ? AppColors.accentTintBg
                              : AppColors.pageBg,
                          borderRadius: AppRadius.pill,
                          border: Border.all(
                            color: _selectedRadius == r
                                ? AppColors.accent
                                : AppColors.border,
                          ),
                        ),
                        child: Text(
                          r,
                          style: TextStyle(
                            fontSize: AppFontSizes.filterChip,
                            fontWeight: FontWeight.w500,
                            color: _selectedRadius == r
                                ? AppColors.accent
                                : AppColors.textSecondary,
                          ),
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const BackButton(),
        title: const Text('Near Me'),
      ),
      body: SafeArea(
        child: _locationGranted ? _buildGrantedState() : _buildPromptState(),
      ),
    );
  }

  // ── State 1: Location prompt (N-01) ────────────────────────────────────────
  Widget _buildPromptState() {
    return Center(
      child: Padding(
        padding: AppSpacing.paddingHorizontalLg,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.location_on_rounded,
              size: 48,
              color: AppColors.accent,
            ),
            AppSpacing.verticalGap16,
            const Text(
              'Enable location',
              style: TextStyle(
                fontSize: AppFontSizes.tileHeading,
                fontWeight: FontWeight.w500,
                color: AppColors.textPrimary,
                letterSpacing: -0.5,
              ),
              textAlign: TextAlign.center,
            ),
            AppSpacing.verticalGap8,
            const Text(
              'Allow location access to discover businesses, creators, and services near you.',
              style: TextStyle(
                fontSize: AppFontSizes.body,
                color: AppColors.textTertiary,
              ),
              textAlign: TextAlign.center,
            ),
            AppSpacing.verticalGap24,
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => setState(() => _locationGranted = true),
                child: const Text('Enable Location'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ── State 2: Location granted (N-02) ───────────────────────────────────────
  Widget _buildGrantedState() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Radius selector (M-04: tapping opens bottom sheet)
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: _kRadiusOptions.map((label) {
                final isSelected = _selectedRadius == label;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: GestureDetector(
                    onTap: () => _showRadiusSelector(context),
                    child: Container(
                      padding: AppSpacing.filterChipPadding,
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppColors.accentTintBg
                            : AppColors.pageBg,
                        borderRadius: AppRadius.pill,
                        border: Border.all(
                          color: isSelected
                              ? AppColors.accent
                              : AppColors.border,
                        ),
                      ),
                      child: Text(
                        label,
                        style: TextStyle(
                          fontSize: AppFontSizes.filterChip,
                          fontWeight: FontWeight.w500,
                          color: isSelected
                              ? AppColors.accent
                              : AppColors.textSecondary,
                        ),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
        ),
        // Profile list
        Expanded(
          child: ListView.builder(
            itemCount: _kNearMeProfiles.length,
            itemBuilder: (context, i) =>
                _NearMeCard(profile: _kNearMeProfiles[i]),
          ),
        ),
      ],
    );
  }
}

// ── Near Me Profile Card ──────────────────────────────────────────────────────

class _NearMeCard extends StatelessWidget {
  const _NearMeCard({required this.profile});

  final _NearMeProfile profile;

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
