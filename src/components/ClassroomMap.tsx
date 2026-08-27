import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ClassGroup } from '../types';
import { GroupTable } from './GroupTable';

interface ClassroomMapProps {
  groups: ClassGroup[];
  onSelectGroup: (group: ClassGroup) => void;
  hoveredGroupId: number | null;
  setHoveredGroupId: (id: number | null) => void;
  searchQuery: string;
  showNamesAlways: boolean;
}

export const ClassroomMap: React.FC<ClassroomMapProps> = ({
  groups,
  onSelectGroup,
  hoveredGroupId,
  setHoveredGroupId,
  searchQuery,
  showNamesAlways,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const group1 = groups.find((g) => g.id === 1) || groups[0];
  const group2 = groups.find((g) => g.id === 2) || groups[1];
  const group3 = groups.find((g) => g.id === 3) || groups[2];
  const group4 = groups.find((g) => g.id === 4) || groups[3];
  const group5 = groups.find((g) => g.id === 5) || groups[4];
  const group6 = groups.find((g) => g.id === 6) || groups[5];
  const group7 = groups.find((g) => g.id === 7) || groups[6];
  const group8 = groups.find((g) => g.id === 8) || groups[7];

  const isSearchMatch = (group: ClassGroup) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      group.name.toLowerCase().includes(q) ||
      group.members.some((m) => m.toLowerCase().includes(q))
    );
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.75, prev + delta), 1.3));
  };

  return (
    <div
      id="classroom-map-container"
      className="relative w-full rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
    >
      {/* Top Map Controls */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-slate-50/70">
        <span className="text-xs text-slate-500 font-medium">
          Hover over any table to view group members
        </span>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => handleZoom(-0.1)}
            title="Zoom Out"
            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-600 px-1 font-medium">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => handleZoom(0.1)}
            title="Zoom In"
            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            title="Reset Zoom"
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Floor Canvas */}
      <div className={`w-full overflow-x-auto overflow-y-visible p-8 md:p-12 flex justify-center items-center select-none bg-white transition-all duration-200 ${
        showNamesAlways ? 'min-h-[740px]' : 'min-h-[660px]'
      }`}>
        <div
          id="classroom-floor-stage"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
            minWidth: showNamesAlways ? '1180px' : '1120px',
          }}
          className="relative flex flex-col items-center justify-start w-full max-w-[1250px] py-6"
        >
          {/* PODIUM DESK (Exact replica of Image 1) */}
          <div className={`relative flex flex-col items-center transition-all duration-200 ${
            showNamesAlways ? 'mb-20' : 'mb-24'
          }`}>
            <div
              id="podium-desk"
              className="w-56 h-16 rounded-sm bg-[#125977] border-2 border-[#093547] text-white flex items-center justify-center shadow-md"
            >
              <span className="font-semibold text-base tracking-wide text-white">
                Podium
              </span>
            </div>
          </div>

          {/* TABLE SEATING ARRANGEMENT (Exact replica of Image 1 with generous spacing) */}
          <div className="w-full flex items-start justify-center gap-10 md:gap-14 lg:gap-16 relative px-4">
            {/* LEFT COLUMN: Group 1 (upper) & Group 2 (lower) - angled ~14deg */}
            <div className={`flex flex-col items-center pt-2 transition-all duration-200 ${
              showNamesAlways ? 'gap-16 md:gap-20' : 'gap-20'
            }`}>
              {group1 && (
                <GroupTable
                  group={group1}
                  onClick={onSelectGroup}
                  isHovered={hoveredGroupId === group1.id}
                  onHover={setHoveredGroupId}
                  searchQuery={searchQuery}
                  isSearchMatch={isSearchMatch(group1)}
                  showNamesAlways={showNamesAlways}
                />
              )}
              {group2 && (
                <GroupTable
                  group={group2}
                  onClick={onSelectGroup}
                  isHovered={hoveredGroupId === group2.id}
                  onHover={setHoveredGroupId}
                  searchQuery={searchQuery}
                  isSearchMatch={isSearchMatch(group2)}
                  showNamesAlways={showNamesAlways}
                />
              )}
            </div>

            {/* CENTER COLUMNS: Group 3 & Group 5 (Row 1), Group 4 & Group 6 (Row 2) */}
            <div className={`flex flex-col items-center justify-center transition-all duration-200 ${
              showNamesAlways ? 'gap-16 md:gap-20' : 'gap-20'
            }`}>
              {/* Row 1: Group 3 and Group 5 */}
              <div className="flex gap-6 md:gap-8 lg:gap-10 items-center">
                {group3 && (
                  <GroupTable
                    group={group3}
                    onClick={onSelectGroup}
                    isHovered={hoveredGroupId === group3.id}
                    onHover={setHoveredGroupId}
                    searchQuery={searchQuery}
                    isSearchMatch={isSearchMatch(group3)}
                    showNamesAlways={showNamesAlways}
                  />
                )}
                {group5 && (
                  <GroupTable
                    group={group5}
                    onClick={onSelectGroup}
                    isHovered={hoveredGroupId === group5.id}
                    onHover={setHoveredGroupId}
                    searchQuery={searchQuery}
                    isSearchMatch={isSearchMatch(group5)}
                    showNamesAlways={showNamesAlways}
                  />
                )}
              </div>

              {/* Row 2: Group 4 and Group 6 */}
              <div className="flex gap-6 md:gap-8 lg:gap-10 items-center">
                {group4 && (
                  <GroupTable
                    group={group4}
                    onClick={onSelectGroup}
                    isHovered={hoveredGroupId === group4.id}
                    onHover={setHoveredGroupId}
                    searchQuery={searchQuery}
                    isSearchMatch={isSearchMatch(group4)}
                    showNamesAlways={showNamesAlways}
                  />
                )}
                {group6 && (
                  <GroupTable
                    group={group6}
                    onClick={onSelectGroup}
                    isHovered={hoveredGroupId === group6.id}
                    onHover={setHoveredGroupId}
                    searchQuery={searchQuery}
                    isSearchMatch={isSearchMatch(group6)}
                    showNamesAlways={showNamesAlways}
                  />
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Group 7 (upper) & Group 8 (lower) - angled ~ -14deg */}
            <div className={`flex flex-col items-center pt-2 transition-all duration-200 ${
              showNamesAlways ? 'gap-16 md:gap-20' : 'gap-20'
            }`}>
              {group7 && (
                <GroupTable
                  group={group7}
                  onClick={onSelectGroup}
                  isHovered={hoveredGroupId === group7.id}
                  onHover={setHoveredGroupId}
                  searchQuery={searchQuery}
                  isSearchMatch={isSearchMatch(group7)}
                  showNamesAlways={showNamesAlways}
                />
              )}
              {group8 && (
                <GroupTable
                  group={group8}
                  onClick={onSelectGroup}
                  isHovered={hoveredGroupId === group8.id}
                  onHover={setHoveredGroupId}
                  searchQuery={searchQuery}
                  isSearchMatch={isSearchMatch(group8)}
                  showNamesAlways={showNamesAlways}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
