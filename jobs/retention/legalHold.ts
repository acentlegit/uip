
export function applyLegalHold(intentId: string) {
  return { intentId, status: "ON_HOLD" };
}
