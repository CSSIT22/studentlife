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

export type order = {
  orderId: string;
};

// export type payment_type = "PURCHASE" | "TRANSFER";

export type payMethod_id = 0 | 1 | 2;
