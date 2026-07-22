export type MenuItem ={
  id: string
  name: string
  type: string
  content_type: string
  badge?: string | number
  link: string
  sequence: number
  display?: boolean
  parent_id: string | null
  children?: MenuItem[]
}