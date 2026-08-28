export interface SubTeam {
  name: string;
  members: string[];
}

export interface ClassGroup {
  id: number;
  name: string;
  members: string[];
  subTeams?: SubTeam[];
  notes?: string;
  tablePosition: {
    column: 'left' | 'center-left' | 'center-right' | 'right';
    row: 1 | 2;
    rotationDeg: number;
  };
}

export interface SessionData {
  id: string;
  title: string;
  groups: ClassGroup[];
}

