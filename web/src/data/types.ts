export interface TrendingItem {
  label: string
  icon: 'location' | 'trending'
}

export interface SearchResult {
  id: string
  name: string
  handle: string
  description: string
  rating: number
  reviewCount: number
  distanceKm: number
  isOpenNow: boolean
  closingTime?: string
  tags: string[]
  avatarBg: string
  isVerified?: boolean
  lat: number
  lng: number
  category?: string
}

export interface Category {
  icon: string
  label: string
}

export interface TopRatedItem {
  id: string
  name: string
  category: string
  distanceKm: number
  rating: number
  avatarColor: string
  tags: string[]
  isVerified?: boolean
  bioLink?: string
}

export interface AllNearbyItem {
  id: string
  name: string
  category: string
  distanceKm: number
  rating: number
  avatarColor: string
  badge: string | null
  badgeType: string | null
  offerLabel: string | null
  tags?: string[]
  bioLink?: string
}

export interface TrendingOffer {
  id: string
  icon: string
  label: string
  sub: string
  badge: string
  iconBg: string
  iconColor: string
  bioLink?: string
}

export interface RecentlyViewedItem {
  id: string
  name: string
  category: string
  distanceKm: number
  rating: number
  avatarColor: string
  bioLink?: string
}
