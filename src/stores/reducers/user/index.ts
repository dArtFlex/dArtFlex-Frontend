import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStateType } from './types'

const initialState: UserStateType = {
  isOpenSideBar: true,
  fetching: false,
  userAssets: [],
  error: '',
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toogleSideBar: (state) => {
      state.isOpenSideBar = !state.isOpenSideBar
    },
    getUserDataRequest: (state, i) => {
      state.fetching = true
      state.error = ''
    },
    getUserDataSuccess: (
      state,
      { payload }: PayloadAction<{ userData: UserStateType['user']; role: UserStateType['role'] }>
    ) => {
      state.fetching = false
      state.user = payload.userData
      state.role = payload.role
    },
    getUserDataFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    createNewUserRequest: (state, i) => {
      state.fetching = true
      state.error = ''
    },
    createNewUserSuccess: (state, { payload }: PayloadAction<{ userData: UserStateType['user'] }>) => {
      state.fetching = false
      state.user = payload.userData
    },
    createNewUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getUserAssetsRequest: (state) => {
      state.fetching = true
    },
    getUserAssetsSuccess: (state, { payload }: PayloadAction<{ userAssets: UserStateType['userAssets'] }>) => {
      state.fetching = false
      state.userAssets = payload.userAssets
    },
    getUserAssetsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const {
  toogleSideBar,
  getUserDataRequest,
  getUserDataSuccess,
  getUserDataFailure,

  createNewUserRequest,
  createNewUserSuccess,
  createNewUserFailure,

  getUserAssetsRequest,
  getUserAssetsSuccess,
  getUserAssetsFailure,
} = userSlice.actions

export const { reducer } = userSlice
