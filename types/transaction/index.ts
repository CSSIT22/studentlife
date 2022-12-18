export type Transaction = {
  transId: Text;
  userId: Text;
  payMethodId: number;
  total_price: number;
};

export type CreditCard = {
  CC_name: string;
  CC_id: string;
  exp_month: number;
  exp_year: number;
  country: string;
  cvc: number;
};

export type reqCCuser = {
  userId: string;
  card: CreditCard;
};
export type product = {
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

export type confirmOrder = {
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
    orderId: string;
    productId: number;
    quantity: number;
    product: product;
  }[];
};
