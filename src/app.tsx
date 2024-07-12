import React from 'react';
import Router from './router/index';
import StoreProvider from './store/index';

function App() {
  return (
    <React.StrictMode>
      <StoreProvider>
        <Router />
      </StoreProvider>
    </React.StrictMode>
  );
}

export default App;
