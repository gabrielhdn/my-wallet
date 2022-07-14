import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myWallet from '../images/myWallet2.png';
import './Header.css';

class Header extends React.Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length) {
      return expenses.map(({ value, currency, exchangeRates }) => (
        Number(value) * exchangeRates[currency].ask
      )).reduce((acc, number) => acc + number).toFixed(2);
    }
    return 0;
  }

  render() {
    const { email } = this.props;
    const totalExpense = this.sumExpenses();
    return (
      <header className="header">
        <div>
          <img src={myWallet} alt="myWallet Icon" className="header-img"/>
        </div>
        <p className="expense">{`Total: R$ ${totalExpense} (BRL)`}</p>
        <p className="emailElement">{email}</p>
      </header>
    );
  }
}

const mapStateToProps = (global) => ({
  email: global.user.email,
  expenses: global.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
