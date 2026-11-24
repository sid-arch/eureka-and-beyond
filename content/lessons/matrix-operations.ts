import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "matrix-operations",
  title: "Matrix operations",
  summary: "Add, subtract and scale matrices, multiply matrices row-by-column, and recognize when products are defined and that order matters.",
  minutes: 30,
  objectives: [
    "Identify a matrix's dimensions and entries.",
    "Add, subtract and multiply matrices by a scalar.",
    "Multiply matrices, check whether a product is defined, and show AB ≠ BA in general.",
  ],
  concepts: [
    { slug: "matrices", name: "Matrices", description: "Rectangular arrays of numbers with their own arithmetic.", subject: "subj_math" },
  ],
  blocks: [
    def("Matrix", r`A rectangular array of numbers with $m$ rows and $n$ columns (an $m \times n$ matrix). The entry in row $i$, column $j$ is $a_{ij}$.`),
    text(r`Add or subtract matrices of the same dimensions entry by entry. Multiplying by a scalar multiplies every entry. Matrix multiplication is different: the entry in row $i$, column $j$ of $AB$ is the dot product of row $i$ of $A$ with column $j$ of $B$. It's defined only when $A$'s columns equal $B$'s rows: $(m \times n)(n \times p) = m \times p$.`),
    example(r`Multiply $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 5 & 0 \\ -1 & 2 \end{bmatrix}$`, [
      [r`\begin{bmatrix} 1\cdot5 + 2\cdot(-1) & 1\cdot0 + 2\cdot2 \\ 3\cdot5 + 4\cdot(-1) & 3\cdot0 + 4\cdot2 \end{bmatrix}`, "Row times column."],
      [r`\begin{bmatrix} 3 & 4 \\ 11 & 8 \end{bmatrix}`, ""],
    ], r`In the other order: $\begin{bmatrix} 5 & 0 \\ -1 & 2 \end{bmatrix}\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 5 & 10 \\ 5 & 6 \end{bmatrix}$: a different result.`),
    callout("warning", "Not commutative", r`$AB$ and $BA$ are usually different, and one may be defined while the other isn't.`),
    callout("application", "Where this shows up", r`Graphics engines rotate and scale images with matrix multiplication, spreadsheets of prices times quantities are matrix products, and neural networks are built from matrix multiplications.`),
  ],
  questions: [
    mc(1, r`A matrix has 3 rows and 4 columns. Its dimensions are…`, ["4 × 3", "3 × 4", "7", "12 × 1"], 1, [], r`Rows × columns: 3 × 4.`),
    num(2, r`$A$ is 2 × 3 and $B$ is 3 × 5. How many entries does $AB$ have?`, 10, {}, [], r`$AB$ is 2 × 5: 10 entries.`),
    mc(2, r`$A$ is 2 × 3 and $B$ is 2 × 3. Which is defined?`, ["AB", "A + B", "BA", "All of these"], 1, [], r`Same dimensions allow addition; neither product is defined.`),
    num(3, r`Find the entry in row 2, column 1 of $\begin{bmatrix} 2 & -1 \\ 0 & 3 \end{bmatrix}\begin{bmatrix} 4 & 1 \\ 5 & -2 \end{bmatrix}$.`, 15, {}, ["Row 2 of the first times column 1 of the second."], r`$0 \cdot 4 + 3 \cdot 5 = 15$.`, "review"),
  ],
});
