
import { pgPool } from "../../packages/db/postgres";

export async function purgeExpiredEvents(days: number) {
  await pgPool.query(
    "DELETE FROM events WHERE created_at < now() - interval '${days} days'"
  );
}
