export async function execute(req: any) {
  const { actorRole, action, delegation } = req;

  if (action === "APPROVE_DEED" && actorRole !== "COUNTY_RECORDER") {
    return {
      decision: "DENY",
      reason: "Only County Recorder may approve deeds"
    };
  }

  if (delegation?.expired === true) {
    return {
      decision: "DENY",
      reason: "Delegation expired"
    };
  }

  return {
    decision: "ALLOW",
    reason: "Policy authorization successful"
  };
}
