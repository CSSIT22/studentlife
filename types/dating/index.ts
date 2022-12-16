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
    type: string;
    data: number[];
  };
  details: {
    birth: Date;
    sex: string;
  };
  interests: {
    interestId: number;
  }[];
  studentMajor: {
    majorFaculty: {
      facultyId: string;
      facultyName: string;
    };
  };
};
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

export type HeartGiver = {
  heartGiver: {
    userId: string;
    fName: string;
    lName: string;
    image: {
      type: string;
      data: number[];
    };
    details: {
      birth: Date;
      sex: string;
    };
    interests: {
      interestId: number;
    }[];
    studentMajor: {
      majorFaculty: {
        facultyId: string;
        facultyName: string;
      };
    };
  };
};

export type PollDetail = {
  pollId: string;
  userId: string;
  pollName: string;
  pollPlace: string;
  pollAppointAt: any;
  pollText: string;
  participantMin: number;
  participantMax: number;
  isOpen: boolean;
  pollcreated: any;
};

export type FollowDetail = {
  following: {
    userId: string;
    fName: string;
    lName: string;
    image: {
      type: string;
      data: number[];
    };
    receiveRate: {
      score: number;
    };
  };
};

export type PollInfo = {
  pollCreator: {
    userId: string;
    fName: string;
    lName: string;
    image: {
      type: string;
      data: number[];
    };
  };
  pollId: string;
  pollName: string;
  pollText: string;
  participantMin: number;
  participantMax: number;
  pollAppointAt: any;
  pollPlace: string;
  isOpen: boolean;
  participants: {
    isAccepted: boolean,
    user: {
      userId: string;
      fName: string;
      lName: string;
      image: {
        type: string;
        data: number[];
      };
    };
  }[];
  interests: {
    interest: {
      interestName: true;
    };
  }[];
};
