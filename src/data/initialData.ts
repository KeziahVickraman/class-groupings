import { ClassGroup, SessionData } from '../types';

export const DAY1_GROUPS: ClassGroup[] = [
  {
    id: 1,
    name: 'Group 1',
    members: [
      'SOH CHEOW TUAN',
      'NG CHRISTOPHER',
      'HO CHEE YUE',
      'ANG KOK WEE',
    ],
    tablePosition: {
      column: 'left',
      row: 1,
      rotationDeg: 14,
    },
  },
  {
    id: 2,
    name: 'Group 2',
    members: [
      'LIEW JEH PIN',
      'KOH ZHI YING, CRYSTAL',
      'LIM WILLIAM',
      'CHEAM SHING HOWE',
    ],
    tablePosition: {
      column: 'left',
      row: 2,
      rotationDeg: 14,
    },
  },
  {
    id: 3,
    name: 'Group 3',
    members: [
      'DING CHANGBO',
      'JOSEPH FLORENCE JANETHI',
      'TEE YEE FERN',
      'OW CHEW LEONG',
    ],
    tablePosition: {
      column: 'center-left',
      row: 1,
      rotationDeg: 0,
    },
  },
  {
    id: 4,
    name: 'Group 4',
    members: [
      'FERRIS KWAN TIEN CHEE',
      'CHAN LI RONG, GERMAINE',
      'ZARINA BINTE MOHAMAD RIZAN',
      'KUY KIAN LEONG',
    ],
    tablePosition: {
      column: 'center-left',
      row: 2,
      rotationDeg: 0,
    },
  },
  {
    id: 5,
    name: 'Group 5',
    members: [
      'LIM WEN YI',
      'PHOON ZI XIANG',
      'SURYANA NORMAN',
      'CATHERINE ANG LAY ENG',
    ],
    tablePosition: {
      column: 'center-right',
      row: 1,
      rotationDeg: 0,
    },
  },
  {
    id: 6,
    name: 'Group 6',
    members: [
      'WONG WANG YUI, JOANNA',
      'LOH RUOH PYNG',
      'IRENE ERLIN TJAHJADI',
      'GRACE LIN MEI QI',
    ],
    tablePosition: {
      column: 'center-right',
      row: 2,
      rotationDeg: 0,
    },
  },
  {
    id: 7,
    name: 'Group 7',
    members: [
      'CHOO CHING ANN, BENJAMIN',
      'GOH YINHAO, KENNETH',
      'LOKE XIANG, JONATHAN',
      'LIU QIANQI',
    ],
    tablePosition: {
      column: 'right',
      row: 1,
      rotationDeg: -14,
    },
  },
  {
    id: 8,
    name: 'Group 8',
    members: [
      'TEJANO JOSEPH SORIANO',
      'XU YIMIN, MELINA',
      'HERMANN NGO',
      'SINTA YOWENDRA',
    ],
    tablePosition: {
      column: 'right',
      row: 2,
      rotationDeg: -14,
    },
  },
];

export const DAY2_PART_A_GROUPS: ClassGroup[] = [
  {
    id: 1,
    name: 'Group 1',
    members: [
      'SOH CHEOW TUAN',
      'HO CHEE YUE',
      'NG CHRISTOPHER',
      'ANG KOK WEE',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['SOH CHEOW TUAN', 'HO CHEE YUE'],
      },
      {
        name: 'Team 2',
        members: ['NG CHRISTOPHER', 'ANG KOK WEE'],
      },
    ],
    tablePosition: {
      column: 'left',
      row: 1,
      rotationDeg: 14,
    },
  },
  {
    id: 2,
    name: 'Group 2',
    members: [
      'LIEW JEH PIN',
      'CHEAM SHING HOWE',
      'KOH ZHI YING, CRYSTAL',
      'LIM WILLIAM',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['LIEW JEH PIN', 'CHEAM SHING HOWE'],
      },
      {
        name: 'Team 2',
        members: ['KOH ZHI YING, CRYSTAL', 'LIM WILLIAM'],
      },
    ],
    tablePosition: {
      column: 'left',
      row: 2,
      rotationDeg: 14,
    },
  },
  {
    id: 3,
    name: 'Group 3',
    members: [
      'DING CHANGBO',
      'JOSEPH FLORENCE JANETHI',
      'TEE YEE FERN',
      'OW CHEW LEONG',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['DING CHANGBO', 'JOSEPH FLORENCE JANETHI'],
      },
      {
        name: 'Team 2',
        members: ['TEE YEE FERN', 'OW CHEW LEONG'],
      },
    ],
    tablePosition: {
      column: 'center-left',
      row: 1,
      rotationDeg: 0,
    },
  },
  {
    id: 4,
    name: 'Group 4',
    members: [
      'FERRIS KWAN TIEN CHEE',
      'KUY KIAN LEONG',
      'ZARINA BINTE MOHAMAD RIZAN',
      'CHAN LI RONG, GERMAINE',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['FERRIS KWAN TIEN CHEE', 'KUY KIAN LEONG'],
      },
      {
        name: 'Team 2',
        members: ['ZARINA BINTE MOHAMAD RIZAN', 'CHAN LI RONG, GERMAINE'],
      },
    ],
    tablePosition: {
      column: 'center-left',
      row: 2,
      rotationDeg: 0,
    },
  },
  {
    id: 5,
    name: 'Group 5',
    members: [
      'LIM WEN YI',
      'CATHERINE ANG LAY ENG',
      'PHOON ZI XIANG',
      'SURYANA NORMAN',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['LIM WEN YI', 'CATHERINE ANG LAY ENG'],
      },
      {
        name: 'Team 2',
        members: ['PHOON ZI XIANG', 'SURYANA NORMAN'],
      },
    ],
    tablePosition: {
      column: 'center-right',
      row: 1,
      rotationDeg: 0,
    },
  },
  {
    id: 6,
    name: 'Group 6',
    members: [
      'WONG WANG YUI, JOANNA',
      'LOH RUOH PYNG',
      'IRENE ERLIN TJAHJADI',
      'GRACE LIN MEI QI',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['WONG WANG YUI, JOANNA', 'LOH RUOH PYNG'],
      },
      {
        name: 'Team 2',
        members: ['IRENE ERLIN TJAHJADI', 'GRACE LIN MEI QI'],
      },
    ],
    tablePosition: {
      column: 'center-right',
      row: 2,
      rotationDeg: 0,
    },
  },
  {
    id: 7,
    name: 'Group 7',
    members: [
      'CHOO CHING ANN, BENJAMIN',
      'GOH YINHAO, KENNETH',
      'LOKE XIANG, JONATHAN',
      'LIU QIANQI',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['CHOO CHING ANN, BENJAMIN', 'GOH YINHAO, KENNETH'],
      },
      {
        name: 'Team 2',
        members: ['LOKE XIANG, JONATHAN', 'LIU QIANQI'],
      },
    ],
    tablePosition: {
      column: 'right',
      row: 1,
      rotationDeg: -14,
    },
  },
  {
    id: 8,
    name: 'Group 8',
    members: [
      'TEJANO JOSEPH SORIANO',
      'XU YIMIN, MELINA',
      'HERMANN NGO',
      'SINTA YOWENDRA',
    ],
    subTeams: [
      {
        name: 'Team 1',
        members: ['TEJANO JOSEPH SORIANO', 'XU YIMIN, MELINA'],
      },
      {
        name: 'Team 2',
        members: ['HERMANN NGO', 'SINTA YOWENDRA'],
      },
    ],
    tablePosition: {
      column: 'right',
      row: 2,
      rotationDeg: -14,
    },
  },
];

