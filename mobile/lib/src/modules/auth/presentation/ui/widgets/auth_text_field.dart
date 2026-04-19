import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';

/// Underlined text field matching the Hopp / DESIGN.md auth style.
/// - Label above the field, underline border, blue focus underline.
/// - Shows error helper text when [errorText] is non-null.
class AuthTextField extends StatefulWidget {
  const AuthTextField({
    super.key,
    required this.label,
    required this.controller,
    this.keyboardType = TextInputType.text,
    this.obscureText = false,
    this.errorText,
    this.hintText,
    this.helperText,
    this.textInputAction = TextInputAction.next,
    this.autofillHints,
    this.onChanged,
    this.onSubmitted,
  });

  final String label;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool obscureText;
  final String? errorText;
  final String? hintText;
  final String? helperText;
  final TextInputAction textInputAction;
  final Iterable<String>? autofillHints;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;

  @override
  State<AuthTextField> createState() => _AuthTextFieldState();
}

class _AuthTextFieldState extends State<AuthTextField> {
  bool _hidden = true;

  @override
  Widget build(BuildContext context) {
    final hasError = widget.errorText != null;

    return TextField(
      controller: widget.controller,
      keyboardType: widget.keyboardType,
      obscureText: widget.obscureText && _hidden,
      textInputAction: widget.textInputAction,
      autofillHints: widget.autofillHints,
      onChanged: widget.onChanged,
      onSubmitted: widget.onSubmitted,
      style: const TextStyle(
        color: AppColors.textPrimary,
        fontSize: 17,
        letterSpacing: -0.3,
      ),
      cursorColor: AppColors.accent,
      decoration: InputDecoration(
        labelText: widget.label,
        hintText: widget.hintText,
        helperText: widget.helperText,
        errorText: widget.errorText,
        labelStyle: const TextStyle(
          color: AppColors.textTertiary,
          fontSize: 15,
          fontWeight: FontWeight.w400,
        ),
        floatingLabelStyle: TextStyle(
          color: hasError ? AppColors.error : AppColors.accent,
          fontSize: 13,
          fontWeight: FontWeight.w500,
        ),
        helperStyle: const TextStyle(
          color: AppColors.textTertiary,
          fontSize: 12,
        ),
        errorStyle: const TextStyle(
          color: AppColors.error,
          fontSize: 12,
        ),
        enabledBorder: const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.border),
        ),
        focusedBorder: const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.accent, width: 1.5),
        ),
        errorBorder: const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.error),
        ),
        focusedErrorBorder: const UnderlineInputBorder(
          borderSide: BorderSide(color: AppColors.error, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(vertical: 14),
        suffixIcon: widget.obscureText
            ? IconButton(
                onPressed: () => setState(() => _hidden = !_hidden),
                icon: Icon(
                  _hidden
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                  size: 20,
                  color: AppColors.textTertiary,
                ),
                tooltip: _hidden ? 'Show password' : 'Hide password',
              )
            : null,
      ),
    );
  }
}
