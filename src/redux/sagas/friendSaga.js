import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//worker Saga: will be fired on "FETCH_FRIENDS" actions
function* fetchFriendList(action) {
  try {
    let response = yield axios.get(`/api/friend`);
    console.log('Saga response for Friends:', response.data);
    yield put({
      type: 'SET_FRIEND_LIST',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in friendSaga GET (list)', err);
  }
}

//worker Saga: will be fired on "FETCH_FRIEND" actions
function* fetchFriend(action) {
  try {
    let username = action.payload;
    let response = yield axios.get(`/api/friend/${username}`);
    console.log('Saga response for Friend watches:', response.data);
    yield put({
      type: 'SET_FRIEND',
      payload: response.data
    });
  } catch (err) {
    console.log('Error in friendSaga GET (profile)', err);
  }
}

//worker Saga: will be fired on "ADD_FRIEND" actions
function* addFriend(action) {
  try {
    let friend = action.payload;
    console.log('Adding', friend);

    yield axios.post('/api/friend', friend);
    yield put({
      type: 'FETCH_FRIEND_LIST'
    });
  } catch (err) {
    console.log('Error in friendSaga POST:', err);
  }
}

//worker Saga: will be fired on "DELETE_FRIEND" actions
function* deleteFriend(action) {
  try {
    let friendId = action.payload;

    yield axios.delete(`/api/friend/${friendId}`);
    yield put({
      type: 'FETCH_FRIEND_LIST'
    });
  } catch (err) {
    console.log('Error in friendSaga DELETE:', err);
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIEND_LIST', fetchFriendList);
  yield takeLatest('FETCH_FRIEND', fetchFriend);
  yield takeLatest('ADD_FRIEND', addFriend);
  yield takeLatest('DELETE_FRIEND', deleteFriend);
}

export default friendSaga;
