import { call, put, all, takeEvery } from 'redux-saga/effects';

import { fetchProductsSuccess, fetchProductsError } from '../basketSlice';

function* fetchProductsSaga() {
  try {
    const response = yield call(() => fetch('http://localhost:3001/products'));
    const data = yield response.json();
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsError(error.message));
  }
}

function* watchFetchProducts() {
  yield takeEvery('basket/getProductsFetch', fetchProductsSaga);
}

export default watchFetchProducts;
