export interface IntentPayload {
  amount?: number;
  irreversible?: boolean;
  zoning?: string;
  controlled?: boolean;
}

export interface Intent {
  id?: string;
  industry: string;
  action?: string;
  payload?: IntentPayload;
  metadata?: Record<string, unknown>;
}
