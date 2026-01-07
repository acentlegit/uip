export async function execute(req: any) {
  let score = 0;

  if (req.action === "TRANSFER_PROPERTY") score += 40;
  if (req.amount && req.amount > 1000000) score += 30;
  if (req.actorTrustLevel === "LOW") score += 30;

  let level = "LOW";
  if (score >= 70) level = "HIGH";
  else if (score >= 40) level = "MEDIUM";

  return {
    riskScore: score,
    riskLevel: level,
    decision: level === "HIGH" ? "REVIEW" : "ALLOW",
    reason: "Deterministic risk score"
  };
}
