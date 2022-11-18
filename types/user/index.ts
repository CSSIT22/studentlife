type EXP = {
  currentXP: number;
  level: number;
};
type Role_Type = "ANNOUCEMENT_ANNOUNCER" | "SCHEDULE_CREATER";

export type Role = {
  expired: Date;
  roleId: string;
  roleName: Role_Type;
};
export interface InitUserResponse {
  fName: string;
  lName: string;
  email: string;
  userId: string;
  levels: EXP | null;
  studentId: string;
  // roles: Role[];
}
