// Maps activity ids (stored in lesson content) to simulation components.
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { ACTIVITY_DEFS } from "../../../shared/activities";
import { Skeleton } from "../ui";
import type { Params, SimProps } from "./shell";

const mathSims = () => import("./math-graphs");
const statSims = () => import("./stats");
const physSims = () => import("./physics");
const chemSims = () => import("./chemistry");
const foundationSims = () => import("./foundations");
const algebraSims = () => import("./algebra");
const geometrySims = () => import("./geometry");
const algebra2Sims = () => import("./algebra2");
const precalcSims = () => import("./precalc");
const calcSims = () => import("./calculus");
const physics2Sims = () => import("./physics2");
const physics3Sims = () => import("./physics3");
const physics4Sims = () => import("./physics4");
const physics5Sims = () => import("./physics5");
const physics6Sims = () => import("./physics6");
const chemistry2Sims = () => import("./chemistry2");
const chemistry3Sims = () => import("./chemistry3");
const chemistry4Sims = () => import("./chemistry4");
const chemistry5Sims = () => import("./chemistry5");
const physics7Sims = () => import("./physics7");
const calculus2Sims = () => import("./calculus2");
const chemistry6Sims = () => import("./chemistry6");
const physics8Sims = () => import("./physics8");
const geometry2Sims = () => import("./geometry2");

const pick = <M,>(load: () => Promise<M>, key: keyof M) => lazy(async () => ({ default: (await load())[key] as ComponentType<SimProps> }));

export const SIMS: Record<string, LazyExoticComponent<ComponentType<SimProps>>> = {
  "vertex-explorer": pick(mathSims, "VertexExplorer"),
  "linear-graph": pick(mathSims, "LinearGraph"),
  "balance-equation": pick(mathSims, "BalanceEquation"),
  "unit-circle": pick(mathSims, "UnitCircle"),
  "tangent-line": pick(mathSims, "TangentLine"),
  "riemann-sum": pick(mathSims, "RiemannSum"),
  "normal-distribution": pick(statSims, "NormalDistribution"),
  "dice-simulation": pick(statSims, "DiceSimulation"),
  projectile: pick(physSims, "Projectile"),
  "forces-incline": pick(physSims, "ForcesIncline"),
  "spring-oscillator": pick(physSims, "SpringOscillator"),
  "circuit-builder": pick(physSims, "CircuitBuilder"),
  "ideal-gas": pick(chemSims, "IdealGas"),
  "periodic-trends": pick(chemSims, "PeriodicTrends"),
  stoichiometry: pick(chemSims, "Stoichiometry"),
  "number-line": pick(foundationSims, "NumberLine"),
  "fraction-bars": pick(foundationSims, "FractionBars"),
  "ratio-line": pick(foundationSims, "RatioLine"),
  "data-explorer": pick(foundationSims, "DataExplorer"),
  "area-volume": pick(foundationSims, "AreaVolume"),
  "inequality-line": pick(foundationSims, "InequalityLine"),
  "coordinate-plane": pick(foundationSims, "CoordinatePlotter"),
  "systems-graph": pick(algebraSims, "SystemsGraph"),
  "growth-models": pick(algebraSims, "GrowthModels"),
  "area-model": pick(algebraSims, "AreaModel"),
  transformations: pick(geometrySims, "Transformations"),
  "triangle-explorer": pick(geometrySims, "TriangleExplorer"),
  "right-triangle-trig": pick(geometrySims, "RightTriangleTrig"),
  "circle-angles": pick(geometrySims, "CircleAngles"),
  "polynomial-zeros": pick(algebra2Sims, "PolynomialZeros"),
  "rational-graph": pick(algebra2Sims, "RationalGraph"),
  "exp-log": pick(algebra2Sims, "ExpLog"),
  sinusoid: pick(algebra2Sims, "Sinusoid"),
  vectors: pick(precalcSims, "VectorSim"),
  conics: pick(precalcSims, "ConicExplorer"),
  "polar-graph": pick(precalcSims, "PolarGraph"),
  "derivative-graph": pick(calcSims, "DerivativeGraph"),
  accumulation: pick(calcSims, "AccumulationSim"),
  "slope-field": pick(calcSims, "SlopeField"),
  taylor: pick(calcSims, "TaylorSim"),
  "optimization-box": pick(calcSims, "OptimizationBox"),
  "volume-slicing": pick(calcSims, "VolumeSim"),
  series: pick(calcSims, "SeriesSim"),
  "motion-graphs": pick(calcSims, "MotionGraphs"),
  waves: pick(physics2Sims, "WaveSim"),
  "ray-optics": pick(physics2Sims, "RayOptics"),
  "electric-field": pick(physics2Sims, "ElectricField"),
  "torque-balance": pick(physics3Sims, "TorqueBalance"),
  buoyancy: pick(physics3Sims, "Buoyancy"),
  "half-life": pick(physics3Sims, "HalfLife"),
  pendulum: pick(physics3Sims, "Pendulum"),
  "rolling-race": pick(physics3Sims, "RollingRace"),
  "electric-potential": pick(physics4Sims, "ElectricPotential"),
  "rc-circuit": pick(physics4Sims, "RCCircuit"),
  "double-slit": pick(physics4Sims, "DoubleSlit"),
  "drag-fall": pick(physics5Sims, "DragFall"),
  "work-integral": pick(physics5Sims, "WorkIntegral"),
  "gauss-field": pick(physics6Sims, "GaussField"),
  "inductor-circuit": pick(physics6Sims, "InductorCircuit"),
  vsepr: pick(chemistry2Sims, "Vsepr"),
  titration: pick(chemistry2Sims, "Titration"),
  equilibrium: pick(chemistry2Sims, "Equilibrium"),
  kinetics: pick(chemistry2Sims, "Kinetics"),
  "galvanic-cell": pick(chemistry3Sims, "GalvanicCell"),
  buffer: pick(chemistry3Sims, "Buffer"),
  pes: pick(chemistry3Sims, "PhotoelectronSpectrum"),
  "beer-lambert": pick(chemistry3Sims, "BeerLambert"),
  microstates: pick(chemistry4Sims, "Microstates"),
  "free-energy": pick(chemistry4Sims, "FreeEnergy"),
  collisions: pick(physics7Sims, "Collisions"),
  "energy-track": pick(physics7Sims, "EnergyTrack"),
  "pv-diagram": pick(physics7Sims, "PVDiagram"),
  "magnetic-orbit": pick(physics7Sims, "MagneticOrbit"),
  "loop-induction": pick(physics7Sims, "LoopInduction"),
  limits: pick(calculus2Sims, "LimitsExplorer"),
  "hydrogen-spectrum": pick(chemistry5Sims, "BohrTransitions"),
  "orbital-filling": pick(chemistry5Sims, "OrbitalFiller"),
  "lewis-structures": pick(chemistry6Sims, "LewisStructures"),
  "rlc-circuit": pick(physics8Sims, "RLCCircuit"),
  constructions: pick(geometry2Sims, "Constructions"),
  "u-substitution": pick(calculus2Sims, "USubstitution"),
};

export function Sim({ id, params }: { id: string; params?: Params }) {
  const C = SIMS[id];
  if (!C) return <p className="card p-4 text-sm text-muted">This interactive activity isn't available.</p>;
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <C params={params} />
    </Suspense>
  );
}

export const activityDef = (id: string) => ACTIVITY_DEFS.find((a) => a.id === id);
