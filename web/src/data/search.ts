import type { SearchResult } from './types'

export const SEARCH_RESULTS: SearchResult[] = [
  {
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
    avatarBg: '#FF9800',
    isVerified: true,
    lat: 9.9312,
    lng: 76.2673,
    category: 'Hair Salon',
  },
  {
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
    avatarBg: '#9C27B0',
    isVerified: false,
    lat: 9.935,
    lng: 76.27,
  },
  {
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
    avatarBg: '#4CAF50',
    isVerified: true,
    lat: 9.928,
    lng: 76.275,
  },
  {
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
    avatarBg: '#E91E63',
    isVerified: false,
    lat: 9.94,
    lng: 76.26,
  },
]

export const FILTERS = ['Nearest', 'Top Rated', 'Verified', 'Open Now', 'With Offers']

export const PEOPLE_ALSO_SEARCH = [
  'bridal makeup near me',
  'hair color specialist kochi',
  'best spa treatments nearby',
  "men's grooming salon",
]

export const MAP_CENTER: [number, number] = [9.9312, 76.2673]
export const MAP_YOU_PIN: [number, number] = [9.9295, 76.2655]
