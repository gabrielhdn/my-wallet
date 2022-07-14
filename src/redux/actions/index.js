export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_WALLET_CURRENCIES = 'SAVE_WALLET_CURRENCIES';
export const SAVE_WALLET_EXPENSES = 'SAVE_WALLET_EXPENSES';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_EDITOR = 'UPDATE_EDITOR';
export const UPDATE_WALLET_ITEM = 'UPDATE_WALLET_ITEM';

export const userActionCreator = (payload) => ({ type: SAVE_USER_INFO, payload });

export const walletCurrencies = (payload) => ({ type: SAVE_WALLET_CURRENCIES, payload });

export const walletExpenses = (payload) => ({ type: SAVE_WALLET_EXPENSES, payload });

export const removeWalletItem = (payload) => ({ type: REMOVE_ITEM, payload });

export const updateEditor = (payload) => ({ type: UPDATE_EDITOR, payload });

export const updateWalletItem = (payload, idToEdit) => ({
  type: UPDATE_WALLET_ITEM, payload, idToEdit,
});

export const walletCurrenciesThunk = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data);
      currencies.splice(currencies.indexOf('USDT'), 1);
      dispatch(walletCurrencies(currencies));
    });
};

export const walletExpensesThunk = (expense) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      const payload = {
        ...expense,
        exchangeRates: data,
      };
      dispatch(walletExpenses(payload));
    });
};
