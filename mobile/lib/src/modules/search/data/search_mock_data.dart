// ─── Search Module — Mock Data ────────────────────────────────────────────────
// Mirrors the design screenshots. Replace with real API calls later.

class SearchResultItem {
  const SearchResultItem({
    required this.id,
    required this.name,
    required this.handle,
    required this.description,
    required this.rating,
    required this.reviewCount,
    required this.distanceKm,
    required this.isOpenNow,
    required this.tags,
    required this.avatarColor,
    this.isVerified = false,
    this.closingTime,
  });

  final String id;
  final String name;
  final String handle;
  final String description;
  final double rating;
  final int reviewCount;
  final double distanceKm;
  final bool isOpenNow;
  final List<String> tags;
  final int avatarColor; // ARGB
  final bool isVerified;
  final String? closingTime;
}

const kSearchResults = [
  SearchResultItem(
    id: '1',
    name: 'Luxe Hair Studio',
    handle: 'linkbeet.in/luxehairstudio',
    description:
        'Premium unisex salon specialising in hair color, bridal makeup & grooming. Walk-ins welcome, online booking available.',
    rating: 4.9,
    reviewCount: 312,
    distanceKm: 0.5,
    isOpenNow: true,
    tags: ['Premium', 'Unisex', 'Hair Color', 'Bridal'],
    avatarColor: 0xFFFF9800,
    isVerified: true,
  ),
  SearchResultItem(
    id: '2',
    name: 'The Style Bar',
    handle: 'linkbeet.in/thestylebar',
    description:
        'Your destination for bridal packages, keratin treatments & trending hairstyles. Trusted by 500+ brides in Kochi.',
    rating: 4.7,
    reviewCount: 189,
    distanceKm: 0.8,
    isOpenNow: true,
    tags: ['Bridal', 'Keratin', 'Styling'],
    avatarColor: 0xFF9C27B0,
    isVerified: false,
  ),
  SearchResultItem(
    id: '3',
    name: 'Glow Beauty Lounge',
    handle: 'linkbeet.in/glowbeauty',
    description:
        'Full-service beauty lounge offering facials, nail art, lash extensions & premium skincare treatments.',
    rating: 4.6,
    reviewCount: 214,
    distanceKm: 1.2,
    isOpenNow: false,
    closingTime: '8 PM',
    tags: ['Facial', 'Nails', 'Lash Extensions', 'Spa'],
    avatarColor: 0xFF4CAF50,
    isVerified: true,
  ),
  SearchResultItem(
    id: '4',
    name: 'Nails & Beyond',
    handle: 'linkbeet.in/nailsandbeyond',
    description:
        'Expert nail art, gel extensions, manicures & pedicures in a relaxing atmosphere. Walk-ins and appointments available.',
    rating: 4.3,
    reviewCount: 156,
    distanceKm: 1.5,
    isOpenNow: false,
    closingTime: '8 PM',
    tags: ['Nail Art', 'Gel Extensions', 'Manicure', 'Pedicure'],
    avatarColor: 0xFFE91E63,
    isVerified: false,
  ),
];

const kAlsoTrySearches = [
  'bridal makeup',
  'hair color',
  'spa',
];

const kPeopleAlsoSearch = [
  'bridal makeup near me',
  'hair color specialist kochi',
  'best spa treatments nearby',
  "men's grooming salon",
];
