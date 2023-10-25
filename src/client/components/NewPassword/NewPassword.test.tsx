import { screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../../__tests__/test-utils';
import NewPassword from './NewPassword';

/**
 * TODO: Mock server requests with MSW with a valid password that
 * redirects user to login page
 */

describe('New Password submit form', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  test('should render an empty input field with a New Password label', () => {
    renderWithProviders(<NewPassword/>);
    const newPassword = screen.getByLabelText('New Password');
    expect(newPassword).toHaveValue('');
  });

  test('user input should change the new password field', () => {
    renderWithProviders(<NewPassword/>);
    const newPassword = screen.getByLabelText('New Password');
    const newInput = 'myNewPassword';
    fireEvent.change(newPassword, {target: {value: newInput}});
    expect(newPassword).toHaveValue(newInput);
  });

  test('should render an empty input field with a Confirm Password label', () => {
    renderWithProviders(<NewPassword/>);
    const confirmPassword = screen.getByLabelText('Confirm Password');
    expect(confirmPassword).toHaveValue('');
  });

  test('user input should change the confirm new password field', () => {
    renderWithProviders(<NewPassword/>);
    const confirmPassword = screen.getByLabelText('Confirm Password');
    const newInput = 'confirmedPassword';
    fireEvent.change(confirmPassword, {target: {value: newInput}});
    expect(confirmPassword).toHaveValue(newInput);
  });

  test('should render a button to submit a new password', () => {
    renderWithProviders(<NewPassword/>);
    const button = screen.getByRole('button', {name: 'Change Password'});
    expect(button).toBeVisible();
  });

  test('user submitting passwords that do not match causes an alert message', async () => {
    renderWithProviders(<NewPassword/>);
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

  test('user submitting a password that does not pass all tests causes an alert message', async () => {
    renderWithProviders(<NewPassword/>);
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