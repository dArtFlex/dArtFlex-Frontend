import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ManagementStateType } from './types'

const initialState: ManagementStateType = {
  fetching: false,
  error: '',
  works: [],
  users: [],
}

const managementSlice = createSlice({
  name: 'management',
  initialState,
  reducers: {
    getAllWorksRequest: (state) => {
      state.fetching = true
    },
    getAllWorksSuccess: (state, { payload }: PayloadAction<{ works: ManagementStateType['works'] }>) => {
      state.works = payload.works
      state.fetching = false
    },
    getAllWorksFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getAllUsersListRequest: (state) => {
      state.fetching = true
    },
    getAllUsersListSuccess: (state, { payload }: PayloadAction<{ users: ManagementStateType['users'] }>) => {
      state.users = payload.users
      state.fetching = false
    },
    getAllUsersListFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    banUserRequest: (state, i) => {
      state.fetching = true
    },
    banUserSuccess: (state, { payload }: PayloadAction<{ users: ManagementStateType['users'] }>) => {
      state.fetching = false
      state.users = payload.users
    },
    banUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    unbanUserRequest: (state, i) => {
      state.fetching = true
    },
    unbanUserSuccess: (state, { payload }: PayloadAction<{ users: ManagementStateType['users'] }>) => {
      state.fetching = false
      state.users = payload.users
    },
    unbanUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    banWorkRequest: (state, i) => {
      state.fetching = true
    },
    banWorkSuccess: (state, { payload }: PayloadAction<{ works: ManagementStateType['works'] }>) => {
      state.fetching = false
      state.works = payload.works
    },
    banWorkFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    unbanWorkRequest: (state, i) => {
      state.fetching = true
    },
    unbanWorkSuccess: (state, { payload }: PayloadAction<{ works: ManagementStateType['works'] }>) => {
      state.fetching = false
      state.works = payload.works
    },
    unbanWorkFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    clearManagementError: (state) => {
      state.error = ''
    },
  },
})

export const {
  getAllWorksRequest,
  getAllWorksSuccess,
  getAllWorksFailure,

  getAllUsersListRequest,
  getAllUsersListSuccess,
  getAllUsersListFailure,

  banUserRequest,
  banUserSuccess,
  banUserFailure,

  unbanUserRequest,
  unbanUserSuccess,
  unbanUserFailure,

  banWorkRequest,
  banWorkSuccess,
  banWorkFailure,

  unbanWorkRequest,
  unbanWorkSuccess,
  unbanWorkFailure,

  clearManagementError,
} = managementSlice.actions

export const { reducer } = managementSlice
