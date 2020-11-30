import React from "react";
import { multiple, add, Sample } from "./Sample";
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
  it("サンプルテスト", async () => {
    expect(multiple(2, 2)).toBe(4);
  });
  it("サンプルテスト", async () => {
    expect(add(3, 2)).toBe(5);
  });
  it("サンプルテスト", async () => {
    const { container } = render(<Sample />);
    expect(screen.getByTestId("text")).toMatchInlineSnapshot(`
      <p
        data-testid="text"
      >
        Learn React
      </p>
    `);
    expect(screen.getByTestId("text2")).toMatchInlineSnapshot(`
      <p
        data-testid="text2"
      >
        Learn JS
      </p>
    `);
  });
});
