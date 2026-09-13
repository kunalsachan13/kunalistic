import {
  SupportPaymentProvider,
  CreatePaymentParams,
  PaymentOrderResult,
  VerifyPaymentParams,
  PaymentVerificationResult,
} from "./provider";

export class SimulatorPaymentProvider implements SupportPaymentProvider {
  async createPayment(params: CreatePaymentParams): Promise<PaymentOrderResult> {
    const orderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return {
      orderId,
      provider: "simulator",
      amount: params.amount,
      currency: params.currency || "INR",
      keyId: "sim_key_kunalistic",
    };
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<PaymentVerificationResult> {
    // Cryptographic simulated signature check
    const isValid = params.signature.startsWith("sim_sig_") || params.signature === "sim_valid_token";

    if (!isValid) {
      return {
        success: false,
        transactionId: params.paymentId || "unknown",
        amount: 0,
        currency: "INR",
        status: "failed",
      };
    }

    return {
      success: true,
      transactionId: params.paymentId || `txn_${Date.now()}`,
      amount: 99, // default fallback
      currency: "INR",
      status: "completed",
      supporterName: params.showOnWall ? (params.supporterName || "Anonymous Friend") : undefined,
      supporterMessage: params.showOnWall ? params.supporterMessage : undefined,
      showOnWall: params.showOnWall || false,
    };
  }

  async getPaymentStatus(paymentId: string): Promise<string> {
    return "completed";
  }

  async handleWebhook(rawBody: string, signature: string): Promise<{ handled: boolean; event: string }> {
    return { handled: true, event: "payment.captured" };
  }
}
