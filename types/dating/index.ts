export type AllInterests = {
  interestId: number;
  interestName: string;
};

export type UserInterests = {
  interestId: number;
  interestName: string;
};

export type UserCardDetail = {
  userId: string;
  fName: string;
  lName: string;
  image: {
    type: string,
    data: number[],
  }
  details: {
    birth: Date,
    sex: string,
  }
  interests: {
    interestId: number;
  }[]
  studentMajor: {
    majorFaculty: {
      facultyId: string
      facultyName: string
    }
  }
}
export type AllFaculty = {
  facultyId: string;
  facultyName: string;
};

export type UserOption = {
  ageMin: number;
  ageMax: number;
  genderPref: string;
  useAge: boolean;
};
