import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

/// Option 1: From the root of the monorepo
//
/// pnpm --filter @linkbeet/mobile ios
/// pnpm --filter @linkbeet/mobile android

/// Option 2: From inside the mobile/ directory
//
/// cd mobile
/// pnpm ios
/// pnpm android

/// this command is using to clear the cache
///
/// pnpm expo start -c --ios

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=68' }} style={styles.avatar} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>Hello, creator! 👋</Text>
              <Text style={styles.username}>@linkbeet_user</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.icon20}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.bgBlue]}>
              <Text style={styles.icon24}>👁️</Text>
              <Text style={styles.statValue}>12.4k</Text>
              <Text style={styles.statLabel}>Total Views</Text>
            </View>
            <View style={[styles.statCard, styles.bgGreen]}>
              <Text style={styles.icon24}>🖱️</Text>
              <Text style={styles.statValue}>3.2k</Text>
              <Text style={styles.statLabel}>Total Clicks</Text>
            </View>
          </View>

          {/* Actions */}
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonIcon}>➕</Text>
            <Text style={styles.primaryButtonText}>Create New Link</Text>
          </TouchableOpacity>

          {/* Links List */}
          <View style={styles.linksHeader}>
            <Text style={styles.sectionTitle}>Your Links</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkItem}>
            <View style={styles.linkIconContainer}>
              <Text style={styles.icon20}>📸</Text>
            </View>
            <View style={styles.linkDetails}>
              <Text style={styles.linkTitle}>Instagram Profile</Text>
              <Text style={styles.linkUrl}>instagram.com/linkbeet</Text>
            </View>
            <View style={styles.linkStats}>
              <Text style={styles.linkClicks}>1.2k</Text>
              <Text style={styles.statsIconSmall}>📊</Text>
            </View>
          </View>

          <View style={styles.linkItem}>
            <View style={styles.linkIconContainer}>
              <Text style={styles.icon20}>🌐</Text>
            </View>
            <View style={styles.linkDetails}>
              <Text style={styles.linkTitle}>My Portfolio</Text>
              <Text style={styles.linkUrl}>portfolio.com/me</Text>
            </View>
            <View style={styles.linkStats}>
              <Text style={styles.linkClicks}>850</Text>
              <Text style={styles.statsIconSmall}>📊</Text>
            </View>
          </View>

          <View style={styles.linkItem}>
            <View style={styles.linkIconContainer}>
              <Text style={styles.icon20}>▶️</Text>
            </View>
            <View style={styles.linkDetails}>
              <Text style={styles.linkTitle}>Latest Vlog</Text>
              <Text style={styles.linkUrl}>youtube.com/watch?v=...</Text>
            </View>
            <View style={styles.linkStats}>
              <Text style={styles.linkClicks}>520</Text>
              <Text style={styles.statsIconSmall}>📊</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  bgBlue: {
    backgroundColor: '#e0e7ff',
  },
  bgGreen: {
    backgroundColor: '#dcfce7',
  },
  icon20: {
    fontSize: 20,
  },
  icon24: {
    fontSize: 24,
  },
  primaryButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  statsIconSmall: {
    fontSize: 12,
    color: '#6b7280',
  },
  primaryButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  linksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  linkIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkDetails: {
    flex: 1,
    marginLeft: 16,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  linkUrl: {
    fontSize: 13,
    color: '#6b7280',
  },
  linkStats: {
    alignItems: 'flex-end',
  },
  linkClicks: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
})
