import { Check, CircleHelp, Lightbulb, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import type { PracticeCheckResult, PracticeQuestionPublic } from "../../../shared/types";
import { api, ApiRequestError } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { Alert, Badge, Button, cx, Input, ProgressBar } from "../ui";
import { RichText } from "../ui/Math";

const DIFFICULTY = { 1: "Foundational", 2: "Core", 3: "Challenge" } as const;

export type Solved = Record<string, { solved: boolean; attempts: number }>;

export function PracticeSet({ questions, solved, onResult, title }: { questions: PracticeQuestionPublic[]; solved: Solved; onResult: (id: string, correct: boolean) => void; title: string }) {
  const { user } = useAuth();
  const done = questions.filter((q) => solved[q.id]?.solved).length;
  return (
    <section aria-label={title} className="space-y-4">
      <div className="card flex flex-wrap items-center justify-between gap-4 p-4">
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="text-sm text-muted">
            {done} of {questions.length} answered correctly{" "}
            {!user && (
              <>
                · <Link to="/login" className="link">Sign in</Link> to save your progress
              </>
            )}
            {user && !user.emailVerified && " · Verify your email to save progress"}
          </p>
        </div>
        <ProgressBar value={done} max={questions.length} tone="success" label="Practice progress" className="w-40" />
      </div>
      {questions.map((q, i) => (
        <Question key={q.id} q={q} index={i + 1} solvedBefore={solved[q.id]?.solved ?? false} onResult={onResult} />
      ))}
    </section>
  );
}

function Question({ q, index, solvedBefore, onResult }: { q: PracticeQuestionPublic; index: number; solvedBefore: boolean; onResult: (id: string, correct: boolean) => void }) {
  const [answer, setAnswer] = useState("");
  const [hintsShown, setHintsShown] = useState(0);
  const [result, setResult] = useState<PracticeCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const submit = async (e?: FormEvent, value = answer) => {
    e?.preventDefault();
    if (!value.trim()) return setError("Enter an answer first.");
    setPending(true);
    setError(null);
    try {
      const r = await api.post<PracticeCheckResult>(`/practice/${q.id}/check`, { answer: value, hintsUsed: hintsShown });
      setResult(r);
      onResult(q.id, r.correct);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Couldn't check that answer.");
    } finally {
      setPending(false);
    }
  };

  const status = result ? (result.correct ? "correct" : "incorrect") : solvedBefore ? "solved" : "open";
  return (
    <article className={cx("card p-5", status === "correct" && "border-success/50", status === "incorrect" && "border-danger/40")} aria-labelledby={`q-${q.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-sm font-bold text-muted">Q{index}</span>
        <Badge tone={q.difficulty === 3 ? "warning" : q.difficulty === 2 ? "primary" : "neutral"}>{DIFFICULTY[q.difficulty]}</Badge>
        {status === "solved" && <Badge tone="success" dot="bg-success">Solved before</Badge>}
      </div>
      <p id={`q-${q.id}`} className="mt-2 text-[1.05rem] leading-relaxed">
        <RichText text={q.prompt} />
      </p>

      <form onSubmit={submit} className="mt-4 space-y-3">
        {q.kind === "multiple_choice" ? (
          <fieldset>
            <legend className="sr-only">Choices</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.choices!.map((c, i) => {
                const picked = answer === String(i);
                const show = result && picked;
                return (
                  <label
                    key={i}
                    className={cx(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary",
                      picked ? "border-primary bg-primary-soft" : "border-line hover:bg-sunken",
                      show && result.correct && "border-success bg-success-soft",
                      show && !result.correct && "border-danger bg-danger-soft",
                    )}
                  >
                    <input type="radio" name={`q-${q.id}`} value={i} checked={picked} onChange={() => { setAnswer(String(i)); setResult(null); }} className="sr-only" />
                    <span aria-hidden className={cx("flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold", picked ? "border-primary bg-primary text-white" : "border-line")}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span><RichText text={c} /></span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <div className="flex max-w-md items-center gap-2">
            <label htmlFor={`a-${q.id}`} className="sr-only">Your answer</label>
            <Input
              id={`a-${q.id}`}
              value={answer}
              onChange={(e) => { setAnswer(e.target.value); setResult(null); }}
              inputMode={q.kind === "numeric" ? "decimal" : "text"}
              placeholder={q.kind === "numeric" ? "e.g. 4.5, -2, 3/4" : "Your answer"}
              autoComplete="off"
              maxLength={200}
            />
            {q.unit && <span className="text-sm text-muted">{q.unit}</span>}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" loading={pending}>Check answer</Button>
          {hintsShown < q.hints.length && (
            <Button variant="secondary" onClick={() => setHintsShown((h) => h + 1)}>
              <Lightbulb aria-hidden className="size-4" /> {hintsShown ? "Another hint" : "Show a hint"}
            </Button>
          )}
          {(result || hintsShown >= q.hints.length) && !showSolution && (
            <Button variant="ghost" onClick={() => setShowSolution(true)}>
              <CircleHelp aria-hidden className="size-4" /> Show solution
            </Button>
          )}
        </div>
      </form>

      {error && <p role="alert" className="mt-3 text-sm font-medium text-danger">{error}</p>}
      {hintsShown > 0 && (
        <ol className="mt-4 space-y-2">
          {q.hints.slice(0, hintsShown).map((h, i) => (
            <li key={i} className="flex gap-2 rounded-lg bg-warning-soft p-3 text-sm">
              <Lightbulb aria-hidden className="mt-0.5 size-4 shrink-0 text-warning" />
              <span><span className="font-semibold">Hint {i + 1}. </span><RichText text={h} /></span>
            </li>
          ))}
        </ol>
      )}
      <div aria-live="polite">
        {result && (
          <div className={cx("mt-4 flex gap-3 rounded-lg p-3 text-sm", result.correct ? "bg-success-soft" : "bg-danger-soft")}>
            {result.correct ? <Check aria-hidden className="size-5 shrink-0 text-success" /> : <X aria-hidden className="size-5 shrink-0 text-danger" />}
            <div>
              <p className="font-semibold">{result.correct ? "Correct!" : "Not quite."}</p>
              {result.feedback && result.feedback !== "Correct." && result.feedback !== "Not quite." && <p>{result.feedback}</p>}
              {!result.correct && <p className="text-muted">Try again, take a hint, or open the solution.</p>}
            </div>
          </div>
        )}
      </div>
      {showSolution && (
        <div className="mt-4 rounded-lg border border-line bg-sunken p-4 text-sm">
          <p className="font-semibold">Solution</p>
          {result && <p className="mt-1">Answer: <RichText text={result.answerDisplay} /></p>}
          {result ? (
            <p className="mt-1 leading-relaxed"><RichText text={result.solution} /></p>
          ) : (
            <Alert tone="info" className="mt-2">Submit any answer to see the full worked solution. Your attempt is only saved if you're signed in.</Alert>
          )}
        </div>
      )}
    </article>
  );
}
