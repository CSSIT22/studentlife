export type Product = {
  productId: number;
  name: string;
  image: string;
  brand: string;
  price: number;
  categoryId: number;
  contactId: number;
  description: string;
  color: string;
  size: string;
  stock: number;
  deliveryFee: number;
  views: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Review = {
  id: number;
  userId: string;
  productId: number;
  reviewName: string;
  reviewDesc: string;
  reviewRating: number;
  reviewAt: string;
  reviewImage: string;
};

export type ReiewData = {
  id: number;
  userName: string;
  userImage: string;
  productId: number;
  reviewName: string;
  reviewDesc: string;
  reviewRating: number;
  reviewAt: string;
  reviewImage: string;
};

export type Contact = {
  contactId: number;
  contactPerson: string;
  phoneNo: string;
  address: string;
  lineId: string;
};

export type UserCoupon = {
  couponCode: string,
  couponDesc: string,
  discount: number,
  validFrom: string,
  validTill: string,
  minimumSpend: number,
  productId: number,
  quota: number
}
