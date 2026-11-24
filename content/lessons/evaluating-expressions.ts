import { callout, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "evaluating-expressions",
  title: "Evaluating expressions",
  summary: "Substitute values, including negatives and fractions, into expressions and formulas and evaluate them with the order of operations.",
  minutes: 20,
  objectives: [
    "Substitute values for variables using parentheses to protect signs.",
    "Evaluate expressions with exponents, fractions and several variables.",
    "Evaluate real formulas and interpret the result with units.",
  ],
  concepts: [
    { slug: "substitution", name: "Substitution", description: "Replacing a variable with a value to evaluate an expression.", subject: "subj_math" },
  ],
  blocks: [
    text(r`To evaluate an expression, replace every variable with its value and then simplify using the order of operations. The expression itself doesn't change; you are simply asking what number it represents for one particular choice of the variables.`),
    callout("tip", "Always substitute in parentheses", r`Write $x = -4$ as $(-4)$. Then $x^2$ becomes $(-4)^2 = 16$, and $3x$ becomes $3(-4) = -12$. Leaving out the parentheses is the most common source of sign errors.`),
    example(r`Evaluate $x^2 - 5x + 6$ when $x = -3$`, [
      [r`(-3)^2 - 5(-3) + 6`, "Substitute in parentheses."],
      [r`9 + 15 + 6`, "(−3)² = 9 and −5(−3) = +15."],
      [r`30`, ""],
    ]),
    example(r`Evaluate $\dfrac{a - b}{2c}$ when $a = 7$, $b = -5$, $c = \tfrac{3}{2}$`, [
      [r`\dfrac{7 - (-5)}{2\left(\tfrac{3}{2}\right)}`, "Substitute every variable."],
      [r`\dfrac{12}{3}`, "Numerator: 7 + 5 = 12. Denominator: 2 · 3/2 = 3."],
      [r`4`, ""],
    ]),
    example(r`The formula $F = \tfrac{9}{5}C + 32$ converts Celsius to Fahrenheit. Convert $-15^\circ$C.`, [
      [r`F = \tfrac{9}{5}(-15) + 32`, "Substitute C = −15."],
      [r`F = -27 + 32`, r`$\frac{9}{5} \cdot (-15) = -27$.`],
      [r`F = 5`, r`So $-15^\circ\text{C} = 5^\circ\text{F}$.`],
    ]),
    example(r`A ball is thrown upward. Its height in feet after $t$ seconds is $h = -16t^2 + 48t + 5$. Find $h$ when $t = 2$.`, [
      [r`-16(2)^2 + 48(2) + 5`, ""],
      [r`-64 + 96 + 5 = 37`, "Exponent first: −16 · 4 = −64."],
    ], "After 2 seconds the ball is 37 feet above the ground."),
    callout("warning", "Implied multiplication", r`$3xy$ means $3 \cdot x \cdot y$, and $2(x + 1)$ means 2 times the whole sum. With $x = 4$, $2(x + 1) = 2(5) = 10$, not $2 \cdot 4 + 1 = 9$.`),
    callout("application", "Where this shows up", r`Formulas are expressions waiting for values: area $A = lw$, distance $d = rt$, simple interest $I = Prt$, and spreadsheet cells like =B2*C2+D2 all work by substitution.`),
  ],
  questions: [
    num(1, r`Evaluate $4x - 7$ when $x = -2$.`, -15, {}, ["Substitute (−2) for x."], r`$4(-2) - 7 = -8 - 7 = -15$.`),
    num(1, r`Evaluate $3a + 2b$ when $a = 5$ and $b = -4$.`, 7, {}, [], r`$15 + (-8) = 7$.`),
    num(2, r`Evaluate $-x^2 + 3x$ when $x = -1$.`, -4, {}, [r`$-(-1)^2 = -1$.`, r`$3(-1) = -3$.`], r`$-1 - 3 = -4$.`),
    num(2, r`Evaluate $\dfrac{m^2 - n}{m + n}$ when $m = 4$ and $n = -2$.`, 9, {}, ["Numerator: 16 − (−2).", "Denominator: 4 + (−2)."], r`$\frac{18}{2} = 9$.`),
    num(2, r`Use $d = rt$ to find the distance in miles traveled at 55 mph for 2.5 hours.`, 137.5, { unit: "mi" }, [], r`$55 \times 2.5 = 137.5$ miles.`),
    mc(2, r`What is the value of $2(x + 3)^2$ when $x = -5$?`, ["8", "−8", "16", "4"], 0,
      [r`Inside first: $-5 + 3 = -2$.`, r`$(-2)^2 = 4$.`], r`$2(4) = 8$.`),
    num(3, r`The perimeter of a rectangle is $P = 2l + 2w$. Find $P$ when $l = 3\tfrac{1}{4}$ ft and $w = 2\tfrac{1}{2}$ ft.`, 11.5, { unit: "ft" },
      [r`$2 \cdot 3.25 + 2 \cdot 2.5$.`], r`$6.5 + 5 = 11.5$ ft.`, "review"),
    short(3, r`Using $F = \tfrac{9}{5}C + 32$, what Celsius temperature equals $-40^\circ$F? Enter just the number.`, ["-40"], [r`Set $-40 = \tfrac{9}{5}C + 32$ and solve for $C$.`], r`$\tfrac{9}{5}(-40) + 32 = -72 + 32 = -40$. The two scales agree at $-40$.`, "review"),
  ],
});
