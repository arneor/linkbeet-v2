import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';

class DsHomeLogoHeader extends StatelessWidget {
  const DsHomeLogoHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // svg
        Hero(
          tag: 'text-logo',
          child: SvgPicture.asset(
            AppAssets.linkbeetTextLogo,
            width: 60,
            height: 60,
            colorFilter: const ColorFilter.mode(Colors.black, BlendMode.srcIn),
          ),
        ),
      ],
    );
  }
}
