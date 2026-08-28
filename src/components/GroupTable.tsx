import React, { useState } from 'react';
import { ClassGroup } from '../types';
import { GroupHoverTooltip } from './GroupHoverTooltip';

interface GroupTableProps {
  group: ClassGroup;
  onClick: (group: ClassGroup) => void;
  isHovered: boolean;
  onHover: (groupId: number | null) => void;
  searchQuery: string;
  isSearchMatch: boolean;
  showNamesAlways?: boolean;
  isFlipped?: boolean;
  overrideRotation?: number;
}

export const GroupTable: React.FC<GroupTableProps> = ({
  group,
  onClick,
  isHovered,
  onHover,
  searchQuery,
  isSearchMatch,
  showNamesAlways = false,
  isFlipped = false,
  overrideRotation,
}) => {
  const [isLocalHovered, setIsLocalHovered] = useState(false);
  const activeHover = isHovered || isLocalHovered;

  const rotationAngle =
    overrideRotation !== undefined
      ? overrideRotation
      : isFlipped
      ? -group.tablePosition.rotationDeg
      : group.tablePosition.rotationDeg;

  const isTopRow = isFlipped
    ? group.tablePosition.row === 2
    : group.tablePosition.row === 1;

  const hasSearchFocus =
    isSearchMatch ||
    (searchQuery.trim() !== '' &&
      group.members.some((m) =>
        m.toLowerCase().includes(searchQuery.toLowerCase())
      ));

  return (
    <div
      id={`table-container-${group.id}`}
      className="relative flex flex-col items-center select-none"
      style={{
        transform: `rotate(${rotationAngle}deg)`,
        transformOrigin: 'center center',
      }}
      onMouseEnter={() => {
        setIsLocalHovered(true);
        onHover(group.id);
      }}
      onMouseLeave={() => {
        setIsLocalHovered(false);
        onHover(null);
      }}
    >
      {/* Search highlight badge */}
      {hasSearchFocus && (
        <div
          style={{ transform: `rotate(${-rotationAngle}deg)` }}
          className="absolute -top-6 z-30 bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md animate-pulse"
        >
          Match
        </div>
      )}

      {/* Main Table Rectangular Shape matching Image 1 */}
      <button
        id={`group-table-btn-${group.id}`}
        type="button"
        onClick={() => onClick(group)}
        className={`relative w-60 sm:w-68 md:w-76 rounded-md border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center p-3 shadow-md focus:outline-none ${
          showNamesAlways
            ? group.subTeams && group.subTeams.length > 0
              ? 'min-h-[136px]'
              : 'min-h-[116px]'
            : 'h-16 md:h-18'
        } ${
          hasSearchFocus
            ? 'bg-[#156d91] border-amber-400 ring-2 ring-amber-300'
            : activeHover
            ? 'bg-[#176d91] border-teal-800 shadow-lg scale-[1.02]'
            : 'bg-[#125977] border-[#093547] hover:bg-[#166688]'
        }`}
      >
        <span className="text-base md:text-lg font-bold tracking-wide text-white drop-shadow-xs">
          {group.name}
        </span>

        {/* When Always Show Names is toggled on: clean, crystal clear grid of names */}
        {showNamesAlways &&
          (group.subTeams && group.subTeams.length > 0 ? (
            <div className="w-full mt-2 pt-1.5 border-t border-white/25 flex flex-col gap-1.5 text-left">
              {group.subTeams.map((sub, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-teal-200 px-0.5 flex items-center justify-between">
                    <span>
                      {sub.name} (Pair {sIdx + 1})
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {sub.members.map((member, idx) => {
                      const isMatch =
                        searchQuery.trim() !== '' &&
                        member.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <div
                          key={idx}
                          className={`px-1.5 py-0.5 rounded bg-black/15 text-[10.5px] leading-tight font-medium text-white truncate flex items-center gap-1 border ${
                            isMatch
                              ? 'border-amber-300 bg-amber-400 text-slate-900 font-bold'
                              : 'border-white/10 text-teal-50'
                          }`}
                          title={member}
                        >
                          <span
                            className={`w-1 h-1 rounded-full shrink-0 ${
                              isMatch ? 'bg-slate-900' : 'bg-teal-300'
                            }`}
                          />
                          <span className="truncate">{member}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full mt-2 pt-2 border-t border-white/25 grid grid-cols-2 gap-1.5 text-left">
              {group.members.map((member, idx) => {
                const isMatch =
                  searchQuery.trim() !== '' &&
                  member.toLowerCase().includes(searchQuery.toLowerCase());
                return (
                  <div
                    key={idx}
                    className={`px-1.5 py-1 rounded bg-black/15 text-[11px] leading-tight font-medium text-white truncate flex items-center gap-1 border ${
                      isMatch
                        ? 'border-amber-300 bg-amber-400 text-slate-900 font-bold'
                        : 'border-white/10 text-teal-50'
                    }`}
                    title={member}
                  >
                    <span
                      className={`w-1 h-1 rounded-full shrink-0 ${
                        isMatch ? 'bg-slate-900' : 'bg-teal-300'
                      }`}
                    />
                    <span className="truncate">{member}</span>
                  </div>
                );
              })}
            </div>
          ))}
      </button>

      {/* Floating Hover Tooltip - counter-rotated so it is always level and upright */}
      {activeHover && (
        <div
          className="absolute z-50 transition-all duration-150 pointer-events-none"
          style={{
            transform: `rotate(${-rotationAngle}deg)`,
            ...(isTopRow
              ? { bottom: 'calc(100% + 16px)' }
              : { top: 'calc(100% + 16px)' }),
            left: '50%',
            transformOrigin: isTopRow ? 'bottom center' : 'top center',
            marginLeft: '-128px', // center 256px width tooltip
          }}
        >
          <GroupHoverTooltip
            group={group}
            highlightQuery={searchQuery}
          />
        </div>
      )}
    </div>
  );
};
