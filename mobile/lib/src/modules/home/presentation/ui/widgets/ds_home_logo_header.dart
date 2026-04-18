import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/core/theme/app_text_style.dart';

class DsHomeLogoHeader extends StatelessWidget {
  const DsHomeLogoHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Hero(
          tag: 'linkbeet-splash-logo',
          child: Image.asset(
            AppAssets.blackLogo,
            width: AppSizes.iconXl,
            height: AppSizes.iconXl,
            fit: BoxFit.contain,
          ),
        ),
        AppSpacing.horizontalGap12,
        Text(
          'LinkBeet',
          style: AppTextStyle.headlineLarge(context),
        ),
      ],
    );
  }
}
