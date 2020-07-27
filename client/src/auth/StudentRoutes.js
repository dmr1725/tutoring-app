import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, isStudent} from '.';

const StudentRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (isAuthenticated() && isStudent()) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default StudentRoute;