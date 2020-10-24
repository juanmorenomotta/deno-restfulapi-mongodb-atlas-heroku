export interface IUser {
  username: string;
  password: string;
}

export interface IUserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}