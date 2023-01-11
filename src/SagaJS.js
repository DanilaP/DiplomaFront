import { takeEvery, put, call } from 'redux-saga/effects';
import $api from './api';


const addFile = async (userfile) => {
    const response = await $api.post('http://localhost:5000/uploadFiles', userfile);
    return response;
}
const deleteUserFile = async (filePath) => {
    const response = await $api.post('http://localhost:5000/files/deleteFile', {deletedFilePath: filePath});
    return response;
}


function* fetchUserWorker(file) {
    const user = yield call(addFile, file.payload);
    yield put({type: "USERFILES", payload: user.data.files});
}
function* deleteFileWorker(filepath) {
    const res = yield call(deleteUserFile, filepath.payload);
    yield put({type: "USERFILES", payload: res.data.files});
}
function* mySagaWatcher() {
    yield takeEvery("UPLOADEDFILE", fetchUserWorker);
    yield takeEvery("DELETEDFILEPATH", deleteFileWorker);
}


export default mySagaWatcher;