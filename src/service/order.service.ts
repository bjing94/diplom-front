import axios from "axios";
import {
  OrderCreateCommandRequest,
  OrderCreateCommandResponse,
  OrderFindQueryRequest,
  OrderFindQueryResponse,
  OrderUpdateCommandRequest,
  PaymentUpdateCommandRequest,
} from "./order.interface";

export default class OrderService {
  public static async findOrders(data: OrderFindQueryRequest) {
    return axios.get<OrderFindQueryResponse>(
      "http://localhost:3334/api/order",
      {
        params: { filter: data },
      }
    );
  }

  public static async createOrder(data: OrderCreateCommandRequest) {
    return axios
      .post<OrderCreateCommandResponse>(
        "http://localhost:3334/api/order/create",
        data
      )
      .catch((e) => {
        console.error(e);
        return e;
      });
  }

  public static async updateOrder(data: OrderUpdateCommandRequest) {
    return axios
      .put(`http://localhost:3334/api/order/${data.id}`, data)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  public static async payOrder(data: PaymentUpdateCommandRequest) {
    return axios
      .patch(`http://localhost:3334/api/payment/${data.id}`, data)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }

  public static async runOrderEvents() {
    return axios.get(`http://localhost:3334/api/order/run-events`);
  }
}
