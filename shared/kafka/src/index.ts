import { Kafka, Producer, Consumer, KafkaConfig } from 'kafkajs'

// ─── Topic Constants ──────────────────────────────────────────
export const KAFKA_TOPICS = {
  // Auth events
  USER_REGISTERED: 'user.registered',
  USER_LOGGED_IN: 'user.logged_in',
  USER_DELETED: 'user.deleted',

  // Profile events
  PROFILE_UPDATED: 'profile.updated',
  PROFILE_VIEWED: 'profile.viewed',

  // Link events
  LINK_CREATED: 'link.created',
  LINK_CLICKED: 'link.clicked',
  LINK_DELETED: 'link.deleted',

  // Analytics events
  PAGE_VIEW: 'analytics.page_view',
  CLICK_TRACKED: 'analytics.click_tracked',

  // Booking events
  BOOKING_CREATED: 'booking.created',
  BOOKING_CONFIRMED: 'booking.confirmed',
  BOOKING_CANCELLED: 'booking.cancelled',

  // Payment events
  PAYMENT_INITIATED: 'payment.initiated',
  PAYMENT_COMPLETED: 'payment.completed',
  PAYMENT_FAILED: 'payment.failed',
} as const

export type KafkaTopic = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS]

// ─── Event Interfaces ─────────────────────────────────────────
export interface KafkaEvent<T = unknown> {
  eventId: string
  topic: KafkaTopic
  timestamp: string
  version: string
  payload: T
}

export interface UserRegisteredPayload {
  userId: string
  email: string
  username: string
  name: string | null
}

export interface UserLoggedInPayload {
  userId: string
  email: string
  ip: string | null
  userAgent: string | null
}

export interface ProfileViewedPayload {
  profileId: string
  username: string
  viewerIp: string | null
  referrer: string | null
  timestamp: string
}

export interface LinkClickedPayload {
  linkId: string
  userId: string
  url: string
  viewerIp: string | null
  referrer: string | null
  timestamp: string
}

export interface PaymentCompletedPayload {
  paymentId: string
  userId: string
  amount: number
  currency: string
  bookingId: string | null
}

// ─── Kafka Client Factory ─────────────────────────────────────
export function createKafkaClient(config: KafkaConfig): Kafka {
  return new Kafka(config)
}

export function createProducer(kafka: Kafka): Producer {
  return kafka.producer()
}

export function createConsumer(kafka: Kafka, groupId: string): Consumer {
  return kafka.consumer({ groupId })
}

export { Kafka, Producer, Consumer }
