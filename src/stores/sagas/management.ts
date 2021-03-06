import { put, call, all, select } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAllWorksSuccess,
  getAllWorksFailure,
  getAllUsersListSuccess,
  getAllUsersListFailure,
  banUserSuccess,
  banUserFailure,
  unbanUserSuccess,
  unbanUserFailure,
  banWorkSuccess,
  banWorkFailure,
  unbanWorkSuccess,
  unbanWorkFailure,
} from 'stores/reducers/management'
import { ManagementStateType } from 'stores/reducers/management/types'
import { IApi } from '../../services/types'
import { AssetTypes, UserDataTypes, AssetDataTypes, IBaseManagementUsers, IBaseManagementWorks } from 'types'
import APP_CONFIG from 'config'
import { walletService } from 'services/wallet_service'

function* composeWorkData(api: IApi, asset: AssetTypes) {
  const creatorData: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserProfileByUserId(Number(asset.creator)),
  })
  const ownerData: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserProfileByUserId(Number(asset.owner)),
  })
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: asset.uri,
  })
  return { ...asset, creatorData: creatorData[0], ownerData: ownerData[0], imageData: imageData[0] }
}

export function* getAllWorks(api: IApi) {
  try {
    const getItemAssetsAll: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemAll,
    })
    const works: ManagementStateType['works'] = yield all(getItemAssetsAll.map((it) => call(composeWorkData, api, it)))
    yield put(getAllWorksSuccess({ works }))
  } catch (e) {
    yield put(getAllWorksFailure(e))
  }
}

export function* getAllUsersList(api: IApi) {
  try {
    const users: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserAll,
    })
    yield put(getAllUsersListSuccess({ users }))
  } catch (e) {
    yield put(getAllUsersListFailure(e))
  }
}

export function* banUser(api: IApi, { payload }: PayloadAction<{ user_id: string }>) {
  try {
    const signature: { data: string; signature: string } = yield walletService.generateSignature()
    yield call(api, {
      url: APP_CONFIG.banUser,
      method: 'POST',
      data: {
        userId: payload.user_id,
        ...signature,
      },
    })

    const { users: currentUsersData }: { users: IBaseManagementUsers[] } = yield select((state) => state.management)
    const users = currentUsersData.map((user: IBaseManagementUsers) =>
      user.id === Number(payload.user_id) ? { ...user, ban: true } : user
    )
    yield put(banUserSuccess({ users }))
  } catch (e) {
    yield put(banUserFailure(e))
  }
}

export function* unbanUser(api: IApi, { payload }: PayloadAction<{ user_id: string }>) {
  try {
    const signature: { data: string; signature: string } = yield walletService.generateSignature()
    yield call(api, {
      url: APP_CONFIG.unbanUser,
      method: 'POST',
      data: {
        userId: payload.user_id,
        ...signature,
      },
    })

    const { users: currentUsersData }: { users: IBaseManagementUsers[] } = yield select((state) => state.management)
    const users = currentUsersData.map((user: IBaseManagementUsers) =>
      user.id === Number(payload.user_id) ? { ...user, ban: false } : user
    )
    yield put(unbanUserSuccess({ users }))
  } catch (e) {
    yield put(unbanUserFailure(e))
  }
}

export function* banWork(api: IApi, { payload }: PayloadAction<{ item_id: string }>) {
  try {
    const signature: { data: string; signature: string } = yield walletService.generateSignature()
    yield call(api, {
      url: APP_CONFIG.banItem,
      method: 'POST',
      data: {
        itemId: payload.item_id,
        ...signature,
      },
    })

    const { works: currentWorksData }: { works: IBaseManagementWorks[] } = yield select((state) => state.management)
    const works = currentWorksData.map((work: IBaseManagementWorks) =>
      work.id === Number(payload.item_id) ? { ...work, ban: true } : work
    )
    yield put(banWorkSuccess({ works }))
  } catch (e) {
    yield put(banWorkFailure(e))
  }
}

export function* unbanWork(api: IApi, { payload }: PayloadAction<{ item_id: string }>) {
  try {
    const signature: { data: string; signature: string } = yield walletService.generateSignature()
    yield call(api, {
      url: APP_CONFIG.unbanItem,
      method: 'POST',
      data: {
        itemId: payload.item_id,
        ...signature,
      },
    })

    const { works: currentWorksData }: { works: IBaseManagementWorks[] } = yield select((state) => state.management)
    const works = currentWorksData.map((work: IBaseManagementWorks) =>
      work.id === Number(payload.item_id) ? { ...work, ban: false } : work
    )
    yield put(unbanWorkSuccess({ works }))
  } catch (e) {
    yield put(unbanWorkFailure(e))
  }
}
