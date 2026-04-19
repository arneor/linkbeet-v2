import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/modules/auth/data/industries.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_heading.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_shell.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/industry_chip.dart';

class IndustryScreen extends StatefulWidget {
  const IndustryScreen({super.key});

  @override
  State<IndustryScreen> createState() => _IndustryScreenState();
}

class _IndustryScreenState extends State<IndustryScreen> {
  String? _selectedId;

  void _goHome() => context.go(AppRoutePath.home);

  void _handleContinue() {
    if (_selectedId == null) return;
    _goHome();
  }

  @override
  Widget build(BuildContext context) {
    return AuthShell(
      showBack: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 24),
          const AuthHeading(
            title: "What's your industry?",
            subtitle: Text('Select one to tailor your experience'),
          ),
          const SizedBox(height: 36),
          Wrap(
            alignment: WrapAlignment.center,
            spacing: 10,
            runSpacing: 12,
            children: [
              for (final industry in kIndustries)
                IndustryChip(
                  industry: industry,
                  selected: _selectedId == industry.id,
                  onTap: () => setState(() => _selectedId = industry.id),
                ),
            ],
          ),
          const SizedBox(height: 40),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              OutlinedButton(
                onPressed: _goHome,
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.textPrimary,
                  side: const BorderSide(color: AppColors.border),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 22,
                    vertical: 12,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  textStyle: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                child: const Text('Skip'),
              ),
              const SizedBox(width: 12),
              FilledButton(
                onPressed: _selectedId == null ? null : _handleContinue,
                style: FilledButton.styleFrom(
                  backgroundColor: AppColors.accent,
                  disabledBackgroundColor:
                      AppColors.accent.withValues(alpha: 0.4),
                  foregroundColor: AppColors.white,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 26,
                    vertical: 12,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  textStyle: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                child: const Text('Continue'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
