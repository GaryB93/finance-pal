import { screen, render, fireEvent } from '@testing-library/react';
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

  test('should render an empty input field with a Confirm New Password label', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const confirmPassword = screen.getByLabelText('Confirm New Password');
    expect(confirmPassword).toHaveValue('');
  });

  test('user input should change the confirm new password field', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const confirmPassword = screen.getByLabelText('Confirm New Password');
    const newInput = 'confirmedPassword';
    fireEvent.change(confirmPassword, {target: {value: newInput}});
    expect(confirmPassword).toHaveValue(newInput);
  });

  test('should render a button to submit a new password', () => {
    render(<MemoryRouter><NewPassword/></MemoryRouter>);
    const button = screen.getByRole('button', {name: 'Change Password'});
    expect(button).toBeVisible();
  });
});