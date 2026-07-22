/**
 * Work Schedule Types
 * Re-exports from centralized src/types/ + local domain-specific types
 */

// ─────────────────────────────────────────────────────────────────────────────
// Re-exports từ centralized types
// ─────────────────────────────────────────────────────────────────────────────

export type {
  WorkPeriod,
  WorkEvent,
  WorkSchedule,
  WorkScheduleMutate,
  ScheduleParticipant,
  ScheduleParticipantBulkMutate,
  ScheduleParticipantBulkResponse,
} from '@/types/work-schedule'

export {
  mapWorkScheduleToWorkEvent,
  mapWorkEventToWorkScheduleMutate,
  formatDate,
  formatTime,
  formatTimeFromISO,
  addHoursToTime,
  getPeriodFromTime,
} from '@/types/work-schedule'

// ─────────────────────────────────────────────────────────────────────────────
// Local domain types — chỉ dùng trong feature này
// ─────────────────────────────────────────────────────────────────────────────

/** Raw user object từ API user list */
export interface RawUser {
  id?: string
  email?: string
  username?: string | null
  first_name?: string | null
  last_name?: string | null
}

/** Raw participant row từ /scheduleParticipant API */
export interface RawParticipant {
  schedule_id?: string
  user_id?: string
  participant?: {
    id?: string
    email?: string
    username?: string | null
    first_name?: string | null
    last_name?: string | null
  }
  schedule?: import('@/types/work-schedule').WorkSchedule
}

/** Thông tin người tham gia đã resolve tên hiển thị */
export interface ParticipantInfo {
  schedule_id: string
  user_id: string
  displayName: string
}

/** Paginated API response wrapper */
export interface PaginatedResponse<T> {
  responseData?: T[] | {
    count?: number
    rows?: T[]
    page?: number
    pageSize?: number
  }
}

/** Kết quả parse scheduleParticipant — tách events và participants riêng */
export interface ParsedScheduleData {
  events: import('@/types/work-schedule').WorkEvent[]
  participantsBySchedule: Record<string, ParticipantInfo[]>
}
