export interface CreatePaymentParams {
  amount: number;
  currency: string;
  supporterName?: string;
  supporterMessage?: string;
  showOnWall?: boolean;
  metadata?: Record<string, unknown>;
}

export interface PaymentOrderResult {
  orderId: string;
  provider: string;
  amount: number;
  currency: string;
  keyId?: string;
}

export interface VerifyPaymentParams {
  orderId: string;
  paymentId: string;
  signature: string;
  supporterName?: string;
  supporterMessage?: string;
  showOnWall?: boolean;
}

export interface PaymentVerificationResult {
  success: boolean;
  transactionId: string;
  amount: number;
  currency: string;
  status: "completed" | "failed" | "pending";
  supporterName?: string;
  supporterMessage?: string;
  showOnWall?: boolean;
}

export interface SupportPaymentProvider {
  createPayment(params: CreatePaymentParams): Promise<PaymentOrderResult>;
  verifyPayment(params: VerifyPaymentParams): Promise<PaymentVerificationResult>;
  getPaymentStatus(paymentId: string): Promise<string>;
  handleWebhook(rawBody: string, signature: string): Promise<{ handled: boolean; event: string }>;
}
