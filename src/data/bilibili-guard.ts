/** 开通大航海用户 */
export interface GuardUser {
  /** 舰长序号 */
  id: number;
  /** 用户名 */
  name: string;
  /** 用户id */
  uid: number;
  /** 开通记录 */
  record: GuardRecord[];
}

/** 船票记录 */
export interface GuardRecord {
  /** 开通日期 */
  date: number;
  /** 开通等级 */
  level: number;
  /** 开通价格 */
  price: number;
  /** 有效月份 */
  month: `${number}/${number}`;
}

const bilibiliGuardList: GuardUser[] = [
  {
    id: 1,
    name: "鹿野的皮卡丘",
    uid: 386990083,
    record: [
      {
        date: 1708590110000,
        level: 3,
        price: 13800,
        month: "2024/2",
      },
    ],
  },
  {
    id: 2,
    name: "茫苍Monseea",
    uid: 572414349,
    record: [
      {
        date: 1708593291000,
        level: 3,
        price: 13800,
        month: "2024/2",
      },
      {
        date: 1714234102000,
        level: 3,
        price: 13800,
        month: "2024/4",
      },
      {
        date: 1716179639000,
        level: 3,
        price: 13800,
        month: "2024/5",
      },
      {
        date: 1719417600000,
        level: 3,
        price: 13800,
        month: "2024/6",
      },
    ],
  },
  {
    id: 3,
    name: "花門吹雪",
    uid: 3394022,
    record: [
      {
        date: 1714657625000,
        level: 3,
        price: 19800,
        month: "2024/5",
      },
    ],
  },
  {
    id: 4,
    name: "鹿野的星星",
    uid: 65521235,
    record: [
      {
        date: 1719130505000,
        level: 3,
        price: 13800,
        month: "2024/6",
      },
    ],
  },
];
