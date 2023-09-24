import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SecurityQuestion from './SecurityQuestion';

describe.skip('Security question form', () => {

  test('should render a readonly input field with Security Question label', () => {
    render(<MemoryRouter><SecurityQuestion/></MemoryRouter>);
    const question = screen.getByLabelText('Security Question');
    expect(question).toBeInTheDocument();
  });

  test('should render an empty input field with an Answer label', () => {
    render(<MemoryRouter><SecurityQuestion/></MemoryRouter>);
    const answer = screen.getByLabelText('Answer');
    expect(answer).toHaveValue('');
  });

  test('user input should change value of answer input', () => {
    render(<MemoryRouter><SecurityQuestion/></MemoryRouter>);
    const answer = screen.getByRole('textbox', {name: 'Answer'});
    const newInput = 'myAnswer';
    fireEvent.change(answer, {target: {value: newInput}});
    expect(answer).toHaveValue(newInput);
  });

  test('should render a submit button', () => {
    render(<MemoryRouter><SecurityQuestion/></MemoryRouter>);
    const submit = screen.getByRole('button', {name: 'Submit'});
    expect(submit).toBeVisible();
  });

  test('should render a link to go back to login page', () => {
    render(<MemoryRouter><SecurityQuestion/></MemoryRouter>);
    const link = screen.getByRole('link', {name: 'Login'});
    expect(link).toBeVisible();
  });
});