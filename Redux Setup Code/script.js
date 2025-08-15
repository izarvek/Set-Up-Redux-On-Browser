// Access Redux from global scope
const { createStore } = window.Redux;

const postCountElement = document.querySelector('.post-count');

const initialState = {
  post: 0,
  name: 'Vivek Sharma',
  age: 26,
};

const INCREMENT = 'post/increment';
const DECREMENT = 'post/decrement';
const INCREASE_BY = 'post/increaseBy';
const DECREASE_BY = 'post/decreaseBy';

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 };
    case DECREMENT:
      return { ...state, post: state.post - 1 };
    case INCREASE_BY:
      return { ...state, post: state.post + action.payload };
    case DECREASE_BY:
      return { ...state, post: state.post - action.payload };
    default:
      return state;
  }
}

// Create Redux store with DevTools extension support
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Subscribe to store updates
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  postCountElement.innerText = state.post;
});

// Initialize display
postCountElement.innerText = store.getState().post;

// Dispatch some actions
store.dispatch({ type: INCREMENT });
store.dispatch({ type: DECREMENT });
store.dispatch({ type: INCREASE_BY, payload: 15 });
store.dispatch({ type: DECREASE_BY, payload: 5 });

// Optional: unsubscribe from store updates
// unsubscribe();

postCountElement.addEventListener('click', () => {
  store.dispatch({ type: INCREMENT });
});