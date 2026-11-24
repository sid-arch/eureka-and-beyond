import { BarChart3, Bell, BookMarked, BookOpen, ClipboardList, FileClock, FlaskConical, Gauge, LayoutDashboard, LifeBuoy, MessageSquare, Settings, Shield, SlidersHorizontal, Sigma, Target, Users, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router";
import type { Permission } from "../../../shared/permissions";
import { useAuth } from "../../lib/auth";
import { Alert, Container, Loading, cx } from "../ui";

function SideNav({ items, label }: { items: { to: string; label: string; Icon: LucideIcon; end?: boolean }[]; label: string }) {
  return (
    <nav aria-label={label} className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => cx("flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors", isActive ? "bg-primary-soft text-primary-ink" : "text-muted hover:bg-sunken hover:text-ink")}>
          <i.Icon aria-hidden className="size-4" /> {i.label}
        </NavLink>
      ))}
    </nav>
  );
}

/** Requires a signed-in user; sends others to the sign-in page and back again afterwards. */
export function RequireUser({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Container><Loading /></Container>;
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`} replace />;
  return <>{children}</>;
}

export function AccountShell() {
  const { user } = useAuth();
  return (
    <RequireUser>
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-8 py-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside>
          <SideNav label="Account" items={[
            { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
            { to: "/my-courses", label: "My courses", Icon: BookOpen },
            { to: "/bookmarks", label: "Saved", Icon: BookMarked },
            { to: "/practice-history", label: "Practice", Icon: Target },
            { to: "/notifications", label: "Notifications", Icon: Bell },
            { to: "/support", label: "Support", Icon: LifeBuoy },
            { to: "/settings", label: "Settings", Icon: Settings },
          ]} />
        </aside>
        <div className="min-w-0">
          {user && !user.emailVerified && <VerifyBanner />}
          <Outlet />
        </div>
      </Container>
    </RequireUser>
  );
}

import { useState } from "react";
import { api } from "../../lib/api";
function VerifyBanner() {
  const [sent, setSent] = useState(false);
  return (
    <Alert tone="warning" title="Confirm your email address" className="mb-6">
      We sent you a link. Until you confirm, progress, practice history and posts aren't saved.{" "}
      {sent ? "A new link is on its way." : <button type="button" className="link" onClick={async () => { await api.post("/auth/resend-verification").catch(() => {}); setSent(true); }}>Send a new link</button>}
    </Alert>
  );
}

const ADMIN_NAV: { to: string; label: string; Icon: LucideIcon; perm: Permission; end?: boolean }[] = [
  { to: "/admin", label: "Overview", Icon: Gauge, perm: "admin.access", end: true },
  { to: "/admin/curriculum", label: "Curriculum", Icon: ClipboardList, perm: "content.edit" },
  { to: "/admin/formulas", label: "Formulas", Icon: Sigma, perm: "content.edit" },
  { to: "/admin/activities", label: "Activities", Icon: FlaskConical, perm: "content.edit" },
  { to: "/admin/feedback", label: "Feedback inbox", Icon: LifeBuoy, perm: "feedback.manage" },
  { to: "/admin/moderation", label: "Moderation", Icon: MessageSquare, perm: "community.moderate" },
  { to: "/admin/users", label: "Users", Icon: Users, perm: "users.view" },
  { to: "/admin/analytics", label: "Analytics", Icon: BarChart3, perm: "analytics.view" },
  { to: "/admin/settings", label: "Settings", Icon: SlidersHorizontal, perm: "settings.manage" },
  { to: "/admin/audit", label: "Audit log", Icon: FileClock, perm: "audit.view" },
];

export function AdminShell() {
  const { user, can, loading } = useAuth();
  if (loading) return <Container><Loading /></Container>;
  if (!user) return <Navigate to="/login?next=/admin" replace />;
  if (!can("admin.access")) {
    return (
      <Container className="py-16">
        <Alert tone="danger" title="You don't have access to the admin console">Ask an administrator if you need access.</Alert>
      </Container>
    );
  }
  return (
    <div className="mx-auto grid w-full max-w-[96rem] grid-cols-[minmax(0,1fr)] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:px-8">
      <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
        <p className="mb-3 hidden items-center gap-2 px-3 text-xs font-bold text-muted lg:flex"><Shield aria-hidden className="size-3.5" /> Admin console</p>
        <SideNav label="Admin" items={ADMIN_NAV.filter((n) => can(n.perm))} />
      </aside>
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}

export function RequirePermission({ perm, children }: { perm: Permission; children: ReactNode }) {
  const { can } = useAuth();
  if (!can(perm)) return <Alert tone="danger" title="Not available for your role">This section needs a permission your account doesn't have.</Alert>;
  return <>{children}</>;
}
