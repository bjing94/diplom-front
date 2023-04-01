import axios from "axios";
import {
  MenuGetQueryResponse,
  MenuUpdateCommandRequest,
  MenuUpdateCommandResponse,
} from "./menu.interface";

export default class MenuService {
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
}
