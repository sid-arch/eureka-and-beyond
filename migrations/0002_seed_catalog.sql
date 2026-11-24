-- Eureka and Beyond — Migration 0002: catalog seed
--
-- Seeds the 3 subjects and 24 course pathways as catalog entries with status
-- 'planned'. No units, lessons or objectives are invented here: a course only
-- shows content once that content is authored and published.
--
-- AP courses are linked to the College Board framework record with
-- alignment_status = 'unverified'. The UI states that alignment has not been
-- verified until a reviewer checks the course against the official CED.

INSERT INTO subjects (id, slug, name, description, position) VALUES
  ('subj_math', 'mathematics', 'Mathematics',
   'From algebra readiness through AP Calculus BC: functions, geometry, statistics and calculus.', 1),
  ('subj_phys', 'physics', 'Physics',
   'Motion, forces, energy, waves, fluids, electricity and magnetism, from first principles.', 2),
  ('subj_chem', 'chemistry', 'Chemistry',
   'Matter, bonding, reactions, stoichiometry, gases, equilibrium and thermodynamics.', 3);

INSERT INTO standards_frameworks (id, slug, name, kind, source_url, notes) VALUES
  ('fw_ap_ced', 'college-board-ap-ced', 'College Board AP Course and Exam Description', 'ap_ced',
   'https://apcentral.collegeboard.org/courses',
   'Each AP course must be reviewed against its current official CED before alignment is marked verified.');

INSERT INTO courses (id, subject_id, slug, title, level, summary, status, alignment_status, framework_id, position) VALUES
  -- Mathematics (15)
  ('crs_alg_ready',  'subj_math', 'algebra-readiness',     'Algebra Readiness',        'foundational',
   'Number sense, ratios, integers, expressions and one-variable equations to prepare for Algebra I.', 'planned', 'not_applicable', NULL, 1),
  ('crs_alg1_ol',    'subj_math', 'algebra-1',             'Algebra I',                'on_level',
   'Linear equations and inequalities, functions, systems, exponents, polynomials and an introduction to quadratics.', 'planned', 'not_applicable', NULL, 2),
  ('crs_alg1_h',     'subj_math', 'algebra-1-honors',      'Algebra I Honors',         'honors',
   'Algebra I at greater depth and pace, with more emphasis on proof-style reasoning and modeling.', 'planned', 'not_applicable', NULL, 3),
  ('crs_geo_ol',     'subj_math', 'geometry',              'Geometry',                 'on_level',
   'Transformations, congruence, similarity, right-triangle trigonometry, circles, area and volume.', 'planned', 'not_applicable', NULL, 4),
  ('crs_geo_h',      'subj_math', 'geometry-honors',       'Geometry Honors',          'honors',
   'Geometry with formal proof, coordinate methods and extended problem solving.', 'planned', 'not_applicable', NULL, 5),
  ('crs_alg2_ol',    'subj_math', 'algebra-2',             'Algebra II',               'on_level',
   'Polynomial, rational, radical, exponential and logarithmic functions; sequences and an introduction to trigonometric functions.', 'planned', 'not_applicable', NULL, 6),
  ('crs_alg2_h',     'subj_math', 'algebra-2-honors',      'Algebra II Honors',        'honors',
   'Algebra II with complex numbers, deeper function analysis and more demanding modeling.', 'planned', 'not_applicable', NULL, 7),
  ('crs_precalc_ol', 'subj_math', 'precalculus',           'Precalculus',              'on_level',
   'Functions and their transformations, trigonometry, vectors and the groundwork for calculus.', 'planned', 'not_applicable', NULL, 8),
  ('crs_precalc_h',  'subj_math', 'precalculus-honors',    'Precalculus Honors',       'honors',
   'Precalculus with polar coordinates, parametric equations, limits and greater rigor.', 'planned', 'not_applicable', NULL, 9),
  ('crs_ap_precalc', 'subj_math', 'ap-precalculus',        'AP Precalculus',           'ap',
   'College-level precalculus organized around the College Board AP Precalculus framework.', 'planned', 'unverified', 'fw_ap_ced', 10),
  ('crs_stats_ol',   'subj_math', 'statistics',            'Statistics',               'on_level',
   'Describing data, probability, sampling and an introduction to statistical inference.', 'planned', 'not_applicable', NULL, 11),
  ('crs_stats_h',    'subj_math', 'statistics-honors',     'Statistics Honors',        'honors',
   'Statistics with deeper probability, study design and inference.', 'planned', 'not_applicable', NULL, 12),
  ('crs_ap_stats',   'subj_math', 'ap-statistics',         'AP Statistics',            'ap',
   'College-level statistics: exploring data, sampling and experimentation, probability and inference.', 'planned', 'unverified', 'fw_ap_ced', 13),
  ('crs_ap_calc_ab', 'subj_math', 'ap-calculus-ab',        'AP Calculus AB',           'ap',
   'Limits, derivatives, integrals and the Fundamental Theorem of Calculus.', 'planned', 'unverified', 'fw_ap_ced', 14),
  ('crs_ap_calc_bc', 'subj_math', 'ap-calculus-bc',        'AP Calculus BC',           'ap',
   'Everything in Calculus AB plus parametric, polar and vector functions and infinite series.', 'planned', 'unverified', 'fw_ap_ced', 15),

  -- Physics (6)
  ('crs_phys_ol',    'subj_phys', 'physics',               'Physics',                  'on_level',
   'Motion, forces, energy, momentum, waves and electricity using algebra.', 'planned', 'not_applicable', NULL, 1),
  ('crs_phys_h',     'subj_phys', 'physics-honors',        'Physics Honors',           'honors',
   'Introductory physics with more quantitative problem solving and laboratory analysis.', 'planned', 'not_applicable', NULL, 2),
  ('crs_ap_phys1',   'subj_phys', 'ap-physics-1',          'AP Physics 1',             'ap',
   'Algebra-based mechanics: kinematics, dynamics, energy, momentum, rotation, oscillations and fluids.', 'planned', 'unverified', 'fw_ap_ced', 3),
  ('crs_ap_phys2',   'subj_phys', 'ap-physics-2',          'AP Physics 2',             'ap',
   'Algebra-based thermodynamics, electricity, magnetism, optics and modern physics.', 'planned', 'unverified', 'fw_ap_ced', 4),
  ('crs_ap_phys_cm', 'subj_phys', 'ap-physics-c-mechanics','AP Physics C: Mechanics',  'ap',
   'Calculus-based mechanics for students planning to study physical sciences or engineering.', 'planned', 'unverified', 'fw_ap_ced', 5),
  ('crs_ap_phys_ce', 'subj_phys', 'ap-physics-c-electricity-and-magnetism', 'AP Physics C: Electricity and Magnetism', 'ap',
   'Calculus-based electrostatics, circuits, magnetism and electromagnetic induction.', 'planned', 'unverified', 'fw_ap_ced', 6),

  -- Chemistry (3)
  ('crs_chem_ol',    'subj_chem', 'chemistry',             'Chemistry',                'on_level',
   'Atomic structure, the periodic table, bonding, reactions, stoichiometry, gases and solutions.', 'planned', 'not_applicable', NULL, 1),
  ('crs_chem_h',     'subj_chem', 'chemistry-honors',      'Chemistry Honors',         'honors',
   'Chemistry with greater quantitative depth, including equilibrium, kinetics and thermochemistry.', 'planned', 'not_applicable', NULL, 2),
  ('crs_ap_chem',    'subj_chem', 'ap-chemistry',          'AP Chemistry',             'ap',
   'College-level chemistry: structure, properties, transformations, kinetics, thermodynamics and equilibrium.', 'planned', 'unverified', 'fw_ap_ced', 3);

