You are reviewing lessons of "Eureka and Beyond", a free STEM learning site, for accuracy. The project is at /home/claude/eureka-and-beyond. The owner asked: "go back and check every lesson... make sure all facts and teachings are accurate." Students will learn from these lessons, so errors matter, and so does not introducing new ones.

YOUR LESSONS: the slugs listed in /home/claude/review/GROUP.txt, one per line. Each is the file /home/claude/eureka-and-beyond/content/lessons/<slug>.ts. Edit ONLY these files. Other agents are editing other lesson files at the same time, so never touch any other file in the project: no other lessons, no scripts, no migrations, no src/. Don't run npm build, content:build, deploys or git.

For EVERY lesson in your list, read the whole file and check:
1. Facts and definitions: scientific and mathematical correctness, standard terminology, correct constants and data values (e.g. pKa, standard potentials, entropies, physical constants), correct conventions (signs, units, directions).
2. Every worked example step: each equation and number. Recompute every numeric result with Python (python3 -c ...). Check the rounding and significant figures are sensible.
3. Every practice question: for num(...) questions, recompute the answer from the prompt with Python and check the tolerance accepts the correct value and rejects plausible wrong ones. For mc(...) questions, check that the option at the stated correct index (0-based) is the right one, and that no other option is also correct. Check the solutions and hints agree with the answer and are correct. Hints must not give the answer away.
4. Callouts, applications and summaries: claims about the real world must be true and not overstated.
5. Activity blocks: the activity's title should not claim something its simulation doesn't show. If in doubt, leave it.

How to fix:
- Make the smallest edit that makes it correct, keeping the author's style and the lesson DSL exactly as it is (lesson, def, example(title, [[latex, note], ...]), callout, activity, mc, num; `const r = String.raw`).
- NEVER add, delete or reorder practice questions, blocks or example steps. Database ids depend on their positions. Edit the content in place.
- If a question is unfixable as written, rewrite its prompt, answer, solution and hints in place: same position, same kind (num stays num, mc stays mc).
- Inline math uses $...$ in prose fields. Never put a literal dollar sign in prose. Keep LaTeX valid for KaTeX; inside r`...` backslashes are literal.
- Keep any example step's LaTeX short; split long lines into the note rather than adding steps.
- Don't "improve" wording or style when nothing is wrong. Accuracy only.
- If you're not sure something is wrong, don't change it; note it in your report as a question.

When your list is done:
- Run `cd /home/claude/eureka-and-beyond && npm run -s content:check` (it must print the Outlines line with no errors).
- Run `cp /home/claude/tools/katex-check.mjs /tmp/kc-GROUP.mjs && node /tmp/kc-GROUP.mjs /home/claude/eureka-and-beyond/content/lessons` (it must report 0 problems).
- Fix anything either check reports in YOUR files. If errors are in other agents' files, ignore them; they may be mid-edit.

Write your report to /home/claude/review/GROUP-report.md:
- First line: "Checked N lessons; changed M lessons; X errors fixed."
- Then, for each lesson you changed, one bullet per fix: what was wrong, what it is now, and how you verified it (e.g. "Python: 0.0592/2*log10(50) = 0.0503").
- Then a section "Uncertain / for a human" listing anything you weren't sure about.
- Be honest. Don't claim checks you didn't do. If you ran out of time, list exactly which lessons were not checked.

Your final message should be the report's first line plus the count of uncertain items.
