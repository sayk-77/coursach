import React from "react";
import { render, screen } from "@testing-library/react";
import jwtDecode from "jwt-decode";
import ProfileData from '../src/pages/Profile/Data/Data';
import { MemoryRouter } from "react-router";

jest.mock("jwt-decode", () => jest.fn());

describe("ProfileData", () => {
  const token = {
    personal_data: {
      first_name: "Дмитрий",
      last_name: "Смирнов",
      gender: "Мужской",
      phone: "729492014",
      birth_date: "01.01.2001",
      user_img: "user.jpg"
    }
  };
  beforeEach(() => { jwtDecode.mockReturnValue(token); });
  afterEach(() => { jest.restoreAllMocks(); });

  it("correct rendering of the main information", () => {
    render(<MemoryRouter><ProfileData /></MemoryRouter>);
    expect(screen.getByText("Основная информация")).toBeInTheDocument();
    expect(screen.getByText("Имя")).toBeInTheDocument();
    expect(screen.getByText("Фамилия")).toBeInTheDocument();
    expect(screen.getByText("Пол")).toBeInTheDocument();
    expect(screen.getByText("Телефон")).toBeInTheDocument();
    expect(screen.getByText("Дата рождения")).toBeInTheDocument();
    expect(screen.getByAltText("settings")).toBeInTheDocument();
    expect(screen.getByAltText("User")).toBeInTheDocument();
  });

  it("renders data from JWT on the page", () => {
    render(<MemoryRouter><ProfileData /></MemoryRouter>);
    const { first_name, last_name, gender, phone, birth_date, user_img } = token.personal_data;
    expect(screen.getByText(first_name)).toBeInTheDocument();
    expect(screen.getByText(last_name)).toBeInTheDocument();
    expect(screen.getByText(gender)).toBeInTheDocument();
    expect(screen.getByText(phone)).toBeInTheDocument();
    expect(screen.getByText(new Date(birth_date).toLocaleDateString())).toBeInTheDocument();
    const userImage = screen.getByAltText("User");
    expect(userImage).toBeInTheDocument();
    expect(userImage.src).toContain(user_img);
  });
});