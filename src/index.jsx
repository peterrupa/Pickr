import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// stylesheets
import './styles/styles.scss';
import './styles/style.css';
//import './styles/materialize.css';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { createStore } from 'redux';

import * as Containers from './containers';

const storemiddlewareHistory = syncHistory(browserHistory);
const store = configureStore(undefined, storemiddlewareHistory);

// router
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Containers.HomePage}>
                // <Route path="sample" component={Containers.SamplePage}/>
                // <Route path="test" component={Containers.TestPage}/>
                // <Route path="*" component={Containers.NotFoundPage}/>

            </Route>

        </Router>
    </Provider>, document.getElementById('app')
);

if (!window.devToolsExtension && process.env.NODE_ENV !== 'production') {
    const { showDevTools } = require('./showDevTools').default;
    showDevTools(store);
}
