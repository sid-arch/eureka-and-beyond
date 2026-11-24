import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "determinants-inverses",
  title: "Determinants and inverses",
  summary: "Compute 2 × 2 and 3 × 3 determinants, interpret them as area scale factors, and find the inverse of a 2 × 2 matrix.",
  minutes: 30,
  objectives: [
    "Compute determinants of 2 × 2 and 3 × 3 matrices.",
    "Interpret the determinant as an area scaling factor.",
    "Find the inverse of a 2 × 2 matrix and decide when no inverse exists.",
  ],
  concepts: [
    { slug: "matrices", name: "Matrices", description: "Rectangular arrays of numbers with their own arithmetic.", subject: "subj_math" },
  ],
  blocks: [
    def("2 × 2 determinant", r`$\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc$.`),
    text(r`Geometrically, the matrix sends the unit square to a parallelogram, and $|\det|$ is that parallelogram's area. A determinant of 0 means the square is flattened onto a line, information is lost, and the matrix can't be undone.`),
    def("2 × 2 inverse", r`If $ad - bc \ne 0$: $\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$. Then $AA^{-1} = A^{-1}A = I$, the identity matrix.`),
    example(r`Find the inverse of $A = \begin{bmatrix} 4 & 7 \\ 2 & 6 \end{bmatrix}$`, [
      [r`\det A = 24 - 14 = 10`, ""],
      [r`A^{-1} = \tfrac{1}{10}\begin{bmatrix} 6 & -7 \\ -2 & 4 \end{bmatrix} = \begin{bmatrix} 0.6 & -0.7 \\ -0.2 & 0.4 \end{bmatrix}`, ""],
    ], r`Check the top-left entry of $AA^{-1}$: $4(0.6) + 7(-0.2) = 1$. ✓`),
    def("3 × 3 determinant", r`Expand along the first row: $a(ei - fh) - b(di - fg) + c(dh - eg)$ for $\begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix}$.`),
    callout("application", "Where this shows up", r`Determinants find areas of triangles from coordinates ($\frac{1}{2}|\det|$), tell whether a system has a unique solution, and appear in cryptography (Hill ciphers) and 3D graphics.`),
  ],
  questions: [
    num(1, r`Find $\det\begin{bmatrix} 3 & 5 \\ 1 & 2 \end{bmatrix}$.`, 1, {}, [], r`$6 - 5 = 1$.`),
    mc(2, r`Which matrix has no inverse?`, [r`$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$`, r`$\begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$`, r`$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$`, r`$\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$`], 1, [], r`$4 - 4 = 0$.`),
    num(2, r`What is the top-left entry of the inverse of $\begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}$?`, 3, {}, ["det = 1."], r`$\frac{1}{1}\begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix}$: 3.`),
    num(3, r`Find $\det\begin{bmatrix} 1 & 2 & 0 \\ 0 & 3 & 1 \\ 2 & 1 & 4 \end{bmatrix}$.`, 15, {}, ["Expand along row 1."], r`$1(3 \cdot 4 - 1 \cdot 1) - 2(0 \cdot 4 - 1 \cdot 2) + 0 = 11 + 4 = 15$.`, "review"),
  ],
});
