import { describe, expect, it } from "vitest";
import { splitStep } from "../shared/step-segments";

describe("splitStep", () => {
  it("leaves pure math untouched", () => {
    expect(splitStep(String.raw`x = \frac{1}{2}`)).toEqual([{ kind: "math", value: String.raw`x = \frac{1}{2}` }]);
  });
  it("turns top-level \\text runs into wrapping prose", () => {
    expect(splitStep(String.raw`\text{totals: sport 80, no sport 120}`)).toEqual([{ kind: "text", value: "totals: sport 80, no sport 120" }]);
  });
  it("interleaves text and math", () => {
    expect(splitStep(String.raw`\text{SD of } \hat{p} \text{ under } H_0 = 0.05`)).toEqual([
      { kind: "text", value: "SD of " },
      { kind: "math", value: String.raw`\hat{p}` },
      { kind: "text", value: " under " },
      { kind: "math", value: "H_0 = 0.05" },
    ]);
  });
  it("keeps \\text nested inside braces as math", () => {
    const l = String.raw`\frac{\text{rise}}{\text{run}} = 2`;
    expect(splitStep(l)).toEqual([{ kind: "math", value: l }]);
  });
  it("keeps the space between math and a following text run", () => {
    expect(splitStep(String.raw`df = 1,\ \text{P-value} \approx 0.004`)).toEqual([
      { kind: "math", value: "df = 1," },
      { kind: "text", value: " P-value " },
      { kind: "math", value: String.raw`\approx 0.004` },
    ]);
  });
  it("never splits inside \\left…\\right or environments", () => {
    const l = String.raw`\left[0, \text{half}\right] \text{ is closed}`;
    expect(splitStep(l)).toEqual([
      { kind: "math", value: String.raw`\left[0, \text{half}\right]` },
      { kind: "text", value: " is closed" },
    ]);
  });
  it("unescapes percent signs and dashes, and drops spacing between runs", () => {
    expect(splitStep(String.raw`\text{about 60\% here},\ \text{men--yes}`)).toEqual([{ kind: "text", value: "about 60% here, men–yes" }]);
  });
});
