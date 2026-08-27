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
}

export const GroupTable: React.FC<GroupTableProps> = ({
  group,
  onClick,
  isHovered,
  onHover,
  searchQuery,
  isSearchMatch,
  showNamesAlways = false,
}) => {
  const [isLocalHovered, setIsLocalHovered] = useState(false);
  const activeHover = isHovered || isLocalHovered;

  const rotationAngle = group.tablePosition.rotationDeg;

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
        className={`relative w-56 md:w-64 lg:w-72 h-16 md:h-18 rounded-sm border-2 transition-all duration-150 cursor-pointer flex flex-col items-center justify-center p-2 shadow-md focus:outline-none ${
          hasSearchFocus
            ? 'bg-[#156d91] border-amber-400 ring-2 ring-amber-300'
            : activeHover
            ? 'bg-[#176d91] border-teal-800 shadow-lg scale-[1.02]'
            : 'bg-[#125977] border-[#093547] hover:bg-[#166688]'
        }`}
      >
        <span className="text-base md:text-lg font-semibold tracking-wide text-white">
          {group.name}
        </span>

        {/* If Always Show Names is toggled on, show compact list */}
        {showNamesAlways && (
          <div className="w-full mt-1 pt-1 border-t border-white/20 grid grid-cols-2 gap-x-2 text-[10px] text-teal-100 truncate">
            {group.members.slice(0, 4).map((m, i) => (
              <span key={i} className="truncate">
                {m.split(' ')[0]} {m.split(' ')[1] || ''}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* Floating Hover Tooltip - counter-rotated so it is always level and upright */}
      {activeHover && (
        <div
          className="absolute z-50 transition-all duration-150 pointer-events-none"
          style={{
            transform: `rotate(${-rotationAngle}deg)`,
            ...(group.tablePosition.row === 1
              ? { bottom: 'calc(100% + 16px)' }
              : { top: 'calc(100% + 16px)' }),
            left: '50%',
            transformOrigin: group.tablePosition.row === 1 ? 'bottom center' : 'top center',
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
