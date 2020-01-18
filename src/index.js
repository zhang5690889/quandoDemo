import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {store} from './_helpers';
import {App} from './App/Routing';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
