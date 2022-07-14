import React from 'react';
import { connect } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { removeWalletItem, updateEditor } from '../redux/actions';
import './Table.css';

class Table extends React.Component {
  render() {
    const { expenses, removeItem, updateEd } = this.props;
    const headElements = ['Description', 'Category', 'Payment method', 'Value', 'Currency',
      'Exchange rate', 'Converted value', 'Converted to', 'Edit | Remove'];
    return (
      <table className="table">
        <thead>
          <tr>
            {headElements.map((item) => (
              <th key={ item }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ description, tag, method, currency, value, exchangeRates, id }) => (
              <tr key={ description + id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(Number(value) * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <BiEdit
                    size={29}
                    className="edit-button"
                    onClick={ () => updateEd(id) }
                  />
                  <MdDeleteForever
                    size={30}
                    className="remove-button"
                    onClick={ () => removeItem({ id, description }) }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (global) => ({
  expenses: global.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeWalletItem(item)),
  updateEd: (id) => dispatch(updateEditor(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func.isRequired,
  updateEd: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
