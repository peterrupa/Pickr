import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// stylesheets
import './styles/style.css';
import './styles/styles.scss';

// js
import '../externalDependencies/js/jquery-1.12.2.js';
import '../externalDependencies/js/materialize.js';

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
            {/* @TODO: Render server side non-app pages */}
            <Route path="/presentation" component={Containers.Presentation}/>
            <Route path="/login" component={Containers.LogIn}/>
            <Route path="/signup" component={Containers.SignUp}/>
            <Route path="/" component={Containers.App}>
                <Route path="student" component={Containers.StudentPage}/>
                <Route path="class" component={Containers.ClassList}/>
                <Route path="controlPanel" component={Containers.ControlPanel}/>
                <Route path="classroom/:classId" component={Containers.ClassRoom}/>
                <Route path="*" component={Containers.NotFoundPage}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('app')
);

if (!window.devToolsExtension && process.env.NODE_ENV !== 'production') {
    const { showDevTools } = require('./showDevTools').default;
    showDevTools(store);
}
