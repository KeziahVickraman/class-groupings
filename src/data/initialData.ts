import { ClassGroup, SessionData } from '../types';

export const DAY1_GROUPS: ClassGroup[] = [
  {
    id: 1,
    name: 'Group 1',
    members: [
      'SONG CHERN WEI',
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

export const DAY2_GROUPS: ClassGroup[] = [
  {
    id: 1,
    name: 'Group 1',
    members: [
      'Soh Cheow Tuan',
      'Tee Yee Fern',
      'Loh Ruoh Pyng',
      'Tejano Joseph Soriano',
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
      'Liew Jeh Pin',
      'Catherine Ang Lay Eng',
      'Goh Yinhao Kenneth',
      'Zarina Binte Mohamad Rizan',
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
      'Ferris Kwan Tien Chee',
      'Joseph Florence Janethi',
      'Irene Erlin Tjahjadi',
      'Ng Christopher',
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
      'Ho Chee Yue',
      'Koh Zhi Ying Crystal',
      'Loke Xiang Jonathan',
      'Sinta Yowendra',
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
      'Cheam Shing Howe',
      'Ow Chew Leong',
      'Chan Li Rong Germaine',
      'Xu Yimin Melina',
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
      'Grace Lin Mei Qi',
      'Ding Changbo',
      'Kuy Kian Leong',
      'Suryana Norman',
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
      'Choo Ching Ann Benjamin',
      'Lim William',
      'Phoon Zi Xiang',
      'Wong Wang Yui Joanna',
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
      'Liu Qianqi',
      'Ang Kok Wee',
      'Lim Wen Yi',
      'Hermann Ngo',
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
    id: 'day-2',
    title: 'Day 2 Groupings',
    groups: DAY2_GROUPS,
  },
];
