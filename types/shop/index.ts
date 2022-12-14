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
  couponCode: string;
  couponDesc: string;
  discount: number;
  validFrom: string;
  validTill: string;
  minimumSpend: number;
  productId: number;
  quota: number;
};

export type Shop_Order = {
  orderId: string;
  userId: string;
  transId: string;
  couponCode: string;
  totalPrice: string;
  totalDeliveryFees: string;
  shipping: string;
  orderPlaced: Date;
  orderStatus: string;
};

/**
 * Model Shop_Coupon
 *
 */
export type Shop_Coupon = {
  couponCode: string;
  couponDesc: string;
  discount: string;
  validFrom: Date;
  validTill: Date;
  minimumSpend: string;
  productId: number;
  quota: number;
  product: {
    images: {
      image: string;
    }[];
  };
};

/**
 * Model User_Coupon
 *
 */
export type User_Coupon = {
  userId: string;
  couponCode: string;
};

/**
 * Model Shop_Product
 *
 */
export type Shop_Product = {
  productId: number;
  categoryId: number | null;
  contactId: number;
  productName: string;
  productDesc: string;
  productColor: string;
  productSize: string;
  productPrice: string;
  productStock: number;
  brandName: string;
  deliveryFees: string;
  images: {
    image: string;
  }[];
  contactTo: Shop_Contact;
  userReview: Shop_Product_Review[];
};

export type Shop_Product_With_Images = {
  productId: number;
  categoryId: number | null;
  contactId: number;
  productName: string;
  productDesc: string;
  productColor: string;
  productSize: string;
  productPrice: string;
  productStock: number;
  brandName: string;
  deliveryFees: string;
  images: {
    image: string;
  }[];
};

/**
 * Model Shop_Categories
 *
 */
export type Shop_Categories = {
  categoryId: number;
  categoryName: string;
  image: string;
};

/**
 * Model Shop_Contact
 *
 */
export type Shop_Contact = {
  contactId: number;
  contactPerson: string;
  phoneNo: string;
  address: string;
  lineId: string;
};

/**
 * Model Shop_Product_Images
 *
 */
export type Shop_Product_Images = {
  piId: number;
  productId: number;
  image: string;
};

/**
 * Model Shop_Order_Product
 *
 */
export type Shop_Order_Product = {
  orderId: string;
  productId: number;
  quantity: number;
};

/**
 * Model Shop_Cart
 *
 */
export type Shop_Cart = {
  productId: number;
  quantity: number;
  product: Shop_Product_With_Images;
};

/**
 * Model Shop_Product_Review
 *
 */
export type Shop_Product_Review = {
  reviewId: number;
  userId: string;
  productId: number;
  reviewName: string;
  reviewDesc: string;
  reviewRating: number;
  reviewAt: Date;
  image: string;
  user: {
    userId: string;
    fName: string;
    lName: string;
  };
};

export type Post_Product_Review = {
  productId: number;
  reviewName: string;
  reviewDesc: string;
  reviewRating: number;
  image: string;
};
export type User_Coupon_With_Detials = User_Coupon & {
  coupon: Shop_Coupon & {
    product: {
      images: {
        image: string;
      }[];
    } | null;
  };
};

export type Shop_OrderInformation = {
  orderId: string;
  userId: string;
  transId: string;
  couponCode: string;
  totalPrice: string;
  totalDeliveryFees: string;
  shipping: string;
  orderPlaced: Date;
  orderStatus: string;
  products: {
    productId: number;
    categoryId: number | null;
    contactId: number;
    productName: string;
    productDesc: string;
    productColor: string;
    productSize: string;
    productPrice: string;
    productStock: number;
    brandName: string;
    deliveryFees: string;
    images: {
      image: string;
    }[];
  }[];
};
