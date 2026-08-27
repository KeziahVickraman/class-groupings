import React from 'react';
import { ClassGroup } from '../types';

interface GroupHoverTooltipProps {
  group: ClassGroup;
  highlightQuery?: string;
}

export const GroupHoverTooltip: React.FC<GroupHoverTooltipProps> = ({
  group,
  highlightQuery = '',
}) => {
  const highlightText = (text: string) => {
    if (!highlightQuery.trim()) return text;
    const regex = new RegExp(`(${highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200 text-slate-900 rounded px-0.5 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      id={`hover-tooltip-${group.id}`}
      className="w-64 bg-white/95 backdrop-blur-sm text-slate-800 rounded-xl shadow-xl border border-slate-200 p-3 pointer-events-none transition-all duration-150 z-50 text-left"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <span className="font-bold text-slate-900 text-sm tracking-tight">
          {group.name}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          {group.members.length} members
        </span>
      </div>

      <div className="space-y-1">
        {group.members.map((member, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 py-1 px-2 rounded-md bg-slate-50 text-slate-700 text-xs font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#125977]" />
            <span className="truncate">{highlightText(member)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
