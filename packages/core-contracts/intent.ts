
export type IntentStatus =
  | "RECEIVED"
  | "COMPLIANT"
  | "AUTHORIZED"
  | "RISK_ASSESSED"
  | "EXECUTION_READY"
  | "DENIED"
  | "EXECUTED";

export interface Intent {
  id: string;
  type: string;
  industry: string;
  tenantId: string;
  actorId: string;
  status: IntentStatus;
  payload: unknown;
  createdAt: string;
}
