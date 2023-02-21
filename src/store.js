import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basket/basketSlice';
import createSagaMiddleware from 'redux-saga';
import watchFetchProducts from './features/basket/sagas/basketSagas';
import shoppingCartProductsReducer from './features/shoppingCartProducts/shoppingCartProductsSlice';

console.log(basketReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    basket: basketReducer,
    shoppingCartProducts: shoppingCartProductsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchProducts);

export default store;
