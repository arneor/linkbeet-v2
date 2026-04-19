import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';

enum SocialProvider { google, facebook, apple }

class SocialButton extends StatelessWidget {
  const SocialButton({super.key, required this.provider, this.onTap});

  final SocialProvider provider;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final bg = _bg(provider);
    final fg = _fg(provider);
    final border = _border(provider);

    return SizedBox(
      width: double.infinity,
      height: 48,
      child: Material(
        color: bg,
        shape: RoundedRectangleBorder(
          side: BorderSide(color: border),
          borderRadius: BorderRadius.circular(AppSizes.borderRadiusStandard),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(AppSizes.borderRadiusStandard),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                _ProviderIcon(provider: provider),
                Expanded(
                  child: Text(
                    _label(provider),
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: fg,
                      fontSize: 15,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                const SizedBox(width: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  static String _label(SocialProvider p) => switch (p) {
        SocialProvider.google => 'Continue with Google',
        SocialProvider.facebook => 'Continue with Facebook',
        SocialProvider.apple => 'Continue with Apple',
      };

  static Color _bg(SocialProvider p) => switch (p) {
        SocialProvider.google => AppColors.white,
        SocialProvider.facebook => const Color(0xFF1877F2),
        SocialProvider.apple => AppColors.white,
      };

  static Color _fg(SocialProvider p) => switch (p) {
        SocialProvider.google => AppColors.textPrimary,
        SocialProvider.facebook => AppColors.white,
        SocialProvider.apple => AppColors.textPrimary,
      };

  static Color _border(SocialProvider p) => switch (p) {
        SocialProvider.google => AppColors.border,
        SocialProvider.facebook => const Color(0xFF1877F2),
        SocialProvider.apple => AppColors.border,
      };
}

class _ProviderIcon extends StatelessWidget {
  const _ProviderIcon({required this.provider});

  final SocialProvider provider;

  @override
  Widget build(BuildContext context) {
    if (provider == SocialProvider.google) {
      return SvgPicture.asset(
        AppAssets.googleIcon,
        width: 24,
        height: 24,
      );
    }

    final icon = switch (provider) {
      SocialProvider.facebook => Icons.facebook,
      SocialProvider.apple => Icons.apple,
      _ => Icons.error,
    };
    final color = switch (provider) {
      SocialProvider.facebook => AppColors.white,
      SocialProvider.apple => AppColors.textPrimary,
      _ => Colors.transparent,
    };

    return Icon(icon, color: color, size: 24.0);
  }
}
