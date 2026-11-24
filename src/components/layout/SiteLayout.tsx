import { Bell, BookOpen, ChevronDown, LayoutDashboard, LogOut, Menu, Monitor, Moon, Search, Settings, Shield, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { useSite } from "../../lib/site";
import { useTheme, type ThemePreference } from "../../lib/theme";
import { ButtonLink, Container, cx } from "../ui";

const NAV = [
  { to: "/courses", label: "Courses" },
  { to: "/subjects", label: "Subjects" },
  { to: "/labs", label: "Labs" },
  { to: "/formulas", label: "Formulas" },
];

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cx("inline-flex items-center gap-2.5", className)} aria-label="Eureka and Beyond, home">
      <svg viewBox="0 0 36 36" aria-hidden className="size-9 shrink-0">
        <rect width="36" height="36" rx="10" fill="var(--primary)" />
        <path d="M8 26c3.2-11 6.5-16 10-16s6.8 5 10 16" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <circle cx="18" cy="10" r="3.2" fill="#F08B43" />
        <circle cx="9.5" cy="26" r="2.2" fill="#0E9F9A" />
        <circle cx="26.5" cy="26" r="2.2" fill="#9A8EF5" />
      </svg>
      <span className={cx("whitespace-nowrap font-display text-[1.05rem] font-bold leading-none tracking-tight sm:text-[1.15rem]", compact && "max-[419px]:sr-only")}>Eureka and Beyond</span>
    </Link>
  );
}

const THEMES: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

function ThemeSwitch() {
  const { preference, setPreference } = useTheme();
  const i = THEMES.findIndex((t) => t.value === preference);
  const cur = THEMES[i];
  const next = THEMES[(i + 1) % THEMES.length];
  return (
    <button type="button" onClick={() => setPreference(next.value)} aria-label={`Theme: ${cur.label}. Switch to ${next.label}.`} title={`Theme: ${cur.label}`} className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-sunken hover:text-ink">
      <cur.Icon aria-hidden className="size-[18px]" />
    </button>
  );
}

function useClickOutside(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const on = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) close(); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", on);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", on); document.removeEventListener("keydown", key); };
  }, [open, close]);
  return ref;
}

function AccountMenu() {
  const { user, logout, can } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useClickOutside(open, () => setOpen(false));
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const unread = useApi<{ read_at: string | null }[]>(user ? "/me/notifications" : null);
  const unreadCount = unread.data?.filter((n) => !n.read_at).length ?? 0;
  if (!user) {
    return (
      <div className="hidden items-center gap-1 sm:flex">
        <ButtonLink to="/login" variant="ghost" size="sm">Sign in</ButtonLink>
        <ButtonLink to="/register" size="sm">Join free</ButtonLink>
      </div>
    );
  }
  const item = "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-sunken";
  return (
    <div className="flex items-center gap-1">
      <Link to="/notifications" className="relative inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-sunken hover:text-ink" aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}>
        <Bell aria-hidden className="size-[18px]" />
        {unreadCount > 0 && <span aria-hidden className="absolute right-1.5 top-1.5 size-2 rounded-full bg-chem" />}
      </Link>
      <div ref={ref} className="relative">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-sunken">
          <span aria-hidden className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{user.displayName.slice(0, 1).toUpperCase()}</span>
          <span className="hidden max-w-32 truncate text-sm font-semibold md:inline">{user.displayName}</span>
          <ChevronDown aria-hidden className="size-4 text-muted" />
        </button>
        {open && (
          <div role="menu" className="card absolute right-0 top-11 z-50 w-56 p-1.5">
            <p className="truncate px-3 py-2 text-xs text-muted">{user.email}</p>
            <Link role="menuitem" to="/dashboard" className={item}><LayoutDashboard aria-hidden className="size-4" /> Dashboard</Link>
            <Link role="menuitem" to="/my-courses" className={item}><BookOpen aria-hidden className="size-4" /> My courses</Link>
            <Link role="menuitem" to="/settings" className={item}><Settings aria-hidden className="size-4" /> Settings</Link>
            {can("admin.access") && <Link role="menuitem" to="/admin" className={item}><Shield aria-hidden className="size-4" /> Admin console</Link>}
            <button role="menuitem" type="button" className={cx(item, "w-full text-left")} onClick={async () => { await logout(); navigate("/"); }}>
              <LogOut aria-hidden className="size-4" /> Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Header() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-2 sm:gap-4">
        <Logo className="min-w-0" compact={!!user} />
        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => cx("rounded-md px-3 py-2 text-sm font-semibold transition-colors", isActive ? "bg-primary-soft text-primary-ink" : "text-muted hover:bg-sunken hover:text-ink")}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Link to="/search" aria-label="Search" className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-sunken hover:text-ink sm:size-9">
            <Search aria-hidden className="size-[18px]" />
          </Link>
          <span className="hidden sm:contents"><ThemeSwitch /></span>
          <AccountMenu />
          <button type="button" className="inline-flex size-11 items-center justify-center rounded-md hover:bg-sunken md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </Container>
      {open && (
          <nav id="mobile-nav" aria-label="Main" className="menu-drop overflow-hidden border-t border-line md:hidden">
            <Container className="grid gap-1 py-3">
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} className={({ isActive }) => cx("rounded-md px-3 py-3 font-semibold", isActive ? "bg-primary-soft text-primary-ink" : "hover:bg-sunken")}>{n.label}</NavLink>
              ))}
              <MobileExtras />
            </Container>
          </nav>
        )}
    </header>
  );
}

