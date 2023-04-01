import axios from "axios";
import {
  ProductFindQueryRequest,
  ProductFindQueryResponse,
} from "./product.interface";

export default class ProductService {
  public static async getAllProducts(filter: ProductFindQueryRequest) {
    return axios.get<ProductFindQueryResponse>(
      "http://localhost:3334/api/product",
      {
        params: {
          filter,
        },
      }
    );
  }

  // public static async updateMenu(dto: MenuUpdateCommandRequest) {
  //   return axios.put<MenuUpdateCommandResponse>(
  //     `http://localhost:3334/api/menu/${dto.id}`,
  //     dto.data
  //   );
  // }
}
