import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RequestPassword from './RequestPassword';

describe('RequestPassword form', () => {

  test('should render an empty username input field', () => {
    render(<MemoryRouter><RequestPassword/></MemoryRouter>)
    const username = screen.getByLabelText('Username');
    expect(username).toHaveValue('');
  });

  test('user input should change value of username input field', () => {
    render(<MemoryRouter><RequestPassword/></MemoryRouter>)
    const username = screen.getByRole('textbox', {name: 'Username'});
    const newInput = 'myUsername';
    fireEvent.change(username, {target: {value: newInput}});
    expect(username).toHaveValue(newInput);
  });

  test('should render a button to request new password', () => {
    render(<MemoryRouter><RequestPassword/></MemoryRouter>)
    const button = screen.getByRole('button', {name: 'Request New Password'});
    expect(button).toBeVisible();
  });

  test('should render a link to go back to login page', () => {
    render(<MemoryRouter><RequestPassword/></MemoryRouter>)
    const link = screen.getByRole('link', {name: 'Login'});
    expect(link).toBeVisible();
  });
});