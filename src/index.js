import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // App이라는 컴포넌트와 그 자식컴포넌트는 store에서 state를 가져다 쓸수 있음
  //<React.StrictMode>
  <QueryClientProvider client ={queryClient}>
  <Provider store={store}>
    <BrowserRouter>
    <App /> 
    </BrowserRouter>
  </Provider>
  </QueryClientProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
