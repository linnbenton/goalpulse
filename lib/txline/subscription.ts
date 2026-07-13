import { txlineClient } from "./client";

export interface SubscriptionStatus {
  active: boolean;
  serviceLevelId?: number;
  expiresAt?: number;
  apiToken?: string;
}

class TxLineSubscription {
  private cached: SubscriptionStatus | null = null;

  async status(): Promise<SubscriptionStatus> {
    if (this.cached) {
      return this.cached;
    }

    try {
      const res = await txlineClient.get<any>("/subscription/status");

      this.cached = {
        active: !!(res.active ?? res.subscriptionActive),
        serviceLevelId: res.serviceLevelId ?? res.service_level_id,
        expiresAt: res.expiresAt ?? res.expiry ?? res.expiration,
        apiToken: res.apiToken ?? res.token,
      };

      return this.cached;
    } catch {
      return {
        active: false,
      };
    }
  }

  async activate(serviceLevelId = 1, weeks = 1) {
    const res = await txlineClient.post<any>("/token/activate", {
      serviceLevelId,
      weeks,
    });

    this.cached = {
      active: true,
      serviceLevelId,
      expiresAt: res.expiresAt ?? res.expiry,
      apiToken: res.apiToken ?? res.token,
    };

    return this.cached;
  }

  async ensure() {
    const status = await this.status();

    if (status.active) {
      return status;
    }

    return this.activate();
  }

  clear() {
    this.cached = null;
  }
}

export const txlineSubscription = new TxLineSubscription();
