export interface ClassGroup {
  id: number;
  name: string;
  members: string[];
  tablePosition: {
    column: 'left' | 'center-left' | 'center-right' | 'right';
    row: 1 | 2;
    rotationDeg: number;
  };
}

export interface SessionData {
  title: string;
  groups: ClassGroup[];
}

