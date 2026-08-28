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
      className="w-68 bg-white/98 backdrop-blur-sm text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-3.5 pointer-events-none transition-all duration-150 z-50 text-left"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <span className="font-bold text-slate-900 text-sm tracking-tight">
          {group.name}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          {group.members.length} members
        </span>
      </div>

      {group.subTeams && group.subTeams.length > 0 ? (
        <div className="space-y-2">
          {group.subTeams.map((sub, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider px-0.5">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${sIdx === 0 ? 'bg-[#125977]' : 'bg-teal-600'}`} />
                  {sub.name}
                </span>
                <span className="text-[9px] font-medium text-slate-400">Pair {sIdx + 1}</span>
              </div>
              {sub.members.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 py-1 px-2 rounded-md bg-slate-50 text-slate-700 text-xs font-medium"
                >
                  <span className="truncate">{highlightText(member)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
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
      )}

      {group.notes && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium flex items-center gap-1.5 bg-slate-50/80 px-2 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <span className="truncate">{group.notes}</span>
        </div>
      )}
    </div>
  );
};
