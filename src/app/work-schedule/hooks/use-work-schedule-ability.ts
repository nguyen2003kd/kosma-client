import { useAbility } from '@/hooks/use-ability'

const RESOURCE = 'work-schedule'


export function useCanViewWorkSchedule(): boolean {
  const ability = useAbility()
  return ability.can('view', RESOURCE) || ability.can('manage', 'all')
}
