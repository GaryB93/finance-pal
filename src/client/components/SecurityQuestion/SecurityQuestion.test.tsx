import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/test-utils';
import SecurityQuestion from './SecurityQuestion';

describe.skip('Security question form', () => {

  test('should render a readonly input field with Security Question label', () => {
    renderWithProviders(<SecurityQuestion/>);
    const question = screen.getByLabelText('Security Question');
    expect(question).toBeInTheDocument();
  });

  test('should render an empty input field with an Answer label', () => {
    renderWithProviders(<SecurityQuestion/>);
    const answer = screen.getByLabelText('Answer');
    expect(answer).toHaveValue('');
  });

  test('user input should change value of answer input', () => {
    renderWithProviders(<SecurityQuestion/>);
    const answer = screen.getByRole('textbox', {name: 'Answer'});
    const newInput = 'myAnswer';
    fireEvent.change(answer, {target: {value: newInput}});
    expect(answer).toHaveValue(newInput);
  });

  test('should render a submit button', () => {
    renderWithProviders(<SecurityQuestion/>);
    const submit = screen.getByRole('button', {name: 'Submit'});
    expect(submit).toBeVisible();
  });

  test('should render a link to go back to login page', () => {
    renderWithProviders(<SecurityQuestion/>);
    const link = screen.getByRole('link', {name: 'Login'});
    expect(link).toBeVisible();
  });
});