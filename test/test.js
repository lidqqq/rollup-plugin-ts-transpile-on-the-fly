import assert from "assert";
import ts from "typescript";
import { tsPlugin as tst } from "../dist/index.es.js";

it("type", () => {
  assert.deepStrictEqual(typeof tst, "function");
});

it("instance", () => {
  const result = tst({ configPath: "./test", ts });
  assert.deepStrictEqual(typeof result, "object");
  assert.deepStrictEqual(typeof result.load, "function");
});
