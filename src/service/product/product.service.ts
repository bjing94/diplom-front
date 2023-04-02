import axios from "axios";
import {
  ProductCreateRequest,
  ProductCreateResponse,
  ProductFindQueryRequest,
  ProductFindQueryResponse,
  ProductGetByIdQueryResponse,
  ProductUpdateRequest,
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

  public static async update(dto: ProductUpdateRequest) {
    return axios.put<ProductCreateResponse>(
      `http://localhost:3334/api/product/${dto.id}`,
      dto
    );
  }

  public static async create(dto: ProductCreateRequest) {
    return axios.post<ProductCreateResponse>(
      "http://localhost:3334/api/product",
      dto
    );
  }

  public static async get(id: string) {
    return axios.get<ProductGetByIdQueryResponse>(
      `http://localhost:3334/api/product/${id}`
    );
  }
}
