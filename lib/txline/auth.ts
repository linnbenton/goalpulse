import axios, { AxiosInstance } from "axios";

const API_ORIGIN =
  process.env.TXLINE_API ?? "https://txline-dev.txodds.com/api";

const GUEST_AUTH =
  process.env.TXLINE_GUEST_AUTH ??
  "https://txline-dev.txodds.com/auth/guest/start";

export interface AuthState {
  jwt: string | null;
  apiToken: string | null;
  refreshToken: string | null;
  expiresAt: number;
}

class TxLineAuth {
  private state: AuthState = {
    jwt: null,
    apiToken: null,
    refreshToken: null,
    expiresAt: 0,
  };

  private authClient: AxiosInstance;

  constructor() {
    this.authClient = axios.create({
      baseURL: API_ORIGIN,
      timeout: 30000,
    });
  }

  get jwt() {
    return this.state.jwt;
  }

  get apiToken() {
    return this.state.apiToken;
  }

  get bearer() {
    if (!this.state.jwt) return "";

    return `Bearer ${this.state.jwt}`;
  }

  isExpired() {
    return Date.now() >= this.state.expiresAt;
  }

  async guestLogin() {
    const res = await axios.post(
      GUEST_AUTH,
      {},
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const data = res.data;

    console.log("========== GUEST LOGIN ==========");
    console.log(data);

    this.state.jwt = data.jwt ?? data.token ?? data.accessToken ?? null;

    this.state.refreshToken = data.refreshToken ?? null;

    this.state.expiresAt = Date.now() + 50 * 60 * 1000;

    return this.state.jwt;
  }

  async activate() {
    if (!this.state.jwt) {
      await this.guestLogin();
    }

    const res = await this.authClient.post(
      "/token/activate",
      {
        serviceLevelId: 1,
        weeks: 1,
      },
      {
        headers: {
          Authorization: this.bearer,
          Accept: "application/json",
        },
      },
    );

    const data = res.data;

    console.log("========== ACTIVATE RESPONSE ==========");
    console.log(data);

    this.state.apiToken =
      data.apiToken ?? data.token ?? data.accessToken ?? null;

    return this.state.apiToken;
  }

  async ensureAuthenticated() {
    if (!this.state.jwt || this.isExpired()) {
      await this.guestLogin();
    }

    return {
      jwt: this.state.jwt!,
      apiToken: this.state.apiToken,
    };
  }

  setApiToken(token: string) {
    this.state.apiToken = token;
  }

  clear() {
    this.state = {
      jwt: null,
      apiToken: null,
      refreshToken: null,
      expiresAt: 0,
    };
  }
}

export const txlineAuth = new TxLineAuth();
