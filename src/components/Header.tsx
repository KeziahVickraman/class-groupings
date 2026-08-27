import React from 'react';
import { Search, Eye, EyeOff, LayoutGrid, Map as MapIcon, Calendar } from 'lucide-react';
import { SessionData } from '../types';

interface HeaderProps {
  sessions: SessionData[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  title: string;
  onTitleChange: (newTitle: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'map' | 'table';
  setViewMode: (mode: 'map' | 'table') => void;
  showNamesAlways: boolean;
  setShowNamesAlways: (val: boolean) => void;
  totalStudents: number;
}

export const Header: React.FC<HeaderProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  title,
  onTitleChange,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  showNamesAlways,
  setShowNamesAlways,
  totalStudents,
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left: Title & Day Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Day Tabs Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            {sessions.map((sess) => {
              const isActive = sess.id === activeSessionId;
              return (
                <button
                  key={sess.id}
                  id={`tab-${sess.id}`}
                  type="button"
                  onClick={() => onSelectSession(sess.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#125977] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Calendar className={`w-3.5 h-3.5 ${isActive ? 'text-teal-200' : 'text-slate-400'}`} />
                  <span>{sess.title}</span>
                </button>
              );
            })}
          </div>

          {/* Title Editor & Student Count Badge */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-base font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#125977] px-1 py-0.5 rounded transition-all focus:outline-none max-w-[200px] truncate"
              title="Click to edit tab title"
            />
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              8 Groups • {totalStudents} Students
            </span>
          </div>
        </div>

        {/* Center/Right: Search and Controls */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              id="student-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student name..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#125977] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Toggle Names Display */}
          <button
            type="button"
            onClick={() => setShowNamesAlways(!showNamesAlways)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
              showNamesAlways
                ? 'bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle showing names directly on desks"
          >
            {showNamesAlways ? (
              <>
                <Eye className="w-3.5 h-3.5 text-[#125977]" />
                <span>Names Shown</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Hover Only</span>
              </>
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MapIcon className="w-3 h-3" />
              <span>Map</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
