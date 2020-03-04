import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  LOAD_DEAL_LIST,
  RENDER_DEAL_LIST,
  ADD_DEAL,
  EDIT_DEAL,
  DELETE_DEAL
} from '../actions';
import * as Api from '../api';

export function* fetchDealList() {
  const endpoint = `http://localhost:3001/api/deals`;
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  // stats
  const stats_endpoint = `http://localhost:3001/api/deals/stats`;
  const stats_response = yield call(fetch, stats_endpoint);
  const stats = yield stats_response.json();
  yield put({ type: RENDER_DEAL_LIST, deals: data, stats: stats });
}

export function* loadDealList() {
  yield takeEvery(LOAD_DEAL_LIST, fetchDealList);
}

function* AddDealAction(payload) {
  try {
    yield call(Api.add, payload.payload);
    yield put({ type: 'LOAD_DEAL_LIST', message: 'Success' });
  } catch (e) {
    yield put({ type: 'DEAL_MESSAGE', message: 'Fail' });
  }
}

export function* AddDeal() {
  yield takeEvery(ADD_DEAL, AddDealAction);
}

function* EditDealAction(payload) {
  try {
    const response = yield call(Api.edit, payload.payload, payload.id);
    if (response) {
      yield call(Api.edit, payload.payload, payload.id);
      yield put({ type: 'LOAD_DEAL_LIST', message: 'Success' });
    } else {
      console.log('error edit saga');
    }
  } catch (e) {
    console.log('error edit saga');
    //yield put({type:DEAL_MESSAGE,message:'Fail',hasErrored:true, isLoading:false})
  }
}

export function* EditDeal() {
  yield takeEvery(EDIT_DEAL, EditDealAction);
}

function* DeleteDealAction(payload) {
  try {
    yield call(Api.remove, payload.id);
    yield put({ type: 'LOAD_DEAL_LIST', message: 'Success' });
  } catch (e) {
    yield put({ type: 'DEAL_MESSAGE', message: 'Fail' });
  }
}

export function* DeleteDeal() {
  yield takeEvery(DELETE_DEAL, DeleteDealAction);
}

export default function* rootSaga() {
  yield all([loadDealList(), AddDeal(), fork(EditDeal), DeleteDeal()]);
}
