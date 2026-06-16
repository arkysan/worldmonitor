declare module '@dodopayments/core' {
  export interface WebhookPayload {
    type: string;
    timestamp?: Date;
    [key: string]: unknown;
  }

  export function verifyWebhookPayload(input: {
    webhookKey: string;
    headers: Record<string, string>;
    body: string;
  }): Promise<WebhookPayload>;
}
