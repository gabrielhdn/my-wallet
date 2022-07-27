import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletExpensesThunk, updateWalletItem } from '../redux/actions';
import './Form.css';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cash',
      tag: 'Food',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { dispatch, expenses, editor, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (editor) {
      dispatch(updateWalletItem(expense, idToEdit));
    } else {
      dispatch(walletExpensesThunk(expense));
    }
    this.setState({ value: '', description: '' });
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const categories = ['Food', 'Leisure', 'Work', 'Transport', 'Health'];
    return (
      <form className={editor ? 'wallet-form cl' : 'wallet-form'}>
        <label htmlFor="value" className="form-label">
          Value
          <input
            type="number"
            name="value"
            id="value"
            placeholder="e.g., 10.50 "
            className="name-input"
            value={ value }
            onChange={ this.handleChange }
            autoComplete="off"
          />
        </label>
        <label htmlFor="description" className="form-label">
          Description
          <input
            type="text"
            name="description"
            id="description"
            placeholder="e.g., Movies, Sandwich"
            className="desc-input"
            value={ description }
            onChange={ this.handleChange }
            autoComplete="off"
          />
        </label>
        <label htmlFor="currency" className="form-label">
          Currency
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((item, index) => (
              <option
                key={ item + index }
                value={ item }
              >
                {item}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="form-label">
          Payment method
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Cash">Cash</option>
            <option value="Credit card">Credit card</option>
            <option value="Debit card">Debit card</option>
          </select>
        </label>
        <label htmlFor="tag" className="form-label">
          Category
          <select
            id="tag"
            name="tag"
            tag={ tag }
            onChange={ this.handleChange }
          >
            {categories.map((item, index) => (
              <option key={ item + index } value={ item }>{item}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="form-button"
          onClick={ this.handleClick }
        >
          {editor ? 'Edit' : 'Add'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (global) => ({
  currencies: global.wallet.currencies,
  expenses: global.wallet.expenses,
  editor: global.wallet.editor,
  idToEdit: global.wallet.idToEdit,
});

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Form);
