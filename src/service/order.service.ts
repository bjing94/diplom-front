import axios from "axios";
import {
  OrderCreateCommandRequest,
  OrderCreateCommandResponse,
  OrderFindQueryRequest,
  OrderFindQueryResponse,
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
}