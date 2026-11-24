import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parametric-vector-motion",
  title: "Solving motion problems using parametric and vector-valued functions",
  summary: "Solve planar motion problems: position, velocity, speed, acceleration, displacement and total distance, and when a particle moves in a given direction.",
  minutes: 30,
  objectives: [
    "Combine derivatives and integrals of vector functions in one problem.",
    "Find total distance as ∫ speed dt, and displacement as ∫ v dt.",
    "Determine when the particle moves left, right, up or down.",
  ],
  concepts: [
    { slug: "parametric-curves", name: "Parametric curves", description: "Curves traced by (x(t), y(t)) as a parameter t varies.", subject: "subj_math" },
  ],
  blocks: [
    def("The toolkit", r`Position $\mathbf{r}(t)$; velocity $\mathbf{r}'(t)$; speed $|\mathbf{v}(t)|$; distance traveled $\int_a^b |\mathbf{v}(t)|\,dt$; displacement $\int_a^b \mathbf{v}(t)\,dt$. The particle moves right when $x'(t) > 0$ and up when $y'(t) > 0$.`),
    example(r`$\mathbf{r}(t) = \langle 3\cos t, 3\sin t\rangle$, $0 \le t \le \pi$`, [
      [r`\mathbf{v}(t) = \langle -3\sin t, 3\cos t\rangle,\ |\mathbf{v}| = 3`, ""],
      [r`\text{distance} = 3\pi \approx 9.42`, "Half a circle of radius 3."],
      [r`\text{displacement} = \mathbf{r}(\pi) - \mathbf{r}(0) = \langle -6, 0\rangle`, ""],
      [r`\text{moving up while } \cos t > 0:\ 0 \le t < \tfrac{\pi}{2}`, ""],
    ]),
    activity("vectors", { title: "Velocity components add to the velocity vector", params: { ux: 3, uy: 0, vx: 0, vy: 4 } }),
    callout("application", "Where this shows up", r`Air traffic control and sports analytics (a soccer ball's flight, a runner's path) track exactly these quantities from position data.`),
  ],
  questions: [
    num(2, r`$\mathbf{v}(t) = \langle 6t, 8t\rangle$. Find the distance traveled for $0 \le t \le 2$.`, 20, {}, [], r`Speed $10t$; $\int_0^2 10t\,dt = 20$.`),
    mc(2, r`$\mathbf{v}(t) = \langle t - 2, t^2 - 9\rangle$. For $0 < t < 2$, the particle moves…`, ["left and down", "left and up", "right and down", "right and up"], 0, [], r`Both components are negative there.`),
    num(2, r`$\mathbf{v}(t) = \langle 3, 4\rangle$ for $0 \le t \le 5$. Find the distance traveled.`, 25, {}, [], r`Constant speed 5.`),
    mc(3, r`Total distance traveled equals the magnitude of displacement when…`, ["always", "the path is a straight line traveled in one direction", "speed is constant", "never"], 1, [], r`Any turning or doubling back makes distance larger.`, "review"),
  ],
});
