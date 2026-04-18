import 'dart:async';
import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kBannerHeight = 200.0;
const _kDotWidth = 16.0;
const _kDotHeight = 6.0;
const _kDotInactiveWidth = 6.0;
const _kDotRadius = 3.0;
const _kAutoScrollInterval = Duration(seconds: 5);
const _kPageAnimDuration = Duration(milliseconds: 350);
const _kDecorIconSize = 64.0;

const _kBanners = [
  (
    title: '30% Off First Booking',
    desc: 'Use code NEARBEET at checkout',
    btn: 'Claim Now',
    color: Color(0xFF0071E3),
    icon: Icons.location_on,
  ),
  (
    title: 'Exclusive Weekly Offers',
    desc: 'Unlock premium discounts at top-rated salons and spas',
    btn: 'View Offers',
    color: Color(0xFFFF9800),
    icon: Icons.local_offer,
  ),
  (
    title: 'New Hotspots Added',
    desc: 'Check out the trendiest cafes that just opened this week',
    btn: 'See Hotspots',
    color: Color(0xFF10B981),
    icon: Icons.whatshot,
  ),
];

class NearMePromoBanner extends StatefulWidget {
  const NearMePromoBanner({super.key});

  @override
  State<NearMePromoBanner> createState() => _NearMePromoBannerState();
}

class _NearMePromoBannerState extends State<NearMePromoBanner> {
  late final PageController _pageController;
  int _currentPage = 0;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _timer = Timer.periodic(_kAutoScrollInterval, (_) {
      if (!_pageController.hasClients) return;
      final next = (_currentPage + 1) % _kBanners.length;
      _pageController.animateToPage(
        next,
        duration: _kPageAnimDuration,
        curve: Curves.easeIn,
      );
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: _kBannerHeight,
      child: Stack(
        children: [
          PageView.builder(
            controller: _pageController,
            onPageChanged: (page) => setState(() => _currentPage = page),
            itemCount: _kBanners.length,
            itemBuilder: (context, index) =>
                _BannerSlide(banner: _kBanners[index]),
          ),
          Positioned(
            bottom: AppSizes.sm,
            left: 0,
            right: 0,
            child: _PaginationDots(
              count: _kBanners.length,
              activeIndex: _currentPage,
            ),
          ),
        ],
      ),
    );
  }
}

class _BannerSlide extends StatelessWidget {
  const _BannerSlide({required this.banner});

  final ({
    String title,
    String desc,
    String btn,
    Color color,
    IconData icon,
  }) banner;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSizes.md + AppSizes.xs),
      decoration: BoxDecoration(
        color: banner.color,
        borderRadius: AppRadius.large,
      ),
      child: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                banner.title,
                style: AppTextStyle.bodyMedium(context)?.copyWith(
                  fontWeight: FontWeight.w700,
                  color: AppColors.white,
                  letterSpacing: -0.3,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              AppSpacing.verticalGap4,
              Text(
                banner.desc,
                style: AppTextStyle.labelMedium(context)?.copyWith(
                  color: Colors.white70,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSizes.md - AppSizes.px,
                  vertical: AppSizes.xs + AppSizes.px,
                ),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: AppRadius.pill,
                ),
                child: Text(
                  banner.btn,
                  style: AppTextStyle.labelMedium(context)?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: banner.color,
                  ),
                ),
              ),
            ],
          ),
          Positioned(
            right: 0,
            top: 0,
            bottom: 0,
            child: Icon(
              banner.icon,
              size: _kDecorIconSize,
              color: Colors.white12,
            ),
          ),
        ],
      ),
    );
  }
}

class _PaginationDots extends StatelessWidget {
  const _PaginationDots({required this.count, required this.activeIndex});

  final int count;
  final int activeIndex;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(count, (i) {
        final isActive = i == activeIndex;
        return AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          margin: const EdgeInsets.symmetric(horizontal: AppSizes.px + 1),
          width: isActive ? _kDotWidth : _kDotInactiveWidth,
          height: _kDotHeight,
          decoration: BoxDecoration(
            color: isActive
                ? AppColors.white
                : AppColors.white.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(_kDotRadius),
          ),
        );
      }),
    );
  }
}
