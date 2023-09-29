import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { PreloadedState } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { setupStore, type AppStore, type RootState } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore,
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
  ) {
    function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
      return (
        <Provider store={store}>
          <MemoryRouter>
            {children}
          </MemoryRouter>
        </Provider>
      )
    }
    
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}