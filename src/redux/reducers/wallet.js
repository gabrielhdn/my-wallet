import { REMOVE_ITEM, SAVE_WALLET_CURRENCIES, SAVE_WALLET_EXPENSES, UPDATE_EDITOR,
  UPDATE_WALLET_ITEM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_WALLET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      editor: false,
    };
  case REMOVE_ITEM:
    return {
      ...state,
      expenses: state.expenses
        .filter((item) => item.id !== action.payload.id)
        .map((item, index) => ({
          ...item,
          id: index,
        })),
    };
  case UPDATE_EDITOR:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case UPDATE_WALLET_ITEM:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((item) => {
        if (item.id === action.idToEdit) {
          return {
            ...action.payload,
            exchangeRates: item.exchangeRates,
            id: action.idToEdit,
          };
        }
        return item;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
