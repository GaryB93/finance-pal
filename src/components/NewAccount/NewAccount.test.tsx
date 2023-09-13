import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewAccount from './NewAccount';

describe('NewAccount form', () => {

  beforeEach(() => {
    render(<MemoryRouter><NewAccount/></MemoryRouter>);
  });

  test('input field with username label renders empty', () => {
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveValue('');
  });

  test('user input changes value of username input field', () => {
    const usernameInput = screen.getByRole('textbox', {name: 'Username'});
    const newInput = 'myUsername';
    fireEvent.change(usernameInput, {target: {value: newInput}});
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

  test('input field with confirm password label renders empty', () => {
    const confirmPassword = screen.getByLabelText('Confirm Password');
    expect(confirmPassword).toBeInTheDocument();
    expect(confirmPassword).toHaveValue('');
  });

  test('user input changes value of confirm password input field', () => {
    const confirmPassword = screen.getByLabelText('Confirm Password');
    const newInput = 'confirmPassword';
    fireEvent.change(confirmPassword, {target: {value: newInput}});
    expect(confirmPassword).toHaveValue(newInput);
  });

  test('select field renders with security questions label renders', () => {
    const question = screen.getByLabelText('Security Question');
    expect(question).toBeInTheDocument();
    expect(question).toHaveValue('-- select an option --');
  });

  test.skip('user input changes value of security question select', () => {

  });

  test('input field with answer label renders empty', () => {
    const answer = screen.getByLabelText('Answer');
    expect(answer).toBeInTheDocument();
    expect(answer).toHaveValue('');
  });

  test('user input changes value of answer input field', () => {
    const answer = screen.getByRole('textbox', {name: 'Answer'});
    const newInput = 'myAnswer';
    fireEvent.change(answer, {target: {value: newInput}});
    expect(answer).toHaveValue(newInput);
  });

  test('renders a signup button', () => {
    const signup = screen.getByRole('button', {name: 'Sign up'});
    expect(signup).toBeVisible();
  })

  test('renders a link to go back to login page', () => {
    const loginLink = screen.getByRole('link', {name: 'Login'});
    expect(loginLink).toBeVisible();
  });
});