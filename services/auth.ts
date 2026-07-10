import axios from "axios";

import { AUTH_ENDPOINT } from "./config";

export async function getGuestToken() {
  const response = await axios.post(AUTH_ENDPOINT);

  return response.data.token;
}
