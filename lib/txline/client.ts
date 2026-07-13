import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { txlineAuth } from "./auth";

const API_BASE = process.env.TXLINE_API ?? "https://txline-dev.txodds.com/api";

class TxLineClient {
  readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE,
      timeout: 30000,
    });

    this.installRequestInterceptor();
    this.installResponseInterceptor();
  }

  private installRequestInterceptor() {
    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const auth = await txlineAuth.ensureAuthenticated();

        config.headers.set("Authorization", `Bearer ${auth.jwt}`);

        if (auth.apiToken) {
          config.headers.set("x-api-token", auth.apiToken);
        }

        config.headers.set("Accept", "application/json");

        return config;
      },
    );
  }

  private installResponseInterceptor() {
    this.api.interceptors.response.use(
      (response) => response,

      async (error: AxiosError) => {
        const status = error.response?.status;

        const original = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if ((status === 401 || status === 403) && !original._retry) {
          original._retry = true;

          txlineAuth.clear();

          const auth = await txlineAuth.ensureAuthenticated();

          original.headers.set("Authorization", `Bearer ${auth.jwt}`);

          if (auth.apiToken) {
            original.headers.set("x-api-token", auth.apiToken);
          }

          return this.api(original);
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>) {
    const res = await this.api.get<T>(url, {
      params,
    });

    return res.data;
  }

  async post<T>(url: string, body?: unknown) {
    const res = await this.api.post<T>(url, body);

    return res.data;
  }
}

export const txlineClient = new TxLineClient();
