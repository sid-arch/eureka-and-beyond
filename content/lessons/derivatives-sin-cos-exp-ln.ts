import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "derivatives-sin-cos-exp-ln",
  title: "Derivatives of cos x, sin x, eˣ and ln x",
  summary: "Learn and use the derivatives of sin x, cos x, eˣ and ln x, see where they come from, and combine them with the basic rules.",
  minutes: 25,
  objectives: [
    "Use (sin x)′ = cos x, (cos x)′ = −sin x, (eˣ)′ = eˣ and (ln x)′ = 1/x.",
    "Explain how the special trig limits give the derivative of sin x.",
    "Write tangent lines for these functions.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["trig-derivatives", "exp-log-derivatives", "special-trig-limits"],
  blocks: [
    def("Four derivatives", r`$\frac{d}{dx}\sin x = \cos x$, $\frac{d}{dx}\cos x = -\sin x$, $\frac{d}{dx}e^x = e^x$, $\frac{d}{dx}\ln x = \frac{1}{x}$ (with $x$ in radians for the trig functions).`),
    example(r`Where $(\sin x)' = \cos x$ comes from`, [
      [r`\frac{\sin(x + h) - \sin x}{h}`, ""],
      [r`= \sin x\,\frac{\cos h - 1}{h} + \cos x\,\frac{\sin h}{h}`, "Angle-sum identity."],
      [r`\to \sin x \cdot 0 + \cos x \cdot 1`, "Special limits."],
    ]),
    example(r`$f(x) = 3\sin x - 2e^x + \ln x$`, [
      [r`f'(x) = 3\cos x - 2e^x + \tfrac{1}{x}`, ""],
    ]),
    example(r`Tangent to $y = \ln x$ at $x = 1$`, [
      [r`y(1) = 0,\ y'(1) = 1`, ""],
      [r`y = x - 1`, ""],
    ]),
    activity("derivative-graph", { title: "Sine and its derivative", params: { fn: "sin", a: 0 } }),
    callout("tip", "Try this", r`With $\sin x$, the lower graph is exactly $\cos x$. Switch to $e^x$: the two graphs are identical, since $e^x$ is its own derivative.`, "experiment"),
    callout("application", "Where this shows up", r`A mass on a spring at position $\sin t$ has velocity $\cos t$: fastest when passing through the middle, momentarily still at the ends.`),
  ],
  questions: [
    num(1, r`If $f(x) = 5\cos x$, find $f'\left(\frac{\pi}{2}\right)$.`, -5, {}, [], r`$-5\sin\frac{\pi}{2} = -5$.`),
    num(2, r`If $f(x) = e^x - \ln x$, find $f'(1)$ to three decimal places.`, 1.718, { tolerance: 0.001 }, [], r`$e - 1 \approx 1.718$.`),
    mc(2, r`What is the slope of $y = e^x$ at $x = 0$?`, ["0", "1", "e", "undefined"], 1, [], r`$e^0 = 1$.`),
    mc(3, r`Why must $x$ be in radians for $(\sin x)' = \cos x$?`, ["Degrees are not real numbers", "The limit sin h / h = 1 holds only for radians", "Cosine is defined only in radians", "It doesn't matter"], 1, [], r`In degrees, $\frac{\sin h°}{h} \to \frac{\pi}{180}$.`, "review"),
  ],
});
