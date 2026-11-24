import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "selecting-antidifferentiation",
  title: "Selecting techniques for antidifferentiation",
  summary: "Choose a strategy for an integral: simplify algebraically, use a basic rule, substitute, divide or complete the square.",
  minutes: 25,
  objectives: [
    "Recognize when algebra (expanding, splitting fractions) makes an integral basic.",
    "Spot a function and its derivative for substitution.",
    "Pick division or completing the square for rational integrands.",
  ],
  concepts: [
    { slug: "antiderivatives", name: "Antiderivatives", description: "Functions whose derivative is a given function; written as indefinite integrals.", subject: "subj_math" },
  ],
  blocks: [
    def("A checklist", r`1. Is it a basic form, perhaps after rewriting (expand, split a fraction, use exponent rules)? 2. Is there an inner function with its derivative nearby (substitution)? 3. Is it a rational function? Divide if top-heavy; complete the square for arctan; look for ln.`),
    example(r`Three integrals, three strategies`, [
      [r`\int \frac{x^2 + 1}{x}\,dx = \int \left(x + \frac{1}{x}\right)dx`, "Split the fraction."],
      [r`\int \sin x\,e^{\cos x}\,dx = -e^{\cos x} + C`, "Substitute u = cos x."],
      [r`\int \frac{dx}{9 + x^2} = \tfrac{1}{3}\arctan\tfrac{x}{3} + C`, "Arctangent form."],
    ]),
    callout("tip", "Simplify first", r`$\int (x + 1)^2\,dx$ works by substitution, but expanding to $x^2 + 2x + 1$ is just as quick, and both answers differ only by a constant.`),
    callout("application", "Where this shows up", r`Computer algebra systems follow a similar checklist: they try simplifications and pattern matches before more expensive methods.`),
  ],
  questions: [
    mc(1, r`Best first step for $\int \frac{x^3 - x}{x}\,dx$?`, ["Substitution", "Divide term by term to get x² − 1", "Completing the square", "Integration by parts"], 1, [], r`$\int (x^2 - 1)\,dx$.`),
    mc(2, r`Best strategy for $\int x\cos(x^2)\,dx$?`, ["u = x²", "u = cos x", "Long division", "Expand"], 0, [], r`$du = 2x\,dx$ is present (up to a constant).`),
    mc(2, r`$\int \frac{x}{x^2 + 9}\,dx$ equals…`, [r`$\frac{1}{3}\arctan\frac{x}{3} + C$`, r`$\frac{1}{2}\ln(x^2 + 9) + C$`, r`$\ln|x| + C$`, r`$x - 9\ln|x| + C$`], 1, [], r`$u = x^2 + 9$.`),
    mc(3, r`$\int \frac{1}{x^2 + 9}\,dx$ equals…`, [r`$\frac{1}{3}\arctan\frac{x}{3} + C$`, r`$\frac{1}{2}\ln(x^2 + 9) + C$`, r`$\arctan x + C$`, r`$\frac{1}{9}\arctan x + C$`], 0, [], r`Arctangent form with $a = 3$.`, "review"),
  ],
});
