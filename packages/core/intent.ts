
export interface Intent {
  id: string;
  type: string;
  industry: string;
  tenantId: string;
  actorId: string;
  status: string;
  payload: unknown;
  createdAt: string;
}
