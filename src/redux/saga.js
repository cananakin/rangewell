import { all, fork, call, put, takeEvery} from 'redux-saga/effects';
import * as Api from '../api';
import { ADD_DEAL, EDIT_DEAL, DEAL_MESSAGE, GET_DEALS } from './actions-types';

function* GetDealsAction() {
    const deals = yield call(Api.get);
    yield put({ type: GET_DEALS, deals: deals, });
}
function* actionWatcher() {
       yield takeEvery('DEAL_MESSAGE', GetDealsAction)
}


function* AddDealAction (payload) {
    try {
        const deal = yield call(Api.add, payload.model);
        console.log(deal)
        yield put({type: "DEAL_MESSAGE", message: 'Success', deal: deal});
     } catch (e) {
        yield put({type: "DEAL_MESSAGE", message: 'Fail'});
    }
}

function* EditDealAction (payload,id) {
    try {
        const { response } = yield call(Api.edit, payload.model,payload.id);
        if (response){
            yield put({type:DEAL_MESSAGE,message:'Success!',hasErrored:false})
        }
        else
        {
            //console.log(error);
            //yield put({type:DEAL_MESSAGE,message:'Fail' + error.response.data.error,hasErrored:true})
        }
    } catch (e) {
        //yield put({type:DEAL_MESSAGE,message:'Fail',hasErrored:true, isLoading:false})
    }
}

function* DealMessageAction (payload,id) {
    yield 1;
    console.log(payload.message);
}

export function* AddDeal() {
    yield takeEvery(ADD_DEAL, AddDealAction);
}
export function* EditDeal() {
    yield takeEvery(EDIT_DEAL, EditDealAction);
}
export function* DealMessage() {
    yield takeEvery(DEAL_MESSAGE,DealMessageAction);
}

export default function* rootSaga() {
  yield all([fork(AddDeal),fork(EditDeal), fork(DealMessage), actionWatcher()]);
}