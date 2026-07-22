'use client'

import { FallbackSpinner } from '@/components/ui/fallbackspinner'
import { DailyAgenda } from './components/daily-agenda'
import { WorkScheduleCalendar } from './components/work-schedule-calendar'
import { useWorkSchedule } from './hooks'

export default function WorkSchedulePage() {
  const {
    currentDate,
    selectedDate,
    events,
    isLoading,
    participantsBySchedule,
    handleSelectDate,
    handleMonthChange,
  } = useWorkSchedule()

  return (
    <div className="flex h-full min-h-[calc(100vh-theme(spacing.16))] flex-col space-y-8 bg-slate-50/50 p-6 md:p-8 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Lịch Công Tác
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quản lý và theo dõi lịch trình làm việc, sự kiện và cuộc họp.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      {isLoading ? (
        <div className="flex h-[400px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 dark:border-zinc-800 dark:bg-zinc-900/20">
          <FallbackSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-10">
          {/* Calendar Section */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <WorkScheduleCalendar
              currentDate={currentDate}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              onMonthChange={handleMonthChange}
              events={events}
            />
          </div>

          {/* Agenda Section */}
          <div className="lg:col-span-7 xl:col-span-8">
            {selectedDate && (
              <DailyAgenda
                selectedDate={selectedDate}
                events={events}
                participantsBySchedule={participantsBySchedule}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