export const DAY2_GROUPS: ClassGroup[] = [
  {
    id: 1,
    name: 'Group 1',
    members: [
      'SOH CHEOW TUAN',
      'TEE YEE FERN',
      'LOH RUOH PYNG',
      'TEJANO JOSEPH SORIANO',
    ],
    tablePosition: {
      column: 'left',
      row: 1,
      rotationDeg: 14,
    },
  },
  {
    id: 2,
    name: 'Group 2',
    members: [
      'LIEW JEH PIN',
      'CATHERINE ANG LAY ENG',
      'GOH YINHAO, KENNETH',
      'ZARINA BINTE MOHAMAD RIZAN',
    ],
    tablePosition: {
      column: 'left',
      row: 2,
      rotationDeg: 14,
    },
  },
  {
    id: 3,
    name: 'Group 3',
    members: [
      'FERRIS KWAN TIEN CHEE',
      'JOSEPH FLORENCE JANETHI',
      'IRENE ERLIN TJAHJADI',
      'NG CHRISTOPHER',
    ],
    tablePosition: {
      column: 'center-left',
      row: 1,
      rotationDeg: 0,
    },
  },
  {
    id: 4,
    name: 'Group 4',
    members: [
      'HO CHEE YUE',
      'KOH ZHI YING, CRYSTAL',
      'LOKE XIANG, JONATHAN',
      'SINTA YOWENDRA',
    ],
    tablePosition: {
      column: 'center-left',
      row: 2,
      rotationDeg: 0,
    },
  },
  {
    id: 5,
    name: 'Group 5',
    members: [
      'CHEAM SHING HOWE',
      'OW CHEW LEONG',
      'CHAN LI RONG, GERMAINE',
      'XU YIMIN, MELINA',
    ],
    tablePosition: {
      column: 'center-right',
      row: 1,
      rotationDeg: 0,
    },
  },
  {
    id: 6,
    name: 'Group 6',
    members: [
      'GRACE LIN MEI QI',
      'DING CHANGBO',
      'KUY KIAN LEONG',
      'SURYANA NORMAN',
    ],
    tablePosition: {
      column: 'center-right',
      row: 2,
      rotationDeg: 0,
    },
  },
  {
    id: 7,
    name: 'Group 7',
    members: [
      'CHOO CHING ANN, BENJAMIN',
      'LIM WILLIAM',
      'PHOON ZI XIANG',
      'WONG WANG YUI, JOANNA',
    ],
    tablePosition: {
      column: 'right',
      row: 1,
      rotationDeg: -14,
    },
  },
  {
    id: 8,
    name: 'Group 8',
    members: [
      'LIU QIANQI',
      'ANG KOK WEE',
      'LIM WEN YI',
      'HERMANN NGO',
    ],
    tablePosition: {
      column: 'right',
      row: 2,
      rotationDeg: -14,
    },
  },
];

export const INITIAL_SESSIONS: SessionData[] = [
  {
    id: 'day-1',
    title: 'Day 1 Groupings',
    groups: DAY1_GROUPS,
  },
  {
    id: 'day-2-part-a',
    title: 'Day 2 (Part A)',
    groups: DAY2_PART_A_GROUPS,
  },
  {
    id: 'day-2',
    title: 'Day 2 Groupings',
    groups: DAY2_GROUPS,
  },
];
