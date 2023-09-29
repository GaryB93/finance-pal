// import { PropsWithChildren } from 'react';
// import { render, RenderOptions } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { configureStore, PreloadedState } from '@reduxjs/toolkit';

// import { setupStore, type AppStore, type RootState } from '../store';

// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: PreloadedState<RootState>;
//   store?: AppStore,
// }

// export function renderWithProviders (
//   ui: React.ReactElement,
//   {
//     preloadedState = {},
//     store = setupStore(preloadedState),
//     ...renderOptions,
//   }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }) {
//     return (
//       <MemoryRouter>
//         <Provider store={store}>
//           {children}
//         </Provider>
//       </MemoryRouter>
//     );
//   }

//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
// }