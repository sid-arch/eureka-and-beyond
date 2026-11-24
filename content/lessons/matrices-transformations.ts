import { activity, callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "matrices-transformations",
  title: "Matrices as transformations of the plane",
  summary: "Represent reflections, rotations, dilations and shears as 2 × 2 matrices, compose them by multiplication, and interpret the determinant as an area factor.",
  minutes: 30,
  objectives: [
    "Apply a 2 × 2 matrix to points and figures.",
    "Write matrices for reflections, rotations and dilations, using where i and j go.",
    "Compose transformations by multiplying matrices and interpret the determinant.",
  ],
  concepts: [
    { slug: "matrices", name: "Matrices", description: "Rectangular arrays of numbers with their own arithmetic.", subject: "subj_math" },
    { slug: "rigid-motions", name: "Rigid motions", description: "Transformations that preserve distance and angle measure: translations, reflections and rotations.", subject: "subj_math" },
  ],
  blocks: [
    def("Matrix as a function", r`A 2 × 2 matrix $A$ sends the point (column vector) $\begin{bmatrix} x \\ y \end{bmatrix}$ to $A\begin{bmatrix} x \\ y \end{bmatrix}$. Its first column is where $\langle 1, 0 \rangle$ goes and its second column is where $\langle 0, 1 \rangle$ goes, so you can build any linear transformation from those two images.`),
    def("Standard matrices", r`Rotation by $\theta$: $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$. Reflection over the x-axis: $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$. Over $y = x$: $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$. Dilation by $k$: $\begin{bmatrix} k & 0 \\ 0 & k \end{bmatrix}$.`),
    activity("transformations", { title: "The same transformations as matrices", params: { kind: "rotate" } }),
    example(r`Rotate $(3, 1)$ by $90^\circ$ with a matrix`, [
      [r`\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 3 \\ 1 \end{bmatrix} = \begin{bmatrix} -1 \\ 3 \end{bmatrix}`, r`Matches the rule $(x, y) \to (-y, x)$.`],
    ]),
    example(r`Reflect over the x-axis, then rotate $90^\circ$. Find the single matrix.`, [
      [r`R \cdot F = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}`, "The first transformation goes on the right."],
      [r`\text{reflection over } y = x`, "Composition of two transformations is one."],
    ]),
    callout("note", "Determinant", r`$|\det A|$ is the factor by which areas are multiplied; a negative determinant means orientation is reversed (as with reflections). Rotations have determinant 1.`),
    callout("application", "Where this shows up", r`Every 2D and 3D graphics pipeline, from games to CAD, transforms points with matrices, composing many transformations into one matrix for speed.`),
  ],
  questions: [
    short(1, r`Apply $\begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$ to $(4, -1)$. Enter as (x,y).`, ["(8,-2)"], [], r`$(8, -2)$: a dilation by 2.`),
    short(2, r`Apply $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ to $(5, 2)$. Enter as (x,y).`, ["(2,5)"], [], r`Reflection over $y = x$: $(2, 5)$.`),
    mc(2, r`What is the determinant of any rotation matrix?`, ["0", "1", "−1", "It depends on θ"], 1, [r`$\cos^2\theta + \sin^2\theta$.`], r`1: rotations preserve area and orientation.`),
    short(3, r`Find the matrix that rotates by $180^\circ$. Use the format [[a,b],[c,d]].`, ["[[-1,0],[0,-1]]"], [], r`$\cos 180^\circ = -1$, $\sin 180^\circ = 0$.`, "review"),
  ],
});
