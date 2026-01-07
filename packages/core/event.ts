
export interface EventRecord {
  eventId: string;
  intentId: string;
  engine: string;
  eventType: string;
  payload: unknown;
  hash: string;
  timestamp: string;
}
