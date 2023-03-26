import axios from "axios";
import {
  CookingRequestFindQueryRequest,
  CookingRequestFindQueryResponse,
  CookingRequestUpdateCommandRequest,
  CookingRequestUpdateCommandResponse,
} from "./kitchen.interface";

export default class KitchenService {
  public static async findRequests(data: CookingRequestFindQueryRequest) {
    return axios.get<CookingRequestFindQueryResponse>(
      "http://localhost:3334/api/kitchen/request",
      {
        params: { filter: data },
      }
    );
  }

  public static async updateRequest(data: CookingRequestUpdateCommandRequest) {
    return axios
      .put<CookingRequestUpdateCommandResponse>(
        `http://localhost:3334/api/kitchen/request/${data.id}`,
        data
      )
      .catch((e) => {
        console.error(e);
        return e;
      });
  }
}
