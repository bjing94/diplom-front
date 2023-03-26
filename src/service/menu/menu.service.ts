import axios from "axios";
import { MenuGetQueryResponse } from "./menu.interface";

export default class MenuService {
  public static async getMenu() {
    return axios.get<MenuGetQueryResponse>(
      "http://localhost:3334/api/menu/active"
    );
  }
}
