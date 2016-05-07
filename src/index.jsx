import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// stylesheets
import './styles/style.css';
import './styles/styles.scss';
import './styles/presentation.css';
import './styles/oneUI.css';
import './styles/index_style.css';
import './styles/presentation.css';

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
            <Route path="/" component={Containers.LandingPage}/>
            <Route path="/presentation" component={Containers.Presentation}/>
            <Route path="/login" component={Containers.LogIn}/>
            <Route path="/signup" component={Containers.SignUp}/>
            <Route path="/forgotpassword" component={Containers.ForgotPassword}/>
            <Route path="/index" component={Containers.LandingPage}/>
            <Route path="/" component={Containers.App}>
                <Route path="/student/:studentId" component={Containers.StudentPage}/>
                <Route path="/class" component={Containers.ClassList}/>
                <Route path="/controlPanel" component={Containers.ControlPanel}/>
                <Route path="/classroom/:ClassId" component={Containers.ClassRoom}/>
                <Route path="/index" component={Containers.LandingPage}/>
            </Route>
            <Route path="*" component={Containers.NotFoundPage}/>
        </Router>
    </Provider>, document.getElementById('app')
);

if (!window.devToolsExtension && process.env.NODE_ENV !== 'production') {
    const { showDevTools } = require('./showDevTools').default;
    showDevTools(store);
}
