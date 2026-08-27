import React, { useState, useEffect } from 'react';
import { INITIAL_SESSION } from './data/initialData';
import { ClassGroup, SessionData } from './types';
import { Header } from './components/Header';
import { ClassroomMap } from './components/ClassroomMap';
import { RosterTableView } from './components/RosterTableView';
import { GroupDetailModal } from './components/GroupDetailModal';
import { EditGroupModal } from './components/EditGroupModal';
import { RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'class_seating_guide_v2';

export default function App() {
  const [session, setSession] = useState<SessionData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_SESSION;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredGroupId, setHoveredGroupId] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ClassGroup | null>(null);
  const [groupToEdit, setGroupToEdit] = useState<ClassGroup | null>(null);
  const [showNamesAlways, setShowNamesAlways] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'map' | 'table'>('map');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }, [session]);

  const handleUpdateTitle = (newTitle: string) => {
    setSession((prev) => ({ ...prev, title: newTitle }));
  };

  const handleSaveGroup = (updatedGroup: ClassGroup) => {
    setSession((prev) => ({
      ...prev,
      groups: prev.groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)),
    }));
    if (selectedGroup && selectedGroup.id === updatedGroup.id) {
      setSelectedGroup(updatedGroup);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset to original group seating?')) {
      setSession(INITIAL_SESSION);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const totalStudents = session.groups.reduce(
    (sum, g) => sum + (g.members?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col selection:bg-[#125977] selection:text-white">
      {/* Minimalist Top Header */}
      <Header
        title={session.title}
        onTitleChange={handleUpdateTitle}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showNamesAlways={showNamesAlways}
        setShowNamesAlways={setShowNamesAlways}
        totalStudents={totalStudents}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Search match notification */}
        {searchQuery && (
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center justify-between text-xs text-slate-600 shadow-xs">
            <span>
              Showing results for: <strong className="text-slate-900 font-semibold">"{searchQuery}"</strong>
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-slate-500 hover:text-slate-900 font-medium"
            >
              Clear
            </button>
          </div>
        )}

        {/* View Mode: Interactive Classroom Map */}
        {viewMode === 'map' ? (
          <ClassroomMap
            groups={session.groups}
            onSelectGroup={(group) => setSelectedGroup(group)}
            hoveredGroupId={hoveredGroupId}
            setHoveredGroupId={setHoveredGroupId}
            searchQuery={searchQuery}
            showNamesAlways={showNamesAlways}
          />
        ) : (
          <RosterTableView
            groups={session.groups}
            title={session.title}
            searchQuery={searchQuery}
            onSelectGroup={(group) => setSelectedGroup(group)}
          />
        )}

        {/* Minimalist Subtle Footer */}
        <footer className="pt-6 pb-4 flex items-center justify-between text-xs text-slate-400">
          <span>Interactive Class Seating & Groupings Guide</span>
          <button
            type="button"
            onClick={handleResetData}
            className="hover:text-slate-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Roster</span>
          </button>
        </footer>
      </main>

      {/* Group Detail Modal */}
      <GroupDetailModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
        onEdit={(group) => setGroupToEdit(group)}
      />

      {/* Edit Group Modal */}
      <EditGroupModal
        group={groupToEdit}
        isOpen={!!groupToEdit}
        onClose={() => setGroupToEdit(null)}
        onSave={handleSaveGroup}
      />
    </div>
  );
}
