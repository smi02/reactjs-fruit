import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './GlobalComponents/ThemeProvider';
import { CartProvider } from 'react-use-cart';
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";


render(
  <ThemeProvider>
    <CartProvider>
      <Provider store={store}>
        <persistGate loading={null} persistor={persistor}>
          <App />
        </persistGate>
      </Provider>
    </CartProvider>
  </ThemeProvider>
  , document.getElementById('root')
 );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
