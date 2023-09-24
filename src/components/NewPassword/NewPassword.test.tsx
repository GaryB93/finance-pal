import { screen, render, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import NewPassword from './NewPassword';

describe('New Password submit form', () => {
  test('should render an empty input field with a New Password label', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const newPassword = screen.getByLabelText('New Password');
    expect(newPassword).toHaveValue('');
  });

  test('user input should change the new password field', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const newPassword = screen.getByLabelText('New Password');
    const newInput = 'myNewPassword';
    fireEvent.change(newPassword, {target: {value: newInput}});
    expect(newPassword).toHaveValue(newInput);
  });

  test('should render an empty input field with a Confirm Password label', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const confirmPassword = screen.getByLabelText('Confirm Password');
    expect(confirmPassword).toHaveValue('');
  });

  test('user input should change the confirm new password field', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const confirmPassword = screen.getByLabelText('Confirm Password');
    const newInput = 'confirmedPassword';
    fireEvent.change(confirmPassword, {target: {value: newInput}});
    expect(confirmPassword).toHaveValue(newInput);
  });

  test('should render a button to submit a new password', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const button = screen.getByRole('button', {name: 'Change Password'});
    expect(button).toBeVisible();
  });

  test('user submitting passwords that do not match causes and error', async () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const user = userEvent.setup();
    const newPassword = screen.getByLabelText('New Password');
    const confirmPassword = screen.getByLabelText('Confirm Password');
    fireEvent.change(newPassword, {target: {value: 'password'}});
    fireEvent.change(confirmPassword, {target: {value: 'Password'}});
    const button = screen.getByRole('button', {name: 'Change Password'});
    await user.click(button);
    const alert = screen.getByRole('alert');
    expect(alert).toBeVisible();
  });

  test('user submitting a password that does not pass all tests causes error', async () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const user = userEvent.setup();
    const newPassword = screen.getByLabelText('New Password');
    const confirmPassword = screen.getByLabelText('Confirm Password');
    fireEvent.change(newPassword, {target: {value: 'password'}});
    fireEvent.change(confirmPassword, {target: {value: 'password'}});
    const button = screen.getByRole('button', {name: 'Change Password'});
    await user.click(button);
    const alert = screen.getByRole('alert');
    expect(alert).toBeVisible();
  })
});