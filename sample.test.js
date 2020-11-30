import React from "react";
import { multiple, add, sample } from "./sample";
import { render, screen } from "@testing-library/react";

describe("Jest動作チェック", () => {
  test("サンプルテスト", async () => {
    expect(3 + 7).toBe(10);
  });
});
describe("Jest動作チェック", () => {
  test("サンプルテスト", async () => {
    expect(5 + 5).toBe(10);
  });
});
describe("import check", () => {
  test("サンプルテスト", async () => {
    expect(multiple(2, 2)).toBe(4);
  });
  test("サンプルテスト", async () => {
    expect(add(3, 2)).toBe(5);
  });
  test("サンプルテスト", async () => {
    render(<sample />);
    // expect(screen.getByText("Learn React")).toBeInTheDocument();
  });
});
