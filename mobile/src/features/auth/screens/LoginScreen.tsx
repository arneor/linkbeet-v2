import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen (Feature Component)</Text>
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
