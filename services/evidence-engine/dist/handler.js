"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const crypto_1 = __importDefault(require("crypto"));
async function execute(req) {
    const payload = JSON.stringify(req);
    const hash = crypto_1.default
        .createHash("sha256")
        .update(payload)
        .digest("hex");
    return {
        evidenceHash: hash,
        algorithm: "SHA-256",
        timestamp: new Date().toISOString()
    };
}
