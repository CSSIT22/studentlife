export type createCommunity = {
  communityName: string;
  communityOwnerId: any;
  communityDesc: string;
  communityPrivacy: boolean;
  communityPhoto?: any;
};

export type editCommunity = {
  communityId: string;
  communityName: string;
  communityDesc: string;
  communityPrivacy: boolean;
  communityPhoto?: any;
};

//Owning community
export type OwnCommunity = {
  pendingRequest?: boolean;
  communityName: string;
  communityPrivacy: boolean;
  communityPhoto: any;
  communityId: string;

  communityOwnerId?: string;
  communityMember?: number;
  lastActive?: string;
  communityTags?: number[];
  communityDesc?: string;
  //   communityRole: number;
};
//Joined community
export type JoinedCommunity = {
  communityName: string;
  communityPrivacy: boolean;
  communityPhoto: any;
  communityId: string;

  communityOwnerId?: number;
  communityMember?: number;
  lastActive?: string;
  //   communityTags: number[];
  //   communityDesc: string;
  //   communityRole: number;
};
//Invited community
export type InvitedCommunity = {
  ownerFname?: string;
  ownerLname?: string;
  communityId: number;
  communityName: string;
  communityMember: number;
  communityPhoto: any;
  userName?: string; //inviter name
  expired?: number;
  communityPrivacy: boolean;
  joined?: Date;
  userId?: string;

  communityOwnerId?: number;
  //   communityTags: number[];
  //   communityDesc: string;
  //   communityRole: number;
};
//Suggestions community
export type SuggestionsCommunity = {
  communityName: string;
  communityMember?: number;
  communityPrivacy: boolean;
  communityPhoto: any;

  communityId?: number;
  communityOwnerId?: number;
  communityTags?: number[];
  communityDesc?: string;
  communityRole?: number;
};
//Community
export type CommunityType = {
  userId: string | undefined;
  count: number;
  community: {
    ownCommunity: OwnCommunity[];
    joinedCommunity: JoinedCommunity[];
    invitedCommunity: InvitedCommunity[];
    suggestionsCommunity: SuggestionsCommunity[];
  };
};
