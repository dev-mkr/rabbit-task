export interface Order {
  id: number;
  customerName: string;
  status: OrderStatus;
  items: string[];
  createdAt: string;
}

export enum OrderStatus {
  NEW = "New",
  PICKING = "Picking",
  DELIVERING = "Delivering",
  DELIVERED = "Delivered",
  CANCELED = "Canceled",
}
