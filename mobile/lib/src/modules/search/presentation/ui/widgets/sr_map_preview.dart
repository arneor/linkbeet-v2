import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_radius.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

const _kMapHeight = 180.0;
const _kMapBg = Color(0xFFE8EEE4);
const _kInactivePinColor = Color(0xFF9E9E9E);
const _kMarkerWidth = 80.0;
const _kMarkerHeight = 60.0;
const _kPinDotSm = 10.0;
const _kPinLabelSize = 9.0; // map pin label — smaller than any textTheme slot
const _kExpandIconSize = 14.0;
const _kExpandGap = 6.0;

const _kKochi = LatLng(9.9312, 76.2673);

class SearchResultMapPreview extends StatelessWidget {
  const SearchResultMapPreview({super.key, required this.onExpandTap});

  final VoidCallback onExpandTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: _kMapHeight,
      child: ColoredBox(
        color: _kMapBg,
        child: Stack(
          children: [
            FlutterMap(
              options: const MapOptions(
                initialCenter: _kKochi,
                initialZoom: 14.0,
              ),
              children: [
                TileLayer(
                  urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                  userAgentPackageName: 'com.example.linkbeet',
                ),
                const MarkerLayer(
                  markers: [
                    Marker(
                      point: _kKochi,
                      width: _kMarkerWidth,
                      height: _kMarkerHeight,
                      child: _MapPin(
                        color: AppColors.accent,
                        label: 'You',
                        isYou: true,
                      ),
                    ),
                    Marker(
                      point: LatLng(9.9380, 76.2600),
                      width: _kMarkerWidth,
                      height: _kMarkerHeight,
                      child: _MapPin(color: AppColors.accent, label: 'Luxe'),
                    ),
                    Marker(
                      point: LatLng(9.9250, 76.2750),
                      width: _kMarkerWidth,
                      height: _kMarkerHeight,
                      child: _MapPin(color: AppColors.accent, label: 'Style'),
                    ),
                    Marker(
                      point: LatLng(9.9350, 76.2800),
                      width: _kMarkerWidth,
                      height: _kMarkerHeight,
                      child: _MapPin(color: _kInactivePinColor),
                    ),
                  ],
                ),
              ],
            ),
            Positioned(
              bottom: AppSizes.sm + AppSizes.xs,
              right: AppSizes.sm + AppSizes.xs,
              child: _ExpandButton(onTap: onExpandTap),
            ),
          ],
        ),
      ),
    );
  }
}

class _ExpandButton extends StatelessWidget {
  const _ExpandButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSizes.sm + AppSizes.xs,
          vertical: AppSizes.xs + AppSizes.px,
        ),
        decoration: BoxDecoration(
          color: AppColors.pageBg,
          borderRadius: AppRadius.standard,
          boxShadow: AppColors.cardShadow,
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.open_in_full,
              size: _kExpandIconSize,
              color: AppColors.textPrimary,
            ),
            const SizedBox(width: _kExpandGap),
            Text(
              'Expand',
              style: AppTextStyle.labelSmall(context)?.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MapPin extends StatelessWidget {
  const _MapPin({required this.color, this.label, this.isYou = false});

  final Color color;
  final String? label;
  final bool isYou;

  @override
  Widget build(BuildContext context) {
    final dotSize = isYou ? _kPinDotSm : AppSizes.iconMd;
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null)
          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSizes.xs + AppSizes.px,
              vertical: AppSizes.px,
            ),
            decoration: BoxDecoration(
              color: AppColors.white,
              borderRadius: AppRadius.micro,
              boxShadow: AppColors.cardShadow,
            ),
            child: Text(
              label!,
              style: AppTextStyle.labelSmall(context)?.copyWith(
                fontSize: _kPinLabelSize,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
          ),
        const SizedBox(height: AppSizes.px),
        Container(
          width: dotSize,
          height: dotSize,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
            border: Border.all(color: AppColors.white, width: AppSizes.px),
          ),
          child: isYou
              ? null
              : const Icon(
                  Icons.location_on,
                  color: AppColors.white,
                  size: AppSizes.iconXs,
                ),
        ),
      ],
    );
  }
}
