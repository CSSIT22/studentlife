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

export type Shop_Order = {
  orderId: string
  userId: string
  transId: string
  couponCode: string
  totalPrice: number
  totalDeliveryFees: number
  shipping: string
  orderPlaced: Date
  orderStatus: string
}

/**
 * Model Shop_Coupon
 * 
 */
export type Shop_Coupon = {
  couponCode: string
  couponDesc: string
  discount: number
  validFrom: Date
  validTill: Date
  minimumSpend: number
  productId: number
  quota: number
}

/**
 * Model User_Coupon
 * 
 */
export type User_Coupon = {
  userId: string
  couponCode: string
}

/**
 * Model Shop_Product
 * 
 */
export type Shop_Product = {
  productId: number
  categoryId: number
  contactId: number
  productName: string
  productDesc: string
  productColor: string
  productSize: string
  productPrice: number
  productStock: number
  brandName: string
  deliveryFees: number
}

/**
 * Model Shop_Categories
 * 
 */
export type Shop_Categories = {
  categoryId: number
  categoryName: string
  image: string
}

/**
 * Model Shop_Contact
 * 
 */
export type Shop_Contact = {
  contactId: number
  contactPerson: string
  phoneNo: string
  address: string
  lineId: string
}

/**
 * Model Shop_Product_Images
 * 
 */
export type Shop_Product_Images = {
  piId: number
  productId: number
  image: string
}

/**
 * Model Shop_Order_Product
 * 
 */
export type Shop_Order_Product = {
  orderId: string
  productId: number
  quantity: number
}

/**
 * Model Shop_Cart
 * 
 */
export type Shop_Cart = {
  userId: string
  productId: number
  quantity: number
}

/**
 * Model Shop_Product_Review
 * 
 */
export type Shop_Product_Review = {
  reviewId: number
  userId: string
  productId: number
  reviewName: string
  reviewDesc: string
  reviewRating: number
  reviewAt: Date
  image: string
}