function MobileExtras() {
  const { user } = useAuth();
  return (
    <div className="mt-2 grid gap-2 border-t border-line pt-3 sm:hidden">
      <div className="flex items-center justify-between px-3 text-sm font-semibold"><span>Theme</span><ThemeSwitch /></div>
      {!user && (
        <div className="grid grid-cols-2 gap-2">
          <ButtonLink to="/login" variant="secondary">Sign in</ButtonLink>
          <ButtonLink to="/register">Join free</ButtonLink>
        </div>
      )}
    </div>
  );
}

function Announcement() {
  const { config } = useSite();
  const a = config.announcement;
  if (!a.enabled || !a.message) return null;
  const tone = { info: "bg-primary text-white", success: "bg-success text-white", warning: "bg-warning-soft text-ink" }[a.tone];
  return <div role="status" className={cx("px-4 py-2 text-center text-sm font-semibold", tone)}>{a.message}</div>;
}

function Footer() {
  const col = (title: string, links: [string, string][]) => (
    <nav aria-label={title}>
      <p className="text-sm font-bold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([to, label]) => <li key={to}><Link to={to} className="text-muted hover:text-ink hover:underline">{label}</Link></li>)}
      </ul>
    </nav>
  );
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 font-display text-lg font-semibold">Discover. Understand. Go Beyond.</p>
          <p className="mt-2 max-w-sm text-sm text-muted">Free, interactive mathematics, physics and chemistry. No subscriptions, no paywalls, and no account needed to learn.</p>
        </div>
        {col("Learn", [["/courses", "Course catalog"], ["/subjects", "Subjects"], ["/labs", "Interactive labs"], ["/formulas", "Formula library"], ["/search", "Search"]])}
        {col("Your account", [["/dashboard", "Dashboard"], ["/support", "Feedback and support"], ["/settings", "Settings"]])}
        {col("About", [["/about", "About the project"], ["/accessibility", "Accessibility"], ["/privacy", "Privacy policy"], ["/terms", "Terms of use"]])}
      </Container>
      <Container className="border-t border-line py-5 text-xs text-muted">
        © {new Date().getFullYear()} Eureka and Beyond. AP is a trademark of the College Board, which is not affiliated with and does not endorse this site.
      </Container>
    </footer>
  );
}

function useRouteFocus() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
}

export function SiteLayout() {
  useRouteFocus();
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <Announcement />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
