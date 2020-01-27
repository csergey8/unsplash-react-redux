import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken, authStart } from '../../redux/auth';

const OAuth = (props) => {
  useEffect(() => {
    props.authStart();
  }, [props])
  const code = props.history.location.search.split('=')[1];
  if(code) {
    props.getToken(code)
  }
  if(props.isAuth){
    return <Redirect to="/" />
  }
  if(props.authError) {
    return <Redirect to="/" />
  }

  return (
    <div>
    {props.authProccess ? 'Please wait...':  null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authProccess: state.authReducer.authProccess,
  authError: state.authReducer.authError
})

const mapDispatchToProps = (dispatch) => ({
  getToken: (code) => dispatch(getToken(code)),
  authStart: () => dispatch(authStart())
})

const OAuthWithRedux = connect(mapStateToProps, mapDispatchToProps)(OAuth)

export { OAuthWithRedux as OAuth };