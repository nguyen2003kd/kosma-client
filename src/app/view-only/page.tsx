'use client';

import React, { useMemo, useState } from 'react';
import { Loader2, Maximize, Network, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { OrgTree } from '@/components/features/organization/OrgTree';
import { useGetApiV10OrganizationChart } from '@/api/endpoints/organization-chart';
import { mapApiNodeToOrgNode } from '@/lib/organization';
import { ApiOrgNode } from '@/types/organization';

export default function OrganizationalChartViewOnlyPage() {
  const { t } = useTranslation('pages/about');
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const orgQuery = useGetApiV10OrganizationChart({
    query: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  });

  const treeData = useMemo(() => {
    const roots =
      (orgQuery.data as { responseData?: ApiOrgNode[] } | undefined)?.responseData || [];

    if (!Array.isArray(roots)) return [];
    return roots.map(mapApiNodeToOrgNode);
  }, [orgQuery.data]);

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-50">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating Header */}
      <div className="absolute left-6 top-6 z-20 max-w-md rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg backdrop-blur-sm sm:max-w-lg">
        <h1 className="flex items-center text-xl font-bold tracking-tight text-slate-900">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-200">
            <Network className="h-5 w-5" />
          </div>
          {t("orgChartTitle")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("orgChartDesc")}
        </p>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 active:bg-blue-50"
          title={t("zoomIn")}
          onClick={() => setZoom((prev) => Math.min(2, Number((prev + 0.1).toFixed(2))))}
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 active:bg-blue-50"
          title={t("zoomOut")}
          onClick={() => setZoom((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(2))))}
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <div className="my-1 h-px w-full bg-slate-200" />
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 active:bg-blue-50"
          title={t("reset")}
          onClick={resetZoom}
        >
          <Maximize className="h-5 w-5" />
        </button>
        <div className="mt-1 text-center text-[10px] font-bold text-slate-400">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Main Chart Area */}
      <div 
        className="flex h-full w-full cursor-grab items-start justify-center overflow-auto p-20 active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="transition-transform duration-75 ease-out"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'top center'
          }}
        >
          {orgQuery.isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-2xl bg-white/50 px-8 py-4 backdrop-blur-sm">
              <Loader2 className="mr-3 h-5 w-5 animate-spin text-blue-600" />
              <span className="font-medium text-slate-600">{t("loadingData")}</span>
            </div>
          ) : orgQuery.isError ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-red-100 bg-red-50/90 px-8 py-4 text-red-600 shadow-sm backdrop-blur-sm">
              {t("loadError")}
            </div>
          ) : treeData.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-8 py-4 text-slate-500 shadow-sm backdrop-blur-sm">
              {t("noOrgData")}
            </div>
          ) : (
            <OrgTree data={treeData} />
          )}
        </div>
      </div>
    </div>
  );
}