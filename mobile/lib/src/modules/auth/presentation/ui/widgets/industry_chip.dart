import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/modules/auth/data/industries.dart';

class IndustryChip extends StatelessWidget {
  const IndustryChip({
    super.key,
    required this.industry,
    required this.selected,
    required this.onTap,
  });

  final Industry industry;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      selected: selected,
      label: industry.label,
      child: Material(
        color: selected ? AppColors.accentTintBg : AppColors.white,
        shape: RoundedRectangleBorder(
          side: BorderSide(
            color: selected ? AppColors.accent : AppColors.border,
            width: selected ? 1.5 : 1,
          ),
          borderRadius: BorderRadius.circular(24),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(24),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(industry.emoji, style: const TextStyle(fontSize: 16)),
                const SizedBox(width: 6),
                Text(
                  industry.label,
                  style: TextStyle(
                    color: selected ? AppColors.accent : AppColors.textPrimary,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    letterSpacing: -0.2,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
