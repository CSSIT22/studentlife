export type Restaurant = {
  userid: number
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
  resId: string;
  resName: string;
  lastupdated: Date;
  likes: number;
  isSeen: boolean
  detail: Detail[]
  images: Image1[]
  opanAt: Open[]
  closeAt: Close[]
};

export type Detail = {
  resId: string,
  phoneNO: string,
  website: string,
  location: string,
  vicinity: string,
  latitude: number,
  longitude:number,
  zone: string
  detailOf: Restaurant
}

export type Image1 = {
  imageId: number,
  resId: string,
  image: string,
  imageOf: Restaurant
}

export type Open = {
  openId: number;
  resId: string,
  open: string,
  day: number,
  openOf: Restaurant;
}

export type Close = {
  closeId: number;
  resId: string,
  close: string,
  day: number,
  openOf: Restaurant;
}


export type Review = {
  resId: number;
  name: string;
  picture: string;
  rate: string;
  review: string;
};
