import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { colors, shadows } from '../../theme'

// ─── ContextualFAB ────────────────────────────────────────────
export interface ContextualFABProps {
  icon: React.ReactNode
  label?: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  visible?: boolean
}

export function ContextualFAB({
  icon,
  label,
  onPress,
  variant = 'primary',
  visible = true,
}: ContextualFABProps) {
  const scaleAnim = useRef(new Animated.Value(visible ? 1 : 0)).current
  const opacityAnim = useRef(new Animated.Value(visible ? 1 : 0)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 120,
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
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible, scaleAnim, opacityAnim])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.fab,
          variant === 'primary' ? styles.fabPrimary : styles.fabSecondary,
          pressed && styles.fabPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={label || 'Action button'}
      >
        <View style={styles.iconContainer}>{icon}</View>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 30,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  fabPrimary: {
    backgroundColor: colors.interactive.primary,
  },
  fabSecondary: {
    backgroundColor: '#1d1d1f',
  },
  fabPressed: {
    transform: [{ scale: 0.9 }],
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
