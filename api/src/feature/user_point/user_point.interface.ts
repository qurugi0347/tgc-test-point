export interface IUserPoint {
  userId?: number;
  amount: number;
}

export interface IModifyUserPoint extends IUserPoint {
  reason: string;
}
