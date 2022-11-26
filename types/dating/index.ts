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
      facultyName: string
    }
  }
}
export type AllFaculty = {
  facultyId: string;
  facultyName: string;
<<<<<<< HEAD
};

export type UserOption = {
  ageMin: number;
  ageMax: number;
  genderPref: string;
  useAge: boolean;
};
=======
};
>>>>>>> 6285b7027d862b7fe8f23db177e3569235f9cd20
