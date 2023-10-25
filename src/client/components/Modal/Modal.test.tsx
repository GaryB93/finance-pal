import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/test-utils';
import Modal from './Modal';

describe.skip('Modal', () => {
  const modalProps = {
    isOpen: true,
    hasCloseBtn: true,
    onClose: () => 1,
    children: <p>description</p>
  };
  const spy = vi.spyOn(modalProps, 'onClose').mockImplementation(() => 1);

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  test('modal renders without crashing', () => {
    const modal = renderWithProviders(<Modal {...modalProps}/>);
    expect(modal).not.toBe(null);
  });

  test('modal renders children elements', () => {
    renderWithProviders(<Modal {...modalProps}/>);
    const children = screen.getByText('description');
    expect(children).toBeInTheDocument();
  })

  test('modal renders button', () => {
    renderWithProviders(<Modal {...modalProps}/>);
    const button = screen.getByRole('button', {name: 'X'});
    expect(button).toBeVisible();
  });

  test('clicking button in the modal calls function passed in props', () => {
    renderWithProviders(<Modal {...modalProps}/>);
    const button = screen.getByRole('button', {name: 'X'});
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });
});