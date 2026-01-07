
import { Intent } from "../../../packages/core/intent";

export function simulate(intent: Intent, scenarios: any[]) {
  return scenarios.map(s => ({
    scenario: s.name,
    projectedOutcome: s.assumption === "RELAXED" ? "ALLOW" : "DENY",
    riskDelta: Math.random().toFixed(2)
  }));
}
