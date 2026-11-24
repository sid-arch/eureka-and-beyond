import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "trig-derivatives-tan-sec",
  title: "Derivatives of tangent, cotangent, secant and cosecant",
  summary: "Derive the derivatives of tan x, cot x, sec x and csc x with the Quotient Rule, and use them with the other derivative rules.",
  minutes: 25,
  objectives: [
    "Derive (tan x)′ = sec² x and (sec x)′ = sec x tan x from sine and cosine.",
    "Use all six trigonometric derivatives.",
    "Combine them with the product and quotient rules.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["trig-derivatives"],
  blocks: [
    example(r`$\frac{d}{dx}\tan x = \frac{d}{dx}\dfrac{\sin x}{\cos x}$`, [
      [r`\frac{\cos x \cos x - \sin x(-\sin x)}{\cos^2 x}`, ""],
      [r`= \frac{1}{\cos^2 x} = \sec^2 x`, "Pythagorean identity."],
    ]),
    example(r`$\frac{d}{dx}\sec x = \frac{d}{dx}(\cos x)^{-1}$`, [
      [r`\frac{0 \cdot \cos x - 1 \cdot (-\sin x)}{\cos^2 x}`, "Quotient Rule with numerator 1."],
      [r`= \frac{1}{\cos x} \cdot \frac{\sin x}{\cos x} = \sec x \tan x`, ""],
    ]),
    def("The other four", r`With $(\sin x)' = \cos x$ and $(\cos x)' = -\sin x$, the remaining four are $(\tan x)' = \sec^2 x$, $(\cot x)' = -\csc^2 x$, $(\sec x)' = \sec x \tan x$, $(\csc x)' = -\csc x \cot x$. The "co-" functions get a minus sign.`),
    callout("application", "Where this shows up", r`If a camera tracks a car moving along a road, the car's position is often $d\tan\theta$, and the tracking speed involves $\sec^2\theta$.`),
  ],
  questions: [
    num(1, r`Find the derivative of $\tan x$ at $x = \frac{\pi}{4}$.`, 2, {}, [], r`$\sec^2\frac{\pi}{4} = (\sqrt{2})^2 = 2$.`),
    num(1, r`Find the derivative of $\sec x$ at $x = 0$.`, 0, {}, [], r`$\sec 0 \tan 0 = 0$.`),
    mc(2, r`$\frac{d}{dx}\cot x$ is…`, [r`$\csc^2 x$`, r`$-\csc^2 x$`, r`$-\csc x\cot x$`, r`$\sec^2 x$`], 1, [], r`Minus sign for the co-function.`),
    num(3, r`Find $\frac{d}{dx}[x\tan x]$ at $x = 0$.`, 0, {}, [], r`$\tan x + x\sec^2 x = 0$ at 0.`, "review"),
  ],
});
