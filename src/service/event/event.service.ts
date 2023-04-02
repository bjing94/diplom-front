import axios from "axios";
import { EventResponse, FindEventsFilterDto } from "./event.interface";

export default class EventService {
  public static async getOrderEvents(filter: FindEventsFilterDto) {
    return axios.get<EventResponse[]>("http://localhost:3334/api/event/order", {
      params: { filter: filter },
    });
  }

  public static async getProductEvents(filter: FindEventsFilterDto) {
    return axios.get<EventResponse[]>(
      "http://localhost:3334/api/event/product",
      {
        params: { filter: filter },
      }
    );
  }

  public static async getPaymentEvents(filter: FindEventsFilterDto) {
    return axios.get<EventResponse[]>(
      "http://localhost:3334/api/event/payment",
      {
        params: { filter: filter },
      }
    );
  }

  public static async getCookingRequest(filter: FindEventsFilterDto) {
    return axios.get<EventResponse[]>(
      "http://localhost:3334/api/event/cooking-request",
      {
        params: { filter: filter },
      }
    );
  }
  public static async getCookingStockEvents(filter: FindEventsFilterDto) {
    return axios.get<EventResponse[]>(
      "http://localhost:3334/api/event/cooking-stock",
      {
        params: { filter: filter },
      }
    );
  }

  public static async getMenuEvents(filter: FindEventsFilterDto) {
    return axios.get<EventResponse[]>("http://localhost:3334/api/event/menu", {
      params: { filter: filter },
    });
  }
}
