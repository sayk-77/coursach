import React from "react";
import { render, screen } from "@testing-library/react";
import Courses from "../src/pages/learning/Courses/Courses";
import { MemoryRouter } from "react-router";

describe("Courses", () => {
  const mockCourses = [
    {
      id: 1,
      cours_lvl: "Уровень 1",
      language_url: "en.jpg",
      cours_duration: "2 месяца",
      course_price: 1000,
    },
    {
      id: 2,
      cours_lvl: "Уровень 2",
      language_url: "fr.jpg",
      cours_duration: "3 месяца",
      course_price: 1500,
    },
  ];

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCourses),
    });
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it("renders course cards with correct data", async () => {

    render(
        <MemoryRouter>
            <Courses />
        </MemoryRouter>
    );
    
    // Wait for the course cards to be rendered
    const courseCards = await screen.findAllByTestId("coursCard");
    
    expect(courseCards).toHaveLength(mockCourses.length);
    
    for (let i = 0; i < mockCourses.length; i++) {
      const course = mockCourses[i];
      
      expect(screen.getByText(course.cours_lvl)).toBeInTheDocument();
      expect(screen.getByAltText("lang")).toBeInTheDocument();
      expect(screen.getByText(course.cours_duration)).toBeInTheDocument();
      expect(screen.getByText(`${course.course_price} руб.`)).toBeInTheDocument();
      expect(screen.getByText("Купить")).toBeInTheDocument();
    }
  });
});
