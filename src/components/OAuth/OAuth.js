import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getToken, authStart } from "../../redux/auth";

const OAuth = props => {
  const arr = []
  useEffect(() => {
    props.authStart();
    const code = props.history.location.search.split("=")[1];
    if (code) {
    props.getToken(code);
  }
  }, []);
  
  if (props.isAuth) {
    console.log(props);
    return <Redirect to="/" />;
  }
  if (props.authError) {
    return <Redirect to="/" />;
  }

  return <div>{props.authProccess ? "Please wait..." : null}</div>;
};

const mapStateToProps = state => ({
  authProccess: state.authReducer.authProccess,
  authError: state.authReducer.authError,
  isAuth: state.authReducer.isAuth
});

const mapDispatchToProps = dispatch => ({
  getToken: code => dispatch(getToken(code)),
  authStart: () => dispatch(authStart())
});

const OAuthWithRedux = connect(mapStateToProps, mapDispatchToProps)(OAuth);

export { OAuthWithRedux as OAuth };
