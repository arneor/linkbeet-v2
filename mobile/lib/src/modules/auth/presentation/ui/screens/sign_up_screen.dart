import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/modules/auth/presentation/router/auth_router_module.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_heading.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_shell.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/auth_text_field.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/widgets/social_button.dart';

final _emailRegex = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final _email = TextEditingController();
  final _confirmEmail = TextEditingController();
  final _password = TextEditingController();
  final _confirmPassword = TextEditingController();

  String? _emailErr;
  String? _confirmEmailErr;
  String? _passwordErr;
  String? _confirmPasswordErr;

  @override
  void dispose() {
    _email.dispose();
    _confirmEmail.dispose();
    _password.dispose();
    _confirmPassword.dispose();
    super.dispose();
  }

  bool _validate() {
    final emailErr = _email.text.trim().isEmpty
        ? 'Email is required'
        : !_emailRegex.hasMatch(_email.text.trim())
            ? 'Enter a valid email address'
            : null;

    final confirmEmailErr = _confirmEmail.text.trim().isEmpty
        ? 'Please confirm your email'
        : _confirmEmail.text.trim() != _email.text.trim()
            ? 'Emails do not match'
            : null;

    final passwordErr = _password.text.isEmpty
        ? 'Password is required'
        : _password.text.length < 8
            ? 'Password must be at least 8 characters'
            : null;

    final confirmPasswordErr = _confirmPassword.text.isEmpty
        ? 'Please confirm your password'
        : _confirmPassword.text != _password.text
            ? 'Passwords do not match'
            : null;

    setState(() {
      _emailErr = emailErr;
      _confirmEmailErr = confirmEmailErr;
      _passwordErr = passwordErr;
      _confirmPasswordErr = confirmPasswordErr;
    });

    return emailErr == null &&
        confirmEmailErr == null &&
        passwordErr == null &&
        confirmPasswordErr == null;
  }

  void _handleSubmit() {
    if (_validate()) {
      const IndustryRoute().push(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuthShell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 16),
          const AuthHeading(
            title: 'Sign up',
            subtitle: _SignUpSubtitle(),
          ),
          const SizedBox(height: 32),
          AuthTextField(
            label: 'Email',
            controller: _email,
            keyboardType: TextInputType.emailAddress,
            autofillHints: const [AutofillHints.email],
            errorText: _emailErr,
            onChanged: (_) {
              if (_emailErr != null) setState(() => _emailErr = null);
            },
          ),
          const SizedBox(height: 20),
          AuthTextField(
            label: 'Confirm email',
            controller: _confirmEmail,
            keyboardType: TextInputType.emailAddress,
            autofillHints: const [AutofillHints.email],
            errorText: _confirmEmailErr,
            onChanged: (_) {
              if (_confirmEmailErr != null) {
                setState(() => _confirmEmailErr = null);
              }
            },
          ),
          const SizedBox(height: 20),
          AuthTextField(
            label: 'Choose a password',
            controller: _password,
            obscureText: true,
            autofillHints: const [AutofillHints.newPassword],
            errorText: _passwordErr,
            helperText:
                _passwordErr == null ? 'At least 8 characters' : null,
            onChanged: (_) {
              if (_passwordErr != null) setState(() => _passwordErr = null);
            },
          ),
          const SizedBox(height: 20),
          AuthTextField(
            label: 'Confirm password',
            controller: _confirmPassword,
            obscureText: true,
            textInputAction: TextInputAction.done,
            autofillHints: const [AutofillHints.newPassword],
            errorText: _confirmPasswordErr,
            onSubmitted: (_) => _handleSubmit(),
            onChanged: (_) {
              if (_confirmPasswordErr != null) {
                setState(() => _confirmPasswordErr = null);
              }
            },
          ),
          const SizedBox(height: 28),
          Align(
            alignment: Alignment.centerLeft,
            child: OutlinedButton(
              onPressed: _handleSubmit,
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.accent,
                side: const BorderSide(color: AppColors.accent),
                shape: const StadiumBorder(),
                padding: const EdgeInsets.symmetric(
                  horizontal: 28,
                  vertical: 12,
                ),
                textStyle: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                ),
              ),
              child: const Text('Sign Up'),
            ),
          ),
          const SizedBox(height: 32),
          const _OrDivider(),
          const SizedBox(height: 20),
          const SocialButton(provider: SocialProvider.google),
          const SizedBox(height: 12),
          const SocialButton(provider: SocialProvider.facebook),
          const SizedBox(height: 32),
          const _TermsFooter(),
        ],
      ),
    );
  }
}

class _SignUpSubtitle extends StatelessWidget {
  const _SignUpSubtitle();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text('LinkBeet is your business, in one link.'),
        const SizedBox(height: 4),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Already have an account? '),
            GestureDetector(
              onTap: () => Navigator.of(context).pop(),
              child: const Text(
                'Log In',
                style: TextStyle(
                  color: AppColors.accent,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ],
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

class _TermsFooter extends StatelessWidget {
  const _TermsFooter();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
          style: const TextStyle(
            color: AppColors.textTertiary,
            fontSize: 12,
            height: 1.5,
          ),
          children: [
            const TextSpan(text: '* By signing up, you agree to our '),
            TextSpan(
              text: 'Terms of Use',
              style: const TextStyle(decoration: TextDecoration.underline),
            ),
            const TextSpan(text: ' and acknowledge you\u2019ve read our '),
            TextSpan(
              text: 'Privacy Policy',
              style: const TextStyle(decoration: TextDecoration.underline),
            ),
            const TextSpan(text: '.'),
          ],
        ),
      ),
    );
  }
}
