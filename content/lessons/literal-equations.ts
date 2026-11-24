import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "literal-equations",
  title: "Literal equations and formulas",
  summary: "Solve a formula for any one of its variables, state restrictions such as nonzero denominators, and use the rearranged formula efficiently.",
  minutes: 25,
  objectives: [
    "Solve a literal equation for a specified variable using inverse operations.",
    "Factor out a variable that appears in more than one term.",
    "State the conditions under which the rearranged formula is valid, and use it to compute values.",
  ],
  concepts: [
    { slug: "literal-equations", name: "Literal equations", description: "Equations with several variables that are solved for one variable in terms of the others.", subject: "subj_math" },
  ],
  blocks: [
    def("Literal equation", r`An equation with two or more variables, such as $d = rt$ or $A = \frac{1}{2}bh$. Solving it for one variable expresses that variable in terms of the others.`),
    text(r`Solve a literal equation exactly the way you solve a numeric one: undo operations in reverse order, doing the same thing to both sides. The only difference is that the "answer" is an expression rather than a number. Treat every letter except the one you are solving for as if it were a known number.`),
    example(r`Solve $d = rt$ for $t$`, [
      [r`\frac{d}{r} = \frac{rt}{r}`, "t is multiplied by r, so divide both sides by r."],
      [r`t = \frac{d}{r}, \quad r \ne 0`, "Division by r requires r ≠ 0."],
    ], r`Test with numbers: 150 miles at 50 mph takes $\frac{150}{50} = 3$ hours. ✓`),
    example(r`Solve $A = \tfrac{1}{2}(b_1 + b_2)h$ for $b_2$`, [
      [r`2A = (b_1 + b_2)h`, "Multiply both sides by 2."],
      [r`\frac{2A}{h} = b_1 + b_2`, "Divide by h (h ≠ 0)."],
      [r`b_2 = \frac{2A}{h} - b_1`, "Subtract b₁."],
    ]),
    example(r`Solve $F = \tfrac{9}{5}C + 32$ for $C$`, [
      [r`F - 32 = \tfrac{9}{5}C`, "Subtract 32."],
      [r`C = \tfrac{5}{9}(F - 32)`, "Multiply by 5/9."],
    ], r`Check: $F = 212$ gives $C = \frac{5}{9}(180) = 100$. ✓`),
    example(r`Solve $ax + b = cx$ for $x$`, [
      [r`ax - cx = -b`, "Gather the x-terms on one side."],
      [r`x(a - c) = -b`, "Factor out x: the distributive property in reverse."],
      [r`x = \frac{-b}{a - c} = \frac{b}{c - a}, \quad a \ne c`, "Divide by (a − c), which must not be zero."],
    ]),
    callout("warning", "Never divide by an expression that could be zero", r`When you divide by a variable or an expression like $a - c$, note that it must be nonzero. If $a = c$, the equation $ax + b = cx$ becomes $b = 0$, which has no solution or every solution depending on $b$.`),
    callout("tip", "When to rearrange first", r`If you need to compute the same variable many times, rearrange the formula once and then substitute. If you need it only once, substituting numbers first and then solving is often quicker and less error-prone.`),
    callout("application", "Where this shows up", r`Science formulas are constantly rearranged: $V = IR$ for $I$, $\rho = \frac{m}{V}$ for $V$, $PV = nRT$ for $T$. Spreadsheets for loan payments and recipe scaling rely on the same skill.`),
  ],
  questions: [
    short(1, r`Solve $P = 4s$ for $s$.`, ["s=P/4", "s=p/4"], ["Divide both sides by 4."], r`$s = \frac{P}{4}$.`),
    short(1, r`Solve $y = x + k$ for $x$.`, ["x=y-k"], ["Subtract k from both sides."], r`$x = y - k$.`),
    short(2, r`Solve $V = lwh$ for $w$.`, ["w=V/(lh)", "w=v/(lh)", "w=V/(hl)"], ["Divide both sides by lh."], r`$w = \frac{V}{lh}$, with $l, h \ne 0$.`),
    short(2, r`Solve $3x + 2y = 12$ for $y$.`, ["y=6-3x/2", "y=-3x/2+6", "y=(12-3x)/2", "y=-1.5x+6", "y=6-1.5x"], ["Subtract 3x, then divide by 2."], r`$2y = 12 - 3x$, so $y = 6 - \frac{3}{2}x$.`),
    short(2, r`Solve $P = 2l + 2w$ for $l$.`, ["l=(P-2w)/2", "l=P/2-w", "l=(p-2w)/2", "l=p/2-w"], ["Subtract 2w, then divide by 2."], r`$l = \frac{P - 2w}{2} = \frac{P}{2} - w$.`),
    num(2, r`Use $C = \tfrac{5}{9}(F - 32)$ to convert $68^\circ$F to Celsius.`, 20, { unit: "°C" }, [r`$68 - 32 = 36$.`], r`$\frac{5}{9} \cdot 36 = 20^\circ$C.`),
    mc(3, r`Solve $m = \dfrac{y - b}{x}$ for $b$.`, [r`$b = y - mx$`, r`$b = mx - y$`, r`$b = \frac{y}{mx}$`, r`$b = y + mx$`], 0,
      ["Multiply both sides by x first."], r`$mx = y - b$, so $b = y - mx$.`),
    short(3, r`Solve $ax - 5 = bx$ for $x$ (assume $a \ne b$).`, ["x=5/(a-b)", "x=-5/(b-a)"], ["Get both x-terms on one side.", "Factor out x."], r`$ax - bx = 5$, so $x(a - b) = 5$ and $x = \frac{5}{a - b}$.`, "review"),
  ],
});
