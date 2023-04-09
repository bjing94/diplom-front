import axios from "axios";

export default class PaymentService {
  public static async runPaymentEvents() {
    return axios.get(`http://localhost:3334/api/payment/run-events`);
  }
}
