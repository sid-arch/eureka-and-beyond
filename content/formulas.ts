// Formula library additions (migration 0006). Every entry states its conditions.
// Slugs seeded earlier (0003) are not repeated here.

const r = String.raw;

export interface FormulaSource {
  slug: string;
  subject: "subj_math" | "subj_phys" | "subj_chem";
  name: string;
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
}

export const FORMULAS: FormulaSource[] = [
  // Mathematics
  {
    slug: "slope-intercept-form", subject: "subj_math", name: "Slope-intercept form",
    latex: "y = mx + b",
    description: "Equation of a non-vertical line with slope m that crosses the y-axis at (0, b).",
    variables: [{ symbol: "m", meaning: "slope" }, { symbol: "b", meaning: "y-intercept" }],
  },
  {
    slug: "point-slope-form", subject: "subj_math", name: "Point-slope form",
    latex: "y - y_1 = m(x - x_1)",
    description: "Equation of the line with slope m through the point (x₁, y₁).",
    variables: [{ symbol: "m", meaning: "slope" }, { symbol: "(x_1, y_1)", meaning: "a point on the line" }],
  },
  {
    slug: "vertex-form", subject: "subj_math", name: "Vertex form of a quadratic",
    latex: "y = a(x - h)^2 + k",
    description: "A parabola with vertex (h, k). It opens up when a > 0 and down when a < 0; |a| sets how narrow it is.",
    variables: [{ symbol: "a", meaning: "vertical stretch factor, a ≠ 0" }, { symbol: "(h, k)", meaning: "vertex" }],
  },
  {
    slug: "discriminant", subject: "subj_math", name: "Discriminant",
    latex: "\\Delta = b^2 - 4ac",
    description: "For ax² + bx + c = 0 with real coefficients: Δ > 0 gives two real solutions, Δ = 0 one repeated real solution, Δ < 0 two complex solutions.",
    variables: [{ symbol: "a, b, c", meaning: "coefficients, a ≠ 0" }],
  },
  {
    slug: "distance-formula", subject: "subj_math", name: "Distance formula",
    latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
    description: "Distance between two points in the coordinate plane; it is the Pythagorean theorem applied to the horizontal and vertical changes.",
    variables: [{ symbol: "(x_1, y_1), (x_2, y_2)", meaning: "the two points" }],
  },
  {
    slug: "pythagorean-identity", subject: "subj_math", name: "Pythagorean identity",
    latex: "\\sin^2\\theta + \\cos^2\\theta = 1",
    description: "True for every angle θ; it follows from the unit circle x² + y² = 1.",
    variables: [{ symbol: "\\theta", meaning: "any angle" }],
  },
  {
    slug: "z-score", subject: "subj_math", name: "z-score",
    latex: "z = \\frac{x - \\mu}{\\sigma}",
    description: "How many standard deviations a value x lies above (positive) or below (negative) the mean.",
    variables: [{ symbol: "x", meaning: "observed value" }, { symbol: "\\mu", meaning: "mean" }, { symbol: "\\sigma", meaning: "standard deviation, σ > 0" }],
  },
  {
    slug: "derivative-definition", subject: "subj_math", name: "Definition of the derivative",
    latex: "f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}",
    description: "The instantaneous rate of change of f at x = a, when this limit exists.",
    variables: [{ symbol: "f'(a)", meaning: "derivative of f at a" }, { symbol: "h", meaning: "a small change in x" }],
  },
  {
    slug: "power-rule", subject: "subj_math", name: "Power rule",
    latex: "\\frac{d}{dx}\\,x^n = n x^{n-1}",
    description: "Derivative of a power function. Holds for every real exponent n where x^n is differentiable.",
    variables: [{ symbol: "n", meaning: "a real constant" }],
  },
  {
    slug: "riemann-sum", subject: "subj_math", name: "Riemann sum",
    latex: "\\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x, \\quad \\Delta x = \\frac{b - a}{n}",
    description: "Approximates the definite integral of f on [a, b] with n equal-width rectangles; x_i* is a sample point in the i-th subinterval.",
    variables: [{ symbol: "n", meaning: "number of subintervals" }, { symbol: "\\Delta x", meaning: "width of each subinterval" }],
  },
  {
    slug: "ftc", subject: "subj_math", name: "Fundamental Theorem of Calculus",
    latex: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
    description: "If f is continuous on [a, b] and F is any antiderivative of f, the definite integral equals F(b) − F(a).",
    variables: [{ symbol: "F", meaning: "an antiderivative of f (F′ = f)" }],
  },
  // Physics
  {
    slug: "displacement-constant-acceleration", subject: "subj_phys", name: "Displacement under constant acceleration",
    latex: "\\Delta x = v_0 t + \\tfrac{1}{2} a t^2",
    description: "One-dimensional motion with constant acceleration.",
    variables: [{ symbol: "\\Delta x", meaning: "displacement", unit: "m" }, { symbol: "v_0", meaning: "initial velocity", unit: "m/s" }, { symbol: "a", meaning: "acceleration", unit: "m/s²" }, { symbol: "t", meaning: "time", unit: "s" }],
  },
  {
    slug: "projectile-range", subject: "subj_phys", name: "Range of a projectile (level ground)",
    latex: "R = \\frac{v_0^2 \\sin 2\\theta}{g}",
    description: "Horizontal distance for a launch and landing at the same height, ignoring air resistance.",
    variables: [{ symbol: "v_0", meaning: "launch speed", unit: "m/s" }, { symbol: "\\theta", meaning: "launch angle above horizontal" }, { symbol: "g", meaning: "gravitational acceleration", unit: "m/s²" }],
  },
  {
    slug: "kinetic-friction", subject: "subj_phys", name: "Kinetic friction",
    latex: "f_k = \\mu_k F_N",
    description: "Magnitude of the friction force on a sliding object; it points opposite the motion relative to the surface.",
    variables: [{ symbol: "\\mu_k", meaning: "coefficient of kinetic friction" }, { symbol: "F_N", meaning: "normal force", unit: "N" }],
  },
  {
    slug: "hookes-law", subject: "subj_phys", name: "Hooke's law",
    latex: "F_s = -kx",
    description: "Force of an ideal spring stretched or compressed by x from equilibrium; the minus sign means it points back toward equilibrium.",
    variables: [{ symbol: "k", meaning: "spring constant", unit: "N/m" }, { symbol: "x", meaning: "displacement from equilibrium", unit: "m" }],
  },
  {
    slug: "spring-period", subject: "subj_phys", name: "Period of a mass on a spring",
    latex: "T = 2\\pi\\sqrt{\\frac{m}{k}}",
    description: "Period of an ideal mass-spring oscillator. It does not depend on amplitude.",
    variables: [{ symbol: "T", meaning: "period", unit: "s" }, { symbol: "m", meaning: "mass", unit: "kg" }, { symbol: "k", meaning: "spring constant", unit: "N/m" }],
  },
  {
    slug: "ohms-law", subject: "subj_phys", name: "Ohm's law",
    latex: "V = IR",
    description: "Relates voltage across a resistor to the current through it, for ohmic materials at constant temperature.",
    variables: [{ symbol: "V", meaning: "potential difference", unit: "V" }, { symbol: "I", meaning: "current", unit: "A" }, { symbol: "R", meaning: "resistance", unit: "Ω" }],
  },
  {
    slug: "resistors-series-parallel", subject: "subj_phys", name: "Equivalent resistance",
    latex: "R_s = R_1 + R_2 + \\cdots, \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots",
    description: "Series resistors add; for parallel resistors the reciprocals add.",
    variables: [{ symbol: "R_s, R_p", meaning: "series and parallel equivalents", unit: "Ω" }],
  },
  {
    slug: "electric-power", subject: "subj_phys", name: "Electric power",
    latex: "P = IV = I^2 R = \\frac{V^2}{R}",
    description: "Rate at which a circuit element transfers energy. The forms with R apply to resistors.",
    variables: [{ symbol: "P", meaning: "power", unit: "W" }],
  },
  {
    slug: "kinetic-energy", subject: "subj_phys", name: "Kinetic energy",
    latex: "K = \\tfrac{1}{2} m v^2",
    description: "Energy of an object due to its motion (translational).",
    variables: [{ symbol: "m", meaning: "mass", unit: "kg" }, { symbol: "v", meaning: "speed", unit: "m/s" }],
  },
  {
    slug: "spring-potential-energy", subject: "subj_phys", name: "Elastic potential energy",
    latex: "U_s = \\tfrac{1}{2} k x^2",
    description: "Energy stored in an ideal spring stretched or compressed by x.",
    variables: [{ symbol: "k", meaning: "spring constant", unit: "N/m" }, { symbol: "x", meaning: "displacement from equilibrium", unit: "m" }],
  },
  // Chemistry
  {
    slug: "molar-mass-moles", subject: "subj_chem", name: "Moles from mass",
    latex: "n = \\frac{m}{M}",
    description: "Converts a sample's mass to amount in moles.",
    variables: [{ symbol: "n", meaning: "amount", unit: "mol" }, { symbol: "m", meaning: "mass", unit: "g" }, { symbol: "M", meaning: "molar mass", unit: "g/mol" }],
  },
  {
    slug: "percent-yield", subject: "subj_chem", name: "Percent yield",
    latex: "\\text{percent yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\%",
    description: "Compares the product actually obtained with the maximum predicted by stoichiometry.",
    variables: [],
  },
  {
    slug: "combined-gas-law", subject: "subj_chem", name: "Combined gas law",
    latex: "\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}",
    description: "For a fixed amount of an ideal gas. Temperatures must be absolute (kelvin).",
    variables: [{ symbol: "P", meaning: "pressure" }, { symbol: "V", meaning: "volume" }, { symbol: "T", meaning: "absolute temperature", unit: "K" }],
  },
  {
    slug: "celsius-to-kelvin", subject: "subj_chem", name: "Celsius to kelvin",
    latex: "T_{\\text{K}} = T_{^\\circ\\text{C}} + 273.15",
    description: "Gas-law calculations require absolute temperature.",
    variables: [],
  },
  // Added in batch 2 (Algebra Readiness and Algebra I)
  {
    slug: "percent-change", subject: "subj_math", name: "Percent change",
    latex: r`\text{percent change} = \frac{\text{new} - \text{original}}{\text{original}} \times 100\%`,
    description: "Relative change from an original value. A positive result is an increase and a negative result is a decrease. The original value must not be zero.",
    variables: [{ symbol: "\\text{original}", meaning: "starting value" }, { symbol: "\\text{new}", meaning: "ending value" }],
  },
  {
    slug: "triangle-area", subject: "subj_math", name: "Area of a triangle",
    latex: r`A = \tfrac{1}{2}bh`,
    description: "Area of any triangle, where the height h is measured perpendicular to the chosen base b.",
    variables: [{ symbol: "b", meaning: "base" }, { symbol: "h", meaning: "height perpendicular to the base" }],
  },
  {
    slug: "trapezoid-area", subject: "subj_math", name: "Area of a trapezoid",
    latex: r`A = \tfrac{1}{2}(b_1 + b_2)h`,
    description: "Area of a trapezoid with parallel bases b₁ and b₂ and perpendicular height h between them.",
    variables: [{ symbol: "b_1, b_2", meaning: "parallel bases" }, { symbol: "h", meaning: "distance between the bases" }],
  },
  {
    slug: "circle-area", subject: "subj_math", name: "Area and circumference of a circle",
    latex: r`A = \pi r^2, \quad C = 2\pi r = \pi d`,
    description: "Area and circumference of a circle with radius r (diameter d = 2r).",
    variables: [{ symbol: "r", meaning: "radius" }, { symbol: "d", meaning: "diameter" }],
  },
  {
    slug: "prism-cylinder-volume", subject: "subj_math", name: "Volume of a prism or cylinder",
    latex: r`V = Bh, \quad V_{\text{cylinder}} = \pi r^2 h`,
    description: "Volume of a right or oblique prism or cylinder: base area B times the perpendicular height h.",
    variables: [{ symbol: "B", meaning: "area of the base" }, { symbol: "h", meaning: "height perpendicular to the base" }, { symbol: "r", meaning: "radius of a cylinder's base" }],
  },
  {
    slug: "mean", subject: "subj_math", name: "Mean (average)",
    latex: r`\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n} = \frac{\sum x_i}{n}`,
    description: "The arithmetic mean of n data values: their sum divided by how many there are.",
    variables: [{ symbol: "x_i", meaning: "data values" }, { symbol: "n", meaning: "number of values" }],
  },
  {
    slug: "standard-form-line", subject: "subj_math", name: "Standard form of a line",
    latex: r`Ax + By = C`,
    description: "Equation of any line, with A and B not both zero. Usually A, B and C are integers with A ≥ 0. The slope is −A/B when B ≠ 0.",
    variables: [{ symbol: "A, B, C", meaning: "constants" }],
  },
  {
    slug: "arithmetic-sequence", subject: "subj_math", name: "Arithmetic sequence",
    latex: r`a_n = a_1 + (n - 1)d`,
    description: "The nth term of a sequence that adds the same common difference d each step.",
    variables: [{ symbol: "a_1", meaning: "first term" }, { symbol: "d", meaning: "common difference" }, { symbol: "n", meaning: "term number (1, 2, 3, …)" }],
  },
  {
    slug: "geometric-sequence", subject: "subj_math", name: "Geometric sequence",
    latex: r`a_n = a_1 \cdot r^{\,n-1}`,
    description: "The nth term of a sequence that multiplies by the same common ratio r each step (r ≠ 0).",
    variables: [{ symbol: "a_1", meaning: "first term" }, { symbol: "r", meaning: "common ratio" }, { symbol: "n", meaning: "term number" }],
  },
  {
    slug: "exponential-function", subject: "subj_math", name: "Exponential function",
    latex: r`y = a \cdot b^x, \quad b = 1 + r \text{ (growth) or } 1 - r \text{ (decay)}`,
    description: "Exponential model with initial value a and growth factor b > 0, b ≠ 1. r is the percent rate per unit of x, written as a decimal.",
    variables: [{ symbol: "a", meaning: "initial value (y when x = 0)" }, { symbol: "b", meaning: "growth or decay factor" }, { symbol: "r", meaning: "rate per step, as a decimal" }],
  },
  {
    slug: "exponent-rules", subject: "subj_math", name: "Properties of exponents",
    latex: r`a^m a^n = a^{m+n}, \; \frac{a^m}{a^n} = a^{m-n}, \; (a^m)^n = a^{mn}, \; a^0 = 1, \; a^{-n} = \frac{1}{a^n}`,
    description: "Rules for integer exponents, valid for a ≠ 0 (and for rational exponents when a > 0).",
    variables: [{ symbol: "a", meaning: "nonzero base" }, { symbol: "m, n", meaning: "exponents" }],
  },
  {
    slug: "special-products", subject: "subj_math", name: "Special products",
    latex: r`(a + b)^2 = a^2 + 2ab + b^2, \; (a - b)^2 = a^2 - 2ab + b^2, \; (a + b)(a - b) = a^2 - b^2`,
    description: "Perfect-square trinomials and the difference of two squares. Read right to left, they are factoring patterns.",
    variables: [{ symbol: "a, b", meaning: "any expressions" }],
  },
  // Added in batch 4 (Geometry)
  {
    slug: "midpoint-formula", subject: "subj_math", name: "Midpoint formula",
    latex: r`M = \left(\frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2}\right)`,
    description: "The midpoint of the segment joining (x₁, y₁) and (x₂, y₂): the average of the x-coordinates and of the y-coordinates.",
    variables: [{ symbol: "(x_1, y_1), (x_2, y_2)", meaning: "endpoints" }],
  },
  {
    slug: "polygon-angle-sum", subject: "subj_math", name: "Polygon angle sums",
    latex: r`S = (n - 2) \cdot 180^\circ, \quad \text{each exterior angle of a regular } n\text{-gon} = \frac{360^\circ}{n}`,
    description: "Sum of the interior angles of a convex polygon with n sides. The exterior angles (one at each vertex) always sum to 360°.",
    variables: [{ symbol: "n", meaning: "number of sides" }],
  },
  {
    slug: "trig-ratios", subject: "subj_math", name: "Trigonometric ratios",
    latex: r`\sin\theta = \frac{\text{opp}}{\text{hyp}}, \quad \cos\theta = \frac{\text{adj}}{\text{hyp}}, \quad \tan\theta = \frac{\text{opp}}{\text{adj}}`,
    description: "Ratios of side lengths in a right triangle, relative to an acute angle θ.",
    variables: [{ symbol: "\\theta", meaning: "acute angle" }, { symbol: "\\text{opp, adj, hyp}", meaning: "opposite leg, adjacent leg, hypotenuse" }],
  },
  {
    slug: "special-right-triangles", subject: "subj_math", name: "Special right triangles",
    latex: r`45^\circ\text{-}45^\circ\text{-}90^\circ: \ x : x : x\sqrt{2} \qquad 30^\circ\text{-}60^\circ\text{-}90^\circ: \ x : x\sqrt{3} : 2x`,
    description: "Side ratios of the isosceles right triangle and the 30-60-90 triangle (short leg : long leg : hypotenuse).",
    variables: [{ symbol: "x", meaning: "length of a leg (45-45-90) or the short leg (30-60-90)" }],
  },
  {
    slug: "arc-length-sector", subject: "subj_math", name: "Arc length and sector area",
    latex: r`s = \frac{\theta}{360^\circ} \cdot 2\pi r = r\theta_{\text{rad}}, \qquad A = \frac{\theta}{360^\circ} \cdot \pi r^2 = \tfrac{1}{2} r^2 \theta_{\text{rad}}`,
    description: "Length of an arc and area of a sector with central angle θ in a circle of radius r.",
    variables: [{ symbol: "\\theta", meaning: "central angle (degrees, or radians where marked)" }, { symbol: "r", meaning: "radius" }],
  },
  {
    slug: "circle-equation", subject: "subj_math", name: "Equation of a circle",
    latex: r`(x - h)^2 + (y - k)^2 = r^2`,
    description: "The circle with center (h, k) and radius r > 0: every point at distance r from the center.",
    variables: [{ symbol: "(h, k)", meaning: "center" }, { symbol: "r", meaning: "radius" }],
  },
  {
    slug: "pyramid-cone-sphere", subject: "subj_math", name: "Pyramids, cones and spheres",
    latex: r`V_{\text{pyramid/cone}} = \tfrac{1}{3}Bh, \quad V_{\text{sphere}} = \tfrac{4}{3}\pi r^3, \quad S_{\text{sphere}} = 4\pi r^2`,
    description: "A pyramid or cone has one third the volume of the prism or cylinder with the same base B and height h.",
    variables: [{ symbol: "B", meaning: "base area" }, { symbol: "h", meaning: "perpendicular height" }, { symbol: "r", meaning: "radius" }],
  },
  {
    slug: "permutations-combinations", subject: "subj_math", name: "Permutations and combinations",
    latex: r`{}_nP_r = \frac{n!}{(n - r)!}, \qquad {}_nC_r = \binom{n}{r} = \frac{n!}{r!\,(n - r)!}`,
    description: "Number of ordered arrangements (permutations) and unordered selections (combinations) of r items from n distinct items.",
    variables: [{ symbol: "n", meaning: "items available" }, { symbol: "r", meaning: "items chosen" }],
  },
  {
    slug: "probability-rules", subject: "subj_math", name: "Probability rules",
    latex: r`P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B), \quad P(A \text{ and } B) = P(A) \cdot P(B \mid A)`,
    description: "Addition rule and general multiplication rule. If A and B are independent, P(B | A) = P(B).",
    variables: [{ symbol: "P(B \\mid A)", meaning: "probability of B given that A occurred" }],
  },
  // Added in batch 5 (Algebra II)
  {
    slug: "log-properties", subject: "subj_math", name: "Properties of logarithms",
    latex: r`\log_b(MN) = \log_b M + \log_b N, \ \log_b\!\frac{M}{N} = \log_b M - \log_b N, \ \log_b M^p = p\log_b M, \ \log_b M = \frac{\ln M}{\ln b}`,
    description: "Product, quotient and power rules and the change-of-base formula, for b > 0, b ≠ 1 and M, N > 0. y = log_b x means b^y = x.",
    variables: [{ symbol: "b", meaning: "base" }, { symbol: "M, N", meaning: "positive numbers" }],
  },
  {
    slug: "continuous-growth", subject: "subj_math", name: "Compound and continuous growth",
    latex: r`A = P\left(1 + \frac{r}{n}\right)^{nt}, \qquad A = Pe^{rt}`,
    description: "Balance after t years at annual rate r compounded n times per year, and compounded continuously. e ≈ 2.71828.",
    variables: [{ symbol: "P", meaning: "principal" }, { symbol: "r", meaning: "annual rate (decimal)" }, { symbol: "n", meaning: "compounding periods per year" }, { symbol: "t", meaning: "years" }],
  },
  {
    slug: "series-sums", subject: "subj_math", name: "Arithmetic and geometric series",
    latex: r`S_n = \frac{n(a_1 + a_n)}{2}, \qquad S_n = a_1\frac{1 - r^n}{1 - r}, \qquad S_\infty = \frac{a_1}{1 - r}\ (|r| < 1)`,
    description: "Sum of the first n terms of an arithmetic series, of a geometric series (r ≠ 1), and of an infinite geometric series when |r| < 1.",
    variables: [{ symbol: "a_1", meaning: "first term" }, { symbol: "a_n", meaning: "nth term" }, { symbol: "r", meaning: "common ratio" }],
  },
  {
    slug: "complex-numbers", subject: "subj_math", name: "Complex numbers",
    latex: r`i = \sqrt{-1},\ i^2 = -1, \quad (a + bi)(a - bi) = a^2 + b^2`,
    description: "A complex number is a + bi with real a and b. Multiplying by the conjugate gives a real number, which is used to divide complex numbers.",
    variables: [{ symbol: "a", meaning: "real part" }, { symbol: "b", meaning: "imaginary part" }],
  },
  {
    slug: "sinusoid", subject: "subj_math", name: "Sinusoidal function",
    latex: r`y = A\sin\big(B(x - C)\big) + D, \quad \text{period} = \frac{2\pi}{|B|}`,
    description: "Amplitude |A|, period 2π/|B|, phase (horizontal) shift C and midline y = D. The same holds for cosine.",
    variables: [{ symbol: "A", meaning: "amplitude factor" }, { symbol: "B", meaning: "frequency factor" }, { symbol: "C", meaning: "phase shift" }, { symbol: "D", meaning: "midline" }],
  },
  {
    slug: "binomial-theorem", subject: "subj_math", name: "Binomial Theorem",
    latex: r`(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k`,
    description: "Expansion of a binomial power; the coefficients are the entries in row n of Pascal's triangle.",
    variables: [{ symbol: "\\binom{n}{k}", meaning: "n choose k = n!/(k!(n − k)!)" }],
  },
  {
    slug: "margin-of-error", subject: "subj_math", name: "Margin of error (proportion)",
    latex: r`\text{ME} \approx z^*\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}} \approx \frac{1}{\sqrt{n}} \ \ (95\%,\ \text{worst case})`,
    description: "Approximate margin of error for a sample proportion from a simple random sample; z* ≈ 1.96 for 95% confidence.",
    variables: [{ symbol: "\\hat{p}", meaning: "sample proportion" }, { symbol: "n", meaning: "sample size" }],
  },
  // Added in batch 6 (Precalculus)
  {
    slug: "trig-identities", subject: "subj_math", name: "Sum, difference and double-angle identities",
    latex: r`\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B,\ \cos(A \pm B) = \cos A\cos B \mp \sin A\sin B,\ \sin 2A = 2\sin A\cos A,\ \cos 2A = \cos^2 A - \sin^2 A`,
    description: "Identities for sines and cosines of sums, differences and double angles; cos 2A also equals 2cos²A − 1 and 1 − 2sin²A.",
    variables: [{ symbol: "A, B", meaning: "angles" }],
  },
  {
    slug: "dot-product", subject: "subj_math", name: "Dot product",
    latex: r`\mathbf{u}\cdot\mathbf{v} = u_1v_1 + u_2v_2 = |\mathbf{u}||\mathbf{v}|\cos\theta`,
    description: "The dot product of two vectors; θ is the angle between them. The vectors are orthogonal exactly when u·v = 0.",
    variables: [{ symbol: "\\mathbf{u}, \\mathbf{v}", meaning: "vectors" }, { symbol: "\\theta", meaning: "angle between them" }],
  },
  {
    slug: "conic-equations", subject: "subj_math", name: "Ellipse and hyperbola",
    latex: r`\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1, \qquad \frac{(x - h)^2}{a^2} - \frac{(y - k)^2}{b^2} = 1`,
    description: "Standard forms centered at (h, k). Ellipse: c² = a² − b² (a > b). Hyperbola: c² = a² + b², asymptotes y − k = ±(b/a)(x − h).",
    variables: [{ symbol: "a, b", meaning: "semi-axis lengths" }, { symbol: "c", meaning: "center-to-focus distance" }],
  },
  {
    slug: "polar-conversion", subject: "subj_math", name: "Polar and rectangular coordinates",
    latex: r`x = r\cos\theta,\ y = r\sin\theta,\ r^2 = x^2 + y^2,\ \tan\theta = \frac{y}{x}`,
    description: "Converting between polar (r, θ) and rectangular (x, y) coordinates; choose θ in the correct quadrant.",
    variables: [{ symbol: "r", meaning: "distance from the pole" }, { symbol: "\\theta", meaning: "angle from the positive x-axis" }],
  },
  {
    slug: "de-moivre", subject: "subj_math", name: "Polar form and De Moivre's Theorem",
    latex: r`z = r(\cos\theta + i\sin\theta), \qquad z^n = r^n(\cos n\theta + i\sin n\theta)`,
    description: "A complex number in polar (trigonometric) form, and its nth power. Multiplying complex numbers multiplies moduli and adds arguments.",
    variables: [{ symbol: "r", meaning: "modulus |z|" }, { symbol: "\\theta", meaning: "argument" }],
  },
  // Added in batch 7 (Statistics)
  {
    slug: "standard-deviation", subject: "subj_math", name: "Sample standard deviation",
    latex: r`s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}`,
    description: "The typical distance of data values from their mean, computed from a sample of n values.",
    variables: [{ symbol: "x_i", meaning: "data values" }, { symbol: "\\bar{x}", meaning: "sample mean" }, { symbol: "n", meaning: "sample size" }],
  },
  {
    slug: "least-squares-line", subject: "subj_math", name: "Least-squares regression line",
    latex: r`\hat{y} = a + bx, \qquad b = r\frac{s_y}{s_x}, \qquad a = \bar{y} - b\bar{x}`,
    description: "The line that minimizes the sum of squared residuals. It always passes through the point of means.",
    variables: [{ symbol: "r", meaning: "correlation" }, { symbol: "s_x, s_y", meaning: "standard deviations of x and y" }, { symbol: "\\bar{x}, \\bar{y}", meaning: "means of x and y" }],
  },
  {
    slug: "expected-value", subject: "subj_math", name: "Mean and standard deviation of a discrete random variable",
    latex: r`\mu_X = \sum x_i p_i, \qquad \sigma_X = \sqrt{\sum (x_i - \mu_X)^2 p_i}`,
    description: "The long-run average value of a random variable and its typical variation from that average.",
    variables: [{ symbol: "x_i", meaning: "possible values" }, { symbol: "p_i", meaning: "their probabilities" }],
  },
  {
    slug: "binomial-probability", subject: "subj_math", name: "Binomial probability",
    latex: r`P(X = k) = \binom{n}{k}p^k(1 - p)^{n - k}, \qquad \mu = np, \qquad \sigma = \sqrt{np(1 - p)}`,
    description: "Probability of exactly k successes in n independent trials, each with success probability p.",
    variables: [{ symbol: "n", meaning: "number of trials" }, { symbol: "k", meaning: "number of successes" }, { symbol: "p", meaning: "success probability per trial" }],
  },
  {
    slug: "proportion-interval", subject: "subj_math", name: "Confidence interval for a proportion",
    latex: r`\hat{p} \pm z^*\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}`,
    description: "An interval of plausible values for a population proportion p, built from a random sample. z* = 1.645, 1.96 and 2.576 for 90%, 95% and 99% confidence.",
    variables: [{ symbol: "\\hat{p}", meaning: "sample proportion" }, { symbol: "z^*", meaning: "critical value" }, { symbol: "n", meaning: "sample size" }],
  },
  // Added in batch 13 (AP Calculus)
  {
    slug: "special-trig-limits", subject: "subj_math", name: "Special trigonometric limits",
    latex: r`\lim_{x \to 0} \frac{\sin x}{x} = 1, \qquad \lim_{x \to 0} \frac{1 - \cos x}{x} = 0`,
    description: "Two limits proved with the Squeeze Theorem; x is in radians. They give the derivatives of sine and cosine.",
    variables: [{ symbol: "x", meaning: "angle in radians" }],
  },
  {
    slug: "derivative-rules", subject: "subj_math", name: "Sum, product and quotient rules",
    latex: r`(f \pm g)' = f' \pm g', \quad (fg)' = f'g + fg', \quad \left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}`,
    description: "Derivatives of sums, products and quotients of differentiable functions (the quotient rule needs g ≠ 0).",
    variables: [{ symbol: "f, g", meaning: "differentiable functions of x" }],
  },
  {
    slug: "chain-rule", subject: "subj_math", name: "Chain rule",
    latex: r`\frac{d}{dx} f(g(x)) = f'(g(x))\, g'(x), \qquad \frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}`,
    description: "The derivative of a composition: the outside derivative evaluated at the inside, times the inside derivative.",
    variables: [{ symbol: "g", meaning: "inner function" }, { symbol: "f", meaning: "outer function" }],
  },
  {
    slug: "trig-derivatives", subject: "subj_math", name: "Derivatives of trigonometric functions",
    latex: r`(\sin x)' = \cos x,\ (\cos x)' = -\sin x,\ (\tan x)' = \sec^2 x,\ (\cot x)' = -\csc^2 x,\ (\sec x)' = \sec x \tan x,\ (\csc x)' = -\csc x \cot x`,
    description: "Derivatives of the six trigonometric functions, with x in radians.",
    variables: [{ symbol: "x", meaning: "angle in radians" }],
  },
  {
    slug: "exp-log-derivatives", subject: "subj_math", name: "Derivatives of exponential and logarithmic functions",
    latex: r`(e^x)' = e^x,\quad (a^x)' = a^x \ln a,\quad (\ln x)' = \frac{1}{x},\quad (\log_a x)' = \frac{1}{x \ln a}`,
    description: "Derivatives of exponential and logarithmic functions (a > 0, a ≠ 1; x > 0 for the logarithms).",
    variables: [{ symbol: "a", meaning: "base, a > 0 and a ≠ 1" }],
  },
  {
    slug: "inverse-derivatives", subject: "subj_math", name: "Derivatives of inverse functions",
    latex: r`(f^{-1})'(a) = \frac{1}{f'(f^{-1}(a))},\quad (\arcsin x)' = \frac{1}{\sqrt{1 - x^2}},\quad (\arctan x)' = \frac{1}{1 + x^2}`,
    description: "The slope of an inverse function is the reciprocal of the original slope at the matching point. Also (arccos x)′ = −1/√(1 − x²).",
    variables: [{ symbol: "f^{-1}", meaning: "inverse of a one-to-one differentiable f" }],
  },
  // Added in batch 16 (BC series)
  {
    slug: "taylor-series", subject: "subj_math", name: "Taylor series",
    latex: r`f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots`,
    description: "The Taylor series of f about x = a (a Maclaurin series when a = 0), valid where the series converges to f.",
    variables: [{ symbol: "a", meaning: "center" }, { symbol: "f^{(n)}(a)", meaning: "nth derivative at the center" }],
  },
  {
    slug: "series-error-bounds", subject: "subj_math", name: "Series error bounds",
    latex: r`|R_n(x)| \le \frac{\max|f^{(n+1)}|}{(n + 1)!}|x - a|^{n+1}, \qquad |S - S_n| \le a_{n+1}\ \text{(alternating)}`,
    description: "Lagrange error bound for a degree-n Taylor polynomial, and the alternating series error bound (for alternating series whose terms decrease to 0).",
    variables: [{ symbol: "R_n", meaning: "remainder f − Pₙ" }, { symbol: "a_{n+1}", meaning: "first omitted term's size" }],
  },
  // Added in batch 17 (Physics mechanics)
  {
    slug: "kinematic-equations", subject: "subj_phys", name: "Constant-acceleration equations",
    latex: r`v = v_0 + at, \quad \Delta x = v_0t + \tfrac{1}{2}at^2, \quad v^2 = v_0^2 + 2a\Delta x, \quad \Delta x = \tfrac{v_0 + v}{2}t`,
    description: "The four equations of motion for constant acceleration along a line. Pick the one that leaves out the quantity you don't know.",
    variables: [{ symbol: "v_0, v", meaning: "initial and final velocity", unit: "m/s" }, { symbol: "a", meaning: "acceleration", unit: "m/s²" }, { symbol: "\\Delta x", meaning: "displacement", unit: "m" }, { symbol: "t", meaning: "time", unit: "s" }],
  },
  {
    slug: "centripetal-acceleration", subject: "subj_phys", name: "Centripetal acceleration and force",
    latex: r`a_c = \frac{v^2}{r} = \omega^2 r, \qquad F_c = \frac{mv^2}{r}, \qquad v = \frac{2\pi r}{T}`,
    description: "Acceleration toward the center for motion in a circle at constant speed, and the net inward force that causes it.",
    variables: [{ symbol: "v", meaning: "speed", unit: "m/s" }, { symbol: "r", meaning: "radius", unit: "m" }, { symbol: "T", meaning: "period", unit: "s" }],
  },
  {
    slug: "universal-gravitation", subject: "subj_phys", name: "Universal gravitation",
    latex: r`F_g = \frac{Gm_1m_2}{r^2}, \qquad G = 6.67 \times 10^{-11}\ \text{N·m}^2/\text{kg}^2`,
    description: "The attractive force between two masses whose centers are a distance r apart.",
    variables: [{ symbol: "m_1, m_2", meaning: "masses", unit: "kg" }, { symbol: "r", meaning: "center-to-center distance", unit: "m" }],
  },
  {
    slug: "work-energy", subject: "subj_phys", name: "Work and the work–energy theorem",
    latex: r`W = Fd\cos\theta, \qquad W_{\text{net}} = \Delta KE, \qquad PE_g = mgh, \qquad P = \frac{W}{t}`,
    description: "Work done by a constant force, the work–energy theorem, gravitational potential energy near Earth, and power.",
    variables: [{ symbol: "\\theta", meaning: "angle between force and displacement" }, { symbol: "h", meaning: "height above a reference level", unit: "m" }, { symbol: "P", meaning: "power", unit: "W" }],
  },
  {
    slug: "momentum-impulse", subject: "subj_phys", name: "Momentum and impulse",
    latex: r`\vec{p} = m\vec{v}, \qquad \vec{J} = \vec{F}\Delta t = \Delta\vec{p}`,
    description: "Momentum is mass times velocity; the impulse of a force equals the change in momentum it causes.",
    variables: [{ symbol: "p", meaning: "momentum", unit: "kg·m/s" }, { symbol: "J", meaning: "impulse", unit: "N·s" }],
  },
  // Added in batch 18 (Physics: waves, optics, electricity and magnetism)
  {
    slug: "wave-speed", subject: "subj_phys", name: "Wave speed and the Doppler effect",
    latex: r`v = f\lambda, \quad T = \frac{1}{f}, \qquad f' = f\,\frac{v \pm v_o}{v \mp v_s}`,
    description: "Wave speed equals frequency times wavelength. Doppler: use the top signs when observer and source move toward each other.",
    variables: [{ symbol: "f", meaning: "frequency", unit: "Hz" }, { symbol: "\\lambda", meaning: "wavelength", unit: "m" }, { symbol: "v_o, v_s", meaning: "observer and source speeds", unit: "m/s" }],
  },
  {
    slug: "optics-equations", subject: "subj_phys", name: "Snell's law and the thin lens equation",
    latex: r`n_1\sin\theta_1 = n_2\sin\theta_2, \quad \tfrac{1}{f} = \tfrac{1}{d_o} + \tfrac{1}{d_i}, \quad m = -\tfrac{d_i}{d_o}`,
    description: "Refraction at a boundary, and image location and magnification for thin lenses and spherical mirrors.",
    variables: [{ symbol: "n", meaning: "index of refraction" }, { symbol: "f", meaning: "focal length", unit: "m" }, { symbol: "d_o, d_i", meaning: "object and image distances", unit: "m" }],
  },
  {
    slug: "coulombs-law", subject: "subj_phys", name: "Coulomb's law and electric field",
    latex: r`F = \frac{k|q_1q_2|}{r^2}, \qquad E = \frac{F}{q} = \frac{k|q|}{r^2}, \qquad k = 8.99 \times 10^9\ \text{N·m}^2/\text{C}^2`,
    description: "The force between point charges and the field of a point charge.",
    variables: [{ symbol: "q", meaning: "charge", unit: "C" }, { symbol: "r", meaning: "distance", unit: "m" }, { symbol: "E", meaning: "electric field", unit: "N/C" }],
  },
  {
    slug: "magnetism-induction", subject: "subj_phys", name: "Magnetic force and induction",
    latex: r`F = qvB\sin\theta, \quad F = ILB\sin\theta, \quad \Phi = BA\cos\theta, \quad \varepsilon = -N\frac{\Delta\Phi}{\Delta t}`,
    description: "Magnetic force on a moving charge and on a current-carrying wire, magnetic flux, and Faraday's law of induction.",
    variables: [{ symbol: "B", meaning: "magnetic field", unit: "T" }, { symbol: "\\Phi", meaning: "magnetic flux", unit: "Wb" }, { symbol: "\\varepsilon", meaning: "induced emf", unit: "V" }],
  },
  {
    slug: "rotational-dynamics", subject: "subj_phys", name: "Rotational motion",
    latex: r`\tau = rF\sin\theta, \quad \tau_{net} = I\alpha, \quad L = I\omega, \quad v = r\omega`,
    description: "Torque, Newton's second law for rotation, angular momentum, and the link between linear and angular speed.",
    variables: [{ symbol: "\\tau", meaning: "torque", unit: "N·m" }, { symbol: "I", meaning: "rotational inertia", unit: "kg·m²" }, { symbol: "\\omega", meaning: "angular velocity", unit: "rad/s" }, { symbol: "\\alpha", meaning: "angular acceleration", unit: "rad/s²" }],
  },
  {
    slug: "fluids", subject: "subj_phys", name: "Pressure, buoyancy and flow",
    latex: r`P = P_0 + \rho g h, \quad F_b = \rho_f V g, \quad A_1 v_1 = A_2 v_2`,
    description: "Hydrostatic pressure, Archimedes' principle and the continuity equation (Bernoulli's equation is in the fluid-flow lesson).",
    variables: [{ symbol: "\\rho", meaning: "density", unit: "kg/m³" }, { symbol: "h", meaning: "depth", unit: "m" }, { symbol: "V", meaning: "displaced volume", unit: "m³" }],
  },
  {
    slug: "heat-thermodynamics", subject: "subj_phys", name: "Heat and the first law",
    latex: r`Q = mc\Delta T, \quad Q = mL, \quad \Delta U = Q - W`,
    description: "Heat for a temperature change, heat for a phase change, and the first law of thermodynamics (W is work done by the system).",
    variables: [{ symbol: "c", meaning: "specific heat", unit: "J/(kg·°C)" }, { symbol: "L", meaning: "latent heat", unit: "J/kg" }, { symbol: "U", meaning: "internal energy", unit: "J" }],
  },
  {
    slug: "photon-energy", subject: "subj_phys", name: "Photon energy and the photoelectric effect",
    latex: r`E = hf = \frac{hc}{\lambda}, \quad K_{max} = hf - \phi`,
    description: "Energy of a photon and the maximum kinetic energy of photoelectrons; h = 6.626 × 10⁻³⁴ J·s.",
    variables: [{ symbol: "h", meaning: "Planck's constant", unit: "J·s" }, { symbol: "\\phi", meaning: "work function", unit: "eV" }],
  },
  {
    slug: "electric-potential", subject: "subj_phys", name: "Electric potential and capacitors",
    latex: r`U = \frac{kq_1q_2}{r}, \quad V = \frac{kq}{r}, \quad \Delta U = q\Delta V, \quad C = \frac{Q}{V}, \quad U_C = \tfrac12 CV^2`,
    description: "Electric potential energy of two charges, potential of a point charge, energy change through a potential difference, and capacitors.",
    variables: [{ symbol: "V", meaning: "electric potential", unit: "V" }, { symbol: "C", meaning: "capacitance", unit: "F" }, { symbol: "U", meaning: "potential energy", unit: "J" }],
  },
  {
    slug: "dc-circuits", subject: "subj_phys", name: "Kirchhoff's rules and RC circuits",
    latex: r`\sum I_{in} = \sum I_{out}, \quad \sum \Delta V_{loop} = 0, \quad V_T = \varepsilon - Ir, \quad \tau = RC`,
    description: "Junction and loop rules, terminal voltage of a battery with internal resistance, and the RC time constant.",
    variables: [{ symbol: "\\varepsilon", meaning: "emf", unit: "V" }, { symbol: "r", meaning: "internal resistance", unit: "Ω" }, { symbol: "\\tau", meaning: "time constant", unit: "s" }],
  },
  {
    slug: "interference", subject: "subj_phys", name: "Interference and diffraction",
    latex: r`d\sin\theta = m\lambda, \quad \Delta y = \frac{\lambda L}{d}, \quad a\sin\theta = m\lambda\ (\text{single-slit minima})`,
    description: "Bright fringes for two slits or a grating, fringe spacing on a distant screen, and dark fringes for a single slit.",
    variables: [{ symbol: "d", meaning: "slit separation", unit: "m" }, { symbol: "L", meaning: "screen distance", unit: "m" }, { symbol: "a", meaning: "slit width", unit: "m" }],
  },
  {
    slug: "modern-physics", subject: "subj_phys", name: "Quantum and nuclear relations",
    latex: r`\lambda = \frac{h}{p}, \quad E_n = -\frac{13.6\ \text{eV}}{n^2}, \quad E = mc^2`,
    description: "de Broglie wavelength, hydrogen energy levels, and mass–energy equivalence (1 u = 931.5 MeV/c²).",
    variables: [{ symbol: "p", meaning: "momentum", unit: "kg·m/s" }, { symbol: "n", meaning: "energy level" }],
  },
  {
    slug: "calculus-mechanics", subject: "subj_phys", name: "Mechanics with calculus",
    latex: r`v = \frac{dx}{dt}, \quad a = \frac{dv}{dt}, \quad W = \int F\,dx, \quad J = \int F\,dt, \quad F = -\frac{dU}{dx}`,
    description: "Velocity and acceleration as derivatives, work and impulse as integrals, and force from potential energy.",
    variables: [{ symbol: "J", meaning: "impulse", unit: "N·s" }, { symbol: "U", meaning: "potential energy", unit: "J" }],
  },
  {
    slug: "calculus-rotation", subject: "subj_phys", name: "Rotation and mass distributions with calculus",
    latex: r`x_{cm} = \frac{1}{M}\int x\,dm, \quad I = \int r^2\,dm, \quad \vec\tau = \vec r \times \vec F, \quad \vec L = \vec r \times \vec p`,
    description: "Center of mass and rotational inertia of continuous objects, and torque and angular momentum as cross products.",
    variables: [{ symbol: "dm", meaning: "mass element", unit: "kg" }],
  },
  {
    slug: "gauss-ampere", subject: "subj_phys", name: "Gauss's and Ampère's laws",
    latex: r`\oint \vec E\cdot d\vec A = \frac{Q_{enc}}{\varepsilon_0}, \quad \oint \vec B\cdot d\vec\ell = \mu_0 I_{enc}, \quad V = -\int \vec E\cdot d\vec r`,
    description: "Gauss's law for electric fields, Ampère's law for magnetic fields, and potential as the line integral of the field.",
    variables: [{ symbol: "\\varepsilon_0", meaning: "permittivity of free space", unit: "C²/(N·m²)" }, { symbol: "\\mu_0", meaning: "permeability of free space", unit: "T·m/A" }],
  },
  {
    slug: "induction-circuits", subject: "subj_phys", name: "Induction and inductor circuits",
    latex: r`\varepsilon = -\frac{d\Phi_B}{dt}, \quad \varepsilon_L = -L\frac{dI}{dt}, \quad \tau_{LR} = \frac{L}{R}, \quad \omega_{LC} = \frac{1}{\sqrt{LC}}`,
    description: "Faraday's law, self-induced emf, the LR time constant and the LC oscillation frequency.",
    variables: [{ symbol: "L", meaning: "inductance", unit: "H" }, { symbol: "\\Phi_B", meaning: "magnetic flux", unit: "Wb" }],
  },
  {
    slug: "molarity-dilution", subject: "subj_chem", name: "Molarity and dilution",
    latex: r`M = \frac{n_{solute}}{V_{solution}}, \quad M_1V_1 = M_2V_2`,
    description: "Concentration in moles per liter of solution, and the dilution relation (moles of solute stay the same).",
    variables: [{ symbol: "M", meaning: "molarity", unit: "mol/L" }, { symbol: "V", meaning: "volume of solution", unit: "L" }],
  },
  {
    slug: "heat-enthalpy", subject: "subj_chem", name: "Heat and enthalpy",
    latex: r`q = mc\Delta T, \quad \Delta H_{rxn} = -\frac{q_{solution}}{n}`,
    description: "Heat absorbed by a sample, and the molar enthalpy change measured by a coffee-cup calorimeter.",
    variables: [{ symbol: "q", meaning: "heat", unit: "J" }, { symbol: "c", meaning: "specific heat", unit: "J/(g·°C)" }],
  },
  {
    slug: "ph-scale", subject: "subj_chem", name: "pH and pOH",
    latex: r`\text{pH} = -\log[\text{H}^+], \quad \text{pOH} = -\log[\text{OH}^-], \quad \text{pH} + \text{pOH} = 14`,
    description: "Logarithmic acidity scale at 25 °C, where [H⁺][OH⁻] = 1.0 × 10⁻¹⁴.",
    variables: [{ symbol: "[\\text{H}^+]", meaning: "hydrogen ion concentration", unit: "M" }],
  },
  {
    slug: "equilibrium-constant", subject: "subj_chem", name: "Equilibrium constant",
    latex: r`aA + bB \rightleftharpoons cC + dD: \quad K = \frac{[C]^c[D]^d}{[A]^a[B]^b}`,
    description: "Law of mass action; compare the reaction quotient Q with K to predict the direction of shift.",
    variables: [{ symbol: "K", meaning: "equilibrium constant" }, { symbol: "Q", meaning: "reaction quotient" }],
  },
  {
    slug: "weak-acids-buffers", subject: "subj_chem", name: "Weak acids and buffers",
    latex: r`K_a = \frac{[\text{H}^+][\text{A}^-]}{[\text{HA}]}, \quad K_aK_b = K_w, \quad \text{pH} = \text{p}K_a + \log\frac{[\text{A}^-]}{[\text{HA}]}`,
    description: "Acid dissociation constant, the conjugate-pair relation, and the Henderson–Hasselbalch equation for buffers.",
    variables: [{ symbol: "K_a", meaning: "acid dissociation constant" }, { symbol: "\\text{p}K_a", meaning: "−log Ka" }],
  },
  {
    slug: "electrochemistry", subject: "subj_chem", name: "Cell potentials",
    latex: r`E^\circ_{cell} = E^\circ_{cathode} - E^\circ_{anode}, \quad \Delta G^\circ = -nFE^\circ, \quad E = E^\circ - \frac{0.0592}{n}\log Q`,
    description: "Standard cell potential, its link to free energy (F = 96,485 C/mol), and the Nernst equation at 25 °C.",
    variables: [{ symbol: "n", meaning: "moles of electrons transferred" }, { symbol: "F", meaning: "Faraday constant", unit: "C/mol" }],
  },
  {
    slug: "colligative", subject: "subj_chem", name: "Colligative properties",
    latex: r`\Delta T_f = iK_fm, \quad \Delta T_b = iK_bm, \quad \Pi = iMRT`,
    description: "Freezing-point depression, boiling-point elevation and osmotic pressure; i is the van 't Hoff factor and m the molality.",
    variables: [{ symbol: "m", meaning: "molality", unit: "mol/kg" }, { symbol: "i", meaning: "van 't Hoff factor" }],
  },
  {
    slug: "rate-laws", subject: "subj_chem", name: "Rate laws",
    latex: r`\text{rate} = k[A]^m[B]^n, \quad \ln[A] = \ln[A]_0 - kt, \quad t_{1/2} = \frac{\ln 2}{k}`,
    description: "Differential rate law and the first-order integrated rate law and half-life.",
    variables: [{ symbol: "k", meaning: "rate constant" }, { symbol: "m, n", meaning: "reaction orders" }],
  },
  {
    slug: "free-energy", subject: "subj_chem", name: "Gibbs free energy",
    latex: r`\Delta G = \Delta H - T\Delta S, \quad \Delta G^\circ = -RT\ln K, \quad \Delta G = \Delta G^\circ + RT\ln Q`,
    description: "Free energy predicts thermodynamic favorability; ΔG° is related to the equilibrium constant.",
    variables: [{ symbol: "\\Delta S", meaning: "entropy change", unit: "J/(mol·K)" }, { symbol: "R", meaning: "8.314 J/(mol·K)" }],
  },
  {
    slug: "beer-lambert", subject: "subj_chem", name: "Beer–Lambert law",
    latex: r`A = \varepsilon bc`,
    description: "Absorbance is proportional to molar absorptivity, path length and concentration.",
    variables: [{ symbol: "A", meaning: "absorbance" }, { symbol: "b", meaning: "path length", unit: "cm" }, { symbol: "c", meaning: "concentration", unit: "M" }],
  },
];
