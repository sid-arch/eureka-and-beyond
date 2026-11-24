import { newId } from "./crypto";

export async function audit(
  db: D1Database,
  entry: { actorId: string | null; action: string; entityType?: string; entityId?: string; metadata?: Record<string, unknown> },
) {
  await db
    .prepare(`INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, metadata) VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(newId("aud"), entry.actorId, entry.action, entry.entityType ?? null, entry.entityId ?? null, JSON.stringify(entry.metadata ?? {}))
    .run();
}

export function auditStatement(
  db: D1Database,
  entry: { actorId: string | null; action: string; entityType?: string; entityId?: string; metadata?: Record<string, unknown> },
) {
  return db
    .prepare(`INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, metadata) VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(newId("aud"), entry.actorId, entry.action, entry.entityType ?? null, entry.entityId ?? null, JSON.stringify(entry.metadata ?? {}));
}
