// Registry of interactive activities that lesson authors can place with an
// "activity" block. The id is stored in lesson content; the React component
// lives in src/components/sims. Parameters listed here are what the content
// editor offers; each component validates and clamps its own inputs.

export interface ActivityParam {
  key: string;
  label: string;
  type: "number" | "boolean" | "select";
  default: number | boolean | string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

export interface ActivityDef {
  id: string;
  title: string;
  subject: "mathematics" | "physics" | "chemistry";
  summary: string;
  params: ActivityParam[];
}

export const ACTIVITY_DEFS: ActivityDef[] = [
  {
    id: "vertex-explorer",
    title: "Parabola explorer",
    subject: "mathematics",
    summary: "Drag the vertex and a second point of y = a(x − h)² + k and watch the zeros and expanded form update.",
    params: [],
  },
  {
    id: "linear-graph",
    title: "Slope and intercept",
    subject: "mathematics",
    summary: "Adjust m and b in y = mx + b; see rise over run and where the line crosses each axis.",
    params: [
      { key: "m", label: "Starting slope", type: "number", default: 1, min: -5, max: 5, step: 0.5 },
      { key: "b", label: "Starting intercept", type: "number", default: 0, min: -5, max: 5, step: 0.5 },
    ],
  },
  {
    id: "balance-equation",
    title: "Equation balance",
    subject: "mathematics",
    summary: "Solve ax + b = c by applying the same operation to both sides, one step at a time.",
    params: [
      { key: "a", label: "a", type: "number", default: 3, min: -9, max: 9, step: 1 },
      { key: "b", label: "b", type: "number", default: 5, min: -20, max: 20, step: 1 },
      { key: "c", label: "c", type: "number", default: 20, min: -40, max: 40, step: 1 },
    ],
  },
  {
    id: "unit-circle",
    title: "Unit circle",
    subject: "mathematics",
    summary: "Rotate an angle and see sine, cosine and tangent as lengths on the circle and as graphs.",
    params: [{ key: "degrees", label: "Use degrees", type: "boolean", default: true }],
  },
  {
    id: "tangent-line",
    title: "Secant to tangent",
    subject: "mathematics",
    summary: "Shrink h and watch the secant slope approach the derivative of f at a point.",
    params: [{ key: "fn", label: "Function", type: "select", default: "x^2", options: ["x^2", "x^3", "sin x", "e^x"] }],
  },
  {
    id: "riemann-sum",
    title: "Riemann sums",
    subject: "mathematics",
    summary: "Approximate the area under a curve with left, right, midpoint or trapezoid sums and compare with the exact integral.",
    params: [{ key: "fn", label: "Function", type: "select", default: "x^2", options: ["x^2", "sin x", "1/x"] }],
  },
  {
    id: "normal-distribution",
    title: "Normal distribution",
    subject: "mathematics",
    summary: "Change the mean and standard deviation; shade an interval and read its probability.",
    params: [],
  },
  {
    id: "dice-simulation",
    title: "Law of large numbers",
    subject: "mathematics",
    summary: "Roll simulated dice thousands of times and watch relative frequencies settle toward probabilities.",
    params: [],
  },
  {
    id: "projectile",
    title: "Projectile motion",
    subject: "physics",
    summary: "Set launch speed, angle and height; compare range, peak height and flight time with the equations.",
    params: [{ key: "g", label: "Gravity (m/s²)", type: "number", default: 9.8, min: 1, max: 25, step: 0.1 }],
  },
  {
    id: "forces-incline",
    title: "Forces on an incline",
    subject: "physics",
    summary: "Change angle, mass and friction; see the free-body diagram and resulting acceleration.",
    params: [],
  },
  {
    id: "spring-oscillator",
    title: "Mass on a spring",
    subject: "physics",
    summary: "Simple harmonic motion: change mass, spring constant and amplitude; watch energy trade between forms.",
    params: [],
  },
  {
    id: "circuit-builder",
    title: "Series and parallel resistors",
    subject: "physics",
    summary: "Set a battery voltage and two resistors in series or parallel; read every current and voltage.",
    params: [],
  },
  {
    id: "ideal-gas",
    title: "Ideal gas law",
    subject: "chemistry",
    summary: "Hold one variable fixed, change another and see how PV = nRT responds.",
    params: [],
  },
  {
    id: "periodic-trends",
    title: "Periodic trends",
    subject: "chemistry",
    summary: "Color the periodic table by atomic radius, electronegativity or first ionization energy.",
    params: [{ key: "property", label: "Starting property", type: "select", default: "radius", options: ["radius", "electronegativity", "ionization"] }],
  },
  {
    id: "stoichiometry",
    title: "Limiting reactant",
    subject: "chemistry",
    summary: "Choose amounts of hydrogen and oxygen; find the limiting reactant, the water produced and what's left over.",
    params: [],
  },
  {
    id: "number-line",
    title: "Integer number line",
    subject: "mathematics",
    summary: "Add and subtract integers as moves along a number line; see why subtracting a negative moves right.",
    params: [
      { key: "a", label: "Start", type: "number", default: 3, min: -10, max: 10, step: 1 },
      { key: "b", label: "Second number", type: "number", default: -7, min: -10, max: 10, step: 1 },
      { key: "op", label: "Operation", type: "select", default: "add", options: ["add", "subtract"] },
    ],
  },
  {
    id: "fraction-bars",
    title: "Fraction bars",
    subject: "mathematics",
    summary: "Compare, add and subtract two fractions with bars cut into a common denominator.",
    params: [
      { key: "n1", label: "Numerator 1", type: "number", default: 1, min: 0, max: 12, step: 1 },
      { key: "d1", label: "Denominator 1", type: "number", default: 2, min: 1, max: 12, step: 1 },
      { key: "n2", label: "Numerator 2", type: "number", default: 1, min: 0, max: 12, step: 1 },
      { key: "d2", label: "Denominator 2", type: "number", default: 3, min: 1, max: 12, step: 1 },
      { key: "op", label: "Show", type: "select", default: "add", options: ["compare", "add", "subtract"] },
    ],
  },
  {
    id: "ratio-line",
    title: "Double number line",
    subject: "mathematics",
    summary: "Scale a ratio up and down on paired number lines and read off unit rates.",
    params: [
      { key: "a", label: "A", type: "number", default: 3, min: 1, max: 20, step: 1 },
      { key: "b", label: "B", type: "number", default: 12, min: 1, max: 100, step: 1 },
      { key: "k", label: "Starting scale factor", type: "number", default: 1, min: 0, max: 10, step: 0.25 },
    ],
  },
  {
    id: "data-explorer",
    title: "Data explorer",
    subject: "mathematics",
    summary: "Drag points on a dot plot and watch the mean, median, mode, range, quartiles and box plot or histogram respond.",
    params: [
      { key: "dataset", label: "Data set", type: "select", default: "quiz", options: ["quiz", "sleep", "outlier", "skewed"] },
      { key: "view", label: "Lower display", type: "select", default: "box", options: ["box", "histogram", "none"] },
    ],
  },
  {
    id: "area-volume",
    title: "Area and volume",
    subject: "mathematics",
    summary: "Change the dimensions of polygons, circles, prisms and cylinders and see the formula evaluated.",
    params: [{ key: "shape", label: "Starting shape", type: "select", default: "rectangle", options: ["rectangle", "parallelogram", "triangle", "trapezoid", "circle", "prism", "cylinder"] }],
  },
  {
    id: "inequality-line",
    title: "Inequalities on a number line",
    subject: "mathematics",
    summary: "Graph single and compound inequalities, read interval notation and test values.",
    params: [
      { key: "rel", label: "Relation", type: "select", default: "≥", options: ["<", "≤", ">", "≥"] },
      { key: "c", label: "Boundary", type: "number", default: 2, min: -8, max: 8, step: 1 },
      { key: "mode", label: "Type", type: "select", default: "single", options: ["single", "and", "or"] },
      { key: "rel2", label: "Second relation", type: "select", default: "<", options: ["<", "≤", ">", "≥"] },
      { key: "c2", label: "Second boundary", type: "number", default: 6, min: -8, max: 8, step: 1 },
    ],
  },
  {
    id: "coordinate-plane",
    title: "Coordinate plane",
    subject: "mathematics",
    summary: "Move a point through all four quadrants and reflect it across the axes.",
    params: [
      { key: "x", label: "x", type: "number", default: 3, min: -8, max: 8, step: 1 },
      { key: "y", label: "y", type: "number", default: 2, min: -6, max: 6, step: 1 },
    ],
  },
  {
    id: "systems-graph",
    title: "Systems of equations",
    subject: "mathematics",
    summary: "Graph two lines, find where they meet, and shade half-planes for systems of inequalities.",
    params: [
      { key: "m1", label: "Slope 1", type: "number", default: 1, min: -5, max: 5, step: 0.5 },
      { key: "b1", label: "Intercept 1", type: "number", default: 1, min: -6, max: 6, step: 0.5 },
      { key: "m2", label: "Slope 2", type: "number", default: -0.5, min: -5, max: 5, step: 0.5 },
      { key: "b2", label: "Intercept 2", type: "number", default: 4, min: -6, max: 6, step: 0.5 },
      { key: "s1", label: "Shade 1", type: "select", default: "none", options: ["none", "above", "below"] },
      { key: "s2", label: "Shade 2", type: "select", default: "none", options: ["none", "above", "below"] },
      { key: "strict", label: "Strict inequalities (dashed)", type: "boolean", default: false },
    ],
  },
  {
    id: "growth-models",
    title: "Linear vs exponential",
    subject: "mathematics",
    summary: "Compare adding a constant amount with multiplying by a constant factor, step by step.",
    params: [
      { key: "a", label: "Starting value", type: "number", default: 2, min: 0.5, max: 20, step: 0.5 },
      { key: "b", label: "Growth factor", type: "number", default: 1.5, min: 0.25, max: 3, step: 0.05 },
      { key: "d", label: "Constant change", type: "number", default: 3, min: -5, max: 10, step: 0.5 },
      { key: "compare", label: "Show linear comparison", type: "boolean", default: true },
    ],
  },
  {
    id: "area-model",
    title: "Area model",
    subject: "mathematics",
    summary: "Multiply two binomials as the area of a rectangle, and read it backwards to factor.",
    params: [
      { key: "a", label: "a", type: "number", default: 1, min: 1, max: 3, step: 1 },
      { key: "b", label: "b", type: "number", default: 3, min: -6, max: 6, step: 1 },
      { key: "c", label: "c", type: "number", default: 1, min: 1, max: 3, step: 1 },
      { key: "d", label: "d", type: "number", default: 2, min: -6, max: 6, step: 1 },
    ],
  },
  {
    id: "transformations",
    title: "Transformations",
    subject: "mathematics",
    summary: "Translate, reflect, rotate and dilate a triangle on the coordinate plane and read the coordinate rule.",
    params: [{ key: "kind", label: "Starting transformation", type: "select", default: "translate", options: ["translate", "reflect", "rotate", "dilate"] }],
  },
  {
    id: "triangle-explorer",
    title: "Triangle explorer",
    subject: "mathematics",
    summary: "Drag the vertices of a triangle; see its angles, sides, exterior angle, and its medians, altitudes and bisectors with their points of concurrency.",
    params: [{ key: "show", label: "Show", type: "select", default: "angles", options: ["angles", "medians", "altitudes", "bisectors", "perpendicular"] }],
  },
  {
    id: "right-triangle-trig",
    title: "Right-triangle trigonometry",
    subject: "mathematics",
    summary: "Change an acute angle and the hypotenuse of a right triangle; watch the sides change while sine, cosine and tangent stay fixed.",
    params: [
      { key: "angle", label: "Angle (degrees)", type: "number", default: 35, min: 5, max: 85, step: 1 },
      { key: "hyp", label: "Hypotenuse", type: "number", default: 10, min: 2, max: 20, step: 0.5 },
    ],
  },
  {
    id: "circle-angles",
    title: "Central and inscribed angles",
    subject: "mathematics",
    summary: "Change an arc and move a point around the circle; compare central and inscribed angles, and compute arc length and sector area.",
    params: [
      { key: "arc", label: "Arc (degrees)", type: "number", default: 100, min: 10, max: 340, step: 5 },
      { key: "p", label: "Position of P (degrees)", type: "number", default: 230, min: 0, max: 359, step: 1 },
      { key: "r", label: "Radius", type: "number", default: 5, min: 1, max: 10, step: 0.5 },
    ],
  },
  {
    id: "polynomial-zeros",
    title: "Polynomial from its zeros",
    subject: "mathematics",
    summary: "Set the zeros, multiplicities and leading factor of a polynomial; see crossing versus touching, end behavior and turning points.",
    params: [
      { key: "a", label: "Leading factor", type: "number", default: 0.25, min: -2, max: 2, step: 0.05 },
      { key: "r1", label: "Zero 1", type: "number", default: -3, min: -5, max: 5, step: 0.5 },
      { key: "m1", label: "Multiplicity 1", type: "number", default: 1, min: 1, max: 3, step: 1 },
      { key: "r2", label: "Zero 2", type: "number", default: 1, min: -5, max: 5, step: 0.5 },
      { key: "m2", label: "Multiplicity 2", type: "number", default: 2, min: 0, max: 3, step: 1 },
      { key: "r3", label: "Zero 3", type: "number", default: 4, min: -5, max: 5, step: 0.5 },
      { key: "m3", label: "Multiplicity 3", type: "number", default: 1, min: 0, max: 3, step: 1 },
    ],
  },
  {
    id: "rational-graph",
    title: "Rational functions and asymptotes",
    subject: "mathematics",
    summary: "Stretch and shift y = a/(x − h) + k and read its asymptotes, domain, range and intercepts.",
    params: [
      { key: "a", label: "a", type: "number", default: 2, min: -6, max: 6, step: 0.5 },
      { key: "h", label: "h", type: "number", default: 1, min: -4, max: 4, step: 0.5 },
      { key: "k", label: "k", type: "number", default: -1, min: -4, max: 4, step: 0.5 },
    ],
  },
  {
    id: "exp-log",
    title: "Exponential and logarithmic functions",
    subject: "mathematics",
    summary: "Change the base of bˣ and see its inverse, log base b, reflected across y = x.",
    params: [{ key: "b", label: "Base", type: "number", default: 2, min: 0.2, max: 5, step: 0.1 }],
  },
  {
    id: "sinusoid",
    title: "Sine and cosine graphs",
    subject: "mathematics",
    summary: "Adjust amplitude, period, phase shift and midline of y = A sin(B(x − C)) + D.",
    params: [
      { key: "A", label: "A", type: "number", default: 2, min: -4, max: 4, step: 0.5 },
      { key: "B", label: "B", type: "number", default: 1, min: 0.25, max: 4, step: 0.25 },
      { key: "C", label: "C (radians)", type: "number", default: 0, min: -3.2, max: 3.2, step: 0.1 },
      { key: "D", label: "D", type: "number", default: 0, min: -3, max: 3, step: 0.5 },
    ],
  },
  {
    id: "vectors",
    title: "Vectors in the plane",
    subject: "mathematics",
    summary: "Add and subtract vectors, find magnitude and direction, and see the dot product and the angle between two vectors.",
    params: [
      { key: "ux", label: "u x", type: "number", default: 3, min: -6, max: 6, step: 1 },
      { key: "uy", label: "u y", type: "number", default: 1, min: -6, max: 6, step: 1 },
      { key: "vx", label: "v x", type: "number", default: 1, min: -6, max: 6, step: 1 },
      { key: "vy", label: "v y", type: "number", default: 3, min: -6, max: 6, step: 1 },
    ],
  },
  {
    id: "conics",
    title: "Conic sections",
    subject: "mathematics",
    summary: "Change a, b and the center of a circle, ellipse or hyperbola; see foci, eccentricity and asymptotes.",
    params: [
      { key: "kind", label: "Conic", type: "select", default: "ellipse", options: ["circle", "ellipse", "hyperbola"] },
      { key: "a", label: "a", type: "number", default: 5, min: 1, max: 7, step: 0.5 },
      { key: "b", label: "b", type: "number", default: 3, min: 1, max: 6, step: 0.5 },
    ],
  },
  {
    id: "polar-graph",
    title: "Polar graphs",
    subject: "mathematics",
    summary: "Trace limaçons, roses, circles and spirals in polar coordinates and convert points to rectangular form.",
    params: [
      { key: "kind", label: "Curve", type: "select", default: "limacon", options: ["limacon", "rose", "circle", "spiral"] },
      { key: "a", label: "a", type: "number", default: 2, min: 0, max: 4, step: 0.5 },
      { key: "b", label: "b", type: "number", default: 2, min: 0, max: 4, step: 0.5 },
      { key: "n", label: "n", type: "number", default: 3, min: 1, max: 8, step: 1 },
    ],
  },
  {
    id: "derivative-graph",
    title: "A function and its derivative",
    subject: "mathematics",
    summary: "Move a point along f and watch the tangent slope trace out the graph of f′, with f″ telling you about concavity.",
    params: [
      { key: "fn", label: "Function", type: "select", default: "cubic", options: ["cubic", "quartic", "sin", "exp", "ln"] },
      { key: "a", label: "Starting point", type: "number", default: 1.5, min: -6, max: 6, step: 0.05 },
    ],
  },
  {
    id: "accumulation",
    title: "The accumulation function",
    subject: "mathematics",
    summary: "Sweep the upper limit of an integral and watch signed area build the graph of F(x) = ∫₀ˣ f(t) dt.",
    params: [
      { key: "fn", label: "Integrand", type: "select", default: "linear", options: ["linear", "sin", "parabola", "velocity"] },
      { key: "x", label: "Upper limit", type: "number", default: 3, min: 0, max: 7, step: 0.05 },
    ],
  },
  {
    id: "slope-field",
    title: "Slope fields",
    subject: "mathematics",
    summary: "See a differential equation as a field of slopes, and trace the solution curve through any starting point.",
    params: [
      { key: "eq", label: "Equation", type: "select", default: "x-y", options: ["growth", "x", "x+y", "x-y", "circle", "logistic"] },
      { key: "x0", label: "Start x", type: "number", default: 0, min: -4.5, max: 4.5, step: 0.25 },
      { key: "y0", label: "Start y", type: "number", default: 1, min: -4, max: 4, step: 0.25 },
    ],
  },
  {
    id: "taylor",
    title: "Taylor polynomials",
    subject: "mathematics",
    summary: "Add terms to a Maclaurin polynomial and watch it hug sin x, cos x, eˣ, ln(1 + x) or 1/(1 − x), inside or outside the interval of convergence.",
    params: [
      { key: "fn", label: "Function", type: "select", default: "sin", options: ["sin", "cos", "exp", "ln", "geo"] },
      { key: "n", label: "Degree", type: "number", default: 3, min: 0, max: 15, step: 1 },
      { key: "x", label: "Evaluate at", type: "number", default: 1, min: -6, max: 6, step: 0.05 },
    ],
  },
  {
    id: "optimization-box",
    title: "Optimizing an open box",
    subject: "mathematics",
    summary: "Cut squares from the corners of a sheet, fold up the sides, and find the cut that maximizes the box's volume.",
    params: [
      { key: "length", label: "Sheet length", type: "number", default: 12, min: 6, max: 20, step: 1 },
      { key: "width", label: "Sheet width", type: "number", default: 12, min: 6, max: 20, step: 1 },
      { key: "x", label: "Starting cut", type: "number", default: 1, min: 0, max: 10, step: 0.05 },
    ],
  },
  {
    id: "volume-slicing",
    title: "Volumes by slicing",
    subject: "mathematics",
    summary: "Build a solid from discs, washers, squares or semicircles and watch the sum of slice volumes approach the integral.",
    params: [
      { key: "mode", label: "Method", type: "select", default: "disc", options: ["disc", "washer", "squares", "semicircles"] },
      { key: "n", label: "Slices", type: "number", default: 8, min: 2, max: 40, step: 1 },
      { key: "x", label: "Highlighted slice", type: "number", default: 2, min: 0, max: 4, step: 0.05 },
    ],
  },
  {
    id: "series",
    title: "Infinite series",
    subject: "mathematics",
    summary: "Add terms one at a time and watch partial sums settle on a limit or grow without bound: geometric, harmonic, p-series, alternating and factorial series.",
    params: [
      { key: "series", label: "Series", type: "select", default: "geometric", options: ["geometric", "harmonic", "p2", "alternating", "factorial"] },
      { key: "n", label: "Number of terms", type: "number", default: 10, min: 1, max: 60, step: 1 },
    ],
  },
  {
    id: "motion-graphs",
    title: "Motion graphs",
    subject: "physics",
    summary: "Set an initial velocity and a constant acceleration, scrub through time, and connect the moving cart to its position and velocity graphs.",
    params: [
      { key: "v0", label: "Initial velocity", type: "number", default: 8, min: -15, max: 15, step: 0.5 },
      { key: "a", label: "Acceleration", type: "number", default: -2, min: -5, max: 5, step: 0.25 },
      { key: "x0", label: "Initial position", type: "number", default: 0, min: -20, max: 20, step: 1 },
      { key: "t", label: "Time", type: "number", default: 2, min: 0, max: 10, step: 0.05 },
    ],
  },
  {
    id: "waves",
    title: "Waves",
    subject: "physics",
    summary: "Explore travelling waves (v = fλ), superposition and interference, and standing waves with nodes and antinodes on a string.",
    params: [
      { key: "mode", label: "Mode", type: "select", default: "travel", options: ["travel", "superpose", "standing"] },
      { key: "wavelength", label: "Wavelength", type: "number", default: 2, min: 0.5, max: 4, step: 0.1 },
      { key: "frequency", label: "Frequency", type: "number", default: 1, min: 0.25, max: 3, step: 0.05 },
      { key: "harmonic", label: "Harmonic", type: "number", default: 2, min: 1, max: 6, step: 1 },
      { key: "phase", label: "Phase difference", type: "number", default: 0, min: 0, max: 360, step: 5 },
    ],
  },
  {
    id: "ray-optics",
    title: "Lenses and mirrors",
    subject: "physics",
    summary: "Trace principal rays through converging and diverging lenses and off concave and convex mirrors, and locate the image with 1/f = 1/dₒ + 1/dᵢ.",
    params: [
      { key: "optic", label: "Optic", type: "select", default: "converging", options: ["converging", "diverging", "concave", "convex"] },
      { key: "focal", label: "Focal length", type: "number", default: 10, min: 4, max: 20, step: 0.5 },
      { key: "object", label: "Object distance", type: "number", default: 25, min: 3, max: 45, step: 0.5 },
    ],
  },
  {
    id: "electric-field",
    title: "Electric fields",
    subject: "physics",
    summary: "Place two point charges, map their electric field, probe its strength anywhere, and see Coulomb's law at work.",
    params: [
      { key: "q1", label: "Charge 1 (μC)", type: "number", default: 2, min: -5, max: 5, step: 0.5 },
      { key: "q2", label: "Charge 2 (μC)", type: "number", default: -2, min: -5, max: 5, step: 0.5 },
      { key: "separation", label: "Separation (m)", type: "number", default: 4, min: 1, max: 8, step: 0.5 },
    ],
  },
  {
    id: "torque-balance",
    title: "Torque and balance",
    subject: "physics",
    summary: "Place two masses on a seesaw, compare the torques mgd on each side and find the balance point.",
    params: [
      { key: "m1", label: "Left mass (kg)", type: "number", default: 4, min: 0, max: 10, step: 0.5 },
      { key: "d1", label: "Left distance (m)", type: "number", default: 1.5, min: 0, max: 2, step: 0.1 },
      { key: "m2", label: "Right mass (kg)", type: "number", default: 6, min: 0, max: 10, step: 0.5 },
      { key: "d2", label: "Right distance (m)", type: "number", default: 1, min: 0, max: 2, step: 0.1 },
    ],
  },
  {
    id: "buoyancy",
    title: "Buoyancy",
    subject: "physics",
    summary: "Drop a block into water, seawater, oil or glycerin; compare its weight with the buoyant force and see how much floats above the surface.",
    params: [
      { key: "fluid", label: "Fluid", type: "select", default: "water", options: ["water", "seawater", "oil", "glycerin"] },
      { key: "density", label: "Block density (kg/m³)", type: "number", default: 600, min: 100, max: 3000, step: 50 },
      { key: "volume", label: "Block volume (L)", type: "number", default: 2, min: 0.5, max: 5, step: 0.5 },
    ],
  },
  {
    id: "half-life",
    title: "Radioactive decay and half-life",
    subject: "physics",
    summary: "Watch a sample of 400 nuclei decay at random and compare the count with the half-life model N₀(½)^(t/T).",
    params: [
      { key: "halfLife", label: "Half-life (years)", type: "number", default: 5, min: 1, max: 20, step: 1 },
      { key: "time", label: "Time (years)", type: "number", default: 0, min: 0, max: 60, step: 0.5 },
    ],
  },
  {
    id: "pendulum",
    title: "Simple pendulum",
    subject: "physics",
    summary: "Change a pendulum's length, amplitude and gravity (Earth, Moon, Mars) and see how its period changes, or doesn't.",
    params: [
      { key: "planet", label: "Gravity", type: "select", default: "earth", options: ["earth", "moon", "mars"] },
      { key: "length", label: "Length (m)", type: "number", default: 1, min: 0.25, max: 2, step: 0.05 },
      { key: "amplitude", label: "Amplitude (°)", type: "number", default: 10, min: 5, max: 60, step: 5 },
    ],
  },
  {
    id: "rolling-race",
    title: "Rolling race",
    subject: "physics",
    summary: "Race a sphere, a disk, a hoop and a sliding block down the same ramp and see how rotational inertia sets the winner.",
    params: [
      { key: "height", label: "Ramp height (m)", type: "number", default: 1, min: 0.25, max: 5, step: 0.25 },
      { key: "angle", label: "Ramp angle (°)", type: "number", default: 20, min: 5, max: 45, step: 1 },
    ],
  },
  {
    id: "electric-potential",
    title: "Electric potential",
    subject: "physics",
    summary: "Map the electric potential of two point charges, see equipotential lines, and probe the potential and a test charge's energy anywhere.",
    params: [
      { key: "q1", label: "Charge 1 (μC)", type: "number", default: 2, min: -5, max: 5, step: 0.5 },
      { key: "q2", label: "Charge 2 (μC)", type: "number", default: -2, min: -5, max: 5, step: 0.5 },
      { key: "separation", label: "Separation (m)", type: "number", default: 4, min: 1, max: 8, step: 0.5 },
    ],
  },
  {
    id: "rc-circuit",
    title: "RC circuit",
    subject: "physics",
    summary: "Charge and discharge a capacitor through a resistor; read the time constant, voltage, current and charge at any moment.",
    params: [
      { key: "mode", label: "Process", type: "select", default: "charge", options: ["charge", "discharge"] },
      { key: "voltage", label: "Voltage (V)", type: "number", default: 9, min: 1, max: 12, step: 0.5 },
      { key: "resistance", label: "Resistance (kΩ)", type: "number", default: 10, min: 1, max: 50, step: 1 },
      { key: "capacitance", label: "Capacitance (μF)", type: "number", default: 100, min: 10, max: 500, step: 10 },
    ],
  },
  {
    id: "double-slit",
    title: "Double-slit interference",
    subject: "physics",
    summary: "Shine colored light through two slits and see the fringe pattern change with wavelength, slit separation, slit width and screen distance.",
    params: [
      { key: "wavelength", label: "Wavelength (nm)", type: "number", default: 550, min: 400, max: 700, step: 5 },
      { key: "separation", label: "Slit separation (mm)", type: "number", default: 0.25, min: 0.05, max: 1, step: 0.01 },
      { key: "distance", label: "Screen distance (m)", type: "number", default: 2, min: 0.5, max: 4, step: 0.1 },
      { key: "width", label: "Slit width (mm)", type: "number", default: 0.04, min: 0, max: 0.1, step: 0.005 },
    ],
  },
  {
    id: "drag-fall",
    title: "Falling with air resistance",
    subject: "physics",
    summary: "Drop an object with linear or quadratic drag and watch its speed approach terminal velocity, compared with free fall.",
    params: [
      { key: "drag", label: "Drag law", type: "select", default: "linear", options: ["linear", "quadratic"] },
      { key: "mass", label: "Mass (kg)", type: "number", default: 0.1, min: 0.05, max: 2, step: 0.05 },
      { key: "coefficient", label: "Drag coefficient", type: "number", default: 0.5, min: 0.05, max: 2, step: 0.05 },
    ],
  },
  {
    id: "work-integral",
    title: "Work as an integral",
    subject: "physics",
    summary: "Pick a force law F(x), choose start and end points, and see the work as the shaded area under the force–position graph.",
    params: [
      { key: "law", label: "Force law", type: "select", default: "square", options: ["constant", "spring", "square", "decreasing"] },
      { key: "k", label: "k", type: "number", default: 3, min: 0.5, max: 5, step: 0.5 },
      { key: "x1", label: "Start (m)", type: "number", default: 0, min: 0, max: 4, step: 0.1 },
      { key: "x2", label: "End (m)", type: "number", default: 2, min: 0, max: 4, step: 0.1 },
    ],
  },
  {
    id: "gauss-field",
    title: "Gauss's law: field of symmetric charges",
    subject: "physics",
    summary: "Plot E(r) for a solid charged sphere, a conductor, a line and a cylinder, and move a Gaussian surface to see the enclosed charge and flux.",
    params: [
      { key: "distribution", label: "Distribution", type: "select", default: "solid", options: ["solid", "shell", "line", "cylinder"] },
      { key: "charge", label: "Charge (nC)", type: "number", default: 6, min: 1, max: 10, step: 0.5 },
      { key: "radius", label: "Radius (m)", type: "number", default: 0.1, min: 0.05, max: 0.3, step: 0.01 },
      { key: "gaussian", label: "Gaussian radius (m)", type: "number", default: 0.05, min: 0.01, max: 0.5, step: 0.005 },
    ],
  },
  {
    id: "inductor-circuit",
    title: "Inductor circuits",
    subject: "physics",
    summary: "Watch current rise and decay in LR circuits and oscillate in an LC circuit, with time constants, frequencies and stored energies.",
    params: [
      { key: "mode", label: "Circuit", type: "select", default: "rise", options: ["rise", "decay", "lc"] },
      { key: "emf", label: "emf (V)", type: "number", default: 12, min: 1, max: 24, step: 1 },
      { key: "resistance", label: "Resistance (Ω)", type: "number", default: 4, min: 1, max: 20, step: 0.5 },
      { key: "inductance", label: "Inductance (H)", type: "number", default: 0.5, min: 0.05, max: 2, step: 0.05 },
      { key: "capacitance", label: "Capacitance (μF)", type: "number", default: 100, min: 10, max: 1000, step: 10 },
    ],
  },
  {
    id: "vsepr",
    title: "Molecular geometry (VSEPR)",
    subject: "chemistry",
    summary: "Choose the number of electron domains and lone pairs, rotate the 3D shape, and read its electron and molecular geometry and bond angles.",
    params: [
      { key: "domains", label: "Electron domains", type: "number", default: 4, min: 2, max: 6, step: 1 },
      { key: "lonePairs", label: "Lone pairs", type: "number", default: 0, min: 0, max: 3, step: 1 },
    ],
  },
  {
    id: "titration",
    title: "Titration curve",
    subject: "chemistry",
    summary: "Titrate a strong or weak acid with NaOH, watch the pH curve, and find the equivalence point and pKa.",
    params: [
      { key: "acid", label: "Acid", type: "select", default: "strong", options: ["strong", "weak"] },
      { key: "acidConc", label: "Acid concentration (M)", type: "number", default: 0.1, min: 0.01, max: 0.5, step: 0.01 },
      { key: "baseConc", label: "NaOH concentration (M)", type: "number", default: 0.1, min: 0.01, max: 0.5, step: 0.01 },
      { key: "baseVolume", label: "NaOH added (mL)", type: "number", default: 12.5, min: 0, max: 60, step: 0.1 },
    ],
  },
  {
    id: "equilibrium",
    title: "Equilibrium and Le Châtelier's principle",
    subject: "chemistry",
    summary: "Disturb A + B ⇌ C by adding or removing a substance, compare Q with K, and see the new equilibrium.",
    params: [
      { key: "K", label: "K", type: "number", default: 4, min: 0.1, max: 50, step: 0.1 },
      { key: "A0", label: "Starting [A] (M)", type: "number", default: 1, min: 0.1, max: 2, step: 0.1 },
      { key: "B0", label: "Starting [B] (M)", type: "number", default: 1, min: 0.1, max: 2, step: 0.1 },
      { key: "amount", label: "Amount added (M)", type: "number", default: 0.5, min: 0.1, max: 1, step: 0.1 },
    ],
  },
  {
    id: "kinetics",
    title: "Reaction rates",
    subject: "chemistry",
    summary: "Compare zero-, first- and second-order reactions, find half-lives, and see how temperature and activation energy change k.",
    params: [
      { key: "order", label: "Order", type: "select", default: "1", options: ["0", "1", "2"] },
      { key: "k", label: "k at 298 K", type: "number", default: 0.1, min: 0.01, max: 0.5, step: 0.01 },
      { key: "A0", label: "Starting [A] (M)", type: "number", default: 1, min: 0.2, max: 2, step: 0.1 },
      { key: "temperature", label: "Temperature (K)", type: "number", default: 298, min: 273, max: 373, step: 1 },
      { key: "Ea", label: "Activation energy (kJ/mol)", type: "number", default: 50, min: 10, max: 100, step: 5 },
    ],
  },
  {
    id: "galvanic-cell",
    title: "Galvanic cell",
    subject: "chemistry",
    summary: "Pair two metal half-cells, identify the anode and cathode, and compute the standard and Nernst cell potentials and ΔG.",
    params: [
      { key: "left", label: "Left electrode", type: "select", default: "Zn", options: ["Mg", "Al", "Zn", "Fe", "Ni", "Pb", "Cu", "Ag"] },
      { key: "right", label: "Right electrode", type: "select", default: "Cu", options: ["Mg", "Al", "Zn", "Fe", "Ni", "Pb", "Cu", "Ag"] },
      { key: "leftConc", label: "Left ion concentration (M)", type: "number", default: 1, min: 0.001, max: 2, step: 0.001 },
      { key: "rightConc", label: "Right ion concentration (M)", type: "number", default: 1, min: 0.001, max: 2, step: 0.001 },
    ],
  },
  {
    id: "buffer",
    title: "Buffers",
    subject: "chemistry",
    summary: "Add strong acid or base to an acetic acid/acetate buffer and to pure water, and compare how much the pH changes.",
    params: [
      { key: "acid", label: "Acetic acid (mol)", type: "number", default: 0.1, min: 0.01, max: 0.5, step: 0.01 },
      { key: "base", label: "Sodium acetate (mol)", type: "number", default: 0.1, min: 0.01, max: 0.5, step: 0.01 },
      { key: "added", label: "Strong acid (−) or base (+) added (mol)", type: "number", default: 0.02, min: -0.2, max: 0.2, step: 0.005 },
    ],
  },
  {
    id: "pes",
    title: "Photoelectron spectroscopy",
    subject: "chemistry",
    summary: "See the photoelectron spectrum of any element from H to Ar: peak positions give subshell binding energies and heights give electron counts.",
    params: [
      { key: "element", label: "Element", type: "select", default: "O", options: ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"] },
    ],
  },
  {
    id: "beer-lambert",
    title: "Beer–Lambert law",
    subject: "chemistry",
    summary: "Change concentration, path length and molar absorptivity and watch absorbance and transmitted light change.",
    params: [
      { key: "concentration", label: "Concentration (M)", type: "number", default: 0.0001, min: 0, max: 0.0004, step: 0.000005 },
      { key: "path", label: "Path length (cm)", type: "number", default: 1, min: 0.5, max: 2, step: 0.1 },
      { key: "absorptivity", label: "Molar absorptivity (M⁻¹cm⁻¹)", type: "number", default: 5000, min: 500, max: 20000, step: 500 },
    ],
  },
  {
    id: "microstates",
    title: "Microstates and entropy",
    subject: "chemistry",
    summary: "Share particles between two halves of a box and count the arrangements behind each distribution.",
    params: [
      { key: "particles", label: "Particles", type: "number", default: 10, min: 2, max: 30, step: 1 },
      { key: "left", label: "Particles on the left", type: "number", default: 5, min: 0, max: 30, step: 1 },
    ],
  },
  {
    id: "free-energy",
    title: "Gibbs free energy and temperature",
    subject: "chemistry",
    summary: "Set ΔH° and ΔS° and see how ΔG° and K change with temperature, including the crossover temperature.",
    params: [
      { key: "dH", label: "ΔH° (kJ)", type: "number", default: -92.2, min: -300, max: 300, step: 0.1 },
      { key: "dS", label: "ΔS° (J/K)", type: "number", default: -198.7, min: -400, max: 400, step: 0.1 },
      { key: "T", label: "Temperature (K)", type: "number", default: 298, min: 100, max: 1500, step: 1 },
    ],
  },
  {
    id: "collisions",
    title: "Collisions in one dimension",
    subject: "physics",
    summary: "Crash two carts with any masses, velocities and bounciness and compare momentum and kinetic energy before and after.",
    params: [
      { key: "m1", label: "Mass 1 (kg)", type: "number", default: 2, min: 0.5, max: 5, step: 0.5 },
      { key: "m2", label: "Mass 2 (kg)", type: "number", default: 3, min: 0.5, max: 5, step: 0.5 },
      { key: "v1", label: "Velocity 1 (m/s)", type: "number", default: 5, min: -6, max: 6, step: 0.5 },
      { key: "v2", label: "Velocity 2 (m/s)", type: "number", default: 0, min: -6, max: 6, step: 0.5 },
      { key: "e", label: "Coefficient of restitution", type: "number", default: 1, min: 0, max: 1, step: 0.05 },
    ],
  },
  {
    id: "energy-track",
    title: "Energy on a track",
    subject: "physics",
    summary: "Release a ball on a U-shaped track and watch kinetic, potential and thermal energy trade off, with or without friction.",
    params: [
      { key: "height", label: "Start height (m)", type: "number", default: 4, min: 1, max: 6, step: 0.5 },
      { key: "mass", label: "Mass (kg)", type: "number", default: 2, min: 0.5, max: 5, step: 0.5 },
      { key: "friction", label: "Friction coefficient", type: "number", default: 0, min: 0, max: 0.2, step: 0.01 },
    ],
  },
  {
    id: "pv-diagram",
    title: "PV diagrams",
    subject: "physics",
    summary: "Run isothermal, isobaric, isochoric and adiabatic processes on an ideal gas and read work, heat and ΔU from the first law.",
    params: [
      { key: "process", label: "Process", type: "select", default: "isothermal", options: ["isothermal", "isobaric", "isochoric", "adiabatic"] },
      { key: "target", label: "Final volume (L)", type: "number", default: 20, min: 4, max: 30, step: 0.5 },
    ],
  },
  {
    id: "magnetic-orbit",
    title: "Charges in a magnetic field",
    subject: "physics",
    summary: "Send protons, deuterons and alpha particles through a magnetic field and see how speed, charge, mass and B set the radius.",
    params: [
      { key: "species", label: "Particle", type: "select", default: "proton", options: ["proton", "deuteron", "alpha"] },
      { key: "speed", label: "Speed (10⁵ m/s)", type: "number", default: 10, min: 1, max: 20, step: 0.5 },
      { key: "field", label: "Field (T)", type: "number", default: 0.1, min: 0.05, max: 1, step: 0.05 },
    ],
  },
  {
    id: "loop-induction",
    title: "Motional emf and Lenz's law",
    subject: "physics",
    summary: "Pull a loop through a magnetic field and watch the flux, the induced emf and the current's direction change.",
    params: [
      { key: "field", label: "Field (T)", type: "number", default: 0.5, min: 0.1, max: 1, step: 0.05 },
      { key: "speed", label: "Speed (m/s)", type: "number", default: 2, min: 0.5, max: 4, step: 0.5 },
      { key: "resistance", label: "Resistance (Ω)", type: "number", default: 2, min: 0.5, max: 10, step: 0.5 },
    ],
  },
  {
    id: "limits",
    title: "Limits",
    subject: "mathematics",
    summary: "Approach a point from both sides on a graph and in a table: holes, jumps, asymptotes, sin x / x and sin(1/x).",
    params: [
      { key: "case", label: "Function", type: "select", default: "hole", options: ["hole", "jump", "vertical", "sinx", "oscillate"] },
    ],
  },
  {
    id: "hydrogen-spectrum",
    title: "Hydrogen energy levels and spectra",
    subject: "chemistry",
    summary: "Move an electron between hydrogen's energy levels and see the photon's energy, wavelength, colour and series.",
    params: [
      { key: "upper", label: "Upper level", type: "number", default: 3, min: 2, max: 6, step: 1 },
      { key: "lower", label: "Lower level", type: "number", default: 2, min: 1, max: 5, step: 1 },
      { key: "mode", label: "Process", type: "select", default: "emission", options: ["emission", "absorption"] },
    ],
  },
  {
    id: "orbital-filling",
    title: "Orbital filling diagrams",
    subject: "chemistry",
    summary: "Build the electron configuration of any element from H to Kr with the aufbau order, Hund's rule and the Pauli principle.",
    params: [
      { key: "Z", label: "Atomic number", type: "number", default: 8, min: 1, max: 36, step: 1 },
    ],
  },
  {
    id: "lewis-structures",
    title: "Lewis structures and formal charge",
    subject: "chemistry",
    summary: "Compare Lewis structures for CO₂, SCN⁻, N₂O, O₃, NO₃⁻ and SO₄²⁻, with formal charges and electron counts worked out for each.",
    params: [
      { key: "molecule", label: "Species", type: "select", default: "scn", options: ["co2", "scn", "n2o", "o3", "no3", "so4"] },
    ],
  },
  {
    id: "rlc-circuit",
    title: "AC circuits: series RLC",
    subject: "physics",
    summary: "Tune resistance, inductance, capacitance and frequency to see reactance, impedance, phase and resonance in phasors and waveforms.",
    params: [
      { key: "R", label: "Resistance (Ω)", type: "number", default: 50, min: 5, max: 200, step: 5 },
      { key: "L", label: "Inductance (mH)", type: "number", default: 100, min: 10, max: 500, step: 10 },
      { key: "C", label: "Capacitance (μF)", type: "number", default: 10, min: 1, max: 100, step: 1 },
      { key: "f", label: "Frequency (Hz)", type: "number", default: 60, min: 10, max: 500, step: 1 },
    ],
  },
  {
    id: "constructions",
    title: "Compass-and-straightedge constructions",
    subject: "mathematics",
    summary: "Step through perpendicular bisector, angle bisector and equilateral triangle constructions, and drag the figure to see why they always work.",
    params: [
      { key: "kind", label: "Construction", type: "select", default: "perpendicular", options: ["perpendicular", "angle", "equilateral"] },
    ],
  },
  {
    id: "u-substitution",
    title: "u-substitution",
    subject: "mathematics",
    summary: "See an integral's area in x and the matching area in u side by side as you change the upper limit.",
    params: [
      { key: "case", label: "Integrand", type: "select", default: "cos", options: ["cos", "exp", "power"] },
    ],
  },
];

export const ACTIVITY_IDS = ACTIVITY_DEFS.map((a) => a.id);
