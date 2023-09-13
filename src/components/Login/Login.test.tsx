import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login form', () => {

  beforeEach(() => {
    render(<MemoryRouter><Login/></MemoryRouter>);
  });

  test('input field with username label renders empty', () => {
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveValue('');
  });

  test('user input changes value of username input field', () => {
    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const newInput = 'myUsername';
    fireEvent.change(usernameInput, {target: {value : newInput}});
    expect(usernameInput).toHaveValue(newInput);
  });

  test('input field with password label renders empty', () => {
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');
  });

  test('user input changes value of password input field', () => {
    const passwordInput = screen.getByLabelText('Password');
    const newInput = 'myPassword';
    fireEvent.change(passwordInput, {target: {value : newInput}});
    expect(passwordInput).toHaveValue(newInput);
  });

  test('renders a link for users who forget their password', () => {
    const forgotPswd = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(forgotPswd).toBeVisible();
  });

  test('renders a link for users who need to create an account', () => {
    const newAcct = screen.getByRole('link', { name: 'Sign up' });
    expect(newAcct).toBeVisible();
  });

  test('renders a login button', () => {
    const loginBtn = screen.getByRole('button', {name: 'Login'});
    expect(loginBtn).toBeVisible();
  });
});