import reducers from 'global-states/reducers/rootReducer';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
/**
 * Prepare the Redux Store
 */

const composedMiddlewares = applyMiddleware(thunk);

const storeEnhancers = composeWithDevTools({
  name: 'React-node-test',
})(composedMiddlewares);

export const makeStore = () => createStore(reducers, storeEnhancers);
export default makeStore;
