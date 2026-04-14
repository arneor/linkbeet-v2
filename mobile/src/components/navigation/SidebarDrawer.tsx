import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { colors, spacing, layout } from '../../theme'

// ─── SidebarDrawer ────────────────────────────────────────────
interface NavItem {
  label: string
  route: string
  icon: string
  businessOnly?: boolean
}

const navItems: NavItem[] = [
  { label: 'Discover', route: 'discover', icon: '◎' },
  { label: 'Near Me', route: 'near-me', icon: '◉' },
  { label: 'My Bio', route: 'bio', icon: '☉' },
  { label: 'Dashboard', route: 'dashboard', icon: '▦', businessOnly: true },
  { label: 'Bookmarks', route: 'bookmarks', icon: '◇' },
  { label: 'Connections', route: 'connections', icon: '⊕' },
  { label: 'Settings', route: 'settings', icon: '⚙' },
]

export interface SidebarDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentRoute: string
  userMode?: 'normal' | 'business'
  isLoggedIn?: boolean
  userName?: string
  userAvatar?: string
}

const DRAWER_WIDTH = Math.min(Dimensions.get('window').width * 0.8, 300)

export function SidebarDrawer({
  isOpen,
  onClose,
  currentRoute,
  userMode = 'normal',
  isLoggedIn = false,
  userName,
  userAvatar,
}: SidebarDrawerProps) {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current
  const overlayOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isOpen, translateX, overlayOpacity])

  const filteredItems = navItems.filter(
    (item) => !item.businessOnly || userMode === 'business',
  )

  if (!isOpen) return null

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Overlay */}
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX }], width: DRAWER_WIDTH }]}
      >
        {/* User Section */}
        <View style={styles.userSection}>
          {isLoggedIn ? (
            <View style={styles.userInfo}>
              {userAvatar ? (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {userName?.[0]?.toUpperCase() || '?'}
                  </Text>
                </View>
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {userName?.[0]?.toUpperCase() || '?'}
                  </Text>
                </View>
              )}
              <View style={styles.userTextContainer}>
                <Text style={styles.userName} numberOfLines={1}>
                  {userName || 'User'}
                </Text>
                <View style={styles.modeBadge}>
                  <Text style={styles.modeBadgeText}>
                    {userMode === 'business' ? 'Business' : 'Normal'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Pressable style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login / Sign Up</Text>
            </Pressable>
          )}
        </View>

        {/* Nav Items */}
        <View style={styles.navList}>
          {filteredItems.map((item) => {
            const isActive = currentRoute === item.route
            return (
              <Pressable
                key={item.route}
                style={[styles.navItem, isActive && styles.navItemActive]}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                {isActive && <View style={styles.activeBorder} />}
                <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
                  {item.icon}
                </Text>
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        {/* Bottom */}
        {isLoggedIn && (
          <View style={styles.bottomSection}>
            <Pressable style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.bg.primary,
    zIndex: 50,
    paddingTop: 60, // Safe area approximation
  },
  userSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.interactive.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '600',
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    color: colors.text.inverse,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.374,
  },
  modeBadge: {
    marginTop: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  modeBadgeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: colors.interactive.primary,
    borderRadius: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: colors.text.inverse,
    fontSize: 17,
    fontWeight: '400',
  },
  navList: {
    flex: 1,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    gap: spacing.sm,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeBorder: {
    position: 'absolute',
    left: 0,
    width: 3,
    height: 20,
    backgroundColor: colors.interactive.primary,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  navIcon: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.6)',
    width: 24,
    textAlign: 'center',
  },
  navIconActive: {
    color: colors.interactive.linkDark,
  },
  navLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: -0.374,
  },
  navLabelActive: {
    color: colors.interactive.linkDark,
  },
  bottomSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: spacing.sm,
  },
  logoutButton: {
    height: layout.touchTargetMinimum,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '400',
  },
})
