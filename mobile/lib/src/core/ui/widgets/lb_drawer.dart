import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_font_sizes.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/modules/auth/presentation/router/auth_router_module.dart';

// ── Nav items — mirrors web/src/components/layout/Sidebar.tsx ──────────────
class _NavItem {
  const _NavItem({required this.label, required this.icon, required this.path});

  final String label;
  final IconData icon;
  final String path;
}

const _kNavItems = [
  _NavItem(label: 'Home', icon: Icons.home_outlined, path: '/home'),
  _NavItem(
    label: 'Near Me',
    icon: Icons.location_on_outlined,
    path: '/near-me',
  ),
  _NavItem(label: 'My Bio', icon: Icons.person_outline_rounded, path: '/bio'),
  _NavItem(label: 'Settings', icon: Icons.settings_outlined, path: '/settings'),
];

// ── LbDrawer ─────────────────────────────────────────────────────────────────
/// Mobile drawer — slides from left.
/// Mirrors web Sidebar (expanded, non-collapsed state) exactly.
class LbDrawer extends StatelessWidget {
  const LbDrawer({
    super.key,
    required this.currentPath,
    this.isLoggedIn = false,
    this.userName,
    this.onClose,
  });

  final String currentPath;
  final bool isLoggedIn;
  final String? userName;
  final VoidCallback? onClose;

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Container(
      width: screenWidth * 0.9,
      height: double.infinity,
      decoration: const BoxDecoration(
        color: AppColors.sidebarBg,
        border: Border(right: BorderSide(color: AppColors.border)),
      ),
      child: SafeArea(
        child: Column(
          children: [
            // ── Header: logo + collapse button ──────────────────────────
            SizedBox(
              height: 64,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Image.asset(
                      AppAssets.blackLogo,
                      width: 32,
                      height: 32,
                      fit: BoxFit.contain,
                    ),
                  ],
                ),
              ),
            ),

            // ── Nav items ───────────────────────────────────────────────
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                child: Column(
                  children: _kNavItems.map((item) {
                    final isActive =
                        currentPath == item.path ||
                        currentPath.startsWith('${item.path}/');
                    return _NavRow(
                      item: item,
                      isActive: isActive,
                      onTap: () {
                        onClose?.call();
                        if (!isActive) {
                          context.push(item.path);
                        }
                      },
                    );
                  }).toList(),
                ),
              ),
            ),

            // ── Bottom: Login / user ─────────────────────────────────────
            Container(
              decoration: const BoxDecoration(
                border: Border(top: BorderSide(color: AppColors.border)),
              ),
              padding: const EdgeInsets.all(8),
              child: isLoggedIn
                  ? _LoggedInRow(userName: userName)
                  : _LoginButton(
                      onTap: () {
                        onClose?.call();
                        const SignInRoute().push(context);
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

// ── Nav row ───────────────────────────────────────────────────────────────────
class _NavRow extends StatelessWidget {
  const _NavRow({
    required this.item,
    required this.isActive,
    required this.onTap,
  });

  final _NavItem item;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          height: AppSizes.navItemHeight,
          decoration: BoxDecoration(
            color: isActive ? AppColors.accentTintBg : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            children: [
              // Active indicator bar
              if (isActive)
                Container(
                  width: 2,
                  height: 20,
                  decoration: BoxDecoration(
                    color: AppColors.accent,
                    borderRadius: BorderRadius.circular(2),
                  ),
                )
              else
                const SizedBox(width: 2),
              AppSpacing.horizontalGap12,
              Icon(
                item.icon,
                size: 20,
                color: isActive ? AppColors.accent : AppColors.textSecondary,
              ),
              AppSpacing.horizontalGap12,
              Text(
                item.label,
                style: TextStyle(
                  fontSize: AppFontSizes.filterChip,
                  fontWeight: FontWeight.w400,
                  color: isActive ? AppColors.accent : AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── Login button ──────────────────────────────────────────────────────────────
class _LoginButton extends StatelessWidget {
  const _LoginButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 44,
      child: ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.accent,
          foregroundColor: AppColors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          padding: EdgeInsets.zero,
        ),
        child: const Text(
          'Login',
          style: TextStyle(
            fontSize: AppFontSizes.button,
            fontWeight: FontWeight.w400,
          ),
        ),
      ),
    );
  }
}

// ── Logged-in user row ────────────────────────────────────────────────────────
class _LoggedInRow extends StatelessWidget {
  const _LoggedInRow({this.userName});

  final String? userName;

  @override
  Widget build(BuildContext context) {
    final initials = (userName?.isNotEmpty == true)
        ? userName![0].toUpperCase()
        : '?';
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      child: Row(
        children: [
          CircleAvatar(
            radius: 16,
            backgroundColor: AppColors.accent,
            child: Text(
              initials,
              style: const TextStyle(
                color: AppColors.white,
                fontSize: AppFontSizes.micro,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          AppSpacing.horizontalGap12,
          Text(
            userName ?? 'User',
            style: const TextStyle(
              fontSize: AppFontSizes.filterChip,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}
