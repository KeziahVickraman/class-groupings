import { ClassGroup, SessionData } from '../types';

export const INITIAL_GROUPS: ClassGroup[] = [
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

export const INITIAL_SESSION: SessionData = {
  title: 'Day 1 AM (Groups)',
  groups: INITIAL_GROUPS,
};

