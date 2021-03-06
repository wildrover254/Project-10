//Higher Order Component that wraps a route, requiring authentication
//If a Private Route is accessed when not signed in then user is redirected to the sign in page

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default function PrivateRoute({ component: Component, ...rest}) {
    return (
        <Consumer>
            { context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                        ) : (
                            <Redirect to='/signin' />
                        )
                    }
                />
            )}
        </Consumer>
    );
};
