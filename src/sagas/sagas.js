import { call, put, takeLatest } from "redux-saga/effects";

const setDelay = (delay) =>
  new Promise(function (resolve, reject) {
    const bool = true;
    if (bool) {
      setTimeout(() => resolve("Resolved"), delay * 1000);
    } else {
      return reject("Rejected");
    }
  });

function* addItem(action) {
  yield put({ type: "LOADING", payload: true });
  try {
    yield call(setDelay, action.payload.delay);
    yield put({
      type: "ADD_ITEM",
      payload: {
        currentList: action.payload.currentList,
        itemText: action.payload.itemText
      }
    });
  } catch (error) {
    console.log(error);
  }
  yield put({ type: "LOADING", payload: false });
}

function* addList(action) {
  yield put({ type: "LOADING", payload: true });
  try {
    yield call(setDelay, action.payload.delay);
    yield put({ type: "ADD_LIST", payload: action.payload.listText });
  } catch (error) {
    console.log(error);
  }
  yield put({ type: "LOADING", payload: false });
}

function* delList(action) {
  yield put({ type: "LOADING", payload: true });
  try {
    yield call(setDelay, action.payload.delay);
    yield put({ type: "DEL_LIST", payload: action.payload });
  } catch (error) {
    console.log(error);
  }
  yield put({ type: "LOADING", payload: false });
}

function* delItem(action) {
  yield put({ type: "LOADING", payload: true });
  try {
    yield call(setDelay, action.payload.delay);
    yield put({
      type: "DEL_ITEM",
      payload: {
        currentList: action.payload.itemText,
        currentItem: action.payload.listText
      }
    });
  } catch (error) {
    console.log(error);
  }
  yield put({ type: "LOADING", payload: false });
}

function* mySaga() {
  yield takeLatest("ADD_ITEM_REQUEST", addItem);
  yield takeLatest("ADD_LIST_REQUEST", addList);
  yield takeLatest("DEL_ITEM_REQUEST", delItem);
  yield takeLatest("DEL_LIST_REQUEST", delList);
}

export default mySaga;
