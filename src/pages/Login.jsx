import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';

class Login extends React.Component {
  state = {
    nameLogin: '',
    loading: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { nameLogin } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });
    await createUser({ name: nameLogin });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { nameLogin, loading } = this.state;
    const n3 = 3;
    const isDisabled = nameLogin.length < n3;
    return (
      <div
        data-testid="page-login"
        className="container-login"
      >
        { loading ? <Loading /> : (
          <form className="form-login">
            Login
            <input
              type="text"
              name="nameLogin"
              value={ nameLogin }
              onChange={ this.handleChange }
              data-testid="login-name-input"
              placeholder="qual é o seu nome?"
            />
            <button
              type="button"
              name="login-btn"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
