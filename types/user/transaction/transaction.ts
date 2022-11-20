type order = {
  orderId: string;
};

type payment_type = "PURCHASE" | "TRANSFER";

type payMethod_id = "QR" | "EBANKING" | "MASTERCARD";

export type Transaction = {
  userId: string;
  payMethod_Id: payMethod_id;
  payment_Type: payment_type;
  order: order;
  point_use: number;
};
