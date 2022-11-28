// export type Notiobject = {
//   notiObjectId: string;
//   templateId: string;
//   date: Date;
//   isRead: boolean;
//   module: string;
//   url: string;
//   values: string[];
// };
export type Notiobject = {
  notiObjectId: string;
  template: string;
  date: Date;
  module: string;
  url: string;
  sender: string | null;
};
export type NotiUser = {
  userId: string;
  notiSettingApp: string;
  notiSettingEmail: string;
};
