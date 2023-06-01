import Authorization from './pages/authorization/Authorization';
import { render, screen, fireEvent, findByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Authorization', () => {
  test('renders login form', () => {
    render(<Authorization />);

    const usernameInput = screen.getAllByPlaceholderText('Логин')[0];
    const passwordInput = screen.getAllByPlaceholderText('Пароль')[0];
    const submitButton = screen.getAllByText('Войти')[0];

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('renders registration form after click on Sign up button', () => {
    render(<Authorization />);

    const signUpButton = screen.getAllByText('Зарегистрироваться')[0];

    fireEvent.click(signUpButton);

    const loginInput = screen.getAllByPlaceholderText('Логин')[1];
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getAllByPlaceholderText('Пароль')[1];
    const submitButton = screen.getAllByText('Зарегистрироваться')[0];

    expect(loginInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

