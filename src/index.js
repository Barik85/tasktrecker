import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import WebFont from 'webfontloader'
import store from './redux/store';
import './index.css';
import App from './components/App';

WebFont.load({
  google: {
    families: ['Roboto:400,500', 'sans-serif']
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
