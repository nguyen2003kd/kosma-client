import React, { memo } from 'react';
import { OrgNode } from '@/types/organization';
import { resolveAvatarSrc } from '@/lib/organization';

const Avatar = memo(function Avatar({
  fullName,
  avatarUrl,
  size = 'md',
}: {
  fullName: string;
  avatarUrl?: string | null;
  size?: 'md' | 'lg';
}) {
  const avatarSrc = resolveAvatarSrc(avatarUrl);
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const sizeClasses = size === 'lg' ? 'h-20 w-20 text-xl' : 'h-14 w-14 text-sm';

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ${sizeClasses}`}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={fullName}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-bold text-slate-500">{initials || 'NA'}</span>
      )}
    </div>
  );
});

const OrgTreeNode = memo(function OrgTreeNode({
  node,
  isRoot = false,
  index = 0,
  siblingsCount = 1,
}: {
  node: OrgNode;
  isRoot?: boolean;
  index?: number;
  siblingsCount?: number;
}) {
  const hasChildren = node.children.length > 0;
  const isFirst = index === 0;
  const isLast = index === siblingsCount - 1;
  const isOnly = siblingsCount === 1;

  return (
    <li className="relative flex flex-col items-center px-4 pt-10">
      {/* Connector: Horizontal line portion */}
      {!isRoot && !isOnly && (
        <>
          <div
            className={`absolute right-[50%] top-0 h-px bg-slate-300 ${isFirst ? 'hidden' : 'w-[50%]'}`}
          />
          <div
            className={`absolute left-[50%] top-0 h-px bg-slate-300 ${isLast ? 'hidden' : 'w-[50%]'}`}
          />
        </>
      )}

      {/* Connector: Vertical line up from card */}
      {!isRoot && (
        <span className="absolute -top-0 left-1/2 -ml-px h-10 w-px bg-slate-300" />
      )}

      {/* Node card */}
      <div className="group relative z-10 w-72 rounded-xl border border-slate-200 bg-white p-0 text-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:ring-2 hover:ring-blue-100">
        <div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-blue-500 to-indigo-600" />

        <div className="px-5 pb-5 pt-6">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <Avatar fullName={node.full_name} avatarUrl={node.avatar_url} size="lg" />
              {hasChildren && (
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                  {node.children.length}
                </div>
              )}
            </div>
          </div>

          <h3 className="mb-1 line-clamp-1 text-base font-bold text-slate-900" title={node.full_name}>
            {node.full_name}
          </h3>

          <div className="mb-3 flex justify-center">
            <span className="line-clamp-1 rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
              {node.position}
            </span>
          </div>

          <p className="line-clamp-2 min-h-[1.25rem] text-xs font-medium text-slate-500">
            {node.department_name}
          </p>
        </div>
      </div>

      {hasChildren && (
        <>
          <span className="h-10 w-px bg-slate-300" />
          <ul className="relative flex flex-nowrap pt-0">
            {node.children.map((child, idx) => (
              <OrgTreeNode
                key={child.id}
                node={child}
                index={idx}
                siblingsCount={node.children.length}
              />
            ))}
          </ul>
        </>
      )}
    </li>
  );
});

export function OrgTree({ data }: { data: OrgNode[] }) {
  return (
    <ul className="flex flex-wrap justify-center">
      {data.map((node) => (
        <OrgTreeNode key={node.id} node={node} isRoot={true} />
      ))}
    </ul>
  );
}
