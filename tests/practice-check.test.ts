import { describe, expect, it } from "vitest";
import { checkAnswer, parseNumber } from "../worker/lib/practice";

describe("parseNumber", () => {
  it.each([
    ["3", 3], ["-2.5", -2.5], ["1/4", 0.25], ["−3/2", -1.5], ["6.02e23", 6.02e23], ["6.02×10^23", 6.02e23], ["1,250", 1250], [".5", 0.5],
  ])("parses %s", (input, expected) => expect(parseNumber(input)).toBeCloseTo(expected as number));
  it.each(["", "abc", "1/0", "2x", "--3"])("rejects %s", (input) => expect(parseNumber(input)).toBeNull());
});

describe("checkAnswer", () => {
  it("multiple choice", () => {
    const key = { choices: ["a", "b", "c"], answer: 2 };
    expect(checkAnswer("multiple_choice", key, "2").correct).toBe(true);
    expect(checkAnswer("multiple_choice", key, "0").correct).toBe(false);
    expect(checkAnswer("multiple_choice", key, "7").valid).toBe(false);
  });
  it("numeric with absolute and relative tolerance, and helpful feedback", () => {
    expect(checkAnswer("numeric", { answer: 11.49, tolerance: 0.01 }, "11.5").correct).toBe(true);
    expect(checkAnswer("numeric", { answer: 11.49, tolerance: 0.01 }, "11.6").correct).toBe(false);
    expect(checkAnswer("numeric", { answer: 1000, relative: true, tolerance: 0.01 }, "1009").correct).toBe(true);
    expect(checkAnswer("numeric", { answer: 4 }, "-4").feedback).toMatch(/sign/);
    expect(checkAnswer("numeric", { answer: 2.5 }, "250").feedback).toMatch(/power of ten/);
    expect(checkAnswer("numeric", { answer: 0.5 }, "1/2").correct).toBe(true);
  });
  it("short text ignores case and spacing", () => {
    expect(checkAnswer("short_text", { accept: ["y = 2x - 5"] }, "Y=2X−5").correct).toBe(true);
    expect(checkAnswer("short_text", { accept: ["(4,-5)"] }, "( 4 , -5 )").correct).toBe(true);
    expect(checkAnswer("short_text", { accept: ["(4,-5)"] }, "(4,5)").correct).toBe(false);
  });
});
