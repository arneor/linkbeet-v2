export const SOCIAL_PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    baseUrl: 'https://instagram.com/',
    placeholder: 'username',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    baseUrl: 'https://x.com/',
    placeholder: 'username',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    baseUrl: 'https://linkedin.com/in/',
    placeholder: 'username',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    baseUrl: 'https://youtube.com/@',
    placeholder: 'channel',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    baseUrl: 'https://tiktok.com/@',
    placeholder: 'username',
  },
  {
    id: 'github',
    name: 'GitHub',
    baseUrl: 'https://github.com/',
    placeholder: 'username',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    baseUrl: 'https://facebook.com/',
    placeholder: 'username',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    baseUrl: 'https://wa.me/',
    placeholder: 'phone number',
  },
] as const

export type SocialPlatformId = (typeof SOCIAL_PLATFORMS)[number]['id']
