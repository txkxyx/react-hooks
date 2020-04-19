import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './component/Main';
import ClassComponent from './component/ClassComponent';
import FunctionComponent from './component/FunctionComponent';
import HooksUseState from './component/HooksUseState';
import HooksUseEffect from './component/HooksUseEffect';
import ClassComponentDidMount from './component/ClassComponentDidMount';
import FunctionComponentDidMount from './component/FunctionComponentDidMount';
import OriginalHooks from './component/OriginalHooks';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Main}></Route>
            <Route exact path='/component/class' component={ClassComponent}></Route>
            <Route exact path='/component/function' render={() => <FunctionComponent message="Function Component" />}></Route>
            <Route exact path='/hooks/usestate' component={HooksUseState}></Route>
            <Route exact path='/hooks/useeffect' component={HooksUseEffect}></Route>
            <Route exact path='/hooks/classdidmount' component={ClassComponentDidMount}></Route>
            <Route exact path='/hooks/functiondidmount' component={FunctionComponentDidMount}></Route>
            <Route exact path='/hooks/originalhooks' component={OriginalHooks}></Route>
        </Switch>
    </BrowserRouter>
)

export default App;