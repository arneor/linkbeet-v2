export interface Industry {
  id: string
  label: string
  emoji: string
}

export const INDUSTRIES: readonly Industry[] = [
  { id: 'store', label: 'Store', emoji: '🛍️' },
  { id: 'content-creators', label: 'Content Creators', emoji: '🎙️' },
  { id: 'sport-fitness', label: 'Sport & Fitness', emoji: '🏋️' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'food-drink', label: 'Food & Drink', emoji: '🍕' },
  { id: 'real-estate', label: 'Real Estate', emoji: '🏠' },
  { id: 'beauty', label: 'Beauty', emoji: '💄' },
  { id: 'events', label: 'Events', emoji: '🎤' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'wellness-health', label: 'Wellness & Health', emoji: '🌿' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎭' },
  { id: 'education', label: 'Education', emoji: '📚' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'tech-gaming', label: 'Tech & Gaming', emoji: '🎮' },
  { id: 'travel-activities', label: 'Travel & Activities', emoji: '🌴' },
  { id: 'community', label: 'Community', emoji: '🤝' },
  { id: 'other', label: 'Other', emoji: '✨' },
] as const
