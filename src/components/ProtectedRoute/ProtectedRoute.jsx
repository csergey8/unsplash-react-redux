import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
})

const ProtectedRouteWithRedux = connect(mapStateToProps)(ProtectedRoute)

export { ProtectedRouteWithRedux as ProtectedRoute }