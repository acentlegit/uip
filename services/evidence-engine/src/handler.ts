import crypto from "crypto";

export async function execute(req: any) {
  const payload = JSON.stringify(req);

  const hash = crypto
    .createHash("sha256")
    .update(payload)
    .digest("hex");

  return {
    evidenceHash: hash,
    algorithm: "SHA-256",
    timestamp: new Date().toISOString()
  };
}
