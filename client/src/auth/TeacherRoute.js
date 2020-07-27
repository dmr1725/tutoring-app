import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, isTeacher} from '.';

const TeacherRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (isAuthenticated() && isTeacher()) ? (
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

export default TeacherRoute;