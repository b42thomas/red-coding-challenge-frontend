import { Orders } from "./orders";
const apiUrl = process.env.REACT_APP_API_URL as string;
// const apiUrl = "http://localhost:5001/order/get";
const apiKey = process.env.REACT_APP_API_KEY as string;
export const OrderAPI = new Orders(apiUrl, apiKey);