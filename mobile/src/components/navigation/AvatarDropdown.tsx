import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { colors, spacing, borderRadius } from '../../theme'

// ─── AvatarDropdown ───────────────────────────────────────────
export interface AvatarDropdownProps {
  isOpen: boolean
  onToggle: () => void
  userName?: string
  userAvatar?: string
  userMode?: 'normal' | 'business'
  isLoggedIn?: boolean
}

export function AvatarDropdown({
  isOpen,
  onToggle,
  userName,
  userAvatar,
  userMode = 'normal',
  isLoggedIn = false,
}: AvatarDropdownProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isOpen, scaleAnim, opacityAnim])

  return (
    <View style={styles.container}>
      {/* Trigger */}
      <Pressable
        onPress={onToggle}
        style={styles.trigger}
        accessibilityRole="button"
        accessibilityLabel="User menu"
      >
        {userAvatar ? (
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {userName?.[0]?.toUpperCase() || '?'}
            </Text>
          </View>
        ) : (
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {userName?.[0]?.toUpperCase() || '?'}
            </Text>
          </View>
        )}
      </Pressable>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onToggle}
          />
          <Animated.View
            style={[
              styles.dropdown,
              {
                opacity: opacityAnim,
                transform: [
                  {
                    scale: scaleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <View style={styles.dropdownHeader}>
                  <Text style={styles.dropdownName} numberOfLines={1}>
                    {userName || 'User'}
                  </Text>
                  <View style={styles.modeBadge}>
                    <Text style={styles.modeBadgeText}>
                      {userMode === 'business' ? 'Business' : 'Normal'}
                    </Text>
                  </View>
                </View>

                <View style={styles.separator} />

                {/* Quick Links */}
                <Pressable style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Edit Profile</Text>
                </Pressable>
                <Pressable style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Settings</Text>
                </Pressable>
                {userMode === 'normal' && (
                  <Pressable style={styles.dropdownItem}>
                    <Text style={[styles.dropdownItemText, { color: colors.interactive.linkDark }]}>
                      Switch to Business
                    </Text>
                  </Pressable>
                )}

                <View style={styles.separator} />

                <Pressable style={styles.dropdownItem}>
                  <Text style={[styles.dropdownItemText, { opacity: 0.6 }]}>
                    Log Out
                  </Text>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login / Sign Up</Text>
              </Pressable>
            )}
          </Animated.View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 100,
  },
  trigger: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.interactive.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  dropdown: {
    position: 'absolute',
    top: 48,
    right: 0,
    minWidth: 200,
    backgroundColor: colors.surface.dark1,
    borderRadius: borderRadius.large,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 8,
    overflow: 'hidden',
  },
  dropdownHeader: {
    padding: spacing.md,
  },
  dropdownName: {
    color: colors.text.inverse,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.374,
  },
  modeBadge: {
    marginTop: 4,
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
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownItem: {
    height: 44,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  dropdownItemText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.224,
  },
  loginButton: {
    margin: spacing.sm,
    backgroundColor: colors.interactive.primary,
    borderRadius: borderRadius.standard,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: colors.text.inverse,
    fontSize: 17,
    fontWeight: '400',
  },
})
