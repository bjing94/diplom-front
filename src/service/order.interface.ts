export enum OrderStatus {
  CREATED = "created",
  PAYED = "payed",
  WAITING_FOR_PAYMENT = "waiting_for_payment",
  COMPLETED = "completed",
  WAITING_FOR_PICKUP = "waiting_for_pickup",
}

export interface OrderFindQueryRequest {
  status: OrderStatus;
}

export interface OrderFindSingle {
  id: string;
  status: OrderStatus;
}

export interface OrderFindQueryResponse {
  orders: OrderFindSingle[];
}

export enum PaymentStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  FULFILLED = "fulfilled",
  REFUNDED = "refunded",
}

export enum PaymentType {
  CARD = "card",
  CASH = "cash",
  BITCOIN = "bitcoin",
}

export interface OrderItem {
  menuItemId: string;

  count: number;
}

export interface PaymentInfo {
  readonly type: PaymentType;
}

export interface OrderCreateCommandRequest {
  readonly orderItems: OrderItem[];

  readonly paymentInfo: PaymentInfo;
}

export interface OrderCreateCommandResponse {
  readonly orderId: string;
}
