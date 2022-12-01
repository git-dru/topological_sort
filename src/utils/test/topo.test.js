import { topologicalSort } from "..";
import { testCases } from ".";

// test regular cases
testCases.slice(2, testCases.length).forEach(({ input, out, name }) => {
  test(name, () => {
    const inputArr = input.split("\r\n").filter((n) => n);
    const outArr = out.split("\r\n").filter((n) => n);
    expect(topologicalSort(inputArr)).toEqual(outArr);
  });
});

// test failing cases
testCases.slice(0, 2).forEach(({ input, out, name }) => {
  test(name, () => {
    const inputArr = input.split("\r\n").filter((n) => n);
    const outArr = out.split("\r\n").filter((n) => n);
    expect(topologicalSort(inputArr)).toEqual(outArr);
  });
});
