type EXP = {
  currentXP: number;
  level: number;
};
type Role_Type =
  | "ANNOUNCEMENT_ANNOUNCER"
  | "SCHEDULE_CREATER"
  | "ANNOUNCEMENT_APPROVER";

export type Role = {
  roleId: string;
  roleName: Role_Type;
  expired: Date;
};
export interface InitUserResponse {
  fName: string;
  lName: string;
  email: string;
  userId: string;
  levels: EXP | null;
  studentId: string;
  roles: Role[];
}
