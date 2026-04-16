import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class LbAvatar extends StatelessWidget {
  final String? imageUrl;
  final String? initials;
  final double size;

  const LbAvatar({
    super.key,
    this.imageUrl,
    this.initials,
    this.size = 32,
  });

  @override
  Widget build(BuildContext context) {
    if (imageUrl != null && imageUrl!.isNotEmpty) {
      return ClipOval(
        child: CachedNetworkImage(
          imageUrl: imageUrl!,
          width: size,
          height: size,
          fit: BoxFit.cover,
          placeholder: (context, url) => _placeholder(),
          errorWidget: (context, url, error) => _placeholder(),
        ),
      );
    }
    return _placeholder();
  }

  Widget _placeholder() {
    return Container(
      width: size,
      height: size,
      decoration: const BoxDecoration(
        color: AppColors.accent,
        shape: BoxShape.circle,
      ),
      alignment: Alignment.center,
      child: Text(
        (initials ?? '?').substring(0, 1).toUpperCase(),
        style: AppTypography.badge.copyWith(
          color: AppColors.textInverse,
          fontSize: size * 0.4,
        ),
      ),
    );
  }
}
