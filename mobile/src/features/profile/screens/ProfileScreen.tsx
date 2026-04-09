import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Profile Screen (Settings & Bio)</Text>
    </View>
  )
}

export function PublicProfileScreen({ username }: { username: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Public Biolink for: {username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