-- Typical sequencing. Districts vary; these are recommendations, not gates.
INSERT INTO course_prerequisites (course_id, prerequisite_course_id, kind) VALUES
  ('crs_alg1_ol',    'crs_alg_ready',  'recommended'),
  ('crs_alg1_h',     'crs_alg_ready',  'recommended'),
  ('crs_geo_ol',     'crs_alg1_ol',    'recommended'),
  ('crs_geo_h',      'crs_alg1_h',     'recommended'),
  ('crs_alg2_ol',    'crs_alg1_ol',    'recommended'),
  ('crs_alg2_h',     'crs_alg1_h',     'recommended'),
  ('crs_precalc_ol', 'crs_alg2_ol',    'recommended'),
  ('crs_precalc_h',  'crs_alg2_h',     'recommended'),
  ('crs_ap_precalc', 'crs_alg2_ol',    'recommended'),
  ('crs_stats_ol',   'crs_alg1_ol',    'recommended'),
  ('crs_stats_h',    'crs_alg1_ol',    'recommended'),
  ('crs_ap_stats',   'crs_alg2_ol',    'recommended'),
  ('crs_ap_calc_ab', 'crs_precalc_ol', 'recommended'),
  ('crs_ap_calc_bc', 'crs_precalc_ol', 'recommended'),
  ('crs_phys_ol',    'crs_alg1_ol',    'recommended'),
  ('crs_phys_h',     'crs_alg1_ol',    'recommended'),
  ('crs_ap_phys1',   'crs_alg2_ol',    'recommended'),
  ('crs_ap_phys2',   'crs_ap_phys1',   'recommended'),
  ('crs_ap_phys_cm', 'crs_ap_calc_ab', 'recommended'),
  ('crs_ap_phys_ce', 'crs_ap_phys_cm', 'recommended'),
  ('crs_chem_ol',    'crs_alg1_ol',    'recommended'),
  ('crs_chem_h',     'crs_alg1_ol',    'recommended'),
  ('crs_ap_chem',    'crs_chem_ol',    'recommended');

INSERT INTO site_settings (key, value) VALUES
  ('announcement', '{"enabled": false, "message": "", "tone": "info"}'),
  ('features', '{"accounts": false, "community": false, "practice": false, "labs": false}');
