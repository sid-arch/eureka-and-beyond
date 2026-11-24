import { Bookmark, BookmarkCheck, Search as SearchIcon, SearchX } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { ACTIVITY_DEFS } from "../../../shared/activities";
import { LEVEL_LABELS, type CourseLevel, type Formula, type SearchResult, type SearchResultType } from "../../../shared/types";
import { Sim } from "../../components/sims/registry";
import { Badge, Button, Container, EmptyState, ErrorState, LevelBadge, Loading, PageHeader, Select, SubjectMark, cx } from "../../components/ui";
import { Math as Tex } from "../../components/ui/Math";
import { api, useApi } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { subjectStyle, type SubjectSlug } from "../../lib/subjects";
import { useTitle } from "../usePageTitle";

const LAB_PAGE_SIZE = 8;

export function LabsPage() {
  useTitle("Interactive labs");
  const [params, setParams] = useSearchParams();
  const subject = (params.get("subject") ?? "") as SubjectSlug | "";
  const selected = params.get("sim") ?? ACTIVITY_DEFS[0].id;
  const q = params.get("q") ?? "";
  const list = ACTIVITY_DEFS.filter((a) => (!subject || a.subject === subject) && (!q || `${a.title} ${a.summary}`.toLowerCase().includes(q.toLowerCase())));
  const def = ACTIVITY_DEFS.find((a) => a.id === selected) ?? ACTIVITY_DEFS[0];
  const pages = Math.max(1, Math.ceil(list.length / LAB_PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(params.get("page")) || 1));
  const shown = list.slice((page - 1) * LAB_PAGE_SIZE, page * LAB_PAGE_SIZE);
  const update = (changes: Record<string, string | null>) => {
    const n = new URLSearchParams(params);
    for (const [k, v] of Object.entries(changes)) { if (v) n.set(k, v); else n.delete(k); }
    setParams(n, { replace: true });
  };
  const pick = (id: string) => {
    update({ sim: id });
    if (window.innerWidth < 1024) requestAnimationFrame(() => document.getElementById("lab-title")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  return (
    <Container>
      <PageHeader title="Interactive labs" lead="Every simulation calculates its results from the underlying equations and states its assumptions. Pick one to explore." />
      <div className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside>
          <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by subject">
            {(["", "mathematics", "physics", "chemistry"] as const).map((s) => (
              <button key={s || "all"} type="button" aria-pressed={subject === s} onClick={() => update({ subject: s || null, page: null })}
                className={cx("rounded-full border px-3 py-1 text-xs font-semibold", subject === s ? "border-primary bg-primary text-white dark:text-[#0d1424]" : "border-line bg-surface text-muted")}>
                {s ? subjectStyle(s).name : "All"}
              </button>
            ))}
          </div>
          <label htmlFor="lab-q" className="sr-only">Search simulations</label>
          <input id="lab-q" type="search" value={q} onChange={(e) => update({ q: e.target.value || null, page: null })} placeholder="Search simulations…" className="mb-3 h-10 w-full rounded-md border border-line bg-surface px-3 text-sm" />
          {list.length === 0 && <p className="text-sm text-muted">No simulations match.</p>}
          <ul className="space-y-1.5" aria-label="Simulations">
            {shown.map((a) => (
              <li key={a.id}>
                <button type="button" onClick={() => pick(a.id)} aria-current={a.id === def.id} className={cx("flex w-full items-start gap-3 rounded-lg border p-3 text-left", a.id === def.id ? "border-primary bg-primary-soft" : "border-line bg-surface hover:bg-sunken")}>
                  <SubjectMark slug={a.subject} size="sm" />
                  <span><span className="block text-sm font-semibold">{a.title}</span><span className="line-clamp-2 text-xs text-muted">{a.summary}</span></span>
                </button>
              </li>
            ))}
          </ul>
          {pages > 1 && (
            <nav aria-label="Simulation pages" className="mt-3 flex items-center justify-between gap-2 text-sm">
              <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => update({ page: page - 1 > 1 ? String(page - 1) : null })}>Previous</Button>
              <span className="text-muted" aria-live="polite">Page {page} of {pages}</span>
              <Button variant="secondary" size="sm" disabled={page >= pages} onClick={() => update({ page: String(page + 1) })}>Next</Button>
            </nav>
          )}
        </aside>
        <section aria-labelledby="lab-title" className="min-w-0 space-y-3">
          <div>
            <h2 id="lab-title" className="scroll-mt-20 text-2xl">{def.title}</h2>
            <p className="mt-1 text-muted">{def.summary}</p>
          </div>
          <Sim key={def.id} id={def.id} />
        </section>
      </div>
    </Container>
  );
}

export function FormulasPage() {
  useTitle("Formula library");
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const subject = params.get("subject") ?? "";
  const [q, setQ] = useState("");
  const formulas = useApi<Formula[]>("/formulas");
  const saved = useApi<{ formulas: { id: string }[] }>(user?.emailVerified ? "/me/bookmarks" : null);
  const savedIds = new Set(saved.data?.formulas.map((f) => f.id));
  const { hash } = useLocation();
  useEffect(() => {
    if (formulas.status === "success" && hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "center" });
  }, [formulas.status, hash]);
  const toggle = async (f: Formula) => {
    if (savedIds.has(f.id)) await api.del(`/me/bookmarks/formula/${f.id}`);
    else await api.put("/me/bookmarks", { kind: "formula", targetId: f.id });
    saved.reload();
  };
  const list = (formulas.data ?? []).filter((f) => (!subject || f.subject.slug === subject) && (!q || `${f.name} ${f.description}`.toLowerCase().includes(q.toLowerCase())));
  return (
    <Container>
      <PageHeader title="Formula library" lead="Every symbol and unit spelled out, with the conditions under which each formula holds." />
      <div className="card mb-6 flex flex-wrap items-center gap-3 p-4">
        <input aria-label="Filter formulas" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name…" className="h-10 min-w-48 flex-1 rounded-md border border-line bg-surface px-3 text-sm" />
        <Select aria-label="Subject" value={subject} onChange={(e) => setParams(e.target.value ? { subject: e.target.value } : {}, { replace: true })} className="w-48">
          <option value="">All subjects</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
        </Select>
      </div>
      {formulas.status === "loading" && <Loading rows={4} />}
      {formulas.status === "error" && <ErrorState error={formulas.error} onRetry={formulas.retry} />}
      {formulas.status === "success" && list.length === 0 && <EmptyState icon={<SearchX />} title="No formulas match" />}
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((f) => {
          const st = subjectStyle(f.subject.slug);
          return (
            <li key={f.slug} id={f.slug} className={cx("card scroll-mt-24 flex flex-col p-5", hash === `#${f.slug}` && "ring-2 ring-primary")}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2"><span aria-hidden className={cx("size-2.5 rounded-full", st.bg)} /><h2 className="text-base">{f.name}</h2></div>
                {user?.emailVerified && (
                  <button type="button" onClick={() => toggle(f)} aria-pressed={savedIds.has(f.id)} aria-label={savedIds.has(f.id) ? `Remove ${f.name} from saved` : `Save ${f.name}`} className="text-muted hover:text-primary">
                    {savedIds.has(f.id) ? <BookmarkCheck aria-hidden className="size-5 text-primary" /> : <Bookmark aria-hidden className="size-5" />}
                  </button>
                )}
              </div>
              <div className="my-4 rounded-lg bg-sunken px-3 py-4 text-center text-xl"><Tex display latex={f.latex} /></div>
              <p className="text-sm text-muted">{f.description}</p>
              {f.variables.length > 0 && (
                <table className="mt-3 w-full text-sm">
                  <caption className="sr-only">Symbols in {f.name}</caption>
                  <tbody className="divide-y divide-line">
                    {f.variables.map((v) => (
                      <tr key={v.symbol}>
                        <th scope="row" className="w-24 py-1.5 pr-2 text-left font-normal"><Tex latex={v.symbol} /></th>
                        <td className="py-1.5">{v.meaning}</td>
                        <td className="py-1.5 text-right text-muted">{v.unit ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

const TYPE_LABEL: Record<SearchResultType, string> = { course: "Course", lesson: "Lesson", formula: "Formula", concept: "Concept" };

export function SearchPage() {
  useTitle("Search");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [draft, setDraft] = useState(q);
  useEffect(() => setDraft(q), [q]);
  const qs = new URLSearchParams();
  for (const k of ["q", "subject", "level", "type"]) if (params.get(k)) qs.set(k, params.get(k)!);
  const results = useApi<{ query: string; results: SearchResult[] }>(q.trim().length >= 2 ? `/search?${qs}` : null);
  const set = (k: string, v: string) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  const submit = (e: FormEvent) => { e.preventDefault(); set("q", draft.trim()); };
  return (
    <Container className="max-w-4xl">
      <PageHeader title="Search" lead="Courses, published lessons, formulas and concepts." />
      <form role="search" onSubmit={submit} className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <label htmlFor="sq" className="sr-only">Search terms</label>
          <input id="sq" type="search" value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={100} autoFocus placeholder="Try “quadratic”, “projectile” or “gas”" className="h-12 w-full rounded-lg border border-line bg-surface pl-11 pr-3 text-base" />
        </div>
        <Button type="submit" size="lg">Search</Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filters">
        <Select aria-label="Subject" value={params.get("subject") ?? ""} onChange={(e) => set("subject", e.target.value)} className="w-auto">
          <option value="">All subjects</option><option value="mathematics">Mathematics</option><option value="physics">Physics</option><option value="chemistry">Chemistry</option>
        </Select>
        <Select aria-label="Level" value={params.get("level") ?? ""} onChange={(e) => set("level", e.target.value)} className="w-auto">
          <option value="">All levels</option>{(Object.keys(LEVEL_LABELS) as CourseLevel[]).map((l) => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
        </Select>
        <Select aria-label="Type" value={params.get("type") ?? ""} onChange={(e) => set("type", e.target.value)} className="w-auto">
          <option value="">All types</option>{(Object.keys(TYPE_LABEL) as SearchResultType[]).map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}s</option>)}
        </Select>
      </div>
      <div className="py-6" aria-live="polite">
        {!q && <p className="text-sm text-muted">Only published content is searchable.</p>}
        {q && q.trim().length < 2 && <p className="text-sm text-muted">Enter at least 2 characters.</p>}
        {results.status === "loading" && q.trim().length >= 2 && <Loading rows={3} label="Searching" />}
        {results.status === "error" && <ErrorState error={results.error} onRetry={results.retry} />}
        {results.status === "success" && (results.data.results.length === 0 ? (
          <EmptyState icon={<SearchX />} title={`Nothing published matches “${results.data.query}”`}>Check the spelling, remove a filter, or browse the <Link className="link" to="/courses">catalog</Link>.</EmptyState>
        ) : (
          <>
            <p className="mb-3 text-sm text-muted">{results.data.results.length} results</p>
            <ul className="space-y-2">
              {results.data.results.map((r) => (
                <li key={`${r.type}-${r.href}`}>
                  <Link to={r.href} className="card flex gap-4 p-4 hover:bg-sunken">
                    <SubjectMark slug={r.subject.slug} size="sm" />
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2"><Badge tone="primary">{TYPE_LABEL[r.type]}</Badge>{r.level && <LevelBadge level={r.level} />}</span>
                      <span className="mt-1 block font-semibold">{r.title}</span>
                      <span className="line-clamp-2 text-sm text-muted">{r.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ))}
      </div>
    </Container>
  );
}
