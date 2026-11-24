-- Eureka and Beyond — Migration 0003: first published content
--
-- One genuine, reviewed lesson so the full Subject → Course → Unit → Chapter →
-- Lesson path can be exercised end to end, plus a small set of standard
-- formulas for the Formula Library. Algebra I moves from 'planned' to
-- 'in_development' because it now has published content but is not complete.
--
-- To withdraw this content later, write a new migration that sets the rows'
-- status to 'archived' — do not delete or edit this file.

UPDATE courses SET status = 'in_development', updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE id = 'crs_alg1_ol';

INSERT INTO units (id, course_id, slug, title, summary, position, status) VALUES
  ('unit_alg1_lin_eq', 'crs_alg1_ol', 'linear-equations', 'Linear equations in one variable',
   'Write and solve equations with one unknown, and check that a solution is correct.', 1, 'published');

INSERT INTO chapters (id, unit_id, slug, title, summary, position, status) VALUES
  ('chap_alg1_solving', 'unit_alg1_lin_eq', 'solving-equations', 'Solving equations',
   'Use inverse operations and the properties of equality to isolate a variable.', 1, 'published');

INSERT INTO lessons (id, slug, title, summary, estimated_minutes, status, published_at) VALUES
  ('les_two_step_eq', 'solving-two-step-equations', 'Solving two-step equations',
   'Isolate the variable in equations such as 3x + 5 = 20 by undoing operations in reverse order, then check the answer.',
   20, 'published', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'));

INSERT INTO chapter_lessons (chapter_id, lesson_id, position) VALUES
  ('chap_alg1_solving', 'les_two_step_eq', 1);

INSERT INTO lesson_blocks (id, lesson_id, mode, position, kind, data) VALUES
  ('blk_tse_1', 'les_two_step_eq', 'learn', 1, 'text',
   '{"body": "An equation says that two expressions have the same value. To solve an equation is to find every value of the variable that makes it true. A two-step equation such as $3x + 5 = 20$ needs two inverse operations to get the variable by itself."}'),
  ('blk_tse_2', 'les_two_step_eq', 'learn', 2, 'definition',
   '{"term": "Inverse operations", "body": "Operations that undo each other. Addition and subtraction are inverses, and so are multiplication and division by the same nonzero number."}'),
  ('blk_tse_3', 'les_two_step_eq', 'learn', 3, 'formula',
   '{"title": "Properties of equality: if a = b, then", "latex": "\\begin{aligned} a + c &= b + c \\\\ a - c &= b - c \\\\ ac &= bc \\\\ \\frac{a}{c} &= \\frac{b}{c} \\quad (c \\neq 0) \\end{aligned}", "note": "Doing the same operation to both sides keeps the equation balanced, so the solution does not change."}'),
  ('blk_tse_4', 'les_two_step_eq', 'learn', 4, 'callout',
   '{"tone": "tip", "title": "Undo in reverse order", "body": "In $3x + 5$, the variable is multiplied by 3 first and then 5 is added. To isolate $x$, undo those steps in the opposite order: subtract 5 first, then divide by 3."}'),
  ('blk_tse_5', 'les_two_step_eq', 'learn', 5, 'worked_example',
   '{"title": "Solve $3x + 5 = 20$", "steps": [{"latex": "3x + 5 - 5 = 20 - 5", "explanation": "Subtract 5 from both sides to undo the addition."}, {"latex": "3x = 15", "explanation": "Simplify both sides."}, {"latex": "\\frac{3x}{3} = \\frac{15}{3}", "explanation": "Divide both sides by 3 to undo the multiplication."}, {"latex": "x = 5", "explanation": "Simplify."}], "check": "Substitute $x = 5$ into the original equation: $3(5) + 5 = 15 + 5 = 20$. Both sides match, so $x = 5$ is the solution."}'),
  ('blk_tse_6', 'les_two_step_eq', 'learn', 6, 'worked_example',
   '{"title": "Solve $\\frac{x}{4} - 7 = -2$", "steps": [{"latex": "\\frac{x}{4} - 7 + 7 = -2 + 7", "explanation": "Add 7 to both sides to undo the subtraction."}, {"latex": "\\frac{x}{4} = 5", "explanation": "Simplify."}, {"latex": "4 \\cdot \\frac{x}{4} = 4 \\cdot 5", "explanation": "Multiply both sides by 4 to undo the division."}, {"latex": "x = 20", "explanation": "Simplify."}], "check": "Substitute $x = 20$: $\\frac{20}{4} - 7 = 5 - 7 = -2$. The solution checks."}'),
  ('blk_tse_7', 'les_two_step_eq', 'learn', 7, 'callout',
   '{"tone": "application", "title": "Where this shows up", "body": "A taxi charges a 3-dollar pickup fee plus 2 dollars per mile, and a ride costs 15 dollars. If $m$ is the number of miles, the trip is modeled by $2m + 3 = 15$. Subtracting 3 and dividing by 2 gives $m = 6$ miles."}');

INSERT INTO concepts (id, subject_id, slug, name, description) VALUES
  ('cpt_lin_eq', 'subj_math', 'solving-linear-equations', 'Solving linear equations',
   'Using inverse operations and the properties of equality to find the value of an unknown.'),
  ('cpt_inverse_ops', 'subj_math', 'inverse-operations', 'Inverse operations',
   'Pairs of operations that undo each other, such as addition and subtraction.');

INSERT INTO lesson_concepts (lesson_id, concept_id) VALUES
  ('les_two_step_eq', 'cpt_lin_eq'),
  ('les_two_step_eq', 'cpt_inverse_ops');

INSERT INTO concept_relations (concept_id, related_concept_id) VALUES
  ('cpt_lin_eq', 'cpt_inverse_ops');

INSERT INTO formulas (id, subject_id, slug, name, latex, description, variables, status) VALUES
  ('frm_slope', 'subj_math', 'slope', 'Slope of a line',
   'm = \frac{y_2 - y_1}{x_2 - x_1}',
   'The rate of change between two points on a non-vertical line. Requires x₂ ≠ x₁.',
   '[{"symbol": "m", "meaning": "slope"}, {"symbol": "(x_1, y_1),\\ (x_2, y_2)", "meaning": "two points on the line"}]',
   'published'),
  ('frm_quadratic', 'subj_math', 'quadratic-formula', 'Quadratic formula',
   'x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}',
   'The solutions of ax² + bx + c = 0 when a ≠ 0. The discriminant b² − 4ac determines how many real solutions there are.',
   '[{"symbol": "a, b, c", "meaning": "coefficients, with a ≠ 0"}, {"symbol": "x", "meaning": "solution(s)"}]',
   'published'),
  ('frm_pythagorean', 'subj_math', 'pythagorean-theorem', 'Pythagorean theorem',
   'a^2 + b^2 = c^2',
   'In a right triangle, the square of the hypotenuse equals the sum of the squares of the legs.',
   '[{"symbol": "a, b", "meaning": "lengths of the legs"}, {"symbol": "c", "meaning": "length of the hypotenuse"}]',
   'published'),
  ('frm_kinematics_v', 'subj_phys', 'velocity-constant-acceleration', 'Velocity under constant acceleration',
   'v = v_0 + a t',
   'Velocity after time t for motion in one dimension with constant acceleration.',
   '[{"symbol": "v", "meaning": "final velocity", "unit": "m/s"}, {"symbol": "v_0", "meaning": "initial velocity", "unit": "m/s"}, {"symbol": "a", "meaning": "acceleration", "unit": "m/s²"}, {"symbol": "t", "meaning": "elapsed time", "unit": "s"}]',
   'published'),
  ('frm_newton2', 'subj_phys', 'newtons-second-law', 'Newton''s second law',
   '\vec{F}_{\text{net}} = m\vec{a}',
   'The net force on an object equals its mass times its acceleration. Valid in an inertial reference frame for constant mass.',
   '[{"symbol": "\\vec{F}_{\\text{net}}", "meaning": "net force", "unit": "N"}, {"symbol": "m", "meaning": "mass", "unit": "kg"}, {"symbol": "\\vec{a}", "meaning": "acceleration", "unit": "m/s²"}]',
   'published'),
  ('frm_ideal_gas', 'subj_chem', 'ideal-gas-law', 'Ideal gas law',
   'PV = nRT',
   'Relates pressure, volume, amount and absolute temperature of an ideal gas. Real gases deviate at high pressure and low temperature.',
   '[{"symbol": "P", "meaning": "pressure", "unit": "Pa"}, {"symbol": "V", "meaning": "volume", "unit": "m³"}, {"symbol": "n", "meaning": "amount of gas", "unit": "mol"}, {"symbol": "R", "meaning": "gas constant, 8.314", "unit": "J/(mol·K)"}, {"symbol": "T", "meaning": "absolute temperature", "unit": "K"}]',
   'published');
