import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurspose: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurspose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return { ...state, loan: 0, loanPurspose: '', balance: state.balance - state.loan };
    default:
      return state;
  }
}

const store = createStore(reducer);

console.log('Hey redux.....');

store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());

store.dispatch({ type: 'account/withdraw', payload: 200 });
console.log(store.getState());

store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: 'Buy a Car!' } });
console.log(store.getState());

store.dispatch({ type: 'account/payLoan' });
console.log(store.getState());
