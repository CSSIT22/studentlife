import { InitUserResponse } from "@apiType/user";

export type Restaurant = {
  userid: number;
  id: number;
  resName: string;
  amountOflike: number;
  open: string;
  close: string;
  phone: string;
  website: string;
  vicinity: string;
  status: boolean;
  isFavorite: boolean;
  date: string;
  img: Array<string>;
};

export type Restaurant2 = {
  resId: string
  resName: string
  lastupdated: Date
  likes: number
  detail: Detail[]
  images: Image1[]
  opanAt: Open[]
  closeAt: Close[]
  userLike: Like[]
  userFav: Favorite[]
  userSeen: Seen[]
  reviews: Review2[]
};

export type Detail = {
  resId: string
  phoneNO: string
  website: string
  location: string
  vicinity: string
  latitude: number
  longitude:number
  zone: string
  detailOf: Restaurant
}

export type Image1 = {
  imageId: number
  resId: string
  image: string
  imageOf: Restaurant
}

export type Open = {
  openId: number
  resId: string
  open: string
  day: number
  openOf: Restaurant;
}

export type Close = {
  closeId: number
  resId: string
  close: string
  day: number
  openOf: Restaurant
}

export type Like = {
  userId: string
  resId: string
  isLike: boolean
  updateAt:Date
}

export type Favorite = {
  userId: string
  resId: string
}

export type Seen = {
  userId: string
  resId: string
  seenAt: Date
}


export type Review2 = {
 reviewId: string
 resId: string
 userId: string
 reviewedAt: Date
 text: string
 rating: number
 likedReceived: number
 reviewOf: Restaurant2
 reviewBy: InitUserResponse
};

export type Review = {
  resId: number
  name: string
  picture: string
  rate: string
  review: string
}


