'use client'

import React, { useState, useEffect } from 'react'
import { Loader2, Maximize, Network, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrgChartBoard } from './components/org-chart-board'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

import baseConfig from '@configs/base'
import { useOrgChart } from './hooks'

const resolveAvatarSrc = (value?: string | null): string | undefined => {
  if (!value) return undefined
  if (/^https?:\/\//i.test(value)) return value
  if (value.startsWith('/')) return `${baseConfig.imgEndpointDomain}${value}`
  return `${baseConfig.imgEndpointDomain}/${value}`
}

export default function OrganizationalChartPage() {
  const {
    viewingNode,
    setViewingNode,
    zoom,
    setZoom,
    nodes,
    isLoading,
    handleViewNode,
  } = useOrgChart()

  const [dialogImgError, setDialogImgError] = useState(false)

  useEffect(() => {
    setDialogImgError(false)
  }, [viewingNode?.avatar_url])

  return (
    <div className="flex h-full min-h-[calc(100vh-theme(spacing.16))] flex-col space-y-6 bg-gray-50/30 p-4 md:p-8 dark:bg-gray-950/30">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
            <Network className="mr-3 h-7 w-7 md:h-8 md:w-8 text-blue-600 dark:text-blue-500" />
            Sơ đồ Tổ chức
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">
            Xem sơ đồ tổ chức và cơ cấu nhân sự.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline" size="icon" className="h-8 w-8 rounded-full"
          title="Phóng to"
          onClick={() => setZoom((prev) => Math.min(2, Number((prev + 0.1).toFixed(2))))}
        >
          <ZoomIn className="h-4 w-4 text-gray-600" />
        </Button>
        <Button
          variant="outline" size="icon" className="h-8 w-8 rounded-full"
          title="Thu nhỏ"
          onClick={() => setZoom((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(2))))}
        >
          <ZoomOut className="h-4 w-4 text-gray-600" />
        </Button>
        <Button
          variant="outline" size="icon" className="h-8 w-8 rounded-full"
          title="Vừa màn hình"
          onClick={() => setZoom(1)}
        >
          <Maximize className="h-4 w-4 text-gray-600" />
        </Button>
        <div className="ml-2 rounded-md border px-2 py-1 text-xs text-gray-600 bg-white">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      <div className="flex-1 w-full overflow-hidden">
        {isLoading ? (
          <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400 mr-2" />
            <p className="text-gray-500">Đang tải sơ đồ tổ chức...</p>
          </div>
        ) : nodes.length > 0 ? (
          <OrgChartBoard
            data={nodes}
            onViewNode={handleViewNode}
            canViewDetail={true}
            scale={zoom}
          />
        ) : (
          <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <p className="text-gray-500">Chưa có dữ liệu sơ đồ tổ chức.</p>
          </div>
        )}
      </div>

      <Dialog open={!!viewingNode} onOpenChange={(open) => !open && setViewingNode(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          {viewingNode && (() => {
            const initials = (viewingNode.full_name || '')
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()

            return (
              <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
                {viewingNode.avatar_url && !dialogImgError && (
                  <img
                    src={resolveAvatarSrc(viewingNode.avatar_url)}
                    alt={viewingNode.full_name}
                    loading="eager"
                    decoding="async"
                    crossOrigin="anonymous"
                    onError={() => setDialogImgError(true)}
                    className="h-auto w-full object-contain"
                  />
                )}
                <div
                  className={`flex flex-col items-center justify-center gap-3 px-8 py-16 ${
                    !viewingNode.avatar_url || dialogImgError ? '' : 'hidden'
                  }`}
                >
                  <span className="text-8xl font-extrabold text-white tracking-wider">
                    {initials}
                  </span>
                  <p className="text-xl font-semibold text-white/80 uppercase tracking-wide">
                    {viewingNode.full_name}
                  </p>
                  <p className="text-base text-white/60 uppercase tracking-wider">
                    {viewingNode.position}
                  </p>
                </div>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>

    </div>
  )
}
