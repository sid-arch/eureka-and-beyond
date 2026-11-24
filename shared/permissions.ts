// Role-based access control, shared so the UI can hide what the server forbids.
// The server is the authority: every protected route checks these on its own.

export type Role = "student" | "content_editor" | "moderator" | "administrator" | "owner";

export const ROLES: readonly Role[] = ["student", "content_editor", "moderator", "administrator", "owner"];

export const ROLE_LABELS: Record<Role, string> = {
  student: "Student",
  content_editor: "Content editor",
  moderator: "Moderator",
  administrator: "Administrator",
  owner: "Owner",
};

export type Permission =
  | "admin.access"
  | "content.edit"
  | "content.publish"
  | "community.moderate"
  | "feedback.manage"
  | "users.view"
  | "users.manage"
  | "support.password"
  | "analytics.view"
  | "settings.manage"
  | "audit.view";

const STAFF: Permission[] = ["admin.access"];

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  student: [],
  content_editor: [...STAFF, "content.edit", "content.publish", "analytics.view"],
  moderator: [...STAFF, "community.moderate", "feedback.manage", "users.view"],
  administrator: [
    ...STAFF, "content.edit", "content.publish", "community.moderate", "feedback.manage",
    "users.view", "users.manage", "support.password", "analytics.view", "settings.manage", "audit.view",
  ],
  owner: [
    ...STAFF, "content.edit", "content.publish", "community.moderate", "feedback.manage",
    "users.view", "users.manage", "support.password", "analytics.view", "settings.manage", "audit.view",
  ],
};

export function can(role: Role | null | undefined, permission: Permission): boolean {
  return !!role && ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Which roles an actor may grant. Nobody may change their own role (checked separately),
 * only the Owner may grant Administrator, and Owner is never granted through the app —
 * it is provisioned once with the bootstrap script.
 */
export function assignableRoles(actor: Role): Role[] {
  if (actor === "owner") return ["student", "content_editor", "moderator", "administrator"];
  if (actor === "administrator") return ["student", "content_editor", "moderator"];
  return [];
}

/** Whether `actor` may manage (suspend, change role of) an account that has `target` role. */
export function canManageRole(actor: Role, target: Role): boolean {
  if (target === "owner") return false;
  if (target === "administrator") return actor === "owner";
  return actor === "owner" || actor === "administrator";
}
