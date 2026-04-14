import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, layout } from '../../theme'

// ─── Header ───────────────────────────────────────────────────
export interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  onMenuPress: () => void
  rightContent?: React.ReactNode
  transparent?: boolean
}

export function Header({
  title,
  showBack = false,
  onBack,
  onMenuPress,
  rightContent,
  transparent = false,
}: HeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        transparent ? styles.transparent : styles.glass,
      ]}
    >
      <View style={styles.content}>
        {/* Left: Hamburger or Back */}
        <Pressable
          onPress={showBack ? onBack : onMenuPress}
          style={styles.touchTarget}
          accessibilityRole="button"
          accessibilityLabel={showBack ? 'Go back' : 'Open menu'}
        >
          {showBack ? (
            <Text style={styles.iconText}>←</Text>
          ) : (
            <View style={styles.hamburger}>
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
              <View style={styles.hamburgerLine} />
            </View>
          )}
        </Pressable>

        {/* Center: Title */}
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}

        {/* Right: Custom content or spacer */}
        <View style={styles.rightSlot}>
          {rightContent || <View style={styles.spacer} />}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
  },
  glass: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  content: {
    height: layout.navHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  touchTarget: {
    width: layout.touchTargetMinimum,
    height: layout.touchTargetMinimum,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburger: {
    width: 20,
    height: 14,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: 20,
    height: 1.5,
    backgroundColor: colors.text.inverse,
    borderRadius: 1,
  },
  iconText: {
    color: colors.text.inverse,
    fontSize: 20,
    fontWeight: '300',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.text.inverse,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.374,
  },
  rightSlot: {
    minWidth: layout.touchTargetMinimum,
    alignItems: 'flex-end',
  },
  spacer: {
    width: layout.touchTargetMinimum,
  },
})
