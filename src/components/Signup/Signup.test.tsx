import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup';

describe('Signup form', () => {
  const options = [
    '-- select an option --',
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What was the make and model of your first car?",
  ];

  test('input field with username label renders empty', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toHaveValue('');
  });

  test('user input changes value of username input field', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const usernameInput = screen.getByRole('textbox', {name: 'Username'});
    const newInput = 'myUsername';
    fireEvent.change(usernameInput, {target: {value: newInput}});
    expect(usernameInput).toHaveValue(newInput);
  });

  test('input field with password label renders empty', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveValue('');
  });

  test('user clicking on password input field should display tooltip', async () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const user = userEvent.setup();
    const passwordInput = screen.getByLabelText('Password');
    await user.click(passwordInput);
    const tooltip = screen.getByRole('alert');
    expect(tooltip).toBeVisible();
  });

  test('user input changes value of password input field', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const passwordInput = screen.getByLabelText('Password');
    const newInput = 'myPassword';
    fireEvent.change(passwordInput, {target: {value : newInput}});
    expect(passwordInput).toHaveValue(newInput);
  });

  test('input field with confirm password label renders empty', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const confirmPassword = screen.getByLabelText('Confirm Password');
    expect(confirmPassword).toHaveValue('');
  });

  test('user focusing on confirm password input field should display tooltip', async () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const user = userEvent.setup();
    const confirmPassword = screen.getByLabelText('Confirm Password');
    await user.click(confirmPassword);
    const tooltip = screen.getByRole('alert');
    expect(tooltip).toBeVisible();
  });

  test('user input changes value of confirm password input field', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const confirmPassword = screen.getByLabelText('Confirm Password');
    const newInput = 'confirmPassword';
    fireEvent.change(confirmPassword, {target: {value: newInput}});
    expect(confirmPassword).toHaveValue(newInput);
  });

  test('select field with security questions label renders with correct default option', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const question = screen.getByLabelText('Security Question');
    expect(question).toHaveValue(options[0]);
  });

  test('select field renders with correct number of options', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const questions = screen.getAllByRole('option');
    expect(questions.length).toBe(options.length);
  });

  test('user input changes value of security question select field', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const question = screen.getByRole('combobox', {name: 'Security Question'});
    fireEvent.change(question, {target: {value: options[2]}});
    const option = (screen.getByRole('option', {name: options[2]})) as HTMLOptionElement;
    expect(option.selected).toBeTruthy();
    const notSelectedOption = (screen.getByRole('option', {name: options[1]})) as HTMLOptionElement;
    expect(notSelectedOption.selected).toBeFalsy();
  });

  test('input field with answer label renders empty', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const answer = screen.getByLabelText('Answer');
    expect(answer).toHaveValue('');
  });

  test('user input changes value of answer input field', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const answer = screen.getByRole('textbox', {name: 'Answer'});
    const newInput = 'myAnswer';
    fireEvent.change(answer, {target: {value: newInput}});
    expect(answer).toHaveValue(newInput);
  });

  test('user not picking a security question but filling all other' +
    'fields correctly and clicking the "Sign up" button should display' +
    'an error message', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const username = screen.getByRole('textbox', {name: 'Username'});
    fireEvent.change(username, {target: {value: 'user'}});
    const password = screen.getByLabelText('Password');
    fireEvent.change(password, {target: {value: 'Asdf1234'}});
    const confirmPassword = screen.getByLabelText('Confirm Password');
    fireEvent.change(confirmPassword, {target: {value: 'Asdf1234'}});
    const answer = screen.getByRole('textbox', {name: 'Answer'});
    fireEvent.change(answer, {target: {value: 'answer'}});
    const signup = screen.getByRole('button', {name: 'Sign up'});
    fireEvent.click(signup);
    const alert = screen.getByRole('alert');
    expect(alert).toBeVisible();
  });

  test('renders a signup button', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const signup = screen.getByRole('button', {name: 'Sign up'});
    expect(signup).toBeVisible();
  })

  test('renders a link to go back to login page', () => {
    render(<MemoryRouter><Signup/></MemoryRouter>);
    const loginLink = screen.getByRole('link', {name: 'Login'});
    expect(loginLink).toBeVisible();
  });
});