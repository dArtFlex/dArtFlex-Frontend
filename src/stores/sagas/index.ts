import { takeLatest, all } from 'redux-saga/effects'
import apiMiddleware from '../../services/api_middleware'
import { getUserDataRequest } from '../reducers/user'
import { getAssetsRequest } from '../reducers/assets'
import { getUserData } from '../sagas/user'
import { getAssetsData } from '../sagas/assets'

export default function* root() {
  yield all([
    /** User **/
    takeLatest(getUserDataRequest.type, getUserData, apiMiddleware),
    takeLatest(getAssetsRequest.type, getAssetsData, apiMiddleware),
  ])
}
