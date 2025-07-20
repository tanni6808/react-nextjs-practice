import { render, screen } from "@testing-library/react";
import WelcomeMsg from "@/app/components/member/welcomeMsg";

describe("Welcome Message", () => {
  it("should render user name", () => {
    render(<WelcomeMsg userName={"Tanni"} />);
    const name = screen.getByText(/tanni/i);
    expect(name).toBeInTheDocument();
  });
});
