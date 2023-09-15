import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Signup from './Signup';

describe('Signup form', () => {
  const defaultOption = '-- select an option --';
  const options = [
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What was the make and model of your first car?",
  ];

  beforeEach(() => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
  });

  test('input field with username label renders empty', () => {
    const usernameInput = screen.getByLabelText('Username');
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
    expect(passwordInput).toHaveValue('');
  });

  test('user focusing on password input field should display tooltip', () => {
    const passwordInput = screen.getByLabelText('Password');
    act(() => {
      passwordInput.focus();
    });
    const tooltip = screen.getByTestId('tooltip1');
    expect(tooltip).toBeVisible();
  });

  test('user input changes value of password input field', () => {
    const passwordInput = screen.getByLabelText('Password');
    const newInput = 'myPassword';
    fireEvent.change(passwordInput, {target: {value : newInput}});
    expect(passwordInput).toHaveValue(newInput);
  });

  test('input field with confirm password label renders empty', () => {
    const confirmPassword = screen.getByLabelText('Confirm Password');
    expect(confirmPassword).toHaveValue('');
  });

  test('user focusing on confirm password input field should display tooltip', () => {
    const confirmPassword = screen.getByLabelText('Confirm Password');
    act(() => {
      confirmPassword.focus();
    });
    const tooltip = screen.getByTestId('tooltip2');
    expect(tooltip).toBeVisible();
  });

  test('user input changes value of confirm password input field', () => {
    const confirmPassword = screen.getByLabelText('Confirm Password');
    const newInput = 'confirmPassword';
    fireEvent.change(confirmPassword, {target: {value: newInput}});
    expect(confirmPassword).toHaveValue(newInput);
  });

  test('select field renders with security questions label renders with default option', () => {
    const question = screen.getByLabelText('Security Question');
    expect(question).toHaveValue(defaultOption);
  });

  test('select field renders with correct number of options', () => {
    const questions = screen.getAllByRole('option');
    expect(questions.length).toBe(options.length + 1);
  })

  test('user input changes value of security question select field', () => {
    const question = screen.getByRole('combobox', {name: 'Security Question'});
    fireEvent.change(question, {target: {value: options[2]}});
    const option = (screen.getByRole('option', {name: options[2]})) as HTMLOptionElement;
    expect(option.selected).toBeTruthy();
    const notSelectedOption = (screen.getByRole('option', {name: options[1]})) as HTMLOptionElement;
    expect(notSelectedOption.selected).toBeFalsy();
  });

  test('input field with answer label renders empty', () => {
    const answer = screen.getByLabelText('Answer');
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