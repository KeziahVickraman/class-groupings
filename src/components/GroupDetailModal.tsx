import React, { useState } from 'react';
import { X, Copy, Check, Edit2, Info } from 'lucide-react';
import { ClassGroup } from '../types';

interface GroupDetailModalProps {
  group: ClassGroup | null;
  onClose: () => void;
  onEdit: (group: ClassGroup) => void;
}

export const GroupDetailModal: React.FC<GroupDetailModalProps> = ({
  group,
  onClose,
  onEdit,
}) => {
  const [copied, setCopied] = useState(false);

  if (!group) return null;

  const handleCopy = () => {
    let text = `${group.name}\n`;
    if (group.subTeams && group.subTeams.length > 0) {
      group.subTeams.forEach((sub, sIdx) => {
        text += `${sub.name} (Pair ${sIdx + 1}):\n`;
        sub.members.forEach((m) => {
          text += `  • ${m}\n`;
        });
      });
    } else {
      text += group.members.map((m) => `• ${m}`).join('\n');
    }
    if (group.notes) {
      text += `\nNotes: ${group.notes}`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id={`group-modal-${group.id}`}
        className="relative w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden text-slate-900"
      >
        {/* Header */}
        <div className="bg-slate-50 px-5 py-3.5 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#125977] text-white flex items-center justify-center text-xs font-bold">
              {group.id}
            </span>
            <h2 className="text-base font-bold text-slate-900">
              {group.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Group Members ({group.members.length})
          </div>

          {group.subTeams && group.subTeams.length > 0 ? (
            <div className="space-y-3">
              {group.subTeams.map((sub, sIdx) => (
                <div key={sIdx} className="space-y-1.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${sIdx === 0 ? 'bg-[#125977]' : 'bg-teal-600'}`} />
                      {sub.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Pair {sIdx + 1}</span>
                  </div>
                  <div className="space-y-1 pt-0.5">
                    {sub.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-1.5 rounded-md bg-white border border-slate-100 text-slate-800 text-xs font-medium"
                      >
                        <span className="w-4 h-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="truncate">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1.5">
              {group.members.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 text-xs font-medium"
                >
                  <span className="w-5 h-5 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="truncate">{member}</span>
                </div>
              ))}
            </div>
          )}

          {group.notes && (
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Notes: </span>
                <span>{group.notes}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(group);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#125977] hover:bg-[#166688] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
