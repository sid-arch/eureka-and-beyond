import { callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "properties-real-numbers",
  title: "Properties of real numbers",
  summary: "Name and use the commutative, associative, distributive, identity and inverse properties to justify each step of a simplification.",
  minutes: 20,
  objectives: [
    "State the commutative, associative, distributive, identity and inverse properties.",
    "Identify which property justifies a given step.",
    "Use properties to simplify expressions and compute mentally, and recognize which operations they do not apply to.",
  ],
  concepts: [
    { slug: "field-properties", name: "Properties of real numbers", description: "Commutative, associative, distributive, identity and inverse properties.", subject: "subj_math" },
    { slug: "distributive-property", name: "Distributive property", description: "a(b + c) = ab + ac: multiplication distributes over addition and subtraction.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Algebra moves are not tricks. Each step in simplifying an expression is allowed by one of a few basic properties that hold for every real number. Naming them lets you explain why your work is correct, which is the start of proof.`),
    def("Commutative properties", r`Order doesn't matter: $a + b = b + a$ and $ab = ba$.`),
    def("Associative properties", r`Grouping doesn't matter: $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$.`),
    def("Distributive property", r`$a(b + c) = ab + ac$. It connects multiplication with addition.`),
    def("Identity and inverse properties", r`Additive identity: $a + 0 = a$. Multiplicative identity: $a \cdot 1 = a$. Additive inverse: $a + (-a) = 0$. Multiplicative inverse: $a \cdot \frac{1}{a} = 1$ for $a \ne 0$.`),
    callout("warning", "Subtraction and division", r`Subtraction and division are not commutative or associative: $8 - 3 \ne 3 - 8$ and $(16 \div 4) \div 2 = 2$ while $16 \div (4 \div 2) = 8$. Rewrite subtraction as adding the opposite before rearranging terms.`),
    example(r`Justify each step: $4 + 3x + 6 = 3x + 10$`, [
      [r`3x + 4 + 6`, "Commutative property of addition."],
      [r`3x + (4 + 6)`, "Associative property of addition."],
      [r`3x + 10`, "Simplify (arithmetic)."],
    ]),
    example(r`Compute $25 \cdot 37 \cdot 4$ mentally`, [
      [r`25 \cdot 4 \cdot 37`, "Commutative property of multiplication."],
      [r`(25 \cdot 4) \cdot 37 = 100 \cdot 37`, "Associative property."],
      [r`3700`, ""],
    ]),
    example(r`Justify: $5(x + 2) - 5x = 10$`, [
      [r`5x + 10 - 5x`, "Distributive property."],
      [r`5x + (-5x) + 10`, "Commutative property (after writing − as + opposite)."],
      [r`0 + 10 = 10`, "Additive inverse, then additive identity."],
    ]),
    callout("application", "Where this shows up", r`Cashiers group coins to make round numbers, and spreadsheets and computer algebra systems rearrange expressions using exactly these rules. Computer floating-point arithmetic rounds every result, so it is not perfectly associative, and it is why typing 0.1 + 0.2 can give 0.30000000000000004.`),
  ],
  questions: [
    mc(1, r`Which property is shown by $7 \cdot (2 \cdot x) = (7 \cdot 2) \cdot x$?`, ["Commutative", "Associative", "Distributive", "Identity"], 1,
      ["What changed: the order or the grouping?"], r`The grouping changed, so it is the associative property of multiplication.`),
    mc(1, r`Which property is shown by $-9 + 9 = 0$?`, ["Additive identity", "Additive inverse", "Multiplicative inverse", "Commutative"], 1,
      ["A number plus its opposite."], r`Adding a number and its opposite gives 0: the additive inverse property.`),
    mc(2, r`Which property is shown by $\frac{3}{5} \cdot \frac{5}{3} = 1$?`, ["Multiplicative identity", "Multiplicative inverse", "Commutative", "Associative"], 1,
      ["What do you get when you multiply a number by its reciprocal?"], r`A number times its reciprocal is 1: the multiplicative inverse property.`),
    mc(2, r`Which equation is false for some real numbers?`, [r`$a + b = b + a$`, r`$a - b = b - a$`, r`$a(b + c) = ab + ac$`, r`$a \cdot 1 = a$`], 1,
      ["Try a = 5, b = 2."], r`$5 - 2 = 3$ but $2 - 5 = -3$. Subtraction is not commutative.`),
    mc(2, r`In simplifying $2(3x) = 6x$, which property is used?`, ["Distributive", "Associative property of multiplication", "Commutative property of addition", "Multiplicative identity"], 1,
      [r`$2(3x) = 2 \cdot (3 \cdot x)$.`], r`$2 \cdot (3 \cdot x) = (2 \cdot 3) \cdot x = 6x$: regrouping factors is the associative property. No addition is involved, so it isn't distributive.`),
    short(3, r`Use properties to simplify $8 + 6y - 8 + y$.`, ["7y"], ["Rearrange so the 8 and −8 are together."], r`$(8 - 8) + (6y + y) = 0 + 7y = 7y$.`, "review"),
    mc(3, r`A student says $(24 \div 6) \div 2 = 24 \div (6 \div 2)$ by the associative property. Is she right?`, ["Yes", "No; the left side is 2 and the right side is 8", "No; the left side is 8 and the right side is 2", "Yes, because both equal 4"], 1,
      ["Evaluate both sides."], r`$(24 \div 6) \div 2 = 4 \div 2 = 2$ and $24 \div (6 \div 2) = 24 \div 3 = 8$. Division is not associative.`, "review"),
  ],
});
