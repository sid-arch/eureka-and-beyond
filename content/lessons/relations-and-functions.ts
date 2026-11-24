import { callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "relations-and-functions",
  title: "Relations and functions",
  summary: "Decide whether a relation is a function from ordered pairs, tables, mappings and graphs, using the vertical line test.",
  minutes: 25,
  objectives: [
    "Define relation, function, input and output.",
    "Determine whether a relation given as ordered pairs, a table, a mapping diagram or a graph is a function.",
    "Apply the vertical line test and explain why it works.",
  ],
  concepts: [
    { slug: "functions", name: "Functions", description: "Relations that assign exactly one output to each input.", subject: "subj_math" },
  ],
  blocks: [
    def("Relation", r`Any set of ordered pairs $(x, y)$. The $x$-values are the inputs and the $y$-values are the outputs.`),
    def("Function", r`A relation in which each input has exactly one output. Different inputs may share an output, but one input may never have two different outputs.`),
    text(r`Think of a function as a reliable machine: put in the same input and you always get the same output. A vending machine where button B4 sometimes gives chips and sometimes gives a cookie is not a function. A machine where B4 and B5 both give chips is fine.`),
    example(r`Is $\{(1, 4), (2, 5), (3, 4), (1, 7)\}$ a function?`, [
      [r`(1, 4) \text{ and } (1, 7)`, "The input 1 appears with two different outputs."],
      [r`\text{Not a function}`, "One repeated input with different outputs is enough."],
    ], r`$(1, 4)$ and $(3, 4)$ share an output, which is allowed.`),
    example(r`Is the table $x$: −2, −1, 0, 1, 2 and $y$: 4, 1, 0, 1, 4 a function?`, [
      [r`\text{each } x \text{ appears once}`, "No input is repeated."],
      [r`\text{Function}`, "Repeated outputs (4 and 1) don't matter. This is y = x²."],
    ]),
    def("Vertical line test", r`A graph represents $y$ as a function of $x$ exactly when no vertical line crosses it more than once.`),
    text(r`Why does it work? Every point on a vertical line $x = a$ has the same input $a$. If the line hits the graph twice, the input $a$ has two outputs. Parabolas that open up or down pass the test; a circle or a sideways parabola fails it.`),
    example(r`Is $x = y^2$ a function of $x$?`, [
      [r`x = 4 \Rightarrow y = 2 \text{ or } y = -2`, "Find the outputs for one input."],
      [r`\text{Not a function}`, "The input 4 has two outputs; the vertical line x = 4 meets the graph twice."],
    ]),
    callout("warning", "Which variable is the input?", r`Unless told otherwise, $x$ is the input. $x = y^2$ is not a function of $x$, but it is a function of $y$ (each $y$ gives one $x$).`),
    callout("application", "Where this shows up", r`Each person has exactly one birthday (person → birthday is a function), but many people share a birthday (birthday → person is not). Databases depend on this idea: an ID number must determine exactly one record.`),
  ],
  questions: [
    mc(1, r`Which relation is a function?`, [r`$\{(2, 3), (2, 5), (4, 7)\}$`, r`$\{(1, 0), (2, 0), (3, 0)\}$`, r`$\{(5, 1), (6, 2), (5, 3)\}$`, r`$\{(0, 0), (0, 1)\}$`], 1,
      ["Look for a repeated input with different outputs."], r`In $\{(1,0), (2,0), (3,0)\}$ each input appears once. The others repeat an input with different outputs.`),
    mc(2, r`Which graph passes the vertical line test?`, ["A circle", "A horizontal line", "A vertical line", "The sideways parabola x = y²"], 1,
      ["Imagine sliding a vertical line across each graph."], r`A horizontal line $y = c$ meets each vertical line exactly once. A vertical line fails completely: every point on it has the same input.`),
    mc(2, r`A mapping diagram sends 1 → a, 2 → a, 3 → b. Is it a function?`, ["Yes", "No, because a is used twice", "No, because 3 maps to b", "Cannot tell"], 0,
      ["Does any input have two outputs?"], r`Each input has exactly one arrow, so it is a function. Two inputs sharing the output $a$ is allowed.`),
    mc(2, r`Is "student → locker number" a function if each student has exactly one locker?`, ["Yes", "No", "Only if lockers are numbered in order", "Only if no two students share a locker"], 0,
      ["Does each input (student) have exactly one output?"], r`Yes. Each student (input) is paired with one locker (output). Even if two students shared a locker, it would still be a function.`),
    short(3, r`What value of $k$ makes $\{(3, 1), (k, 5), (4, 1)\}$ NOT a function? Give one value.`, ["3", "4", "k=3", "k=4"], ["Repeat an input that already has a different output."], r`If $k = 3$ or $k = 4$, that input would have two outputs (1 and 5).`, "review"),
    mc(3, r`Which equation does NOT define y as a function of x?`, [r`$y = 3x - 1$`, r`$y = x^2 + 2$`, r`$y = |x|$`, r`$x^2 + y^2 = 9$`], 3,
      ["Try x = 0 in each."], r`For $x^2 + y^2 = 9$, $x = 0$ gives $y = 3$ or $y = -3$. It's a circle and fails the vertical line test.`, "review"),
  ],
});
