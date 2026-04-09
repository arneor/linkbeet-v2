import { Redirect } from 'expo-router'

export default function IndexPage() {
  // Automatically route to the primary layout (discovery/dashboard logic will be handled inside tabs)
  return <Redirect href="/(tabs)" />
}
