import React, { useState } from 'react';
import { Copy, Check, Download, Info, Users } from 'lucide-react';
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

  const hasAnyNotes = groups.some((g) => !!g.notes);
  const hasSubTeams = groups.some((g) => g.subTeams && g.subTeams.length > 0);

  const handleCopyAll = () => {
    let csv = '';
    if (hasSubTeams) {
      csv = `Group\tTeam 1 (Pair 1)\t\tTeam 2 (Pair 2)\t\n`;
      csv += `\tMember 1\tMember 2\tMember 1\tMember 2\n`;
      groups.forEach((g) => {
        const t1m1 = g.subTeams?.[0]?.members[0] || g.members[0] || '';
        const t1m2 = g.subTeams?.[0]?.members[1] || g.members[1] || '';
        const t2m1 = g.subTeams?.[1]?.members[0] || g.members[2] || '';
        const t2m2 = g.subTeams?.[1]?.members[1] || g.members[3] || '';
        csv += `${g.name}\t${t1m1}\t${t1m2}\t${t2m1}\t${t2m2}\n`;
      });
    } else {
      csv = `Group\tMember 1\tMember 2\tMember 3\tMember 4\tNotes\n`;
      groups.forEach((g) => {
        csv += `${g.name}\t${g.members.join('\t')}\t${g.notes || ''}\n`;
      });
    }
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    let csv = '';
    if (hasSubTeams) {
      csv = `Group,Team / Pair,Member Name\n`;
      groups.forEach((g) => {
        if (g.subTeams && g.subTeams.length > 0) {
          g.subTeams.forEach((sub) => {
            sub.members.forEach((m) => {
              csv += `"${g.name}","${sub.name}","${m}"\n`;
            });
          });
        } else {
          g.members.forEach((m) => {
            csv += `"${g.name}","Group Member","${m}"\n`;
          });
        }
      });
    } else {
      csv = `Group,Member,Notes\n`;
      groups.forEach((g) => {
        g.members.forEach((m) => {
          csv += `"${g.name}","${m}","${g.notes || ''}"\n`;
        });
      });
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Class_Groups_${title.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const maxRows = Math.max(...groups.map((g) => g.members.length), 4);

  return (
    <div
      id="roster-table-view"
      className="w-full bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-slate-900 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900">
              {title} — Group Roster
            </h3>
            {hasSubTeams && (
              <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Pairs Layout</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {hasSubTeams
              ? 'Day 1 teams split into pairs (Team 1 & Team 2)'
              : 'Table breakdown of all student groupings'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
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
            className="px-3 py-1.5 rounded-lg bg-[#125977] hover:bg-[#166688] text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-xs text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <th className="p-3 border-r border-slate-200 font-semibold uppercase text-[11px] text-slate-500 w-28 text-center">
                {hasSubTeams ? 'Sub-Team' : '#'}
              </th>
              {groups.map((group) => (
                <th
                  key={group.id}
                  onClick={() => onSelectGroup(group)}
                  className="p-3 border-r border-slate-200 font-bold text-center text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <span>{group.name}</span>
                    {group.notes && (
                      <span
                        className="text-[10px] font-normal text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.2 mt-0.5 max-w-[120px] truncate"
                        title={group.notes}
                      >
                        {group.notes}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, rowIdx) => {
              const isTeam1 = rowIdx < 2;
              const isTeamHeaderRow = rowIdx === 0 || rowIdx === 2;

              return (
                <tr
                  key={rowIdx}
                  className={`border-b border-slate-100 ${
                    rowIdx === 1 ? 'border-b-2 border-slate-300' : ''
                  } ${
                    hasSubTeams
                      ? isTeam1
                        ? 'bg-slate-50/40'
                        : 'bg-white'
                      : rowIdx % 2 === 0
                      ? 'bg-white'
                      : 'bg-slate-50/50'
                  }`}
                >
                  <td className="p-3 border-r border-slate-200 text-slate-600 font-medium text-center">
                    {hasSubTeams ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isTeam1 ? 'bg-[#125977]' : 'bg-teal-600'
                          }`}
                        />
                        <span className="font-bold text-slate-700">
                          {isTeam1 ? 'Team 1' : 'Team 2'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          (#{ (rowIdx % 2) + 1 })
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-medium">{rowIdx + 1}</span>
                    )}
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
              );
            })}

            {/* Notes row if any notes exist */}
            {hasAnyNotes && (
              <tr className="bg-amber-50/40 border-t border-slate-200">
                <td className="p-3 border-r border-slate-200 text-amber-800 font-semibold text-center text-[10px] uppercase">
                  Notes
                </td>
                {groups.map((group) => (
                  <td
                    key={group.id}
                    className="p-2.5 border-r border-slate-200 text-center text-[11px] text-amber-900 font-medium"
                    onClick={() => onSelectGroup(group)}
                  >
                    {group.notes ? (
                      <div className="flex items-center justify-center gap-1">
                        <Info className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{group.notes}</span>
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
