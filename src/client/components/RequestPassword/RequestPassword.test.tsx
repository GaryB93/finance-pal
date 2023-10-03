import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/test-utils';
import RequestPassword from './RequestPassword';

describe('RequestPassword form', () => {

  test('should render an empty username input field', () => {
    renderWithProviders(<RequestPassword/>);
    const username = screen.getByLabelText('Username');
    expect(username).toHaveValue('');
  });

  test('user input should change value of username input field', () => {
    renderWithProviders(<RequestPassword/>);
    const username = screen.getByRole('textbox', {name: 'Username'});
    const newInput = 'myUsername';
    fireEvent.change(username, {target: {value: newInput}});
    expect(username).toHaveValue(newInput);
  });

  test('should render a button to request new password', () => {
    renderWithProviders(<RequestPassword/>);
    const button = screen.getByRole('button', {name: 'Request New Password'});
    expect(button).toBeVisible();
  });

  test('should render a link to go back to login page', () => {
    renderWithProviders(<RequestPassword/>);
    const link = screen.getByRole('link', {name: 'Login'});
    expect(link).toBeVisible();
  });
});