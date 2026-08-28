import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { ClassGroup } from '../types';

interface EditGroupModalProps {
  group: ClassGroup | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedGroup: ClassGroup) => void;
}

export const EditGroupModal: React.FC<EditGroupModalProps> = ({
  group,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [member0, setMember0] = useState('');
  const [member1, setMember1] = useState('');
  const [member2, setMember2] = useState('');
  const [member3, setMember3] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (group) {
      setName(group.name || '');
      setMember0(group.members[0] || '');
      setMember1(group.members[1] || '');
      setMember2(group.members[2] || '');
      setMember3(group.members[3] || '');
      setNotes(group.notes || '');
    }
  }, [group]);

  if (!isOpen || !group) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMembers = [
      member0.trim(),
      member1.trim(),
      member2.trim(),
      member3.trim(),
    ].filter(Boolean);

    let updatedSubTeams = group.subTeams;
    if (group.subTeams && group.subTeams.length === 2) {
      updatedSubTeams = [
        {
          name: group.subTeams[0].name || 'Team 1',
          members: [member0.trim(), member1.trim()].filter(Boolean),
        },
        {
          name: group.subTeams[1].name || 'Team 2',
          members: [member2.trim(), member3.trim()].filter(Boolean),
        },
      ];
    }

    onSave({
      ...group,
      name: name.trim() || group.name,
      members: updatedMembers,
      subTeams: updatedSubTeams,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="edit-group-modal"
        className="relative w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden text-slate-900"
      >
        <div className="bg-slate-50 px-5 py-3.5 flex items-center justify-between border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">Edit {group.name}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#125977]"
              required
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Members
            </label>

            <input
              type="text"
              value={member0}
              onChange={(e) => setMember0(e.target.value)}
              placeholder="Member 1"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#125977]"
            />
            <input
              type="text"
              value={member1}
              onChange={(e) => setMember1(e.target.value)}
              placeholder="Member 2"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#125977]"
            />
            <input
              type="text"
              value={member2}
              onChange={(e) => setMember2(e.target.value)}
              placeholder="Member 3"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#125977]"
            />
            <input
              type="text"
              value={member3}
              onChange={(e) => setMember3(e.target.value)}
              placeholder="Member 4"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#125977]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Anchor: Soh (advanced)"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#125977]"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#125977] hover:bg-[#166688] text-white text-xs font-medium flex items-center gap-1 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
