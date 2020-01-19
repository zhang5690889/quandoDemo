import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {store} from './_helpers';
import {App} from './App/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../src/style.css';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
