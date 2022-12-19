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
  values: string[];
};
export type NotiUser = {
  userId: string;
  notiSettingApp: string;
  notiSettingEmail: string;
};
export type pushNotiType = {
  template: string;
  value: string[];
  userId: string[];
  module: string;
  url: string;
  sender: string;
};
export type NotiobjectSocket = {
  date: Date;
  module: string;
  notiObjectId: string;
  template: string;
  url: string;
  userId: string; //sender
};
export type alertNoti = {
  data: NotiValue[];
  notiObject: NotiobjectSocket;
};
export type NotiValue = {
  notiObjectId: string;
  value: string;
  valueId: string;
};
export type NotiObjectMudule = {
  notiObjectId: string;
  userId: string;
  isRead: boolean;
  notiObject: Notiobject;
};
