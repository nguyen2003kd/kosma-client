'use client'

import { useState, useMemo } from 'react'
import { extractRows } from '../parsers'
import { useGetApiV10WorkSchedule } from '@/api/endpoints/work-schedule'
import { useGetApiV10ScheduleParticipant } from '@/api/endpoints/schedule-participant'
import { mapWorkScheduleToWorkEvent } from '@/types/work-schedule'
import type { WorkEvent } from '@/types/work-schedule'
import type { ParticipantInfo, PaginatedResponse, RawParticipant } from '../types'
import type { WorkSchedule } from '@/types/work-schedule'

// ─────────────────────────────────────────────────────────────────────────────
// Public contract
// ─────────────────────────────────────────────────────────────────────────────

export interface UseWorkScheduleReturn {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  events: WorkEvent[]
  isLoading: boolean
  isFetching: boolean
  isLoadingParticipants: boolean
  participantsBySchedule: Record<string, ParticipantInfo[]>
  handleSelectDate: (date: Date) => void
  handleMonthChange: (date: Date) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useWorkSchedule(): UseWorkScheduleReturn {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(() => new Date())

  // ── 2 API song song, cả 2 đều public (không cần auth) ───────────────────
  const schedulesQuery = useGetApiV10WorkSchedule({ pageSize: 500 })
  const participantsQuery = useGetApiV10ScheduleParticipant({ pageSize: 500 })

  // ── Parse events từ /workSchedule ────────────────────────────────────────
  const events = useMemo<WorkEvent[]>(() => {
    const rows = extractRows(
      (schedulesQuery.data as PaginatedResponse<WorkSchedule> | undefined)?.responseData
    )
    return rows
      .map((s) => mapWorkScheduleToWorkEvent(s))
      .filter((e) => !!e.id)
  }, [schedulesQuery.data])

  // ── Parse participantsBySchedule từ /scheduleParticipant ─────────────────
  const participantsBySchedule = useMemo<Record<string, ParticipantInfo[]>>(() => {
    const rows = extractRows(
      (participantsQuery.data as PaginatedResponse<RawParticipant> | undefined)?.responseData
    )
    const result: Record<string, ParticipantInfo[]> = {}
    for (const row of rows) {
      const sid = row.schedule_id
      const uid = row.user_id
      if (!sid || !uid) continue
      if (!result[sid]) result[sid] = []
      result[sid].push({
        schedule_id: sid,
        user_id: uid,
        displayName: uid, // public page chỉ cần đếm, không cần tên
      })
    }
    return result
  }, [participantsQuery.data])

  const handleSelectDate = (date: Date) => setSelectedDate(date)
  const handleMonthChange = (date: Date) => setCurrentDate(date)

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    events,
    isLoading: schedulesQuery.isLoading,
    isFetching: schedulesQuery.isFetching,
    isLoadingParticipants: participantsQuery.isLoading,
    participantsBySchedule,
    handleSelectDate,
    handleMonthChange,
  }
}
