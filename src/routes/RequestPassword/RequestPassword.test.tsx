import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RequestPassword from './RequestPassword';

describe('RequestPassword form', () => {

  beforeEach(() => {
    render(<MemoryRouter><RequestPassword/></MemoryRouter>)
  });

  test('should render an empty username input field', () => {
    const username = screen.getByLabelText('Username');
    expect(username).toHaveValue('');
  });

  test('user input should change value of username input field', () => {
    const username = screen.getByRole('textbox', {name: 'Username'});
    const newInput = 'myUsername';
    fireEvent.change(username, {target: {value: newInput}});
    expect(username).toHaveValue(newInput);
  });

  test('should render a button to request new password', () => {
    const button = screen.getByRole('button', {name: 'Request New Password'});
    expect(button).toBeVisible();
  });
});