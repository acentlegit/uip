
export interface EventRecord {
  eventId: string;
  intentId: string;
  engine: string;
  eventType: string;
  payload: unknown;
  previousHash?: string;
  hash: string;
  timestamp: string;
}
