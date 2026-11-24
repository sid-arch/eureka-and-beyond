import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "antiderivatives-basic",
  title: "Finding antiderivatives and indefinite integrals: basic rules and notation",
  summary: "Find antiderivatives by reversing derivative rules, write indefinite integrals with +C, and use an initial condition to find a particular antiderivative.",
  minutes: 30,
  objectives: [
    "Use ∫xⁿ dx = xⁿ⁺¹/(n + 1) + C for n ≠ −1, and ∫(1/x) dx = ln|x| + C.",
    "Antidifferentiate eˣ, sin x, cos x and sec² x.",
    "Find the constant C from an initial condition.",
  ],
  concepts: [
    { slug: "antiderivatives", name: "Antiderivatives", description: "Functions whose derivative is a given function; written as indefinite integrals.", subject: "subj_math" },
  ],
  blocks: [
    def("Indefinite integral", r`$\int f(x)\,dx = F(x) + C$ means $F'(x) = f(x)$. The $+C$ records that every vertical shift of $F$ also works.`),
    def("Basic rules", r`$\int x^n\,dx = \frac{x^{n+1}}{n + 1} + C$ ($n \ne -1$); $\int \frac{1}{x}\,dx = \ln|x| + C$; $\int e^x\,dx = e^x + C$; $\int \cos x\,dx = \sin x + C$; $\int \sin x\,dx = -\cos x + C$; $\int \sec^2 x\,dx = \tan x + C$.`),
    example(r`$\int \left(6x^2 - \frac{4}{x^3} + \sqrt{x}\right)dx$`, [
      [r`= 2x^3 - 4\cdot\frac{x^{-2}}{-2} + \frac{x^{3/2}}{3/2} + C`, "Rewrite as powers first."],
      [r`= 2x^3 + \frac{2}{x^2} + \tfrac{2}{3}x^{3/2} + C`, ""],
    ]),
    example(r`$f'(x) = 6x^2$ and $f(1) = 5$. Find $f$.`, [
      [r`f(x) = 2x^3 + C`, ""],
      [r`5 = 2 + C \Rightarrow C = 3`, ""],
      [r`f(x) = 2x^3 + 3`, ""],
    ]),
    callout("tip", "Check by differentiating", r`Every antiderivative can be checked: differentiate your answer and you should get the integrand back.`),
    callout("application", "Where this shows up", r`Knowing a rocket's acceleration and its starting velocity and position, two antiderivatives with initial conditions give its position at every time.`),
  ],
  questions: [
    num(2, r`$f'(x) = 3x^2 + 2$ and $f(0) = -1$. Find $f(2)$.`, 11, {}, [], r`$f = x^3 + 2x - 1$; $f(2) = 8 + 4 - 1 = 11$.`),
    mc(1, r`$\int \cos x\,dx$ is…`, [r`$-\sin x + C$`, r`$\sin x + C$`, r`$\cos x + C$`, r`$-\cos x + C$`], 1, [], r`$(\sin x)' = \cos x$.`),
    mc(2, r`$\int \frac{3}{x}\,dx$ is…`, [r`$3\ln|x| + C$`, r`$-\frac{3}{x^2} + C$`, r`$\frac{3x^0}{0} + C$`, r`$3x + C$`], 0, [], r`The power rule fails for $n = -1$.`),
    num(3, r`A ball is thrown up with velocity $v(t) = 20 - 9.8t$ m/s from height 2 m. Find its height at $t = 1$ s, in meters.`, 17.1, { tolerance: 0.01, unit: "m" }, [], r`$h(t) = 2 + 20t - 4.9t^2$; $h(1) = 17.1$.`, "review"),
  ],
});
