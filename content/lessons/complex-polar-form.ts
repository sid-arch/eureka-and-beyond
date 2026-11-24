import { callout, def, example, lesson, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "complex-polar-form",
  title: "Complex numbers in polar form",
  summary: "Plot complex numbers in the complex plane, find modulus and argument, convert between rectangular and polar form, and multiply and divide in polar form.",
  minutes: 30,
  objectives: [
    "Plot a + bi in the complex plane and find its modulus and argument.",
    "Convert between a + bi and r(cos θ + i sin θ).",
    "Multiply and divide complex numbers in polar form.",
  ],
  concepts: [
    { slug: "complex-numbers", name: "Complex numbers", description: "Numbers a + bi with real a and b, where i² = −1.", subject: "subj_math" },
  ],
  formulas: ["de-moivre", "polar-conversion"],
  blocks: [
    text(r`Plot $a + bi$ at the point $(a, b)$: real part horizontal, imaginary part vertical. Then describe it like a polar point: its distance from 0 and its angle.`),
    def("Polar form", r`$z = a + bi = r(\cos\theta + i\sin\theta)$, where the modulus is $r = |z| = \sqrt{a^2 + b^2}$ and the argument $\theta$ satisfies $\tan\theta = \frac{b}{a}$ (in the correct quadrant).`),
    def("Multiplying and dividing", r`$z_1z_2 = r_1r_2[\cos(\theta_1 + \theta_2) + i\sin(\theta_1 + \theta_2)]$: multiply moduli, add arguments. $\frac{z_1}{z_2} = \frac{r_1}{r_2}[\cos(\theta_1 - \theta_2) + i\sin(\theta_1 - \theta_2)]$.`),
    example(r`Write $-1 + i\sqrt{3}$ in polar form`, [
      [r`r = \sqrt{1 + 3} = 2`, ""],
      [r`\theta = \tfrac{2\pi}{3}`, "Quadrant II, reference angle π/3."],
      [r`2\left(\cos\tfrac{2\pi}{3} + i\sin\tfrac{2\pi}{3}\right)`, ""],
    ]),
    callout("tip", "Multiplying by i is a rotation", r`$i = \cos\frac{\pi}{2} + i\sin\frac{\pi}{2}$, so multiplying by $i$ rotates any complex number $90^\circ$ counterclockwise without changing its length.`),
    callout("application", "Where this shows up", r`Electrical engineers write AC voltages as phasors $r\angle\theta$, and multiplying phasors (adding angles) is how Ohm's law $V = IZ$ is applied to AC circuits.`),
  ],
  questions: [
    num(1, r`Find the modulus of $3 - 4i$.`, 5, {}, [], r`5.`),
    short(2, r`Write $2i$ in polar form. Use the format 3(cos(pi/4)+isin(pi/4)).`, ["2(cos(pi/2)+isin(pi/2))", "2(cosπ/2+isinπ/2)"], [], r`$r = 2$, $\theta = \frac{\pi}{2}$.`),
    num(2, r`$z_1$ has modulus 3 and argument 40°; $z_2$ has modulus 5 and argument 70°. What is the argument of $z_1 z_2$ in degrees?`, 110, { unit: "°" }, [], r`$40 + 70 = 110^\circ$ (and modulus 15).`),
    short(3, r`Convert $4(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6})$ to $a + bi$ form. Use the format 5sqrt(2)+3i.`, ["2sqrt(3)+2i", "2√3+2i"], [], r`$4 \cdot \frac{\sqrt{3}}{2} + 4 \cdot \frac{1}{2}i = 2\sqrt{3} + 2i$.`, "review"),
  ],
});
