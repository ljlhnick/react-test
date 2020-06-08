import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from 'mobx-react';
import routes from './routes/index'
import store from "./store/index";

import * as serviceWorker from './serviceWorker';
ReactDOM.render(
    <Provider {...store}>
        <BrowserRouter>
        <div>
            {
                routes.map( (item) => (
                        <Route exact path = {item.path} component = {item.component} key={item.path}></Route>
                    )
                )
            }
        </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
