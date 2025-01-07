import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './reducer';
import { ToastBar, Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
// Ensure the root element exists and is non-null
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Render the application with the Redux Provider
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <Provider store={store}>
        <App />
        <Toaster  toastOptions={
          {
            style:{
              background: '#000814',
              color: '#fff',
            }
          }
        }/>
      </Provider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
