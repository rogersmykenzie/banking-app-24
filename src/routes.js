import React from 'react';
//routing
import {Switch, Route} from 'react-router-dom'
//components
import Register from './components/Register';
import Login from './components/Login';

export default (
    <Switch>
        <Route path='/register' component={Register} />
        <Route exact path='/' component={Login} />
        <Route path='/' render={() => <h1>404 Page not Found.</h1>} />
    </Switch>
)