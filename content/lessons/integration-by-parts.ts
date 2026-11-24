import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "integration-by-parts",
  title: "Integrating using integration by parts",
  summary: "Reverse the Product Rule with ∫u dv = uv − ∫v du, choose u and dv well, and apply the method repeatedly or to definite integrals.",
  minutes: 30,
  objectives: [
    "Derive integration by parts from the Product Rule.",
    "Choose u (often by LIATE: logs, inverse trig, algebraic, trig, exponential) and dv.",
    "Apply the method twice when needed, and with limits.",
  ],
  concepts: [
    { slug: "antiderivatives", name: "Antiderivatives", description: "Functions whose derivative is a given function; written as indefinite integrals.", subject: "subj_math" },
  ],
  blocks: [
    def("Integration by parts", r`$\int u\,dv = uv - \int v\,du$, from $(uv)' = u'v + uv'$. Pick $u$ to get simpler when differentiated and $dv$ to be easy to integrate.`),
    example(r`$\int x e^x\,dx$`, [
      [r`u = x,\ dv = e^x\,dx \Rightarrow du = dx,\ v = e^x`, ""],
      [r`xe^x - \int e^x\,dx = e^x(x - 1) + C`, ""],
    ]),
    example(r`$\int \ln x\,dx$`, [
      [r`u = \ln x,\ dv = dx \Rightarrow du = \tfrac{1}{x}dx,\ v = x`, ""],
      [r`x\ln x - \int 1\,dx = x\ln x - x + C`, ""],
    ]),
    example(r`$\int x^2 e^x\,dx$ (twice)`, [
      [r`x^2 e^x - \int 2x e^x\,dx`, "u = x²."],
      [r`= x^2e^x - 2e^x(x - 1) + C`, "Use the first example for ∫2xeˣ dx."],
      [r`= e^x(x^2 - 2x + 2) + C`, ""],
    ]),
    callout("application", "Where this shows up", r`Expected values in probability ($\int x e^{-x}\,dx$) and work done by a varying force often need integration by parts.`),
  ],
  questions: [
    num(1, r`Evaluate $\int_0^1 xe^x\,dx$.`, 1, {}, [], r`$[e^x(x - 1)]_0^1 = 0 - (-1) = 1$.`),
    num(2, r`Evaluate $\int_1^e \ln x\,dx$.`, 1, {}, [], r`$[x\ln x - x]_1^e = 0 - (-1) = 1$.`),
    num(2, r`Evaluate $\int_0^{\pi} x\sin x\,dx$ to three decimal places.`, 3.142, { tolerance: 0.002 }, [r`$u = x$, $dv = \sin x\,dx$.`], r`$[-x\cos x + \sin x]_0^{\pi} = \pi$.`),
    mc(3, r`For $\int x\cos x\,dx$, which choice works?`, ["u = cos x, dv = x dx", "u = x, dv = cos x dx", "u = x cos x, dv = dx", "Parts doesn't apply"], 1, [], r`Gives $x\sin x + \cos x + C$.`, "review"),
  ],
});
