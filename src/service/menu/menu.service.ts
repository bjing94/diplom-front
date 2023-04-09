import axios from "axios";
import {
  MenuCreateCommandRequest,
  MenuCreateCommandResponse,
  MenuFindQueryRequest,
  MenuFindQueryResponse,
  MenuGetQueryResponse,
  MenuUpdateCommandRequest,
  MenuUpdateCommandResponse,
} from "./menu.interface";

export default class MenuService {
  public static async findMenu(data: MenuFindQueryRequest) {
    return axios.get<MenuFindQueryResponse>("http://localhost:3334/api/menu", {
      params: {
        filter: data,
      },
    });
  }

  public static async createMenu(data: MenuCreateCommandRequest) {
    return axios.post<MenuCreateCommandResponse>(
      "http://localhost:3334/api/menu",
      data
    );
  }

  public static async getMenu() {
    return axios.get<MenuGetQueryResponse>(
      "http://localhost:3334/api/menu/active"
    );
  }

  public static async updateMenu(dto: MenuUpdateCommandRequest) {
    return axios.put<MenuUpdateCommandResponse>(
      `http://localhost:3334/api/menu/${dto.id}`,
      dto.data
    );
  }

  public static async runMenuEvents() {
    return axios.get<MenuUpdateCommandResponse>(
      `http://localhost:3334/api/menu/run-events`
    );
  }
}
