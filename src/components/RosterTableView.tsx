import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { ClassGroup } from '../types';

interface RosterTableViewProps {
  groups: ClassGroup[];
  title: string;
  searchQuery: string;
  onSelectGroup: (group: ClassGroup) => void;
}

export const RosterTableView: React.FC<RosterTableViewProps> = ({
  groups,
  title,
  searchQuery,
  onSelectGroup,
}) => {
  const [copied, setCopied] = useState(false);

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200 text-slate-900 font-semibold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleCopyAll = () => {
    let csv = `Group\tMember 1\tMember 2\tMember 3\tMember 4\n`;
    groups.forEach((g) => {
      csv += `${g.name}\t${g.members.join('\t')}\n`;
    });
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    let csv = `Group,Member\n`;
    groups.forEach((g) => {
      g.members.forEach((m) => {
        csv += `"${g.name}","${m}"\n`;
      });
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Class_Groups_${title.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Find maximum members in any group (typically 4)
  const maxRows = Math.max(...groups.map((g) => g.members.length), 4);

  return (
    <div
      id="roster-table-view"
      className="w-full bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-slate-900 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-base text-slate-900">
            {title} — Group Roster
          </h3>
          <p className="text-xs text-slate-500">
            Table breakdown of all student groupings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors"
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
            onClick={handleDownloadCSV}
            className="px-3 py-1.5 rounded-lg bg-[#125977] hover:bg-[#166688] text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-xs text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <th className="p-3 border-r border-slate-200 font-semibold uppercase text-[11px] text-slate-500 w-24">
                #
              </th>
              {groups.map((group) => (
                <th
                  key={group.id}
                  onClick={() => onSelectGroup(group)}
                  className="p-3 border-r border-slate-200 font-bold text-center text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  {group.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, rowIdx) => (
              <tr
                key={rowIdx}
                className={`border-b border-slate-100 ${
                  rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className="p-3 border-r border-slate-200 text-slate-400 font-medium text-center">
                  {rowIdx + 1}
                </td>
                {groups.map((group) => {
                  const memberName = group.members[rowIdx] || '';
                  return (
                    <td
                      key={group.id}
                      className="p-3 border-r border-slate-200 text-slate-800 text-center font-medium hover:bg-slate-100/70 cursor-pointer transition-colors"
                      onClick={() => onSelectGroup(group)}
                    >
                      {memberName ? highlightText(memberName) : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
