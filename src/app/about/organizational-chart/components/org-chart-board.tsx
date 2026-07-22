'use client';

import React, { useRef, useState, useCallback, useMemo } from 'react';
import type { OrgNode } from '@/types/organizational-chart';
import { OrgChartNode } from './org-chart-node';

interface OrgChartBoardProps {
  data: OrgNode[];
  onViewNode: (node: OrgNode) => void;
  canViewDetail: boolean;
  scale: number;
  bgColor?: string;
}

export function OrgChartBoard({
  data,
  onViewNode,
  canViewDetail,
  scale,
  bgColor = '#f9fafb',
}: OrgChartBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const scrollOrigin = useRef({ left: 0, top: 0 });

  const canvasBounds = useMemo(() => {
    let maxX = 0;
    let maxY = 0;
    for (const node of data) {
      const x = (node.coordinates?.x ?? 0) + (node.size?.width ?? 180) + 120;
      const y = (node.coordinates?.y ?? 0) + (node.size?.height ?? 90) + 120;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    return { width: Math.max(maxX, 1200), height: Math.max(maxY, 700) };
  }, [data]);

  const handleContainerMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-node-wrapper]')) return;
    if (e.button !== 0) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      scrollOrigin.current = {
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop,
      };
    }
  }, []);

  const handleContainerMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !containerRef.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    containerRef.current.scrollLeft = scrollOrigin.current.left - dx;
    containerRef.current.scrollTop = scrollOrigin.current.top - dy;
  }, [isPanning]);

  const handleContainerMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-240px)] min-h-[560px] w-full overflow-auto rounded-3xl border border-gray-200 shadow-inner active:cursor-grabbing dark:border-gray-800"
      style={{ backgroundColor: bgColor }}
      onMouseDown={handleContainerMouseDown}
      onMouseMove={handleContainerMouseMove}
      onMouseUp={handleContainerMouseUp}
      onMouseLeave={handleContainerMouseUp}
    >
      <div
        className="relative"
        style={{
          width: canvasBounds.width,
          height: canvasBounds.height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          willChange: 'transform',
        }}
      >
        {data.map((node) => (
          <OrgChartNode
            key={node.id}
            node={node}
            position={{ x: node.coordinates?.x ?? 0, y: node.coordinates?.y ?? 0 }}
            onViewNode={onViewNode}
            canViewDetail={canViewDetail}
          />
        ))}
      </div>
    </div>
  );
}
