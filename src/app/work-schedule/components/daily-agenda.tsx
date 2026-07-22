'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, FileText, MapPin, User, Users } from 'lucide-react';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { formatTimeFromISO } from '../types';
import type { ParticipantInfo, WorkEvent, WorkPeriod } from '../types';

interface DailyAgendaProps {
  selectedDate: Date;
  events: WorkEvent[];
  participantsBySchedule?: Record<string, ParticipantInfo[]>;
}

export function DailyAgenda({
  selectedDate,
  events,
  participantsBySchedule = {},
}: DailyAgendaProps) {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language?.startsWith('en') ? enUS : vi;
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  const dayEvents = events.filter((e) => e.date === formattedDate);

  const morningEvents = dayEvents.filter((e) => e.period === 'morning').sort((a, b) => a.startTime.localeCompare(b.startTime));
  const afternoonEvents = dayEvents.filter((e) => e.period === 'afternoon').sort((a, b) => a.startTime.localeCompare(b.startTime));

  const renderEventCard = (event: WorkEvent, periodType: WorkPeriod) => {
    const isMorning = periodType === 'morning';

    return (
      <div
        key={event.id}
        className={cn(
          "group relative flex w-full flex-col overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:shadow-md dark:hover:shadow-black/50 bg-white dark:bg-zinc-900/40",
          isMorning ? "border-orange-100 hover:border-orange-300 dark:border-orange-900/20 dark:hover:border-orange-800/40" : "border-blue-100 hover:border-blue-300 dark:border-blue-900/20 dark:hover:border-blue-800/40"
        )}
      >
        <div className={cn(
          "absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-20",
          isMorning ? "bg-orange-500" : "bg-blue-500"
        )} />

        <div className="relative z-10 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex md:flex-col md:w-32 shrink-0 items-center md:items-start gap-3 md:gap-1">
             <div className={cn(
               "flex h-12 w-12 items-center justify-center rounded-xl md:h-14 md:w-14",
               isMorning ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
             )}>
                <Clock className="h-6 w-6 md:h-7 md:w-7" />
             </div>
             <div className="flex flex-col gap-1">
               <div className="flex flex-col">
                 <span className="text-xs text-slate-500 dark:text-zinc-500 uppercase font-medium">{t("workSchedule.startTime")}</span>
                 <span className="font-bold text-slate-900 dark:text-zinc-100 text-base md:text-lg">
                   {formatTimeFromISO(event.schedule_time)}
                 </span>
               </div>
               {event.endTime && (
                 <div className="flex flex-col pt-1 border-t border-slate-200 dark:border-zinc-700">
                   <span className="text-xs text-slate-500 dark:text-zinc-500 uppercase font-medium">{t("workSchedule.endTime")}</span>
                   <span className="font-bold text-slate-900 dark:text-zinc-100 text-base md:text-lg">
                     {event.endTime}
                   </span>
                 </div>
               )}
             </div>
          </div>

          <div className="flex-1 space-y-3">
            <h4 className="text-lg font-bold text-slate-900 dark:text-zinc-100 leading-tight">
              {event.title}
            </h4>

            {event.description && (
              <p className="text-sm text-slate-600 dark:text-zinc-400 md:text-base leading-relaxed">
                {event.description}
              </p>
            )}

            {event.tasks && (
              <div className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 px-3 py-2 text-sm">
                <span className="shrink-0 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mt-0.5">{t("workSchedule.tasks")}</span>
                <span className="text-slate-700 dark:text-blue-200 leading-relaxed">{event.tasks}</span>
              </div>
            )}

            <div className="flex flex-col  gap-4 text-sm font-medium text-slate-600 dark:text-zinc-400 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-md">
                <User className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="line-clamp-2">{t("workSchedule.hostedBy")} <span className="font-semibold text-slate-900 dark:text-zinc-200">{event.host}</span></span>
              </div>
              <div className="flex items-start gap-1.5 bg-slate-50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-md">
                <Users className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                <div className="flex-1 min-w-0">
                  {event.participants ? (
                    <span className="text-blue-600 dark:text-blue-400 break-words">
                      {event.participants}
                    </span>
                  ) : Array.isArray(participantsBySchedule[event.id]) && participantsBySchedule[event.id].length > 0 ? (
                    <span className="text-blue-600 dark:text-blue-400 break-words">
                      {participantsBySchedule[event.id].map((p) => p.displayName).join(', ')}
                    </span>
                  ) : (
                    <span className="italic text-slate-400 dark:text-zinc-500">{t("workSchedule.noParticipants")}</span>
                  )}
                </div>
              </div>
              {event.location && (
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-md">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="truncate max-w-[150px]">{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={formattedDate}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex w-full flex-col"
      >
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:bg-blue-600/20 dark:text-blue-400 dark:shadow-none">
            <CalendarIcon className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: dateLocale })}
            </h3>
          </div>
        </div>

        <div className="space-y-10">
          {/* Sáng Section */}
          <div className="relative pl-6 sm:pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-orange-100 dark:bg-orange-900/30" />
            <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full ring-4 ring-orange-50 bg-orange-500 dark:ring-orange-900/20" />
            <h4 className="mb-6 text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest flex items-center gap-2">
              {t("workSchedule.morning")} {morningEvents.length > 0 && <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full text-xs">{morningEvents.length}</span>}
            </h4>
            
            <div className="grid gap-4">
              {morningEvents.length > 0 ? (
                morningEvents.map((event) => renderEventCard(event, 'morning'))
              ) : (
                <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/60 bg-white/50 py-10 text-slate-400 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-500">
                  <FileText className="mb-3 h-8 w-8 opacity-40" />
                  <span className="text-sm font-medium">{t("workSchedule.noMorningEvents")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Chiều Section */}
          <div className="relative pl-6 sm:pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-100 dark:bg-blue-900/30" />
            <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full ring-4 ring-blue-50 bg-blue-500 dark:ring-blue-900/20" />
            <h4 className="mb-6 text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
              {t("workSchedule.afternoon")} {afternoonEvents.length > 0 && <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs">{afternoonEvents.length}</span>}
            </h4>
            
            <div className="grid gap-4">
              {afternoonEvents.length > 0 ? (
                afternoonEvents.map((event) => renderEventCard(event, 'afternoon'))
              ) : (
                <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/60 bg-white/50 py-10 text-slate-400 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-500">
                  <FileText className="mb-3 h-8 w-8 opacity-40" />
                  <span className="text-sm font-medium">{t("workSchedule.noAfternoonEvents")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
