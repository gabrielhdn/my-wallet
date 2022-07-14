import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActionCreator } from '../redux/actions';
import LoginImg from '../images/login-icon.svg';
import myWallet2 from '../images/myWalletCrp.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userActionCreator(email));
    history.push('/carteira');
  }

  validateLogin = () => {
    const { email, password } = this.state;
    const minNumber = 6;
    const isEmailOk = email.includes('@') && email.includes('.com');
    const isPasswordOk = password.length >= minNumber;

    return !(isEmailOk && isPasswordOk);
  }

  render() {
    const { email, password } = this.state;
    return (
      <main className="login-page">
        <section className="img-section">
          <a href="https://storyset.com/money" target="_blank" rel="noreferrer">
            <img src={LoginImg} alt="Wallet Icon" className="login-img"/>
          </a>
        </section>
        <section className="form-page">
          <section className="login-card">
            <img src={myWallet2} alt="myWallet Icon" className="title-img"/>
            <form className="form">
              <input
                type="text"
                className="email-input"
                placeholder="e-mail"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                autoComplete="off"
              />
              <div className="underline underline-1"></div>
              <input
                type="password"
                className="password-input"
                placeholder="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
              <div className="underline underline-2"></div>
            </form>
            <button
              type="button"
              disabled={ this.validateLogin() }
              onClick={ this.handleClick }
              className="login-button"
            >
              LOGIN
            </button>
          </section>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
