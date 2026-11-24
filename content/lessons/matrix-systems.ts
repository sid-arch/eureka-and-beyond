import { callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "matrix-systems",
  title: "Solving systems with matrices",
  summary: "Write a linear system as AX = B, solve it with an inverse matrix, and solve larger systems by row reduction of an augmented matrix.",
  minutes: 35,
  objectives: [
    "Write a system as a matrix equation AX = B.",
    "Solve 2 × 2 systems with X = A⁻¹B.",
    "Use row operations on an augmented matrix to solve systems of three equations.",
  ],
  concepts: [
    { slug: "matrices", name: "Matrices", description: "Rectangular arrays of numbers with their own arithmetic.", subject: "subj_math" },
    { slug: "systems-of-equations", name: "Systems of linear equations", description: "Two or more equations solved together; solutions satisfy all of them.", subject: "subj_math" },
  ],
  blocks: [
    text(r`The system $2x + 3y = 8$, $x - y = -1$ is the single matrix equation $\begin{bmatrix} 2 & 3 \\ 1 & -1 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 8 \\ -1 \end{bmatrix}$, or $AX = B$. If $A$ has an inverse, $X = A^{-1}B$.`),
    example(r`Solve $2x + 3y = 8$, $x - y = -1$`, [
      [r`\det A = -2 - 3 = -5`, ""],
      [r`A^{-1} = -\tfrac{1}{5}\begin{bmatrix} -1 & -3 \\ -1 & 2 \end{bmatrix}`, ""],
      [r`X = -\tfrac{1}{5}\begin{bmatrix} -8 + 3 \\ -8 - 2 \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}`, "x = 1, y = 2."],
    ], r`Check: $2 + 6 = 8$ ✓, $1 - 2 = -1$ ✓.`),
    def("Row reduction", r`Write the augmented matrix $[A \mid B]$. Use row operations (swap rows, multiply a row by a nonzero number, add a multiple of one row to another) to reach a form where each variable can be read off. These operations don't change the solutions.`),
    example(r`Solve $x + y + z = 6$, $2y + 5z = -4$, $2x + 5y - z = 27$`, [
      [r`\left[\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\ 0 & 2 & 5 & -4 \\ 2 & 5 & -1 & 27 \end{array}\right]`, ""],
      [r`R_3 - 2R_1: \ [0 \ 3 \ {-3} \mid 15] \Rightarrow y - z = 5`, ""],
      [r`2y + 5z = -4,\ y = z + 5 \Rightarrow 7z = -14,\ z = -2`, ""],
      [r`y = 3,\ x = 5`, r`Check the third equation: $10 + 15 + 2 = 27$. ✓`],
    ]),
    callout("application", "Where this shows up", r`Engineers solve systems with thousands of unknowns (circuit analysis, structural loads) by row reduction on computers; GPS receivers solve small systems many times per second.`),
  ],
  questions: [
    mc(1, r`Which matrix equation represents $3x - y = 4$, $x + 2y = 5$?`, [r`$\begin{bmatrix} 3 & -1 \\ 1 & 2 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 4 \\ 5 \end{bmatrix}$`, r`$\begin{bmatrix} 3 & 1 \\ -1 & 2 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 4 \\ 5 \end{bmatrix}$`, r`$\begin{bmatrix} 4 \\ 5 \end{bmatrix}\begin{bmatrix} x & y \end{bmatrix}$`, r`$\begin{bmatrix} 3 & -1 & 4 \end{bmatrix}$`], 0, [], r`Coefficients by row.`),
    short(2, r`Solve $3x - y = 4$, $x + 2y = 5$. Enter as (x,y).`, ["(13/7,11/7)"], [r`$\det = 7$.`], r`$x = \frac{4 \cdot 2 + 5}{7} = \frac{13}{7}$, $y = \frac{15 - 4}{7} = \frac{11}{7}$.`),
    mc(2, r`If $\det A = 0$ for the system $AX = B$, then…`, ["There is exactly one solution", "There is no unique solution", "x = 0", "B = 0"], 1, [], r`A isn't invertible: no solution or infinitely many.`),
    short(3, r`Solve $x + y = 3$, $y + z = 5$, $x + z = 4$. Enter as (x,y,z).`, ["(1,2,3)"], ["Add all three: 2(x + y + z) = 12."], r`$x + y + z = 6$, so $z = 3$, $x = 1$, $y = 2$.`, "review"),
  ],
});
