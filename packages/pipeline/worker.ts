
import { Worker } from "bullmq";

export function createWorker(engine: string, handler: Function) {
  return new Worker(engine, async job => handler(job.data));
}
