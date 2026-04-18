// ─── Near Me Module — Mock Data ───────────────────────────────────────────────
// Replace with real API calls later.

class NearMeItem {
  const NearMeItem({
    required this.id,
    required this.name,
    required this.category,
    required this.distanceKm,
    required this.rating,
    required this.avatarColor,
    required this.tags,
    this.isVerified = false,
    this.offerLabel,
    this.bioLink,
  });

  final String id;
  final String name;
  final String category;
  final double distanceKm;
  final double rating;
  final int avatarColor; // ARGB
  final List<String> tags;
  final bool isVerified;
  final String? offerLabel;
  final String? bioLink;
}

const kNearMeCategories = [
  (icon: '⊞', label: 'All'),
  (icon: '🍽', label: 'Restaurant'),
  (icon: '✂️', label: 'Saloon'),
  (icon: '🏋', label: 'Fitness'),
  (icon: '👨‍⚕️', label: 'Doctor'),
];

const kTopRatedNearMe = [
  NearMeItem(
    id: 'green-leaf',
    name: 'The Green Leaf Cafe',
    category: 'Restaurant',
    distanceKm: 0.8,
    rating: 4.8,
    avatarColor: 0xFFB5A07A,
    tags: ['Vegan', 'WiFi'],
    bioLink: 'linkbeet.in/thegreenleafcafe',
  ),
  NearMeItem(
    id: 'luxe-hair',
    name: 'Luxe Hair Studio',
    category: 'Saloon',
    distanceKm: 1.2,
    rating: 4.9,
    avatarColor: 0xFFAFBFD4,
    tags: ['Premium', 'Unisex'],
    isVerified: true,
    bioLink: 'linkbeet.in/luxehairstudio',
  ),
  NearMeItem(
    id: 'fitzone',
    name: 'FitZone Gym',
    category: 'Fitness',
    distanceKm: 0.5,
    rating: 4.7,
    avatarColor: 0xFFD1B8E8,
    tags: ['24/7', 'Training'],
    bioLink: 'linkbeet.in/fitzone',
  ),
];

const kAllNearby = [
  NearMeItem(
    id: 'fitzone-all',
    name: 'FitZone Gym',
    category: 'Fitness',
    distanceKm: 0.5,
    rating: 4.7,
    avatarColor: 0xFFD1B8E8,
    tags: ['24/7', 'Verified'],
    isVerified: true,
    bioLink: 'linkbeet.in/fitzone',
  ),
  NearMeItem(
    id: 'spice-kitchen',
    name: 'Spice Kitchen',
    category: 'Restaurant',
    distanceKm: 0.9,
    rating: 4.5,
    avatarColor: 0xFFFFCA80,
    tags: [],
    offerLabel: '20% Off',
    bioLink: 'linkbeet.in/spicekitchen',
  ),
  NearMeItem(
    id: 'glow-beauty-all',
    name: 'Glow Beauty Lounge',
    category: 'Saloon',
    distanceKm: 1.4,
    rating: 4.6,
    avatarColor: 0xFF80D4A0,
    tags: ['Facial', 'Spa'],
    bioLink: 'linkbeet.in/glowbeautylounge',
  ),
  NearMeItem(
    id: 'chai-cafe',
    name: 'Chai & Code Cafe',
    category: 'Restaurant',
    distanceKm: 1.8,
    rating: 4.4,
    avatarColor: 0xFFE8A0C0,
    tags: ['WiFi', 'Coworking'],
    bioLink: 'linkbeet.in/chaiandcode',
  ),
];

const kTrendingOffers = [
  (icon: '🏷', label: '30% Off First Booking', sub: 'The Green Leaf Cafe', badge: 'HOT', color: 0xFFFF9800, bioLink: 'linkbeet.in/thegreenleafcafe'),
  (icon: '🎁', label: 'Free Trial Session', sub: 'FitZone Gym', badge: '', color: 0xFF4CAF50, bioLink: 'linkbeet.in/fitzone'),
  (icon: '✂️', label: '20% Off Haircuts', sub: 'Luxe Hair Studio', badge: '', color: 0xFF0071E3, bioLink: 'linkbeet.in/luxehairstudio'),
];
