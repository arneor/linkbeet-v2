import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/modules/auth/presentation/router/auth_router_module.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_heading.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_shell.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_text_field.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/social_button.dart';

final _emailRegex = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final _emailCtrl = TextEditingController();
  String? _emailError;

  @override
  void dispose() {
    _emailCtrl.dispose();
    super.dispose();
  }

  void _handleContinue() {
    final value = _emailCtrl.text.trim();
    if (value.isEmpty) {
      setState(() => _emailError = 'Enter your email to continue');
      return;
    }
    if (!_emailRegex.hasMatch(value)) {
      setState(() => _emailError = 'Enter a valid email address');
      return;
    }
    setState(() => _emailError = null);
    const IndustryRoute().push(context);
  }

  void _handleSkip() {
    context.go(AppRoutePath.home);
  }

  @override
  Widget build(BuildContext context) {
    return AuthShell(
      onSkip: _handleSkip,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 24),
          const AuthHeading(title: 'Log in'),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Don't have an account? ",
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 15,
                ),
              ),
              GestureDetector(
                onTap: () => const SignUpRoute().push(context),
                child: const Text(
                  'Sign Up',
                  style: TextStyle(
                    color: AppColors.accent,
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 40),
          AuthTextField(
            label: 'Email',
            controller: _emailCtrl,
            keyboardType: TextInputType.emailAddress,
            autofillHints: const [AutofillHints.email],
            textInputAction: TextInputAction.done,
            errorText: _emailError,
            onSubmitted: (_) => _handleContinue(),
            onChanged: (_) {
              if (_emailError != null) setState(() => _emailError = null);
            },
          ),
          const SizedBox(height: 12),
          Align(
            alignment: Alignment.centerLeft,
            child: TextButton(
              onPressed: () {},
              style: TextButton.styleFrom(
                padding: EdgeInsets.zero,
                minimumSize: const Size(0, 32),
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              ),
              child: const Text(
                'Forgot Email?',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 13,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),
          Align(
            alignment: Alignment.centerLeft,
            child: OutlinedButton(
              onPressed: _handleContinue,
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.accent,
                side: const BorderSide(color: AppColors.accent),
                shape: const StadiumBorder(),
                padding: const EdgeInsets.symmetric(
                  horizontal: 22,
                  vertical: 12,
                ),
                textStyle: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                ),
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Continue with Email'),
                  SizedBox(width: 6),
                  Icon(Icons.chevron_right_rounded, size: 18),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          const _OrDivider(),
          const SizedBox(height: 20),
          const SocialButton(provider: SocialProvider.google),
          const SizedBox(height: 12),
          const SocialButton(provider: SocialProvider.facebook),
          const SizedBox(height: 12),
          const SocialButton(provider: SocialProvider.apple),
          const SizedBox(height: 24),
          const _LegalFooter(),
        ],
      ),
    );
  }
}

class _OrDivider extends StatelessWidget {
  const _OrDivider();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Expanded(child: Divider(color: AppColors.border, height: 1)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Text(
            'or',
            style: const TextStyle(color: AppColors.textTertiary, fontSize: 13),
          ),
        ),
        const Expanded(child: Divider(color: AppColors.border, height: 1)),
      ],
    );
  }
}

class _LegalFooter extends StatelessWidget {
  const _LegalFooter();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Wrap(
        spacing: 16,
        alignment: WrapAlignment.center,
        children: [
          _FooterLink(label: 'Terms of Use', onTap: () {}),
          _FooterLink(label: 'Privacy Policy', onTap: () {}),
        ],
      ),
    );
  }
}

class _FooterLink extends StatelessWidget {
  const _FooterLink({required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Text(
        label,
        style: const TextStyle(
          color: AppColors.textTertiary,
          fontSize: 12,
          decoration: TextDecoration.underline,
        ),
      ),
    );
  }
}
