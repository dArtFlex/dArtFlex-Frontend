import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListingStateType } from './types'

const initialState: ListingStateType = {
  fetching: false,
  error: '',
  data: {
    type: 'auction',
    startPrice: '',
    endPrice: '',
    start_time: '',
    end_time: '',
    salesTokenContract: '',
    platfromFee: '',
  },
  orderId: null,
  salesDetailId: null,
  listItemId: null,
  bidListItemId: null,
  listing: 'none',
}

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    listingRequest: (state, i) => {
      state.fetching = true
    },
    listingSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        orderId: ListingStateType['orderId']
        salesDetailId: ListingStateType['salesDetailId']
        listItemId: ListingStateType['listItemId']
        bidListItemId: ListingStateType['bidListItemId']
      }>
    ) => {
      state.fetching = false
      state.orderId = payload.orderId
      state.salesDetailId = payload.salesDetailId
      state.listItemId = payload.listItemId
      state.bidListItemId = payload.bidListItemId
      state.listing = 'done'
    },
    listingFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    unlistingRequest: (state, i) => {
      state.fetching = true
    },
    unlistingSuccess: (state, i) => {
      state.fetching = true
    },
    unlistingFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const {
  listingRequest,
  listingSuccess,
  listingFailure,
  unlistingRequest,
  unlistingSuccess,
  unlistingFailure,
} = listingSlice.actions

export const { reducer } = listingSlice
