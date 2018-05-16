import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeView, login } from '../actions/index';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';

const Login = props => (
  <div className="credentials clear-fix">
    <h4>Login</h4>
    <form >
      <div>
        <label className="credentials-label">Username:</label>
        <input className="credentials-input" id="username" type="text" name="username" />
      </div>
      <div>
        <label className="credentials-label">Password:</label>
        <input className="credentials-input" id="password" type="password" name="password" />
      </div>
      <div className="btn-credentials">
        <input 
          className="btn-main clickable" 
          type="button" 
          value="Login" 
          onClick={
            () => {
              let name = document.getElementById('username').value;
              let password = document.getElementById('password').value;
              props.mutate({
                variables: {
                  name,
                  password,
                }
              })
              .then((user) => {
                console.log('welcome back,', user.data.login.name);
                props.changeView('employeeEditor');


              })
              .catch((err) => {
                console.log(err);
              })
              // props.login({ username, password });
              document.getElementById('username').value = '';
              document.getElementById('password').value = '';
            }
          }
        />
      </div>
    </form>
  </div>
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeView }, dispatch);
}

Login.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default graphql(mutation)(connect(null, mapDispatchToProps)(Login));
