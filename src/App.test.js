import { render, screen } from "@testing-library/react";

test("renders learn react link", () => {
  render(<div>data</div>);
  const dataElement = screen.getByText(/data/i);
  expect(dataElement).toBeInTheDocument();
});
