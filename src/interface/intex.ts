export interface IPlayList {
  id: string;
  name: string;
  createTime: number;
  coverImageUrl: string;
}

export interface IProfile {
  userId: number;
  nickName: string;
  signature: string;
  userType: number;
  viptype: number;
  playListCount?: number;
  gender?: number;
  brithdat?: Date;
  description?: string;
}

export enum Itabs {
  all = 0,
  ask = 1,
  share = 2,
  job = 3,
  good = 4,
}

export enum ItabsName {
  "all" = 0,
  "ask" = 1,
  "share" = 2,
  "job" = 3,
  "good" = 4,
}
