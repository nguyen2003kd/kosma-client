'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface IconPickerProps {
  value?: string
  onChange: (iconName: string) => void
  className?: string
}

interface IconItem {
  kebabName: string
  pascalName: string
  keywords: string[]
}

// const excludedKeys = new Set(['createLucideIcon', 'default', 'icons', 'aliases', 'dynamicIconImports'])

const aliasMap: Record<string, string[]> = {
  setting: ['settings', 'setting', 'gear', 'cog', 'cogs', 'config', 'configure', 'preferences', 'preference'],
  system: ['settings', 'setting', 'gear', 'cog', 'cogs', 'system', 'tools', 'wrench', 'sliders', 'sliders-horizontal'],
  config: ['settings', 'setting', 'sliders', 'sliders-horizontal', 'sliders-vertical'],
  phone: ['phone', 'phone-call', 'phone-forwarded', 'phone-incoming', 'phone-outgoing', 'phone-missed', 'phone-off', 'telephone'],
  mail: ['mail', 'mailbox', 'inbox', 'email', 'send', 'send-horizontal'],
  message: ['message-square', 'message-circle', 'message-circle-2', 'message-circle-dashed', 'message-circle-plus', 'messages-square', 'chat', 'chat-circle', 'chat-bubble', 'speech'],
  chat: ['message-square', 'message-circle', 'messages-square', 'chat', 'chat-bubble', 'chat-circle'],
  money: ['dollar-sign', 'euro', 'pound-sign', 'yen', 'bitcoin', 'coins', 'coin', 'credit-card', 'wallet', 'banknote', 'cash', 'currency'],
  card: ['credit-card', 'gift', 'wallet', 'banknote'],
  file: ['file', 'file-text', 'file-plus', 'file-minus', 'file-edit', 'file-x', 'file-search', 'file-code', 'file-json', 'files', 'document', 'docs'],
  folder: ['folder', 'folder-open', 'folder-plus', 'folder-minus', 'folder-x', 'archive', 'package', 'directories'],
  image: ['image', 'images', 'photo', 'picture', 'gallery', 'camera', 'aperture', 'frame'],
  video: ['video', 'video-off', 'videotape', 'film', 'clapperboard', 'tv', 'tv-2'],
  check: ['check', 'check-circle', 'check-circle-2', 'check-square', 'check-square-2', 'checks', 'verified', 'badge-check'],
  trash: ['trash', 'trash-2', 'trash-can'],
  edit: ['edit', 'edit-2', 'edit-3', 'pencil', 'pen', 'write', 'note'],
  lock: ['lock', 'lock-keyhole', 'lock-square', 'password', 'shield', 'shield-check', 'shield-alert'],
  globe: ['globe', 'globe-2', 'world', 'international', 'web'],
  user: ['user', 'users', 'user-plus', 'user-minus', 'user-check', 'user-x', 'user-circle', 'person', 'people', 'contact'],
  build: ['building', 'building-2', 'factory', 'office', 'company', 'store', 'shop'],
  heart: ['heart', 'heart-handshake', 'heart-pulse', 'heart-crack', 'heart-off'],
  star: ['star', 'star-half', 'star-half-2'],
  search: ['search', 'find', 'magnifying'],
  bell: ['bell', 'bell-ring', 'bell-plus', 'bell-minus', 'bell-off', 'notification', 'notifications', 'alert'],
  flag: ['flag', 'flag-pennant', 'bookmark', 'bookmark-check', 'tag', 'tags', 'label'],
  home: ['home', 'home-2', 'house', 'house-2'],
  map: ['map', 'map-pin', 'map-pin-2', 'navigation', 'compass', 'location', 'gps', 'pin'],
  play: ['play', 'play-circle', 'pause', 'stop', 'skip', 'rewind', 'fast-forward', 'shuffle', 'repeat'],
  save: ['save', 'floppy', 'download', 'upload'],
  print: ['printer', 'scan', 'print'],
  shield: ['shield', 'shield-check', 'shield-alert', 'shield-question', 'shield-x', 'shield-plus', 'lock'],
  link: ['link', 'link-2', 'link-2', 'chain', 'chain-link', 'unlink'],
  plus: ['plus', 'plus-circle', 'plus-square', 'add', 'create', 'new'],
  minus: ['minus', 'minus-circle', 'minus-square', 'remove', 'delete', 'subtract'],
  eye: ['eye', 'eye-off', 'visible', 'view', 'show', 'hide'],
  code: ['code', 'code-2', 'terminal', 'code-square', 'bracket', 'brackets', 'angle'],
  server: ['server', 'server-2', 'database', 'hard-drive', 'cpu', 'cluster'],
  cloud: ['cloud', 'cloud-sun', 'cloud-moon', 'cloud-rain', 'cloud-snow', 'cloud-lightning'],
  sun: ['sun', 'sunrise', 'sunset', 'sun-medium', 'sun-dim', 'brightness'],
  moon: ['moon', 'night'],
  gift: ['gift', 'present'],
  fire: ['flame', 'flame-kindling', 'crown', 'trophy'],
  tool: ['wrench', 'wrench-2', 'hammer', 'screwdriver', 'tools', 'tool'],
  alert: ['alert-circle', 'alert-triangle', 'alert-octagon', 'warning', 'info', 'error', 'danger'],
  info: ['info', 'information', 'help', 'help-circle', 'question'],
  network: ['network', 'networking', 'wifi', 'bluetooth', 'radio', 'signal'],
  activity: ['activity', 'pulse', 'trending-up', 'trending-down', 'chart', 'bar-chart', 'pie-chart'],
  calendar: ['calendar', 'calendar-2', 'calendar-check', 'calendar-plus', 'calendar-x', 'date', 'schedule', 'clock'],
  clock: ['clock', 'clock-2', 'clock-3', 'clock-4', 'time', 'hour'],
  alarm: ['alarm-clock', 'timer', 'hourglass'],
}

function pascalToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase()
}

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function tokenize(value: string): string[] {
  return value.toLowerCase().split(/[\s\-_]+/).filter(Boolean)
}

function buildKeywords(kebabName: string, pascalName: string): string[] {
  const parts = kebabName.split('-')
  const allTokens = new Set([...parts])

  allTokens.add(kebabName)
  allTokens.add(pascalName)
  allTokens.add(pascalName.toLowerCase())

  for (const part of parts) {
    if (part) allTokens.add(part)
  }

  const camelMatch = kebabName.match(/[a-z]+/g)
  if (camelMatch) {
    for (const m of camelMatch) allTokens.add(m)
  }

  return Array.from(allTokens).filter(Boolean)
}

function matchesSearch(icon: IconItem, rawSearch: string): { pass: boolean; score: number } {
  if (!rawSearch.trim()) return { pass: true, score: 1 }

  const searchTokens = tokenize(rawSearch)

  let score = 0
  for (const token of searchTokens) {
    let tokenMatched = false

    if (icon.keywords.includes(token)) {
      score += 10
      tokenMatched = true
    }

    if (!tokenMatched && aliasMap[token]) {
      const aliases = aliasMap[token]
      for (const alias of aliases) {
        if (icon.keywords.includes(alias) || icon.keywords.some((k) => k.includes(alias) || alias.includes(k))) {
          score += 5
          tokenMatched = true
          break
        }
      }
    }

    if (!tokenMatched) {
      if (icon.keywords.some((k) => k.startsWith(token) || token.startsWith(k))) {
        score += 3
        tokenMatched = true
      }
    }

    if (!tokenMatched) {
      if (icon.keywords.some((k) => k.includes(token))) {
        score += 1
        tokenMatched = true
      }
    }

    if (!tokenMatched) return { pass: false, score: 0 }
  }

  return { pass: true, score }
}

function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) return LucideIcons.HelpCircle

  const pascalName = kebabToPascal(iconName)
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  return icons[pascalName] || LucideIcons.HelpCircle
}

export function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  const IconComponent = getIconComponent(name)
  return <IconComponent className={className} />
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const iconList = useMemo<IconItem[]>(() => {
    return Object.keys(LucideIcons)
      .filter(
        (key) =>
          !['createLucideIcon', 'default', 'icons', 'aliases', 'dynamicIconImports'].includes(key) &&
          /^[A-Z]/.test(key) &&
          !key.endsWith('Icon')
      )
      .sort()
      .map((pascalName) => ({
        kebabName: pascalToKebab(pascalName),
        pascalName,
        keywords: buildKeywords(pascalToKebab(pascalName), pascalName),
      }))
  }, [])

  const filteredIcons = useMemo(() => {
    const results = iconList
      .map((icon) => ({ icon, result: matchesSearch(icon, search) }))
      .filter(({ result }) => result.pass)
      .sort((a, b) => b.result.score - a.result.score)

    return results.map(({ icon }) => icon)
  }, [iconList, search])

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const SelectedIcon = getIconComponent(value)

  const handleSelect = (iconName: string) => {
    onChange(iconName)
    setOpen(false)
    setSearch('')
  }

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <Button
        type='button'
        variant='outline'
        role='combobox'
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className='h-10 w-full justify-between bg-white'
      >
        <div className='flex min-w-0 items-center gap-2'>
          <SelectedIcon className='h-5 w-5 shrink-0' />
          <span className='truncate'>{value || 'Chọn icon'}</span>
        </div>
        <LucideIcons.ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
      </Button>

      {open && (
        <div className='absolute left-0 top-full z-50 mt-1 w-[400px] rounded-md border bg-popover text-popover-foreground shadow-md'>
          <div className='border-b p-3'>
            <Input
              autoFocus
              placeholder='Tìm kiếm icon... (VD: system, setting, phone, message)'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='h-9'
            />
            <p className='mt-2 text-xs text-gray-500'>
              Tìm thấy {filteredIcons.length} / {iconList.length} icons
            </p>
          </div>
          <ScrollArea className='h-[300px]'>
            {filteredIcons.length > 0 ? (
              <div className='grid grid-cols-6 gap-2 p-3'>
                {filteredIcons.map((icon) => {
                  const IconComponent = getIconComponent(icon.kebabName)

                  return (
                    <button
                      key={icon.kebabName}
                      type='button'
                      onClick={() => handleSelect(icon.kebabName)}
                      className={cn(
                        'flex h-12 w-full items-center justify-center rounded-md border border-gray-200 transition-colors hover:bg-gray-100',
                        value === icon.kebabName && 'border-primary bg-primary/10'
                      )}
                      title={icon.kebabName}
                    >
                      <IconComponent className='h-5 w-5' />
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className='py-6 text-center text-sm text-gray-500'>Không tìm thấy icon &quot;{search}&quot;</div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export { IconPicker as LucideIconPicker }
