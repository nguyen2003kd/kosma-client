/**
 * Data parsers cho Work Schedule
 *
 * Tách riêng logic parse/transform data khỏi hook.
 * Mục tiêu: dễ test, dễ mở rộng khi API thay đổi.
 *
 * Luồng dữ liệu:
 *   Raw API responses
 *     → extractRows()           (unwrap paginated wrapper)
 *     → parseParticipantRows()   (tách events & participants)
 *     → WorkEvent / ParticipantInfo (typed output)
 */

import { mapWorkScheduleToWorkEvent } from '@/types/work-schedule'
import type { WorkEvent, WorkSchedule } from '@/types/work-schedule'
import type { ParticipantInfo, PaginatedResponse, ParsedScheduleData, RawParticipant, RawUser } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Core: unwrap paginated response
// ─────────────────────────────────────────────────────────────────────────────

/** Safely extract rows array từ paginated response */
export function extractRows<T>(responseData: PaginatedResponse<T>['responseData']): T[] {
  if (!responseData) return []
  if (Array.isArray(responseData)) return responseData
  return responseData.rows ?? []
}

// ─────────────────────────────────────────────────────────────────────────────
// User helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Resolve display name từ user object */
export function getUserDisplayName(user: RawUser): string {
  const first = user.first_name || ''
  const last = user.last_name || ''
  if (first || last) return `${first} ${last}`.trim()
  if (user.username) return user.username
  return user.email || ''
}

/** Build user lookup map từ user list */
export function buildUserMap(users: RawUser[]): Record<string, string> {
  const map: Record<string, string> = {}
  for (const u of users) {
    if (u?.id) map[u.id] = getUserDisplayName(u)
  }
  return map
}

// ─────────────────────────────────────────────────────────────────────────────
// Participant helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Resolve display name cho participant row — ưu tiên nested participant object */
export function resolveParticipantName(row: RawParticipant, userMap: Record<string, string>): string {
  return row.participant
    ? getUserDisplayName(row.participant)
    : userMap[row.user_id ?? ''] ?? row.user_id ?? ''
}

// ─────────────────────────────────────────────────────────────────────────────
// Core parser: scheduleParticipant → events + participants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parse raw participant rows thành:
 *   - events: WorkEvent[] (deduplicated by schedule.id)
 *   - participantsBySchedule: Record<scheduleId, ParticipantInfo[]>
 *
 * Khi backend trả dữ liệu nested trong participant thay vì /workSchedule riêng,
 * ta cần extract schedule từ từng participant row.
 */
export function parseParticipantRows(
  rows: RawParticipant[],
  userMap: Record<string, string>
): ParsedScheduleData {
  const seen = new Set<string>()
  const events: WorkEvent[] = []
  const participantsBySchedule: Record<string, ParticipantInfo[]> = {}

  for (const row of rows) {
    const sid = row.schedule_id
    const uid = row.user_id

    // ── Events ──────────────────────────────────────────────────────────────
    const schedule = row.schedule
    if (schedule?.id && !seen.has(schedule.id)) {
      seen.add(schedule.id)

      // Enrich host info từ participant nếu có
      const enrichedSchedule: WorkSchedule = {
        ...schedule,
        host: row.participant
          ? getUserDisplayName(row.participant)
          : schedule.host,
      }

      const event = mapWorkScheduleToWorkEvent(enrichedSchedule)
      if (event.id) events.push(event)
    }

    // ── Participants ───────────────────────────────────────────────────────
    if (sid && uid) {
      if (!participantsBySchedule[sid]) participantsBySchedule[sid] = []
      participantsBySchedule[sid].push({
        schedule_id: sid,
        user_id: uid,
        displayName: resolveParticipantName(row, userMap),
      })
    }
  }

  return { events, participantsBySchedule }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public: parse API responses with full type safety
// ─────────────────────────────────────────────────────────────────────────────

/** Parse /scheduleParticipant response + userMap → ParsedScheduleData */
export function parseScheduleParticipantResponse(
  data: unknown,
  userMap: Record<string, string>
): ParsedScheduleData {
  const response = data as PaginatedResponse<RawParticipant> | undefined
  const rows = extractRows(response?.responseData)
  return parseParticipantRows(rows, userMap)
}

/** Parse /user response → userMap */
export function parseUserListResponse(data: unknown): Record<string, string> {
  const response = data as PaginatedResponse<RawUser> | undefined
  const rows = extractRows(response?.responseData)
  return buildUserMap(rows)
}
