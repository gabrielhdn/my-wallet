import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletCurrenciesThunk } from '../redux/actions';
import Header from '../components/Header';
import Table from '../components/Table';
import Form from '../components/Form';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletCurrenciesThunk());
  }

  render() {
    return (
      <main className="main-wallet">
        <Header />
        <Form />
        <Table />
      </main>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
