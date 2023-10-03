import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/test-utils';
import Login from './Login';

/**
 * TODO: Use MSW to mock server requests
 */

describe('Login form', () => {

  test('input field with username label renders empty', () => {
    renderWithProviders(<Login/>);
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toHaveValue('');
  });

  test('user input changes value of username input field', () => {
    renderWithProviders(<Login/>);
    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const newInput = 'myUsername';
    fireEvent.change(usernameInput, {target: {value : newInput}});
    expect(usernameInput).toHaveValue(newInput);
  });

  test('input field with password label renders empty', () => {
    renderWithProviders(<Login/>);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveValue('');
  });

  test('user input changes value of password input field', () => {
    renderWithProviders(<Login/>);
    const passwordInput = screen.getByLabelText('Password');
    const newInput = 'myPassword';
    fireEvent.change(passwordInput, {target: {value : newInput}});
    expect(passwordInput).toHaveValue(newInput);
  });

  test('renders a link for users who forget their password', () => {
    renderWithProviders(<Login/>);
    const forgotPswd = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(forgotPswd).toBeVisible();
  });

  test('renders a link for users who need to create an account', () => {
    renderWithProviders(<Login/>);
    const newAcct = screen.getByRole('link', { name: 'Sign up' });
    expect(newAcct).toBeVisible();
  });

  test('renders a login button', () => {
    renderWithProviders(<Login/>);
    const loginBtn = screen.getByRole('button', {name: 'Login'});
    expect(loginBtn).toBeVisible();
  });

  test('renders without an alert by default', () => {
    renderWithProviders(<Login/>);
    const alert = screen.queryByRole('alert');
    expect(alert).toBe(null);
  });
});