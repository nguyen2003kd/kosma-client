'use client'

import React, { useMemo } from 'react'
import {
  useGetApiV10OrganizationChart,
} from '@/api/endpoints/organization-chart'
import {
  type OrgNode,
  mapApiNodeToOrgNode,
} from '@/types/organizational-chart'

export interface UseOrgChartReturn {
  // Permissions - all disabled for read-only
  canViewDetail: boolean
  canDeletePersonnel: boolean
  canEditPersonnel: boolean
  canDropPersonnel: boolean
  canCreateRootNode: boolean

  // State (kept for compatibility)
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  editingNode: OrgNode | null
  setEditingNode: (node: OrgNode | null) => void

  deleteConfirmOpen: boolean
  setDeleteConfirmOpen: (open: boolean) => void
  pendingDeleteIdRef: React.MutableRefObject<string | null>

  viewingNode: OrgNode | null
  setViewingNode: (node: OrgNode | null) => void

  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>

  // Data
  nodes: OrgNode[]
  isLoading: boolean
  isFetching: boolean
  isMutating: boolean
  isUpdating: boolean

  // Actions (stubs for compatibility)
  handleCreateRoot: () => void
  handleEditNode: (node: OrgNode) => void
  handleDeleteNode: (id: string) => void
  handleDeleteNodeConfirm: () => Promise<void>
  handleFormSubmit: (data: unknown) => Promise<void>
  handleViewNode: (node: OrgNode) => void
  handleSavePosition: (nodeId: string, x: number, y: number) => Promise<void>
  handleUpdateStyle: (nodeId: string, color: string | null, width: number, height: number) => Promise<void>
}

export function useOrgChart(): UseOrgChartReturn {
  // Permissions — all disabled for read-only mode
  const canViewDetail = true
  const canDeletePersonnel = false
  const canEditPersonnel = false
  const canDropPersonnel = false
  const canCreateRootNode = false

  // State (kept for compatibility)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingNode, setEditingNode] = React.useState<OrgNode | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false)
  const pendingDeleteIdRef = React.useRef<string | null>(null)
  const [viewingNode, setViewingNode] = React.useState<OrgNode | null>(null)
  const [zoom, setZoom] = React.useState(1)

  // Queries
  const orgQuery = useGetApiV10OrganizationChart({
    query: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  })

  // Flat array data
  const nodes: OrgNode[] = useMemo(() => {
    const data =
      (orgQuery.data as { responseData?: unknown[] } | undefined)?.responseData || []
    if (!Array.isArray(data)) return []
    return (data as unknown[]).map((node) =>
      mapApiNodeToOrgNode(node as Parameters<typeof mapApiNodeToOrgNode>[0])
    )
  }, [orgQuery.data])

  const isMutating = false
  const isUpdating = false

  // Stubs — no-op for read-only mode
  const handleCreateRoot = React.useCallback(() => {}, [])
  const handleEditNode = React.useCallback(() => {}, [])
  const handleDeleteNode = React.useCallback(() => {}, [])
  const handleDeleteNodeConfirm = React.useCallback(async () => {}, [])
  const handleFormSubmit = React.useCallback(async () => {}, [])
  const handleViewNode = React.useCallback(
    (node: OrgNode) => setViewingNode(node),
    [],
  )
  const handleSavePosition = React.useCallback(async () => {}, [])
  const handleUpdateStyle = React.useCallback(async () => {}, [])

  return {
    canViewDetail,
    canDeletePersonnel,
    canEditPersonnel,
    canDropPersonnel,
    canCreateRootNode,
    isDialogOpen,
    setIsDialogOpen,
    editingNode,
    setEditingNode,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    pendingDeleteIdRef,
    viewingNode,
    setViewingNode,
    zoom,
    setZoom,
    nodes,
    isLoading: orgQuery.isLoading,
    isFetching: orgQuery.isFetching,
    isMutating,
    isUpdating,
    handleCreateRoot,
    handleEditNode,
    handleDeleteNode,
    handleDeleteNodeConfirm,
    handleFormSubmit,
    handleViewNode,
    handleSavePosition,
    handleUpdateStyle,
  }
}
