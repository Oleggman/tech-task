import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './components/GlobalStyle';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/tech-task"> */}
    <BrowserRouter>
      <App />
      <GlobalStyle />
    </BrowserRouter>
  </React.StrictMode>
);
