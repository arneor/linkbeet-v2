import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../theme/app_colors.dart';
import '../../theme/app_radius.dart';
import '../../theme/app_spacing.dart';
import '../../theme/app_typography.dart';
import '../lb_button.dart';

class LbDrawer extends StatelessWidget {
  const LbDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final currentPath =
        GoRouterState.of(context).uri.toString();

    return Drawer(
      width: AppSpacing.sidebarWidth,
      backgroundColor: AppColors.sidebarBg,
      shape: const RoundedRectangleBorder(),
      child: SafeArea(
        child: Column(
          children: [
            // Logo header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Container(
                    width: AppSpacing.logoBadgeSize,
                    height: AppSpacing.logoBadgeSize,
                    decoration: BoxDecoration(
                      color: AppColors.accent,
                      borderRadius: AppRadius.standardRadius,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      'LB',
                      style: AppTypography.badge.copyWith(
                        color: AppColors.textInverse,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Text(
                    'LinkBeet',
                    style: AppTypography.subHeading.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 8),

            // Nav items
            _NavItem(
              icon: Icons.explore_outlined,
              activeIcon: Icons.explore,
              label: 'Discover',
              path: '/',
              currentPath: currentPath,
            ),
            _NavItem(
              icon: Icons.near_me_outlined,
              activeIcon: Icons.near_me,
              label: 'Near Me',
              path: '/near-me',
              currentPath: currentPath,
            ),
            _NavItem(
              icon: Icons.person_outline,
              activeIcon: Icons.person,
              label: 'My Bio',
              path: '/profile',
              currentPath: currentPath,
            ),
            _NavItem(
              icon: Icons.bookmark_outline,
              activeIcon: Icons.bookmark,
              label: 'Bookmarks',
              path: '/bookmarks',
              currentPath: currentPath,
            ),
            _NavItem(
              icon: Icons.people_outline,
              activeIcon: Icons.people,
              label: 'Connections',
              path: '/connections',
              currentPath: currentPath,
            ),
            _NavItem(
              icon: Icons.settings_outlined,
              activeIcon: Icons.settings,
              label: 'Settings',
              path: '/settings',
              currentPath: currentPath,
            ),

            const Spacer(),

            // Bottom section
            const Divider(color: AppColors.divider),
            Padding(
              padding: const EdgeInsets.all(16),
              child: LbButton(
                label: 'Sign In',
                onPressed: () {},
                width: double.infinity,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final String path;
  final String currentPath;

  const _NavItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
    required this.path,
    required this.currentPath,
  });

  bool get isActive => currentPath == path;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 2),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            Navigator.of(context).pop(); // Close drawer
            if (!isActive) {
              context.go(path);
            }
          },
          borderRadius: AppRadius.standardRadius,
          child: Container(
            height: AppSpacing.navItemHeight,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: isActive ? AppColors.accentTintBg : Colors.transparent,
              borderRadius: AppRadius.standardRadius,
            ),
            child: Row(
              children: [
                // Active indicator bar
                if (isActive)
                  Container(
                    width: 2,
                    height: 20,
                    margin: const EdgeInsets.only(right: 10),
                    decoration: BoxDecoration(
                      color: AppColors.accent,
                      borderRadius: BorderRadius.circular(1),
                    ),
                  ),
                Icon(
                  isActive ? activeIcon : icon,
                  size: 22,
                  color:
                      isActive ? AppColors.accent : AppColors.textSecondary,
                ),
                const SizedBox(width: 12),
                Text(
                  label,
                  style: isActive
                      ? AppTypography.navLabelActive.copyWith(fontSize: 14)
                      : AppTypography.navLabel.copyWith(fontSize: 14),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
