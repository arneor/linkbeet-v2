import 'package:flutter/foundation.dart';

@immutable
class Industry {
  const Industry({required this.id, required this.label, required this.emoji});

  final String id;
  final String label;
  final String emoji;
}

const List<Industry> kIndustries = [
  Industry(id: 'store', label: 'Store', emoji: '🛍️'),
  Industry(id: 'content-creators', label: 'Content Creators', emoji: '🎙️'),
  Industry(id: 'sport-fitness', label: 'Sport & Fitness', emoji: '🏋️'),
  Industry(id: 'creative', label: 'Creative', emoji: '🎨'),
  Industry(id: 'food-drink', label: 'Food & Drink', emoji: '🍕'),
  Industry(id: 'real-estate', label: 'Real Estate', emoji: '🏠'),
  Industry(id: 'beauty', label: 'Beauty', emoji: '💄'),
  Industry(id: 'events', label: 'Events', emoji: '🎤'),
  Industry(id: 'business', label: 'Business', emoji: '💼'),
  Industry(id: 'fashion', label: 'Fashion', emoji: '👗'),
  Industry(id: 'wellness-health', label: 'Wellness & Health', emoji: '🌿'),
  Industry(id: 'entertainment', label: 'Entertainment', emoji: '🎭'),
  Industry(id: 'education', label: 'Education', emoji: '📚'),
  Industry(id: 'music', label: 'Music', emoji: '🎵'),
  Industry(id: 'tech-gaming', label: 'Tech & Gaming', emoji: '🎮'),
  Industry(id: 'travel-activities', label: 'Travel & Activities', emoji: '🌴'),
  Industry(id: 'community', label: 'Community', emoji: '🤝'),
  Industry(id: 'other', label: 'Other', emoji: '✨'),
];
