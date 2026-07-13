import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TXLINE_API,
  timeout: 30000,
});

let guestToken: string | null = null;

async function authenticate() {
  if (guestToken) {
    return guestToken;
  }

  const response = await axios.post(process.env.NEXT_PUBLIC_TXLINE_AUTH!);

  guestToken =
    response.data.token ?? response.data.jwt ?? response.data.accessToken;

  if (!guestToken) {
    throw new Error("Unable to obtain TxLINE guest token.");
  }

  return guestToken;
}

api.interceptors.request.use(async (config) => {
  const token = await authenticate();

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
