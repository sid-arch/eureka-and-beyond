import { callout, def, example, lesson, mc, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "de-moivres-theorem",
  title: "De Moivre's Theorem",
  summary: "Raise complex numbers to powers with De Moivre's Theorem and find all nth roots of a complex number.",
  minutes: 30,
  objectives: [
    "Use De Moivre's Theorem to compute powers of complex numbers.",
    "Find the n distinct nth roots of a complex number.",
    "Describe the roots geometrically as vertices of a regular polygon.",
  ],
  concepts: [
    { slug: "complex-numbers", name: "Complex numbers", description: "Numbers a + bi with real a and b, where i² = −1.", subject: "subj_math" },
  ],
  formulas: ["de-moivre"],
  blocks: [
    def("De Moivre's Theorem", r`$[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta)$. It follows from multiplying in polar form $n$ times.`),
    example(r`Compute $(1 + i)^8$`, [
      [r`1 + i = \sqrt{2}\left(\cos\tfrac{\pi}{4} + i\sin\tfrac{\pi}{4}\right)`, ""],
      [r`(\sqrt{2})^8(\cos 2\pi + i\sin 2\pi) = 16`, ""],
    ]),
    def("nth roots", r`The $n$ nth roots of $r(\cos\theta + i\sin\theta)$ are $\sqrt[n]{r}\left[\cos\frac{\theta + 2\pi k}{n} + i\sin\frac{\theta + 2\pi k}{n}\right]$ for $k = 0, 1, \dots, n - 1$. They're evenly spaced around a circle, forming a regular $n$-gon.`),
    example(r`Find the cube roots of $8$`, [
      [r`8 = 8(\cos 0 + i\sin 0)`, ""],
      [r`2\left(\cos\tfrac{2\pi k}{3} + i\sin\tfrac{2\pi k}{3}\right),\ k = 0, 1, 2`, ""],
      [r`2,\ -1 + i\sqrt{3},\ -1 - i\sqrt{3}`, "An equilateral triangle of points."],
    ]),
    callout("application", "Where this shows up", r`Roots of unity are central to the Fast Fourier Transform, the algorithm behind audio compression, image processing and fast multiplication of huge numbers.`),
  ],
  questions: [
    num(2, r`Compute the modulus of $(1 + i\sqrt{3})^5$.`, 32, {}, [r`$|1 + i\sqrt{3}| = 2$.`], r`$2^5 = 32$.`),
    mc(2, r`What is $i^{100}$ by De Moivre?`, ["1", "i", "−1", "−i"], 0, [r`$\cos(50\pi) + i\sin(50\pi)$.`], r`$50\pi$ is a multiple of $2\pi$: 1.`),
    num(2, r`How many distinct fifth roots does any nonzero complex number have?`, 5, {}, [], r`5.`),
    short(3, r`Find the square roots of $i$. Use the format ±(sqrt(3)/2+1/2i).`, ["±(sqrt(2)/2+sqrt(2)/2i)", "±(√2/2+√2/2i)"], [r`$i = \cos\frac{\pi}{2} + i\sin\frac{\pi}{2}$; halve the angle.`], r`$\pm\left(\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i\right)$.`, "review"),
  ],
});
