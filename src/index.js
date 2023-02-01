import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import eruda from 'eruda';
import { hello } from './services/fb';
import { ak } from './services/fbAuth';
import { BrowserRouter } from 'react-router-dom';
import { store } from './features/store';
import { Provider } from 'react-redux';

// eruda.init()
console.log(hello, ak)




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


export function setOpenAnim1(elem) {
  elem.classList.remove('open-anim1');
  setTimeout(() => {
    elem.classList.add('open-anim1');

  }, 0);
}