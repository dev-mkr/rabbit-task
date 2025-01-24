import { describe, expect, test } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { ToggleThemeButton } from "@/components/shared/ToggleThemeButton/ToggleThemeButton";

describe("ToggleThemeButton", () => {
  test("it adds class .dark when the button theme clicked and theme is light", () => {
    render(<ToggleThemeButton />);

    const rootElement = document.documentElement;
    const button = screen.getByTestId("theme-button");

    if (!rootElement.classList.contains("dark")) {
      fireEvent.click(button);
    }

    expect(rootElement.classList.contains("dark"));
  });

  test("renders correctly sun-icon when theme is light", () => {
    render(<ToggleThemeButton />);

    const rootElement = document.documentElement;
    const button = screen.getByTestId("theme-button");

    if (rootElement.classList.contains("dark")) {
      fireEvent.click(button);
    }

    const sunIcon = screen.getByTestId("sun-icon");
    expect(sunIcon).toBeInTheDocument();
  });

  test("renders correctly moon-icon when theme is dark", () => {
    render(<ToggleThemeButton />);

    const rootElement = document.documentElement;
    const button = screen.getByTestId("theme-button");

    if (!rootElement.classList.contains("dark")) {
      fireEvent.click(button);
    }

    const moonIcon = screen.getByTestId("moon-icon");
    expect(moonIcon).toBeInTheDocument();
  });
});
