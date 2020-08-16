import React from "react";
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import { store } from 'store/';
import { ProductsHome } from 'domain/Products/ProductsHome';
import { CartHome } from 'domain/Cart/CartHome';


export const App = () => (
    <Provider store={store({})}>
        <ToastProvider placement="top-center" autoDismiss={3000}>
            <Router>
                <Switch>
                    <Route path="/products" component={ProductsHome} />
                    <Route path="/cart" component={CartHome} />
                    <Route path="/" component={() => <Redirect to="/products" />} />
                </Switch>
            </Router>
        </ToastProvider>
    </Provider>
);

export default App;
